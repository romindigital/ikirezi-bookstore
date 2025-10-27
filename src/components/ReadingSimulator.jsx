import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlay, 
  faPause, 
  faStop, 
  faVolumeUp, 
  faVolumeMute,
  faBookOpen,
  faClock,
  faEye
} from '@fortawesome/free-solid-svg-icons';

export function ReadingSimulator({ 
  sampleChapter, 
  readingSpeed = 'average', 
  onReadingComplete, 
  highlightQuotes = [], 
  onProgressUpdate,
  className = ""
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentWord, setCurrentWord] = useState(0);
  const [progress, setProgress] = useState(0);
  const [readingTime, setReadingTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [highlightedQuote, setHighlightedQuote] = useState(null);
  
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);

  const readingSpeeds = {
    slow: 200,
    average: 150,
    fast: 100,
    veryFast: 50
  };

  const words = sampleChapter?.split(' ') || [];
  const totalWords = words.length;
  const speed = readingSpeeds[readingSpeed] || readingSpeeds.average;

  useEffect(() => {
    if (isPlaying) {
      startTimeRef.current = Date.now();
      intervalRef.current = setInterval(() => {
        setCurrentWord(prev => {
          const newWord = prev + 1;
          const newProgress = (newWord / totalWords) * 100;
          setProgress(newProgress);
          onProgressUpdate?.(newProgress);
          
          if (newWord >= totalWords) {
            setIsPlaying(false);
            const totalTime = (Date.now() - startTimeRef.current) / 1000;
            setReadingTime(totalTime);
            onReadingComplete?.(totalTime);
          }
          
          return newWord;
        });
      }, speed);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, speed, totalWords, onProgressUpdate, onReadingComplete]);

  useEffect(() => {
    // Check for quote highlights
    const currentText = words.slice(0, currentWord).join(' ');
    const foundQuote = highlightQuotes.find(quote => 
      currentText.includes(quote.text)
    );
    setHighlightedQuote(foundQuote || null);
  }, [currentWord, words, highlightQuotes]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleStop = () => {
    setIsPlaying(false);
    setCurrentWord(0);
    setProgress(0);
    setReadingTime(0);
  };

  const handleSpeedChange = (newSpeed) => {
    // This would be handled by parent component
    console.log('Speed change requested:', newSpeed);
  };

  const getCurrentText = () => {
    return words.slice(0, currentWord).join(' ');
  };

  const getRemainingText = () => {
    return words.slice(currentWord).join(' ');
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <FontAwesomeIcon icon={faBookOpen} className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Reading Simulator</h3>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">
            <FontAwesomeIcon icon={faClock} className="w-4 h-4 mr-1" />
            {Math.round(readingTime)}s
          </span>
          <span className="text-sm text-gray-600">
            <FontAwesomeIcon icon={faEye} className="w-4 h-4 mr-1" />
            {currentWord}/{totalWords} words
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0%</span>
          <span>{Math.round(progress)}%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Reading Text */}
      <div className="mb-6">
        <div className="bg-gray-50 rounded-lg p-4 min-h-32 max-h-64 overflow-y-auto">
          <p className="text-gray-800 leading-relaxed">
            <span className="text-gray-600">{getCurrentText()}</span>
            <span className="bg-blue-200 px-1 rounded">{getRemainingText().split(' ')[0]}</span>
            <span className="text-gray-400">{getRemainingText().split(' ').slice(1).join(' ')}</span>
          </p>
        </div>
      </div>

      {/* Quote Highlight */}
      {highlightedQuote && (
        <div className="mb-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
          <div className="flex items-start space-x-2">
            <FontAwesomeIcon icon={faBookOpen} className="w-4 h-4 text-yellow-600 mt-1" />
            <div>
              <p className="text-yellow-800 font-medium">Notable Quote:</p>
              <p className="text-yellow-700 italic">"{highlightedQuote.text}"</p>
              {highlightedQuote.author && (
                <p className="text-yellow-600 text-sm">— {highlightedQuote.author}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePlayPause}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              isPlaying 
                ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
            }`}
          >
            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} className="w-4 h-4 mr-2" />
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          
          <button
            onClick={handleStop}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            <FontAwesomeIcon icon={faStop} className="w-4 h-4 mr-2" />
            Stop
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-2 rounded-lg transition-colors ${
              isMuted 
                ? 'bg-gray-100 text-gray-600' 
                : 'bg-green-100 text-green-600'
            }`}
          >
            <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp} className="w-4 h-4" />
          </button>
          
          <select
            value={readingSpeed}
            onChange={(e) => handleSpeedChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="slow">Slow</option>
            <option value="average">Average</option>
            <option value="fast">Fast</option>
            <option value="veryFast">Very Fast</option>
          </select>
        </div>
      </div>
    </div>
  );
}
