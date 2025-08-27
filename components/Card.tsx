
import React from 'react';

interface CardProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, icon, children, className = '' }) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden flex flex-col ${className}`}>
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center mb-4">
          {icon && <div className="text-blue-600 mr-3">{icon}</div>}
          <h3 className="text-xl font-bold text-slate-900">{title}</h3>
        </div>
        <div className="text-slate-700 flex-1">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Card;
