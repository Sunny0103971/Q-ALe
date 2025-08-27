import React, { useState } from 'react';
import Card from './Card';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import ChatBubbleLeftRightIcon from './icons/ChatBubbleLeftRightIcon';
import FeedbackCard from './FeedbackCard';
import type { FeedbackResponse } from '../types';

interface FeedbackModuleViewProps {
  onBack: () => void;
}

const mockFeedback: FeedbackResponse[] = [
    {id: '1', respondentType: 'Learner', response: "The hands-on project in the final week was the best part. It really helped me understand how to apply everything we learned.", timestamp: "2 days ago"},
    {id: '2', respondentType: 'Trainer', response: "Some of the classroom technology is a bit outdated, which makes it hard to run the newer software simulations.", timestamp: "3 days ago"},
    {id: '3', respondentType: 'Learner', response: "I would have liked more one-on-one time with the instructor to go over my specific questions.", timestamp: "1 week ago"},
];


const FeedbackModuleView: React.FC<FeedbackModuleViewProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'collect' | 'view'>('view');

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
         <div>
            <h2 className="text-3xl font-bold text-slate-900">Qualitative Feedback Module</h2>
            <p className="mt-1 text-lg text-slate-600">Capture the voices that matter for true transformation (Bildung).</p>
         </div>
         <button 
           onClick={onBack} 
           className="flex items-center bg-white text-slate-700 font-semibold py-2 px-4 border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors"
         >
           <ChevronLeftIcon className="w-5 h-5 mr-2" />
           Back to Dashboard
         </button>
      </div>

      <Card title="Feedback Center" icon={<ChatBubbleLeftRightIcon />}>
        <div className="border-b border-slate-200">
            <nav className="-mb-px flex space-x-6">
                <button onClick={() => setActiveTab('view')} className={`py-3 px-1 border-b-2 font-semibold flex items-center ${activeTab === 'view' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}>
                    View Responses
                    <span className="ml-2 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">{mockFeedback.length}</span>
                </button>
                 <button onClick={() => setActiveTab('collect')} className={`py-3 px-1 border-b-2 font-semibold ${activeTab === 'collect' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}>
                    Collect Feedback
                </button>
            </nav>
        </div>

        <div className="pt-6">
            {activeTab === 'view' && (
                <div className="space-y-4">
                    {mockFeedback.map(fb => <FeedbackCard key={fb.id} feedback={fb} />)}
                </div>
            )}
            {activeTab === 'collect' && (
                <div className="p-4 bg-slate-50 rounded-lg">
                    <h3 className="font-bold text-slate-800">Create a New Feedback Form</h3>
                    <p className="text-sm text-slate-600 mt-1">Design a simple form to capture open-ended feedback.</p>
                    <div className="mt-4 space-y-4">
                        <div>
                            <label htmlFor="feedback-title" className="block text-sm font-medium text-slate-700">Form Title</label>
                            <input type="text" id="feedback-title" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., End-of-Course Feedback" />
                        </div>
                        <div>
                            <label htmlFor="feedback-question" className="block text-sm font-medium text-slate-700">Your Question</label>
                            <textarea id="feedback-question" rows={3} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., What was the most valuable part of this course for you?"></textarea>
                        </div>
                         <div className="flex justify-end">
                            <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                                Generate Sharable Link
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
      </Card>

       <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default FeedbackModuleView;
