import React from 'react';
import type { AssessmentResult } from '../types';
import Card from './Card';
import TrophyIcon from './icons/TrophyIcon';

interface AssessmentResultCardProps {
  result: AssessmentResult;
  onRevise: () => void;
}

const gradeStyles = {
    'Developing': {
        color: 'text-red-700',
        bg: 'bg-red-100',
        progress: 'bg-red-500',
    },
    'Proficient': {
        color: 'text-yellow-700',
        bg: 'bg-yellow-100',
        progress: 'bg-yellow-500',
    },
    'Exemplary': {
        color: 'text-green-700',
        bg: 'bg-green-100',
        progress: 'bg-green-500',
    },
}

const AssessmentResultCard: React.FC<AssessmentResultCardProps> = ({ result, onRevise }) => {
  const styles = gradeStyles[result.grade];

  return (
    <Card title="Self-Assessment Result" icon={<TrophyIcon />}>
      <div className={`p-4 rounded-lg ${styles.bg}`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="md:w-3/4">
            <h4 className="text-sm font-semibold uppercase text-slate-500">Overall Grade</h4>
            <p className={`text-5xl font-bold ${styles.color}`}>{result.grade}</p>
            <p className="mt-2 text-slate-700">{result.summary}</p>
          </div>
          <div className="mt-4 md:mt-0 md:w-1/4 flex flex-col items-start md:items-end">
              <p className="text-3xl font-bold text-slate-800">{Math.round(result.scorePercentage)}%</p>
              <p className="text-sm text-slate-600">Overall Score</p>
          </div>
        </div>
         <div className="w-full bg-slate-200 rounded-full h-2.5 mt-4">
            <div className={`${styles.progress} h-2.5 rounded-full`} style={{width: `${result.scorePercentage}%`}}></div>
        </div>
      </div>
      <div className="mt-4 text-right">
        <button 
          onClick={onRevise}
          className="font-semibold text-blue-600 hover:text-blue-800 transition-colors"
        >
          Revise Assessment
        </button>
      </div>
    </Card>
  );
};

export default AssessmentResultCard;
