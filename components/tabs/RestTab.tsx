import React, { useState } from 'react';
import CodeBlock from '../CodeBlock';

type Method = 'GET' | 'POST' | 'DELETE';

const RestTab: React.FC = () => {
  const [method, setMethod] = useState<Method>('GET');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string>('// Select a method to see the response');
  const [status, setStatus] = useState<number | null>(null);

  const handleRequest = (selectedMethod: Method) => {
    setMethod(selectedMethod);
    setLoading(true);
    setResponse('Loading...');
    setStatus(null);

    setTimeout(() => {
      setLoading(false);
      if (selectedMethod === 'GET') {
        setStatus(200);
        setResponse(JSON.stringify({
          id: 1,
          name: "Alice",
          role: "Admin",
          links: {
            self: "/users/1",
            friends: "/users/1/friends"
          }
        }, null, 2));
      } else if (selectedMethod === 'POST') {
        setStatus(201);
        setResponse(JSON.stringify({
          id: 101,
          message: "User created successfully",
          timestamp: new Date().toISOString()
        }, null, 2));
      } else if (selectedMethod === 'DELETE') {
        setStatus(204);
        setResponse('// No Content');
      }
    }, 600);
  };

  const getMethodColor = (m: Method) => {
    switch (m) {
      case 'GET': return 'bg-blue-600 hover:bg-blue-500';
      case 'POST': return 'bg-green-600 hover:bg-green-500';
      case 'DELETE': return 'bg-red-600 hover:bg-red-500';
      default: return 'bg-slate-600';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-rest mb-2">REST (Representational State Transfer)</h2>
          <p className="text-slate-400">
            The "Standard Resource" approach. It treats everything as a resource (URL) and uses standard HTTP verbs to act on them. Stateless and cacheable.
          </p>
        </div>

        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Resource Request Simulation</h3>
          
          <div className="flex items-center space-x-2 bg-slate-950 p-3 rounded-md border border-slate-700 mb-6 font-mono text-sm">
            <span className={`px-2 py-0.5 rounded text-xs font-bold ${method === 'GET' ? 'bg-blue-900 text-blue-300' : method === 'POST' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
              {method}
            </span>
            <span className="text-slate-300 flex-grow">https://api.example.com/users{method === 'DELETE' || method === 'GET' ? '/1' : ''}</span>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={() => handleRequest('GET')}
              className={`flex-1 py-2 px-4 rounded font-medium text-white transition-colors ${getMethodColor('GET')} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              GET
            </button>
            <button 
              onClick={() => handleRequest('POST')}
              className={`flex-1 py-2 px-4 rounded font-medium text-white transition-colors ${getMethodColor('POST')} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              POST
            </button>
            <button 
              onClick={() => handleRequest('DELETE')}
              className={`flex-1 py-2 px-4 rounded font-medium text-white transition-colors ${getMethodColor('DELETE')} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              DELETE
            </button>
          </div>
          
          <div className="mt-4 text-sm text-slate-400">
            <p className="mb-1"><strong className="text-slate-200">Analogy:</strong> Browsing web pages.</p>
            <ul className="list-disc list-inside">
              <li>GET: Read a page.</li>
              <li>POST: Submit a form.</li>
              <li>DELETE: Remove a file.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-col h-full min-h-[400px]">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Server Response</span>
          {status && (
            <span className={`px-2 py-1 rounded text-xs font-mono font-bold ${status >= 200 && status < 300 ? 'bg-green-900/50 text-green-400 border border-green-800' : 'bg-red-900/50 text-red-400'}`}>
              HTTP {status} {status === 204 ? 'No Content' : status === 201 ? 'Created' : 'OK'}
            </span>
          )}
        </div>
        <CodeBlock 
          code={response} 
          language="json" 
          sizeBytes={response.length > 0 && response !== '// Select a method to see the response' ? new Blob([response]).size : undefined}
        />
      </div>
    </div>
  );
};

export default RestTab;