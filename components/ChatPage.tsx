import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface ChatPageProps {
  feeling: string;
  onGoBack: () => void;
}

const ChatPage: React.FC<ChatPageProps> = ({ feeling, onGoBack }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const API_KEY = process.env.API_KEY;

  useEffect(() => {
    if (!API_KEY) {
      setError('Configuration required. The API key is missing.');
      return;
    }

    const initializeChat = async () => {
      try {
        setIsLoading(true);
        const ai = new GoogleGenAI({ apiKey: API_KEY });
        const newChat = ai.chats.create({
          model: 'gemini-2.5-flash',
          config: {
            systemInstruction: 'You are Sakhi, a caring and empathetic AI companion from the "Sakhi - You are Safe Here" app. Your purpose is to provide a safe, non-judgmental space for users to explore their feelings. Your tone should always be calm, gentle, and reassuring. Listen actively, validate the user\'s feelings, and guide them with kindness. Do not give medical advice. If the user\'s situation seems serious, gently suggest that talking to a professional might be a helpful next step. Keep your responses supportive and encouraging.',
          },
        });
        chatRef.current = newChat;

        const initialUserMessage = `I'm here because I'm feeling ${feeling.toLowerCase()}.`;
        setMessages([{ role: 'user', text: initialUserMessage }]);

        const responseStream = await newChat.sendMessageStream({ message: initialUserMessage });
        
        let modelResponse = '';
        setMessages(prev => [...prev, { role: 'model', text: '' }]);

        for await (const chunk of responseStream) {
          modelResponse += chunk.text;
          setMessages(prev => {
              const newMessages = [...prev];
              newMessages[newMessages.length - 1].text = modelResponse;
              return newMessages;
          });
        }
      } catch (e) {
        console.error(e);
        setError('There was an issue starting the chat. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    initializeChat();
  }, [feeling, API_KEY]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading || !chatRef.current) return;

    const userMessage: Message = { role: 'user', text: userInput };
    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      const responseStream = await chatRef.current.sendMessageStream({ message: userInput });
      
      let modelResponse = '';
      setMessages(prev => [...prev, { role: 'model', text: '' }]);

      for await (const chunk of responseStream) {
        modelResponse += chunk.text;
         setMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1].text = modelResponse;
            return newMessages;
        });
      }

    } catch (e) {
      console.error(e);
      setMessages(prev => [...prev, { role: 'model', text: 'I seem to be having trouble connecting. Please try again in a moment.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <div className="w-full max-w-2xl flex flex-col items-center text-center p-8 bg-white/50 dark:bg-slate-800/30 rounded-xl shadow-lg">
        <span className="material-symbols-outlined text-5xl text-red-500 mb-4">error</span>
        <h2 className="text-2xl font-bold mb-2">Error</h2>
        <p className="text-slate-600 dark:text-slate-400">{error}</p>
         <button onClick={onGoBack} className="mt-6 flex items-center justify-center min-w-[120px] cursor-pointer overflow-hidden rounded-xl h-11 px-6 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-base font-bold leading-normal hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full max-w-3xl flex-1 h-full bg-white/50 dark:bg-slate-800/30 backdrop-blur-lg rounded-t-xl shadow-2xl">
      <header className="flex items-center p-4 border-b border-slate-300/50 dark:border-slate-700/50 sticky top-0 bg-white/50 dark:bg-slate-800/30 backdrop-blur-lg z-10">
        <button onClick={onGoBack} className="p-2 rounded-full hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors mr-2">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-xl font-bold">Chat with Sakhi</h1>
      </header>
      
      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-end gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'model' && <div className="size-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm flex-shrink-0">S</div>}
            <div
              className={`max-w-md rounded-xl px-4 py-3 shadow-md ${
                msg.role === 'user'
                  ? 'bg-primary text-white rounded-br-none'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-bl-none'
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && messages.length > 0 && messages[messages.length-1].role === 'user' && (
           <div className="flex items-end gap-3 justify-start">
             <div className="size-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm flex-shrink-0">S</div>
             <div className="max-w-md rounded-xl px-4 py-3 shadow-md bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-bl-none">
                <div className="flex items-center gap-2">
                    <span className="size-2 bg-slate-500 rounded-full animate-pulse delay-0"></span>
                    <span className="size-2 bg-slate-500 rounded-full animate-pulse delay-150"></span>
                    <span className="size-2 bg-slate-500 rounded-full animate-pulse delay-300"></span>
                </div>
             </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </main>

      <footer className="p-4 border-t border-slate-300/50 dark:border-slate-700/50 sticky bottom-0 bg-white/50 dark:bg-slate-800/30 backdrop-blur-lg">
        <form onSubmit={handleSendMessage} className="flex items-center gap-3">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your message..."
            aria-label="Chat input"
            disabled={isLoading}
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0d171b] dark:text-slate-100 focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/50 focus:border-primary/50 h-12 placeholder:text-slate-500 dark:placeholder:text-slate-400 px-4 text-base font-normal leading-normal transition-all disabled:opacity-50"
          />
          <button type="submit" disabled={isLoading || !userInput.trim()} className="size-12 flex items-center justify-center rounded-full bg-primary text-white font-bold transition-colors hover:bg-primary/90 disabled:bg-slate-400 disabled:cursor-not-allowed flex-shrink-0 shadow-lg">
            <span className="material-symbols-outlined">send</span>
          </button>
        </form>
      </footer>
    </div>
  );
};

export default ChatPage;
