import React from 'react';

interface CodeBlockProps {
  title?: string;
  code: string;
  language?: string;
  color?: string; // Hex or tailwind class usage
  sizeBytes?: number;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ title, code, language = 'json', color = 'gray', sizeBytes }) => {
  return (
    <div className={`rounded-lg overflow-hidden border border-slate-700 bg-slate-950 shadow-lg flex flex-col h-full`}>
      {(title || sizeBytes !== undefined) && (
        <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex justify-between items-center">
          {title && <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{title}</span>}
          {sizeBytes !== undefined && (
            <span className="text-xs font-mono text-slate-500">
              Size: <span className={sizeBytes > 100 ? "text-red-400" : "text-green-400"}>{sizeBytes} bytes</span>
            </span>
          )}
        </div>
      )}
      <div className="p-4 overflow-auto custom-scrollbar flex-grow">
        <pre className={`font-mono text-sm leading-relaxed whitespace-pre-wrap`}>
          <code className="language-code text-slate-200">{code}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;