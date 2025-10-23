import React from 'react';
import Header from './components/Header';
import MainContent from './components/MainContent';

const App: React.FC = () => {
  // In a full app, you might use a context or state management library for this
  const [isDarkMode, setIsDarkMode] = React.useState(false); 

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
  
  return (
    <div 
      className="relative flex min-h-screen w-full flex-col items-center bg-gradient-to-br from-sky-100 via-white to-blue-200 dark:from-slate-900 dark:via-sky-950 dark:to-blue-900 text-slate-800 dark:text-slate-200 animate-gradient"
    >
      <Header />
      <MainContent />
    </div>
  );
};

export default App;