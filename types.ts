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
