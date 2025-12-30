import React, { useState } from 'react';
import { UseCase, ComparisonRow } from '../../types';

const data: ComparisonRow[] = [
  { feature: "Protocol", soap: "HTTP, SMTP, TCP", rest: "HTTP (1.1)", graphql: "HTTP (1.1/2)", grpc: "HTTP/2", websocket: "TCP" },
  { feature: "Data Format", soap: "XML", rest: "JSON, HTML, Text", graphql: "JSON", grpc: "Protobuf (Binary)", websocket: "Binary/Text" },
  { feature: "Performance", soap: "Low (Verbose)", rest: "Medium", graphql: "Medium/High", grpc: "Very High", websocket: "High (Low Latency)" },
  { feature: "Client Coupling", soap: "Tight (WSDL)", rest: "Loose", graphql: "Medium", grpc: "Tight (.proto)", websocket: "Tight" },
  { feature: "Caching", soap: "Difficult", rest: "Easy (HTTP)", graphql: "Difficult", grpc: "Difficult", websocket: "N/A" },
];

const styles = ['SOAP', 'REST', 'GraphQL', 'gRPC', 'WebSocket'];

const recommendations: Record<UseCase, string> = {
  'Mobile App': 'GraphQL',
  'Microservices': 'gRPC',
  'Public API': 'REST',
  'Real-time Game': 'WebSocket'
};

const ComparisonTab: React.FC = () => {
  const [useCase, setUseCase] = useState<UseCase | ''>('');

  const getHighlightClass = (colStyle: string) => {
    if (!useCase) return '';
    const recommended = recommendations[useCase];
    return recommended === colStyle ? 'bg-yellow-500/20 ring-1 ring-yellow-500/50' : 'opacity-40 grayscale';
  };

  return (
    <div className="h-full flex flex-col gap-6">
       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
         <div>
          <h2 className="text-2xl font-bold text-white mb-2">Architectural Comparison</h2>
          <p className="text-slate-400">Choose the right tool for the job.</p>
         </div>
         
         <div className="w-full sm:w-64">
           <label className="block text-xs font-bold uppercase text-slate-500 mb-1">I am building a...</label>
           <select 
             className="w-full bg-slate-800 border border-slate-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
             value={useCase}
             onChange={(e) => setUseCase(e.target.value as UseCase)}
           >
             <option value="">-- Select Use Case --</option>
             <option value="Mobile App">Mobile App (Bandwidth constrained)</option>
             <option value="Microservices">Microservices (Internal traffic)</option>
             <option value="Public API">Public API (Ease of use)</option>
             <option value="Real-time Game">Real-time Game (Low latency)</option>
           </select>
         </div>
       </div>

       <div className="overflow-x-auto rounded-xl border border-slate-700 shadow-xl bg-slate-900 flex-grow">
         <table className="w-full text-left border-collapse">
           <thead>
             <tr>
               <th className="p-4 bg-slate-950 border-b border-slate-800 text-slate-400 font-medium">Feature</th>
               {styles.map(style => (
                 <th key={style} className={`p-4 bg-slate-950 border-b border-slate-800 font-bold transition-colors duration-300 ${getHighlightClass(style)}`}>
                   <span className={`
                     ${style === 'SOAP' ? 'text-soap' : ''}
                     ${style === 'REST' ? 'text-rest' : ''}
                     ${style === 'GraphQL' ? 'text-graphql' : ''}
                     ${style === 'gRPC' ? 'text-grpc' : ''}
                     ${style === 'WebSocket' ? 'text-realtime' : ''}
                   `}>
                     {style}
                   </span>
                 </th>
               ))}
             </tr>
           </thead>
           <tbody>
             {data.map((row, idx) => (
               <tr key={idx} className="border-b border-slate-800 hover:bg-slate-800/20 transition-colors">
                 <td className="p-4 font-mono text-xs text-slate-500 uppercase tracking-wide bg-slate-900/50">{row.feature}</td>
                 <td className={`p-4 text-sm text-slate-300 transition-colors duration-300 ${getHighlightClass('SOAP')}`}>{row.soap}</td>
                 <td className={`p-4 text-sm text-slate-300 transition-colors duration-300 ${getHighlightClass('REST')}`}>{row.rest}</td>
                 <td className={`p-4 text-sm text-slate-300 transition-colors duration-300 ${getHighlightClass('GraphQL')}`}>{row.graphql}</td>
                 <td className={`p-4 text-sm text-slate-300 transition-colors duration-300 ${getHighlightClass('gRPC')}`}>{row.grpc}</td>
                 <td className={`p-4 text-sm text-slate-300 transition-colors duration-300 ${getHighlightClass('WebSocket')}`}>{row.websocket}</td>
               </tr>
             ))}
             {/* Best Use Case Row */}
             <tr className="bg-slate-950/30">
                <td className="p-4 font-mono text-xs text-slate-500 uppercase tracking-wide bg-slate-900/50">Best For</td>
                <td className={`p-4 text-xs font-bold text-soap transition-colors duration-300 ${getHighlightClass('SOAP')}`}>Enterprise / Legacy Banking</td>
                <td className={`p-4 text-xs font-bold text-rest transition-colors duration-300 ${getHighlightClass('REST')}`}>Public APIs / Web Services</td>
                <td className={`p-4 text-xs font-bold text-graphql transition-colors duration-300 ${getHighlightClass('GraphQL')}`}>Mobile Apps / Complex Data</td>
                <td className={`p-4 text-xs font-bold text-grpc transition-colors duration-300 ${getHighlightClass('gRPC')}`}>Microservices / Internal</td>
                <td className={`p-4 text-xs font-bold text-realtime transition-colors duration-300 ${getHighlightClass('WebSocket')}`}>Chat / Streaming / Gaming</td>
             </tr>
           </tbody>
         </table>
       </div>
    </div>
  );
};

export default ComparisonTab;