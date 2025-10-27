import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlay, 
  faPause, 
  faRotateLeft, 
  faExpand, 
  faCompress,
  faBookOpen,
  faEye,
  faVolumeUp,
  faVolumeMute
} from '@fortawesome/free-solid-svg-icons';

export function Book3DPreview({ 
  coverImage, 
  backCoverImage, 
  samplePages = [], 
  onPageFlip, 
  interactive = true, 
  autoRotate = false,
  className = ""
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [rotation, setRotation] = useState({ x: -15, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const [isFlipping, setIsFlipping] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  const bookRef = useRef(null);
  const animationRef = useRef(null);

  // Auto-rotation effect
  useEffect(() => {
    if (autoRotate && !isDragging) {
      const interval = setInterval(() => {
        setRotation(prev => ({
          ...prev,
          y: (prev.y + 1) % 360
        }));
      }, 100);
      return () => clearInterval(interval);
    }
  }, [autoRotate, isDragging]);

  // Page flipping animation
  useEffect(() => {
    if (isFlipping) {
      const timer = setTimeout(() => {
        setIsFlipping(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isFlipping]);

  const handleMouseDown = (e) => {
    if (!interactive) return;
    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !interactive) return;
    
    const deltaX = e.clientX - lastMousePos.x;
    const deltaY = e.clientY - lastMousePos.y;
    
    setRotation(prev => ({
      x: Math.max(-60, Math.min(60, prev.x - deltaY * 0.5)),
      y: prev.y + deltaX * 0.5
    }));
    
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handlePageFlip = (direction) => {
    if (isFlipping || !interactive) return;
    
    setIsFlipping(true);
    const newPage = direction === 'next' 
      ? Math.min(currentPage + 1, samplePages.length)
      : Math.max(currentPage - 1, 0);
    
    setCurrentPage(newPage);
    onPageFlip?.(newPage);
    
    // Play page flip sound
    if (soundEnabled) {
      playPageFlipSound();
    }
  };

  const playPageFlipSound = () => {
    // Create a simple page flip sound effect
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const resetRotation = () => {
    setRotation({ x: -15, y: 0 });
  };

  const toggleBook = () => {
    setIsOpen(!isOpen);
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  const getPageContent = () => {
    if (currentPage === 0) return coverImage;
    if (currentPage === samplePages.length + 1) return backCoverImage;
    return samplePages[currentPage - 1] || coverImage;
  };

  return (
    <div className={`relative ${className}`}>
      {/* 3D Book Container */}
      <div 
        ref={bookRef}
        className="relative w-full h-96 perspective-1000"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: interactive ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
      >
        {/* 3D Book */}
        <div 
          className={`relative w-full h-full transform-gpu transition-transform duration-300 ${
            isFlipping ? 'animate-pulse' : ''
          }`}
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) ${
              isOpen ? 'rotateY(180deg)' : ''
            }`,
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Front Cover */}
          <div 
            className="absolute inset-0 w-full h-full bg-white rounded-lg shadow-2xl border border-gray-200"
            style={{
              transform: 'translateZ(10px)',
              backfaceVisibility: 'hidden'
            }}
          >
            <img 
              src={getPageContent()} 
              alt="Book Cover"
              className="w-full h-full object-cover rounded-lg"
            />
            
            {/* Page Flip Effect Overlay */}
            {isFlipping && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
            )}
          </div>

          {/* Back Cover (when book is open) */}
          <div 
            className="absolute inset-0 w-full h-full bg-white rounded-lg shadow-2xl border border-gray-200"
            style={{
              transform: 'translateZ(-10px) rotateY(180deg)',
              backfaceVisibility: 'hidden'
            }}
          >
            <img 
              src={backCoverImage || coverImage} 
              alt="Book Back Cover"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Book Spine */}
          <div 
            className="absolute left-0 top-0 w-2 h-full bg-gradient-to-b from-gray-800 to-gray-600 rounded-l-lg"
            style={{
              transform: 'translateZ(-5px) rotateY(-90deg)',
              transformOrigin: 'left center'
            }}
          />
        </div>

        {/* Interactive Overlay */}
        {interactive && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black/50 backdrop-blur-sm rounded-full p-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
              <FontAwesomeIcon 
                icon={isOpen ? faCompress : faExpand} 
                className="w-6 h-6 text-white cursor-pointer"
                onClick={toggleBook}
              />
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      {interactive && (
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* Page Navigation */}
            <button
              onClick={() => handlePageFlip('prev')}
              disabled={currentPage === 0 || isFlipping}
              className="p-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              <FontAwesomeIcon icon={faRotateLeft} className="w-4 h-4" />
            </button>
            
            <span className="text-sm text-gray-600 min-w-20 text-center">
              {currentPage} / {samplePages.length + 1}
            </span>
            
            <button
              onClick={() => handlePageFlip('next')}
              disabled={currentPage >= samplePages.length + 1 || isFlipping}
              className="p-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              <FontAwesomeIcon icon={faRotateLeft} className="w-4 h-4 rotate-180" />
            </button>
          </div>

          <div className="flex items-center space-x-2">
            {/* Play/Pause */}
            <button
              onClick={togglePlayPause}
              className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-colors"
            >
              <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} className="w-4 h-4" />
            </button>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className={`p-2 rounded-lg transition-colors ${
                soundEnabled 
                  ? 'bg-green-100 hover:bg-green-200 text-green-600' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              }`}
            >
              <FontAwesomeIcon icon={soundEnabled ? faVolumeUp : faVolumeMute} className="w-4 h-4" />
            </button>

            {/* Reset Rotation */}
            <button
              onClick={resetRotation}
              className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition-colors"
              title="Reset View"
            >
              <FontAwesomeIcon icon={faRotateLeft} className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Page Content Display */}
      {isOpen && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="flex items-center space-x-2 mb-2">
            <FontAwesomeIcon icon={faBookOpen} className="w-4 h-4 text-blue-600" />
            <span className="font-medium text-gray-700">Page Content</span>
          </div>
          <div className="text-sm text-gray-600">
            {currentPage === 0 && "Front Cover"}
            {currentPage > 0 && currentPage <= samplePages.length && `Page ${currentPage}`}
            {currentPage > samplePages.length && "Back Cover"}
          </div>
        </div>
      )}

      {/* Reading Progress Indicator */}
      <div className="mt-2">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentPage / (samplePages.length + 1)) * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Start</span>
          <span>{Math.round((currentPage / (samplePages.length + 1)) * 100)}%</span>
          <span>End</span>
        </div>
      </div>
    </div>
  );
}
