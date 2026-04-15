import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, ClipboardList, Lightbulb, ChevronLeft, MessageCircle, CheckCircle2, Clock } from 'lucide-react';
import VideoPlayer from './VideoPlayer';
import ConceptOverview from './ConceptOverview';
import PracticalExamples from './PracticalExamples';
import AdvancedSection from './AdvancedSection';
import {
  getVideo,
  getAssessment,
  submitAssessment,
  trackVideoWatch
} from '../api';

// ==================== DUMMY DATA GENERATOR ====================
const generateDummyVideoData = (topicTitle = 'Learning Concept', courseId = 1) => {
  const videos = {
    'What is Python?': {
      url: 'https://www.youtube.com/watch?v=python_intro_v1',
      duration_seconds: 720,
      description: 'Complete introduction to Python programming language'
    },
    'Variables and Data Types': {
      url: 'https://www.youtube.com/watch?v=python_vars_v3',
      duration_seconds: 900,
      description: 'Understanding variables and data types in Python'
    },
    'What is Machine Learning?': {
      url: 'https://www.youtube.com/watch?v=ml_intro_full',
      duration_seconds: 1500,
      description: 'Complete introduction to Machine Learning concepts'
    },
    'Supervised Learning': {
      url: 'https://www.youtube.com/watch?v=ml_supervised_401',
      duration_seconds: 1440,
      description: 'Understanding supervised learning algorithms'
    },
    'Introduction to React': {
      url: 'https://www.youtube.com/watch?v=react_intro_basics',
      duration_seconds: 1800,
      description: 'Learn React fundamentals and component basics'
    },
    'NumPy and Pandas': {
      url: 'https://www.youtube.com/watch?v=numpy_intro_complete',
      duration_seconds: 1400,
      description: 'Data manipulation with NumPy and Pandas libraries'
    }
  };

  return {
    video: videos[topicTitle] || {
      url: `https://www.youtube.com/watch?v=course_${courseId}_topic_${topicTitle.replace(/\s+/g, '_').toLowerCase()}`,
      duration_seconds: 1200,
      description: topicTitle
    },
    subtitles: [
      { language: 'en', content: 'English subtitles available' },
      { language: 'hi', content: 'Hindi subtitles available' }
    ]
  };
};

const generateDummyExamples = (topicTitle = '', courseType = 'python') => {
  const examplesByTopic = {
    python: [
      {
        title: 'Creating Variables',
        description: 'Learn how to create and assign variables in Python',
        context: 'Beginner level',
        language: 'python',
        code: `name = "Alice"
age = 25
height = 5.7
is_student = True

print(f"{name} is {age} years old")`,
        explanation: 'Variables store data that can be used and modified throughout your program.',
        output: 'Alice is 25 years old',
        commonMistakes: [
          'Using spaces in variable names (use underscore instead)',
          'Starting variable names with numbers',
          'Using Python keywords as variable names'
        ]
      },
      {
        title: 'Working with Strings',
        description: 'String manipulation and operations',
        context: 'Beginner level',
        language: 'python',
        code: `text = "Hello World"
print(text.lower())      # hello world
print(text.replace("World", "Python"))  # Hello Python
print(text.split())      # ['Hello', 'World']`,
        explanation: 'Strings are sequences of characters with many useful methods for manipulation.',
        output: 'hello world\nHello Python\n["Hello", "World"]'
      }
    ],
    'machine-learning': [
      {
        title: 'House Price Prediction',
        description: 'Real-world ML use case: predicting house prices',
        context: 'Intermediate level',
        language: 'python',
        code: `from sklearn.linear_model import LinearRegression
import numpy as np

# Training data: (size, bedrooms) -> price
X = np.array([[1000, 3], [1500, 4], [2000, 5]])
y = np.array([200000, 300000, 400000])

model = LinearRegression()
model.fit(X, y)

# Predict price for 1800 sqft, 4 bedrooms
prediction = model.predict([[1800, 4]])
print(f"Predicted price: \${prediction[0]:,.2f}")`,
        explanation: 'Machine Learning models learn patterns from training data to make predictions on new data.',
        output: 'Predicted price: $350,000.00'
      },
      {
        title: 'Spam Email Detection',
        description: 'Classification problem: detecting spam emails',
        context: 'Intermediate level',
        language: 'python',
        code: `from sklearn.naive_bayes import MultinomialNB
from sklearn.feature_extraction.text import TfidfVectorizer

emails = ["Get rich quick!", "Meeting at 3pm", "Limited offer!"]
labels = [1, 0, 1]  # 1=spam, 0=not spam

vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(emails)

model = MultinomialNB()
model.fit(X, labels)

# Check if new email is spam
new_email = ["Congratulations, you won!"]
result = model.predict(vectorizer.transform(new_email))
print("Spam" if result[0] == 1 else "Not Spam")`,
        explanation: 'Classification algorithms learn to categorize data into different classes.',
        output: 'Spam'
      }
    ],
    'web-development': [
      {
        title: 'React Component with State',
        description: 'Building interactive React components',
        context: 'Intermediate level',
        language: 'javascript',
        code: `import React, { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`,
        explanation: 'React components use hooks like useState to manage interactive state changes.',
        output: 'Interactive counter component with increment button'
      },
      {
        title: 'API Data Fetching',
        description: 'Fetching data from APIs in React',
        context: 'Intermediate level',
        language: 'javascript',
        code: `import React, { useState, useEffect } from 'react';

export default function DataFetcher() {
  const [data, setData] = useState(null);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

  useEffect(() => {
    fetch(\`\${apiBaseUrl}/api/v1/data\`)
      .then(res => res.json())
      .then(data => setData(data));
  }, [apiBaseUrl]);

  return <div>{data?.message}</div>;
}`,
        explanation: 'useEffect hook allows fetching data when component mounts.',
        output: 'Displays fetched data from API'
      }
    ],
    'data-science': [
      {
        title: 'Data Analysis with Pandas',
        description: 'Working with datasets using Pandas',
        context: 'Intermediate level',
        language: 'python',
        code: `import pandas as pd

# Load data
df = pd.read_csv('data.csv')

# Basic statistics
print(df.describe())
print(df['salary'].mean())

# Filter data
high_earners = df[df['salary'] > 100000]
print(high_earners.shape)`,
        explanation: 'Pandas provides powerful tools for data manipulation and analysis.',
        output: 'Statistical summary and filtered results'
      }
    ]
  };

  const topicKey = courseType.toLowerCase();
  const examples = examplesByTopic[topicKey] || examplesByTopic.python;
  return examples;
};

const generateDummyRelatedVideos = (topicTitle = '', courseName = 'Python', courseId = 1) => {
  const relatedVideos = {
    'Python': [
      {
        id: 101,
        title: 'Data Types Deep Dive',
        duration: 1200,
        difficulty: 'intermediate',
        description: 'Master Python data types and their operations',
        thumbnail: null,
        instructor: 'Tech Academy',
        watchCount: '12.5K'
      },
      {
        id: 102,
        title: 'Functions and Scope',
        duration: 1500,
        difficulty: 'intermediate',
        description: 'Understanding functions, parameters, and scope in Python',
        thumbnail: null,
        instructor: 'Tech Academy',
        watchCount: '8.3K'
      },
      {
        id: 103,
        title: 'Object-Oriented Programming',
        duration: 1800,
        difficulty: 'advanced',
        description: 'Classes, inheritance, and OOP principles',
        thumbnail: null,
        instructor: 'Tech Academy',
        watchCount: '6.2K'
      }
    ],
    'Machine Learning': [
      {
        id: 201,
        title: 'Feature Engineering Techniques',
        duration: 1400,
        difficulty: 'intermediate',
        description: 'Creating and selecting the best features for your models',
        thumbnail: null,
        instructor: 'ML Experts',
        watchCount: '9.8K'
      },
      {
        id: 202,
        title: 'Model Evaluation Metrics',
        duration: 1600,
        difficulty: 'intermediate',
        description: 'Understanding accuracy, precision, recall, and F1-score',
        thumbnail: null,
        instructor: 'ML Experts',
        watchCount: '7.4K'
      },
      {
        id: 203,
        title: 'Hyperparameter Tuning',
        duration: 1800,
        difficulty: 'advanced',
        description: 'Optimizing model performance through grid search and random search',
        thumbnail: null,
        instructor: 'ML Experts',
        watchCount: '5.1K'
      }
    ],
    'MERN': [
      {
        id: 301,
        title: 'React Hooks Advanced',
        duration: 1500,
        difficulty: 'intermediate',
        description: 'Deep dive into React hooks like useReducer, useContext',
        thumbnail: null,
        instructor: 'Web Masters',
        watchCount: '11.2K'
      },
      {
        id: 302,
        title: 'MongoDB Aggregation Pipeline',
        duration: 1700,
        difficulty: 'intermediate',
        description: 'Complex data queries with MongoDB aggregation',
        thumbnail: null,
        instructor: 'Web Masters',
        watchCount: '6.9K'
      },
      {
        id: 303,
        title: 'RESTful API Design Best Practices',
        duration: 1400,
        difficulty: 'intermediate',
        description: 'Building scalable and maintainable APIs',
        thumbnail: null,
        instructor: 'Web Masters',
        watchCount: '8.7K'
      }
    ],
    'Data Science': [
      {
        id: 401,
        title: 'Data Visualization with Matplotlib',
        duration: 1300,
        difficulty: 'beginner',
        description: 'Creating informative plots and charts',
        thumbnail: null,
        instructor: 'Data Academy',
        watchCount: '14.2K'
      },
      {
        id: 402,
        title: 'Statistical Analysis Fundamentals',
        duration: 1600,
        difficulty: 'intermediate',
        description: 'Hypothesis testing and statistical inference',
        thumbnail: null,
        instructor: 'Data Academy',
        watchCount: '7.5K'
      },
      {
        id: 403,
        title: 'Time Series Analysis',
        duration: 1800,
        difficulty: 'advanced',
        description: 'Forecasting and trends in time-series data',
        thumbnail: null,
        instructor: 'Data Academy',
        watchCount: '4.3K'
      }
    ]
  };

  const courseKey = courseName.split(' ')[0]; // 'Python', 'Machine', 'MERN', 'Data'
  return relatedVideos[courseKey] || relatedVideos['Python'];
};

// ==================== COMPONENT ====================
export default function ConceptPage({
  course = {},
  concept = {},
  topic = {},
  studentId = 1,
  onBack = () => {}
}) {
  const [activeTab, setActiveTab] = useState('learn');
  const [videoData, setVideoData] = useState(null);
  const [assessmentData, setAssessmentData] = useState(null);
  const [practicalExamples, setPracticalExamples] = useState([]);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const lastTrackedSecondRef = useRef(-1);

  // Load all data on mount or when topic changes
  useEffect(() => {
    loadAllData();
  }, [
    topic?.id,
    topic?.videoId,
    topic?.assessmentId,
    topic?.title,
    concept?.name,
    concept?.description,
    course?.id,
    course?.name
  ]);

  const loadAllData = async () => {
    try {
      setIsLoading(true);

      // Load video data
      let video = null;
      if (topic.videoId) {
        try {
          const videoResponse = await getVideo(topic.videoId);
          video = videoResponse.data;
        } catch (err) {
          console.log('Using fallback video data');
        }
      }
      setVideoData(video || generateDummyVideoData(topic.title || concept.name, course.id));

      // Load assessment data
      if (topic.assessmentId) {
        try {
          const assessmentResponse = await getAssessment(topic.assessmentId);
          setAssessmentData(assessmentResponse.data);
        } catch (err) {
          console.log('Using fallback assessment data');
        }
      }

      // Load or generate practical examples
      setPracticalExamples(
        generateDummyExamples(
          topic.title || concept.name,
          course.name ? course.name.split(' ')[0].toLowerCase() : 'python'
        )
      );

      // Load or generate related videos (from same course)
      setRelatedVideos(
        generateDummyRelatedVideos(
          topic.title || concept.name,
          course.name || 'Python',
          course.id
        )
      );

      setError(null);
    } catch (err) {
      console.error('Error loading data:', err);
      setError('Failed to load some content. Using fallback data.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVideoProgress = async ({ currentTime, progress }) => {
    const currentSecond = Math.floor(currentTime);
    const shouldTrack =
      currentSecond > 0 &&
      currentSecond % 10 === 0 &&
      currentSecond !== lastTrackedSecondRef.current;

    // Track video watch once every 10 seconds.
    if (shouldTrack) {
      lastTrackedSecondRef.current = currentSecond;
      try {
        const trackingVideoId = topic.videoId || videoData?.video?.id;
        if (trackingVideoId) {
          await trackVideoWatch(
            trackingVideoId,
            studentId,
            currentSecond,
            Math.floor(progress)
          );
        }
      } catch (err) {
        console.error('Error tracking video:', err);
      }
    }
  };

  const handleAnswerSelect = (questionId, optionIndex) => {
    if (!showResults) {
      setSelectedAnswers({
        ...selectedAnswers,
        [questionId]: optionIndex
      });
    }
  };

  const handleSubmitAssessment = async () => {
    try {
      if (topic.assessmentId) {
        await submitAssessment(topic.assessmentId, studentId, selectedAnswers);
      }
      setShowResults(true);
    } catch (err) {
      console.error('Error submitting assessment:', err);
      setShowResults(true); // Show results anyway
    }
  };

  const assessment = assessmentData?.assessment || {};
  const questions = assessmentData?.questions || [];
  const correctAnswers = questions.filter(
    (q) => selectedAnswers[q.id] === q.correct
  ).length;
  const score = questions.length > 0 ? Math.round((correctAnswers / questions.length) * 100) : 0;
  const passed = score >= 70;

  // Create concept object with full data
  const mockConcept = {
    title: concept.name || topic.title || 'Learning Concept',
    description: concept.description || `
      This comprehensive lesson covers the essential concepts and techniques you need to master.
      Through clear explanations and practical examples, we'll help you build a strong understanding
      of this topic and how to apply it in real-world scenarios. This topic is fundamental to your learning journey and will serve as a foundation for advanced concepts.
    `,
    keyTakeaways: [
      'Understand the core concepts and their practical applications',
      'Learn best practices and common pitfalls to avoid',
      'Practice with real-world examples and use cases',
      'Apply your knowledge to solve real problems'
    ],
    formulas: concept.formulas || []
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={onBack}
            className="mb-4 inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium transition"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Roadmap
          </button>

          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl">{course.icon || '📚'}</span>
                <div>
                  <p className="text-sm text-gray-600">{course.name || 'Course'}</p>
                  <h1 className="text-2xl font-bold text-gray-900">{mockConcept.title}</h1>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600 mb-1">Your Progress</div>
              <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text">
                {topic.progress || 0}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-gray-200 overflow-x-auto">
          {[
            { id: 'learn', label: 'Learn', icon: BookOpen },
            { id: 'assessment', label: 'Assessment', icon: ClipboardList },
            { id: 'resources', label: 'Resources', icon: Lightbulb }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 font-semibold transition border-b-2 whitespace-nowrap ${
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

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {/* Learn Tab */}
        {activeTab === 'learn' && (
          <div className="space-y-8">
            {/* Main Video */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <VideoPlayer
                videoUrl={videoData?.video?.url || 'https://www.youtube.com/watch?v=python_intro_v1'}
                duration={videoData?.video?.duration_seconds || 1200}
                subtitles={
                  videoData?.subtitles
                    ? Object.fromEntries(videoData.subtitles.map(s => [s.language, s.content]))
                    : { en: 'English subtitles available', hi: 'Hindi subtitles available' }
                }
                onProgress={handleVideoProgress}
                videoTitle={mockConcept.title}
              />

              {/* Video Metadata */}
              <div className="p-6 border-t border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{mockConcept.title}</h2>
                    <div className="flex gap-6 text-sm text-gray-600">
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {videoData?.video?.duration_seconds
                          ? `${Math.floor(videoData.video.duration_seconds / 60)} minutes`
                          : '20 minutes'}
                      </span>
                      <span className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        In Progress
                      </span>
                    </div>
                    {videoData?.video?.description && (
                      <p className="text-gray-700 mt-3">{videoData.video.description}</p>
                    )}
                  </div>

                  {/* Continue with YouTube Button */}
                  <button
                    onClick={() => {
                      const youtubeUrl = videoData?.video?.url || 'https://www.youtube.com/watch?v=python_intro_v1';
                      window.open(youtubeUrl, '_blank');
                    }}
                    className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    Continue with YouTube
                  </button>
                </div>
              </div>
            </div>

            {/* Concept Overview */}
            <ConceptOverview concept={mockConcept} isLoading={isLoading} />

            {/* Practical Examples - ALWAYS POPULATED */}
            {practicalExamples && practicalExamples.length > 0 && (
              <PracticalExamples examples={practicalExamples} isLoading={isLoading} />
            )}

            {/* Advanced Section - ALWAYS POPULATED with related videos */}
            {relatedVideos && relatedVideos.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-8">
                <AdvancedSection
                  relatedVideos={relatedVideos}
                  onVideoSelect={(video) => console.log('Selected video:', video)}
                  isLoading={isLoading}
                />
              </div>
            )}

            {/* Doubt Support */}
            <button className="w-full py-4 px-6 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 font-semibold hover:bg-blue-100 transition flex items-center justify-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Ask a Question or Clarify a Doubt
            </button>
          </div>
        )}

        {/* Assessment Tab */}
        {activeTab === 'assessment' && (
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            {!showResults ? (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {assessment.title || 'Topic Assessment'}
                  </h2>
                  <p className="text-gray-600">Answer all questions to complete this assessment</p>
                </div>

                {questions.length > 0 ? (
                  <>
                    {/* Progress */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Question {currentQuestion + 1} of {questions.length}
                      </span>
                      <div className="flex gap-1">
                        {questions.map((_, idx) => (
                          <div
                            key={idx}
                            className={`h-2 w-2 rounded-full transition ${
                              idx < currentQuestion
                                ? 'bg-green-500'
                                : idx === currentQuestion
                                ? 'bg-purple-600'
                                : selectedAnswers[questions[idx].id] !== undefined
                                ? 'bg-blue-500'
                                : 'bg-gray-300'
                            }`}
                          ></div>
                        ))}
                      </div>
                    </div>

                    {/* Question Card */}
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {questions[currentQuestion]?.question_text}
                      </h3>

                      {/* Options */}
                      <div className="space-y-3">
                        {questions[currentQuestion]?.options?.A &&
                          Object.entries(questions[currentQuestion].options)
                            .filter(([key]) => ['A', 'B', 'C', 'D'].includes(key))
                            .map(([key, option]) => (
                              <button
                                key={key}
                                onClick={() =>
                                  handleAnswerSelect(
                                    questions[currentQuestion].id,
                                    key
                                  )
                                }
                                className={`w-full p-4 rounded-lg border-2 transition text-left font-medium ${
                                  selectedAnswers[questions[currentQuestion].id] === key
                                    ? 'border-purple-600 bg-purple-50 text-purple-900'
                                    : 'border-gray-300 bg-white text-gray-900 hover:border-purple-300'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <div
                                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                      selectedAnswers[questions[currentQuestion].id] ===
                                      key
                                        ? 'border-purple-600 bg-purple-600'
                                        : 'border-gray-400'
                                    }`}
                                  >
                                    {selectedAnswers[questions[currentQuestion].id] ===
                                      key && (
                                      <svg
                                        className="w-3 h-3 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={3}
                                          d="M5 13l4 4L19 7"
                                        />
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
                      {currentQuestion < questions.length - 1 ? (
                        <button
                          onClick={() => setCurrentQuestion(currentQuestion + 1)}
                          className="px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition ml-auto"
                        >
                          Next
                        </button>
                      ) : (
                        <button
                          onClick={handleSubmitAssessment}
                          disabled={Object.keys(selectedAnswers).length < questions.length}
                          className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition ml-auto"
                        >
                          Submit Assessment
                        </button>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12 text-gray-600">
                    <p>No assessment available for this topic yet.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center space-y-6">
                {/* Score Display */}
                <div className="inline-block">
                  <div
                    className={`w-32 h-32 rounded-full flex items-center justify-center text-5xl font-bold ${
                      passed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {score}%
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {passed ? '🎉 Congratulations!' : 'Keep Learning!'}
                  </h3>
                  <p className="text-gray-600">
                    {passed
                      ? `You've passed this assessment! You got ${correctAnswers} out of ${questions.length} questions correct.`
                      : `You got ${correctAnswers} out of ${questions.length} questions correct. Review the material and try again!`}
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
          <div className="space-y-4">
            {[
              { title: 'Official Documentation', type: 'link', icon: '📖' },
              { title: 'Video Tutorials', type: 'video', icon: '🎥' },
              { title: 'Code Examples & GitHub', type: 'code', icon: '💻' },
              { title: 'Reference Guide', type: 'pdf', icon: '📄' }
            ].map((resource, idx) => (
              <button
                key={idx}
                className="w-full p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition text-left flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{resource.icon}</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-purple-600">
                      {resource.title}
                    </h4>
                    <p className="text-sm text-gray-600">{resource.type}</p>
                  </div>
                </div>
                <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition transform group-hover:rotate-180" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
