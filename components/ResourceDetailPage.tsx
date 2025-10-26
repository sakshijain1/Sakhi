import React, { useState } from 'react';
import { Resource } from '../constants';

interface ResourceDetailPageProps {
  resource: Resource;
  onGoBack: () => void;
}

const AudioPlayer: React.FC<{ resource: Resource }> = ({ resource }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(15); // a mock progress
  
  const durationMinutes = parseInt(resource.duration);
  const totalSeconds = isNaN(durationMinutes) ? 0 : durationMinutes * 60;
  const currentSeconds = (totalSeconds * progress) / 100;

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
  };

  return (
    <div className="w-full max-w-md rounded-xl bg-white/60 dark:bg-slate-800/40 backdrop-blur-lg shadow-xl p-6 md:p-8 flex flex-col items-center text-center">
      <img src={resource.image} alt={resource.title} className="w-48 h-48 rounded-lg object-cover mb-6 shadow-lg" />
      <h2 className="font-resource-display text-2xl font-bold">{resource.title}</h2>
      <p className="text-sm font-bold text-[#76A6A5] font-resource-body mt-1">{resource.category} • {resource.duration}</p>
      
      <div className="w-full max-w-sm mt-8">
        <div className="w-full bg-slate-300/50 dark:bg-slate-700/50 rounded-full h-2">
          <div className="bg-[#76A6A5] h-2 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="flex justify-between text-xs font-resource-body text-slate-500 dark:text-slate-400 mt-2">
          <span>{formatTime(currentSeconds)}</span>
          <span>{formatTime(totalSeconds)}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-8 mt-6">
        <button className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors" aria-label="Rewind 10 seconds">
          <span className="material-symbols-outlined !text-3xl">replay_10</span>
        </button>
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex items-center justify-center size-20 rounded-full bg-[#76A6A5] text-white shadow-lg transform hover:scale-105 transition-transform"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          <span className="material-symbols-outlined !text-5xl">
            {isPlaying ? 'pause' : 'play_arrow'}
          </span>
        </button>
        <button className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors" aria-label="Forward 10 seconds">
          <span className="material-symbols-outlined !text-3xl">forward_10</span>
        </button>
      </div>
    </div>
  );
};


const ResourceDetailPage: React.FC<ResourceDetailPageProps> = ({ resource, onGoBack }) => {
  const [isBookmarked, setIsBookmarked] = useState(resource.bookmarked);

  const handleBookmarkToggle = () => {
    setIsBookmarked(prev => !prev);
  };

  // Audio Player Layout
  if (resource.category === 'Audio') {
    return (
      <main className="flex-grow w-full bg-[#F9F7F3] dark:bg-[#1A2424] text-[#3C3C3C] dark:text-[#E0E0E0]">
        <div className="container mx-auto max-w-4xl px-4 py-8">
          <div className="mb-6">
            <button onClick={onGoBack} className="flex items-center gap-2 text-[#6B6B6B] dark:text-[#A9A9A9] font-semibold font-resource-body hover:text-[#3C3C3C] dark:hover:text-white transition-colors">
              <span className="material-symbols-outlined">arrow_back</span>
              Back to Library
            </button>
          </div>
          <article className="flex flex-col items-center">
            <AudioPlayer resource={resource} />
            <p className="text-lg leading-relaxed text-center max-w-2xl mx-auto font-resource-body text-slate-800 dark:text-slate-300 mt-8">
                {resource.content}
            </p>
            <div className="mt-12 flex justify-center">
              <button onClick={handleBookmarkToggle} className="flex items-center gap-2 rounded-full py-3 px-6 text-base font-semibold font-resource-body bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                <span className="material-symbols-outlined text-xl" style={{fontVariationSettings: `'FILL' ${isBookmarked ? 1 : 0}`}}>{isBookmarked ? 'bookmark' : 'bookmark_border'}</span>
                {isBookmarked ? 'Saved' : 'Save'}
              </button>
            </div>
          </article>
        </div>
      </main>
    );
  }

  // Video & Article/Worksheet Layout
  return (
    <main className="flex-grow w-full bg-[#F9F7F3] dark:bg-[#1A2424] text-[#3C3C3C] dark:text-[#E0E0E0]">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="mb-6">
          <button onClick={onGoBack} className="flex items-center gap-2 text-[#6B6B6B] dark:text-[#A9A9A9] font-semibold font-resource-body hover:text-[#3C3C3C] dark:hover:text-white transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
            Back to Library
          </button>
        </div>

        <article>
          <header className="mb-8">
             {resource.category === 'Video' ? (
                 <video 
                    src={resource.mediaUrl} 
                    poster={resource.image}
                    controls 
                    className="w-full aspect-video rounded-xl bg-slate-900 shadow-lg"
                  >
                    Your browser does not support the video tag.
                  </video>
             ) : (
                <img src={resource.image} alt={resource.title} className="w-full h-64 md:h-80 object-cover rounded-xl mb-6 shadow-lg"/>
             )}
            <p className="text-sm font-bold text-[#76A6A5] font-resource-body mb-2 mt-6">{resource.category} • {resource.duration}</p>
            <h1 className="font-resource-display text-3xl md:text-4xl font-bold leading-tight tracking-tight">{resource.title}</h1>
          </header>

          <div 
            className="prose dark:prose-invert prose-lg max-w-none font-resource-body text-slate-800 dark:text-slate-300 prose-p:leading-relaxed prose-headings:font-resource-display prose-headings:font-bold"
            dangerouslySetInnerHTML={{ __html: resource.content.replace(/\n/g, '<br /><br />') }}
          >
          </div>
          
          <div className="mt-12 flex justify-center">
            <button onClick={handleBookmarkToggle} className="flex items-center gap-2 rounded-full py-3 px-6 text-base font-semibold font-resource-body bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
               <span className="material-symbols-outlined text-xl" style={{fontVariationSettings: `'FILL' ${isBookmarked ? 1 : 0}`}}>{isBookmarked ? 'bookmark' : 'bookmark_border'}</span>
              {isBookmarked ? 'Saved to Bookmarks' : 'Save to Bookmarks'}
            </button>
          </div>
        </article>
      </div>
    </main>
  );
};

export default ResourceDetailPage;