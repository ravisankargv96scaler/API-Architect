import React, { useState, useEffect, useRef } from 'react';

const RealTimeTab: React.FC = () => {
  // WebSocket State
  const [messages, setMessages] = useState<{sender: 'user'|'server', text: string}[]>([
    { sender: 'server', text: 'Connected to Chat Server...' }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Webhook State
  const [webhookLog, setWebhookLog] = useState<string[]>([]);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Scroll chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendWsMessage = () => {
    if (!inputMsg.trim()) return;
    setMessages(prev => [...prev, { sender: 'user', text: inputMsg }]);
    const userText = inputMsg;
    setInputMsg('');

    // Simulate instant server response
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'server', text: `Echo: ${userText}` }]);
    }, 500);
  };

  const triggerWebhook = () => {
    setIsProcessingPayment(true);
    // Simulate server processing time
    setTimeout(() => {
      const timestamp = new Date().toLocaleTimeString();
      setWebhookLog(prev => [`[${timestamp}] Payment Success! Triggering POST to https://client.app/callback`, ...prev]);
      setIsProcessingPayment(false);
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col gap-6">
      <div>
         <h2 className="text-2xl font-bold text-realtime mb-2">Real-Time Patterns</h2>
         <p className="text-slate-400">Comparing persistent connections vs. event-driven callbacks.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
        {/* WebSocket Section */}
        <div className="border border-slate-700 rounded-xl bg-slate-800/30 flex flex-col overflow-hidden">
          <div className="bg-slate-900/80 p-3 border-b border-slate-700 flex justify-between items-center">
            <h3 className="font-bold text-realtime flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              WebSocket (Chat)
            </h3>
            <span className="text-xs text-slate-500">Persistent Connection</span>
          </div>
          
          <div ref={chatContainerRef} className="flex-grow p-4 space-y-3 overflow-y-auto custom-scrollbar bg-slate-950/50 h-64 md:h-auto">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${m.sender === 'user' ? 'bg-realtime text-white rounded-br-none' : 'bg-slate-700 text-slate-200 rounded-bl-none'}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-900 border-t border-slate-700 flex gap-2">
            <input 
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendWsMessage()}
              placeholder="Type message..."
              className="flex-grow bg-slate-800 border-slate-600 rounded px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-realtime"
            />
            <button 
              onClick={sendWsMessage}
              className="bg-realtime hover:bg-violet-500 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
            >
              Send
            </button>
          </div>
        </div>

        {/* Webhook Section */}
        <div className="border border-slate-700 rounded-xl bg-slate-800/30 flex flex-col overflow-hidden">
          <div className="bg-slate-900/80 p-3 border-b border-slate-700 flex justify-between items-center">
             <h3 className="font-bold text-webhook flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Webhook
            </h3>
            <span className="text-xs text-slate-500">Event Driven</span>
          </div>

          <div className="p-6 flex flex-col items-center justify-center border-b border-slate-800 bg-slate-900/20">
            <div className="text-center mb-4">
              <p className="text-sm text-slate-400 mb-2">Simulate an event on the Payment Provider (Server)</p>
              <button 
                onClick={triggerWebhook}
                disabled={isProcessingPayment}
                className={`
                  bg-webhook hover:bg-rose-500 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-all
                  ${isProcessingPayment ? 'opacity-50 cursor-wait' : 'active:scale-95'}
                `}
              >
                {isProcessingPayment ? 'Processing...' : 'Simulate Payment Success'}
              </button>
            </div>
          </div>

          <div className="flex-grow bg-slate-950 p-4 font-mono text-xs overflow-y-auto custom-scrollbar h-40 md:h-auto">
             <div className="text-slate-500 mb-2 uppercase tracking-wide font-bold">Server Logs</div>
             {webhookLog.length === 0 && <span className="text-slate-600 italic">// Waiting for events...</span>}
             {webhookLog.map((log, i) => (
               <div key={i} className="mb-2 text-green-400 border-l-2 border-green-600 pl-2 animate-in fade-in slide-in-from-left-2 duration-300">
                 {log}
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeTab;