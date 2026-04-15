import React, { useState } from 'react';
import { useLearning } from '../context/LearningContext';
import { LogOut, Menu, X, Home } from 'lucide-react';

export const Header = () => {
  const {
    userRole,
    switchRole,
    studentData,
    teacherData,
    user,
    handleLogout,
    navigateToCourses,
    setCurrentPage,
    currentPage
  } = useLearning();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogoutClick = () => {
    handleLogout();
    setMobileMenuOpen(false);
  };

  const handleNavigateToCourses = () => {
    if (userRole === 'student') {
      navigateToCourses();
    }
    setMobileMenuOpen(false);
  };

  // Get the display name - from user context (username)
  const displayName = user?.username || user?.name || 'User';

  return (
    <header className="bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <button
            onClick={handleNavigateToCourses}
            className="flex items-center gap-3 hover:opacity-90 transition"
          >
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-purple-600 font-bold text-lg">
              LP
            </div>
            <h1 className="text-2xl font-bold hidden sm:block">LearnPath</h1>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {/* User Info */}
            <div className="text-sm">
              {userRole === 'student' && (
                <div className="flex flex-col">
                  <span className="font-semibold">Welcome, {displayName}</span>
                  <span className="text-purple-100 text-xs">Student Portal</span>
                </div>
              )}
              {userRole === 'teacher' && (
                <div className="flex flex-col">
                  <span className="font-semibold">Welcome, {displayName}</span>
                  <span className="text-purple-100 text-xs">Teacher Dashboard</span>
                </div>
              )}
            </div>

            {/* Role Switch */}
            <div className="flex gap-2 bg-white/20 px-3 py-1 rounded-lg">
              <button
                onClick={() => switchRole('student')}
                className={`px-3 py-1 rounded transition font-medium ${
                  userRole === 'student'
                    ? 'bg-white text-purple-600'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                Student
              </button>
              <button
                onClick={() => switchRole('teacher')}
                className={`px-3 py-1 rounded transition font-medium ${
                  userRole === 'teacher'
                    ? 'bg-white text-purple-600'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                Teacher
              </button>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogoutClick}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition font-medium"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-white/20 rounded-lg transition"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-white/20 space-y-3">
            <div className="text-sm pb-3 border-b border-white/20">
              {userRole === 'student' && (
                <div>
                  <div className="font-semibold">Welcome, {displayName}</div>
                  <div className="text-purple-100 text-xs">Student Portal</div>
                </div>
              )}
              {userRole === 'teacher' && (
                <div>
                  <div className="font-semibold">Welcome, {displayName}</div>
                  <div className="text-purple-100 text-xs">Teacher Dashboard</div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <button
                onClick={() => switchRole('student')}
                className={`w-full text-left px-3 py-2 rounded transition ${
                  userRole === 'student'
                    ? 'bg-white/20 font-semibold'
                    : 'hover:bg-white/10'
                }`}
              >
                Student Portal
              </button>
              <button
                onClick={() => switchRole('teacher')}
                className={`w-full text-left px-3 py-2 rounded transition ${
                  userRole === 'teacher'
                    ? 'bg-white/20 font-semibold'
                    : 'hover:bg-white/10'
                }`}
              >
                Teacher Dashboard
              </button>
            </div>

            <button
              onClick={handleLogoutClick}
              className="w-full flex items-center gap-2 px-3 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition font-medium"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
