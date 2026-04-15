import React, { useState } from 'react';
import { Zap, BookOpen, BarChart3, Users, ArrowRight, CheckCircle } from 'lucide-react';

const LandingPage = ({ onSelectRole }) => {
  const [hoveredRole, setHoveredRole] = useState(null);

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "AI-Powered Learning",
      description: "Personalized learning paths adapted to your pace and style"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Real-time Progress",
      description: "Track mastery levels and get instant recommendations"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Adaptive Content",
      description: "Difficulty adjusts automatically as you learn"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Teacher Support",
      description: "Instructors monitor progress and guide your journey"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="px-6 py-8 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              LearnFlow
            </span>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Your Personal
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Learning Journey
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Adaptive learning paths that evolve with you. Master any skill at your own pace with AI-powered guidance and real-time feedback.
            </p>
          </div>

          {/* Role Selection Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
            {/* Student Card */}
            <div
              onMouseEnter={() => setHoveredRole('student')}
              onMouseLeave={() => setHoveredRole(null)}
              onClick={() => onSelectRole('student')}
              className={`group cursor-pointer relative overflow-hidden rounded-2xl p-8 transition-all duration-300 ${
                hoveredRole === 'student'
                  ? 'bg-gradient-to-br from-purple-600 to-blue-600 shadow-2xl scale-105'
                  : 'bg-white/10 hover:bg-white/20 backdrop-blur-lg border border-white/20'
              }`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>

              <div className="relative z-10">
                <div className="text-5xl mb-4">📚</div>
                <h2 className="text-3xl font-bold mb-4">Student</h2>
                <p className="text-gray-200 mb-6">
                  Start your personalized learning journey with AI-powered recommendations and adaptive content.
                </p>

                <div className="space-y-2 mb-8">
                  <div className="flex items-center gap-3 text-sm">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Personalized learning paths</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Real-time difficulty adjustment</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Progress tracking & insights</span>
                  </div>
                </div>

                <button className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                  hoveredRole === 'student'
                    ? 'bg-white text-purple-600 hover:bg-gray-100'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}>
                  Continue as Student
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Teacher Card */}
            <div
              onMouseEnter={() => setHoveredRole('teacher')}
              onMouseLeave={() => setHoveredRole(null)}
              onClick={() => onSelectRole('teacher')}
              className={`group cursor-pointer relative overflow-hidden rounded-2xl p-8 transition-all duration-300 ${
                hoveredRole === 'teacher'
                  ? 'bg-gradient-to-br from-orange-600 to-red-600 shadow-2xl scale-105'
                  : 'bg-white/10 hover:bg-white/20 backdrop-blur-lg border border-white/20'
              }`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>

              <div className="relative z-10">
                <div className="text-5xl mb-4">👨‍🏫</div>
                <h2 className="text-3xl font-bold mb-4">Teacher</h2>
                <p className="text-gray-200 mb-6">
                  Monitor student progress, analyze cohort performance, and guide learning journeys.
                </p>

                <div className="space-y-2 mb-8">
                  <div className="flex items-center gap-3 text-sm">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Student performance analytics</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Cohort insights & patterns</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Override recommendations</span>
                  </div>
                </div>

                <button className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                  hoveredRole === 'teacher'
                    ? 'bg-white text-orange-600 hover:bg-gray-100'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}>
                  Continue as Teacher
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-24 pt-16 border-t border-white/20">
            <h2 className="text-4xl font-bold text-center mb-16">Why Choose LearnFlow?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group p-6 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 hover:border-white/40 transition-all hover:bg-white/20"
                >
                  <div className="text-4xl mb-4 text-purple-400 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-32 px-6 py-8 border-t border-white/20 text-center text-gray-400">
          <p>&copy; 2026 LearnFlow. Adaptive learning for everyone.</p>
        </footer>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
