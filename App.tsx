
import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { ContentDisplay } from './components/ContentDisplay';
import { GeminiKeyPoints } from './components/GeminiKeyPoints';
import { bookSections } from './data/contentData';
import { Section } from './types';

const App: React.FC = () => {
  const [activeSectionId, setActiveSectionId] = useState<string>(() => {
    const hash = window.location.hash.replace('#', '');
    return hash || (bookSections.length > 0 ? bookSections[0].id : '');
  });

  const activeSection = bookSections.find(section => section.id === activeSectionId);

  useEffect(() => {
    const handleHashChange = () => {
      setActiveSectionId(window.location.hash.replace('#', '') || (bookSections.length > 0 ? bookSections[0].id : ''));
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleSelectSection = (id: string) => {
    setActiveSectionId(id);
    window.location.hash = id;
  };

  return (
    <div className="flex h-screen bg-gray-100 text-gray-800">
      <Sidebar 
        sections={bookSections} 
        activeSectionId={activeSectionId} 
        onSelectSection={handleSelectSection} 
      />
      <main className="flex-1 p-6 sm:p-8 md:p-10 overflow-y-auto">
        {activeSection ? (
          <div>
            <ContentDisplay section={activeSection} />
            <GeminiKeyPoints sectionTitle={activeSection.title} sectionText={activeSection.paragraphs.join('\n\n')} />
          </div>
        ) : (
          <div className="text-center py-10">
            <h1 className="text-2xl font-semibold">Selamat Datang!</h1>
            <p className="mt-2 text-gray-600">Silakan pilih bagian dari panduan di sebelah kiri.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
