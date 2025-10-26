
import React, { useState, useMemo } from 'react';
import { RESOURCES, RESOURCE_FILTERS, Resource } from '../constants';

interface ResourcePageProps {
  onSelectResource: (id: number) => void;
  onGoBack: () => void;
}

const ResourcePage: React.FC<ResourcePageProps> = ({ onSelectResource, onGoBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [bookmarks, setBookmarks] = useState<Record<number, boolean>>(
    RESOURCES.reduce((acc, resource) => {
      acc[resource.id] = resource.bookmarked;
      return acc;
    }, {} as Record<number, boolean>)
  );

  const handleBookmarkToggle = (e: React.MouseEvent, id: number) => {
    e.stopPropagation(); // Prevent card click when bookmarking
    setBookmarks(prev => ({ ...prev, [id]: !prev[id] }));
  };
  
  const filteredResources = useMemo(() => {
    return RESOURCES.filter(resource => {
      const searchLower = searchTerm.toLowerCase();
      const searchMatch = searchTerm === '' ||
                          resource.title.toLowerCase().includes(searchLower) ||
                          resource.description.toLowerCase().includes(searchLower);

      const filterMatch = activeFilter === 'All' ||
                          activeFilter === resource.section ||
                          activeFilter === resource.category;

      return searchMatch && filterMatch;
    });
  }, [searchTerm, activeFilter]);
  
  const meditationResources = filteredResources.filter(r => r.section === 'Meditation');
  const readingResources = filteredResources.filter(r => r.section === 'Reading');

  const ResourceCard: React.FC<{ resource: Resource }> = ({ resource }) => {
    return (
      <div 
        key={resource.id} 
        onClick={() => onSelectResource(resource.id)}
        className="group relative flex flex-col overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700/50 transition-shadow hover:shadow-md cursor-pointer"
      >
        <img className="h-48 w-full object-cover" src={resource.image} alt={resource.title}/>
        <div className="flex flex-1 flex-col p-5">
          <p className="text-sm font-bold text-[#76A6A5] font-resource-body">{resource.category} • {resource.duration}</p>
          <h3 className="font-resource-display text-lg font-bold mt-2 mb-2 flex-1">{resource.title}</h3>
          <p className="text-sm text-[#6B6B6B] dark:text-[#A9A9A9] font-resource-body">{resource.description}</p>
        </div>
        <button onClick={(e) => handleBookmarkToggle(e, resource.id)} className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/50 text-[#6B6B6B] backdrop-blur-sm transition hover:bg-white/80 dark:bg-slate-900/50 dark:hover:bg-slate-900/80 z-10">
          <span className="material-symbols-outlined text-xl" style={{fontVariationSettings: `'FILL' ${bookmarks[resource.id] ? 1 : 0}`}}>bookmark</span>
        </button>
      </div>
    );
  };

  return (
    <main className="flex-grow w-full bg-[#F9F7F3] dark:bg-[#1A2424] text-[#3C3C3C] dark:text-[#E0E0E0]">
      <div className="container mx-auto max-w-6xl px-4 pt-8">
        <button onClick={onGoBack} className="flex items-center gap-2 text-[#6B6B6B] dark:text-[#A9A9A9] font-semibold font-resource-body hover:text-[#3C3C3C] dark:hover:text-white transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
            Back
        </button>
      </div>
      {/* HeroSection */}
      <section className="w-full py-12 md:py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div 
            className="flex min-h-[480px] flex-col items-center justify-center gap-8 rounded-xl bg-cover bg-center bg-no-repeat p-8 text-center"
            style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")` }}
          >
            <div className="flex flex-col gap-4">
              <h1 className="font-resource-display text-4xl font-bold leading-tight text-white md:text-6xl">A Library for Your Well-being</h1>
              <h2 className="mx-auto max-w-2xl text-base font-normal leading-normal text-white/90 md:text-lg font-resource-body">Explore self-guided resources to find calm, clarity, and relief whenever you need it.</h2>
            </div>
            <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-6 bg-[#76A6A5] text-white text-base font-bold leading-normal tracking-wide transition-opacity hover:opacity-90 font-resource-body">
              <span className="truncate">Explore Resources</span>
            </button>
          </div>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className="w-full py-8">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col gap-6">
            <div className="w-full max-w-2xl mx-auto">
              <label className="flex flex-col min-w-40 h-14 w-full">
                <div className="flex w-full flex-1 items-stretch rounded-full h-full shadow-sm bg-white dark:bg-slate-800">
                  <div className="text-[#6B6B6B] dark:text-[#A9A9A9] flex items-center justify-center pl-6">
                    <span className="material-symbols-outlined">search</span>
                  </div>
                  <input 
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-full text-[#3C3C3C] dark:text-[#E0E0E0] focus:outline-0 focus:ring-0 border-none bg-transparent h-full placeholder:text-[#6B6B6B] dark:placeholder:text-[#A9A9A9] pl-2 pr-6 text-base font-normal leading-normal font-resource-body" 
                    placeholder="Search for 'sleep', 'anxiety', etc."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </label>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
                {RESOURCE_FILTERS.map(filter => (
                    <button 
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full px-5 font-resource-body text-sm font-semibold leading-normal transition-colors ${
                            activeFilter === filter 
                            ? 'bg-[#76A6A5] text-white' 
                            : 'bg-white dark:bg-slate-800 text-[#6B6B6B] dark:text-[#A9A9A9] hover:bg-slate-100 dark:hover:bg-slate-700'
                        }`}
                    >
                        {filter}
                    </button>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Resource Grid */}
      <section className="w-full py-12">
        <div className="container mx-auto max-w-6xl px-4">
          
          {meditationResources.length > 0 && (
            <div className="mb-16">
              <h2 className="font-resource-display text-3xl font-bold leading-tight tracking-tight mb-6">Guided Meditations</h2>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {meditationResources.map((resource) => <ResourceCard key={resource.id} resource={resource} />)}
              </div>
            </div>
          )}

          {readingResources.length > 0 && (
             <div className="mb-10">
              <h2 className="font-resource-display text-3xl font-bold leading-tight tracking-tight mb-6">Reading &amp; Insights</h2>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {readingResources.map((resource) => <ResourceCard key={resource.id} resource={resource} />)}
              </div>
            </div>
          )}
          
          {filteredResources.length === 0 && (
              <div className="col-span-full text-center py-16 bg-white/50 dark:bg-slate-800/30 rounded-xl">
                  <span className="material-symbols-outlined text-6xl text-slate-400 dark:text-slate-500 mb-4">search_off</span>
                  <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 font-resource-display">No Resources Found</h3>
                  <p className="text-slate-500 dark:text-slate-400 mt-2 font-resource-body">Try adjusting your search or filters.</p>
              </div>
          )}

        </div>
      </section>

      {/* Newsletter Subscription CTA */}
      <section className="w-full py-16">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="bg-[#76a6a5]/10 dark:bg-[#76a6a5]/20 rounded-xl p-8 md:p-12 text-center">
            <h2 className="font-resource-display text-3xl font-bold leading-tight">Stories of Growth, Delivered to You</h2>
            <p className="mx-auto mt-3 max-w-xl text-[#6B6B6B] dark:text-[#A9A9A9] font-resource-body">Join our newsletter for inspiring stories, new resources, and tips for your wellness journey.</p>
            <form className="mx-auto mt-8 flex max-w-lg flex-col gap-4 sm:flex-row">
              <input disabled className="form-input h-12 flex-grow rounded-full border-slate-300 dark:border-slate-600 bg-[#F9F7F3] dark:bg-slate-800 px-5 focus:border-[#76A6A5] focus:ring-[#76A6A5] font-resource-body disabled:opacity-50" placeholder="Enter your email" type="email"/>
              <button disabled className="flex cursor-not-allowed opacity-50 items-center justify-center overflow-hidden rounded-full h-12 px-8 bg-[#F4A261] text-white text-base font-bold leading-normal tracking-wide font-resource-body" type="button">
                <span className="truncate">Subscribe</span>
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ResourcePage;
