import React, { useState, useEffect } from 'react';
import { Play, Clock, Calendar, Loader } from 'lucide-react';
import { getVideosByTopic } from '../api';

export default function TopicVideos({ topic, onSelectVideo = () => {} }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!topic) {
      setVideos([]);
      setLoading(false);
      setError(null);
      return;
    }
    fetchVideosByTopic();
  }, [topic]);

  const fetchVideosByTopic = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getVideosByTopic(topic);
      const data = response.data;
      setVideos(data.videos || []);
    } catch (err) {
      console.error('Error fetching videos:', err);
      const message = err?.response?.data?.detail || err?.message || 'Failed to fetch videos';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader className="w-8 h-8 text-purple-600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
        <p className="font-semibold">Failed to load videos</p>
        <p className="text-sm mt-1">{error}</p>
      </div>
    );
  }

  if (!videos || videos.length === 0) {
    return (
      <div className="py-12 text-center text-gray-600">
        <p>No videos available for this topic yet.</p>
        <p className="text-sm text-gray-500 mt-1">Check back later for new content!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {videos.map((video) => (
        <button
          key={video.id}
          onClick={() => onSelectVideo(video)}
          className="w-full p-4 bg-white border border-gray-200 rounded-lg hover:border-purple-400 hover:shadow-md transition text-left group"
        >
          <div className="flex gap-4">
            {/* Thumbnail */}
            <div className="relative flex-shrink-0 w-32 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center overflow-hidden">
              <Play className="w-8 h-8 text-white opacity-70 group-hover:opacity-100 transition" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition truncate">
                {video.title}
              </h3>
              {video.description && (
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {video.description}
                </p>
              )}
              <div className="flex gap-4 mt-2 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatDuration(video.duration_seconds)}
                </span>
                {video.created_at && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(video.created_at)}
                  </span>
                )}
                {video.has_subtitles && (
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded">
                    CC
                  </span>
                )}
              </div>
            </div>

            {/* Badge */}
            <div className="flex-shrink-0 flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg text-purple-600 group-hover:bg-purple-200 transition">
                <Play className="w-4 h-4 fill-current" />
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
