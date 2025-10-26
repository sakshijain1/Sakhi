import React from 'react';

interface SupportPageProps {
  feeling: string;
  onGoHome: () => void;
  onStartChat: () => void;
  onConnectProfessional: () => void;
  onNavigateToResources: () => void;
}

const SupportPage: React.FC<SupportPageProps> = ({ feeling, onGoHome, onStartChat, onConnectProfessional, onNavigateToResources }) => {
  const isFeeling = ['sad', 'bored', 'confused', 'stressed', 'lonely'].includes(feeling.toLowerCase());
  const feelingMessage = isFeeling ? `It's okay to feel ${feeling.toLowerCase()}.` : "Thank you for sharing.";

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-12 text-center w-full">
      <div className="flex min-w-72 flex-col gap-3 mb-12">
        <h1 className="text-[#0d171b] dark:text-slate-50 text-4xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tighter">{feelingMessage}</h1>
        <p className="text-[#4c809a] dark:text-slate-400 text-lg font-normal leading-normal max-w-2xl">
          Your feelings are valid. We're here to support you through this. You're not alone.
        </p>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 pb-12">
        {/* Card 1: Talk to Sakhi */}
        <div 
          onClick={onStartChat}
          className="group flex flex-col items-center justify-start rounded-xl bg-white/50 dark:bg-slate-800/30 backdrop-blur-lg p-6 sm:p-8 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
        >
          <div className="mb-4 flex size-20 items-center justify-center rounded-full bg-primary/20 text-primary transition-colors duration-300 group-hover:bg-primary/30">
            <span className="material-symbols-outlined !text-5xl">record_voice_over</span>
          </div>
          <div className="flex w-full grow flex-col items-center justify-center gap-2 text-center">
            <h2 className="text-[#0d171b] dark:text-slate-100 text-2xl font-bold">Talk to Sakhi</h2>
            <p className="text-slate-600 dark:text-slate-400 text-base font-normal leading-normal">An AI friend, here to listen anytime, without judgement.</p>
            <button className="mt-4 flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-11 px-6 bg-primary text-slate-50 text-base font-bold transition-transform duration-300 group-hover:scale-105 shadow-lg">
              <span className="truncate">Start Chatting</span>
            </button>
          </div>
        </div>

        {/* Card 2: Talk to a Professional */}
        <div 
          onClick={onConnectProfessional}
          className="group flex flex-col items-center justify-start rounded-xl bg-white/50 dark:bg-slate-800/30 backdrop-blur-lg p-6 sm:p-8 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer">
          <div className="mb-4 flex size-20 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-500 transition-colors duration-300 group-hover:bg-emerald-500/30">
            <span className="material-symbols-outlined !text-5xl">support_agent</span>
          </div>
          <div className="flex w-full grow flex-col items-center justify-center gap-2 text-center">
            <h2 className="text-[#0d171b] dark:text-slate-100 text-2xl font-bold">Connect with a Professional</h2>
            <p className="text-slate-600 dark:text-slate-400 text-base font-normal leading-normal">Connect with a trained professional for guidance and support.</p>
            <button className="mt-4 flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-11 px-6 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-base font-bold transition-transform duration-300 group-hover:scale-105 shadow-lg">
              <span className="truncate">Find a Guide</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col items-center gap-4 pt-8">
        <p className="text-[#4c809a] dark:text-slate-400 text-base font-normal leading-normal text-center">Not ready to talk? That's okay too.</p>
        <button 
          onClick={onNavigateToResources}
          className="flex items-center justify-center w-full sm:w-auto min-w-[120px] cursor-pointer overflow-hidden rounded-xl h-12 px-6 bg-white/60 dark:bg-slate-800/40 backdrop-blur-lg text-slate-800 dark:text-slate-200 text-base font-bold leading-normal tracking-[0.015em] hover:bg-white/80 dark:hover:bg-slate-800/60 transition-colors shadow-md">
          <span className="truncate flex items-center gap-2">
            <span className="material-symbols-outlined">explore</span>
            Explore Resources
          </span>
        </button>
      </div>
    </main>
  );
};

export default SupportPage;