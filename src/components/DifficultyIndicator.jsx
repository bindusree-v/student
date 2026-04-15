import React from 'react';

export const DifficultyIndicator = ({ currentDifficulty = 'medium' }) => {
  const difficultyLevels = {
    easy: { label: 'Easy', color: 'bg-green-100 text-green-800', width: 33 },
    medium: { label: 'Medium', color: 'bg-yellow-100 text-yellow-800', width: 66 },
    hard: { label: 'Hard', color: 'bg-red-100 text-red-800', width: 100 },
  };

  const current = difficultyLevels[currentDifficulty] || difficultyLevels.medium;

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Current Difficulty</h3>

      <div className="mb-4">
        <div className={`inline-block px-4 py-2 rounded-full font-semibold text-sm ${current.color}`}>
          {current.label}
        </div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ease-in-out ${
            currentDifficulty === 'easy'
              ? 'bg-green-500'
              : currentDifficulty === 'hard'
              ? 'bg-red-500'
              : 'bg-yellow-500'
          }`}
          style={{ width: `${current.width}%` }}
        />
      </div>

      <p className="text-xs text-gray-500 mt-3">
        📈 Your path is adjusting in real-time based on your performance
      </p>
    </div>
  );
};

export default DifficultyIndicator;
