import React from 'react';
import { useLearning } from '../context/LearningContext';
import LearningPathView from './LearningPathView';
import DifficultyIndicator from './DifficultyIndicator';
import ExplainabilityPanel from './ExplainabilityPanel';
import ProgressPrediction from './ProgressPrediction';

export const StudentDashboard = () => {
  const { studentData, loading, error } = useLearning();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">Error loading dashboard: {error}</p>
      </div>
    );
  }

  if (!studentData) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <p className="text-gray-600">No data available</p>
      </div>
    );
  }

  // Calculate completed topics list
  const completedTopicsCount = studentData.completed_topics || 0;
  const learningPathLength = studentData.learning_path?.length || 0;
  const completedTopicsList = studentData.learning_path?.slice(0, completedTopicsCount) || [];

  return (
    <div className="space-y-8">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
          <p className="text-gray-600 text-sm">Overall Mastery</p>
          <p className="text-3xl font-bold text-primary-600 mt-2">
            {Math.round(studentData.mastery * 100)}%
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
          <p className="text-gray-600 text-sm">Topics Completed</p>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {completedTopicsCount}/{learningPathLength}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
          <p className="text-gray-600 text-sm">Assessments Taken</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">{studentData.assessments_taken}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
          <p className="text-gray-600 text-sm">Strong Area</p>
          <p className="text-lg font-bold text-gray-900 mt-2">{studentData.strong_area}</p>
        </div>
      </div>

      {/* Current Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Current Focus</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Current Topic</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{studentData.current_topic}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Weak Area</p>
              <p className="text-lg font-bold text-warning-500 mt-2">{studentData.weak_area}</p>
            </div>
          </div>
        </div>

        {/* Difficulty Indicator */}
        <DifficultyIndicator currentDifficulty="medium" />
      </div>

      {/* Learning Path */}
      <LearningPathView
        learningPath={studentData.learning_path}
        currentTopic={studentData.current_topic}
        completedTopics={completedTopicsList}
      />

      {/* Explainability Panel */}
      <ExplainabilityPanel
        recommendation={studentData.recommendation}
        topicName={studentData.current_topic}
      />

      {/* Progress Prediction */}
      <ProgressPrediction
        currentPace={1.2} // topics per day estimate
        completedTopics={completedTopicsCount}
        totalTopics={learningPathLength}
      />

      {/* Learning Tips */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-md border border-blue-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">📚 Learning Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex gap-3">
            <span className="text-2xl">🎯</span>
            <div>
              <p className="font-semibold text-gray-900">Set Daily Goals</p>
              <p className="text-sm text-gray-600 mt-1">Aim to complete 1-2 topics daily for optimal learning</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-2xl">⏰</span>
            <div>
              <p className="font-semibold text-gray-900">Consistent Practice</p>
              <p className="text-sm text-gray-600 mt-1">Regular short sessions are better than long cramming</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <p className="font-semibold text-gray-900">Review Weak Areas</p>
              <p className="text-sm text-gray-600 mt-1">Focus on strengthening {studentData.weak_area}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-2xl">✅</span>
            <div>
              <p className="font-semibold text-gray-900">Track Progress</p>
              <p className="text-sm text-gray-600 mt-1">Check back regularly to see your improvement</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
