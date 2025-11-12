import { Loader2, BookOpen, Sparkles } from 'lucide-react';

export function LoadingSpinner({ 
  size = 'md', 
  text = 'Loading...', 
  className = '',
  variant = 'default',
  showProgress = false,
  progress = 0
}) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  const getVariantIcon = () => {
    switch (variant) {
      case 'book':
        return <BookOpen className={`animate-pulse text-green-600 ${sizeClasses[size]}`} />;
      case 'sparkles':
        return <Sparkles className={`animate-pulse text-green-600 ${sizeClasses[size]}`} />;
      default:
        return <Loader2 className={`animate-spin text-green-600 ${sizeClasses[size]}`} />;
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'book':
        return 'bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200';
      case 'sparkles':
        return 'bg-gradient-to-br from-purple-50 to-pink-100 border border-purple-200';
      default:
        return 'bg-white border border-gray-200';
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center space-y-6 p-8 rounded-2xl ${getVariantStyles()} ${className}`}>
      {/* Animated Icon */}
      <div className="relative">
        {getVariantIcon()}
        {variant === 'sparkles' && (
          <div className="absolute -top-2 -right-2 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
        )}
      </div>

      {/* Progress Bar */}
      {showProgress && (
        <div className="w-full max-w-xs">
          <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-center text-sm text-gray-600 mt-2">{progress}%</p>
        </div>
      )}

      {/* Loading Text */}
      {text && (
        <div className="text-center">
          <p className={`text-gray-700 font-medium ${textSizeClasses[size]} mb-2`}>
            {text}
          </p>
          {variant === 'book' && (
            <p className="text-sm text-gray-500">
              Discovering amazing books...
            </p>
          )}
          {variant === 'sparkles' && (
            <p className="text-sm text-gray-500">
              Adding some magic...
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <LoadingSpinner size="xl" text="Loading page..." variant="book" />
    </div>
  );
}

export function ButtonLoader({ size = 'sm' }) {
  return <LoadingSpinner size={size} text="" className="inline-flex" />;
}

// Advanced Loading States
export function SkeletonLoader({ lines = 3, className = '' }) {
  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div key={index} className="space-y-2">
          <div className="h-4 bg-gray-200 rounded shimmer w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded shimmer w-1/2"></div>
        </div>
      ))}
    </div>
  );
}

export function CardSkeleton({ count = 6, className = '' }) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 desktop-grid-6 desktop-gap ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="desktop-card">
          <div className="h-72 bg-gray-200 rounded-lg shimmer mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded shimmer"></div>
            <div className="h-3 bg-gray-200 rounded shimmer w-2/3"></div>
            <div className="h-3 bg-gray-200 rounded shimmer w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
