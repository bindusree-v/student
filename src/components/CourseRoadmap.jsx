import React, { useState } from 'react';
import { CheckCircle2, Circle, Lock, Zap, ChevronRight, BookMarked, Award, MessageCircle } from 'lucide-react';

export default function CourseRoadmap({ course, onStartTopic, onBack }) {
  const [expandedTopic, setExpandedTopic] = useState(null);

  // Generate dynamic roadmap based on course
  const generateRoadmap = () => {
    const roadmaps = {
      1: [ // MERN Stack
        { id: 1, title: 'JavaScript Fundamentals', difficulty: 'Beginner', duration: '3 days', subtopics: ['Variables & Types', 'Functions', 'ES6+ Features'], status: 'completed', progress: 100 },
        { id: 2, title: 'React Basics', difficulty: 'Beginner', duration: '5 days', subtopics: ['JSX', 'Components', 'Props & State'], status: 'in_progress', progress: 65 },
        { id: 3, title: 'React Advanced', difficulty: 'Intermediate', duration: '4 days', subtopics: ['Hooks', 'Context API', 'Routing'], status: 'upcoming', progress: 0 },
        { id: 4, title: 'Node.js Basics', difficulty: 'Intermediate', duration: '4 days', subtopics: ['Express', 'Middleware', 'RESTful APIs'], status: 'upcoming', progress: 0 },
        { id: 5, title: 'Database Design', difficulty: 'Intermediate', duration: '3 days', subtopics: ['MongoDB', 'Schema Design', 'Queries'], status: 'upcoming', progress: 0 },
        { id: 6, title: 'Full Stack Project', difficulty: 'Advanced', duration: '7 days', subtopics: ['Integration', 'Testing', 'Deployment'], status: 'locked', progress: 0 }
      ],
      2: [ // AI
        { id: 1, title: 'Python Fundamentals', difficulty: 'Beginner', duration: '4 days', subtopics: ['Syntax', 'Data Structures', 'Functions'], status: 'completed', progress: 100 },
        { id: 2, title: 'Machine Learning Basics', difficulty: 'Intermediate', duration: '6 days', subtopics: ['Supervised Learning', 'Algorithms', 'Model Training'], status: 'in_progress', progress: 45 },
        { id: 3, title: 'Deep Learning', difficulty: 'Advanced', duration: '8 days', subtopics: ['Neural Networks', 'CNNs', 'RNNs'], status: 'upcoming', progress: 0 },
        { id: 4, title: 'Natural Language Processing', difficulty: 'Advanced', duration: '7 days', subtopics: ['Text Processing', 'Transformers', 'NLP Models'], status: 'locked', progress: 0 },
        { id: 5, title: 'Computer Vision', difficulty: 'Advanced', duration: '7 days', subtopics: ['Image Processing', 'Object Detection', 'Image Classification'], status: 'locked', progress: 0 }
      ],
      3: [ // Data Analytics
        { id: 1, title: 'SQL Essentials', difficulty: 'Beginner', duration: '3 days', subtopics: ['SELECT', 'JOINs', 'Aggregations'], status: 'completed', progress: 100 },
        { id: 2, title: 'Python for Data', difficulty: 'Beginner', duration: '4 days', subtopics: ['Pandas', 'NumPy', 'Data Manipulation'], status: 'in_progress', progress: 72 },
        { id: 3, title: 'Data Visualization', difficulty: 'Intermediate', duration: '3 days', subtopics: ['Matplotlib', 'Seaborn', 'Tableau'], status: 'upcoming', progress: 0 },
        { id: 4, title: 'Statistical Analysis', difficulty: 'Intermediate', duration: '4 days', subtopics: ['Descriptive Stats', 'Hypothesis Testing', 'Distributions'], status: 'upcoming', progress: 0 },
        { id: 5, title: 'Advanced Analytics Project', difficulty: 'Advanced', duration: '5 days', subtopics: ['Dashboard Creation', 'Insights', 'Business Intelligence'], status: 'locked', progress: 0 }
      ]
    };

    return roadmaps[course.id] || roadmaps[1];
  };

  const roadmap = generateRoadmap();
  const completedCount = roadmap.filter(t => t.status === 'completed').length;
  const totalCount = roadmap.length;
  const overallProgress = (completedCount / totalCount) * 100;

  const getStatusColor = (status) => {
    const colors = {
      completed: 'bg-green-100 text-green-700 border-green-300',
      in_progress: 'bg-blue-100 text-blue-700 border-blue-300',
      upcoming: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      locked: 'bg-gray-100 text-gray-700 border-gray-300'
    };
    return colors[status] || colors.upcoming;
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'Beginner': 'from-green-500 to-emerald-500',
      'Intermediate': 'from-yellow-500 to-orange-500',
      'Advanced': 'from-red-500 to-pink-500'
    };
    return colors[difficulty] || colors['Beginner'];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={onBack}
            className="mb-4 inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            Back to Courses
          </button>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <span className="text-4xl">{course.icon}</span>
                {course.name}
              </h1>
              <p className="text-gray-600 mt-2">{course.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overall Progress */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Your Learning Journey</h2>
            <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text">
              {Math.round(overallProgress)}%
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-600">{completedCount}</div>
              <div className="text-sm text-gray-600">Topics Completed</div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">{roadmap.filter(t => t.status === 'in_progress').length}</div>
              <div className="text-sm text-gray-600">In Progress</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="text-2xl font-bold text-purple-600">{Math.ceil((totalCount - completedCount) / completedCount || 1)}</div>
              <div className="text-sm text-gray-600">Topics Remaining</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-purple-600 to-blue-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            ></div>
          </div>
        </div>

        {/* Roadmap */}
        <div className="space-y-4">
          {roadmap.map((topic, index) => (
            <RoadmapCard
              key={topic.id}
              topic={topic}
              index={index}
              isLast={index === roadmap.length - 1}
              onSelect={() => onStartTopic(topic)}
              isExpanded={expandedTopic === topic.id}
              onExpand={() => setExpandedTopic(expandedTopic === topic.id ? null : topic.id)}
              getStatusColor={getStatusColor}
              getDifficultyColor={getDifficultyColor}
            />
          ))}
        </div>

        {/* Tips Section */}
        <div className="mt-12 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200 p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Learning Tips</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Focus on one topic at a time for better retention</li>
                <li>✓ Complete the exercises to reinforce your learning</li>
                <li>✓ Review previous topics if you struggle with new concepts</li>
                <li>✓ Reach out to instructors if you need additional support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RoadmapCard({ topic, index, isLast, onSelect, isExpanded, onExpand, getStatusColor, getDifficultyColor }) {
  const statusIcons = {
    completed: <CheckCircle2 className="w-6 h-6 text-green-600" />,
    in_progress: <Circle className="w-6 h-6 text-blue-600 fill-blue-200" />,
    upcoming: <Circle className="w-6 h-6 text-yellow-600" />,
    locked: <Lock className="w-6 h-6 text-gray-600" />
  };

  const isDisabled = topic.status === 'locked' || (index > 0 && topic.status === 'upcoming');

  return (
    <div className="relative">
      {/* Connector Line */}
      {!isLast && (
        <div className={`absolute left-3 top-16 w-0.5 h-12 ${
          topic.status === 'completed' ? 'bg-green-400' : 'bg-gray-300'
        }`}></div>
      )}

      {/* Card */}
      <div className={`relative bg-white rounded-xl border transition-all ${
        isDisabled
          ? 'border-gray-200 opacity-60 cursor-not-allowed'
          : 'border-gray-200 hover:border-purple-400 hover:shadow-lg cursor-pointer'
      }`}>
        <div className="p-5">
          <div className="flex items-start gap-4">
            {/* Status Icon */}
            <div className="pt-1">{statusIcons[topic.status]}</div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{topic.title}</h3>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r ${getDifficultyColor(topic.difficulty)} text-white`}>
                      {topic.difficulty}
                    </span>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getStatusColor(topic.status)}`}>
                      {topic.status === 'in_progress' ? '↻ In Progress' :
                       topic.status === 'completed' ? '✓ Completed' :
                       topic.status === 'upcoming' ? 'Upcoming' : 'Locked'}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-semibold text-gray-500 whitespace-nowrap">📅 {topic.duration}</span>
              </div>

              {/* Progress Bar */}
              {topic.progress > 0 && (
                <div className="mb-3">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-gray-600">Progress</span>
                    <span className="text-xs font-semibold text-purple-600">{topic.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                      style={{ width: `${topic.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Expand Button */}
              <button
                onClick={onExpand}
                className="text-xs text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1 mt-2"
              >
                {isExpanded ? '▼' : '►'} {isExpanded ? 'Hide' : 'Show'} subtopics
              </button>

              {/* Subtopics */}
              {isExpanded && (
                <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                  {topic.subtopics.map((subtopic, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-700 ml-2">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                      {subtopic}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Action Button */}
            {!isDisabled && (
              <button
                onClick={onSelect}
                className={`px-4 py-2 rounded-lg font-semibold transition whitespace-nowrap ${
                  topic.status === 'completed'
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}
              >
                {topic.status === 'completed' ? '✓ Review' :
                 topic.status === 'in_progress' ? 'Continue' : 'Start'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
