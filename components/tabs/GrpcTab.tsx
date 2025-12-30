import React, { useState } from 'react';

const GrpcTab: React.FC = () => {
  const [serialized, setSerialized] = useState(false);

  // Mocked Protocol Buffer serialization for { id: 1, name: "Alice" }
  // Field 1 (id, int32) = 1  -> Tag (1<<3 | 0) = 08, Val = 01
  // Field 2 (name, string) = "Alice" -> Tag (2<<3 | 2) = 12, Len = 05, Val = 41 6c 69 63 65
  const hexOutput = "08 01 12 05 41 6c 69 63 65";
  
  const jsonInput = `{
  "id": 1,
  "name": "Alice"
}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-grpc mb-2">gRPC (Google Remote Procedure Call)</h2>
          <p className="text-slate-400">
            The "High Performance" option. Uses Protocol Buffers (Binary) instead of JSON/XML. It runs over HTTP/2, supports streaming, and is strictly typed via <code className="bg-slate-800 px-1 rounded text-orange-300">.proto</code> files.
          </p>
        </div>

        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">The Protobuf Serializer</h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase text-slate-500 mb-1 block">Input (JSON)</label>
              <div className="bg-slate-950 p-3 rounded border border-slate-700 font-mono text-slate-300 text-sm">
                <pre>{jsonInput}</pre>
              </div>
              <div className="text-right mt-1">
                <span className="text-xs text-slate-500">Size: ~30 bytes (formatted)</span>
              </div>
            </div>

            <button
              onClick={() => setSerialized(true)}
              className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 px-4 rounded transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm14 1a1 1 0 11-2 0 1 1 0 012 0zM2 13a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2zm14 1a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
              </svg>
              Serialize to Protobuf
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col h-full gap-6">
        {serialized ? (
          <>
            <div className="bg-slate-950 rounded-lg border border-orange-500/30 overflow-hidden shadow-orange-500/10 shadow-lg transition-all animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex justify-between">
                <span className="text-xs font-bold text-orange-400">PROTO SCHEMA</span>
              </div>
              <div className="p-4 font-mono text-sm text-slate-300">
                <div className="text-purple-400">message <span className="text-yellow-200">User</span> {'{'}</div>
                <div className="pl-4"><span className="text-blue-400">int32</span> id = <span className="text-green-400">1</span>;</div>
                <div className="pl-4"><span className="text-blue-400">string</span> name = <span className="text-green-400">2</span>;</div>
                <div className="text-purple-400">{'}'}</div>
              </div>
            </div>

            <div className="bg-slate-950 rounded-lg border border-orange-500/30 overflow-hidden shadow-orange-500/10 shadow-lg flex-grow transition-all animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex justify-between items-center">
                <span className="text-xs font-bold text-orange-400">BINARY OUTPUT (HEX)</span>
                <span className="text-xs font-mono font-bold text-green-400 bg-green-900/30 px-2 py-0.5 rounded border border-green-800">
                   9 bytes
                </span>
              </div>
              <div className="p-6 flex flex-col items-center justify-center h-full gap-4">
                 <div className="font-mono text-2xl tracking-widest break-all text-center text-orange-300">
                   {hexOutput}
                 </div>
                 <div className="text-xs text-slate-500 text-center max-w-xs">
                   Massive reduction in size. No field names sent over wire, only field tags (1, 2).
                 </div>
              </div>
            </div>
          </>
        ) : (
          <div className="h-full flex items-center justify-center border-2 border-dashed border-slate-800 rounded-xl">
             <p className="text-slate-500">Waiting for serialization...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GrpcTab;