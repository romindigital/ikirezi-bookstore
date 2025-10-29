import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  Lock,
  Shield,
  Truck,
  Tag
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';
import { PaymentMethods } from '../components/PaymentMethods';
import { PaymentProgress } from '../components/PaymentProgress';
import { Modal } from '../components/Modal';
import Button from '../components/ui/Button';
import Typography from '../components/ui/Typography';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Icon from '../components/ui/Icon';

export function Cart() {
  const {
    itemCount,
    getCartTotal,
    items = [],
    handleQuantityChange,
    handleRemoveItem,
    isUpdating
  } = useCart();

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  const cartTotal = getCartTotal();
  const shippingCost = cartTotal.subtotal >= 50 ? 0 : 9.99;
  const finalTotal = cartTotal.total + shippingCost;

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
    if (currentStep === 1) {
      setCurrentStep(2);
    }
  };

  const handleProceedToCheckout = () => {
    if (!selectedPaymentMethod) {
      setShowPaymentMethods(true);
      return;
    }
    setShowCheckoutModal(true);
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleProceedToCheckout();
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card.Empty
            icon={<ShoppingBag className="w-10 h-10 text-gray-400" />}
            title="Your Cart is Empty"
            description="Start adding some amazing books to your cart!"
            actions={
              <Button to="/books" variant="primary" size="lg">
                Browse Books
              </Button>
            }
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/books"
            className="inline-flex items-center text-gray-600 hover:text-emerald-600 transition-colors mb-4"
          >
            <Icon.ArrowLeft className="w-5 h-5 mr-2" />
            Continue Shopping
          </Link>
          <Typography.PageTitle>Shopping Cart</Typography.PageTitle>
          <Typography.Body className="text-gray-600 mt-2">
            {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
          </Typography.Body>
        </div>

        {/* Progress Indicator */}
        <PaymentProgress currentStep={currentStep} className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card.Container key={item.id} className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
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
                      <Typography.CardTitle className="hover:text-emerald-600 transition-colors line-clamp-2">
                        {item.title}
                      </Typography.CardTitle>
                    </Link>
                    <Typography.Body className="text-gray-600 mt-1">
                      by {item.author}
                    </Typography.Body>

                    {/* Price */}
                    <div className="flex items-center gap-2 mt-3">
                      {item.discountPercent && item.discountPercent > 0 ? (
                        <>
                          <Typography.Price size="md">
                            {formatPrice(item.discountPrice || item.price)}
                          </Typography.Price>
                          <Typography.Muted className="line-through">
                            {formatPrice(item.price)}
                          </Typography.Muted>
                          <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                            -{item.discountPercent}%
                          </span>
                        </>
                      ) : (
                        <Typography.Price size="md">
                          {formatPrice(item.price)}
                        </Typography.Price>
                      )}
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-4">
                      <Input.Quantity
                        value={item.quantity}
                        onChange={(newQuantity) => handleQuantityChange(item.id, newQuantity)}
                      />

                      <Button
                        onClick={() => handleRemoveItem(item.id)}
                        disabled={isUpdating}
                        variant="danger"
                        size="sm"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>

                  {/* Item Total */}
                  <div className="text-right">
                    <Typography.CardTitle>
                      {formatPrice((item.discountPrice || item.price) * item.quantity)}
                    </Typography.CardTitle>
                    {item.discountPercent && item.discountPercent > 0 && (
                      <Typography.Success className="mt-1">
                        Save {formatPrice((item.price - (item.discountPrice || item.price)) * item.quantity)}
                      </Typography.Success>
                    )}
                  </div>
                </div>
              </Card.Container>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card.Summary>
              <Card.Header title="Order Summary" />

              <Card.Content>
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <Typography.Body className="text-gray-600">
                        Subtotal ({itemCount} items)
                      </Typography.Body>
                      <Typography.Body className="font-medium">
                        {formatPrice(cartTotal.subtotal)}
                      </Typography.Body>
                    </div>

                    <div className="flex justify-between text-sm">
                      <Typography.Body className="text-gray-600 flex items-center gap-1">
                        <Truck className="w-4 h-4" />
                        Shipping
                      </Typography.Body>
                      <Typography.Body className="font-medium">
                        {cartTotal.subtotal >= 50 ? (
                          <Typography.Accent>Free</Typography.Accent>
                        ) : (
                          formatPrice(9.99)
                        )}
                      </Typography.Body>
                    </div>

                    {cartTotal.savings > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <Typography.Body className="flex items-center gap-1">
                          <Tag className="w-4 h-4" />
                          Discount
                        </Typography.Body>
                        <Typography.Body className="font-medium">
                          -{formatPrice(cartTotal.savings)}
                        </Typography.Body>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <Typography.Body>Total</Typography.Body>
                      <Typography.Body>{formatPrice(finalTotal)}</Typography.Body>
                    </div>
                    {cartTotal.subtotal < 50 && (
                      <Typography.Small className="text-gray-600 mt-2">
                        Add {formatPrice(50 - cartTotal.subtotal)} more for free shipping
                      </Typography.Small>
                    )}
                  </div>

                  {/* Payment Method Section - Only show from step 2 onwards */}
                  {currentStep >= 2 && (
                    <div className="border-t border-gray-200 pt-6 mt-6">
                      <Typography.SmallTitle className="mb-4 flex items-center gap-2">
                        Payment Method
                      </Typography.SmallTitle>

                      {!showPaymentMethods ? (
                        <div className="space-y-3">
                          {selectedPaymentMethod ? (
                            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                              <Typography.Body className="font-medium text-green-800 capitalize">
                                {selectedPaymentMethod.replace('_', ' ')}
                              </Typography.Body>
                              <Button
                                onClick={() => setShowPaymentMethods(true)}
                                variant="ghost"
                                size="sm"
                              >
                                Change
                              </Button>
                            </div>
                          ) : (
                            <Button
                              onClick={() => setShowPaymentMethods(true)}
                              variant="outline"
                              className="w-full"
                            >
                              Select Payment Method
                            </Button>
                          )}
                        </div>
                      ) : (
                        <PaymentMethods
                          selectedMethod={selectedPaymentMethod}
                          onMethodChange={handlePaymentMethodChange}
                        />
                      )}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="space-y-3 pt-6">
                    {currentStep === 1 ? (
                      <Button
                        onClick={() => setCurrentStep(2)}
                        variant="primary"
                        size="lg"
                        className="w-full"
                      >
                        Continue to Payment
                      </Button>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex gap-3">
                          <Button
                            onClick={handlePreviousStep}
                            variant="outline"
                            className="flex-1"
                          >
                            Back
                          </Button>
                          <Button
                            onClick={handleNextStep}
                            disabled={currentStep >= 2 && !selectedPaymentMethod}
                            variant="primary"
                            className="flex-1"
                          >
                            {currentStep < 3 ? 'Next' : 'Checkout'}
                          </Button>
                        </div>
                      </div>
                    )}

                    <Button
                      to="/books"
                      variant="outline"
                      className="w-full"
                    >
                      Continue Shopping
                    </Button>
                  </div>

                  {/* Security Badge */}
                  <Card.Footer>
                    <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                      <Shield className="w-4 h-4" />
                      <Typography.Muted>Secure checkout with SSL encryption</Typography.Muted>
                    </div>
                  </Card.Footer>
                </div>
              </Card.Content>
            </Card.Summary>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      <Modal
        isOpen={showCheckoutModal}
        onClose={() => setShowCheckoutModal(false)}
        title="Proceed to Checkout"
        size="lg"
      >
        <div className="space-y-6">
          <Card.Container className="p-4">
            <Typography.SmallTitle className="mb-3">Order Summary</Typography.SmallTitle>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <Typography.Body>Items ({itemCount})</Typography.Body>
                <Typography.Body>{formatPrice(cartTotal.subtotal)}</Typography.Body>
              </div>
              <div className="flex justify-between">
                <Typography.Body>Shipping</Typography.Body>
                <Typography.Body>{cartTotal.subtotal >= 50 ? 'Free' : formatPrice(9.99)}</Typography.Body>
              </div>
              {cartTotal.savings > 0 && (
                <div className="flex justify-between text-green-600">
                  <Typography.Body>Discount</Typography.Body>
                  <Typography.Body>-{formatPrice(cartTotal.savings)}</Typography.Body>
                </div>
              )}
              <div className="flex justify-between font-bold border-t border-gray-200 pt-2 mt-2">
                <Typography.Body>Total</Typography.Body>
                <Typography.Body>{formatPrice(finalTotal)}</Typography.Body>
              </div>
            </div>
          </Card.Container>

          <div className="space-y-3">
            <Button
              onClick={() => window.location.href = `/checkout?payment=${selectedPaymentMethod}`}
              variant="primary"
              size="lg"
              className="w-full"
              icon={<Lock className="w-4 h-4" />}
            >
              Proceed to Secure Checkout
            </Button>
            <Button
              onClick={() => setShowCheckoutModal(false)}
              variant="outline"
              className="w-full"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}