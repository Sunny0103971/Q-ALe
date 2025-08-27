
import React from 'react';

interface HeaderProps {
  onHomeClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onHomeClick }) => {
  return (
    <header className="bg-white shadow-md w-full sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div onClick={onHomeClick} className="cursor-pointer">
            <h1 className="text-2xl font-bold text-slate-900">
              Project Q: The Quality Model Synthesizer
            </h1>
            <p className="text-sm text-slate-500">
              Building a 'Sexy' & User-Friendly QA Model for Adult Learning
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
