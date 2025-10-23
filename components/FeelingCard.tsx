
import React from 'react';

interface FeelingCardProps {
  icon: string;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

const FeelingCard: React.FC<FeelingCardProps> = ({ icon, label, isSelected, onClick }) => {
  const selectedClasses = isSelected ? 'scale-110 bg-primary/20' : 'bg-primary/10';

  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 p-3 rounded-lg group transition-transform duration-200 ease-in-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary"
    >
      <div className={`flex items-center justify-center size-16 rounded-full text-primary group-hover:bg-primary/20 transition-all duration-200 ${selectedClasses}`}>
        <span className="material-symbols-outlined text-4xl">{icon}</span>
      </div>
      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>
    </button>
  );
};

export default FeelingCard;
