import React, { useState, useRef } from 'react';
import { useLearning } from '../context/LearningContext';

export const UploadVideo = () => {
  const { apiBaseUrl } = useLearning();
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration_seconds: '',
    topic: '',
    has_subtitles: false,
    resolution_options: {}
  });

  // Define available topics
  const availableTopics = [
    { id: 'lm', name: 'Language Models', description: 'LLMs, GPT, BERT, Transformers' },
    { id: 'nlp', name: 'Natural Language Processing', description: 'Text processing, tokenization, embeddings' },
    { id: 'da', name: 'Data Analysis', description: 'Data visualization, statistics, insights' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['video/mp4', 'video/avi', 'video/mov', 'video/wmv', 'video/flv', 'video/webm'];
      if (!allowedTypes.includes(file.type)) {
        alert('Please select a valid video file (MP4, AVI, MOV, WMV, FLV, WebM)');
        return;
      }

      // Validate file size (max 500MB)
      const maxSize = 500 * 1024 * 1024; // 500MB in bytes
      if (file.size > maxSize) {
        alert('File size must be less than 500MB');
        return;
      }

      setSelectedFile(file);

      // Auto-fill title if empty
      if (!formData.title) {
        const fileName = file.name.replace(/\.[^/.]+$/, ''); // Remove extension
        setFormData(prev => ({ ...prev, title: fileName }));
      }
    }
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !selectedFile || !formData.topic || !formData.duration_seconds) {
      alert('Please fill all required fields and select a video file');
      return;
    }

    setLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('file', selectedFile);
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('duration_seconds', parseInt(formData.duration_seconds));
      formDataToSend.append('topic', formData.topic);
      formDataToSend.append('has_subtitles', formData.has_subtitles.toString());

      const response = await fetch(`${apiBaseUrl}/api/v1/videos/upload`, {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        alert('Video uploaded successfully!');
        setFormData({
          title: '',
          description: '',
          duration_seconds: '',
          topic: '',
          has_subtitles: false,
          resolution_options: {}
        });
        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        const error = await response.json();
        alert(`Error: ${error.detail || 'Failed to upload video'}`);
      }
    } catch (error) {
      console.error('Error uploading video:', error);
      alert('Failed to upload video');
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const parseDuration = (durationStr) => {
    const parts = durationStr.split(':');
    if (parts.length === 2) {
      const mins = parseInt(parts[0]) || 0;
      const secs = parseInt(parts[1]) || 0;
      return mins * 60 + secs;
    }
    return parseInt(durationStr) || 0;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload New Video</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter video title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Topic *
              </label>
              <select
                name="topic"
                value={formData.topic}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              >
                <option value="">Select a topic</option>
                {availableTopics.map(topic => (
                  <option key={topic.id} value={topic.id}>
                    {topic.name} - {topic.description}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Video File *
            </label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="video/*"
              className="hidden"
            />
            <button
              type="button"
              onClick={handleFileButtonClick}
              className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-md hover:border-purple-400 hover:bg-purple-50 transition flex items-center justify-center gap-3"
            >
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">
                  {selectedFile ? selectedFile.name : 'Click to upload video'}
                </p>
                <p className="text-xs text-gray-500">
                  {selectedFile ? `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB` : 'MP4, AVI, MOV, WMV, FLV, WebM up to 500MB'}
                </p>
              </div>
            </button>
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
              placeholder="Enter video description"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration (MM:SS or seconds) *
              </label>
              <input
                type="text"
                name="duration_seconds"
                value={formData.duration_seconds ? formatDuration(parseInt(formData.duration_seconds)) : ''}
                onChange={(e) => {
                  const value = e.target.value;
                  const seconds = parseDuration(value);
                  setFormData(prev => ({ ...prev, duration_seconds: seconds.toString() }));
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="5:30 or 330"
                required
              />
              <p className="text-sm text-gray-600 mt-1">
                Enter as MM:SS (e.g., 5:30) or total seconds
              </p>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="has_subtitles"
                checked={formData.has_subtitles}
                onChange={handleInputChange}
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <label className="ml-2 text-sm font-medium text-gray-700">
                Has subtitles/captions
              </label>
            </div>
          </div>

          {/* Preview */}
          {selectedFile && (
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Video Preview</h3>
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center text-gray-500">
                    <div className="text-4xl mb-2">🎥</div>
                    <p>Video Preview</p>
                    <p className="text-sm">Duration: {formData.duration_seconds ? formatDuration(parseInt(formData.duration_seconds)) : 'Not set'}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p><strong>Title:</strong> {formData.title || 'Not set'}</p>
                  <p><strong>Topic:</strong> {availableTopics.find(t => t.id === formData.topic)?.name || 'Not selected'}</p>
                  <p><strong>File:</strong> {selectedFile.name} ({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)</p>
                  <p><strong>Subtitles:</strong> {formData.has_subtitles ? 'Yes' : 'No'}</p>
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-3 px-6 rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? 'Uploading Video...' : 'Upload Video'}
          </button>
        </form>
      </div>

      {/* Help Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Upload Tips</h3>
        <ul className="text-blue-800 text-sm space-y-1">
          <li>• Supported formats: MP4, AVI, MOV, WMV, FLV, WebM</li>
          <li>• Maximum file size: 500MB</li>
          <li>• Duration should match the actual video length</li>
          <li>• Choose the appropriate topic: LM (Language Models), NLP (Natural Language Processing), or DA (Data Analysis)</li>
          <li>• Add subtitles if available for better accessibility</li>
          <li>• Write a clear description to help students understand the content</li>
          <li>• Uploaded videos will be available to students in the corresponding topic section</li>
        </ul>
      </div>
    </div>
  );
};

export default UploadVideo;