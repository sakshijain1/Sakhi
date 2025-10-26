import React, { useState, useMemo } from 'react';
import { PROFESSIONALS } from '../constants';
import ProfessionalCard from './ProfessionalCard';

const professionalTypes = Array.from(new Set(PROFESSIONALS.map(p => p.type)));
const pricingTiers = {
  'all': 'All Prices',
  'tier1': 'Under $75',
  'tier2': '$75 - $150',
  'tier3': 'Over $150',
};

interface ProfessionalPageProps {
  onGoBack: () => void;
  onSelectProfessional: (id: number) => void;
}

const ProfessionalPage: React.FC<ProfessionalPageProps> = ({ onGoBack, onSelectProfessional }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [showAvailable, setShowAvailable] = useState(false);
  const [showFreeSession, setShowFreeSession] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState<string>('all');
  const [sortBy, setSortBy] = useState('rating');

  const filteredProfessionals = useMemo(() => {
    return PROFESSIONALS.filter(p => {
      // Name Search Filter
      const searchLower = searchTerm.toLowerCase();
      const nameMatch = p.name.toLowerCase().includes(searchLower);
      const specialtyMatch = p.specialties.some(s => s.toLowerCase().includes(searchLower));
      if (searchTerm && !nameMatch && !specialtyMatch) {
        return false;
      }
      // Type Filter
      if (selectedType !== 'All' && p.type !== selectedType) {
        return false;
      }
      // Availability Filter
      if (showAvailable && p.availability !== 'Available Now') {
        return false;
      }
      // Free Session Filter
      if (showFreeSession && !p.freeSession) {
        return false;
      }
      // Pricing Filter
      if (selectedPrice !== 'all') {
        if (selectedPrice === 'tier1' && p.pricing >= 75) return false;
        if (selectedPrice === 'tier2' && (p.pricing < 75 || p.pricing > 150)) return false;
        if (selectedPrice === 'tier3' && p.pricing <= 150) return false;
      }
      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.pricing - b.pricing;
        case 'price-desc':
          return b.pricing - a.pricing;
        case 'rating':
        default:
          return b.rating - a.rating;
      }
    });
  }, [searchTerm, selectedType, showAvailable, showFreeSession, selectedPrice, sortBy]);

  return (
    <main className="flex flex-1 flex-col items-center px-4 py-8 sm:py-12 w-full max-w-7xl">
       <div className="w-full relative text-center mb-8">
        <button onClick={onGoBack} className="p-2 rounded-full hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors absolute left-0 top-1/2 -translate-y-1/2 hidden sm:block">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="flex flex-col gap-2">
            <h1 className="text-[#0d171b] dark:text-slate-50 text-3xl sm:text-4xl font-black leading-tight tracking-tighter">Find Your Guide</h1>
            <p className="text-[#4c809a] dark:text-slate-400 text-base sm:text-lg font-normal leading-normal max-w-2xl mt-1 mx-auto">
            Connect with licensed therapists, counselors, and guides who can provide expert support.
            </p>
        </div>
      </div>

      <div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-12 mt-8">
        {/* Filters Sidebar */}
        <aside className="w-full lg:w-1/4 xl:w-1/5 space-y-8 lg:sticky lg:top-28 self-start">
            <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">search</span>
                <input 
                    type="search" 
                    placeholder="Search by name, specialty..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="form-input w-full h-14 pl-12 pr-4 rounded-xl border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/60 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                />
            </div>
            <div className="space-y-6">
                <div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-4">Profession Type</h3>
                    <select id="prof-type" value={selectedType} onChange={e => setSelectedType(e.target.value)} className="form-select w-full rounded-lg border-slate-300 dark:border-slate-600 bg-white/80 dark:bg-slate-900/60 focus:ring-primary focus:border-primary">
                        <option>All</option>
                        {professionalTypes.map(type => <option key={type} value={type}>{type}</option>)}
                    </select>
                </div>
                <div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-4">Price</h3>
                    <select id="price-tier" value={selectedPrice} onChange={e => setSelectedPrice(e.target.value)} className="form-select w-full rounded-lg border-slate-300 dark:border-slate-600 bg-white/80 dark:bg-slate-900/60 focus:ring-primary focus:border-primary">
                        {Object.entries(pricingTiers).map(([key, value]) => <option key={key} value={key}>{value}</option>)}
                    </select>
                </div>
                <div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-4">Availability</h3>
                    <div className="space-y-3">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" checked={showAvailable} onChange={e => setShowAvailable(e.target.checked)} className="form-checkbox h-5 w-5 rounded text-primary focus:ring-primary/50 border-slate-400/80 bg-white dark:bg-slate-800" />
                            <span className="font-medium text-slate-700 dark:text-slate-300">Available Now</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" checked={showFreeSession} onChange={e => setShowFreeSession(e.target.checked)} className="form-checkbox h-5 w-5 rounded text-primary focus:ring-primary/50 border-slate-400/80 bg-white dark:bg-slate-800" />
                            <span className="font-medium text-slate-700 dark:text-slate-300">Offers Free Session</span>
                        </label>
                    </div>
                </div>
            </div>
        </aside>

        {/* Professionals List */}
        <div className="w-full lg:w-3/4 xl:w-4/5">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <p className="text-slate-600 dark:text-slate-400">
                    Showing <span className="font-bold text-slate-800 dark:text-slate-200">{filteredProfessionals.length}</span> results
                </p>
                <div className="flex items-center gap-2">
                    <label htmlFor="sort-by" className="text-sm font-medium text-slate-700 dark:text-slate-300">Sort by</label>
                    <select 
                        id="sort-by"
                        value={sortBy}
                        onChange={e => setSortBy(e.target.value)}
                        className="form-select rounded-lg border-slate-300 dark:border-slate-600 bg-white/80 dark:bg-slate-900/60 focus:ring-primary focus:border-primary text-sm h-10"
                    >
                        <option value="rating">Rating</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                    </select>
                </div>
            </div>
            <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-6">
                {filteredProfessionals.length > 0 ? (
                filteredProfessionals.map(prof => <ProfessionalCard key={prof.id} professional={prof} onSelect={() => onSelectProfessional(prof.id)} />)
                ) : (
                <div className="col-span-full text-center py-16 bg-white/50 dark:bg-slate-800/30 rounded-xl">
                    <span className="material-symbols-outlined text-6xl text-slate-400 dark:text-slate-500 mb-4">search_off</span>
                    <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300">No Professionals Found</h3>
                    <p className="text-slate-500 dark:text-slate-400 mt-2">Try adjusting your filters to find more results.</p>
                </div>
                )}
            </div>
        </div>
      </div>
    </main>
  );
};

export default ProfessionalPage;
