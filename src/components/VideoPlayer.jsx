import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Maximize2, Minimize2, Subtitles, Clock } from 'lucide-react';

export default function VideoPlayer({
  videoUrl,
  duration = 3600,
  subtitles = {},
  onProgress = () => {},
  videoTitle = 'Untitled Video'
}) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(false);
  const [selectedSubtitleLang, setSelectedSubtitleLang] = useState(Object.keys(subtitles)[0] || 'en');
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return hrs > 0
      ? `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
      : `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const time = videoRef.current.currentTime;
      const percent = (time / videoRef.current.duration) * 100;
      setCurrentTime(time);
      onProgress({ currentTime: time, progress: percent });
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const newTime = (x / rect.width) * (videoRef.current?.duration || duration);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      }
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  const videoDuration = videoRef.current?.duration || duration;
  const progress = videoDuration > 0 ? (currentTime / videoDuration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      className="bg-black rounded-xl overflow-hidden group relative"
      style={{ aspectRatio: '16/9' }}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full h-full"
        onTimeUpdate={handleTimeUpdate}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onLoadStart={() => setIsLoading(true)}
        onLoadedData={() => setIsLoading(false)}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Subtitle Display */}
      {showSubtitles && subtitles[selectedSubtitleLang] && (
        <div className="absolute bottom-20 left-0 right-0 text-center text-white text-lg font-semibold bg-black/50 px-4 py-2">
          {subtitles[selectedSubtitleLang]}
        </div>
      )}

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {/* Progress Bar */}
        <div
          className="w-full h-1 bg-gray-600 rounded-full cursor-pointer mb-4 hover:h-2 transition-all"
          onClick={handleSeek}
        >
          <div
            className="h-full bg-purple-600 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-4">
            {/* Play/Pause */}
            <button
              onClick={handlePlayPause}
              className="hover:scale-110 transition"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>

            {/* Replay */}
            <button
              onClick={handleReplay}
              className="hover:scale-110 transition"
              title="Replay"
            >
              <RotateCcw className="w-5 h-5" />
            </button>

            {/* Mute */}
            <button
              onClick={toggleMute}
              className="hover:scale-110 transition"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>

            {/* Volume Slider */}
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 h-1 bg-gray-600 rounded-full cursor-pointer"
              title="Volume"
            />

            {/* Time Display */}
            <div className="flex items-center gap-2 text-sm ml-2">
              <Clock className="w-4 h-4" />
              <span>{formatTime(currentTime)} / {formatTime(videoDuration)}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Subtitles */}
            {Object.keys(subtitles).length > 0 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowSubtitles(!showSubtitles)}
                  className={`hover:scale-110 transition ${showSubtitles ? 'text-yellow-400' : ''}`}
                  title="Subtitles"
                >
                  <Subtitles className="w-5 h-5" />
                </button>
                {showSubtitles && (
                  <select
                    value={selectedSubtitleLang}
                    onChange={(e) => setSelectedSubtitleLang(e.target.value)}
                    className="bg-gray-800 text-white px-2 py-1 rounded text-sm"
                  >
                    {Object.keys(subtitles).map(lang => (
                      <option key={lang} value={lang}>
                        {lang.toUpperCase()}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            )}

            {/* Fullscreen */}
            <button
              onClick={handleFullscreen}
              className="hover:scale-110 transition"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Play Button Overlay */}
      {!isPlaying && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition cursor-pointer" onClick={handlePlayPause}>
          <button className="p-4 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition">
            <Play className="w-16 h-16 text-white fill-white" />
          </button>
        </div>
      )}

      {/* Loading Indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      )}
    </div>
  );
}
