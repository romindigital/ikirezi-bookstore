import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  Truck,
  CreditCard,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  ShoppingCart
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
const STEPS = [
  { id: 1, title: 'Review Cart', icon: ShoppingBag, description: 'Check your items' },
  { id: 2, title: 'Shipping', icon: Truck, description: 'Delivery details' },
  { id: 3, title: 'Payment', icon: CreditCard, description: 'Payment method' },
  { id: 4, title: 'Confirmation', icon: CheckCircle, description: 'Complete order' }
];

export function Cart() {
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'Rwanda'
  });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    items = [],
    itemCount,
    total,
    updateQuantity,
    removeFromCart,
    clearCart
  } = useCart();

  const cartTotal = total;
  const shippingCost = cartTotal >= 50 ? 0 : 9.99;
  const finalTotal = cartTotal + shippingCost;

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleCompleteOrder = async () => {
    setIsProcessing(true);
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    clearCart();
    setCurrentStep(4);
    setIsProcessing(false);
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return items.length > 0;
      case 2:
        return shippingInfo.name && shippingInfo.email && shippingInfo.address && shippingInfo.city && shippingInfo.zipCode;
      case 3:
        return paymentMethod;
      default:
        return true;
    }
  };

  if (items.length === 0 && currentStep !== 4) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16 px-4">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Your Cart is Empty</h3>
              <p className="text-gray-600 mb-8 text-lg">Start adding some amazing books to your cart!</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button to="/books" variant="primary" size="lg">
                  Browse Books
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/books"
            className="inline-flex items-center text-gray-600 hover:text-emerald-600 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Continue Shopping
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">Shopping Cart</h1>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {STEPS.map((step, index) => {
              const isActive = step.id === currentStep;
              const isCompleted = step.id < currentStep;
              const isLast = index === STEPS.length - 1;

              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isCompleted
                        ? 'bg-emerald-600 text-white'
                        : isActive
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      <step.icon className="w-5 h-5" />
                    </div>
                    <p className={`mt-2 text-center text-sm text-gray-600 leading-relaxed ${
                      isActive ? 'text-blue-600 font-medium' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </p>
                  </div>
                  {!isLast && (
                    <div className={`flex-1 h-0.5 mx-4 transition-all duration-300 ${
                      isCompleted ? 'bg-emerald-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === 1 && <CartReviewStep items={items} onUpdateQuantity={updateQuantity} onRemoveItem={removeFromCart} />}
            {currentStep === 2 && <ShippingStep shippingInfo={shippingInfo} onUpdateShipping={setShippingInfo} />}
            {currentStep === 3 && <PaymentStep selectedMethod={paymentMethod} onSelectMethod={setPaymentMethod} />}
            {currentStep === 4 && <ConfirmationStep />}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 sticky top-8">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100 p-6 pb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Order Summary</h3>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        Subtotal ({itemCount} items)
                      </span>
                      <span className="font-medium">
                        {formatPrice(cartTotal)}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 flex items-center gap-1">
                        <Truck className="w-4 h-4" />
                        Shipping
                      </span>
                      <span className="font-medium">
                        {cartTotal >= 50 ? (
                          <span className="text-emerald-600 font-semibold">Free</span>
                        ) : (
                          formatPrice(9.99)
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <span>Total</span>
                      <span>{formatPrice(finalTotal)}</span>
                    </div>
                    {cartTotal < 50 && (
                      <p className="text-gray-600 mt-2 text-sm">
                        Add {formatPrice(50 - cartTotal)} more for free shipping
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        {currentStep !== 4 && (
          <div className="flex justify-between items-center mt-8 pt-8 border-t border-gray-200">
            <Button
              onClick={handlePrev}
              disabled={currentStep === 1}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>

            <div className="flex items-center gap-4">
              <p className="text-base text-gray-700 leading-relaxed text-gray-600">
                Step {currentStep} of {STEPS.length}
              </p>

              {currentStep < 4 ? (
                <Button
                  onClick={handleNext}
                  disabled={!canProceedToNext()}
                  variant="primary"
                  className="flex items-center gap-2"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleCompleteOrder}
                  disabled={isProcessing}
                  variant="primary"
                  className="flex items-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Complete Order
                      <CheckCircle className="w-4 h-4" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Step Components
function CartReviewStep({ items, onUpdateQuantity, onRemoveItem }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h5 className="text-base md:text-lg font-semibold text-gray-900 leading-snug mb-6">Review Your Cart</h5>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex flex-col sm:flex-row gap-4 p-4 border border-gray-200 rounded-lg">
            {/* Book Image */}
            <Link
              to={`/book/${item.id}`}
              className="flex-shrink-0 w-20 h-28 sm:w-24 sm:h-32"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover rounded-lg"
              />
            </Link>

            {/* Book Details */}
            <div className="flex-1 min-w-0">
              <Link to={`/book/${item.id}`}>
                <h4 className="text-lg md:text-xl font-semibold text-gray-900 leading-snug hover:text-emerald-600 transition-colors line-clamp-2">
                  {item.title}
                </h4>
              </Link>
              <p className="text-base text-gray-700 leading-relaxed text-gray-600 mt-1">
                by {item.author}
              </p>

              {/* Price */}
              <div className="flex items-center gap-2 mt-3">
                {item.discountPercent && item.discountPercent > 0 ? (
                  <>
                    <span className="text-xl md:text-2xl font-bold text-emerald-600">
                      {formatPrice(item.discountPrice || item.price)}
                    </span>
                    <p className="text-sm text-gray-500 leading-relaxed line-through">
                      {formatPrice(item.price)}
                    </p>
                    <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                      -{item.discountPercent}%
                    </span>
                  </>
                ) : (
                  <span className="text-xl md:text-2xl font-bold text-emerald-600">
                    {formatPrice(item.price)}
                  </span>
                )}
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center justify-between mt-4">
                <Input.Quantity
                  value={item.quantity}
                  onChange={(newQuantity) => onUpdateQuantity(item.id, newQuantity)}
                />

                <Button
                  onClick={() => onRemoveItem(item.id)}
                  variant="danger"
                  size="sm"
                >
                  Remove
                </Button>
              </div>
            </div>

            {/* Item Total */}
            <div className="text-right">
              <h4 className="text-lg md:text-xl font-semibold text-gray-900 leading-snug">
                {formatPrice((item.discountPrice || item.price) * item.quantity)}
              </h4>
              {item.discountPercent && item.discountPercent > 0 && (
                <p className="text-sm text-green-600 mt-1">
                  Save {formatPrice((item.price - (item.discountPrice || item.price)) * item.quantity)}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ShippingStep({ shippingInfo, onUpdateShipping }) {
  const handleChange = (field, value) => {
    onUpdateShipping(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h5 className="text-base md:text-lg font-semibold text-gray-900 leading-snug mb-6">Shipping Information</h5>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input.Field
          label="Full Name"
          value={shippingInfo.name}
          onChange={(e) => handleChange('name', e.target.value)}
          required
        />

        <Input.Field
          label="Email Address"
          type="email"
          value={shippingInfo.email}
          onChange={(e) => handleChange('email', e.target.value)}
          required
        />

        <div className="md:col-span-2">
          <Input.Field
            label="Street Address"
            value={shippingInfo.address}
            onChange={(e) => handleChange('address', e.target.value)}
            required
          />
        </div>

        <Input.Field
          label="City"
          value={shippingInfo.city}
          onChange={(e) => handleChange('city', e.target.value)}
          required
        />

        <Input.Field
          label="ZIP Code"
          value={shippingInfo.zipCode}
          onChange={(e) => handleChange('zipCode', e.target.value)}
          required
        />

        <div className="md:col-span-2">
          <Input.Field
            label="Country"
            value={shippingInfo.country}
            onChange={(e) => handleChange('country', e.target.value)}
            disabled
          />
        </div>
      </div>
    </div>
  );
}

function PaymentStep({ selectedMethod, onSelectMethod }) {
  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
    { id: 'paypal', name: 'PayPal', icon: '💳' },
    { id: 'bank', name: 'Bank Transfer', icon: '🏦' },
    { id: 'mobile', name: 'Mobile Money', icon: '📱' }
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h5 className="text-base md:text-lg font-semibold text-gray-900 leading-snug mb-6">Payment Method</h5>

      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            onClick={() => onSelectMethod(method.id)}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
              selectedMethod === method.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="text-2xl">
                {typeof method.icon === 'string' ? method.icon : <method.icon />}
              </div>
              <p className="text-base text-gray-700 leading-relaxed font-medium">{method.name}</p>
              {selectedMethod === method.id && (
                <CheckCircle className="w-5 h-5 text-blue-600 ml-auto" />
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedMethod === 'card' && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-4">
            Your payment information is secure and encrypted.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input.Field label="Card Number" placeholder="1234 5678 9012 3456" />
            <Input.Field label="Expiry Date" placeholder="MM/YY" />
            <Input.Field label="CVV" placeholder="123" />
            <Input.Field label="Cardholder Name" placeholder="John Doe" />
          </div>
        </div>
      )}
    </div>
  );
}

function ConfirmationStep() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
      <div className="mb-6">
        <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight text-emerald-600 mb-2">
          Order Confirmed!
        </h1>
        <p className="text-base text-gray-700 leading-relaxed text-gray-600">
          Thank you for your purchase. Your order has been successfully placed.
        </p>
      </div>

      <div className="space-y-4">
        <p className="text-sm text-gray-500">
          You will receive an email confirmation shortly with your order details.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button to="/books" variant="primary">
            Continue Shopping
          </Button>
          <Button to="/orders" variant="outline">
            View Orders
          </Button>
        </div>
      </div>
    </div>
  );
}