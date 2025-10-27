import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faImage, 
  faSpinner, 
  faExpand, 
  faDownload,
  faEye
} from '@fortawesome/free-solid-svg-icons';

export function ProgressiveImageLoading({ 
  images = [], 
  title = '', 
  zoomable = true, 
  comparisonSlider = false,
  onImageChange,
  className = ""
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  const currentImage = images[currentImageIndex];

  useEffect(() => {
    if (currentImage) {
      setIsLoading(true);
      setImageLoaded(false);
    }
  }, [currentImage]);

  const handleImageLoad = () => {
    setIsLoading(false);
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setIsLoading(false);
  };

  const handleNextImage = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
      onImageChange?.(images[currentImageIndex + 1]);
    }
  };

  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
      onImageChange?.(images[currentImageIndex - 1]);
    }
  };

  const handleZoom = () => {
    if (zoomable) {
      setIsZoomed(!isZoomed);
      setZoomLevel(isZoomed ? 1 : 2);
    }
  };

  const handleDownload = () => {
    if (currentImage) {
      const link = document.createElement('a');
      link.href = currentImage.url;
      link.download = `${title}_${currentImage.type}.jpg`;
      link.click();
    }
  };

  if (!images.length) {
    return (
      <div className={`bg-gray-100 rounded-lg flex items-center justify-center h-64 ${className}`}>
        <div className="text-center text-gray-500">
          <FontAwesomeIcon icon={faImage} className="w-8 h-8 mx-auto mb-2" />
          <p>No images available</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Main Image Container */}
      <div 
        ref={containerRef}
        className="relative bg-gray-100 rounded-lg overflow-hidden"
        style={{ height: '400px' }}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <FontAwesomeIcon icon={faSpinner} className="w-8 h-8 text-gray-400 animate-spin" />
          </div>
        )}
        
        <img
          ref={imageRef}
          src={currentImage?.url}
          alt={currentImage?.type || title}
          className={`w-full h-full object-cover transition-all duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          } ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          onClick={handleZoom}
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'center'
          }}
        />

        {/* Image Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 hover:opacity-100 transition-opacity duration-300 flex space-x-2">
            {zoomable && (
              <button
                onClick={handleZoom}
                className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                title={isZoomed ? 'Zoom Out' : 'Zoom In'}
              >
                <FontAwesomeIcon icon={faExpand} className="w-4 h-4 text-gray-700" />
              </button>
            )}
            <button
              onClick={handleDownload}
              className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
              title="Download"
            >
              <FontAwesomeIcon icon={faDownload} className="w-4 h-4 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              disabled={currentImageIndex === 0}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-white bg-opacity-80 rounded-full shadow-lg hover:bg-opacity-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <FontAwesomeIcon icon={faEye} className="w-4 h-4 text-gray-700" />
            </button>
            <button
              onClick={handleNextImage}
              disabled={currentImageIndex === images.length - 1}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-white bg-opacity-80 rounded-full shadow-lg hover:bg-opacity-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <FontAwesomeIcon icon={faEye} className="w-4 h-4 text-gray-700" />
            </button>
          </>
        )}
      </div>

      {/* Image Thumbnails */}
      {images.length > 1 && (
        <div className="mt-4 flex space-x-2 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentImageIndex(index);
                onImageChange?.(image);
              }}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                index === currentImageIndex
                  ? 'border-blue-500 ring-2 ring-blue-200'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <img
                src={image.lowRes || image.url}
                alt={image.type}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Image Info */}
      <div className="mt-4 flex items-center justify-between">
        <div>
          <h4 className="font-medium text-gray-900">{title}</h4>
          <p className="text-sm text-gray-600">
            {currentImage?.type} • {currentImageIndex + 1} of {images.length}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            {isZoomed ? `${Math.round(zoomLevel * 100)}%` : '100%'}
          </span>
        </div>
      </div>
    </div>
  );
}
