import React from 'react';
import type { FeedbackResponse } from '../types';

interface FeedbackCardProps {
  feedback: FeedbackResponse;
}

const respondentStyles = {
    Learner: {
        bg: 'bg-green-50',
        text: 'text-green-800',
        border: 'border-green-200',
    },
    Trainer: {
        bg: 'bg-purple-50',
        text: 'text-purple-800',
        border: 'border-purple-200',
    }
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({ feedback }) => {
  const styles = respondentStyles[feedback.respondentType];

  return (
    <div className={`p-4 rounded-lg border ${styles.border} ${styles.bg}`}>
        <div className="flex items-center justify-between">
            <span className={`text-xs font-bold uppercase px-2 py-1 rounded-full ${styles.bg} ${styles.text}`}>
                {feedback.respondentType}
            </span>
            <span className="text-xs text-slate-500">{feedback.timestamp}</span>
        </div>
        <p className="mt-3 text-slate-700 italic">"{feedback.response}"</p>
    </div>
  );
};

export default FeedbackCard;
