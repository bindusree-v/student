import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const ProgressPrediction = ({ currentPace, completedTopics, totalTopics }) => {
  // Mock prediction data - calculates estimated completion
  const remainingTopics = totalTopics - completedTopics;
  const daysToCompletion = Math.ceil((remainingTopics / currentPace));

  // Generate projection data
  const projectionData = [];
  const today = new Date();

  for (let i = 0; i <= daysToCompletion; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    projectionData.push({
      day: i,
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      projected: Math.min(completedTopics + (currentPace * i), totalTopics),
      current: i === 0 ? completedTopics : undefined,
    });
  }

  const completionDate = new Date(today);
  completionDate.setDate(completionDate.getDate() + daysToCompletion);

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Progress Prediction</h3>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Estimated Completion</p>
          <p className="text-2xl font-bold text-primary-600">
            {completionDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </p>
          <p className="text-xs text-gray-500 mt-1">in ~{daysToCompletion} days</p>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Learning Pace</p>
          <p className="text-2xl font-bold text-success-500">{currentPace}/day</p>
          <p className="text-xs text-gray-500 mt-1">topics per day</p>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={projectionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={100}
            />
            <YAxis label={{ value: 'Topics Completed', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="projected"
              stroke="#0ea5e9"
              strokeWidth={2}
              name="Projected Progress"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProgressPrediction;
