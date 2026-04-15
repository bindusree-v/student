import React from 'react';

export const LearningPathView = ({ learningPath, currentTopic, completedTopics }) => {
  const getStatusIcon = (topic, index) => {
    if (completedTopics?.includes(topic)) {
      return <span className="text-green-600 font-bold">✓</span>;
    }
    if (topic === currentTopic) {
      return <span className="text-blue-600 font-bold">●</span>;
    }
    return <span className="text-gray-400">○</span>;
  };

  const getStatusColor = (topic) => {
    if (completedTopics?.includes(topic)) {
      return 'bg-green-50 border-green-200';
    }
    if (topic === currentTopic) {
      return 'bg-blue-50 border-blue-200';
    }
    return 'bg-gray-50 border-gray-200';
  };

  const getStatusLabel = (topic) => {
    if (completedTopics?.includes(topic)) {
      return 'Completed';
    }
    if (topic === currentTopic) {
      return 'Current';
    }
    return 'Upcoming';
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Learning Path</h2>
      <p className="text-gray-600 text-sm mb-6">
        {completedTopics?.length || 0} completed • Progressing through {currentTopic}
      </p>

      <div className="space-y-4">
        {learningPath && learningPath.map((topic, index) => (
          <div
            key={index}
            className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-all ${getStatusColor(topic)}`}
          >
            {/* Status Icon */}
            <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-white border-2 border-gray-300">
              {getStatusIcon(topic, index)}
            </div>

            {/* Topic Info */}
            <div className="flex-grow">
              <h3 className="font-semibold text-gray-900">{topic}</h3>
              <p className="text-xs text-gray-500 mt-1">{getStatusLabel(topic)}</p>
            </div>

            {/* Progress Badge */}
            <div className="flex-shrink-0">
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                  completedTopics?.includes(topic)
                    ? 'bg-green-100 text-green-800'
                    : topic === currentTopic
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {index + 1}/{learningPath.length}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Visual Timeline */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Progress Timeline</h3>
        <div className="flex items-center gap-2">
          {learningPath && learningPath.map((topic, index) => (
            <div key={index} className="flex-1">
              <div
                className={`h-2 rounded-full transition-all ${
                  completedTopics?.includes(topic)
                    ? 'bg-green-500'
                    : topic === currentTopic
                    ? 'bg-blue-500'
                    : 'bg-gray-300'
                }`}
              />
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Overall Progress: {Math.round(((completedTopics?.length || 0) / (learningPath?.length || 1)) * 100)}%
        </p>
      </div>
    </div>
  );
};

export default LearningPathView;
