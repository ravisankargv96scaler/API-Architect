import React, { useState, useEffect } from 'react';
import CodeBlock from '../CodeBlock';

interface Field {
  id: string;
  label: string;
}

const availableFields: Field[] = [
  { id: 'id', label: 'ID' },
  { id: 'name', label: 'Name' },
  { id: 'email', label: 'Email' },
  { id: 'posts', label: 'Posts (Title)' },
  { id: 'friends', label: 'Friends (Names)' },
];

const mockData: any = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  posts: [{ title: "Why GraphQL is cool" }, { title: "Hello World" }],
  friends: ["Bob", "Charlie"]
};

const GraphQlTab: React.FC = () => {
  const [selectedFields, setSelectedFields] = useState<string[]>(['name', 'email']);
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  const toggleField = (id: string) => {
    setSelectedFields(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    // Build Query
    const queryFields = selectedFields.map(f => {
      if (f === 'posts') return '  posts {\n    title\n  }';
      if (f === 'friends') return '  friends';
      return `  ${f}`;
    }).join('\n');

    const queryStr = `query {
  user(id: 1) {
${queryFields}
  }
}`;
    setQuery(queryStr);

    // Build Response
    const responseData: any = {};
    selectedFields.forEach(field => {
       responseData[field] = mockData[field];
    });

    setResponse(JSON.stringify({ data: { user: responseData } }, null, 2));
  }, [selectedFields]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-graphql mb-2">GraphQL</h2>
          <p className="text-slate-400">
            The "Flexible Query" style. Client-driven: you ask for exactly what fields you need, and the server returns JSON matching that shape. Avoids over-fetching.
          </p>
        </div>

        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">The Field Picker</h3>
          <p className="text-sm text-slate-400 mb-4">Select fields to include in your query:</p>
          
          <div className="grid grid-cols-2 gap-3">
            {availableFields.map(field => (
              <label key={field.id} className="flex items-center space-x-3 cursor-pointer group">
                <div className={`
                  w-5 h-5 rounded border flex items-center justify-center transition-all
                  ${selectedFields.includes(field.id) 
                    ? 'bg-pink-600 border-pink-500' 
                    : 'bg-slate-900 border-slate-600 group-hover:border-pink-400'}
                `}>
                  {selectedFields.includes(field.id) && (
                    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <input 
                  type="checkbox" 
                  className="hidden" 
                  checked={selectedFields.includes(field.id)}
                  onChange={() => toggleField(field.id)}
                />
                <span className={`text-sm ${selectedFields.includes(field.id) ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>
                  {field.label}
                </span>
              </label>
            ))}
          </div>

           <div className="mt-6 pt-6 border-t border-slate-700">
             <h4 className="text-sm font-bold text-slate-300 mb-2">Generated Query</h4>
             <pre className="bg-slate-950 p-3 rounded-md border border-slate-800 text-pink-300 font-mono text-sm overflow-x-auto">
               {query}
             </pre>
           </div>
        </div>
      </div>

      <div className="h-full min-h-[400px]">
        <CodeBlock 
          title="JSON Response" 
          code={response} 
          language="json" 
          sizeBytes={new Blob([response]).size}
        />
      </div>
    </div>
  );
};

export default GraphQlTab;