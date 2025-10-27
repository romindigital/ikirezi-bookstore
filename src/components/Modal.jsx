import { useEffect, useRef } from 'react';
import { X, AlertCircle, CheckCircle, Info, AlertTriangle, ShoppingCart, BookOpen } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md',
  type = 'default',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true
}) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      
      if (closeOnEscape) {
        const handleEscape = (e) => {
          if (e.key === 'Escape') {
            onClose();
          }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
      }
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen, closeOnEscape, onClose]);

  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'max-w-md';
      case 'md':
        return 'max-w-lg';
      case 'lg':
        return 'max-w-2xl';
      case 'xl':
        return 'max-w-4xl';
      case 'full':
        return 'max-w-7xl';
      default:
        return 'max-w-lg';
    }
  };

  const getTypeIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-6 h-6 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-6 h-6 text-yellow-500" />;
      case 'info':
        return <Info className="w-6 h-6 text-blue-500" />;
      default:
        return null;
    }
  };

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'border-l-4 border-green-500';
      case 'error':
        return 'border-l-4 border-red-500';
      case 'warning':
        return 'border-l-4 border-yellow-500';
      case 'info':
        return 'border-l-4 border-blue-500';
      default:
        return '';
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      <div 
        ref={modalRef}
        className={`w-full ${getSizeClasses()} desktop-card premium-shadow-xl transform transition-all duration-300 ease-out scale-in ${getTypeStyles()}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              {getTypeIcon()}
              {title && (
                <h2 id="modal-title" className="desktop-text-2xl font-semibold text-gray-900">
                  {title}
                </h2>
              )}
            </div>
            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors desktop-hover-scale rounded-lg hover:bg-gray-100"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

// Specialized Modal Components
export function ConfirmModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Confirm Action", 
  message, 
  confirmText = "Confirm", 
  cancelText = "Cancel",
  type = "warning"
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm" type={type}>
      <div className="space-y-4">
        <p className="desktop-text-lg text-gray-600">{message}</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="desktop-button bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`desktop-button ${
              type === 'error' 
                ? 'bg-red-600 text-white hover:bg-red-700' 
                : type === 'success'
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export function BookPreviewModal({ 
  isOpen, 
  onClose, 
  book 
}) {
  const { addToCart, isInCart, getItemQuantity } = useCart();
  const navigate = useNavigate();

  if (!book) return null;

  const discount = book.discountPercent ? {
    hasDiscount: true,
    discountPercent: book.discountPercent,
    finalPrice: book.price * (1 - book.discountPercent / 100),
    discountAmount: book.price - (book.price * (1 - book.discountPercent / 100))
  } : { hasDiscount: false };

  const isInCartItem = isInCart(book.id);
  const cartQuantity = getItemQuantity(book.id);

  const handleAddToCart = () => {
    addToCart(book);
    onClose();
  };

  const handleViewDetails = () => {
    navigate(`/book/${book.id}`);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="" size="xl">
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Book Image */}
          <div className="lg:col-span-1">
            <div className="relative">
              <img
                src={book.image || '/api/placeholder/300/400'}
                alt={book.title}
                className="w-full h-80 lg:h-96 object-cover rounded-xl shadow-lg"
              />
              {discount.hasDiscount && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  -{discount.discountPercent}%
                </div>
              )}
            </div>
          </div>

          {/* Book Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title and Author */}
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-gray-900 leading-tight">
                {book.title}
              </h2>
              <p className="text-xl text-gray-600">
                by <span className="font-semibold">{book.author}</span>
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-2xl ${
                      i < Math.floor(book.rating || 0) 
                        ? 'text-yellow-400' 
                        : 'text-gray-300'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-lg text-gray-600 font-medium">
                {book.rating ? book.rating.toFixed(1) : '0.0'}
              </span>
              <span className="text-gray-500">
                ({book.reviewCount || 0} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">Price</h3>
              <div className="flex items-center space-x-4">
                {discount.hasDiscount ? (
                  <>
                    <span className="text-3xl font-bold text-gray-900">
                      ${discount.finalPrice.toFixed(2)}
                    </span>
                    <span className="text-xl text-gray-500 line-through">
                      ${book.price.toFixed(2)}
                    </span>
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                      Save ${discount.discountAmount.toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-blue-600">
                    ${book.price.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            {/* Book Info Grid */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <span className="font-semibold text-gray-700">Publisher:</span>
                <p className="text-gray-600">{book.publisher || 'N/A'}</p>
              </div>
              <div className="space-y-1">
                <span className="font-semibold text-gray-700">Published:</span>
                <p className="text-gray-600">{book.publishedYear || 'N/A'}</p>
              </div>
              <div className="space-y-1">
                <span className="font-semibold text-gray-700">Pages:</span>
                <p className="text-gray-600">{book.pages || 'N/A'}</p>
              </div>
              <div className="space-y-1">
                <span className="font-semibold text-gray-700">Language:</span>
                <p className="text-gray-600">{book.language || 'English'}</p>
              </div>
              <div className="space-y-1">
                <span className="font-semibold text-gray-700">Format:</span>
                <p className="text-gray-600">{book.format || 'Paperback'}</p>
              </div>
              <div className="space-y-1">
                <span className="font-semibold text-gray-700">Stock:</span>
                <p className={`${book.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {book.stock > 0 ? `${book.stock} available` : 'Out of stock'}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Description</h3>
              <p className="text-gray-700 leading-relaxed">
                {book.description || "No description available for this book."}
              </p>
            </div>

            {/* Categories */}
            {book.categories && book.categories.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {book.categories.map((category, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4">
              <button
                className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 ${
                  isInCartItem
                    ? 'bg-green-100 text-green-800 border border-green-300'
                    : book.stock === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
                onClick={handleAddToCart}
                disabled={isInCartItem || book.stock === 0}
              >
                <ShoppingCart className="w-5 h-5" />
                <span>
                  {isInCartItem 
                    ? `In Cart (${cartQuantity})` 
                    : book.stock === 0 
                    ? 'Out of Stock' 
                    : 'Add to Cart'
                  }
                </span>
              </button>
              <button
                className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
                onClick={handleViewDetails}
              >
                <BookOpen className="w-5 h-5" />
                <span>View Details</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
