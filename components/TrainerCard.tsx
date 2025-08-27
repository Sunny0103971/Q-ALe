import React from 'react';
import type { Trainer } from '../types';

interface TrainerCardProps {
  trainer: Trainer;
  isSelected: boolean;
  onSelect: () => void;
}

const TrainerCard: React.FC<TrainerCardProps> = ({ trainer, isSelected, onSelect }) => {
  const totalCompetences = trainer.competences.length;
  const achievedCompetences = trainer.competences.filter(c => c.achieved).length;
  const progress = totalCompetences > 0 ? (achievedCompetences / totalCompetences) * 100 : 0;

  return (
    <button 
        onClick={onSelect}
        className={`w-full p-3 rounded-lg text-left transition-all border-2 ${isSelected ? 'bg-blue-100 border-blue-400 shadow-md' : 'bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300'}`}
    >
        <div className="flex justify-between items-center">
            <div>
                <h4 className="font-bold text-slate-800">{trainer.name}</h4>
                <p className="text-sm text-slate-600">{trainer.role}</p>
            </div>
            <div className="text-right">
                <p className="font-bold text-sm text-blue-700">{achievedCompetences}/{totalCompetences}</p>
                <p className="text-xs text-slate-500">Completed</p>
            </div>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
            <div className="bg-blue-600 h-1.5 rounded-full" style={{width: `${progress}%`}}></div>
        </div>
    </button>
  );
};

export default TrainerCard;
