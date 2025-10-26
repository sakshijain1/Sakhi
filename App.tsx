import React, { useState } from 'react';
import Header from './components/Header';
import MainContent from './components/MainContent';
import SupportPage from './components/SupportPage';
import ChatPage from './components/ChatPage';
import ProfessionalPage from './components/ProfessionalPage';
import ProfessionalDetailPage from './components/ProfessionalDetailPage';
import CommunityPage from './components/CommunityPage';
import ResourcePage from './components/ResourcePage';
import ResourceDetailPage from './components/ResourceDetailPage';
import { PROFESSIONALS, RESOURCES } from './constants';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false); 
  const [currentPage, setCurrentPage] = useState<'home' | 'support' | 'chat' | 'professional' | 'professionalDetail' | 'community' | 'resources' | 'resourceDetail'>('home');
  const [userFeeling, setUserFeeling] = useState('');
  const [selectedProfessionalId, setSelectedProfessionalId] = useState<number | null>(null);
  const [selectedResourceId, setSelectedResourceId] = useState<number | null>(null);

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleStartSupport = (feeling: string) => {
    setUserFeeling(feeling);
    setCurrentPage('support');
  };
  
  const handleGoHome = () => {
    setCurrentPage('home');
    setUserFeeling('');
    setSelectedProfessionalId(null);
    setSelectedResourceId(null);
  };

  const handleStartChat = () => {
    setCurrentPage('chat');
  };

  const handleNavigateToProfessional = () => {
    setCurrentPage('professional');
  };
  
  const handleNavigateToCommunity = () => {
    setCurrentPage('community');
  };

  const handleNavigateToResources = () => {
    setCurrentPage('resources');
  };

  const handleSelectProfessional = (id: number) => {
    setSelectedProfessionalId(id);
    setCurrentPage('professionalDetail');
  }

  const handleSelectResource = (id: number) => {
    setSelectedResourceId(id);
    setCurrentPage('resourceDetail');
  };

  const handleBackToSupport = () => {
    setCurrentPage('support');
  };

  const handleBackToProfessionals = () => {
    setCurrentPage('professional');
    setSelectedProfessionalId(null);
  };
  
  const handleBackToResources = () => {
    setCurrentPage('resources');
    setSelectedResourceId(null);
  }
  
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <MainContent onStartSupport={handleStartSupport} onNavigateToCommunity={handleNavigateToCommunity} />;
      case 'support':
        return <SupportPage feeling={userFeeling} onGoHome={handleGoHome} onStartChat={handleStartChat} onConnectProfessional={handleNavigateToProfessional} onNavigateToResources={handleNavigateToResources} />;
      case 'chat':
        return <ChatPage feeling={userFeeling} onGoBack={handleBackToSupport} />;
      case 'professional':
        return <ProfessionalPage onGoBack={handleBackToSupport} onSelectProfessional={handleSelectProfessional} />;
      case 'professionalDetail':
        const professional = PROFESSIONALS.find(p => p.id === selectedProfessionalId);
        if (professional) {
          return <ProfessionalDetailPage professional={professional} onGoBack={handleBackToProfessionals} />;
        }
        return <ProfessionalPage onGoBack={handleBackToSupport} onSelectProfessional={handleSelectProfessional} />;
      case 'community':
        return <CommunityPage />;
      case 'resources':
        return <ResourcePage onSelectResource={handleSelectResource} />;
      case 'resourceDetail':
        const resource = RESOURCES.find(r => r.id === selectedResourceId);
        if (resource) {
            return <ResourceDetailPage resource={resource} onGoBack={handleBackToResources} />;
        }
        return <ResourcePage onSelectResource={handleSelectResource} />;
      default:
        return <MainContent onStartSupport={handleStartSupport} onNavigateToCommunity={handleNavigateToCommunity} />;
    }
  };

  return (
    <div 
      className="relative flex min-h-screen w-full flex-col items-center bg-gradient-to-br from-sky-100 via-white to-blue-200 dark:from-slate-900 dark:via-sky-950 dark:to-blue-900 text-slate-800 dark:text-slate-200 animate-gradient"
    >
      <Header 
        onGoHome={handleGoHome}
        onNavigateToGuides={handleNavigateToProfessional}
        onNavigateToCommunity={handleNavigateToCommunity}
        onNavigateToResources={handleNavigateToResources}
      />
      {renderPage()}
    </div>
  );
};

export default App;