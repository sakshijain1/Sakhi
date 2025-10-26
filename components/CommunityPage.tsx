

import React, { useState, useMemo, useRef } from 'react';
import { OPEN_COMMUNITIES, GUIDED_JOURNEYS, COMMUNITY_FILTERS, Community, GuidedJourney } from '../constants';

type CommunityView = 'open' | 'guided';

interface CommunityPageProps {
    onGoBack: () => void;
}

const CommunityPage: React.FC<CommunityPageProps> = ({ onGoBack }) => {
    const [activeView, setActiveView] = useState<CommunityView>('open');
    const [activeFilter, setActiveFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const contentRef = useRef<HTMLElement>(null);

    const handleExploreClick = () => {
        contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const filterCommunities = <T extends Community>(communities: T[]): T[] => {
        return communities.filter(community => {
            const searchLower = searchTerm.toLowerCase();
            const categoryMatch = activeFilter === 'All' || community.category === activeFilter;
            const searchMatch = searchTerm === '' ||
                                community.title.toLowerCase().includes(searchLower) ||
                                community.description.toLowerCase().includes(searchLower);
            return categoryMatch && searchMatch;
        });
    };

    const filteredOpenCommunities = useMemo(() => filterCommunities(OPEN_COMMUNITIES), [activeFilter, searchTerm]);
    const filteredGuidedJourneys = useMemo(() => filterCommunities(GUIDED_JOURNEYS), [activeFilter, searchTerm]);

    return (
        <main className="flex flex-1 flex-col items-center px-4 py-8 sm:py-12 w-full max-w-6xl">
            <div className="w-full max-w-6xl self-start">
                <button onClick={onGoBack} className="p-2 rounded-full hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors mb-4">
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
            </div>
            {/* Hero Section */}
            <section className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center text-center lg:text-left mb-12">
                <div className="flex flex-col gap-6 items-center lg:items-start">
                    <h1 className="text-[#0d171b] dark:text-slate-50 text-4xl md:text-5xl font-black leading-tight tracking-tighter">
                        Connect and Grow Together
                    </h1>
                    <p className="text-[#4c809a] dark:text-slate-400 text-lg font-normal leading-normal max-w-md">
                        Discover spaces for healing, sharing, and finding peace. Your community is waiting.
                    </p>
                    <button 
                        onClick={handleExploreClick}
                        className="flex items-center justify-center min-w-[150px] cursor-pointer overflow-hidden rounded-xl h-12 px-6 bg-primary text-slate-50 text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors shadow-lg"
                    >
                        <span className="truncate">Explore Communities</span>
                    </button>
                </div>
                <div 
                    className="w-full aspect-video bg-cover bg-center rounded-xl"
                    style={{ backgroundImage: `url('https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')` }}
                    aria-label="A diverse group of people collaborating happily around a table."
                ></div>
            </section>
            
            {/* Search, Filter & Content Anchor */}
            <section ref={contentRef} className="w-full flex flex-col gap-4 mb-10 scroll-mt-20">
                <div className="relative w-full">
                    <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">search</span>
                    <input 
                        type="search" 
                        placeholder="Search groups by name or keyword..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="form-input w-full h-14 pl-14 pr-4 rounded-full border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/60 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow shadow-md"
                    />
                </div>
                <div className="flex gap-3 p-1 overflow-x-auto -mx-4 px-4">
                    {COMMUNITY_FILTERS.map(filter => (
                        <button key={filter} onClick={() => setActiveFilter(filter)} className={`h-10 cursor-pointer shrink-0 items-center justify-center gap-x-2 rounded-full px-5 text-sm font-bold transition-colors ${activeFilter === filter ? 'bg-primary text-white shadow-md' : 'bg-white/60 dark:bg-slate-800/50 hover:bg-white/90 dark:hover:bg-slate-800'}`}>
                            {filter}
                        </button>
                    ))}
                </div>
            </section>

            {/* Segmented Control */}
            <div className="w-full max-w-lg mx-auto flex h-12 items-center justify-center rounded-full bg-slate-200/70 dark:bg-slate-800/60 p-1.5 mb-10">
                <button onClick={() => setActiveView('open')} className={`flex-1 h-full rounded-full text-sm font-bold transition-all ${activeView === 'open' ? 'bg-white dark:bg-slate-700 shadow-md' : 'text-slate-600 dark:text-slate-400'}`}>
                    Open Communities
                </button>
                 <button onClick={() => setActiveView('guided')} className={`flex-1 h-full rounded-full text-sm font-bold transition-all ${activeView === 'guided' ? 'bg-white dark:bg-slate-700 shadow-md' : 'text-slate-600 dark:text-slate-400'}`}>
                    Guided Journeys
                </button>
            </div>

            {/* Content Display */}
            {activeView === 'open' && (
                <section className="w-full">
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Open Communities</h3>
                        <p className="text-slate-600 dark:text-slate-400 mt-1">Join free, peer-led groups to share experiences and support each other.</p>
                    </div>
                    {filteredOpenCommunities.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredOpenCommunities.map(c => (
                                <div key={c.title} className="flex flex-col bg-white/60 dark:bg-slate-800/40 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                                    <img src={c.image} alt={c.title} className="w-full h-40 object-cover" />
                                    <div className="p-5 flex flex-col gap-3 flex-grow">
                                        <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100">{c.title}</h4>
                                        <p className="text-sm text-slate-700 dark:text-slate-300 flex-grow">{c.description}</p>
                                        <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400 mt-2">
                                            <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-base">group</span>{c.members} Members</span>
                                            <span className="flex items-center gap-1.5 font-medium text-primary"><span className="material-symbols-outlined text-base">{c.categoryIcon}</span>{c.category}</span>
                                        </div>
                                        <button className="mt-4 w-full bg-primary/20 dark:bg-primary/30 text-primary font-bold py-2.5 rounded-lg hover:bg-primary/30 dark:hover:bg-primary/40 transition-colors">Explore Group</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="col-span-full text-center py-16 bg-white/50 dark:bg-slate-800/30 rounded-xl">
                            <span className="material-symbols-outlined text-6xl text-slate-400 dark:text-slate-500 mb-4">search_off</span>
                            <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300">No Communities Found</h3>
                            <p className="text-slate-500 dark:text-slate-400 mt-2">Try adjusting your search or filters.</p>
                        </div>
                    )}
                </section>
            )}

            {activeView === 'guided' && (
                <section className="w-full">
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Guided Journeys</h3>
                        <p className="text-slate-600 dark:text-slate-400 mt-1">Participate in structured, expert-led communities for deeper growth.</p>
                    </div>
                     {filteredGuidedJourneys.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                           {filteredGuidedJourneys.map(j => (
                                 <div key={j.title} className="flex flex-col bg-white/60 dark:bg-slate-800/40 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border-2 border-primary/50">
                                    <img src={j.image} alt={j.title} className="w-full h-40 object-cover" />
                                    <div className="p-5 flex flex-col gap-3 flex-grow">
                                        <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100">{j.title}</h4>
                                        <p className="text-sm text-slate-700 dark:text-slate-300 flex-grow">{j.description}</p>
                                         <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400 mt-2">
                                            <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-base">group</span>{j.members} Members</span>
                                            <span className="flex items-center gap-1.5 font-medium text-primary"><span className="material-symbols-outlined text-base">{j.categoryIcon}</span>{j.category}</span>
                                        </div>
                                        <div className="flex items-center gap-2 pt-3 mt-3 border-t border-slate-300/70 dark:border-slate-700/70">
                                            <span className="material-symbols-outlined text-lg text-slate-600 dark:text-slate-400">person</span>
                                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Guided by {j.guideName}</span>
                                        </div>
                                        <button className="mt-auto w-full bg-primary text-white font-bold py-2.5 rounded-lg hover:bg-primary/90 transition-colors shadow-md">View Schedule</button>
                                    </div>
                                </div>
                           ))}
                        </div>
                     ) : (
                        <div className="col-span-full text-center py-16 bg-white/50 dark:bg-slate-800/30 rounded-xl">
                            <span className="material-symbols-outlined text-6xl text-slate-400 dark:text-slate-500 mb-4">search_off</span>
                            <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300">No Journeys Found</h3>
                            <p className="text-slate-500 dark:text-slate-400 mt-2">Try adjusting your search or filters.</p>
                        </div>
                    )}
                </section>
            )}
        </main>
    );
};

export default CommunityPage;
