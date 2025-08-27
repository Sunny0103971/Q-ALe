export interface DocumentAnalysis {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  takeaway: string;
  rationale: string;
}

export interface WizardAnswers {
  focus: string;
  priorities: string[];
  experience: string;
}

export type AssessmentScore = 'not_met' | 'partially_met' | 'fully_met' | 'not_assessed';

export interface AssessmentResult {
  grade: 'Developing' | 'Proficient' | 'Exemplary';
  scorePercentage: number;
  summary: string;
  scores: Record<string, AssessmentScore>;
  notes: Record<string, string>;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
}

export interface FeedbackResponse {
  id: string;
  respondentType: 'Learner' | 'Trainer';
  response: string;
  timestamp: string;
}

export interface Competence {
  id: string;
  name: string;
  level: 'Foundational' | 'Proficient' | 'Expert';
  achieved: boolean;
}

export interface Trainer {
  id: string;
  name: string;
  role: string;
  competences: Competence[];
}
