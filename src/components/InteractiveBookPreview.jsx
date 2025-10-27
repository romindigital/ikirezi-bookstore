import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlay, 
  faPause, 
  faVolumeUp, 
  faVolumeMute,
  faExpand,
  faCompress,
  faBookOpen,
  faClock,
  faEye,
  faDownload
} from '@fortawesome/free-solid-svg-icons';

export function InteractiveBookPreview({ book, onClose }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [previewType, setPreviewType] = useState('sample'); // sample, audio, video
  const [readingProgress, setReadingProgress] = useState(0);
  const [isReading, setIsReading] = useState(false);
  
  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const previewTypes = [
    { id: 'sample', label: 'Sample Reading', icon: faBookOpen, description: 'Read the first few pages' },
    { id: 'audio', label: 'Audio Preview', icon: faVolumeUp, description: 'Listen to the audiobook sample' },
    { id: 'video', label: 'Video Trailer', icon: faPlay, description: 'Watch the book trailer' }
  ];

  // Sample content for demonstration
  const sampleContent = `
    Chapter 1: The Beginning

    The morning sun cast long shadows across the cobblestone streets as Elena made her way through the bustling marketplace. She had been waiting for this day for months, ever since the mysterious letter arrived at her doorstep. The parchment was old, its edges worn and yellowed with age, but the handwriting was unmistakably familiar.

    "Meet me at the old lighthouse at midnight," it read. "The time has come."

    Elena clutched the letter tightly in her hand, her heart racing with anticipation and fear. She had always known this day would come, but now that it was here, she wasn't sure if she was ready for what lay ahead.

    The lighthouse stood tall against the darkening sky, its beacon cutting through the fog like a sword through silk. As she approached, she could hear the waves crashing against the rocks below, a rhythmic sound that seemed to echo the beating of her own heart.

    "You came," a voice called out from the shadows.

    Elena turned to see a figure emerging from the darkness, their face hidden beneath a hooded cloak. But she would recognize that voice anywhere, even after all these years.

    "I had to," she replied, her voice barely above a whisper. "You know I had to."

    The figure stepped closer, and for the first time in years, Elena saw the face of the person who had changed her life forever. The years had been kind to them, but there was something different in their eyes now - a sadness that hadn't been there before.

    "The prophecy is beginning to unfold," they said, their voice heavy with the weight of destiny. "And you, Elena, are at the center of it all."

    Elena felt a chill run down her spine. She had heard stories of the prophecy, whispered in hushed tones by the elders of her village. But she had never believed that she would be the one to fulfill it.

    "What do you mean?" she asked, her voice trembling slightly.

    The figure reached into their cloak and pulled out an ancient tome, its pages glowing with an otherworldly light. "This book contains the answers you seek," they said, placing it gently in Elena's hands. "But be warned - once you open it, there's no going back."

    Elena looked down at the book, feeling its power coursing through her fingertips. She knew that her life was about to change forever, but she also knew that she had no choice but to see it through.

    "I'm ready," she said, her voice now steady with determination.

    The figure nodded, and together they turned toward the lighthouse, ready to face whatever destiny had in store for them.

    [End of Sample - Continue reading to discover Elena's fate...]
  `;

  const handlePlayPause = () => {
    if (previewType === 'audio' && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    } else if (previewType === 'video' && videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    } else if (previewType === 'sample') {
      setIsReading(!isReading);
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
    setCurrentTime(newTime);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleDownload = () => {
    // Simulate download
    console.log('Downloading preview...');
  };

  // Simulate reading progress
  useEffect(() => {
    if (isReading && previewType === 'sample') {
      const interval = setInterval(() => {
        setReadingProgress(prev => {
          if (prev >= 100) {
            setIsReading(false);
            setIsPlaying(false);
            return 100;
          }
          return prev + 0.5;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isReading, previewType]);

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 ${
        isFullscreen ? 'bg-black' : ''
      }`}
    >
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon icon={faBookOpen} className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Book Preview</h3>
              <p className="text-sm text-gray-600">{book?.title}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleDownload}
              className="p-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faDownload} className="w-4 h-4" />
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              <FontAwesomeIcon icon={isFullscreen ? faCompress : faExpand} className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              ×
            </button>
          </div>
        </div>

        {/* Preview Type Selector */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex space-x-2">
            {previewTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => {
                  setPreviewType(type.id);
                  setIsPlaying(false);
                  setIsReading(false);
                  setReadingProgress(0);
                }}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  previewType === type.id
                    ? 'bg-blue-100 text-blue-700 border border-blue-300'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <FontAwesomeIcon icon={type.icon} className="w-4 h-4" />
                <span className="text-sm font-medium">{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 flex-1 overflow-auto">
          {previewType === 'sample' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold">Sample Reading</h4>
                <div className="flex items-center space-x-2">
                  <FontAwesomeIcon icon={faClock} className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-500">~5 min read</span>
                </div>
              </div>
              
              <div className="prose max-w-none">
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {sampleContent}
                </div>
              </div>

              {/* Reading Progress */}
              {isReading && (
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Reading Progress</span>
                    <span className="text-sm text-gray-600">{Math.round(readingProgress)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${readingProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {previewType === 'audio' && (
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FontAwesomeIcon icon={faVolumeUp} className="w-12 h-12 text-white" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Audio Preview</h4>
                <p className="text-gray-600">Listen to the first chapter</p>
              </div>
              
              {/* Audio Player */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-4">
                    <button
                      onClick={handlePlayPause}
                      className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-200"
                    >
                      <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    <div 
                      className="w-full bg-gray-300 rounded-full h-2 cursor-pointer"
                      onClick={handleSeek}
                    >
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-200"
                        style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                      />
                    </div>
                    
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={handleMute}
                      className="p-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                    >
                      <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp} className="w-4 h-4" />
                    </button>
                    
                    <div className="flex-1 flex items-center space-x-2">
                      <FontAwesomeIcon icon={faVolumeUp} className="w-4 h-4 text-gray-500" />
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <audio
                ref={audioRef}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={() => setDuration(audioRef.current.duration)}
                onEnded={() => setIsPlaying(false)}
                className="hidden"
              >
                <source src="/api/audio-preview" type="audio/mpeg" />
              </audio>
            </div>
          )}

          {previewType === 'video' && (
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FontAwesomeIcon icon={faPlay} className="w-12 h-12 text-white" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Video Trailer</h4>
                <p className="text-gray-600">Watch the book trailer</p>
              </div>
              
              <div className="relative bg-black rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={() => setDuration(videoRef.current.duration)}
                  onEnded={() => setIsPlaying(false)}
                  className="w-full h-64 object-cover"
                  poster={book?.image}
                >
                  <source src="/api/video-preview" type="video/mp4" />
                </video>
                
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={handlePlayPause}
                      className="w-16 h-16 bg-white bg-opacity-90 text-black rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all duration-200"
                    >
                      <FontAwesomeIcon icon={faPlay} className="w-6 h-6 ml-1" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handlePlayPause}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} className="w-4 h-4" />
                <span>{isPlaying ? 'Pause' : 'Play'}</span>
              </button>
              
              {previewType === 'sample' && (
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <FontAwesomeIcon icon={faEye} className="w-4 h-4" />
                  <span>Reading Mode</span>
                </div>
              )}
            </div>
            
            <div className="text-sm text-gray-600">
              {previewType === 'sample' && 'Free sample • '}
              {previewType === 'audio' && 'Audio preview • '}
              {previewType === 'video' && 'Video trailer • '}
              Continue with full book
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
