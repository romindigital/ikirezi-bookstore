import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { PaymentMethods, PaymentMethodDetails } from '../components/PaymentMethods';
import { PaymentProgress } from '../components/PaymentProgress';
import { formatPrice } from '../utils/formatPrice';
import { calculateCartTotal } from '../utils/calculateDiscount';
import { CreditCard, MapPin, User, Mail, Phone, Lock } from 'lucide-react';
import Button from '../components/ui/Button';
import Typography from '../components/ui/Typography';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';

const schema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  address: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  zipCode: yup.string().required('ZIP code is required'),
  country: yup.string().required('Country is required'),
});

export function Checkout() {
  const { items, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: user?.name?.split(' ')[0] || '',
      lastName: user?.name?.split(' ').slice(1).join(' ') || '',
      email: user?.email || '',
      country: 'United States',
    },
  });

  useEffect(() => {
    const paymentFromUrl = searchParams.get('payment');
    if (paymentFromUrl) {
      setSelectedPaymentMethod(paymentFromUrl);
    }
  }, [searchParams]);

  const cartTotal = calculateCartTotal(items);
  const shippingCost = cartTotal.subtotal >= 50 ? 0 : 9.99;
  const finalTotal = cartTotal.total + shippingCost;

  const onSubmit = async () => {
    if (!selectedPaymentMethod) {
      alert('Please select a payment method');
      return;
    }

    setIsProcessing(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Clear cart after successful order
      clearCart();

      // Redirect to success page
      navigate('/order-success', {
        state: {
          orderNumber: `ORD-${Date.now()}`,
          total: finalTotal,
          paymentMethod: selectedPaymentMethod
        }
      });
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card.Container className="text-center max-w-md mx-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <Typography.SectionTitle className="mb-2">Your cart is empty</Typography.SectionTitle>
          <Typography.Body className="mb-6">
            Add some books to your cart before checking out.
          </Typography.Body>
          <Button to="/books" variant="primary" size="lg">
            Continue Shopping
          </Button>
        </Card.Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50/30 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Indicator */}
        <PaymentProgress currentStep={2} className="mb-8" />

        <div className="text-center mb-8">
          <Typography.PageTitle className="mb-2">Checkout</Typography.PageTitle>
          <Typography.Body className="text-gray-600">
            Complete your order with secure payment
          </Typography.Body>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <Card.Container className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Contact Information */}
              <div>
                <Typography.SectionTitle className="mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2 text-emerald-600" />
                  Contact Information
                </Typography.SectionTitle>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input.Field
                    label="First Name"
                    {...register('firstName')}
                    error={errors.firstName?.message}
                    required
                  />
                  <Input.Field
                    label="Last Name"
                    {...register('lastName')}
                    error={errors.lastName?.message}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <Input.Field
                    label="Email"
                    type="email"
                    {...register('email')}
                    error={errors.email?.message}
                    required
                  />
                  <Input.Field
                    label="Phone"
                    type="tel"
                    {...register('phone')}
                    error={errors.phone?.message}
                    required
                  />
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <Typography.SectionTitle className="mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-emerald-600" />
                  Shipping Address
                </Typography.SectionTitle>
                <div className="space-y-4">
                  <Input.Field
                    label="Address"
                    {...register('address')}
                    error={errors.address?.message}
                    required
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input.Field
                      label="City"
                      {...register('city')}
                      error={errors.city?.message}
                      required
                    />
                    <Input.Field
                      label="State"
                      {...register('state')}
                      error={errors.state?.message}
                      required
                    />
                    <Input.Field
                      label="ZIP Code"
                      {...register('zipCode')}
                      error={errors.zipCode?.message}
                      required
                    />
                  </div>
                  <Input.Select
                    label="Country"
                    {...register('country')}
                    error={errors.country?.message}
                    options={[
                      { value: 'United States', label: 'United States' },
                      { value: 'Canada', label: 'Canada' },
                      { value: 'United Kingdom', label: 'United Kingdom' }
                    ]}
                    required
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <Typography.SectionTitle className="mb-4 flex items-center">
                  <CreditCard className="w-5 h-5 mr-2 text-emerald-600" />
                  Payment Method
                </Typography.SectionTitle>

                <PaymentMethods
                  selectedMethod={selectedPaymentMethod}
                  onMethodChange={handlePaymentMethodChange}
                  className="mb-6"
                />

                {selectedPaymentMethod && (
                  <PaymentMethodDetails
                    method={selectedPaymentMethod}
                    className="mb-6"
                  />
                )}
              </div>

              {/* Place Order Button */}
              <Button
                type="submit"
                disabled={isProcessing}
                variant="primary"
                size="xl"
                className="w-full"
                loading={isProcessing}
                icon={<Lock className="w-5 h-5" />}
              >
                {isProcessing ? 'Processing Payment...' : `Place Order - ${formatPrice(finalTotal)}`}
              </Button>
            </form>
          </Card.Container>

          {/* Order Summary */}
          <Card.Summary>
            <Card.Header title="Order Summary" />

            <Card.Content>
              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <img
                      src={item.image || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA2MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0zMCA0MEwyMCA1MEg0MEwzMCA0MFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHRleHQgeD0iMzAiIHk9IjYwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNkI3MjgwIiBmb250LWZhbWlseT0ic3lzdGVtLXVpIiBmb250LXNpemU9IjEwIj5Cb29rPC90ZXh0Pgo8L3N2Zz4K'}
                      alt={item.title}
                      className="w-12 h-16 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <Typography.Body className="font-medium text-gray-900 truncate">
                        {item.title}
                      </Typography.Body>
                      <Typography.Small>Qty: {item.quantity}</Typography.Small>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {formatPrice((item.discountPrice || item.price) * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Totals */}
              <div className="space-y-2 border-t border-gray-200 pt-4">
                <div className="flex justify-between text-sm">
                  <Typography.Body className="text-gray-600">Subtotal</Typography.Body>
                  <Typography.Body className="font-medium">{formatPrice(cartTotal.subtotal)}</Typography.Body>
                </div>
                <div className="flex justify-between text-sm">
                  <Typography.Body className="text-gray-600">Shipping</Typography.Body>
                  <Typography.Body className="font-medium">
                    {shippingCost === 0 ? <Typography.Accent>Free</Typography.Accent> : formatPrice(shippingCost)}
                  </Typography.Body>
                </div>
                {cartTotal.savings > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <Typography.Body>Discount</Typography.Body>
                    <Typography.Body className="font-medium">-{formatPrice(cartTotal.savings)}</Typography.Body>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-2">
                  <Typography.Body>Total</Typography.Body>
                  <Typography.Body>{formatPrice(finalTotal)}</Typography.Body>
                </div>
              </div>

              {/* Security Info */}
              <Card.Footer>
                <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                  <Lock className="w-4 h-4" />
                  <Typography.Muted>Your payment information is secure and encrypted</Typography.Muted>
                </div>
              </Card.Footer>
            </Card.Content>
          </Card.Summary>
        </div>
      </div>
    </div>
  );
}
