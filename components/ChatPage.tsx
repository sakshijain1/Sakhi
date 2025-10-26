import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleGenAI, Chat, Modality } from '@google/genai';

// --- Audio Helper Functions ---
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        // result is "data:audio/webm;base64,...."
        // we need to remove the prefix
        resolve(reader.result.split(',')[1]);
      } else {
        reject(new Error("Failed to convert blob to base64"));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};
// --- End Audio Helper Functions ---

interface Message {
  id: number;
  author: 'user' | 'model';
  type: 'text' | 'audio';
  text: string;
  audioUrl?: string;
  duration?: number;
}

interface ChatPageProps {
  feeling: string;
  onGoBack: () => void;
}

const AudioMessage: React.FC<{ message: Message; onPlay: (audioUrl: string) => void; isPlaying: boolean; currentPlayingUrl: string | null; progress: number; }> = 
  ({ message, onPlay, isPlaying, currentPlayingUrl, progress }) => {
  
  const isCurrentlyPlaying = isPlaying && currentPlayingUrl === message.audioUrl;
  
  const formatTime = (seconds: number = 0) => {
    const date = new Date(0);
    date.setSeconds(seconds);
    return date.toISOString().substr(14, 5);
  };
  
  return (
    <div className="flex items-center gap-2 w-full max-w-[250px]">
      <button onClick={() => onPlay(message.audioUrl!)} className="flex-shrink-0">
        <span className="material-symbols-outlined text-3xl">
          {isCurrentlyPlaying ? 'pause_circle' : 'play_circle'}
        </span>
      </button>
      <div className="flex-grow h-1.5 bg-black/20 dark:bg-white/20 rounded-full">
         <div 
            className="h-1.5 bg-white rounded-full" 
            style={{ width: isCurrentlyPlaying ? `${progress}%` : '0%' }}
          ></div>
      </div>
      <span className="text-xs font-mono w-12 text-right">{formatTime(message.duration)}</span>
    </div>
  );
};

const ChatPage: React.FC<ChatPageProps> = ({ feeling, onGoBack }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [status, setStatus] = useState('idle'); // idle, recording, transcribing, generating, error
  const [isRecording, setIsRecording] = useState(false);
  
  const [currentPlayingUrl, setCurrentPlayingUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);

  const aiRef = useRef<GoogleGenAI | null>(null);
  const chatRef = useRef<Chat | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    aiRef.current = new GoogleGenAI({ apiKey: process.env.API_KEY });
    chatRef.current = aiRef.current.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: `You are Sakhi, a compassionate, warm, and supportive AI voice companion. Your purpose is to be a non-judgmental listener. Validate emotions, offer comfort, and create a safe space. Ask gentle, open-ended questions to help users reflect, but never give direct advice or diagnoses. You are a friend, not a therapist. Keep responses thoughtful but not overly long. If the user expresses thoughts of self-harm or is in immediate crisis, you must calmly and clearly say: "It sounds like you are going through a lot right now, and I'm concerned for your safety. Please reach out to a crisis hotline. You can call or text 988 in the US and Canada, or 111 in the UK, to connect with a trained professional who can help."`,
      },
    });

    const initialFeeling = feeling || "something on my mind";
    const startMessage = `I'm feeling ${initialFeeling.toLowerCase()}.`;
    
    // Initial message from AI
    const startConversation = async () => {
        setStatus('generating');
        const response = await chatRef.current!.sendMessage({ message: startMessage });
        setMessages([{
            id: Date.now(),
            author: 'model',
            type: 'text',
            text: response.text,
        }]);
        setStatus('idle');
    }
    startConversation();

  }, [feeling]);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  const addMessage = (message: Omit<Message, 'id'>) => {
    setMessages(prev => [...prev, { ...message, id: Date.now() }]);
  }

  const handleSendText = async () => {
    if (!inputText.trim()) return;
    const textToSend = inputText;
    addMessage({ author: 'user', type: 'text', text: textToSend });
    setInputText('');
    setStatus('generating');

    try {
      const response = await chatRef.current!.sendMessage({ message: textToSend });
      addMessage({ author: 'model', type: 'text', text: response.text });
    } catch (error) {
      console.error("Error sending message:", error);
      addMessage({ author: 'model', type: 'text', text: "Sorry, I encountered an error. Please try again." });
    } finally {
      setStatus('idle');
    }
  };

  const handleMicClick = async () => {
    if (isRecording) {
      // Stop recording
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
      // 'onstop' event will handle the rest
    } else {
      // Start recording
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert("Your browser does not support audio recording.");
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        audioChunksRef.current = [];
        
        mediaRecorderRef.current.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };
        
        mediaRecorderRef.current.onstop = async () => {
          setStatus('transcribing');
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          const audioUrl = URL.createObjectURL(audioBlob);

          try {
            const base64Audio = await blobToBase64(audioBlob);
            const audioPart = { inlineData: { data: base64Audio, mimeType: 'audio/webm' } };
            const textPart = { text: 'Transcribe this audio message and respond to it thoughtfully based on our conversation history.' };
            
            const transcriptionResponse = await aiRef.current!.models.generateContent({
              model: 'gemini-2.5-pro',
              contents: { parts: [audioPart, textPart] }
            });

            const userTranscription = transcriptionResponse.text;
            addMessage({ author: 'user', type: 'audio', text: userTranscription, audioUrl: audioUrl, duration: audioBlob.size / 16000 }); // Approximate duration

            setStatus('generating');
            const chatResponse = await chatRef.current!.sendMessage({message: userTranscription});
            const modelText = chatResponse.text;

            // Generate audio for model's response
            const ttsResponse = await aiRef.current!.models.generateContent({
                model: 'gemini-2.5-flash-preview-tts',
                contents: [{ parts: [{ text: modelText }] }],
                config: {
                    responseModalities: [Modality.AUDIO],
                    speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } }
                }
            });

            const base64ModelAudio = ttsResponse.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
            if (base64ModelAudio) {
                const modelAudioBytes = decode(base64ModelAudio);
                const modelAudioBlob = new Blob([modelAudioBytes], { type: 'audio/mp3' }); // The API returns mp3
                const modelAudioUrl = URL.createObjectURL(modelAudioBlob);
                addMessage({ author: 'model', type: 'audio', text: modelText, audioUrl: modelAudioUrl, duration: modelAudioBlob.size / 16000 }); // Approximate duration
            } else {
                addMessage({ author: 'model', type: 'text', text: modelText });
            }

          } catch (error) {
            console.error("Error during voice processing:", error);
            addMessage({ author: 'model', type: 'text', text: "Sorry, I had trouble understanding that. Could you try again?" });
          } finally {
            setStatus('idle');
            stream.getTracks().forEach(track => track.stop());
          }
        };

        mediaRecorderRef.current.start();
        setIsRecording(true);
        setStatus('recording');
      } catch (err) {
        console.error("Error accessing microphone:", err);
        alert("Could not access microphone. Please check permissions.");
      }
    }
  };

  const handlePlayAudio = (audioUrl: string) => {
    if (!audioPlayerRef.current) return;
    if (isPlaying && currentPlayingUrl === audioUrl) {
      audioPlayerRef.current.pause();
    } else {
      audioPlayerRef.current.src = audioUrl;
      setCurrentPlayingUrl(audioUrl);
      audioPlayerRef.current.play();
    }
  };

  useEffect(() => {
    const audio = audioPlayerRef.current = new Audio();
    
    const onPlay = () => setIsPlaying(true);
    const onPause = () => {
        setIsPlaying(false);
        setAudioProgress(0);
    };
    const onTimeUpdate = () => {
      if (audio.duration) {
        setAudioProgress((audio.currentTime / audio.duration) * 100);
      }
    };
    const onEnded = () => {
        setIsPlaying(false);
        setCurrentPlayingUrl(null);
        setAudioProgress(0);
    }

    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);
    
    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  return (
    <div className="flex flex-col w-full max-w-3xl flex-1 h-full bg-slate-200/50 dark:bg-slate-900/50 backdrop-blur-lg rounded-t-xl shadow-2xl">
      <header className="flex items-center p-4 border-b border-slate-300/50 dark:border-slate-700/50 sticky top-0 bg-white/50 dark:bg-slate-800/30 backdrop-blur-lg z-10">
        <button onClick={onGoBack} className="p-2 rounded-full hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors mr-2">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-xl font-bold">Talk with Sakhi</h1>
      </header>

      <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex items-end gap-2 ${msg.author === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.author === 'model' && <div className="size-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm flex-shrink-0">S</div>}
            <div className={`max-w-md rounded-xl px-3 py-2 shadow-md flex flex-col ${
                msg.author === 'user' 
                  ? 'bg-primary text-white rounded-br-none' 
                  : 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-bl-none'
            }`}>
              {msg.type === 'audio' ? (
                <>
                  <AudioMessage message={msg} onPlay={handlePlayAudio} isPlaying={isPlaying} currentPlayingUrl={currentPlayingUrl} progress={audioProgress} />
                  {msg.text && <p className="pt-2 text-sm opacity-80 whitespace-pre-wrap italic">"{msg.text}"</p>}
                </>
              ) : (
                <p className="whitespace-pre-wrap">{msg.text}</p>
              )}
            </div>
          </div>
        ))}
        {['generating', 'transcribing'].includes(status) && (
            <div className="flex items-end gap-2 justify-start">
                <div className="size-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm flex-shrink-0">S</div>
                <div className="max-w-md rounded-xl px-3 py-2 shadow-md bg-white dark:bg-slate-700 rounded-bl-none">
                    <div className="flex items-center gap-2">
                        <div className="size-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="size-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="size-2 bg-slate-400 rounded-full animate-bounce"></div>
                    </div>
                </div>
            </div>
        )}
        <div ref={messagesEndRef}></div>
      </main>

      <footer className="p-2 sm:p-4 border-t border-slate-300/50 dark:border-slate-700/50 sticky bottom-0 bg-white/50 dark:bg-slate-800/30 backdrop-blur-lg flex items-center gap-2 sm:gap-4">
        <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendText()}
            placeholder={isRecording ? "Recording..." : "Type a message..."}
            className="flex-grow w-full rounded-full bg-slate-200 dark:bg-slate-700 border-transparent focus:border-primary focus:ring-primary px-4 py-2.5"
            disabled={isRecording}
        />
        <button
          onClick={inputText ? handleSendText : handleMicClick}
          disabled={status === 'generating' || status === 'transcribing'}
          className="flex-shrink-0 flex items-center justify-center size-12 rounded-full text-white bg-primary hover:bg-primary/90 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {inputText ? (
            <span className="material-symbols-outlined">send</span>
          ) : (
             <span className={`material-symbols-outlined ${isRecording ? 'text-red-400 animate-pulse' : ''}`}>
              {isRecording ? 'stop' : 'mic'}
            </span>
          )}
        </button>
      </footer>
    </div>
  );
};

export default ChatPage;
