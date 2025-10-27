import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faImage, 
  faFileAlt, 
  faLightbulb, 
  faEye,
  faDownload,
  faExpand
} from '@fortawesome/free-solid-svg-icons';

export function BehindTheScenes({ 
  manuscriptImages = [], 
  editorialNotes = [], 
  inspirationSources = [],
  className = ""
}) {
  const [activeTab, setActiveTab] = useState('manuscript');
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className={`bg-white rounded-lg shadow-lg ${className}`}>
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <FontAwesomeIcon icon={faLightbulb} className="w-5 h-5 mr-2 text-blue-600" />
            Behind the Scenes
          </h3>
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab('manuscript')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'manuscript' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Manuscript
            </button>
            <button
              onClick={() => setActiveTab('editorial')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'editorial' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Editorial
            </button>
            <button
              onClick={() => setActiveTab('inspiration')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'inspiration' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Inspiration
            </button>
          </div>
        </div>
      </div>

      <div className="p-4">
        {activeTab === 'manuscript' && (
          <div className="space-y-4">
            {manuscriptImages.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {manuscriptImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image.url}
                      alt={image.caption}
                      className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => setSelectedImage(image)}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                      <FontAwesomeIcon icon={faExpand} className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-700">{image.caption}</p>
                      <p className="text-xs text-gray-500">{image.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <FontAwesomeIcon icon={faImage} className="w-8 h-8 mx-auto mb-2" />
                <p>No manuscript images available</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'editorial' && (
          <div className="space-y-4">
            {editorialNotes.length > 0 ? (
              editorialNotes.map((note, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{note.title}</h4>
                    <span className="text-sm text-gray-600">{note.date}</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">{note.content}</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                      {note.type}
                    </span>
                    <span className="text-xs text-gray-600">by {note.editor}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-8">
                <FontAwesomeIcon icon={faFileAlt} className="w-8 h-8 mx-auto mb-2" />
                <p>No editorial notes available</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'inspiration' && (
          <div className="space-y-4">
            {inspirationSources.length > 0 ? (
              inspirationSources.map((source, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">{source.title}</h4>
                  <p className="text-sm text-gray-700 mb-3">{source.description}</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      {source.category}
                    </span>
                    <span className="text-xs text-gray-600">{source.location}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-8">
                <FontAwesomeIcon icon={faLightbulb} className="w-8 h-8 mx-auto mb-2" />
                <p>No inspiration sources available</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative max-w-4xl max-h-full mx-4">
            <img
              src={selectedImage.url}
              alt={selectedImage.caption}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <div className="absolute top-4 right-4 flex space-x-2">
              <button
                onClick={() => setSelectedImage(null)}
                className="p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all"
              >
                <FontAwesomeIcon icon={faEye} className="w-4 h-4 text-gray-700" />
              </button>
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-90 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900">{selectedImage.caption}</h4>
              <p className="text-sm text-gray-600">{selectedImage.date}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
