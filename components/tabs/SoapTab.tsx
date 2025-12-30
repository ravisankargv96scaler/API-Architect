import React, { useState, useEffect } from 'react';
import CodeBlock from '../CodeBlock';

const SoapTab: React.FC = () => {
  const [userId, setUserId] = useState<string>('123');
  const [xmlOutput, setXmlOutput] = useState<string>('');

  useEffect(() => {
    const xml = `<?xml version="1.0"?>
<soap:Envelope
xmlns:soap="http://www.w3.org/2003/05/soap-envelope/"
soap:encodingStyle="http://www.w3.org/2003/05/soap-encoding">
  <soap:Header>
    <Authentication>
       <Token>AbCdEf123456</Token>
    </Authentication>
  </soap:Header>
  <soap:Body>
    <m:GetUser xmlns:m="http://www.example.org/users">
      <m:Id>${userId}</m:Id>
    </m:GetUser>
  </soap:Body>
</soap:Envelope>`;
    setXmlOutput(xml);
  }, [userId]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-soap mb-2">SOAP (Simple Object Access Protocol)</h2>
          <p className="text-slate-400">
            The "Formal Letter" of web services. Strictly typed, highly standardized, and relies on XML envelopes.
            Imagine sending a certified letter with a specific, rigid form inside.
          </p>
        </div>

        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">XML Envelope Builder</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">User ID</label>
              <input 
                type="number" 
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full bg-slate-900 border border-slate-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-soap focus:border-transparent transition-all"
              />
            </div>
            <div className="bg-blue-900/20 border border-blue-800/50 p-4 rounded-md">
              <h4 className="text-sm font-bold text-blue-400 mb-1">Structure Anatomy</h4>
              <ul className="text-sm text-slate-300 space-y-1 list-disc list-inside">
                <li><code className="text-blue-300">&lt;Envelope&gt;</code>: The outer package.</li>
                <li><code className="text-blue-300">&lt;Header&gt;</code>: Meta-data (security, transactions).</li>
                <li><code className="text-blue-300">&lt;Body&gt;</code>: The actual message content.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="h-full min-h-[400px]">
        <CodeBlock 
          title="Generated Request (XML)" 
          code={xmlOutput} 
          language="xml" 
          sizeBytes={new Blob([xmlOutput]).size}
        />
      </div>
    </div>
  );
};

export default SoapTab;