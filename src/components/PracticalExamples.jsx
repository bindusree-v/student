import React, { useState } from 'react';
import { Code2, Copy, Check, ChevronRight } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function PracticalExamples({
  examples = [],
  isLoading = false
}) {
  const [copiedIdx, setCopiedIdx] = useState(null);

  const copyToClipboard = (code, idx) => {
    navigator.clipboard.writeText(code);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="h-40 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!examples || examples.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-8">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Code2 className="w-6 h-6 text-blue-600" />
        Practical Examples & Use Cases
      </h3>

      <div className="space-y-8">
        {examples.map((example, idx) => (
          <div key={idx} className="border-b border-gray-200 pb-8 last:border-0">
            {/* Example Title */}
            <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-purple-600 text-white text-sm">
                {idx + 1}
              </span>
              {example.title}
            </h4>

            {/* Description */}
            {example.description && (
              <p className="text-gray-700 mb-4 leading-relaxed">
                {example.description}
              </p>
            )}

            {/* Context */}
            {example.context && (
              <div className="bg-blue-50 rounded-lg p-3 mb-4 text-sm text-gray-700">
                <span className="font-semibold">Context:</span> {example.context}
              </div>
            )}

            {/* Code Example */}
            {example.code && (
              <div className="bg-gray-900 rounded-lg overflow-hidden mb-4">
                <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
                  <span className="text-sm text-gray-300">
                    {example.language?.toUpperCase() || 'CODE'}
                  </span>
                  <button
                    onClick={() => copyToClipboard(example.code, idx)}
                    className="flex items-center gap-2 px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm text-gray-200 transition"
                    title="Copy code"
                  >
                    {copiedIdx === idx ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <SyntaxHighlighter
                    language={example.language || 'javascript'}
                    style={atomDark}
                    customStyle={{
                      margin: 0,
                      padding: '1rem',
                      fontSize: '0.875rem',
                      backgroundColor: 'transparent'
                    }}
                  >
                    {example.code}
                  </SyntaxHighlighter>
                </div>
              </div>
            )}

            {/* Explanation */}
            {example.explanation && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold text-green-700">💡 Explanation:</span>
                  {' '}
                  {example.explanation}
                </p>
              </div>
            )}

            {/* Output/Result */}
            {example.output && (
              <div className="mt-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-semibold">Expected Output:</span>
                </p>
                <code className="block text-sm text-gray-800 bg-white p-2 rounded border border-gray-300 overflow-x-auto">
                  {example.output}
                </code>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Common Mistakes Section */}
      {examples.some(e => e.commonMistakes) && (
        <div className="mt-8 bg-red-50 rounded-lg p-6 border border-red-200">
          <h4 className="font-semibold text-red-900 mb-3">⚠️ Common Mistakes to Avoid</h4>
          <ul className="space-y-2">
            {examples
              .filter(e => e.commonMistakes)
              .map((example, idx) =>
                example.commonMistakes.map((mistake, mistakeIdx) => (
                  <li key={`${idx}-${mistakeIdx}`} className="text-sm text-red-800 flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    {mistake}
                  </li>
                ))
              )}
          </ul>
        </div>
      )}
    </div>
  );
}
