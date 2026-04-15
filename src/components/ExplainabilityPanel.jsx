import React, { useState } from 'react';

export const ExplainabilityPanel = ({ recommendation, topicName }) => {
  const [isOpen, setIsOpen] = useState(false);

  const reasons = recommendation?.reasons || [
    'Based on your recent assessment scores',
    'Builds upon your strong foundation in prerequisites',
    'Optimal difficulty for your learning pace',
    'Aligns with your learning style preferences',
  ];

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
      >
        <div>
          <h3 className="text-sm font-semibold text-gray-900 text-left">
            Why {topicName}?
          </h3>
          <p className="text-xs text-gray-500 text-left mt-1">
            Personalized recommendation explanation
          </p>
        </div>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>

      {isOpen && (
        <div className="px-6 py-4 bg-blue-50 border-t border-gray-200">
          <div className="space-y-3">
            {reasons.map((reason, idx) => (
              <div key={idx} className="flex gap-3">
                <span className="text-primary-600 font-bold text-sm">✓</span>
                <p className="text-sm text-gray-700">{reason}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-white rounded border border-primary-200">
            <p className="text-xs font-semibold text-primary-700 mb-1">💡 Did you know?</p>
            <p className="text-xs text-gray-600">
              Mastering this topic will improve your {recommendation?.skillArea || 'overall learning'} abilities.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExplainabilityPanel;
