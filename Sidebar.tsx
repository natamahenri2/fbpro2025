
import React from 'react';
import { Section } from '../types';

interface SidebarProps {
  sections: Section[];
  activeSectionId: string;
  onSelectSection: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ sections, activeSectionId, onSelectSection }) => {
  return (
    <aside className="w-64 bg-slate-800 text-slate-100 p-4 sm:p-6 space-y-4 overflow-y-auto h-screen shadow-lg">
      <h2 className="text-xl sm:text-2xl font-bold border-b border-slate-700 pb-3 mb-4">Daftar Isi</h2>
      <nav>
        <ul>
          {sections.map((section) => (
            <li key={section.id} className="mb-1">
              <button
                onClick={() => onSelectSection(section.id)}
                className={`w-full text-left px-3 py-2.5 rounded-md text-sm sm:text-base transition-colors duration-150 ease-in-out
                            ${activeSectionId === section.id 
                              ? 'bg-sky-600 text-white font-semibold shadow-md' 
                              : 'hover:bg-slate-700 hover:text-sky-300'
                            }`}
              >
                {section.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
