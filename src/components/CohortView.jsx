import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useLearning } from '../context/LearningContext';

export const CohortView = () => {
  const { teacherData } = useLearning();

  if (!teacherData || !teacherData.students) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <p className="text-gray-600">No cohort data available</p>
      </div>
    );
  }

  // Process data for visualization - group by topic
  const topicDistribution = {};
  const masteryData = [];

  teacherData.students.forEach((student) => {
    if (!topicDistribution[student.current_topic]) {
      topicDistribution[student.current_topic] = 0;
    }
    topicDistribution[student.current_topic]++;

    masteryData.push({
      name: student.name,
      mastery: Math.round(student.mastery * 100),
    });
  });

  const chartData = Object.entries(topicDistribution).map(([topic, count]) => ({
    topic,
    students: count,
  }));

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <p className="text-gray-600 text-sm">Average Mastery</p>
          <p className="text-3xl font-bold text-primary-600 mt-2">
            {(
              teacherData.students.reduce((sum, s) => sum + s.mastery, 0) /
              teacherData.students.length * 100
            ).toFixed(1)}%
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <p className="text-gray-600 text-sm">Students by Performance</p>
          <div className="mt-4 space-y-2">
            <p className="text-sm">
              <span className="font-semibold">High:</span>{' '}
              {teacherData.students.filter((s) => s.mastery >= 0.8).length} students
            </p>
            <p className="text-sm">
              <span className="font-semibold">Medium:</span>{' '}
              {teacherData.students.filter((s) => s.mastery >= 0.5 && s.mastery < 0.8).length} students
            </p>
            <p className="text-sm">
              <span className="font-semibold">Low:</span>{' '}
              {teacherData.students.filter((s) => s.mastery < 0.5).length} students
            </p>
          </div>
        </div>
      </div>

      {/* Topic Distribution */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Student Distribution by Topic</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="topic" angle={-45} textAnchor="end" height={100} />
            <YAxis label={{ value: 'Number of Students', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Bar dataKey="students" fill="#0ea5e9" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Mastery Distribution */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Student Mastery Levels</h3>
        <div className="space-y-3">
          {masteryData.slice(0, 5).map((item, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <p className="w-32 text-sm font-semibold text-gray-900 truncate">{item.name}</p>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    item.mastery >= 80
                      ? 'bg-green-500'
                      : item.mastery >= 50
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}
                  style={{ width: `${item.mastery}%` }}
                />
              </div>
              <span className="w-12 text-right text-sm font-semibold text-gray-900">{item.mastery}%</span>
            </div>
          ))}
          {masteryData.length > 5 && (
            <p className="text-xs text-gray-500 text-center pt-2">
              And {masteryData.length - 5} more students...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CohortView;
