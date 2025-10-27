import { useEffect, useRef, useState } from 'react';

export function useTouchGestures({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  onPinch,
  onTap,
  threshold = 50,
  preventDefault = true
}) {
  const elementRef = useRef(null);
  const startPos = useRef({ x: 0, y: 0 });
  const startDistance = useRef(0);
  const isDragging = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleTouchStart = (e) => {
      if (preventDefault) e.preventDefault();
      
      const touch = e.touches[0];
      startPos.current = { x: touch.clientX, y: touch.clientY };
      isDragging.current = false;

      // Handle pinch gestures
      if (e.touches.length === 2) {
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        startDistance.current = Math.sqrt(
          Math.pow(touch2.clientX - touch1.clientX, 2) +
          Math.pow(touch2.clientY - touch1.clientY, 2)
        );
      }
    };

    const handleTouchMove = (e) => {
      if (preventDefault) e.preventDefault();
      
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        const deltaX = touch.clientX - startPos.current.x;
        const deltaY = touch.clientY - startPos.current.y;
        
        if (Math.abs(deltaX) > threshold || Math.abs(deltaY) > threshold) {
          isDragging.current = true;
        }
      } else if (e.touches.length === 2 && onPinch) {
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const currentDistance = Math.sqrt(
          Math.pow(touch2.clientX - touch1.clientX, 2) +
          Math.pow(touch2.clientY - touch1.clientY, 2)
        );
        
        const scale = currentDistance / startDistance.current;
        onPinch(scale);
      }
    };

    const handleTouchEnd = (e) => {
      if (preventDefault) e.preventDefault();
      
      if (e.touches.length === 0) {
        if (isDragging.current) {
          const touch = e.changedTouches[0];
          const deltaX = touch.clientX - startPos.current.x;
          const deltaY = touch.clientY - startPos.current.y;
          
          if (Math.abs(deltaX) > Math.abs(deltaY)) {
            // Horizontal swipe
            if (deltaX > threshold && onSwipeRight) {
              onSwipeRight();
            } else if (deltaX < -threshold && onSwipeLeft) {
              onSwipeLeft();
            }
          } else {
            // Vertical swipe
            if (deltaY > threshold && onSwipeDown) {
              onSwipeDown();
            } else if (deltaY < -threshold && onSwipeUp) {
              onSwipeUp();
            }
          }
        } else if (onTap) {
          // Tap gesture
          onTap();
        }
      }
    };

    // Add passive: false to ensure preventDefault works
    element.addEventListener('touchstart', handleTouchStart, { passive: false });
    element.addEventListener('touchmove', handleTouchMove, { passive: false });
    element.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, onPinch, onTap, threshold, preventDefault]);

  return elementRef;
}

// Hook for mobile-specific features
export function useMobileDetection() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      setIsTouch(hasTouch);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return { isMobile, isTablet, isTouch };
}

// Mobile-optimized carousel component
export function MobileCarousel({ children, onSwipeLeft, onSwipeRight }) {
  const carouselRef = useTouchGestures({
    onSwipeLeft,
    onSwipeRight,
    threshold: 50
  });

  return (
    <div
      ref={carouselRef}
      className="overflow-hidden touch-pan-x"
      style={{ touchAction: 'pan-x' }}
    >
      {children}
    </div>
  );
}

// Mobile-optimized button with haptic feedback
export function MobileButton({ 
  children, 
  onClick, 
  hapticFeedback = true,
  className = "",
  ...props 
}) {
  const handleClick = (e) => {
    if (hapticFeedback && 'vibrate' in navigator) {
      navigator.vibrate(50); // Short vibration
    }
    onClick?.(e);
  };

  return (
    <button
      {...props}
      onClick={handleClick}
      className={`touch-manipulation select-none ${className}`}
      style={{ 
        WebkitTapHighlightColor: 'transparent',
        touchAction: 'manipulation'
      }}
    >
      {children}
    </button>
  );
}
