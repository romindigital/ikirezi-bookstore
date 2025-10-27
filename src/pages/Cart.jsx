import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Trash2, Plus, Minus, ShoppingBag, CreditCard, Lock,
  Truck, Tag, Shield
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';
import { PaymentMethods } from '../components/PaymentMethods';
import { PaymentProgress } from '../components/PaymentProgress';

export function Cart() {
  const { items, total, itemCount, updateQuantity, removeFromCart, clearCart, getCartTotal } = useCart();
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);

  const handleQuantityChange = async (bookId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setIsUpdating(true);
    try {
      updateQuantity(bookId, newQuantity);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300));
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemoveItem = async (bookId) => {
    setIsUpdating(true);
    try {
      removeFromCart(bookId);
      await new Promise(resolve => setTimeout(resolve, 300));
    } finally {
      setIsUpdating(false);
    }
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart();
    }
  };

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handleProceedToCheckout = () => {
    if (!selectedPaymentMethod) {
      setShowPaymentMethods(true);
      return;
    }
    // Navigate to checkout with selected payment method
    window.location.href = `/checkout?payment=${selectedPaymentMethod}`;
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Looks like you haven't added any books to your cart yet.</p>
            <Link
              to="/books"
              className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors inline-flex items-center"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const cartTotal = getCartTotal();
  const shippingCost = cartTotal.subtotal >= 50 ? 0 : 9.99;
  const finalTotal = cartTotal.total + shippingCost;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Indicator */}
        <PaymentProgress currentStep={1} className="mb-8" />
        
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
            <p className="text-gray-600">Review your items and proceed to checkout</p>
          </div>
          <button
            onClick={handleClearCart}
            className="text-red-600 hover:text-red-700 font-medium flex items-center px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start space-x-4">
                  {/* Book Image */}
                  <Link to={`/book/${item.id}`} className="flex-shrink-0 group">
                    <div className="relative overflow-hidden rounded-xl">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-24 h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                    </div>
                  </Link>

                  {/* Book Details */}
                  <div className="flex-1 min-w-0">
                    <Link to={`/book/${item.id}`}>
                      <h3 className="text-lg font-semibold text-gray-900 hover:text-emerald-600 transition-colors">
                        {item.title}
                      </h3>
                    </Link>
                    <p className="text-gray-600 text-sm mb-2">by {item.author}</p>
                    
                    {/* Stock Warning */}
                    {item.stock && item.quantity >= item.stock && (
                      <div className="text-sm text-amber-600 mb-2">
                        Only {item.stock} in stock
                      </div>
                    )}
                    
                    {/* Price */}
                    <div className="flex items-center space-x-2 mb-4">
                      {item.discountPercent && item.discountPercent > 0 ? (
                        <>
                          <span className="text-lg font-bold text-gray-900">
                            {formatPrice(item.discountPrice || item.price)}
                          </span>
                          <span className="text-sm text-gray-500 line-through">
                            {formatPrice(item.price)}
                          </span>
                          <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded-full">
                            -{item.discountPercent}%
                          </span>
                        </>
                      ) : (
                        <span className="text-lg font-bold text-gray-900">
                          {formatPrice(item.price)}
                        </span>
                      )}
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          disabled={isUpdating || item.quantity <= 1}
                          className="p-3 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-6 py-3 border-x border-gray-200 min-w-[4rem] text-center font-semibold text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          disabled={isUpdating || (item.stock && item.quantity >= item.stock)}
                          className="p-3 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        disabled={isUpdating}
                        className="text-red-600 hover:text-red-700 p-3 rounded-lg hover:bg-red-50 disabled:opacity-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Item Total */}
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">
                      {formatPrice((item.discountPrice || item.price) * item.quantity)}
                    </div>
                    {item.discountPercent && item.discountPercent > 0 && (
                      <div className="text-sm text-green-600">
                        Save {formatPrice((item.price - (item.discountPrice || item.price)) * item.quantity)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between text-base">
                    <span className="text-gray-600">Items ({itemCount})</span>
                    <span className="text-gray-900 font-semibold">{formatPrice(cartTotal.subtotal)}</span>
                  </div>
                  
                  <div className="flex justify-between text-base">
                    <span className="text-gray-600 flex items-center">
                      <Truck className="w-4 h-4 mr-1" />
                      Shipping
                    </span>
                    <span className="text-gray-900 font-semibold">
                      {cartTotal.subtotal >= 50 ? (
                        <span className="text-green-600 font-bold">Free</span>
                      ) : (
                        formatPrice(9.99)
                      )}
                    </span>
                  </div>
                  
                  {cartTotal.savings > 0 && (
                    <div className="flex justify-between text-base text-green-600">
                      <span className="flex items-center">
                        <Tag className="w-4 h-4 mr-1" />
                        Discount
                      </span>
                      <span className="font-bold">-{formatPrice(cartTotal.savings)}</span>
                    </div>
                  )}
                </div>
                
                <div className="border-t-2 border-gray-200 pt-6">
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span className="text-2xl">{formatPrice(finalTotal)}</span>
                  </div>
                  {cartTotal.subtotal < 50 && (
                    <p className="text-sm text-gray-600 mt-2">
                      Add {formatPrice(50 - cartTotal.subtotal)} more for free shipping!
                    </p>
                  )}
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Payment Method
                </h3>
                
                {!showPaymentMethods ? (
                  <div className="space-y-3">
                    {selectedPaymentMethod ? (
                      <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                        <span className="text-sm font-medium text-green-800">
                          {selectedPaymentMethod.replace('_', ' ').toUpperCase()} selected
                        </span>
                        <button
                          onClick={() => setShowPaymentMethods(true)}
                          className="text-sm text-green-600 hover:text-green-700"
                        >
                          Change
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setShowPaymentMethods(true)}
                        className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors"
                      >
                        Select Payment Method
                      </button>
                    )}
                  </div>
                ) : (
                  <PaymentMethods
                    selectedMethod={selectedPaymentMethod}
                    onMethodChange={handlePaymentMethodChange}
                    className="mb-4"
                  />
                )}
              </div>

              <div className="mt-8 space-y-4">
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 text-center flex items-center justify-center shadow-lg hover:shadow-xl"
                >
                  <Lock className="w-5 h-5 mr-3" />
                  Proceed to Checkout
                </button>
                
                <Link
                  to="/books"
                  className="w-full border-2 border-gray-300 text-gray-700 py-4 px-6 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 text-center block"
                >
                  Continue Shopping
                </Link>
              </div>

              {/* Security Badge */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-center text-xs text-gray-500">
                  <Shield className="w-4 h-4 mr-1" />
                  <span>Secure checkout with SSL encryption</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}