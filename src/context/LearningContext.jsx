import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStudentDashboard, getTeacherDashboard } from '../api';

const LearningContext = createContext();

export const LearningProvider = ({ children }) => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [selectedRole, setSelectedRole] = useState(null);
  const [user, setUser] = useState(null);

  // Learning state
  const [studentData, setStudentData] = useState(null);
  const [teacherData, setTeacherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState('student');
  const [currentStudentId, setCurrentStudentId] = useState(1);

  // Navigation state
  const [currentPage, setCurrentPage] = useState('landing');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedConcept, setSelectedConcept] = useState(null);

  const fetchStudentDashboard = async (studentId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getStudentDashboard(studentId);
      setStudentData(response.data);
      setCurrentStudentId(studentId);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchTeacherDashboard = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getTeacherDashboard();
      setTeacherData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (formData, role) => {
    setLoading(true);
    try {
      // Simulate login
      await new Promise(resolve => setTimeout(resolve, 800));
      setUser({ email: formData.email, name: formData.name || 'User' });
      setSelectedRole(role);
      setUserRole(role);
      setIsAuthenticated(true);
      setCurrentPage(role === 'student' ? 'courses' : 'teacherDashboard');

      if (role === 'student') {
        await fetchStudentDashboard(currentStudentId);
      } else {
        await fetchTeacherDashboard();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setSelectedRole(null);
    setCurrentPage('landing');
    setSelectedCourse(null);
    setSelectedTopic(null);
    setSelectedConcept(null);
  };

  const selectRole = (role) => {
    setSelectedRole(role);
    setAuthMode('login');
    setCurrentPage('auth');
  };

  const switchAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'register' : 'login');
  };

  const navigateToCourses = () => {
    setCurrentPage('courses');
  };

  const navigateToRoadmap = (course) => {
    setSelectedCourse(course);
    setCurrentPage('roadmap');
  };

  const navigateToStudy = (topic) => {
    setSelectedTopic(topic);
    setCurrentPage('study');
  };

  const navigateToConcept = (concept) => {
    setSelectedConcept(concept);
    setCurrentPage('concept');
  };

  const navigateBack = () => {
    if (currentPage === 'concept') {
      setCurrentPage('roadmap');
      setSelectedConcept(null);
    } else if (currentPage === 'roadmap') {
      setCurrentPage('courses');
      setSelectedCourse(null);
    } else if (currentPage === 'study') {
      setCurrentPage('roadmap');
      setSelectedTopic(null);
    } else if (currentPage === 'auth') {
      setCurrentPage('landing');
      setSelectedRole(null);
    }
  };

  // Load initial data
  useEffect(() => {
    // Initialize from localStorage if available
    const savedAuth = localStorage.getItem('auth');
    if (savedAuth) {
      try {
        const auth = JSON.parse(savedAuth);
        setIsAuthenticated(auth.isAuthenticated);
        setUser(auth.user);
        setSelectedRole(auth.role);
        setUserRole(auth.role);
        setCurrentPage(auth.role === 'student' ? 'courses' : 'teacherDashboard');
      } catch (e) {
        console.error('Failed to load auth', e);
      }
    }
    setLoading(false);
  }, []);

  // Save auth to localStorage
  useEffect(() => {
    if (isAuthenticated && user) {
      localStorage.setItem('auth', JSON.stringify({
        isAuthenticated,
        user,
        role: selectedRole
      }));
    }
  }, [isAuthenticated, user, selectedRole]);

  const switchRole = (role) => {
    setUserRole(role);
    if (role === 'teacher') {
      fetchTeacherDashboard();
    } else {
      fetchStudentDashboard(currentStudentId);
    }
  };

  return (
    <LearningContext.Provider
      value={{
        // Auth
        isAuthenticated,
        authMode,
        selectedRole,
        user,
        handleLogin,
        handleLogout,
        selectRole,
        switchAuthMode,

        // Learning
        studentData,
        teacherData,
        loading,
        error,
        userRole,
        currentStudentId,
        fetchStudentDashboard,
        fetchTeacherDashboard,
        switchRole,
        apiBaseUrl,

        // Navigation
        currentPage,
        selectedCourse,
        selectedTopic,
        selectedConcept,
        navigateToCourses,
        navigateToRoadmap,
        navigateToStudy,
        navigateToConcept,
        navigateBack,
        setCurrentPage,
      }}
    >
      {children}
    </LearningContext.Provider>
  );
};

export const useLearning = () => {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
};
