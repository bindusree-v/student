import React from 'react';
import { Rocket, Clock, Zap, Play, ChevronRight } from 'lucide-react';

export default function AdvancedSection({
  relatedVideos = [],
  onVideoSelect = () => {},
  isLoading = false
}) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse"></div>
        <div className="grid md:grid-cols-2 gap-4">
          {[1, 2].map(i => (
            <div key={i} className="bg-gray-200 rounded-lg h-48 animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!relatedVideos || relatedVideos.length === 0) {
    return null;
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'medium':
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'hard':
      case 'advanced':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getDifficultyIcon = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy':
        return '⭐';
      case 'medium':
      case 'intermediate':
        return '⭐⭐';
      case 'hard':
      case 'advanced':
        return '⭐⭐⭐';
      default:
        return '⭐';
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <Rocket className="w-6 h-6 text-orange-600" />
        Advanced Topics & Related Videos
      </h3>

      <div className="grid md:grid-cols-2 gap-4">
        {relatedVideos.map((video, idx) => (
          <button
            key={video.id || idx}
            onClick={() => onVideoSelect(video)}
            className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg hover:border-orange-400 transition-all text-left"
          >
            {/* Thumbnail */}
            <div className="relative bg-gradient-to-br from-orange-400 to-red-500 aspect-video flex items-center justify-center overflow-hidden">
              {video.thumbnail ? (
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full">
                  <Play className="w-12 h-12 text-white/50 group-hover:text-white/80 transition" />
                </div>
              )}

              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                <button className="opacity-0 group-hover:opacity-100 transition-opacity p-3 bg-white rounded-full hover:bg-orange-600 hover:text-white">
                  <Play className="w-6 h-6 fill-current" />
                </button>
              </div>

              {/* Duration Badge */}
              {video.duration && (
                <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {typeof video.duration === 'number'
                    ? `${Math.floor(video.duration / 60)}:${String(video.duration % 60).padStart(2, '0')}`
                    : video.duration}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              {/* Difficulty Badge */}
              {video.difficulty && (
                <div className={`inline-block text-xs font-semibold px-2 py-1 rounded-full border mb-2 ${getDifficultyColor(video.difficulty)}`}>
                  {getDifficultyIcon(video.difficulty)} {video.difficulty}
                </div>
              )}

              {/* Title */}
              <h4 className="font-semibold text-gray-900 group-hover:text-orange-600 transition line-clamp-2 flex items-start justify-between gap-2">
                <span>{video.title}</span>
                <ChevronRight className="w-4 h-4 flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition" />
              </h4>

              {/* Description */}
              {video.description && (
                <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                  {video.description}
                </p>
              )}

              {/* Metadata */}
              <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
                {video.instructor && (
                  <span className="flex items-center gap-1">
                    👤 {video.instructor}
                  </span>
                )}
                {video.watchCount && (
                  <span className="flex items-center gap-1">
                    👁️ {video.watchCount}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Related Concepts Note */}
      <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-900">
        <p className="flex items-start gap-2">
          <Zap className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>
            <strong>💡 Pro Tip:</strong> These videos are curated from the same concept hierarchy.
            Watch them in order of progression (⭐ easy → ⭐⭐ medium → ⭐⭐⭐ advanced) for better understanding.
          </span>
        </p>
      </div>
    </div>
  );
}
