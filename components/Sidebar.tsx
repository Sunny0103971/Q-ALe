
import React from 'react';
import type { DocumentAnalysis } from '../types';
import ChevronRightIcon from './icons/ChevronRightIcon';

interface SidebarProps {
  documents: DocumentAnalysis[];
  onSelect: (document: DocumentAnalysis) => void;
  selectedDocumentId: string | null;
}

const Sidebar: React.FC<SidebarProps> = ({ documents, onSelect, selectedDocumentId }) => {
  return (
    <aside className="w-64 bg-white p-4 border-r border-slate-200 hidden md:block">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">QA Materials</h2>
      <nav>
        <ul>
          {documents.map((doc) => (
            <li key={doc.id} className="mb-2">
              <button
                onClick={() => onSelect(doc)}
                className={`w-full text-left p-2 rounded-md transition-colors duration-200 flex items-center justify-between ${
                  selectedDocumentId === doc.id
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span>{doc.shortTitle}</span>
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
