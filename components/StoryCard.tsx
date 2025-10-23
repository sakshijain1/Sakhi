import React from 'react';

interface StoryCardProps {
  icon: string;
  iconColor: string;
  title: string;
  quote: string;
  likes: number;
}

const StoryCard: React.FC<StoryCardProps> = ({ icon, iconColor, title, quote, likes }) => (
  <div className="rounded-xl bg-white/50 dark:bg-slate-800/30 backdrop-blur-lg shadow-lg p-6 text-left">
    <div className="flex items-center gap-3 mb-3">
      <span className={`material-symbols-outlined text-xl ${iconColor}`}>{icon}</span>
      <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">{title}</h3>
    </div>
    <p className="text-slate-700 dark:text-slate-300 text-sm italic mb-4">"{quote}"</p>
    <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
      <span>— Anonymous User</span>
      <span className="flex items-center gap-1">
        <span className="material-symbols-outlined text-base">favorite</span>
        {likes}
      </span>
    </div>
  </div>
);

export default StoryCard;
