import React, { useState } from 'react';
import Card from './Card';
import ClipboardListIcon from './icons/ClipboardListIcon';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import CheckIcon from './icons/CheckIcon';

interface SelfAssessmentViewProps {
  assessmentTopic: string;
  onBack: () => void;
}

const placeholderCriteria = {
  "Learner Journey & Outcomes": [
    "Learner goals are identified and documented at the start.",
    "Progress is regularly reviewed against learner goals.",
    "Support is provided for learners with additional needs.",
    "Learner feedback is systematically collected and acted upon."
  ],
  "Staff Development & Competence": [
    "A formal process for trainer observation and feedback exists.",
    "Professional development needs are identified and supported.",
    "Trainers have access to up-to-date resources and training.",
    "A competence framework for staff roles is in place."
  ],
  "Governance & Compliance": [
    "Statutory and regulatory requirements are fully met.",
    "Clear policies and procedures are documented and accessible.",
    "There is effective oversight from a governing body.",
    "Financial management is robust and transparent."
  ],
  "Peer Collaboration & Review": [
    "The institution actively participates in peer networks.",
    "Feedback from peer reviews is used for improvement planning.",
    "Good practice is shared with other providers.",
    "Staff are given opportunities to act as peer reviewers."
  ]
};


const SelfAssessmentView: React.FC<SelfAssessmentViewProps> = ({ assessmentTopic, onBack }) => {
    
  const criteria = placeholderCriteria[assessmentTopic as keyof typeof placeholderCriteria] || [];
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [showSaved, setShowSaved] = useState(false);

  const handleNoteChange = (criterion: string, value: string) => {
    setNotes(prev => ({...prev, [criterion]: value}));
  };

  const handleSave = () => {
    setIsSaving(true);
    setShowSaved(false);
    // In a real app, you'd send this to a server.
    // Here we simulate it with a timeout.
    console.log("Saving data:", notes);
    setTimeout(() => {
        setIsSaving(false);
        setShowSaved(true);
        // Hide the "Saved!" message after 2 seconds
        setTimeout(() => setShowSaved(false), 2000);
    }, 1500);
  }
    
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
         <div>
            <h2 className="text-3xl font-bold text-slate-900">Self-Assessment</h2>
            <p className="mt-1 text-lg text-slate-600">{assessmentTopic}</p>
         </div>
         <button 
           onClick={onBack} 
           className="flex items-center bg-white text-slate-700 font-semibold py-2 px-4 border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors"
         >
           <ChevronLeftIcon className="w-5 h-5 mr-2" />
           Back to Dashboard
         </button>
      </div>

      <Card title="Assessment Criteria" icon={<ClipboardListIcon />}>
        <p className="mb-6 text-slate-600">
            For each criterion below, evaluate your institution's performance and provide evidence.
        </p>
        <div className="space-y-4">
          {criteria.map((criterion, index) => (
            <div key={index} className="p-4 bg-slate-50 rounded-lg">
              <p className="font-semibold text-slate-800">{criterion}</p>
              <div className="mt-3">
                 <textarea 
                   value={notes[criterion] || ''}
                   onChange={(e) => handleNoteChange(criterion, e.target.value)}
                   className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" 
                   rows={2} 
                   placeholder="Enter your notes and link to evidence here..."
                 ></textarea>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-end">
            <button 
              onClick={handleSave}
              disabled={isSaving || showSaved}
              className={`flex items-center justify-center font-bold py-2 px-6 rounded-lg transition-all duration-300 w-40 ${
                isSaving 
                  ? 'bg-slate-400 text-white cursor-not-allowed' 
                  : showSaved 
                  ? 'bg-green-600 text-white'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isSaving ? (
                'Saving...'
              ) : showSaved ? (
                <>
                  <CheckIcon className="w-5 h-5 mr-2" />
                  Saved!
                </>
              ) : (
                'Save Progress'
              )}
            </button>
        </div>
      </Card>
       <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default SelfAssessmentView;