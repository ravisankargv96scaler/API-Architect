import React, { useState } from 'react';
import TabNavigation from './components/TabNavigation';
import SoapTab from './components/tabs/SoapTab';
import RestTab from './components/tabs/RestTab';
import GraphQlTab from './components/tabs/GraphQlTab';
import GrpcTab from './components/tabs/GrpcTab';
import RealTimeTab from './components/tabs/RealTimeTab';
import ComparisonTab from './components/tabs/ComparisonTab';
import { ApiStyle, TabConfig } from './types';

const tabs: TabConfig[] = [
  { id: ApiStyle.SOAP, label: 'SOAP', color: '#3b82f6', description: 'The Formal Letter' },
  { id: ApiStyle.REST, label: 'REST', color: '#22c55e', description: 'The Standard Resource' },
  { id: ApiStyle.GRAPHQL, label: 'GraphQL', color: '#ec4899', description: 'The Flexible Query' },
  { id: ApiStyle.GRPC, label: 'gRPC', color: '#f97316', description: 'The High Performance' },
  { id: ApiStyle.REALTIME, label: 'Real-Time', color: '#8b5cf6', description: 'WebSocket vs Webhook' },
  { id: ApiStyle.COMPARE, label: 'Matrix', color: '#64748b', description: 'Comparison Table' },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ApiStyle>(ApiStyle.SOAP);

  const renderContent = () => {
    switch (activeTab) {
      case ApiStyle.SOAP: return <SoapTab />;
      case ApiStyle.REST: return <RestTab />;
      case ApiStyle.GRAPHQL: return <GraphQlTab />;
      case ApiStyle.GRPC: return <GrpcTab />;
      case ApiStyle.REALTIME: return <RealTimeTab />;
      case ApiStyle.COMPARE: return <ComparisonTab />;
      default: return <div>Select a tab</div>;
    }
  };

  const activeTabInfo = tabs.find(t => t.id === activeTab);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans flex flex-col">
      <header className="bg-slate-950 border-b border-slate-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            API Architectural <span className="text-indigo-500">Styles</span>
          </h1>
          <p className="mt-2 text-slate-400 max-w-2xl">
            An interactive playground to visualize and compare SOAP, REST, GraphQL, gRPC, and Real-Time patterns.
          </p>
        </div>
      </header>

      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} tabs={tabs} />

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-1 shadow-2xl h-full min-h-[600px] flex flex-col">
           {/* Tab Header Detail */}
           <div className="px-6 py-4 border-b border-slate-800/50 flex items-center gap-3">
             <div className="w-3 h-3 rounded-full shadow-[0_0_10px]" style={{ backgroundColor: activeTabInfo?.color }}></div>
             <h2 className="text-sm font-medium text-slate-300 uppercase tracking-widest">
               {activeTabInfo?.description}
             </h2>
           </div>
           
           {/* Tab Content */}
           <div className="p-6 md:p-8 flex-grow">
              {renderContent()}
           </div>
        </div>
      </main>

      <footer className="bg-slate-950 border-t border-slate-800 py-6 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>Built with React + Tailwind for Educational Purposes.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;