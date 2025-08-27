import React, { useState } from 'react';
import Card from './Card';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import AcademicCapIcon from './icons/AcademicCapIcon';
import TrainerCard from './TrainerCard';
import CompetenceTracker from './CompetenceTracker';
import type { Trainer } from '../types';

interface CompetenceCenterViewProps {
  onBack: () => void;
}

const mockTrainers: Trainer[] = [
    { 
        id: '1', 
        name: 'John Doe', 
        role: 'Lead VET Trainer',
        competences: [
            { id: 'c1', name: 'Curriculum Design', level: 'Expert', achieved: true },
            { id: 'c2', name: 'Inclusive Pedagogy', level: 'Expert', achieved: true },
            { id: 'c3', name: 'Digital Tools Proficiency', level: 'Proficient', achieved: true },
            { id: 'c4', name: 'Learner Assessment', level: 'Proficient', achieved: false },
        ]
    },
    { 
        id: '2', 
        name: 'Jane Smith', 
        role: 'Junior Community Educator',
        competences: [
            { id: 'c1', name: 'Curriculum Design', level: 'Foundational', achieved: true },
            { id: 'c2', name: 'Inclusive Pedagogy', level: 'Proficient', achieved: true },
            { id: 'c3', name: 'Digital Tools Proficiency', level: 'Foundational', achieved: false },
            { id: 'c4', name: 'Learner Assessment', level: 'Foundational', achieved: false },
        ]
    },
];

const CompetenceCenterView: React.FC<CompetenceCenterViewProps> = ({ onBack }) => {
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer>(mockTrainers[0]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
         <div>
            <h2 className="text-3xl font-bold text-slate-900">Trainer Competence Center</h2>
            <p className="mt-1 text-lg text-slate-600">Track and support the professional development of your staff.</p>
         </div>
         <button 
           onClick={onBack} 
           className="flex items-center bg-white text-slate-700 font-semibold py-2 px-4 border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors"
         >
           <ChevronLeftIcon className="w-5 h-5 mr-2" />
           Back to Dashboard
         </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
             <Card title="Your Trainers" icon={<AcademicCapIcon />}>
                <div className="space-y-2">
                    {mockTrainers.map(trainer => (
                        <TrainerCard 
                            key={trainer.id}
                            trainer={trainer}
                            isSelected={selectedTrainer.id === trainer.id}
                            onSelect={() => setSelectedTrainer(trainer)}
                        />
                    ))}
                </div>
             </Card>
        </div>
        <div className="lg:col-span-2">
            {selectedTrainer && (
                <Card title={`Competences for ${selectedTrainer.name}`} icon={<AcademicCapIcon />}>
                    <CompetenceTracker trainer={selectedTrainer} />
                </Card>
            )}
        </div>
      </div>

       <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default CompetenceCenterView;
