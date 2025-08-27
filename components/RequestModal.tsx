import React, { useState } from 'react';

interface RequestModalProps {
  peerName: string;
  assessmentArea: string;
  onClose: () => void;
  onSend: (message: string) => void;
}

const RequestModal: React.FC<RequestModalProps> = ({ peerName, assessmentArea, onClose, onSend }) => {
  const [message, setMessage] = useState('');
  
  const handleSend = () => {
    onSend(message);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fade-in" aria-modal="true" role="dialog">
      <div className="bg-slate-50 rounded-2xl shadow-2xl w-full max-w-lg p-8 m-4 transform transition-all animate-slide-up relative">
         <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600" aria-label="Close modal">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Send Review Request</h2>
            <p className="text-slate-600">To: <span className="font-semibold">{peerName}</span></p>
            <p className="text-slate-600 mb-4">Regarding: <span className="font-semibold">{assessmentArea}</span></p>

            <div className="mt-4">
                <label htmlFor="request-message" className="block text-sm font-medium text-slate-700 mb-1">Add a personal message (optional):</label>
                <textarea 
                    id="request-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" 
                    rows={4} 
                    placeholder="e.g., We'd appreciate your feedback on our new learner support initiatives..."
                ></textarea>
            </div>
            
            <div className="flex justify-end items-center mt-6 space-x-4">
                <button onClick={onClose} className="text-slate-600 font-semibold py-2 px-4 rounded-lg hover:bg-slate-200 transition-colors">
                    Cancel
                </button>
                <button onClick={handleSend} className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                    Send Request
                </button>
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

export default RequestModal;
