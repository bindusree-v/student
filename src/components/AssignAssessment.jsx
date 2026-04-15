import React, { useState, useEffect } from 'react';
import { useLearning } from '../context/LearningContext';

export const AssignAssessment = () => {
  const { apiBaseUrl } = useLearning();
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    topic_id: '',
    assessment_type: 'quiz',
    passing_score: 70,
    time_limit_minutes: 30,
    questions: []
  });
  const [currentQuestion, setCurrentQuestion] = useState({
    question_text: '',
    question_type: 'mcq',
    options: { A: '', B: '', C: '', D: '', correct: 'A' },
    points: 1
  });

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/v1/topics`);
      const data = await response.json();
      setTopics(data.topics || []);
    } catch (error) {
      console.error('Error fetching topics:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleQuestionChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('option_')) {
      const optionKey = name.replace('option_', '');
      setCurrentQuestion(prev => ({
        ...prev,
        options: {
          ...prev.options,
          [optionKey]: value
        }
      }));
    } else {
      setCurrentQuestion(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const addQuestion = () => {
    if (!currentQuestion.question_text.trim()) return;

    setFormData(prev => ({
      ...prev,
      questions: [...prev.questions, currentQuestion]
    }));

    setCurrentQuestion({
      question_text: '',
      question_type: 'mcq',
      options: { A: '', B: '', C: '', D: '', correct: 'A' },
      points: 1
    });
  };

  const removeQuestion = (index) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.topic_id || formData.questions.length === 0) {
      alert('Please fill all required fields and add at least one question');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${apiBaseUrl}/api/v1/assessments/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Assessment created successfully!');
        setFormData({
          title: '',
          description: '',
          topic_id: '',
          assessment_type: 'quiz',
          passing_score: 70,
          time_limit_minutes: 30,
          questions: []
        });
      } else {
        const error = await response.json();
        alert(`Error: ${error.detail || 'Failed to create assessment'}`);
      }
    } catch (error) {
      console.error('Error creating assessment:', error);
      alert('Failed to create assessment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Assessment</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assessment Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter assessment title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Topic *
              </label>
              <select
                name="topic_id"
                value={formData.topic_id}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              >
                <option value="">Select a topic</option>
                {topics.map(topic => (
                  <option key={topic.id} value={topic.id}>
                    {topic.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter assessment description"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assessment Type
              </label>
              <select
                name="assessment_type"
                value={formData.assessment_type}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="quiz">Quiz</option>
                <option value="exam">Exam</option>
                <option value="practice">Practice</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Passing Score (%)
              </label>
              <input
                type="number"
                name="passing_score"
                value={formData.passing_score}
                onChange={handleInputChange}
                min="0"
                max="100"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time Limit (minutes)
              </label>
              <input
                type="number"
                name="time_limit_minutes"
                value={formData.time_limit_minutes}
                onChange={handleInputChange}
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Questions Section */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Questions</h3>

            <div className="bg-gray-50 p-4 rounded-lg space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Question Text *
                </label>
                <input
                  type="text"
                  name="question_text"
                  value={currentQuestion.question_text}
                  onChange={handleQuestionChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your question"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Question Type
                  </label>
                  <select
                    name="question_type"
                    value={currentQuestion.question_type}
                    onChange={handleQuestionChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="mcq">Multiple Choice</option>
                    <option value="text">Text Answer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Points
                  </label>
                  <input
                    type="number"
                    name="points"
                    value={currentQuestion.points}
                    onChange={handleQuestionChange}
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              {currentQuestion.question_type === 'mcq' && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Options</label>
                  {['A', 'B', 'C', 'D'].map(option => (
                    <div key={option} className="flex items-center gap-2">
                      <span className="w-6 text-sm font-medium">{option}:</span>
                      <input
                        type="text"
                        name={`option_${option}`}
                        value={currentQuestion.options[option]}
                        onChange={handleQuestionChange}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder={`Option ${option}`}
                      />
                      <input
                        type="radio"
                        name="correct"
                        value={option}
                        checked={currentQuestion.options.correct === option}
                        onChange={(e) => setCurrentQuestion(prev => ({
                          ...prev,
                          options: { ...prev.options, correct: e.target.value }
                        }))}
                        className="w-4 h-4 text-purple-600"
                      />
                      <span className="text-xs text-gray-600">Correct</span>
                    </div>
                  ))}
                </div>
              )}

              <button
                type="button"
                onClick={addQuestion}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
              >
                Add Question
              </button>
            </div>

            {/* Added Questions List */}
            {formData.questions.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Added Questions ({formData.questions.length})</h4>
                {formData.questions.map((q, index) => (
                  <div key={index} className="flex items-center justify-between bg-white p-3 rounded border">
                    <div className="flex-1">
                      <p className="font-medium">{q.question_text}</p>
                      <p className="text-sm text-gray-600">{q.question_type} • {q.points} points</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeQuestion(index)}
                      className="text-red-600 hover:text-red-800 ml-2"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-3 px-6 rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? 'Creating Assessment...' : 'Create Assessment'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AssignAssessment;