import React from 'react';
import { useLearning } from '../context/LearningContext';

export const TeacherDashboard = () => {
  const { teacherData, loading, error } = useLearning();

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

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <p className="text-gray-600 text-sm">Total Students</p>
          <p className="text-4xl font-bold text-gray-900 mt-2">{teacherData.total_students}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <p className="text-gray-600 text-sm">Active Now</p>
          <p className="text-4xl font-bold text-green-600 mt-2">{teacherData.active_students}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <p className="text-gray-600 text-sm">Inactive</p>
          <p className="text-4xl font-bold text-gray-400 mt-2">{teacherData.inactive_students}</p>
        </div>
      </div>

      {/* Student List */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Student List</h2>
          <p className="text-sm text-gray-600 mt-1">View and manage individual student paths</p>
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
              {teacherData.students && teacherData.students.map((student) => (
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
                          style={{ width: `${student.mastery * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-gray-900">
                        {Math.round(student.mastery * 100)}%
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
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
