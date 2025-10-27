import { Star } from 'lucide-react';

export function RatingStars({ rating, size = 'md', showNumber = false, interactive = false, onRatingChange }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const handleStarClick = (starRating) => {
    if (interactive && onRatingChange) {
      onRatingChange(starRating);
    }
  };

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = star <= Math.round(rating);
        const isHalfFilled = star - 0.5 <= rating && star > rating;
        
        return (
          <button
            key={star}
            type="button"
            onClick={() => handleStarClick(star)}
            disabled={!interactive}
            className={`${sizeClasses[size]} ${
              interactive 
                ? 'hover:scale-110 transition-transform cursor-pointer' 
                : 'cursor-default'
            }`}
          >
            <Star
              className={`${sizeClasses[size]} ${
                isFilled || isHalfFilled
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
            />
            {isHalfFilled && (
              <div className="absolute inset-0 overflow-hidden w-1/2">
                <Star className={`${sizeClasses[size]} text-yellow-400 fill-current`} />
              </div>
            )}
          </button>
        );
      })}
      {showNumber && (
        <span className="ml-1 text-sm text-gray-600">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
