import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTimes, 
  faExpand, 
  faCompress, 
  faRotateLeft,
  faCamera,
  faShare,
  faDownload
} from '@fortawesome/free-solid-svg-icons';

export function ARBookPreview({ 
  book, 
  onClose, 
  virtualShelfPlacement = true, 
  bookSizeVisualization = true,
  className = ""
}) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const [arMode, setArMode] = useState('preview'); // 'preview', 'shelf', 'size'
  
  const arContainerRef = useRef(null);
  const bookRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      
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

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, lastMousePos]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const newScale = Math.max(0.5, Math.min(3, scale + e.deltaY * -0.01));
    setScale(newScale);
  };

  const handleScreenshot = () => {
    // Simulate screenshot functionality
    console.log('Screenshot taken');
  };

  const handleShare = () => {
    // Simulate share functionality
    console.log('AR view shared');
  };

  const handleDownload = () => {
    // Simulate download functionality
    console.log('AR model downloaded');
  };

  const resetView = () => {
    setRotation({ x: 0, y: 0 });
    setScale(1);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center ${className}`}>
      <div className={`relative bg-white rounded-lg shadow-2xl ${isFullscreen ? 'w-full h-full' : 'w-4/5 h-4/5 max-w-6xl'}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <h3 className="text-lg font-semibold text-gray-900">AR Book Preview</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setArMode('preview')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  arMode === 'preview' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Preview
              </button>
              <button
                onClick={() => setArMode('shelf')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  arMode === 'shelf' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Shelf
              </button>
              <button
                onClick={() => setArMode('size')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  arMode === 'size' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Size
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleScreenshot}
              className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
              title="Take Screenshot"
            >
              <FontAwesomeIcon icon={faCamera} className="w-4 h-4" />
            </button>
            <button
              onClick={handleShare}
              className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
              title="Share"
            >
              <FontAwesomeIcon icon={faShare} className="w-4 h-4" />
            </button>
            <button
              onClick={handleDownload}
              className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
              title="Download"
            >
              <FontAwesomeIcon icon={faDownload} className="w-4 h-4" />
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              <FontAwesomeIcon icon={isFullscreen ? faCompress : faExpand} className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
              title="Close"
            >
              <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* AR Content */}
        <div className="flex-1 p-6">
          <div 
            ref={arContainerRef}
            className="relative w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg overflow-hidden"
            onMouseDown={handleMouseDown}
            onWheel={handleWheel}
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          >
            {/* 3D Book Model */}
            <div
              ref={bookRef}
              className="absolute inset-0 flex items-center justify-center"
              style={{
                transform: `scale(${scale}) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                transformStyle: 'preserve-3d'
              }}
            >
              <div className="relative w-64 h-96">
                {/* Book Cover */}
                <div 
                  className="absolute inset-0 bg-white rounded-lg shadow-2xl border border-gray-200"
                  style={{
                    transform: 'translateZ(20px)',
                    backfaceVisibility: 'hidden'
                  }}
                >
                  <img 
                    src={book.image} 
                    alt={book.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                {/* Book Back Cover */}
                <div 
                  className="absolute inset-0 bg-white rounded-lg shadow-2xl border border-gray-200"
                  style={{
                    transform: 'translateZ(-20px) rotateY(180deg)',
                    backfaceVisibility: 'hidden'
                  }}
                >
                  <img 
                    src={book.backCoverImage || book.image} 
                    alt={`${book.title} back cover`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                {/* Book Spine */}
                <div 
                  className="absolute left-0 top-0 w-4 h-full bg-gradient-to-b from-gray-800 to-gray-600 rounded-l-lg"
                  style={{
                    transform: 'translateZ(-10px) rotateY(-90deg)',
                    transformOrigin: 'left center'
                  }}
                />
              </div>
            </div>

            {/* AR Overlay Elements */}
            {arMode === 'shelf' && (
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
                <h4 className="font-semibold text-gray-900 mb-2">Virtual Shelf</h4>
                <p className="text-sm text-gray-600">Place this book on your virtual shelf</p>
              </div>
            )}

            {arMode === 'size' && bookSizeVisualization && (
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
                <h4 className="font-semibold text-gray-900 mb-2">Size Reference</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>Height: {book.dimensions?.height || '8.5"'} inches</div>
                  <div>Width: {book.dimensions?.width || '5.5"'} inches</div>
                  <div>Thickness: {book.dimensions?.thickness || '1.2"'} inches</div>
                </div>
              </div>
            )}

            {/* Instructions */}
            <div className="absolute bottom-4 left-4 right-4 bg-black/80 text-white rounded-lg p-3">
              <div className="text-sm">
                <div className="mb-2">AR Controls:</div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>• Drag to rotate</div>
                  <div>• Scroll to zoom</div>
                  <div>• Click to interact</div>
                  <div>• Use mode buttons above</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between p-4 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <button
              onClick={resetView}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2"
            >
              <FontAwesomeIcon icon={faRotateLeft} className="w-4 h-4" />
              <span>Reset View</span>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Scale: {Math.round(scale * 100)}%</span>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.1"
              value={scale}
              onChange={(e) => setScale(parseFloat(e.target.value))}
              className="w-20"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
