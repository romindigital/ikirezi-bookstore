import { useState } from 'react';
import { 
  BookOpen, 
  Smartphone, 
  Headphones, 
  Download,
  Check,
  Clock,
  Wifi,
  WifiOff
} from 'lucide-react';

export function FormatSelector({ 
  bookId, 
  formats = [], 
  onFormatSelect,
  className = ""
}) {
  const [selectedFormat, setSelectedFormat] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);

  // Default formats if none provided
  const defaultFormats = [
    {
      id: 'hardcover',
      name: 'Hardcover',
      icon: BookOpen,
      price: 24.99,
      originalPrice: 29.99,
      availability: 'in-stock',
      description: 'Physical hardcover edition',
      features: ['Premium quality', 'Collectible', 'No battery needed'],
      estimatedDelivery: '2-3 business days',
      color: 'blue'
    },
    {
      id: 'paperback',
      name: 'Paperback',
      icon: BookOpen,
      price: 14.99,
      originalPrice: 19.99,
      availability: 'in-stock',
      description: 'Soft cover edition',
      features: ['Lightweight', 'Portable', 'Affordable'],
      estimatedDelivery: '1-2 business days',
      color: 'green'
    },
    {
      id: 'ebook',
      name: 'E-Book',
      icon: Smartphone,
      price: 9.99,
      originalPrice: 14.99,
      availability: 'instant',
      description: 'Digital version for any device',
      features: ['Instant download', 'Adjustable text size', 'Searchable'],
      estimatedDelivery: 'Instant',
      color: 'purple'
    },
    {
      id: 'audiobook',
      name: 'Audiobook',
      icon: Headphones,
      price: 19.99,
      originalPrice: 24.99,
      availability: 'instant',
      description: 'Narrated audio version',
      features: ['Professional narration', 'Hands-free', 'Multi-device sync'],
      estimatedDelivery: 'Instant',
      color: 'orange'
    }
  ];

  const formatsToUse = formats.length > 0 ? formats : defaultFormats;

  const handleFormatSelect = async (format) => {
    setSelectedFormat(format);
    setIsDownloading(true);
    
    // Simulate download/processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsDownloading(false);
    if (onFormatSelect) {
      onFormatSelect(format);
    }
  };

  const getAvailabilityIcon = (availability) => {
    switch (availability) {
      case 'instant':
        return <Wifi className="w-4 h-4 text-green-500" />;
      case 'in-stock':
        return <Check className="w-4 h-4 text-green-500" />;
      case 'out-of-stock':
        return <WifiOff className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getAvailabilityText = (availability) => {
    switch (availability) {
      case 'instant':
        return 'Available instantly';
      case 'in-stock':
        return 'In stock';
      case 'out-of-stock':
        return 'Out of stock';
      default:
        return 'Check availability';
    }
  };

  const getColorClasses = (color) => {
    const colorMap = {
      blue: 'border-blue-200 bg-blue-50 text-blue-700',
      green: 'border-green-200 bg-green-50 text-green-700',
      purple: 'border-purple-200 bg-purple-50 text-purple-700',
      orange: 'border-orange-200 bg-orange-50 text-orange-700'
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className={`${className}`}>
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Format</h3>
        <p className="text-gray-600">Select the format that works best for your reading style</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {formatsToUse.map((format) => {
          const Icon = format.icon;
          const isSelected = selectedFormat?.id === format.id;
          const isUnavailable = format.availability === 'out-of-stock';
          
          return (
            <div
              key={format.id}
              className={`relative border-2 rounded-xl p-6 transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 shadow-lg'
                  : isUnavailable
                  ? 'border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
              }`}
              onClick={() => !isUnavailable && handleFormatSelect(format)}
            >
              {/* Selection indicator */}
              {isSelected && (
                <div className="absolute top-3 right-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                </div>
              )}

              {/* Format header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg ${getColorClasses(format.color)}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{format.name}</h4>
                    <p className="text-sm text-gray-600">{format.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm">
                    {getAvailabilityIcon(format.availability)}
                    <span className={isUnavailable ? 'text-red-500' : 'text-green-600'}>
                      {getAvailabilityText(format.availability)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-gray-900">${format.price}</span>
                  {format.originalPrice > format.price && (
                    <span className="text-lg text-gray-500 line-through">
                      ${format.originalPrice}
                    </span>
                  )}
                  {format.originalPrice > format.price && (
                    <span className="bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded">
                      Save ${(format.originalPrice - format.price).toFixed(2)}
                    </span>
                  )}
                </div>
              </div>

              {/* Features */}
              <div className="mb-4">
                <h5 className="text-sm font-semibold text-gray-900 mb-2">Features:</h5>
                <ul className="space-y-1">
                  {format.features.map((feature, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Delivery info */}
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{format.estimatedDelivery}</span>
                </div>
                {format.availability === 'instant' && (
                  <div className="flex items-center gap-1 text-green-600">
                    <Download className="w-4 h-4" />
                    <span>Instant download</span>
                  </div>
                )}
              </div>

              {/* Download button */}
              {isSelected && isDownloading && (
                <div className="absolute inset-0 bg-white bg-opacity-90 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                    <p className="text-sm text-gray-600">Preparing your {format.name.toLowerCase()}...</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected format summary */}
      {selectedFormat && !isDownloading && (
        <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-gray-900 mb-1">
                {selectedFormat.name} Selected
              </h4>
              <p className="text-gray-600">
                You've chosen the {selectedFormat.name.toLowerCase()} format for ${selectedFormat.price}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">${selectedFormat.price}</div>
              <div className="text-sm text-gray-600">
                {selectedFormat.estimatedDelivery}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}