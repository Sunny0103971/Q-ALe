import React from 'react';
import Card from './Card';
import type { DocumentAnalysis } from '../types';
import LightbulbIcon from './icons/LightbulbIcon';
import RocketIcon from './icons/RocketIcon';
import ShieldCheckIcon from './icons/ShieldCheckIcon';
import UsersIcon from './icons/UsersIcon';
import ChartBarIcon from './icons/ChartBarIcon';
import CheckCircleIcon from './icons/CheckCircleIcon';


interface HomeViewProps {
  onSelectDocument: (doc: DocumentAnalysis) => void;
  documents: DocumentAnalysis[];
  onStartWizard: () => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onSelectDocument, documents, onStartWizard }) => {
  const coreAspects = [
    { 
      title: 'Learner-Centricity', 
      description: 'The model must track progress against the individual learner\'s goals, not just course completion. Success is measured by their journey and outcomes.',
      icon: <UsersIcon /> 
    },
    { 
      title: 'Peer Collaboration', 
      description: 'Providers connect in a "Peer Hub" to conduct standardized reviews, share best practices, and learn from each other, fostering a collaborative quality culture.',
      icon: <UsersIcon /> 
    },
    { 
      title: 'Continuous Improvement Cycle', 
      description: 'A built-in, repeatable 4-stage process (e.g., Prepare, Review, Report, Act) ensures that quality assurance is a dynamic loop, not a static event.',
      icon: <RocketIcon /> 
    },
    { 
      title: 'Data-Driven Dashboards', 
      description: 'Turns complex quality indicators into simple, visual dashboards, allowing providers to see performance at a glance and drill down into specific metrics.',
      icon: <ChartBarIcon /> 
    },
    { 
      title: 'Robust Governance & Compliance', 
      description: 'Integrates statutory and legal checks as a foundational "trust layer," ensuring the provider is stable, credible, and operating ethically.',
      icon: <ShieldCheckIcon /> 
    },
    { 
      title: 'Gamified & Aspirational Growth', 
      description: 'A motivational framework where providers can earn "badges" for specific achievements and advance through excellence tiers, encouraging growth beyond the baseline.',
      icon: <RocketIcon /> 
    },
  ];

  const modelComposition = [
    { 
      title: 'Onboarding Wizard', 
      description: 'A guided Q&A process helps institutions define their scope, select relevant quality areas, and personalize the framework to their specific context. This makes setup feel easy and tailored.' 
    },
    { 
      title: 'Interactive Self-Assessment Tool', 
      description: 'Digital forms with built-in guidance, examples, and evidence-upload capabilities to replace static documents and simplify the self-evaluation process.' 
    },
    { 
      title: 'Peer Review Hub', 
      description: 'A dedicated space to find and connect with peer reviewers, schedule visits using shared calendars, and use standardized templates for consistent feedback.' 
    },
    { 
      title: 'Real-Time Quality Dashboard', 
      description: 'Visualizes key performance indicators from the self-assessment, providing an at-a-glance overview of strengths and areas for improvement.' 
    },
    { 
      title: 'Excellence Pathway & Badge Arcade', 
      description: 'A visual roadmap where institutions unlock digital badges for specific achievements (e.g., "Accessibility Champion") and progress through defined quality tiers.' 
    },
    {
      title: 'Qualitative Feedback Module',
      description: 'Integrates tools for capturing meaningful, open-ended feedback from learners and trainers, focusing on holistic development ("Bildung") and personal transformation.'
    },
    {
      title: 'Trainer Competence Center',
      description: 'A dedicated area for managing trainer development, tracking certifications against a clear competence framework, and identifying professional growth opportunities.'
    }
  ];
  
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900">Building a Better QA Model</h2>
        <p className="mt-2 text-lg text-slate-600">Synthesizing insights from key frameworks to create a model that is easy, accessible, and engaging.</p>
      </div>

       <Card title="Personalize Your QA Model" icon={<RocketIcon />}>
        <div className="flex flex-col items-center justify-center text-center p-4">
          <p className="text-slate-600 mb-4">
            Answer a few quick questions to see how this model can be tailored to your institution's unique needs.
          </p>
          <button
            onClick={onStartWizard}
            className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Start Wizard
          </button>
        </div>
      </Card>

      <Card title="Key Takeaways from QA Materials" icon={<LightbulbIcon />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents.map(doc => (
            <div key={doc.id} onClick={() => onSelectDocument(doc)} className="p-4 bg-slate-50 rounded-lg hover:bg-blue-100 hover:shadow-lg cursor-pointer transition-all duration-200">
                <h4 className="font-bold text-blue-700">{doc.shortTitle}</h4>
                <p className="text-sm text-slate-600 mt-1">{doc.takeaway}</p>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card title="Core Aspects: Our Non-Negotiables" icon={<ShieldCheckIcon />}>
          <ul className="space-y-4">
            {coreAspects.map((aspect, index) => (
              <li key={index} className="flex items-start">
                <div className="text-blue-600 mr-4 shrink-0 mt-1">{aspect.icon}</div>
                <div>
                  <h4 className="font-semibold text-slate-800">{aspect.title}</h4>
                  <p className="text-sm text-slate-600">{aspect.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
        
        <Card title="Model Composition: The Building Blocks" icon={<CheckCircleIcon />}>
          <div className="space-y-4">
            {modelComposition.map((item, index) => (
               <div key={index}>
                  <h4 className="font-semibold text-slate-800">{item.title}</h4>
                  <p className="text-sm text-slate-600">{item.description}</p>
               </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HomeView;