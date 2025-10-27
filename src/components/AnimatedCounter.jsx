import { useState, useEffect, useRef } from 'react';

export function AnimatedCounter({ 
  end, 
  duration = 2000, 
  start = 0, 
  suffix = '', 
  prefix = '',
  className = ''
}) {
  const [count, setCount] = useState(start);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(start + (end - start) * easeOutQuart);
      
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isVisible, end, start, duration]);

  return (
    <span ref={counterRef} className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

export function AnimatedStat({ 
  number, 
  label, 
  icon: Icon,
  delay = 0,
  className = ''
}) {
  return (
    <div 
      className={`hero-stat ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {Icon && (
        <div className="flex justify-center mb-2">
          <Icon className="w-6 h-6 text-yellow-400" />
        </div>
      )}
      <span className="hero-stat-number">
        <AnimatedCounter end={number} />
      </span>
      <span className="hero-stat-label">{label}</span>
    </div>
  );
}
