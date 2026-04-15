import React from 'react';
import { LearningProvider, useLearning } from './context/LearningContext';
import Header from './components/Header';
import StudentDashboard from './components/StudentDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import CohortView from './components/CohortView';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import CoursesPage from './components/CoursesPage';
import CourseRoadmap from './components/CourseRoadmap';
import StudyPage from './components/StudyPage';
import ConceptPage from './components/ConceptPage';
import AssignAssessment from './components/AssignAssessment';
import UploadVideo from './components/UploadVideo';
import './App.css';

function AppContent() {
  const {
    isAuthenticated,
    currentPage,
    selectedRole,
    authMode,
    selectedCourse,
    selectedTopic,
    selectedConcept,
    userRole,
    loading,
    selectRole,
    switchAuthMode,
    handleLogin,
    navigateToCourses,
    navigateToRoadmap,
    navigateToStudy,
    navigateToConcept,
    navigateBack,
    setCurrentPage,
  } = useLearning();

  // Loading state
  if (loading && !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your personalized learning dashboard...</p>
        </div>
      </div>
    );
  }

  // Not authenticated - show landing and auth pages
  if (!isAuthenticated) {
    if (currentPage === 'landing') {
      return (
        <LandingPage onSelectRole={selectRole} />
      );
    }

    if (currentPage === 'auth') {
      return (
        <AuthPage
          mode={authMode}
          role={selectedRole}
          onSubmit={handleLogin}
          onSwitchMode={switchAuthMode}
          onBack={() => navigateBack()}
        />
      );
    }
  }

  // Authenticated - show main application
  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage !== 'study' && currentPage !== 'roadmap' && currentPage !== 'concept' && <Header />}

      {/* Student Portal */}
      {userRole === 'student' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {currentPage === 'courses' && (
            <CoursesPage onSelectCourse={navigateToRoadmap} />
          )}

          {currentPage === 'roadmap' && selectedCourse && (
            <CourseRoadmap
              course={selectedCourse}
              onStartTopic={navigateToStudy}
              onBack={() => navigateBack()}
            />
          )}

          {currentPage === 'study' && selectedCourse && selectedTopic && (
            <StudyPage
              course={selectedCourse}
              topic={selectedTopic}
              onBack={() => navigateBack()}
            />
          )}

          {currentPage === 'concept' && selectedCourse && selectedConcept && (
            <ConceptPage
              course={selectedCourse}
              concept={selectedConcept}
              topic={selectedConcept}
              studentId={1}
              onBack={() => navigateBack()}
            />
          )}

          {currentPage === 'dashboard' && <StudentDashboard />}
        </main>
      )}

      {/* Teacher Portal */}
      {userRole === 'teacher' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {currentPage === 'teacherDashboard' && <TeacherViewContent />}
        </main>
      )}

      {/* Legacy dashboard view for backward compatibility */}
      {currentPage === 'legacy' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {userRole === 'student' ? <StudentDashboard /> : null}
          {userRole === 'teacher' && <TeacherViewContent />}
        </main>
      )}
    </div>
  );
}

function TeacherViewContent() {
  const [activeTab, setActiveTab] = React.useState('overview');
  const [cohortFilters, setCohortFilters] = React.useState(() => {
    try {
      const saved = localStorage.getItem('teacherCohortFilters');
      if (!saved) {
        return { selectedTopic: 'all', masteryRange: 'all' };
      }
      const parsed = JSON.parse(saved);
      return {
        selectedTopic: parsed?.selectedTopic || 'all',
        masteryRange: parsed?.masteryRange || 'all',
      };
    } catch {
      return { selectedTopic: 'all', masteryRange: 'all' };
    }
  });

  React.useEffect(() => {
    localStorage.setItem('teacherCohortFilters', JSON.stringify(cohortFilters));
  }, [cohortFilters]);

  return (
    <div className="space-y-6">
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            activeTab === 'overview'
              ? 'bg-purple-600 text-white'
              : 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          Dashboard Overview
        </button>
        <button
          onClick={() => setActiveTab('cohort')}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            activeTab === 'cohort'
              ? 'bg-purple-600 text-white'
              : 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          Cohort Analysis
        </button>
        <button
          onClick={() => setActiveTab('assessments')}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            activeTab === 'assessments'
              ? 'bg-purple-600 text-white'
              : 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          Assign Assessments
        </button>
        <button
          onClick={() => setActiveTab('videos')}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            activeTab === 'videos'
              ? 'bg-purple-600 text-white'
              : 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          Upload Videos
        </button>
      </div>

      {activeTab === 'overview' && <TeacherDashboard />}
      {activeTab === 'cohort' && (
        <CohortView
          selectedTopic={cohortFilters.selectedTopic}
          masteryRange={cohortFilters.masteryRange}
          onSelectedTopicChange={(value) => {
            setCohortFilters((prev) => ({ ...prev, selectedTopic: value }));
          }}
          onMasteryRangeChange={(value) => {
            setCohortFilters((prev) => ({ ...prev, masteryRange: value }));
          }}
        />
      )}
      {activeTab === 'assessments' && <AssignAssessment />}
      {activeTab === 'videos' && <UploadVideo />}
    </div>
  );
}

function App() {
  return (
    <LearningProvider>
      <AppContent />
    </LearningProvider>
  );
}

export default App;
