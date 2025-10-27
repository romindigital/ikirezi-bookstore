import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCreditCard, 
  faMobile, 
  faWallet, 
  faUniversity, 
  faShieldAlt,
  faCheck,
  faChevronDown,
  faChevronUp,
  faLock,
  faStar,
  faClock,
  faGlobe,
  faArrowRight,
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons';
import { 
  faPaypal, 
  faApple, 
  faGoogle 
} from '@fortawesome/free-brands-svg-icons';

export function PaymentMethods({ selectedMethod, onMethodChange, className = '' }) {
  const [expandedCategory, setExpandedCategory] = useState('cards');

  const paymentMethods = {
    cards: {
      title: 'Credit & Debit Cards',
      icon: faCreditCard,
      description: 'Secure card payments with instant processing',
      methods: [
        {
          id: 'visa',
          name: 'Visa',
          icon: '💳',
          description: 'Visa cards accepted worldwide',
          popular: true,
          processingTime: 'Instant',
          security: 'Bank-level encryption',
          color: 'from-blue-600 to-blue-800',
          features: ['3D Secure', 'Instant processing', 'Global acceptance']
        },
        {
          id: 'mastercard',
          name: 'Mastercard',
          icon: '💳',
          description: 'Mastercard accepted worldwide',
          popular: true,
          processingTime: 'Instant',
          security: 'Bank-level encryption',
          color: 'from-red-500 to-red-700',
          features: ['3D Secure', 'Instant processing', 'Global acceptance']
        },
        {
          id: 'amex',
          name: 'American Express',
          icon: '💳',
          description: 'American Express cards',
          processingTime: 'Instant',
          security: 'Bank-level encryption',
          color: 'from-green-600 to-green-800',
          features: ['3D Secure', 'Instant processing', 'Premium support']
        }
      ]
    },
    mobile: {
      title: 'Mobile Money',
      icon: faMobile,
      description: 'Quick and secure mobile payments across Africa',
      methods: [
        {
          id: 'mtn_mobile_money',
          name: 'MTN Mobile Money',
          icon: '📱',
          description: 'Pay with MTN Mobile Money',
          popular: true,
          processingTime: '1-2 minutes',
          security: 'PIN protected',
          color: 'from-yellow-500 to-orange-600',
          features: ['Instant transfer', 'PIN security', 'Wide coverage'],
          countries: ['Rwanda', 'Uganda', 'Ghana', 'Cameroon']
        },
        {
          id: 'airtel_money',
          name: 'Airtel Money',
          icon: '📱',
          description: 'Pay with Airtel Money',
          popular: true,
          processingTime: '1-2 minutes',
          security: 'PIN protected',
          color: 'from-red-500 to-red-700',
          features: ['Instant transfer', 'PIN security', 'Wide coverage'],
          countries: ['Rwanda', 'Uganda', 'Tanzania', 'Kenya']
        },
        {
          id: 'orange_money',
          name: 'Orange Money',
          icon: '📱',
          description: 'Pay with Orange Money',
          processingTime: '1-2 minutes',
          security: 'PIN protected',
          color: 'from-orange-500 to-orange-700',
          features: ['Instant transfer', 'PIN security', 'Wide coverage'],
          countries: ['Mali', 'Burkina Faso', 'Côte d\'Ivoire', 'Senegal']
        },
        {
          id: 'vodacom_m_pesa',
          name: 'Vodacom M-Pesa',
          icon: '📱',
          description: 'Pay with Vodacom M-Pesa',
          processingTime: '1-2 minutes',
          security: 'PIN protected',
          color: 'from-green-500 to-green-700',
          features: ['Instant transfer', 'PIN security', 'Wide coverage'],
          countries: ['Tanzania', 'Kenya', 'Uganda', 'Mozambique']
        },
        {
          id: 'equitel',
          name: 'Equitel',
          icon: '📱',
          description: 'Pay with Equitel',
          processingTime: '1-2 minutes',
          security: 'PIN protected',
          color: 'from-blue-500 to-blue-700',
          features: ['Instant transfer', 'PIN security', 'Wide coverage'],
          countries: ['Kenya']
        }
      ]
    },
    wallets: {
      title: 'Digital Wallets',
      icon: faWallet,
      description: 'Fast and secure digital wallet payments',
      methods: [
        {
          id: 'paypal',
          name: 'PayPal',
          icon: faPaypal,
          description: 'Pay with your PayPal account',
          popular: true,
          processingTime: 'Instant',
          security: 'PayPal security',
          color: 'from-blue-500 to-blue-700',
          features: ['Buyer protection', 'Instant processing', 'Global acceptance'],
          isIcon: true
        },
        {
          id: 'apple_pay',
          name: 'Apple Pay',
          icon: faApple,
          description: 'Pay with Apple Pay',
          popular: true,
          processingTime: 'Instant',
          security: 'Touch ID / Face ID',
          color: 'from-gray-800 to-gray-900',
          features: ['Biometric security', 'Instant processing', 'Apple ecosystem'],
          isIcon: true
        },
        {
          id: 'google_pay',
          name: 'Google Pay',
          icon: faGoogle,
          description: 'Pay with Google Pay',
          popular: true,
          processingTime: 'Instant',
          security: 'Google security',
          color: 'from-green-500 to-green-700',
          features: ['Google security', 'Instant processing', 'Android ecosystem'],
          isIcon: true
        }
      ]
    },
    bank: {
      title: 'Bank Transfer',
      icon: faUniversity,
      description: 'Direct bank transfers and wire payments',
      methods: [
        {
          id: 'bank_transfer',
          name: 'Bank Transfer',
          icon: '🏦',
          description: 'Direct bank transfer',
          popular: true,
          processingTime: '1-3 business days',
          security: 'Bank security',
          color: 'from-indigo-500 to-indigo-700',
          features: ['Bank security', 'Direct transfer', 'No fees'],
          countries: ['All countries']
        },
        {
          id: 'wire_transfer',
          name: 'Wire Transfer',
          icon: '🏦',
          description: 'International wire transfer',
          processingTime: '2-5 business days',
          security: 'Bank security',
          color: 'from-purple-500 to-purple-700',
          features: ['International', 'Bank security', 'Large amounts'],
          countries: ['All countries']
        }
      ]
    }
  };

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Payment Method</h3>
        <p className="text-gray-600">Select a secure payment option that works best for you</p>
      </div>
      
      {/* Payment Categories */}
      <div className="space-y-4">
        {Object.entries(paymentMethods).map(([categoryKey, category]) => (
          <div key={categoryKey} className="group">
            <button
              onClick={() => toggleCategory(categoryKey)}
              className={`w-full p-6 rounded-2xl border-2 transition-all duration-300 ${
                expandedCategory === categoryKey
                  ? 'border-blue-500 bg-blue-50 shadow-lg'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${category.color || 'from-gray-500 to-gray-600'} flex items-center justify-center shadow-lg`}>
                    <FontAwesomeIcon 
                      icon={category.icon} 
                      className="w-6 h-6 text-white" 
                    />
                  </div>
                  <div className="text-left">
                    <h4 className="text-lg font-semibold text-gray-900">{category.title}</h4>
                    <p className="text-sm text-gray-600">{category.description}</p>
                    <div className="flex items-center mt-1 space-x-4">
                      <span className="text-xs text-gray-500">
                        {category.methods.length} options
                      </span>
                      <div className="flex items-center text-xs text-gray-500">
                        <FontAwesomeIcon icon={faClock} className="w-3 h-3 mr-1" />
                        <span>Processing time varies</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {expandedCategory === categoryKey && (
                    <div className="flex items-center text-blue-600">
                      <FontAwesomeIcon icon={faSparkles} className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">Active</span>
                    </div>
                  )}
                  <FontAwesomeIcon 
                    icon={expandedCategory === categoryKey ? faChevronUp : faChevronDown} 
                    className={`w-5 h-5 transition-transform duration-200 ${
                      expandedCategory === categoryKey ? 'text-blue-600' : 'text-gray-400'
                    }`} 
                  />
                </div>
              </div>
            </button>
            
            {expandedCategory === categoryKey && (
              <div className="mt-4 p-6 bg-white rounded-2xl border border-gray-200 shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.methods.map((method) => (
                    <label
                      key={method.id}
                      className={`relative group cursor-pointer`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={selectedMethod === method.id}
                        onChange={(e) => onMethodChange(e.target.value)}
                        className="sr-only"
                      />
                      
                      <div className={`relative p-6 rounded-xl border-2 transition-all duration-300 ${
                        selectedMethod === method.id
                          ? 'border-blue-500 bg-blue-50 shadow-lg scale-105'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-md hover:scale-102'
                      }`}>
                        {/* Gradient Background */}
                        <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${method.color} opacity-5`}></div>
                        
                        <div className="relative">
                          <div className="flex items-start justify-between mb-4">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${method.color} flex items-center justify-center shadow-lg`}>
                              {method.isIcon ? (
                                <FontAwesomeIcon 
                                  icon={method.icon} 
                                  className="w-6 h-6 text-white" 
                                />
                              ) : (
                                <span className="text-xl">{method.icon}</span>
                              )}
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              {method.popular && (
                                <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full flex items-center">
                                  <FontAwesomeIcon icon={faStar} className="w-3 h-3 mr-1" />
                                  Popular
                                </span>
                              )}
                              {selectedMethod === method.id && (
                                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                  <FontAwesomeIcon icon={faCheck} className="w-3 h-3 text-white" />
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <h5 className="text-lg font-semibold text-gray-900 mb-2">{method.name}</h5>
                          <p className="text-sm text-gray-600 mb-3">{method.description}</p>
                          
                          {/* Features */}
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center text-xs text-gray-500">
                              <FontAwesomeIcon icon={faClock} className="w-3 h-3 mr-2" />
                              <span>{method.processingTime}</span>
                            </div>
                            <div className="flex items-center text-xs text-gray-500">
                              <FontAwesomeIcon icon={faLock} className="w-3 h-3 mr-2" />
                              <span>{method.security}</span>
                            </div>
                            {method.countries && (
                              <div className="flex items-center text-xs text-gray-500">
                                <FontAwesomeIcon icon={faGlobe} className="w-3 h-3 mr-2" />
                                <span>{method.countries.slice(0, 2).join(', ')}{method.countries.length > 2 && ' +more'}</span>
                              </div>
                            )}
                          </div>
                          
                          {/* Features List */}
                          <div className="flex flex-wrap gap-1">
                            {method.features?.slice(0, 2).map((feature, index) => (
                              <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Enhanced Security Section */}
      <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl border border-green-200">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
              <FontAwesomeIcon icon={faShieldAlt} className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Bank-Level Security</h4>
            <p className="text-sm text-gray-700 mb-3">
              Your payment information is protected with industry-standard encryption and security measures.
            </p>
            <div className="flex flex-wrap gap-4 text-xs text-gray-600">
              <div className="flex items-center">
                <FontAwesomeIcon icon={faLock} className="w-3 h-3 mr-1" />
                <span>256-bit SSL encryption</span>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faShieldAlt} className="w-3 h-3 mr-1" />
                <span>PCI DSS compliant</span>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faInfoCircle} className="w-3 h-3 mr-1" />
                <span>No data storage</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PaymentMethodDetails({ method, className = '' }) {
  const getMethodInfo = (methodId) => {
    const methodMap = {
      'visa': {
        name: 'Visa',
        icon: '💳',
        description: 'Enter your Visa card details below',
        fields: ['cardNumber', 'expiryDate', 'cvv', 'nameOnCard']
      },
      'mastercard': {
        name: 'Mastercard',
        icon: '💳',
        description: 'Enter your Mastercard details below',
        fields: ['cardNumber', 'expiryDate', 'cvv', 'nameOnCard']
      },
      'amex': {
        name: 'American Express',
        icon: '💳',
        description: 'Enter your American Express card details below',
        fields: ['cardNumber', 'expiryDate', 'cvv', 'nameOnCard']
      },
      'mtn_mobile_money': {
        name: 'MTN Mobile Money',
        icon: '📱',
        description: 'Enter your MTN Mobile Money number',
        fields: ['phoneNumber', 'pin']
      },
      'airtel_money': {
        name: 'Airtel Money',
        icon: '📱',
        description: 'Enter your Airtel Money number',
        fields: ['phoneNumber', 'pin']
      },
      'orange_money': {
        name: 'Orange Money',
        icon: '📱',
        description: 'Enter your Orange Money number',
        fields: ['phoneNumber', 'pin']
      },
      'vodacom_m_pesa': {
        name: 'Vodacom M-Pesa',
        icon: '📱',
        description: 'Enter your M-Pesa number',
        fields: ['phoneNumber', 'pin']
      },
      'equitel': {
        name: 'Equitel',
        icon: '📱',
        description: 'Enter your Equitel number',
        fields: ['phoneNumber', 'pin']
      },
      'paypal': {
        name: 'PayPal',
        icon: '💳',
        description: 'You will be redirected to PayPal to complete your payment',
        fields: []
      },
      'apple_pay': {
        name: 'Apple Pay',
        icon: '💳',
        description: 'Complete payment with Touch ID or Face ID',
        fields: []
      },
      'google_pay': {
        name: 'Google Pay',
        icon: '💳',
        description: 'Complete payment with your Google account',
        fields: []
      },
      'bank_transfer': {
        name: 'Bank Transfer',
        icon: '🏦',
        description: 'Transfer funds to our bank account',
        fields: ['accountNumber', 'bankName']
      },
      'wire_transfer': {
        name: 'Wire Transfer',
        icon: '🏦',
        description: 'International wire transfer details',
        fields: ['swiftCode', 'accountNumber', 'bankName']
      }
    };
    
    return methodMap[method] || {
      name: 'Unknown Method',
      icon: '💳',
      description: 'Payment method details',
      fields: []
    };
  };

  const methodInfo = getMethodInfo(method);

  if (!method) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-gray-500">Please select a payment method</p>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 border border-gray-200 shadow-lg ${className}`}>
      {/* Header */}
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
          <span className="text-2xl">{methodInfo.icon}</span>
        </div>
        <div>
          <h4 className="text-xl font-bold text-gray-900">{methodInfo.name}</h4>
          <p className="text-gray-600">{methodInfo.description}</p>
        </div>
      </div>
      
      {methodInfo.fields.length > 0 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {methodInfo.fields.includes('cardNumber') && (
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Card Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-lg"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <FontAwesomeIcon icon={faCreditCard} className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
            )}
            
            {methodInfo.fields.includes('phoneNumber') && (
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    placeholder="+250 78 123 4567"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-lg"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <FontAwesomeIcon icon={faMobile} className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
            )}
            
            {methodInfo.fields.includes('pin') && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  PIN
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Enter your PIN"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-lg"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <FontAwesomeIcon icon={faLock} className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
            )}
            
            {methodInfo.fields.includes('expiryDate') && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Expiry Date
                </label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-lg"
                />
              </div>
            )}
            
            {methodInfo.fields.includes('cvv') && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  CVV
                </label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-lg"
                />
              </div>
            )}
            
            {methodInfo.fields.includes('nameOnCard') && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Name on Card
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-lg"
                />
              </div>
            )}
            
            {methodInfo.fields.includes('accountNumber') && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Account Number
                </label>
                <input
                  type="text"
                  placeholder="Enter account number"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-lg"
                />
              </div>
            )}
            
            {methodInfo.fields.includes('bankName') && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Bank Name
                </label>
                <input
                  type="text"
                  placeholder="Enter bank name"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-lg"
                />
              </div>
            )}
            
            {methodInfo.fields.includes('swiftCode') && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  SWIFT Code
                </label>
                <input
                  type="text"
                  placeholder="Enter SWIFT code"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-lg"
                />
              </div>
            )}
          </div>
          
          {/* Security Notice */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faShieldAlt} className="w-5 h-5 text-blue-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-blue-800">Secure Payment</p>
                <p className="text-xs text-blue-600">
                  Your payment information is encrypted and processed securely. We never store your payment details.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {methodInfo.fields.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FontAwesomeIcon icon={faArrowRight} className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-600 text-lg">
            {methodInfo.description}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            You will be redirected to complete your payment securely
          </p>
        </div>
      )}
    </div>
  );
}
