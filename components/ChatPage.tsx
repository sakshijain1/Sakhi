import React, { useState, useEffect, useRef } from 'react';

// --- Canned Response Logic ---

interface ResponseRule {
  keywords: string[];
  response: string | string[];
}

const responseRules: ResponseRule[] = [
  {
    keywords: ['sad', 'unhappy', 'crying', 'depressed', 'down', 'lonely', 'alone', 'isolated'],
    response: [
      "It's completely okay to feel that way. Thank you for sharing that with me. Remember to be gentle with yourself.",
      "I hear that you're going through a tough time. Feelings are like clouds passing in the sky; this one will pass too. I'm here to listen.",
      "That sounds really difficult. Thank you for trusting me with this. Is there anything you'd like to talk about regarding this feeling?"
    ]
  },
  {
    keywords: ['stressed', 'anxious', 'worried', 'overwhelmed', 'pressure'],
    response: [
      "Stress and anxiety can be incredibly draining. Let's take a moment together. How about a slow, deep breath? In... and out. You're taking a positive step just by being here.",
      "It sounds like there's a lot on your mind. When we feel overwhelmed, even small acts of kindness to ourselves can make a difference. What's one small thing you could do for yourself right now?",
      "That feeling of pressure is very real. You're not alone in feeling it. Just talking about it is a great way to release some of that tension."
    ]
  },
  {
    keywords: ['confused', 'lost', 'don\'t know', 'stuck', 'uncertain'],
    response: [
      "It's alright to feel confused or lost sometimes. Life can be complicated, and you don't need to have all the answers right now.",
      "Feeling stuck is a difficult place to be. Sometimes just acknowledging it is the first step. It's okay to not know which way to go.",
      "Uncertainty can be uncomfortable. It's brave of you to sit with that feeling and talk about it."
    ]
  },
  {
    keywords: ['bored', 'empty', 'nothing'],
    response: [
        "Boredom can sometimes be our mind's way of asking for rest or for something new. What's one thing you used to enjoy doing, even as a child?",
        "That feeling of emptiness can be uncomfortable. Sometimes it's a quiet space waiting to be filled with something gentle. Let's just acknowledge that it's there.",
    ]
  },
   {
    keywords: ['hello', 'hi', 'hey'],
    response: "Hello there. I'm glad you're here. How are you feeling today?",
  },
  {
    keywords: ['thank you', 'thanks'],
    response: "You're very welcome. I'm always here if you need to talk."
  },
  {
    keywords: ['good', 'happy', 'great', 'better', 'fine'],
    response: "That's wonderful to hear. I'm glad you're having a good moment. What's bringing you that positive feeling?"
  }
];

const defaultResponses = [
  "Thank you for sharing that with me. Can you tell me more about it?",
  "I'm here to listen. This is a safe space to explore that feeling.",
  "That sounds important. I'm here for you.",
  "I understand. It takes courage to share what's on your mind."
];

const getBotResponse = (text: string): string => {
    const lowerText = text.toLowerCase();
    for (const rule of responseRules) {
        for (const keyword of rule.keywords) {
            if (lowerText.includes(keyword)) {
                const responses = Array.isArray(rule.response) ? rule.response : [rule.response];
                return responses[Math.floor(Math.random() * responses.length)];
            }
        }
    }
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// --- End Canned Response Logic ---

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
  const [status, setStatus] = useState('idle'); // idle, recording, generating, error
  const [isRecording, setIsRecording] = useState(false);
  
  const [currentPlayingUrl, setCurrentPlayingUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  const addMessage = (message: Omit<Message, 'id'>) => {
    setMessages(prev => [...prev, { ...message, id: Date.now() }]);
  }

  const generateAndAddBotResponse = (userText: string) => {
    setStatus('generating');
    const botText = getBotResponse(userText);

    setTimeout(() => {
      addMessage({ author: 'model', type: 'text', text: botText });
      setStatus('idle');
    }, 1200); // Simulate bot "thinking"
  };
  
  useEffect(() => {
    setStatus('generating');
    const initialFeeling = feeling || "How are you feeling?";
    const botGreeting = getBotResponse(initialFeeling);

    setTimeout(() => {
        setMessages([{
            id: Date.now(),
            author: 'model',
            type: 'text',
            text: botGreeting,
        }]);
        setStatus('idle');
    }, 1000); // Simulate bot "thinking"
  }, [feeling]);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendText = () => {
    if (!inputText.trim() || status !== 'idle') return;
    const textToSend = inputText;
    addMessage({ author: 'user', type: 'text', text: textToSend });
    setInputText('');
    generateAndAddBotResponse(textToSend);
  };

  const handleMicClick = async () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
    } else {
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
        
        mediaRecorderRef.current.onstop = () => {
          setStatus('generating');
          const stream = mediaRecorderRef.current?.stream;
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          const audioUrl = URL.createObjectURL(audioBlob);

          addMessage({ 
              author: 'user', 
              type: 'audio', 
              text: '', // No transcription text
              audioUrl: audioUrl, 
              duration: audioBlob.size / 16000 
          });
          
          // Add a canned response for the voice note
          setTimeout(() => {
              addMessage({ 
                  author: 'model', 
                  type: 'text', 
                  text: "Thank you for sharing your voice. It's good to hear you. I'm listening."
              });
              setStatus('idle');
          }, 1200);

          stream?.getTracks().forEach(track => track.stop());
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
    const onPause = () => { setIsPlaying(false); setAudioProgress(0); };
    const onTimeUpdate = () => { if (audio.duration) setAudioProgress((audio.currentTime / audio.duration) * 100); };
    const onEnded = () => { setIsPlaying(false); setCurrentPlayingUrl(null); setAudioProgress(0); };

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
            disabled={isRecording || status !== 'idle'}
        />
        <button
          onClick={inputText ? handleSendText : handleMicClick}
          disabled={status !== 'idle' && status !== 'recording'}
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