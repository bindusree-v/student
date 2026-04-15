import React from 'react';
import { useLearning } from '../context/LearningContext';

export const TeacherDashboard = () => {
  const { teacherData, loading, error } = useLearning();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [studentFilter, setStudentFilter] = React.useState('all');

  const toPercent = (mastery) => {
    if (typeof mastery !== 'number' || Number.isNaN(mastery)) return 0;
    const normalized = mastery > 1 ? mastery / 100 : mastery;
    return Math.max(0, Math.min(100, Math.round(normalized * 100)));
  };

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
        <p className="text-red-800">Error loading teacher dashboard: {error}</p>
      </div>
    );
  }

  if (!teacherData) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <p className="text-gray-600">No data available</p>
      </div>
    );
  }

  const students = teacherData.students || [];
  const totalStudents = teacherData.total_students || students.length;
  const activeStudents = teacherData.active_students || 0;
  const inactiveStudents = teacherData.inactive_students || 0;
  const avgMastery = students.length
    ? Math.round(students.reduce((sum, s) => sum + toPercent(s.mastery), 0) / students.length)
    : 0;
  const atRiskStudents = students
    .filter((s) => toPercent(s.mastery) < 50)
    .sort((a, b) => toPercent(a.mastery) - toPercent(b.mastery));
  const highPerformers = students
    .filter((s) => toPercent(s.mastery) >= 80)
    .sort((a, b) => toPercent(b.mastery) - toPercent(a.mastery))
    .slice(0, 5);
  const engagementRate = totalStudents ? Math.round((activeStudents / totalStudents) * 100) : 0;
  const filteredStudents = students.filter((student) => {
    const masteryPercent = toPercent(student.mastery);
    const matchesSearch = `${student.name || ''} ${student.current_topic || ''} ${student.weak_area || ''}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter = (
      studentFilter === 'all'
      || (studentFilter === 'active' && student.is_active)
      || (studentFilter === 'atRisk' && masteryPercent < 50)
      || (studentFilter === 'top' && masteryPercent >= 80)
    );
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <p className="text-gray-600 text-sm">Total Students</p>
          <p className="text-4xl font-bold text-gray-900 mt-2">{totalStudents}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <p className="text-gray-600 text-sm">Active Now</p>
          <p className="text-4xl font-bold text-green-600 mt-2">{activeStudents}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <p className="text-gray-600 text-sm">Average Mastery</p>
          <p className="text-4xl font-bold text-blue-600 mt-2">{avgMastery}%</p>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <p className="text-gray-600 text-sm">Engagement Rate</p>
          <p className="text-4xl font-bold text-purple-600 mt-2">{engagementRate}%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900">At-Risk Students</h3>
          <p className="text-sm text-gray-600 mt-1">Students below 50% mastery needing intervention</p>
          {atRiskStudents.length === 0 ? (
            <p className="text-sm text-green-700 mt-4">No students are currently at risk.</p>
          ) : (
            <div className="mt-4 space-y-3">
              {atRiskStudents.slice(0, 6).map((student) => (
                <div key={student.id} className="flex items-center justify-between border border-red-100 bg-red-50 rounded-lg px-3 py-2">
                  <div>
                    <p className="font-semibold text-gray-900">{student.name}</p>
                    <p className="text-xs text-gray-600">{student.weak_area || 'Needs review'} </p>
                  </div>
                  <span className="text-sm font-bold text-red-700">{toPercent(student.mastery)}%</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900">Top Performers</h3>
          <p className="text-sm text-gray-600 mt-1">Students at or above 80% mastery</p>
          {highPerformers.length === 0 ? (
            <p className="text-sm text-gray-600 mt-4">No high performers yet.</p>
          ) : (
            <div className="mt-4 space-y-3">
              {highPerformers.map((student, index) => (
                <div key={student.id} className="flex items-center justify-between border border-green-100 bg-green-50 rounded-lg px-3 py-2">
                  <div>
                    <p className="font-semibold text-gray-900">{index + 1}. {student.name}</p>
                    <p className="text-xs text-gray-600">{student.current_topic}</p>
                  </div>
                  <span className="text-sm font-bold text-green-700">{toPercent(student.mastery)}%</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Student List */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Student List</h2>
          <p className="text-sm text-gray-600 mt-1">
            {activeStudents} active, {inactiveStudents} inactive
          </p>
          <div className="mt-4 flex flex-col md:flex-row gap-3">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, topic, or weak area"
              className="w-full md:max-w-sm px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <div className="flex gap-2 flex-wrap">
              {[
                { id: 'all', label: 'All' },
                { id: 'active', label: 'Active' },
                { id: 'atRisk', label: 'At-Risk' },
                { id: 'top', label: 'Top Performers' }
              ].map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setStudentFilter(filter.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition ${
                    studentFilter === filter.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Student</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Current Topic</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Mastery</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Weak Area</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-900">{student.name}</p>
                    <p className="text-xs text-gray-500">ID: {student.id}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        student.is_active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {student.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-900">{student.current_topic}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${toPercent(student.mastery)}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-gray-900">
                        {toPercent(student.mastery)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900">{student.weak_area}</td>
                  <td className="px-6 py-4">
                    <button className="text-primary-600 hover:text-primary-700 font-semibold text-sm">
                      Adjust Path
                    </button>
                  </td>
                </tr>
              ))}
              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-sm text-gray-600">
                    No students match this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
