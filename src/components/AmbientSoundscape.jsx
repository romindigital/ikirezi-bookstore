import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faVolumeUp, 
  faVolumeMute, 
  faPlay, 
  faPause,
  faMusic,
  faWind,
  faWater,
  faFire,
  faLeaf
} from '@fortawesome/free-solid-svg-icons';

export function AmbientSoundscape({ 
  mood = 'neutral', 
  locationSounds = '', 
  timePeriod = 'modern', 
  onVolumeChange,
  className = ""
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [selectedSound, setSelectedSound] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  
  const audioRef = useRef(null);
  const audioContextRef = useRef(null);

  const soundscapes = {
    nature: {
      name: 'Nature Sounds',
      icon: faLeaf,
      sounds: ['rain', 'wind', 'birds', 'ocean']
    },
    urban: {
      name: 'Urban Ambience',
      icon: faMusic,
      sounds: ['city', 'cafe', 'traffic', 'construction']
    },
    fantasy: {
      name: 'Fantasy Realm',
      icon: faFire,
      sounds: ['magic', 'forest', 'castle', 'mystical']
    },
    historical: {
      name: 'Historical Period',
      icon: faWind,
      sounds: ['medieval', 'victorian', 'renaissance', 'ancient']
    }
  };

  const getMoodSoundscape = () => {
    if (mood.includes('mystery') || mood.includes('dark')) return 'fantasy';
    if (mood.includes('nature') || mood.includes('peaceful')) return 'nature';
    if (mood.includes('urban') || mood.includes('modern')) return 'urban';
    if (timePeriod === 'historical') return 'historical';
    return 'nature';
  };

  const currentSoundscape = soundscapes[getMoodSoundscape()];

  useEffect(() => {
    if (isPlaying && selectedSound) {
      playAmbientSound(selectedSound);
    } else {
      stopAmbientSound();
    }
  }, [isPlaying, selectedSound]);

  useEffect(() => {
    onVolumeChange?.(isMuted ? 0 : volume);
  }, [volume, isMuted, onVolumeChange]);

  const playAmbientSound = (soundType) => {
    // Simulate ambient sound generation
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }

    const audioContext = audioContextRef.current;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Generate different sound patterns based on type
    switch (soundType) {
      case 'rain':
        oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(150, audioContext.currentTime + 2);
        break;
      case 'wind':
        oscillator.frequency.setValueAtTime(100, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(80, audioContext.currentTime + 3);
        break;
      case 'ocean':
        oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(250, audioContext.currentTime + 4);
        break;
      default:
        oscillator.frequency.setValueAtTime(220, audioContext.currentTime);
    }
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(isMuted ? 0 : volume * 0.1, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 10);
  };

  const stopAmbientSound = () => {
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSoundSelect = (sound) => {
    setSelectedSound(sound);
    if (!isPlaying) {
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <FontAwesomeIcon icon={faMusic} className="w-5 h-5 mr-2 text-purple-600" />
          Ambient Soundscape
        </h3>
        <div className="text-sm text-gray-600">
          {currentSoundscape.name}
        </div>
      </div>

      <div className="space-y-6">
        {/* Play/Pause Controls */}
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={handlePlayPause}
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
              isPlaying 
                ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                : 'bg-green-100 text-green-600 hover:bg-green-200'
            }`}
          >
            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} className="w-6 h-6" />
          </button>
          
          <button
            onClick={handleMuteToggle}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              isMuted 
                ? 'bg-gray-100 text-gray-600' 
                : 'bg-blue-100 text-blue-600'
            }`}
          >
            <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp} className="w-5 h-5" />
          </button>
        </div>

        {/* Volume Control */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Volume</span>
            <span className="text-sm text-gray-600">{Math.round(volume * 100)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={isMuted ? 0 : volume}
            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Sound Selection */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Available Sounds</h4>
          <div className="grid grid-cols-2 gap-2">
            {currentSoundscape.sounds.map((sound) => (
              <button
                key={sound}
                onClick={() => handleSoundSelect(sound)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  selectedSound === sound
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <FontAwesomeIcon 
                    icon={currentSoundscape.icon} 
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium capitalize">{sound}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Mood-based Recommendations */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2">Recommended for this book:</h4>
          <div className="text-sm text-gray-700">
            {mood.includes('mystery') && "Try 'mystical' or 'forest' sounds for an immersive experience"}
            {mood.includes('romance') && "Try 'rain' or 'ocean' sounds for a romantic atmosphere"}
            {mood.includes('adventure') && "Try 'wind' or 'forest' sounds for an adventurous feel"}
            {!mood.includes('mystery') && !mood.includes('romance') && !mood.includes('adventure') && 
              "Try 'rain' or 'ocean' sounds for a calming reading experience"}
          </div>
        </div>

        {/* Current Status */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-500' : 'bg-gray-400'}`}></div>
              <span className="text-sm text-gray-700">
                {isPlaying ? 'Playing' : 'Stopped'}
              </span>
            </div>
            <div className="text-sm text-gray-600">
              {selectedSound ? `Current: ${selectedSound}` : 'No sound selected'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
