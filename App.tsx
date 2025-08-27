import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import HomeView from './components/HomeView';
import DocumentView from './components/DocumentView';
import OnboardingWizard from './components/OnboardingWizard';
import DashboardView from './components/DashboardView';
import SelfAssessmentView from './components/SelfAssessmentView';
import type { DocumentAnalysis, WizardAnswers } from './types';

const App: React.FC = () => {
  const [selectedDocument, setSelectedDocument] = useState<DocumentAnalysis | null>(null);
  const [showWizard, setShowWizard] = useState(false);
  const [wizardCompleted, setWizardCompleted] = useState(false);
  const [wizardAnswers, setWizardAnswers] = useState<WizardAnswers | null>(null);
  const [activeAssessment, setActiveAssessment] = useState<string | null>(null);

  const documents: DocumentAnalysis[] = [
    {
      id: 'qualtrack',
      title: 'QUALTRACK - Quality Rating System for Adult Learning Providers',
      shortTitle: 'QUALTRACK',
      description: 'A comprehensive quality rating system that introduces gamification and aspirational tiers for continuous improvement in adult learning.',
      takeaway: 'Introduce Gamification with Badges and "Towards Excellence" Tiers.',
      rationale: 'This is the key to making a QA model "sexy" and engaging. Instead of a simple pass/fail, it creates a motivational pathway for providers to grow, rewarding specific achievements (e.g., "Inclusivity Champion") and encouraging continuous, aspirational development.',
    },
    {
      id: 'rarpa',
      title: 'RARPA Guidance for Learners with Special Educational Needs',
      shortTitle: 'RARPA',
      description: 'A five-stage process focused on Recognizing and Recording Progress and Achievement, emphasizing a deeply learner-centric approach.',
      takeaway: 'Build the model around the individual Learner\'s Journey.',
      rationale: 'True quality is measured by individual progress and outcomes. The model must prioritize personalized pathways and achievements, ensuring the process serves the learner first, not just the institution. This makes the model meaningful and impactful.',
    },
    {
      id: 'slovenian',
      title: 'Slovenian Institute - Quality Indicators in Adult Education',
      shortTitle: 'Slovenian Indicators',
      description: 'A highly structured, granular framework of quality indicators with a clear hierarchy: Area -> Subarea -> Indicator -> Standard -> Criteria.',
      takeaway: 'Create a Data-Driven Dashboard with a Clear Indicator Hierarchy.',
      rationale: 'To be user-friendly, the model needs to make complex data easy to understand. A structured, hierarchical dashboard allows providers to see their performance at a glance and drill down into specifics, turning abstract quality goals into concrete, measurable metrics.',
    },
    {
      id: 'praline',
      title: 'PRALINE - European Peer Review Toolbox for Adult Learning',
      shortTitle: 'PRALINE Toolbox',
      description: 'A practical toolbox filled with checklists, forms, and templates to standardize and simplify the peer review process.',
      takeaway: 'Use Guided Wizards and Smart Templates.',
      rationale: 'To make the model "easy," we must replace daunting paperwork with interactive, guided wizards. Structured templates simplify complex processes like self-assessment and peer review, ensuring consistency and reducing the cognitive load on users.',
    },
    {
      id: 'one',
      title: 'ONE - European Peer Review Manual for Adult Learning',
      shortTitle: 'ONE Manual',
      description: 'A detailed manual outlining a four-phase, cyclical approach to quality improvement through peer review.',
      takeaway: 'Implement a clear, Cyclical Process for Continuous Improvement.',
      rationale: 'A quality model must be a loop, not a line. The four-phase cycle (Preparation -> Visit -> Report -> Action) provides a clear, repeatable roadmap. This core, non-negotiable element ensures that quality assurance is an ongoing process of development, not a one-time event.',
    },
    {
      id: 'qqi',
      title: 'QQI - Statutory Quality Assurance Guidelines',
      shortTitle: 'QQI Guidelines',
      description: 'Statutory guidelines for independent providers, focusing on governance, compliance, and institutional stability.',
      takeaway: 'Establish Robust Governance as the Foundation.',
      rationale: 'A "sexy" model also needs to be a serious one. Integrating governance and compliance ensures the provider is stable, legal, and responsible. This builds a foundation of trust and credibility, proving that the model is not just about pedagogy but about sustainable, high-quality operations.',
    },
    {
      id: 'croatian-handbook',
      title: 'Priručnik za unutarnje osiguravanje kvalitete u obrazovanju odraslih',
      shortTitle: 'Croatian Handbook',
      description: 'A detailed handbook from the Croatian Agency for VET and Adult Education, providing a structured framework and tools for internal self-evaluation.',
      takeaway: 'Provide a comprehensive, structured Self-Evaluation Report Template.',
      rationale: 'This makes the abstract concept of "quality" concrete and manageable. By providing a clear template based on defined quality areas and standards, the model guides institutions through a step-by-step process, reducing uncertainty and making self-evaluation a productive, empowering exercise rather than a daunting task.',
    },
    {
      id: 'tjs-bildung',
      title: 'TJS Opintokeskus & Bildung Pedagogy',
      shortTitle: 'Finnish Bildung Model',
      description: 'A combination of a practical feedback form and the educational philosophy of "Bildung" (holistic personal growth).',
      takeaway: 'Prioritize Qualitative Feedback to Measure Learner Transformation (Bildung).',
      rationale: 'This makes the QA model truly meaningful. Instead of just quantitative data, it focuses on the holistic development of the learner—their skills, self-awareness, and sense of agency. Using open-ended, reflective feedback (like "What did we do well?") makes the process human-centered and provides deep insights for improvement, aligning the model with the profound goals of adult education.',
    },
    {
      id: 'stop-poland',
      title: 'sTOP - Polish School for Trainers & Competence Certificates',
      shortTitle: 'Polish Competence Model',
      description: 'A comprehensive ecosystem for trainer development, including a detailed curriculum, multi-level competence certificates, and a deep evaluation process.',
      takeaway: 'Implement a Multi-Level Competence & Certification Framework for Trainers.',
      rationale: 'A mature QA system evaluates and develops its people, not just its programs. By creating a clear, multi-level certification path (e.g., Trainer, Supervisor) based on a detailed list of competences, the model provides a powerful, aspirational goal. This makes quality tangible and professional, motivating trainers to engage in continuous development and providing a transparent benchmark of excellence.',
    },
  ];

  const handleWizardComplete = (answers: WizardAnswers) => {
    setWizardAnswers(answers);
    setWizardCompleted(true);
    setShowWizard(false);
    setSelectedDocument(null);
    setActiveAssessment(null);
  };

  const handleHomeClick = () => {
    setSelectedDocument(null);
    setWizardCompleted(false);
    setWizardAnswers(null);
    setActiveAssessment(null);
  };
  
  const handleStartAssessment = (priority: string) => {
    setSelectedDocument(null); // Deselect any document when starting an assessment
    setActiveAssessment(priority);
  };

  const handleBackToDashboard = () => {
    setActiveAssessment(null);
  };

  const renderContent = () => {
    if (activeAssessment) {
      return <SelfAssessmentView assessmentTopic={activeAssessment} onBack={handleBackToDashboard} />;
    }
    if (wizardCompleted && wizardAnswers) {
      return <DashboardView answers={wizardAnswers} onStartAssessment={handleStartAssessment} />;
    }
    if (selectedDocument) {
      return <DocumentView document={selectedDocument} />;
    }
    return (
      <HomeView 
        onSelectDocument={setSelectedDocument} 
        documents={documents}
        onStartWizard={() => setShowWizard(true)}
      />
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-800">
      {showWizard && <OnboardingWizard onComplete={handleWizardComplete} onClose={() => setShowWizard(false)} />}
      <Header onHomeClick={handleHomeClick} />
      <div className="flex-1 flex">
        <Sidebar documents={documents} onSelect={setSelectedDocument} selectedDocumentId={selectedDocument?.id || null} />
        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;