
import React from 'react';

interface CardProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, icon, children }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex items-center mb-4">
          {icon && <div className="text-blue-600 mr-3">{icon}</div>}
          <h3 className="text-xl font-bold text-slate-900">{title}</h3>
        </div>
        <div className="text-slate-700">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Card;
