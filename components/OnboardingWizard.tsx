import React, { useState } from 'react';
import type { WizardAnswers } from '../types';

interface OnboardingWizardProps {
  onClose: () => void;
  onComplete: (answers: WizardAnswers) => void;
}

const OnboardingWizard: React.FC<OnboardingWizardProps> = ({ onClose, onComplete }) => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<WizardAnswers>({
    focus: '',
    priorities: [] as string[],
    experience: ''
  });

  const totalSteps = 4; // Number of actual input steps

  const handleNext = () => setStep(prev => Math.min(prev + 1, totalSteps + 1));
  const handleBack = () => setStep(prev => Math.max(prev - 1, 1));
  
  const handleSelect = (key: 'focus' | 'experience', value: string) => {
    setAnswers(prev => ({...prev, [key]: value}));
  };

  const handleMultiSelect = (key: 'priorities', value: string) => {
    setAnswers(prev => {
        const newValues = prev[key];
        if (newValues.includes(value)) {
            return {...prev, [key]: newValues.filter(v => v !== value)}
        } else if (newValues.length < 2) {
            return {...prev, [key]: [...newValues, value]}
        }
        return prev;
    })
  }

  const focusOptions = ["Vocational Training Center", "Community Learning Hub", "Corporate L&D Department", "NGO / Non-Profit"];
  const priorityOptions = ["Learner Journey & Outcomes", "Staff Development & Competence", "Governance & Compliance", "Peer Collaboration & Review"];
  const experienceOptions = ["Beginner (Just starting with formal QA)", "Intermediate (We have some processes)", "Advanced (We have a mature QA system)"];


  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Welcome to Project Q!</h2>
            <p className="text-slate-600">Let's personalize your Quality Assurance model. This quick setup wizard will tailor the framework to your institution's needs.</p>
            <p className="text-slate-600 mt-2">It only takes a minute.</p>
          </div>
        );
      case 2:
        return (
            <div>
                <h2 className="text-xl font-bold mb-4">What is your institution's primary focus?</h2>
                <div className="space-y-2">
                    {focusOptions.map(option => (
                        <button key={option} onClick={() => { handleSelect('focus', option); setTimeout(handleNext, 200); }} className={`block w-full text-left p-3 rounded-lg border-2 transition-all ${answers.focus === option ? 'bg-blue-600 text-white border-blue-600' : 'bg-white hover:bg-blue-50 border-slate-300'}`}>
                           {option}
                        </button>
                    ))}
                </div>
            </div>
        );
      case 3:
        return (
            <div>
                <h2 className="text-xl font-bold mb-4">Which quality areas are your top priority?</h2>
                <p className="text-sm text-slate-500 mb-4">Select up to two.</p>
                <div className="space-y-2">
                    {priorityOptions.map(option => (
                        <button key={option} onClick={() => handleMultiSelect('priorities', option)} className={`block w-full text-left p-3 rounded-lg border-2 transition-all ${answers.priorities.includes(option) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white hover:bg-blue-50 border-slate-300'}`}>
                           {option}
                        </button>
                    ))}
                </div>
            </div>
        );
      case 4:
        return (
            <div>
                <h2 className="text-xl font-bold mb-4">What's your current experience with QA systems?</h2>
                <div className="space-y-2">
                    {experienceOptions.map(option => (
                         <button key={option} onClick={() => { handleSelect('experience', option); setTimeout(handleNext, 200); }} className={`block w-full text-left p-3 rounded-lg border-2 transition-all ${answers.experience === option ? 'bg-blue-600 text-white border-blue-600' : 'bg-white hover:bg-blue-50 border-slate-300'}`}>
                           {option}
                        </button>
                    ))}
                </div>
            </div>
        );
      case 5:
        return (
            <div>
                <h2 className="text-2xl font-bold mb-4">Your Personalized Model Is Ready!</h2>
                <div className="space-y-4 text-slate-700 bg-slate-100 p-4 rounded-lg">
                    <p>Based on your selections, we've configured a QA model tailored for a <strong>{answers.focus}</strong> with a primary focus on:</p>
                    <ul className="list-disc list-inside font-semibold text-blue-800">
                        {answers.priorities.map(p => <li key={p}>{p}</li>)}
                    </ul>
                    <p>The tools and dashboards will be adjusted for a <strong>{answers.experience.split(' ')[0]}</strong> level, ensuring the process is both effective and user-friendly.</p>
                    <p className="mt-4 font-semibold">Click "Go to Dashboard" to explore your personalized model.</p>
                </div>
            </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fade-in" aria-modal="true" role="dialog">
      <div className="bg-slate-50 rounded-2xl shadow-2xl w-full max-w-xl p-8 m-4 transform transition-all animate-slide-up relative">
         <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600" aria-label="Close wizard">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        <div className="relative">
            {/* Progress Bar */}
            <div className="mb-8">
                <div className="h-2 w-full bg-slate-200 rounded-full">
                    <div
                        className="h-2 bg-blue-600 rounded-full transition-all duration-300"
                        style={{ width: `${((step - 1) / totalSteps) * 100}%` }}
                    ></div>
                </div>
            </div>

            {/* Step Content */}
            <div className="min-h-[220px]">
                {renderStep()}
            </div>
            
            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
                <div>
                    {step > 1 && (
                        <button onClick={handleBack} className="text-slate-600 font-semibold py-2 px-4 rounded-lg hover:bg-slate-200 transition-colors">
                            Back
                        </button>
                    )}
                </div>
                
                <div>
                    {step === 1 && (
                        <button onClick={handleNext} className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                            Let's Go!
                        </button>
                    )}

                    {step === 3 && (
                        <button onClick={handleNext} disabled={answers.priorities.length === 0} className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed">
                            Next
                        </button>
                    )}

                    {step === totalSteps + 1 && (
                        <button onClick={() => onComplete(answers)} className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition-colors">
                            Go to Dashboard
                        </button>
                    )}
                </div>
            </div>
        </div>
        <style>{`
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
          @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
          .animate-slide-up { animation: slideUp 0.4s ease-out forwards; }
        `}</style>
      </div>
    </div>
  );
};

export default OnboardingWizard;
