import React, { useState, useEffect } from 'react';
import { BookOpen, ClipboardList, CheckCircle2, Clock, Volume2, Lightbulb, MessageCircle, ChevronRight, Maximize2, ChevronLeft } from 'lucide-react';
import TopicVideos from './TopicVideos';
import VideoPlayer from './VideoPlayer';

export default function StudyPage({ course, topic, onBack }) {
  const [activeTab, setActiveTab] = useState('lesson');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Extract topic code for video fetching
  const getTopicCode = () => {
    if (!topic) return null;
    const title = (topic.title || '').toLowerCase();
    // Map common topic names to topic codes
    if (title.includes('language model') || title.includes('llm')) return 'lm';
    if (title.includes('nlp') || title.includes('natural language')) return 'nlp';
    if (title.includes('data') || title.includes('analysis')) return 'da';
    return null;
  };

  const topicCode = getTopicCode();

  const lessons = [
    {
      id: 1,
      title: 'Understanding the Fundamentals',
      duration: '15 min',
      content: `
        This lesson covers the fundamental concepts you need to master.
        We'll break down complex ideas into simple, digestible pieces.
      `
    },
    {
      id: 2,
      title: 'Practical Examples & Use Cases',
      duration: '12 min',
      content: `
        Learn through real-world examples that show how these concepts apply to actual projects.
      `
    },
    {
      id: 3,
      title: 'Advanced Techniques',
      duration: '18 min',
      content: `
        Once you've mastered the basics, we'll explore advanced techniques and best practices.
      `
    }
  ];

  const assessment = {
    title: 'Topic Quiz',
    questions: [
      {
        id: 1,
        question: 'What is the primary purpose of this topic?',
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correct: 0
      },
      {
        id: 2,
        question: 'Which of the following is the correct implementation?',
        options: ['Implementation 1', 'Implementation 2', 'Implementation 3', 'Implementation 4'],
        correct: 1
      },
      {
        id: 3,
        question: 'What are the key considerations when using this concept?',
        options: ['Consider A', 'Consider B', 'Consider C', 'Consider D'],
        correct: 2
      }
    ]
  };

  const handleAnswerSelect = (questionId, optionIndex) => {
    if (!showResults) {
      setSelectedAnswers({
        ...selectedAnswers,
        [questionId]: optionIndex
      });
    }
  };

  const handleSubmitAssessment = () => {
    setShowResults(true);
  };

  const correctAnswers = assessment.questions.filter(
    (q, idx) => selectedAnswers[q.id] === q.correct
  ).length;
  const score = Math.round((correctAnswers / assessment.questions.length) * 100);
  const passed = score >= 70;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={onBack}
            className="mb-4 inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Roadmap
          </button>

          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl">{course.icon}</span>
                <div>
                  <p className="text-sm text-gray-600">{course.name}</p>
                  <h1 className="text-2xl font-bold text-gray-900">{topic?.title || 'Untitled Topic'}</h1>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600 mb-1">Your Progress</div>
              <div className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text">
                {topic?.progress || 0}%
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-gray-200">
          {[
            { id: 'lesson', label: 'Learn', icon: BookOpen },
            { id: 'assessment', label: 'Assessment', icon: ClipboardList },
            { id: 'resources', label: 'Resources', icon: Lightbulb }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 font-semibold transition border-b-2 ${
                  activeTab === tab.id
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div>
          {/* Lesson Tab */}
          {activeTab === 'lesson' && (
            <div className="space-y-6">
              {/* Main Lesson */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                {/* Lesson Video Placeholder */}
                <div className="bg-gradient-to-br from-purple-600 to-blue-600 h-96 flex items-center justify-center relative group overflow-hidden">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-black transition"></div>
                  <button className="relative p-4 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition">
                    <svg className="w-16 h-16 text-white fill-white" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                  <button className="absolute top-4 right-4 p-3 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition">
                    <Maximize2 className="w-5 h-5 text-white" />
                  </button>
                </div>

                {/* Lesson Content */}
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{lessons[0].title}</h2>
                  <div className="flex gap-4 mb-6 text-sm text-gray-600">
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {lessons[0].duration}
                    </span>
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      In Progress
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-6">{lessons[0].content}</p>

                  {/* Key Points */}
                  <div className="bg-purple-50 rounded-lg border border-purple-200 p-4 mb-6">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-yellow-500" />
                      Key Takeaways
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-3 text-sm text-gray-700">
                        <span className="pt-1">✓</span>
                        <span>Understand the core concepts and their applications</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-gray-700">
                        <span className="pt-1">✓</span>
                        <span>Learn best practices and common pitfalls</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-gray-700">
                        <span className="pt-1">✓</span>
                        <span>Practice with real-world examples</span>
                      </li>
                    </ul>
                  </div>

                  {/* Doubt Support */}
                  <button className="w-full py-3 px-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 font-semibold hover:bg-blue-100 transition flex items-center justify-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Ask a Question or Clarify a Doubt
                  </button>
                </div>
              </div>

              {/* Related Lessons */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Other Lessons in This Topic</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {lessons.slice(1).map(lesson => (
                    <button
                      key={lesson.id}
                      className="p-4 bg-white border border-gray-200 rounded-lg hover:border-purple-400 hover:shadow-md transition text-left group"
                    >
                      <h4 className="font-semibold text-gray-900 group-hover:text-purple-600 transition flex items-center justify-between">
                        {lesson.title}
                        <ChevronRight className="w-4 h-4" />
                      </h4>
                      <p className="text-sm text-gray-600 mt-2 flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {lesson.duration}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Assessment Tab */}
          {activeTab === 'assessment' && (
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              {!showResults ? (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{assessment.title}</h2>
                    <p className="text-gray-600">Answer all questions to complete this assessment</p>
                  </div>

                  {/* Progress */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Question {currentQuestion + 1} of {assessment.questions.length}</span>
                    <div className="flex gap-1">
                      {assessment.questions.map((_, idx) => (
                        <div
                          key={idx}
                          className={`h-2 w-2 rounded-full transition ${
                            idx < currentQuestion ? 'bg-green-500' :
                            idx === currentQuestion ? 'bg-purple-600' :
                            selectedAnswers[assessment.questions[idx].id] !== undefined ? 'bg-blue-500' :
                            'bg-gray-300'
                          }`}
                        ></div>
                      ))}
                    </div>
                  </div>

                  {/* Question Card */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {assessment.questions[currentQuestion].question}
                    </h3>

                    {/* Options */}
                    <div className="space-y-3">
                      {assessment.questions[currentQuestion].options.map((option, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleAnswerSelect(assessment.questions[currentQuestion].id, idx)}
                          className={`w-full p-4 rounded-lg border-2 transition text-left font-medium ${
                            selectedAnswers[assessment.questions[currentQuestion].id] === idx
                              ? 'border-purple-600 bg-purple-50 text-purple-900'
                              : 'border-gray-300 bg-white text-gray-900 hover:border-purple-300'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                              selectedAnswers[assessment.questions[currentQuestion].id] === idx
                                ? 'border-purple-600 bg-purple-600'
                                : 'border-gray-400'
                            }`}>
                              {selectedAnswers[assessment.questions[currentQuestion].id] === idx && (
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                            {option}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex gap-4 pt-6 border-t border-gray-200">
                    <button
                      onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                      disabled={currentQuestion === 0}
                      className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      Previous
                    </button>
                    {currentQuestion < assessment.questions.length - 1 ? (
                      <button
                        onClick={() => setCurrentQuestion(currentQuestion + 1)}
                        className="px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition ml-auto"
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        onClick={handleSubmitAssessment}
                        disabled={Object.keys(selectedAnswers).length < assessment.questions.length}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition ml-auto"
                      >
                        Submit Assessment
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-6">
                  {/* Score Display */}
                  <div className="inline-block">
                    <div className={`w-32 h-32 rounded-full flex items-center justify-center text-5xl font-bold ${
                      passed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {score}%
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {passed ? '🎉 Congratulations!' : 'Keep Learning!'}
                    </h3>
                    <p className="text-gray-600">
                      {passed
                        ? `You've passed this assessment! You got ${correctAnswers} out of ${assessment.questions.length} questions correct.`
                        : `You got ${correctAnswers} out of ${assessment.questions.length} questions correct. Review the material and try again!`}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <button
                      onClick={() => {
                        setShowResults(false);
                        setCurrentQuestion(0);
                        setSelectedAnswers({});
                      }}
                      className="px-6 py-3 border border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition"
                    >
                      Review Answers
                    </button>
                    <button
                      onClick={onBack}
                      className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition"
                    >
                      Back to Roadmap
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Resources Tab */}
          {activeTab === 'resources' && (
            <div className="space-y-8">
              {/* Uploaded Videos Section */}
              {topicCode && (
                <div className="bg-white rounded-xl border border-gray-200 p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">📹 Topic Videos</h3>
                  <TopicVideos
                    topic={topicCode}
                    onSelectVideo={(video) => {
                      setSelectedVideo(video);
                      setActiveTab('lesson');
                    }}
                  />
                </div>
              )}

              {/* Selected Video Player */}
              {selectedVideo && (
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900">{selectedVideo.title}</h3>
                      <button
                        onClick={() => setSelectedVideo(null)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        ✕
                      </button>
                    </div>
                    <VideoPlayer
                      videoUrl={selectedVideo.url}
                      duration={selectedVideo.duration_seconds}
                      videoTitle={selectedVideo.title}
                    />
                    {selectedVideo.description && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700">{selectedVideo.description}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Other Resources */}
              <div className="bg-white rounded-xl border border-gray-200 p-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">📚 Additional Resources</h3>
                <div className="space-y-3">
                  {[
                    { title: 'Official Documentation', type: 'link', icon: '📖' },
                    { title: 'Code Examples', type: 'code', icon: '💻' },
                    { title: 'Reference Guide', type: 'pdf', icon: '📄' }
                  ].map((resource, idx) => (
                    <button
                      key={idx}
                      className="w-full p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition text-left flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{resource.icon}</span>
                        <div>
                          <h4 className="font-semibold text-gray-900 group-hover:text-purple-600">{resource.title}</h4>
                          <p className="text-sm text-gray-600">{resource.type}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
