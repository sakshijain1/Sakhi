
import React from 'react';
import { LogoIcon } from './LogoIcon';

const Header: React.FC = () => {
  const navItems = ['Home', 'Connect', 'Resources', 'Community', 'About Us'];

  return (
    <header className="w-full max-w-6xl flex items-center justify-between whitespace-nowrap px-6 sm:px-10 py-4">
      <div className="flex items-center gap-4 text-slate-900 dark:text-slate-50">
        <div className="size-10">
          <LogoIcon />
        </div>
        <h2 className="text-xl font-bold tracking-tight">Sakhi</h2>
      </div>
      <nav className="hidden md:flex flex-1 justify-end gap-8">
        <div className="flex items-center gap-9">
          {navItems.map((item) => (
            <a key={item} className="text-sm font-medium hover:text-primary transition-colors" href="#">{item}</a>
          ))}
        </div>
        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-primary text-slate-50 text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors">
          <span className="truncate">Login</span>
        </button>
      </nav>
      <button className="md:hidden p-2 rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-700/50">
        <span className="material-symbols-outlined">menu</span>
      </button>
    </header>
  );
};

export default Header;