import React from 'react';
import type { WizardAnswers, AssessmentResult } from '../types';
import Card from './Card';
import ClipboardListIcon from './icons/ClipboardListIcon';
import TrophyIcon from './icons/TrophyIcon';
import RocketIcon from './icons/RocketIcon';
import SparklesIcon from './icons/SparklesIcon';
import ChatBubbleLeftRightIcon from './icons/ChatBubbleLeftRightIcon';
import AcademicCapIcon from './icons/AcademicCapIcon';

interface DashboardViewProps {
  answers: WizardAnswers;
  results: Record<string, AssessmentResult>;
  onStartAssessment: (priority: string) => void;
  onNavigate: (view: 'peerReview' | 'excellencePathway' | 'feedbackModule' | 'competenceCenter') => void;
}

const QACycleStage: React.FC<{ stage: number; title: string; currentStage: number; onClick: () => void; }> = ({ stage, title, currentStage, onClick }) => {
  const isCompleted = stage < currentStage;
  const isActive = stage === currentStage;
  const isClickable = isActive && onClick !== null;

  const getStageClasses = () => {
    if (isCompleted) return 'bg-green-500';
    if (isActive) return 'bg-blue-600';
    return 'bg-slate-300';
  };
  
  const getTextClasses = () => {
    if(isActive) return 'text-blue-700 font-bold';
    if(isCompleted) return 'text-slate-500 line-through';
    return 'text-slate-400';
  }

  const stageContent = (
    <>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold transition-colors ${getStageClasses()}`}>
        {isCompleted ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        ) : stage}
      </div>
      <div className={`ml-4 ${getTextClasses()}`}>
        {title}
      </div>
    </>
  );

  if (isClickable) {
    return (
      <button onClick={onClick} className="flex items-center w-full text-left p-2 rounded-lg hover:bg-slate-100 transition-colors">
        {stageContent}
      </button>
    );
  }

  return (
    <div className="flex items-center p-2">
      {stageContent}
    </div>
  );
};


const DashboardView: React.FC<DashboardViewProps> = ({ answers, results, onStartAssessment, onNavigate }) => {
  const currentStage = 2; // Start at 'Peer Review' to showcase the new feature
  
  const handleStageClick = (stage: number) => {
    if (stage === 2) {
      onNavigate('peerReview');
    }
    // Future stages can be handled here
  };

  const unlockedBadges = 1; // Mock data

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-left">
        <h2 className="text-3xl font-bold text-slate-900">Dashboard for Your {answers.focus}</h2>
        <p className="mt-2 text-lg text-slate-600">Your personalized Quality Assurance journey starts here.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card title="Your QA Improvement Cycle" icon={<RocketIcon />}>
          <div className="flex flex-col space-y-1 p-2">
              <QACycleStage stage={1} title="Prepare & Self-Assess" currentStage={currentStage} onClick={() => {}}/>
              <div className="h-4 w-px bg-slate-300 ml-6"></div>
              <QACycleStage stage={2} title="Peer Review" currentStage={currentStage} onClick={() => handleStageClick(2)} />
              <div className="h-4 w-px bg-slate-300 ml-6"></div>
              <QACycleStage stage={3} title="Report & Analyze" currentStage={currentStage} onClick={() => {}} />
               <div className="h-4 w-px bg-slate-300 ml-6"></div>
              <QACycleStage stage={4} title="Act & Improve" currentStage={currentStage} onClick={() => {}} />
          </div>
        </Card>

        <Card title="Your Achievements" icon={<TrophyIcon />}>
            <div className="text-center p-4 flex flex-col justify-between h-full">
              <div>
                <SparklesIcon className="mx-auto text-yellow-500 h-12 w-12" />
                <p className="text-slate-600 mt-2">You've unlocked <span className="font-bold text-slate-800">{unlockedBadges}</span> badge so far. Keep up the great work!</p>
                <p className="text-sm text-slate-500 mt-2">Complete assessments and peer reviews to earn more.</p>
              </div>
              <button
                onClick={() => onNavigate('excellencePathway')}
                className="mt-4 bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                View Excellence Pathway
              </button>
            </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card title="Your Priority Actions" icon={<ClipboardListIcon />} className="md:col-span-2">
          <div className="space-y-4">
            {answers.priorities.map(priority => {
              const result = results[priority];
              return (
              <div key={priority} className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800">{priority}</h4>
                {result ? (
                   <div className="mt-2">
                     <p className="text-sm text-blue-700">Self-Assessment Completed!</p>
                     <p className="font-bold text-blue-900">Overall Grade: {result.grade}</p>
                   </div>
                ) : (
                  <p className="text-sm text-blue-700 mt-1">
                    The next step is to gather evidence and complete the self-assessment for this area.
                  </p>
                )}
                <button
                  onClick={() => onStartAssessment(priority)}
                  className="mt-3 bg-white text-blue-700 font-semibold py-1 px-3 border border-blue-300 rounded-md hover:bg-blue-100 transition-colors"
                >
                  {result ? "View Results" : "Begin Self-Assessment"}
                </button>
              </div>
            )})}
          </div>
        </Card>
        
        <Card title="Development Tools" icon={<RocketIcon />}>
          <div className="space-y-3">
            <button onClick={() => onNavigate('feedbackModule')} className="w-full flex items-center p-3 bg-slate-50 rounded-lg hover:bg-slate-100 hover:shadow-sm transition-all">
                <ChatBubbleLeftRightIcon className="w-7 h-7 text-blue-600 mr-3" />
                <div>
                  <h4 className="font-semibold text-slate-800 text-left">Feedback Module</h4>
                  <p className="text-xs text-slate-500 text-left">Capture learner & trainer voices.</p>
                </div>
            </button>
             <button onClick={() => onNavigate('competenceCenter')} className="w-full flex items-center p-3 bg-slate-50 rounded-lg hover:bg-slate-100 hover:shadow-sm transition-all">
                <AcademicCapIcon className="w-7 h-7 text-blue-600 mr-3" />
                 <div>
                  <h4 className="font-semibold text-slate-800 text-left">Competence Center</h4>
                  <p className="text-xs text-slate-500 text-left">Develop your training staff.</p>
                </div>
            </button>
          </div>
        </Card>
      </div>

       <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default DashboardView;
