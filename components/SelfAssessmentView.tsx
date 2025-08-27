import React, { useState, useMemo } from 'react';
import Card from './Card';
import ClipboardListIcon from './icons/ClipboardListIcon';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import CheckIcon from './icons/CheckIcon';
import type { AssessmentScore, AssessmentResult } from '../types';
import AssessmentResultCard from './AssessmentResultCard';

interface SelfAssessmentViewProps {
  assessmentTopic: string;
  existingResult: AssessmentResult | undefined;
  onBack: () => void;
  onComplete: (topic: string, result: AssessmentResult) => void;
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

const scoreOptions: { id: AssessmentScore; label: string; color: string; }[] = [
    { id: 'not_met', label: 'Not Met', color: 'bg-red-200 hover:bg-red-300' },
    { id: 'partially_met', label: 'Partially Met', color: 'bg-yellow-200 hover:bg-yellow-300' },
    { id: 'fully_met', label: 'Fully Met', color: 'bg-green-200 hover:bg-green-300' },
];

const SelfAssessmentView: React.FC<SelfAssessmentViewProps> = ({ assessmentTopic, existingResult, onBack, onComplete }) => {
    
  const criteria = placeholderCriteria[assessmentTopic as keyof typeof placeholderCriteria] || [];
  
  const [scores, setScores] = useState<Record<string, AssessmentScore>>(() => {
    if (existingResult) return existingResult.scores;
    const initialScores: Record<string, AssessmentScore> = {};
    criteria.forEach(c => initialScores[c] = 'not_assessed');
    return initialScores;
  });
  const [notes, setNotes] = useState<Record<string, string>>(existingResult?.notes || {});
  const [isCompleted, setIsCompleted] = useState(!!existingResult);
  const [result, setResult] = useState<AssessmentResult | undefined>(existingResult);

  const handleScoreChange = (criterion: string, score: AssessmentScore) => {
    if (isCompleted) return;
    setScores(prev => ({...prev, [criterion]: score}));
  };

  const handleNoteChange = (criterion: string, value: string) => {
    if (isCompleted) return;
    setNotes(prev => ({...prev, [criterion]: value}));
  };

  const handleFinalize = () => {
    const totalPossibleScore = criteria.length * 2;
    let currentScore = 0;
    Object.values(scores).forEach(score => {
        if (score === 'partially_met') currentScore += 1;
        if (score === 'fully_met') currentScore += 2;
    });

    const scorePercentage = totalPossibleScore > 0 ? (currentScore / totalPossibleScore) * 100 : 0;
    
    let grade: AssessmentResult['grade'] = 'Developing';
    let summary = 'This is a solid start. The key areas for improvement have been identified, creating a clear path forward.';
    if (scorePercentage > 80) {
      grade = 'Exemplary';
      summary = 'Outstanding performance. The results indicate a mature and highly effective quality assurance system.';
    } else if (scorePercentage > 50) {
      grade = 'Proficient';
      summary = 'Great work. The institution demonstrates strong practices with some opportunities for refinement.';
    }

    const finalResult: AssessmentResult = { grade, scorePercentage, summary, scores, notes };
    setResult(finalResult);
    setIsCompleted(true);
    onComplete(assessmentTopic, finalResult);
  };
  
  const handleRevise = () => {
    setIsCompleted(false);
  }

  const allCriteriaScored = useMemo(() => {
    return criteria.every(c => scores[c] !== 'not_assessed');
  }, [scores, criteria]);
    
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

      {result && <AssessmentResultCard result={result} onRevise={handleRevise} />}

      <Card title="Assessment Criteria" icon={<ClipboardListIcon />}>
        <p className="mb-6 text-slate-600">
            For each criterion below, select a rating and provide evidence or notes.
        </p>
        <div className="space-y-6">
          {criteria.map((criterion, index) => (
            <div key={index} className="p-4 bg-slate-50 rounded-lg">
              <p className="font-semibold text-slate-800">{criterion}</p>
              <div className="mt-3 flex space-x-2">
                {scoreOptions.map(opt => (
                  <button 
                    key={opt.id} 
                    onClick={() => handleScoreChange(criterion, opt.id)}
                    disabled={isCompleted}
                    className={`px-3 py-1 rounded-full text-sm font-semibold transition-all ${scores[criterion] === opt.id ? `${opt.color.replace('hover:', '')} ring-2 ring-offset-1 ring-blue-500` : opt.color} ${isCompleted ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <div className="mt-3">
                 <textarea 
                   value={notes[criterion] || ''}
                   onChange={(e) => handleNoteChange(criterion, e.target.value)}
                   readOnly={isCompleted}
                   className={`w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${isCompleted ? 'bg-slate-100' : ''}`} 
                   rows={2} 
                   placeholder="Enter your notes and link to evidence here..."
                 ></textarea>
              </div>
            </div>
          ))}
        </div>
        {!isCompleted && (
        <div className="mt-8 flex justify-end">
            <button 
              onClick={handleFinalize}
              disabled={!allCriteriaScored}
              className={`flex items-center justify-center font-bold py-2 px-6 rounded-lg transition-all duration-300 w-52 ${
                !allCriteriaScored 
                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              <CheckIcon className="w-5 h-5 mr-2" />
              Finalize & View Results
            </button>
        </div>
        )}
      </Card>
       <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default SelfAssessmentView;
