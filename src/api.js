import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// ==================== ORIGINAL ENDPOINTS ====================

export const getStudentDashboard = (studentId) => {
  return api.get(`/student/${studentId}`);
};

export const getTeacherDashboard = () => {
  return api.get('/teacher/dashboard');
};

// ==================== COURSES ====================

export const getCourses = () => {
  return api.get('/api/v1/courses/');
};

export const getCourse = (courseId) => {
  return api.get(`/api/v1/courses/${courseId}`);
};

export const getCourseRoadmap = (courseId, studentId = null) => {
  const params = studentId ? `?student_id=${studentId}` : '';
  return api.get(`/api/v1/courses/${courseId}/roadmap${params}`);
};

export const getCourseCategories = () => {
  return api.get('/api/v1/courses/categories');
};

// ==================== TOPICS ====================

export const getTopic = (topicId) => {
  return api.get(`/api/v1/topics/${topicId}`);
};

export const getTopicContent = (topicId) => {
  return api.get(`/api/v1/topics/${topicId}/content`);
};

export const getTopicProgress = (topicId, studentId) => {
  return api.get(`/api/v1/topics/${topicId}/progress?student_id=${studentId}`);
};

export const getTopicsForCourse = (courseId) => {
  return api.get(`/api/v1/topics/course/${courseId}`);
};

export const getTopics = () => {
  return api.get('/api/v1/topics');
};

// ==================== VIDEOS ====================

export const getVideo = (videoId) => {
  return api.get(`/api/v1/videos/${videoId}`);
};

export const getVideoByTitle = (title) => {
  return api.get(`/api/v1/videos/`, { params: { title } });
};

export const trackVideoWatch = (videoId, studentId, durationSeconds, completionPercentage) => {
  return api.post(`/api/v1/videos/${videoId}/track-watch`, {
    student_id: studentId,
    duration_seconds: durationSeconds,
    completion_percentage: completionPercentage
  });
};

export const getVideoConcepts = (videoId) => {
  return api.get(`/api/v1/videos/${videoId}/concepts`);
};

export const getLessonVideos = (lessonId) => {
  return api.get(`/api/v1/videos/lesson/${lessonId}`);
};

export const getVideosByTopic = (topic) => {
  return api.get(`/api/v1/videos/topic/${topic}`);
};

export const uploadVideo = (formData) => {
  // Use a direct axios call for FormData to avoid JSON defaults.
  return axios.post(`${API_BASE_URL}/api/v1/videos/upload`, formData);
};

// ==================== ASSESSMENTS ====================

export const getAssessment = (assessmentId) => {
  return api.get(`/api/v1/assessments/${assessmentId}`);
};

export const submitAssessment = (assessmentId, studentId, answers) => {
  return api.post(`/api/v1/assessments/${assessmentId}/submit`, {
    student_id: studentId,
    answers: answers
  });
};

export const getTopicAssessments = (topicId) => {
  return api.get(`/api/v1/assessments/topic/${topicId}`);
};

export const createAssessment = (payload) => {
  return api.post('/api/v1/assessments/create', payload);
};

export const getStudentAssessmentResults = (studentId) => {
  return api.get(`/api/v1/assessments/student/${studentId}/results`);
};

// ==================== RECOMMENDATIONS ====================

export const getRecommendation = (studentId) => {
  return api.get(`/student/${studentId}/recommendation`);
};

// ==================== ANALYTICS ====================

export const getStudentAnalytics = (studentId) => {
  return api.get(`/student/${studentId}/analytics`);
};

export const getKnowledgeState = (studentId) => {
  return api.get(`/student/${studentId}/knowledge-state`);
};

export default api;
