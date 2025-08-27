import React from 'react';
import type { Trainer, Competence } from '../types';
import CheckIcon from './icons/CheckIcon';

const levelStyles = {
    'Foundational': 'bg-gray-200 text-gray-800',
    'Proficient': 'bg-blue-200 text-blue-800',
    'Expert': 'bg-indigo-200 text-indigo-800',
}

const CompetenceItem: React.FC<{ competence: Competence }> = ({ competence }) => {
    return (
        <li className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
            <span className="font-semibold text-slate-700">{competence.name}</span>
            <div className="flex items-center space-x-3">
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${levelStyles[competence.level]}`}>
                    {competence.level}
                </span>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center ${competence.achieved ? 'bg-green-500' : 'bg-slate-300'}`}>
                    {competence.achieved && <CheckIcon className="w-5 h-5 text-white" />}
                </div>
            </div>
        </li>
    )
}


const CompetenceTracker: React.FC<{ trainer: Trainer }> = ({ trainer }) => {
  return (
    <div className="space-y-4">
        <div className="p-4 bg-blue-50 rounded-lg text-center">
            <h3 className="text-lg font-bold text-blue-800">Overall Competency</h3>
            <p className="text-2xl font-extrabold text-blue-900 mt-1">
                {Math.round(trainer.competences.filter(c => c.achieved).length / trainer.competences.length * 100)}%
            </p>
            <p className="text-sm text-blue-700">Complete</p>
        </div>
        <div>
            <h4 className="font-semibold text-slate-800 mb-2">Competence Checklist</h4>
            <ul className="space-y-2">
                {trainer.competences.map(comp => (
                    <CompetenceItem key={comp.id} competence={comp} />
                ))}
            </ul>
        </div>
    </div>
  );
};

export default CompetenceTracker;
