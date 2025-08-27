
import React from 'react';
import type { DocumentAnalysis } from '../types';
import Card from './Card';
import LightbulbIcon from './icons/LightbulbIcon';
import RocketIcon from './icons/RocketIcon';

const DocumentView: React.FC<{ document: DocumentAnalysis }> = ({ document }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold text-slate-900">{document.title}</h2>
        <p className="mt-2 text-lg text-slate-600">{document.description}</p>
      </div>

      <Card title="The 'One Thing' to Apply in Our Model" icon={<LightbulbIcon />}>
        <p className="text-2xl font-semibold text-blue-700 leading-tight">
          {document.takeaway}
        </p>
      </Card>
      
      <Card title="Rationale: Why This Is a Game-Changer" icon={<RocketIcon />}>
        <p className="text-slate-700 leading-relaxed">
          {document.rationale}
        </p>
      </Card>
    </div>
  );
};

export default DocumentView;
