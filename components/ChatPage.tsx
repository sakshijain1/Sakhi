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
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const chatRef = useRef<Chat | null>(null);

  useEffect(() => {
    const initializeChat = async () => {
      setIsLoading(true);
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const chat = ai.chats.create({
          model: 'gemini-2.5-flash',
          config: {
            systemInstruction: `You are Sakhi, a compassionate and supportive AI friend. Your role is to be a gentle, non-judgmental listener for users who are struggling with their mental well-being. Offer comfort, validate their feelings, and provide a safe space for them to express themselves. Avoid giving direct advice, diagnosis, or solutions. Instead, ask thoughtful, open-ended questions to help them explore their feelings. Keep your responses concise, warm, and encouraging. The user is starting this conversation because they are feeling ${feeling.toLowerCase()}.`,
          },
        });
        chatRef.current = chat;

        const initialUserMessageText = `I'm here because I'm feeling ${feeling.toLowerCase()}.`;
        const initialUserMessage: Message = { role: 'user', text: initialUserMessageText };
        
        // Add user message and an empty model message to start
        setMessages([initialUserMessage, { role: 'model', text: '' }]);

        const response = await chat.sendMessageStream({ message: initialUserMessageText });
        
        let modelResponseText = '';
        for await (const chunk of response) {
            modelResponseText += chunk.text;
            setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1].text = modelResponseText;
                return newMessages;
            });
        }
      } catch (error) {
        console.error("Error initializing chat:", error);
        setMessages(prev => [...prev, { role: 'model', text: "Sorry, I'm having trouble connecting right now. Please try again later." }]);
      } finally {
        setIsLoading(false);
      }
    };

    initializeChat();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feeling]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading || !chatRef.current) return;

    const userMessage: Message = { role: 'user', text: userInput };
    // Add user message and an empty model message for streaming
    setMessages(prev => [...prev, userMessage, { role: 'model', text: '' }]);
    const currentInput = userInput;
    setUserInput('');
    setIsLoading(true);

    try {
      const response = await chatRef.current.sendMessageStream({ message: currentInput });
      let modelResponseText = '';
      for await (const chunk of response) {
          modelResponseText += chunk.text;
          setMessages(prev => {
              const newMessages = [...prev];
              newMessages[newMessages.length - 1].text = modelResponseText;
              return newMessages;
          });
      }
    } catch (error) {
        console.error("Error sending message:", error);
        setMessages(prev => {
            const newMessages = [...prev];
            const lastMessage = newMessages[newMessages.length - 1];
            if (lastMessage && lastMessage.role === 'model') {
                lastMessage.text = "Oops, something went wrong. Could you please try that again?";
            }
            return newMessages;
        });
    } finally {
        setIsLoading(false);
    }
  };

  const isStreaming = isLoading && messages[messages.length - 1]?.role === 'model' && messages[messages.length - 1]?.text === '';

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
        {isStreaming && (
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