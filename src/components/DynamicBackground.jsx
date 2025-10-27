import { useState, useEffect } from 'react';

export function DynamicBackground({ 
  dominantColor = '#6366f1', 
  mood = 'light', 
  adaptiveToContent = false, 
  intensity = 0.1,
  className = ""
}) {
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const getGradientColors = () => {
    const baseColor = dominantColor;
    const isDark = mood === 'dark';
    
    if (isDark) {
      return {
        primary: baseColor,
        secondary: '#1f2937',
        tertiary: '#111827'
      };
    }
    
    return {
      primary: baseColor,
      secondary: '#f8fafc',
      tertiary: '#ffffff'
    };
  };

  const colors = getGradientColors();

  return (
    <div 
      className={`fixed inset-0 -z-10 ${className}`}
      style={{
        background: `
          radial-gradient(circle at ${20 + Math.sin(animationPhase * Math.PI / 180) * 10}% ${30 + Math.cos(animationPhase * Math.PI / 180) * 10}%, ${colors.primary}${Math.floor(intensity * 255).toString(16).padStart(2, '0')} 0%, transparent 50%),
          linear-gradient(135deg, ${colors.secondary} 0%, ${colors.tertiary} 100%)
        `,
        animation: 'pulse 4s ease-in-out infinite'
      }}
    >
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: dominantColor,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
}
