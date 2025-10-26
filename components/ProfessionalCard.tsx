import React from 'react';
import { Professional } from '../constants';

interface ProfessionalCardProps {
  professional: Professional;
  onSelect: () => void;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <span key={index} className={`material-symbols-outlined !text-base ${index < Math.round(rating) ? 'text-amber-500' : 'text-slate-300 dark:text-slate-500'}`}>star</span>
      ))}
      <span className="ml-1 text-xs font-bold text-slate-600 dark:text-slate-400">{rating.toFixed(1)}</span>
    </div>
  );
}

const ProfessionalCard: React.FC<ProfessionalCardProps> = ({ professional, onSelect }) => {
  return (
    <div 
      onClick={onSelect}
      className="flex flex-col md:flex-row items-center md:items-start gap-6 rounded-xl bg-white/60 dark:bg-slate-800/40 backdrop-blur-lg shadow-lg p-6 text-center md:text-left transition-all duration-300 hover:shadow-2xl cursor-pointer border border-transparent hover:border-primary/20 dark:hover:border-primary/30"
    >
      <img src={professional.image} alt={professional.name} className="size-28 flex-shrink-0 object-cover rounded-lg" />
      <div className="flex flex-col gap-2 flex-1 w-full">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between">
          <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">{professional.name}</h3>
          {professional.availability === 'Available Now' && (
            <div className="flex mt-2 md:mt-0 h-6 shrink-0 items-center justify-center gap-x-1 rounded-full bg-emerald-100 dark:bg-emerald-900/50 px-2.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <p className="text-emerald-700 dark:text-emerald-300 text-xs font-bold">Available</p>
            </div>
          )}
        </div>
        <p className="text-sm text-primary dark:text-primary-300 font-medium -mt-2">{professional.type}</p>
        <div className="flex justify-center md:justify-start">
            <StarRating rating={professional.rating} />
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2 mt-1">
          {professional.bio}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-2 justify-center md:justify-start">
          {professional.specialties.slice(0, 3).map((specialty) => (
            <span key={specialty} className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
              {specialty}
            </span>
          ))}
        </div>
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-center md:justify-between w-full gap-3">
          <p className="text-sm text-slate-700 dark:text-slate-300">
            <span className="font-bold text-base">${professional.pricing}</span> / session
          </p>
          <button className="w-full sm:w-auto flex items-center justify-center rounded-lg h-9 px-5 bg-primary/90 text-white text-sm font-bold hover:bg-primary transition-colors shadow-md">
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalCard;
