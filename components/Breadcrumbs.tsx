import React from 'react';
import ChevronRightIcon from './icons/ChevronRightIcon';
import HomeIcon from './icons/HomeIcon';

export interface Crumb {
  label: string;
  onClick?: () => void;
}

interface BreadcrumbsProps {
  crumbs: Crumb[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ crumbs }) => {
  return (
    <nav className="flex mb-4" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          const isFirst = index === 0;

          return (
            <li key={index} className="inline-flex items-center">
              {index > 0 && (
                <ChevronRightIcon className="w-4 h-4 text-slate-400 mx-1" />
              )}
              {isLast ? (
                <span className="text-sm font-medium text-slate-500">
                  {isFirst && <HomeIcon className="w-4 h-4 mr-2 inline-block" />}
                  {crumb.label}
                </span>
              ) : (
                <button
                  onClick={crumb.onClick}
                  className="inline-flex items-center text-sm font-medium text-slate-700 hover:text-blue-600"
                >
                  {isFirst && <HomeIcon className="w-4 h-4 mr-2" />}
                  {crumb.label}
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
