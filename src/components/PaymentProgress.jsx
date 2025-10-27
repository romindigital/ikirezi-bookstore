import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faShoppingCart, 
  faCreditCard, 
  faCheckCircle,
  faSpinner,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';

export function PaymentProgress({ currentStep = 1, className = '' }) {
  const steps = [
    {
      id: 1,
      title: 'Cart Review',
      description: 'Review your items',
      icon: faShoppingCart,
      status: currentStep >= 1 ? 'completed' : 'pending'
    },
    {
      id: 2,
      title: 'Payment Method',
      description: 'Choose payment option',
      icon: faCreditCard,
      status: currentStep >= 2 ? 'completed' : currentStep === 1 ? 'current' : 'pending'
    },
    {
      id: 3,
      title: 'Confirmation',
      description: 'Complete your order',
      icon: faCheckCircle,
      status: currentStep >= 3 ? 'completed' : currentStep === 2 ? 'current' : 'pending'
    }
  ];

  return (
    <div className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-200 ${className}`}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            {/* Step Circle */}
            <div className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
              step.status === 'completed' 
                ? 'bg-green-500 text-white shadow-lg' 
                : step.status === 'current'
                ? 'bg-blue-500 text-white shadow-lg animate-pulse'
                : 'bg-gray-200 text-gray-500'
            }`}>
              {step.status === 'completed' ? (
                <FontAwesomeIcon icon={faCheckCircle} className="w-6 h-6" />
              ) : step.status === 'current' ? (
                <FontAwesomeIcon icon={faSpinner} className="w-6 h-6 animate-spin" />
              ) : (
                <FontAwesomeIcon icon={step.icon} className="w-6 h-6" />
              )}
            </div>
            
            {/* Step Content */}
            <div className="ml-4 min-w-0">
              <h4 className={`text-sm font-semibold ${
                step.status === 'completed' || step.status === 'current' 
                  ? 'text-gray-900' 
                  : 'text-gray-500'
              }`}>
                {step.title}
              </h4>
              <p className={`text-xs ${
                step.status === 'completed' || step.status === 'current' 
                  ? 'text-gray-600' 
                  : 'text-gray-400'
              }`}>
                {step.description}
              </p>
            </div>
            
            {/* Arrow */}
            {index < steps.length - 1 && (
              <div className="mx-6">
                <FontAwesomeIcon 
                  icon={faArrowRight} 
                  className={`w-4 h-4 ${
                    step.status === 'completed' ? 'text-green-500' : 'text-gray-300'
                  }`} 
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
