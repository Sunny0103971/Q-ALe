import React from 'react';
import type { Badge } from '../types';
import SparklesIcon from './icons/SparklesIcon';
import CheckCircleIcon from './icons/CheckCircleIcon';

interface BadgeCardProps {
  badge: Badge;
}

const BadgeCard: React.FC<BadgeCardProps> = ({ badge }) => {
  return (
    <div className={`p-4 rounded-lg border-2 flex flex-col items-center text-center transition-all duration-300 ${
        badge.unlocked 
        ? 'bg-yellow-50 border-yellow-300 shadow-lg' 
        : 'bg-slate-100 border-slate-200 filter grayscale opacity-70'
    }`}>
        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${badge.unlocked ? 'bg-yellow-400' : 'bg-slate-300'}`}>
            {badge.unlocked ? <CheckCircleIcon className="w-10 h-10 text-white" /> : <SparklesIcon className="w-10 h-10 text-slate-500" />}
        </div>
        <h4 className={`mt-3 font-bold ${badge.unlocked ? 'text-yellow-900' : 'text-slate-700'}`}>{badge.title}</h4>
        <p className={`mt-1 text-sm ${badge.unlocked ? 'text-yellow-800' : 'text-slate-500'}`}>{badge.description}</p>
    </div>
  );
};

export default BadgeCard;
