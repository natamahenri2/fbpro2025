
import React from 'react';
import { Section } from '../types';

interface ContentDisplayProps {
  section: Section;
}

export const ContentDisplay: React.FC<ContentDisplayProps> = ({ section }) => {
  return (
    <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none bg-white p-6 sm:p-8 rounded-lg shadow-md">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-slate-800 border-b pb-3">{section.title}</h1>
      {section.paragraphs.map((paragraph, index) => (
        <p key={index} className="mb-4 text-gray-700 leading-relaxed">
          {paragraph}
        </p>
      ))}
    </article>
  );
};
