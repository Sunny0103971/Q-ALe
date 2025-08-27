import React from 'react';
import Card from './Card';
import BadgeCard from './BadgeCard';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import TrophyIcon from './icons/TrophyIcon';
import type { Badge } from '../types';
// FIX: Import SparklesIcon to fix 'Cannot find name' error.
import SparklesIcon from './icons/SparklesIcon';

interface ExcellencePathwayViewProps {
  onBack: () => void;
}

const mockBadges: Badge[] = [
  { id: 'assess-1', title: 'Self-Assessment Pioneer', description: 'Completed your first self-assessment.', unlocked: true },
  { id: 'peer-1', title: 'Collaborative Spirit', description: 'Completed your first peer review.', unlocked: false },
  { id: 'learner-focus', title: 'Learner-Centric Champion', description: 'Achieved "Exemplary" in the Learner Journey & Outcomes assessment.', unlocked: false },
  { id: 'staff-dev', title: 'Staff Development Advocate', description: 'Achieved "Exemplary" in the Staff Development assessment.', unlocked: false },
  { id: 'gov-pro', title: 'Governance Pro', description: 'Achieved "Exemplary" in the Governance & Compliance assessment.', unlocked: false },
  { id: 'feedback-guru', title: 'Feedback Guru', description: 'Collected and analyzed over 20 pieces of qualitative feedback.', unlocked: false },
  { id: 'competence-builder', title: 'Competence Builder', description: 'Certified all trainers in foundational competences.', unlocked: false },
  { id: 'quality-leader', title: 'Quality Leader', description: 'Unlock all other badges to achieve this.', unlocked: false },
];

const ExcellencePathwayView: React.FC<ExcellencePathwayViewProps> = ({ onBack }) => {
  const unlockedCount = mockBadges.filter(b => b.unlocked).length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
         <div>
            <h2 className="text-3xl font-bold text-slate-900">Excellence Pathway</h2>
            <p className="mt-1 text-lg text-slate-600">Unlock badges by engaging with the QA model and achieving excellence.</p>
         </div>
         <button 
           onClick={onBack} 
           className="flex items-center bg-white text-slate-700 font-semibold py-2 px-4 border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors"
         >
           <ChevronLeftIcon className="w-5 h-5 mr-2" />
           Back to Dashboard
         </button>
      </div>

      <Card title="Your Progress" icon={<TrophyIcon />}>
        <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-bold text-blue-800">Current Tier: Bronze</h3>
            <p className="text-blue-700">You've unlocked <span className="font-extrabold">{unlockedCount} / {mockBadges.length}</span> badges.</p>
            <div className="w-full bg-slate-200 rounded-full h-2.5 mt-2">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{width: `${(unlockedCount / mockBadges.length) * 100}%`}}></div>
            </div>
        </div>
      </Card>

      <Card title="Badge Arcade" icon={<SparklesIcon />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {mockBadges.map(badge => (
                <BadgeCard key={badge.id} badge={badge} />
            ))}
        </div>
      </Card>

       <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default ExcellencePathwayView;
