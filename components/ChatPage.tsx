import React, { useState, useEffect, useRef } from 'react';

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface ChatPageProps {
  feeling: string;
  onGoBack: () => void;
}

const cannedResponses = [
  "I understand. It takes courage to acknowledge these feelings. I'm here to listen.",
  "Thank you for sharing that with me. Remember to be kind to yourself.",
  "That sounds really tough. It's okay to feel this way.",
  "I hear you. Sometimes just putting it into words is a helpful step.",
  "Let's take a deep breath together. Inhale... and exhale. You're in a safe space here.",
  "It's brave of you to open up about this. What's on your mind right now?",
  "Remember that all feelings are temporary, even the difficult ones. This moment will pass.",
  "I'm here for you. You don't have to go through this alone."
];

const ChatPage: React.FC<ChatPageProps> = ({ feeling, onGoBack }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const responseIndex = useRef(0);

  // Simplified function to add a model response at once
  const addModelResponse = (text: string) => {
    const modelMessage: Message = { role: 'model', text: text };
    setMessages(prev => [...prev, modelMessage]);
    setIsLoading(false);
  };

  useEffect(() => {
    const initializeChat = () => {
      setIsLoading(true);
      const initialUserMessage = `I'm here because I'm feeling ${feeling.toLowerCase()}.`;
      setMessages([{ role: 'user', text: initialUserMessage }]);

      setTimeout(() => {
        const firstResponse = "Thank you for sharing. It's completely okay to feel that way. I'm here to listen without any judgment. What's on your mind?";
        addModelResponse(firstResponse);
      }, 1000);
    };

    initializeChat();
  }, [feeling]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', text: userInput };
    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);

    // Simulate thinking and then show the canned response
    setTimeout(() => {
        const responseText = cannedResponses[responseIndex.current % cannedResponses.length];
        responseIndex.current += 1;
        addModelResponse(responseText);
    }, 1000);
  };

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
        {isLoading && (
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