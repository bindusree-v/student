import React from 'react';
import { Lightbulb, BookOpen, Zap } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

// Helper function to render LaTeX safely
const SafeLatexRenderer = ({ latex, fallback }) => {
  try {
    return <BlockMath math={latex} />;
  } catch (e) {
    return <code className="text-sm text-gray-700">{fallback || latex}</code>;
  }
};

export default function ConceptOverview({
  concept = {},
  isLoading = false
}) {
  const {
    title = 'Concept Overview',
    description = 'Loading concept information...',
    explanation = '',
    keyTakeaways = [],
    formulas = []
  } = concept;

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Main Overview */}
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-purple-600" />
          {title}
        </h2>

        {description && (
          <p className="text-gray-700 leading-relaxed mb-6">
            {description}
          </p>
        )}

        {explanation && (
          <div className="bg-blue-50 rounded-lg border border-blue-200 p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-600" />
              In Depth Explanation
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {explanation}
            </p>
          </div>
        )}

        {/* Key Takeaways */}
        {keyTakeaways && keyTakeaways.length > 0 && (
          <div className="bg-purple-50 rounded-lg border border-purple-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              Key Takeaways
            </h3>
            <ul className="space-y-2">
              {keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                  <span className="text-purple-600 font-bold pt-0.5">✓</span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Formulas Section */}
      {formulas && formulas.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Mathematical Formulas</h3>

          <div className="space-y-6">
            {formulas.map((formula, idx) => (
              <div key={idx} className="border-l-4 border-purple-600 pl-4 py-2">
                {/* Formula Name */}
                <h4 className="font-semibold text-gray-900 mb-2">{formula.name}</h4>

                {/* LaTeX Formula */}
                <div className="bg-gray-50 rounded-lg p-4 mb-3 overflow-x-auto">
                  <div className="flex items-center justify-center">
                    {formula.latex_formula ? (
                      <SafeLatexRenderer
                        latex={formula.latex_formula}
                        fallback={formula.plain_text}
                      />
                    ) : (
                      <code className="text-sm text-gray-700">{formula.plain_text || 'Formula not available'}</code>
                    )}
                  </div>
                </div>

                {/* Explanation */}
                {formula.explanation && (
                  <p className="text-gray-700 text-sm mb-2">
                    <span className="font-semibold">Explanation:</span> {formula.explanation}
                  </p>
                )}

                {/* Use Case */}
                {formula.use_case && (
                  <p className="text-gray-700 text-sm mb-2">
                    <span className="font-semibold">Use Case:</span> {formula.use_case}
                  </p>
                )}

                {/* Real World Example */}
                {formula.real_world_example && (
                  <div className="bg-amber-50 rounded p-3 text-sm">
                    <span className="font-semibold text-gray-900">Real World Example:</span>
                    <p className="text-gray-700 mt-1">{formula.real_world_example}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
