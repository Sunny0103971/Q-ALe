import React from 'react';
import CheckIcon from './icons/CheckIcon';
import PaperAirplaneIcon from './icons/PaperAirplaneIcon';

interface Peer {
  id: number;
  name: string;
  expertise: string[];
}

interface PeerCardProps {
  peer: Peer;
  onRequest: () => void;
  isRequested: boolean;
}

const PeerCard: React.FC<PeerCardProps> = ({ peer, onRequest, isRequested }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between border border-slate-200">
      <div>
        <h4 className="font-bold text-lg text-slate-900">{peer.name}</h4>
        <div className="mt-2 flex flex-wrap gap-2">
            {peer.expertise.map(exp => (
                <span key={exp} className="text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {exp}
                </span>
            ))}
        </div>
      </div>
      <div className="mt-4">
        <button 
          onClick={onRequest}
          disabled={isRequested}
          className={`w-full flex items-center justify-center font-bold py-2 px-4 rounded-lg transition-colors ${
            isRequested 
              ? 'bg-slate-200 text-slate-500 cursor-not-allowed' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isRequested ? (
            <>
                <CheckIcon className="w-5 h-5 mr-2" />
                Request Sent
            </>
          ) : (
            <>
                <PaperAirplaneIcon className="w-5 h-5 mr-2" />
                Request Review
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default PeerCard;
