import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Wifi, WifiOff } from 'lucide-react';
import { 
  faDownload, 
  faCheck,
  faSync,
  faBook
} from '@fortawesome/free-solid-svg-icons';

export function OfflineReading({ 
  cacheSampleChapter = true, 
  syncReadingProgress = true, 
  downloadBookData = true,
  onDownloadStart,
  className = ""
}) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [cachedItems, setCachedItems] = useState([]);

  const handleDownload = () => {
    setIsDownloading(true);
    setDownloadProgress(0);
    onDownloadStart?.();
    
    // Simulate download progress
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDownloading(false);
          setCachedItems(['Sample Chapter', 'Book Metadata', 'Reading Progress']);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <FontAwesomeIcon icon={faBook} className="w-5 h-5 mr-2 text-blue-600" />
          Offline Reading
        </h3>
        <div className="flex items-center space-x-2">
          {isOnline ? (
            <Wifi className="w-4 h-4 text-green-600" />
          ) : (
            <WifiOff className="w-4 h-4 text-red-600" />
          )}
          <span className="text-sm text-gray-600">
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {/* Download Section */}
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-gray-900">Download for Offline Reading</h4>
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              <FontAwesomeIcon icon={isDownloading ? faSync : faDownload} className="w-4 h-4" />
              <span>{isDownloading ? 'Downloading...' : 'Download'}</span>
            </button>
          </div>
          
          {isDownloading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Downloading...</span>
                <span>{downloadProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${downloadProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Cached Items */}
        {cachedItems.length > 0 && (
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Cached Content</h4>
            <div className="space-y-2">
              {cachedItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <FontAwesomeIcon icon={faCheck} className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                  <span className="text-xs text-green-600">Ready</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Settings */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Offline Settings</h4>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-700">Cache Sample Chapter</div>
              <div className="text-xs text-gray-600">Download first chapter for offline reading</div>
            </div>
            <div className={`w-4 h-4 rounded-full ${cacheSampleChapter ? 'bg-green-500' : 'bg-gray-300'}`} />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-700">Sync Reading Progress</div>
              <div className="text-xs text-gray-600">Sync progress when back online</div>
            </div>
            <div className={`w-4 h-4 rounded-full ${syncReadingProgress ? 'bg-green-500' : 'bg-gray-300'}`} />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-700">Download Book Data</div>
              <div className="text-xs text-gray-600">Download book metadata and images</div>
            </div>
            <div className={`w-4 h-4 rounded-full ${downloadBookData ? 'bg-green-500' : 'bg-gray-300'}`} />
          </div>
        </div>

        {/* Offline Status */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            {isOnline ? (
              <Wifi className="w-4 h-4 text-green-600" />
            ) : (
              <WifiOff className="w-4 h-4 text-red-600" />
            )}
            <span className="font-medium text-gray-900">
              {isOnline ? 'Online Mode' : 'Offline Mode'}
            </span>
          </div>
          <p className="text-sm text-gray-600">
            {isOnline 
              ? 'You can download content for offline reading' 
              : 'You are currently offline. Cached content is available for reading.'
            }
          </p>
        </div>
      </div>
    </div>
  );
}
