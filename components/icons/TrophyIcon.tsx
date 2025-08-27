import React from 'react';

const TrophyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9a9.75 9.75 0 011.53-5.263L9.75 9.375m0 0a4.5 4.5 0 100-9 4.5 4.5 0 000 9zm6.75 9.375a9.75 9.75 0 001.53-5.263L14.25 9.375m0 0a4.5 4.5 0 110-9 4.5 4.5 0 010 9zm-9.375-3.375a3 3 0 100-6 3 3 0 000 6z" />
  </svg>
);

export default TrophyIcon;
