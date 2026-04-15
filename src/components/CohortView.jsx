import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useLearning } from '../context/LearningContext';

export const CohortView = ({
  selectedTopic = 'all',
  masteryRange = 'all',
  onSelectedTopicChange = () => {},
  onMasteryRangeChange = () => {},
}) => {
  const { teacherData } = useLearning();

  if (!teacherData || !teacherData.students) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <p className="text-gray-600">No cohort data available</p>
      </div>
    );
  }

  const toPercent = (mastery) => {
    if (typeof mastery !== 'number' || Number.isNaN(mastery)) return 0;
    const normalized = mastery > 1 ? mastery / 100 : mastery;
    return Math.max(0, Math.min(100, Math.round(normalized * 100)));
  };

  const allStudents = teacherData.students || [];
  const availableTopics = Array.from(
    new Set(allStudents.map((s) => s.current_topic || 'Unknown'))
  ).sort();
  const filteredStudents = allStudents.filter((student) => {
    const topic = student.current_topic || 'Unknown';
    const mastery = toPercent(student.mastery);
    const topicMatch = selectedTopic === 'all' || topic === selectedTopic;
    const masteryMatch = (
      masteryRange === 'all'
      || (masteryRange === 'high' && mastery >= 80)
      || (masteryRange === 'medium' && mastery >= 50 && mastery < 80)
      || (masteryRange === 'low' && mastery < 50)
    );
    return topicMatch && masteryMatch;
  });

  // Process filtered data for visualization
  const topicDistribution = {};
  const masteryData = [];
  const weakAreaDistribution = {};

  filteredStudents.forEach((student) => {
    const topic = student.current_topic || 'Unknown';
    const weakArea = student.weak_area || 'Not specified';

    if (!topicDistribution[topic]) {
      topicDistribution[topic] = 0;
    }
    topicDistribution[topic]++;

    if (!weakAreaDistribution[weakArea]) {
      weakAreaDistribution[weakArea] = 0;
    }
    weakAreaDistribution[weakArea]++;

    masteryData.push({
      name: student.name,
      mastery: toPercent(student.mastery),
    });
  });

  const chartData = Object.entries(topicDistribution)
    .map(([topic, count]) => ({ topic, students: count }))
    .sort((a, b) => b.students - a.students);
  const weakAreas = Object.entries(weakAreaDistribution)
    .map(([area, count]) => ({ area, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
  const sortedMasteryData = [...masteryData].sort((a, b) => b.mastery - a.mastery);
  const students = filteredStudents;
  const averageMastery = students.length
    ? (students.reduce((sum, s) => sum + toPercent(s.mastery), 0) / students.length).toFixed(1)
    : '0.0';
  const highPerformers = students.filter((s) => toPercent(s.mastery) >= 80).length;
  const mediumPerformers = students.filter((s) => {
    const p = toPercent(s.mastery);
    return p >= 50 && p < 80;
  }).length;
  const lowPerformers = students.filter((s) => toPercent(s.mastery) < 50).length;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div>
            <label className="text-xs font-semibold text-gray-600">Topic Filter</label>
            <select
              value={selectedTopic}
              onChange={(e) => onSelectedTopicChange(e.target.value)}
              className="mt-1 w-full md:w-56 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Topics</option>
              {availableTopics.map((topic) => (
                <option key={topic} value={topic}>{topic}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600">Mastery Range</label>
            <select
              value={masteryRange}
              onChange={(e) => onMasteryRangeChange(e.target.value)}
              className="mt-1 w-full md:w-56 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Levels</option>
              <option value="high">High (80-100%)</option>
              <option value="medium">Medium (50-79%)</option>
              <option value="low">Low (0-49%)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <p className="text-gray-600 text-sm">Average Mastery</p>
          <p className="text-3xl font-bold text-primary-600 mt-2">{averageMastery}%</p>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <p className="text-gray-600 text-sm">High Performers</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{highPerformers}</p>
          <p className="text-xs text-gray-500 mt-1">80% and above</p>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <p className="text-gray-600 text-sm">Medium Performers</p>
          <p className="text-3xl font-bold text-yellow-600 mt-2">{mediumPerformers}</p>
          <p className="text-xs text-gray-500 mt-1">50% to 79%</p>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <p className="text-gray-600 text-sm">At-Risk Students</p>
          <p className="text-3xl font-bold text-red-600 mt-2">{lowPerformers}</p>
          <p className="text-xs text-gray-500 mt-1">Below 50%</p>
        </div>
      </div>

      {/* Topic Distribution */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Student Distribution by Topic</h3>
        {chartData.length === 0 ? (
          <p className="text-sm text-gray-600">No data for current filter.</p>
        ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="topic" angle={-45} textAnchor="end" height={100} />
            <YAxis label={{ value: 'Number of Students', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Bar dataKey="students" fill="#0ea5e9" />
          </BarChart>
        </ResponsiveContainer>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Most Common Weak Areas</h3>
        {weakAreas.length === 0 ? (
          <p className="text-sm text-gray-600">No weak-area insights available.</p>
        ) : (
          <div className="space-y-3">
            {weakAreas.map((item) => (
              <div key={item.area} className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
                <span className="text-sm font-medium text-gray-900">{item.area}</span>
                <span className="text-sm font-bold text-purple-700">{item.count} students</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mastery Distribution */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Top Student Mastery Levels</h3>
        {sortedMasteryData.length === 0 ? (
          <p className="text-sm text-gray-600">No students match this filter.</p>
        ) : (
        <div className="space-y-3">
          {sortedMasteryData.slice(0, 8).map((item, idx) => (
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
          {sortedMasteryData.length > 8 && (
            <p className="text-xs text-gray-500 text-center pt-2">
              And {sortedMasteryData.length - 8} more students...
            </p>
          )}
        </div>
        )}
      </div>
    </div>
  );
};

export default CohortView;
