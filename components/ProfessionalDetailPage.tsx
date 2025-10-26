import React from 'react';
import { Professional } from '../constants';

interface ProfessionalDetailPageProps {
  professional: Professional;
  onGoBack: () => void;
}

const StarRating: React.FC<{ rating: number, size?: string }> = ({ rating, size = '!text-xl' }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <span key={index} className={`material-symbols-outlined ${size} ${index < Math.round(rating) ? 'text-amber-500' : 'text-slate-300 dark:text-slate-500'}`}>star</span>
      ))}
    </div>
  );
}

const ProfessionalDetailPage: React.FC<ProfessionalDetailPageProps> = ({ professional, onGoBack }) => {
  const bookingActionText = professional.availability === 'Available Now' ? 'Start Session Now' : 'Book an Appointment';

  return (
    <main className="flex flex-1 flex-col items-center py-8 sm:py-12 w-full max-w-5xl px-4">
       <div className="w-full flex items-center mb-8">
        <button onClick={onGoBack} className="p-2 rounded-full hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-2xl font-bold text-center flex-1 pr-10">Profile</h1>
      </div>

      <div className="w-full flex flex-col lg:flex-row gap-8">
        {/* Left Column - Sticky */}
        <div className="lg:w-1/3 lg:sticky top-8 self-start">
          <div className="rounded-xl bg-white/60 dark:bg-slate-800/40 backdrop-blur-lg shadow-xl p-6 flex flex-col items-center text-center">
            <img src={professional.image} alt={professional.name} className="size-32 rounded-full object-cover mb-4 border-4 border-white dark:border-slate-700 shadow-lg"/>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{professional.name}</h2>
            <p className="text-base text-primary dark:text-primary-300 font-medium">{professional.credentials}</p>
            <div className="flex items-center gap-2 mt-2">
                <StarRating rating={professional.rating} />
                <span className="text-sm font-bold text-slate-600 dark:text-slate-400">({professional.reviews.length} reviews)</span>
            </div>
            
            <button className="w-full mt-6 flex items-center justify-center min-w-[120px] cursor-pointer overflow-hidden rounded-xl h-12 px-6 bg-primary text-slate-50 text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors shadow-lg">
                <span className="truncate">{bookingActionText}</span>
            </button>
            
            <div className="w-full text-left mt-6 space-y-3 text-sm">
                <div className="flex justify-between">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Price:</span>
                    <span className="text-slate-600 dark:text-slate-400">${professional.pricing} / session</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Experience:</span>
                    <span className="text-slate-600 dark:text-slate-400">{professional.experience} years</span>
                </div>
                 <div className="flex justify-between">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Languages:</span>
                    <span className="text-slate-600 dark:text-slate-400">{professional.languages.join(', ')}</span>
                </div>
            </div>

            {professional.freeSession && (
                <div className="mt-4 p-2 w-full text-center rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-sm font-semibold">
                    First Session is Free
                </div>
            )}
          </div>
        </div>
        
        {/* Right Column - Scrollable */}
        <div className="lg:w-2/3">
            <div className="rounded-xl bg-white/60 dark:bg-slate-800/40 backdrop-blur-lg shadow-xl p-8 space-y-8">
                {/* About Section */}
                <section>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">About {professional.name.split(' ')[1]}</h3>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{professional.bio}</p>
                </section>
                
                {/* Approach Section */}
                <section>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">My Approach</h3>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{professional.approach}</p>
                </section>

                {/* Specialties Section */}
                <section>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">Specialties</h3>
                     <div className="flex flex-wrap gap-2">
                        {professional.specialties.map((specialty) => (
                        <span key={specialty} className="px-3 py-1 text-sm font-medium rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                            {specialty}
                        </span>
                        ))}
                    </div>
                </section>

                {/* Reviews Section */}
                <section>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">Client Reviews</h3>
                    <div className="space-y-6">
                        {professional.reviews.map((review, index) => (
                            <div key={index} className="border-l-4 border-primary/50 pl-4">
                                <div className="flex items-center gap-2 mb-1">
                                    <StarRating rating={review.rating} size="!text-lg"/>
                                    <p className="font-bold text-slate-800 dark:text-slate-200">{review.reviewer}</p>
                                </div>
                                <p className="text-slate-600 dark:text-slate-400 italic">"{review.comment}"</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>

      </div>
    </main>
  );
};

export default ProfessionalDetailPage;
