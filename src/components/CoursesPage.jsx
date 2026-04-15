import React, { useState } from 'react';
import { BookOpen, Users, Clock, TrendingUp, Search, Filter, Star, ArrowRight } from 'lucide-react';

export default function CoursesPage({ onSelectCourse, studentData }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  const courses = [
    // Web Development
    {
      id: 1,
      name: 'MERN Stack Development',
      category: 'web',
      icon: '🚀',
      progress: 45,
      students: 2340,
      duration: '12 weeks',
      level: 'Intermediate',
      topics: 12,
      rating: 4.8,
      description: 'Master MongoDB, Express, React, and Node.js to build full-stack web applications',
      color: 'from-blue-500 to-cyan-500',
      topics_list: ['JavaScript Basics', 'React Fundamentals', 'Node.js', 'MongoDB', 'REST APIs']
    },
    {
      id: 7,
      name: 'Vue.js & Nuxt',
      category: 'web',
      icon: '💚',
      progress: 12,
      students: 1240,
      duration: '10 weeks',
      level: 'Intermediate',
      topics: 10,
      rating: 4.7,
      description: 'Build modern web applications with Vue.js and Nuxt framework',
      color: 'from-green-500 to-teal-500',
      topics_list: ['Vue Basics', 'Components', 'Routing', 'State Management', 'Nuxt']
    },
    {
      id: 8,
      name: 'Angular Mastery',
      category: 'web',
      icon: '🔴',
      progress: 0,
      students: 890,
      duration: '14 weeks',
      level: 'Advanced',
      topics: 14,
      rating: 4.6,
      description: 'Enterprise-level web development with Angular framework',
      color: 'from-red-500 to-pink-500',
      topics_list: ['Angular Core', 'TypeScript', 'RxJS', 'Services', 'Testing']
    },

    // AI/ML - Comprehensive Modern AI Curriculum
    {
      id: 2,
      name: 'Machine Learning Fundamentals',
      category: 'ai',
      icon: '🤖',
      progress: 28,
      students: 1890,
      duration: '12 weeks',
      level: 'Intermediate',
      topics: 15,
      rating: 4.9,
      description: 'Master supervised learning, unsupervised learning, and key ML algorithms with real datasets',
      color: 'from-purple-500 to-pink-500',
      topics_list: ['Regression', 'Classification', 'Clustering', 'Feature Engineering', 'Model Evaluation', 'Scikit-learn']
    },
    {
      id: 9,
      name: 'Deep Learning & Neural Networks',
      category: 'ai',
      icon: '🧠',
      progress: 5,
      students: 1456,
      duration: '14 weeks',
      level: 'Advanced',
      topics: 16,
      rating: 4.8,
      description: 'Build and train deep neural networks, CNNs, RNNs, and modern architectures from scratch',
      color: 'from-indigo-500 to-purple-500',
      topics_list: ['Neural Networks', 'CNNs', 'RNNs', 'LSTM', 'Transformers', 'PyTorch/TensorFlow']
    },
    {
      id: 10,
      name: 'Natural Language Processing (NLP)',
      category: 'ai',
      icon: '💬',
      progress: 0,
      students: 1123,
      duration: '12 weeks',
      level: 'Advanced',
      topics: 14,
      rating: 4.9,
      description: 'Master text processing, sentiment analysis, and language models from NLTK to Transformers',
      color: 'from-blue-500 to-cyan-500',
      topics_list: ['Text Preprocessing', 'Tokenization', 'Word Embeddings', 'BERT', 'Transformers', 'Language Models']
    },
    {
      id: 19,
      name: 'Large Language Models (LLMs)',
      category: 'ai',
      icon: '📚',
      progress: 0,
      students: 2340,
      duration: '10 weeks',
      level: 'Advanced',
      topics: 12,
      rating: 4.8,
      description: 'Work with state-of-the-art LLMs like GPT, Claude, and learn how they work internally',
      color: 'from-orange-500 to-red-500',
      topics_list: ['GPT Architecture', 'Tokenization', 'Attention Mechanism', 'Fine-tuning', 'API Integration', 'LLaMA, Mistral']
    },
    {
      id: 20,
      name: 'Prompt Engineering & LLM Applications',
      category: 'ai',
      icon: '✨',
      progress: 0,
      students: 3210,
      duration: '8 weeks',
      level: 'Intermediate',
      topics: 11,
      rating: 4.9,
      description: 'Master prompt engineering, chain-of-thought, and build production LLM applications',
      color: 'from-yellow-500 to-orange-500',
      topics_list: ['Prompt Techniques', 'Chain-of-Thought', 'Few-Shot Learning', 'Prompt Optimization', 'LangChain', 'Agent Design']
    },
    {
      id: 21,
      name: 'Retrieval-Augmented Generation (RAG)',
      category: 'ai',
      icon: '🔍',
      progress: 0,
      students: 1567,
      duration: '10 weeks',
      level: 'Advanced',
      topics: 13,
      rating: 4.7,
      description: 'Build RAG systems for accurate LLM responses, semantic search, and knowledge integration',
      color: 'from-green-500 to-teal-500',
      topics_list: ['Vector Embeddings', 'Semantic Search', 'Vector Databases', 'Retrieval Methods', 'Reranking', 'LlamaIndex, LangChain']
    },
    {
      id: 22,
      name: 'Generative AI (GenAI) & Image Generation',
      category: 'ai',
      icon: '🎨',
      progress: 0,
      students: 1945,
      duration: '11 weeks',
      level: 'Advanced',
      topics: 14,
      rating: 4.8,
      description: 'Create images with Stable Diffusion, DALL-E, and build end-to-end GenAI applications',
      color: 'from-pink-500 to-rose-500',
      topics_list: ['Diffusion Models', 'Stable Diffusion', 'DALL-E', 'ControlNet', 'Image Editing', 'Fine-tuning Models']
    },
    {
      id: 23,
      name: 'Computer Vision & Image Processing',
      category: 'ai',
      icon: '👁️',
      progress: 12,
      students: 2156,
      duration: '12 weeks',
      level: 'Advanced',
      topics: 15,
      rating: 4.8,
      description: 'Master image classification, object detection, segmentation, and modern vision models',
      color: 'from-red-500 to-pink-500',
      topics_list: ['Image Processing', 'Object Detection', 'YOLO, R-CNN', 'Segmentation', 'Vision Transformers', 'OpenCV']
    },
    {
      id: 24,
      name: 'AI Model Deployment & MLOps',
      category: 'ai',
      icon: '⚙️',
      progress: 0,
      students: 1678,
      duration: '10 weeks',
      level: 'Advanced',
      topics: 12,
      rating: 4.7,
      description: 'Deploy ML/AI models to production, model monitoring, and build scalable AI systems',
      color: 'from-cyan-500 to-blue-500',
      topics_list: ['Model Serving', 'Docker', 'Kubernetes', 'Model Monitoring', 'CI/CD', 'TensorFlow Serving, Ray']
    },

    // Data Science
    {
      id: 3,
      name: 'Data Analytics',
      category: 'data',
      icon: '📊',
      progress: 62,
      students: 3120,
      duration: '10 weeks',
      level: 'Beginner',
      topics: 10,
      rating: 4.7,
      description: 'Learn to extract insights from data using Python, SQL, and advanced visualization',
      color: 'from-green-500 to-emerald-500',
      topics_list: ['SQL', 'Python', 'Pandas', 'Visualization', 'Statistics']
    },
    {
      id: 11,
      name: 'Advanced SQL & Databases',
      category: 'data',
      icon: '🗄️',
      progress: 33,
      students: 2456,
      duration: '8 weeks',
      level: 'Intermediate',
      topics: 11,
      rating: 4.8,
      description: 'Master SQL, database design, and query optimization',
      color: 'from-orange-500 to-amber-500',
      topics_list: ['Advanced SQL', 'Indexing', 'Database Design', 'Performance', 'Transactions']
    },
    {
      id: 12,
      name: 'Big Data & Spark',
      category: 'data',
      icon: '⚡',
      progress: 0,
      students: 987,
      duration: '12 weeks',
      level: 'Advanced',
      topics: 13,
      rating: 4.6,
      description: 'Process massive datasets with Apache Spark and distributed computing',
      color: 'from-yellow-500 to-orange-500',
      topics_list: ['Spark Basics', 'MapReduce', 'Hadoop', 'RDD', 'DataFrames']
    },

    // Cloud Computing
    {
      id: 4,
      name: 'Cloud Computing (AWS)',
      category: 'cloud',
      icon: '☁️',
      progress: 15,
      students: 1654,
      duration: '14 weeks',
      level: 'Intermediate',
      topics: 14,
      rating: 4.6,
      description: 'Master AWS services, architecture, and deployment strategies for scalable applications',
      color: 'from-orange-500 to-red-500',
      topics_list: ['EC2', 'S3', 'Lambda', 'RDS', 'VPC']
    },
    {
      id: 13,
      name: 'Microsoft Azure',
      category: 'cloud',
      icon: '🔷',
      progress: 20,
      students: 1234,
      duration: '12 weeks',
      level: 'Intermediate',
      topics: 12,
      rating: 4.7,
      description: 'Learn Azure cloud services and build scalable applications',
      color: 'from-blue-500 to-indigo-500',
      topics_list: ['Virtual Machines', 'App Service', 'SQL Database', 'Functions', 'Storage']
    },
    {
      id: 14,
      name: 'Kubernetes & DevOps',
      category: 'cloud',
      icon: '🐳',
      progress: 0,
      students: 1567,
      duration: '10 weeks',
      level: 'Advanced',
      topics: 11,
      rating: 4.8,
      description: 'Master containerization, orchestration, and DevOps practices',
      color: 'from-cyan-500 to-blue-500',
      topics_list: ['Docker', 'Kubernetes', 'CI/CD', 'Monitoring', 'Logging']
    },

    // Programming
    {
      id: 5,
      name: 'Python Programming',
      category: 'programming',
      icon: '🐍',
      progress: 85,
      students: 4200,
      duration: '8 weeks',
      level: 'Beginner',
      topics: 15,
      rating: 4.9,
      description: 'Start your coding journey with Python - the most beginner-friendly language',
      color: 'from-yellow-500 to-orange-500',
      topics_list: ['Variables', 'Functions', 'OOP', 'Libraries', 'Projects']
    },
    {
      id: 15,
      name: 'Java & Spring Boot',
      category: 'programming',
      icon: '☕',
      progress: 40,
      students: 2890,
      duration: '14 weeks',
      level: 'Intermediate',
      topics: 16,
      rating: 4.7,
      description: 'Build enterprise applications with Java and Spring Boot framework',
      color: 'from-red-500 to-orange-500',
      topics_list: ['Java Basics', 'OOP', 'Spring', 'Databases', 'REST APIs']
    },
    {
      id: 16,
      name: 'Go Programming',
      category: 'programming',
      icon: '🐹',
      progress: 10,
      students: 1456,
      duration: '8 weeks',
      level: 'Intermediate',
      topics: 10,
      rating: 4.8,
      description: 'Learn Go for building fast, concurrent, and scalable applications',
      color: 'from-cyan-500 to-blue-500',
      topics_list: ['Go Basics', 'Goroutines', 'Channels', 'Packages', 'Testing']
    },

    // Design
    {
      id: 6,
      name: 'UI/UX Design',
      category: 'design',
      icon: '🎨',
      progress: 0,
      students: 892,
      duration: '12 weeks',
      level: 'Beginner',
      topics: 11,
      rating: 4.8,
      description: 'Learn design principles, user research, and create beautiful digital experiences',
      color: 'from-pink-500 to-rose-500',
      topics_list: ['Design Thinking', 'Wireframing', 'Figma', 'Prototyping', 'User Research']
    },
    {
      id: 17,
      name: 'Graphic Design Fundamentals',
      category: 'design',
      icon: '🖼️',
      progress: 30,
      students: 1678,
      duration: '10 weeks',
      level: 'Beginner',
      topics: 12,
      rating: 4.9,
      description: 'Master graphic design principles with Photoshop and Illustrator',
      color: 'from-purple-500 to-pink-500',
      topics_list: ['Design Principles', 'Photoshop', 'Illustrator', 'Branding', 'Typography']
    },
    {
      id: 18,
      name: 'Web Design & Frontend',
      category: 'design',
      icon: '🌐',
      progress: 55,
      students: 2134,
      duration: '12 weeks',
      level: 'Intermediate',
      topics: 13,
      rating: 4.7,
      description: 'Design beautiful and responsive websites with modern tools',
      color: 'from-blue-500 to-purple-500',
      topics_list: ['Web Design', 'Figma', 'CSS', 'Responsiveness', 'Accessibility']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Courses', icon: BookOpen },
    { id: 'programming', name: 'Programming', icon: BookOpen },
    { id: 'web', name: 'Web Dev', icon: BookOpen },
    { id: 'data', name: 'Data', icon: TrendingUp },
    { id: 'ai', name: 'AI/ML', icon: TrendingUp },
    { id: 'cloud', name: 'Cloud', icon: BookOpen },
    { id: 'design', name: 'Design', icon: BookOpen }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Explore Courses</h1>
              <p className="text-gray-600 mt-1">Choose your learning path and start growing</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-lg transition ${viewMode === 'grid' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600'}`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4z"></path>
                  <path d="M3 10a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6z"></path>
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-lg transition ${viewMode === 'list' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600'}`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(cat => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition ${
                    selectedCategory === cat.id
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                      : 'bg-white border border-gray-300 text-gray-700 hover:border-purple-400'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-6">
          <p className="text-gray-600 text-sm">
            Showing <span className="font-semibold text-gray-900">{filteredCourses.length}</span> courses
          </p>
        </div>

        {/* Courses Grid */}
        <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {filteredCourses.map(course => (
            <CourseCard
              key={course.id}
              course={course}
              onSelect={onSelectCourse}
              viewMode={viewMode}
            />
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}

function CourseCard({ course, onSelect, viewMode }) {
  const isGridView = viewMode === 'grid';

  if (!isGridView) {
    return (
      <button
        onClick={() => onSelect(course)}
        className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition duration-300 flex w-full"
      >
        <div className={`w-24 h-24 bg-gradient-to-br ${course.color} flex items-center justify-center text-3xl flex-shrink-0`}>
          {course.icon}
        </div>
        <div className="flex-1 p-4 text-left">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-bold text-gray-900">{course.name}</h3>
              <p className="text-xs text-gray-500 mt-1">{course.level}</p>
            </div>
            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-semibold text-gray-900">{course.rating}</span>
            </div>
          </div>
          <div className="flex gap-4 text-xs text-gray-600">
            <span className="flex items-center gap-1"><Users className="w-3 h-3" />{course.students.toLocaleString()}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{course.duration}</span>
          </div>
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={() => onSelect(course)}
      className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-purple-400 transition duration-300 group cursor-pointer h-full flex flex-col"
    >
      {/* Course Header */}
      <div className={`bg-gradient-to-br ${course.color} h-32 flex items-center justify-center text-5xl relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition"></div>
        {course.icon}
      </div>

      {/* Course Content */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Title and Level */}
        <div className="mb-3">
          <h3 className="font-bold text-gray-900 text-lg group-hover:text-purple-600 transition">{course.name}</h3>
          <div className="inline-block mt-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              course.level === 'Beginner' ? 'bg-green-100 text-green-700' :
              course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              {course.level}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 flex-1">{course.description}</p>

        {/* Stats Bar */}
        <div className="bg-gray-50 rounded-lg p-3 mb-4 space-y-2">
          {/* Progress */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-600">Your Progress</span>
              <span className="text-xs font-bold text-purple-600">{course.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
          </div>

          {/* Meta Info */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1 text-gray-600">
              <Users className="w-3.5 h-3.5" />
              <span>{course.students.toLocaleString()} students</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <Clock className="w-3.5 h-3.5" />
              <span>{course.duration}</span>
            </div>
          </div>
        </div>

        {/* Rating and CTA */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-semibold text-gray-900">{course.rating}</span>
            <span className="text-xs text-gray-500">({course.topics} topics)</span>
          </div>
          <div className="p-2 rounded-lg bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition flex items-center justify-center">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </button>
  );
}
