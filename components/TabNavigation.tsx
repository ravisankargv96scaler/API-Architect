import React from 'react';
import { ApiStyle, TabConfig } from '../types';

interface TabNavigationProps {
  activeTab: ApiStyle;
  onTabChange: (tab: ApiStyle) => void;
  tabs: TabConfig[];
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange, tabs }) => {
  return (
    <div className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-1 overflow-x-auto py-3 custom-scrollbar no-scrollbar">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                  whitespace-nowrap px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-in-out
                  flex items-center gap-2
                  ${isActive 
                    ? `bg-slate-800 text-white shadow-[0_0_15px_-3px_rgba(255,255,255,0.1)] border border-slate-700 ring-1 ring-${tab.color}-500` 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}
                `}
                style={isActive ? { borderColor: tab.color } : {}}
              >
                <span className={`w-2 h-2 rounded-full`} style={{ backgroundColor: tab.color }}></span>
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TabNavigation;