import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChevronLeft, 
  faChevronRight, 
  faExpand, 
  faCompress,
  faRotate,
  faDownload,
  faShare
} from '@fortawesome/free-solid-svg-icons';

export function AdvancedImageGallery({ images, title, onImageChange }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  
  const imageRef = useRef(null);
  const galleryRef = useRef(null);

  // Generate multiple image variants for demonstration
  const imageVariants = images || [
    { url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=1200&fit=crop', type: 'cover' },
    { url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=1200&fit=crop', type: 'back' },
    { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1200&fit=crop', type: 'spine' },
    { url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&h=1200&fit=crop', type: 'preview' }
  ];

  const currentImage = imageVariants[currentIndex];

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % imageVariants.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + imageVariants.length) % imageVariants.length);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
    if (!isZoomed) {
      setScale(2);
    } else {
      setScale(1);
      setImagePosition({ x: 0, y: 0 });
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      galleryRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const rotateImage = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleMouseDown = (e) => {
    if (!isZoomed) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - imagePosition.x, y: e.clientY - imagePosition.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !isZoomed) return;
    setImagePosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e) => {
    if (!isZoomed) return;
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setScale(prev => Math.max(0.5, Math.min(5, prev + delta)));
  };

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = currentImage.url;
    link.download = `${title}-${currentImage.type}.jpg`;
    link.click();
  };

  const shareImage = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${title} - ${currentImage.type}`,
          text: `Check out this ${currentImage.type} of ${title}`,
          url: currentImage.url
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(currentImage.url);
    }
  };

  useEffect(() => {
    if (onImageChange) {
      onImageChange(currentImage);
    }
  }, [currentIndex, onImageChange, currentImage]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isFullscreen) {
        switch (e.key) {
          case 'ArrowLeft':
            prevImage();
            break;
          case 'ArrowRight':
            nextImage();
            break;
          case 'Escape':
            if (isFullscreen) {
              document.exitFullscreen();
              setIsFullscreen(false);
            }
            break;
          case ' ':
            e.preventDefault();
            toggleZoom();
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  return (
    <div 
      ref={galleryRef}
      className={`relative bg-white rounded-lg shadow-lg overflow-hidden ${
        isFullscreen ? 'fixed inset-0 z-50' : ''
      }`}
    >
      {/* Main Image Container */}
      <div 
        className="relative aspect-[3/4] bg-gray-100 cursor-zoom-in"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        onClick={toggleZoom}
      >
        <img
          ref={imageRef}
          src={currentImage.url}
          alt={`${title} - ${currentImage.type}`}
          className={`w-full h-full object-cover transition-all duration-300 ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{
            transform: `translate(${imagePosition.x}px, ${imagePosition.y}px) scale(${scale}) rotate(${rotation}deg)`,
            transformOrigin: 'center center'
          }}
        />

        {/* Image Overlay Controls */}
        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 hover:opacity-100 transition-opacity duration-300 flex space-x-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleZoom();
              }}
              className="bg-white bg-opacity-90 hover:bg-opacity-100 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
            >
              <FontAwesomeIcon 
                icon={isZoomed ? faCompress : faExpand} 
                className="w-5 h-5 text-gray-700" 
              />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                rotateImage();
              }}
              className="bg-white bg-opacity-90 hover:bg-opacity-100 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
            >
              <FontAwesomeIcon icon={faRotate} className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            prevImage();
          }}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
        >
          <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4 text-gray-700" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            nextImage();
          }}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
        >
          <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4 text-gray-700" />
        </button>

        {/* Image Counter */}
        <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
          {currentIndex + 1} / {imageVariants.length}
        </div>

        {/* Zoom Indicator */}
        {isZoomed && (
          <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
            {Math.round(scale * 100)}%
          </div>
        )}
      </div>

      {/* Thumbnail Strip */}
      <div className="p-4 bg-gray-50">
        <div className="flex space-x-2 overflow-x-auto">
          {imageVariants.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`flex-shrink-0 w-16 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                currentIndex === index
                  ? 'border-blue-500 shadow-lg'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <img
                src={image.url}
                alt={`${title} - ${image.type}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mt-4">
          <button
            onClick={downloadImage}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
          >
            <FontAwesomeIcon icon={faDownload} className="w-4 h-4" />
            <span className="text-sm">Download</span>
          </button>
          <button
            onClick={shareImage}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
          >
            <FontAwesomeIcon icon={faShare} className="w-4 h-4" />
            <span className="text-sm">Share</span>
          </button>
          <button
            onClick={toggleFullscreen}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
          >
            <FontAwesomeIcon icon={faExpand} className="w-4 h-4" />
            <span className="text-sm">Fullscreen</span>
          </button>
        </div>
      </div>

      {/* Keyboard Shortcuts Help */}
      {isFullscreen && (
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-75 text-white p-3 rounded-lg text-sm">
          <div className="space-y-1">
            <div>← → Navigate</div>
            <div>Space: Zoom</div>
            <div>Esc: Exit</div>
          </div>
        </div>
      )}
    </div>
  );
}
