import React, { useState } from 'react';
import Card from './Card';
import PeerCard from './PeerCard';
import RequestModal from './RequestModal';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import UsersGroupIcon from './icons/UsersGroupIcon';
import type { WizardAnswers } from '../types';

interface PeerReviewHubViewProps {
  onBack: () => void;
  answers: WizardAnswers;
}

const mockPeers = [
  { id: 1, name: 'Innovate Vocational College', expertise: ['Vocational Training', 'Corporate L&D'] },
  { id: 2, name: 'Community Skills Partnership', expertise: ['Community Learning', 'NGO / Non-Profit'] },
  { id: 3, name: 'Future Forward Institute', expertise: ['Corporate L&D', 'Staff Competence'] },
  { id: 4, name: 'Lifelong Learning Alliance', expertise: ['Governance', 'Community Learning'] },
];

type RequestStatus = 'pending' | 'accepted' | 'declined';

interface ReviewRequest {
    peerId: number;
    peerName: string;
    status: RequestStatus;
    area: string;
}

const PeerReviewHubView: React.FC<PeerReviewHubViewProps> = ({ onBack, answers }) => {
  const [activeTab, setActiveTab] = useState<'find' | 'requests'>('find');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPeer, setSelectedPeer] = useState<{id: number; name: string} | null>(null);
  const [requests, setRequests] = useState<ReviewRequest[]>([]);

  const handleRequestReview = (peer: {id: number, name: string}) => {
    setSelectedPeer(peer);
    setIsModalOpen(true);
  };
  
  const handleSendRequest = (message: string) => {
    if (!selectedPeer) return;
    console.log(`Sending request to ${selectedPeer.name} for area ${answers.priorities[0]} with message: "${message}"`);
    setRequests(prev => [...prev, { peerId: selectedPeer.id, peerName: selectedPeer.name, status: 'pending', area: answers.priorities[0] || 'General Review' }]);
    setIsModalOpen(false);
    setSelectedPeer(null);
  };

  const isRequested = (peerId: number) => {
    return requests.some(req => req.peerId === peerId);
  }

  return (
    <div className="space-y-6 animate-fade-in">
       {isModalOpen && selectedPeer && (
        <RequestModal 
          peerName={selectedPeer.name}
          onClose={() => setIsModalOpen(false)}
          onSend={handleSendRequest}
          assessmentArea={answers.priorities[0] || 'General Quality Review'}
        />
      )}
      <div className="flex items-center justify-between">
         <div>
            <h2 className="text-3xl font-bold text-slate-900">Peer Review Hub</h2>
            <p className="mt-1 text-lg text-slate-600">Connect with other institutions for collaborative improvement.</p>
         </div>
         <button 
           onClick={onBack} 
           className="flex items-center bg-white text-slate-700 font-semibold py-2 px-4 border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors"
         >
           <ChevronLeftIcon className="w-5 h-5 mr-2" />
           Back to Dashboard
         </button>
      </div>

      <Card title="Connect & Collaborate" icon={<UsersGroupIcon />}>
        <div className="border-b border-slate-200">
            <nav className="-mb-px flex space-x-6">
                <button onClick={() => setActiveTab('find')} className={`py-3 px-1 border-b-2 font-semibold ${activeTab === 'find' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}>
                    Find Reviewers
                </button>
                <button onClick={() => setActiveTab('requests')} className={`py-3 px-1 border-b-2 font-semibold flex items-center ${activeTab === 'requests' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}>
                    My Requests
                    {requests.length > 0 && <span className="ml-2 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">{requests.length}</span>}
                </button>
            </nav>
        </div>

        <div className="pt-6">
            {activeTab === 'find' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mockPeers.map(peer => (
                        <PeerCard 
                            key={peer.id}
                            peer={peer}
                            onRequest={() => handleRequestReview(peer)}
                            isRequested={isRequested(peer.id)}
                        />
                    ))}
                </div>
            )}
            {activeTab === 'requests' && (
                <div className="space-y-3">
                    {requests.length > 0 ? requests.map(req => (
                        <div key={req.peerId} className="p-4 bg-slate-50 rounded-lg flex items-center justify-between">
                            <div>
                                <p className="font-semibold text-slate-800">Review Request to {req.peerName}</p>
                                <p className="text-sm text-slate-600">Area: {req.area}</p>
                            </div>
                            <span className={`capitalize text-sm font-bold px-2 py-1 rounded-full ${req.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                                {req.status}
                            </span>
                        </div>
                    )) : (
                        <p className="text-slate-600 text-center py-4">You haven't sent any review requests yet.</p>
                    )}
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

export default PeerReviewHubView;
