
import React, { useState } from 'react';
import FeelingCard from './FeelingCard';
import StoryCard from './StoryCard';
import { FEELINGS, STORIES } from '../constants';

interface MainContentProps {
  onStartSupport: (feeling: string) => void;
  onNavigateToCommunity: () => void;
}

const MainContent: React.FC<MainContentProps> = ({ onStartSupport, onNavigateToCommunity }) => {
  const [userInput, setUserInput] = useState('');
  const [selectedFeeling, setSelectedFeeling] = useState<string | null>(null);

  const handleFeelingClick = (name: string) => {
    setSelectedFeeling(name);
  };

  const handleStartConversation = (e: React.FormEvent) => {
    e.preventDefault();
    onStartSupport(userInput || selectedFeeling || "what's on your mind");
  };

  const handleConnectProfessional = () => {
    onStartSupport('connecting with a professional');
  };

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-12 text-center">
      <div className="flex min-w-72 flex-col gap-3 mb-12">
        <h1 className="text-[#0d171b] dark:text-slate-50 text-5xl md:text-6xl font-black leading-tight tracking-tighter">You are Safe here.</h1>
        <p className="text-[#4c809a] dark:text-slate-400 text-lg font-normal leading-normal">Your feelings are valid. Take a deep breath.</p>
      </div>
      <div className="w-full max-w-2xl rounded-xl bg-white/50 dark:bg-slate-800/30 backdrop-blur-lg shadow-xl p-6 sm:p-10">
        <h2 className="text-[#0d171b] dark:text-slate-100 tracking-light text-2xl sm:text-3xl font-bold leading-tight pb-4">How are you doing?</h2>
        <form onSubmit={handleStartConversation}>
          <div className="flex w-full justify-center py-3">
            <label className="flex flex-col w-full">
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0d171b] dark:text-slate-100 focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/50 focus:border-primary/50 h-14 placeholder:text-slate-500 dark:placeholder:text-slate-400 p-[15px] text-base font-normal leading-normal transition-all"
                placeholder="Feel free to share what's on your mind..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />
            </label>
          </div>
          <p className="text-[#4c809a] dark:text-slate-400 text-sm font-normal leading-normal pb-6 pt-1">Your entry is private and anonymous</p>
          
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 pt-4">
            {FEELINGS.map((feeling) => (
              <FeelingCard
                key={feeling.name}
                icon={feeling.icon}
                label={feeling.name}
                isSelected={selectedFeeling === feeling.name}
                onClick={() => handleFeelingClick(feeling.name)}
              />
            ))}
          </div>
          
          <div className="mt-8 flex flex-col items-center gap-4">
            <p className="text-[#4c809a] dark:text-slate-400 text-base font-normal leading-normal">For personalized support, you have options:</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
              <button type="submit" className="flex items-center justify-center w-full sm:w-auto min-w-[120px] cursor-pointer overflow-hidden rounded-xl h-12 px-6 bg-primary text-slate-50 text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors shadow-lg">
                <span className="truncate flex items-center gap-2">
                  <span className="material-symbols-outlined">record_voice_over</span>
                  Talk to Sakhi
                </span>
              </button>
              <button type="button" onClick={handleConnectProfessional} className="flex items-center justify-center w-full sm:w-auto min-w-[120px] cursor-pointer overflow-hidden rounded-xl h-12 px-6 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-base font-bold leading-normal tracking-[0.015em] hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors shadow-lg">
                <span className="truncate flex items-center gap-2">
                  <span className="material-symbols-outlined">support_agent</span>
                  Connect with Professional
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>

      <section className="w-full max-w-2xl mt-16 px-4 sm:px-0">
        <h2 className="text-[#0d171b] dark:text-slate-100 tracking-light text-3xl font-bold leading-tight pb-6 text-center">Stories of Hope</h2>
        <p className="text-[#4c809a] dark:text-slate-400 text-lg font-normal leading-normal text-center mb-8">Discover resilience and shared experiences from our community.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {STORIES.map((story) => (
                <StoryCard key={story.title} {...story} />
            ))}
        </div>
        <div className="mt-10 text-center">
            <button onClick={onNavigateToCommunity} className="flex items-center justify-center w-full sm:w-auto min-w-[150px] cursor-pointer overflow-hidden rounded-xl h-12 px-6 bg-primary text-slate-50 text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors shadow-lg mx-auto">
                <span className="truncate flex items-center gap-2">
                    <span className="material-symbols-outlined">forum</span>
                    Explore Community
                </span>
            </button>
        </div>
      </section>
    </main>
  );
};

export default MainContent;
