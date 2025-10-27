import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTruck, 
  faShieldAlt, 
  faAward, 
  faBook, 
  faStar, 
  faRocket, 
  faHeadset,
  faCheck,
  faLock,
  faCertificate
} from '@fortawesome/free-solid-svg-icons';
import { AnimatedCounter } from './AnimatedCounter';

export function WhyChooseIkirezi() {
  return (
    <section className="py-20 bg-gradient-to-br from-green-50 via-white to-green-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2320b2aa' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-8.3-6.7-15-15-15s-15 6.7-15 15 6.7 15 15 15 15-6.7 15-15zm15 0c0-8.3-6.7-15-15-15s-15 6.7-15 15 6.7 15 15 15 15-6.7 15-15z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="desktop-container relative z-10">
        {/* Trusted by Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-custom-primary-green/20 to-custom-accent-green/20 rounded-full border border-custom-primary-green/30 mb-8">
            <FontAwesomeIcon icon={faStar} className="w-5 h-5 text-yellow-500 mr-2" />
            <span className="desktop-text-lg font-semibold text-gray-800">
              Trusted by <AnimatedCounter end={1000000} duration={2000} />+ Readers
            </span>
          </div>
        </div>

        {/* Main Heading */}
        <div className="text-center mb-20">
          <h2 className="desktop-text-5xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-custom-dark-grey via-custom-primary-green to-custom-accent-green bg-clip-text text-transparent">
            Why Choose Ikirezi?
          </h2>
          <p className="desktop-text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We're committed to providing the best book shopping experience with premium services, 
            exceptional quality, and unmatched customer satisfaction.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {/* Free Shipping */}
          <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-custom-primary-green hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-custom-primary-green to-custom-accent-green rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <FontAwesomeIcon icon={faTruck} className="w-8 h-8 text-white" />
            </div>
            <h3 className="desktop-text-2xl font-bold text-gray-900 mb-4">Free Shipping</h3>
            <p className="desktop-text-lg text-gray-600 mb-6 leading-relaxed">
              Free shipping on orders over $50. Fast and reliable delivery to your doorstep with real-time tracking.
            </p>
            <div className="flex items-center text-custom-primary-green font-semibold">
              <FontAwesomeIcon icon={faCheck} className="w-5 h-5 mr-2" />
              <span className="desktop-text-lg">No hidden fees</span>
            </div>
          </div>

          {/* Secure Payment */}
          <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-custom-primary-green hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-custom-accent-green to-custom-primary-green rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <FontAwesomeIcon icon={faShieldAlt} className="w-8 h-8 text-white" />
            </div>
            <h3 className="desktop-text-2xl font-bold text-gray-900 mb-4">Secure Payment</h3>
            <p className="desktop-text-lg text-gray-600 mb-6 leading-relaxed">
              100% secure and encrypted payments. Your financial information is always protected with bank-level security.
            </p>
            <div className="flex items-center text-custom-accent-green font-semibold">
              <FontAwesomeIcon icon={faLock} className="w-5 h-5 mr-2" />
              <span className="desktop-text-lg">SSL Encrypted</span>
            </div>
          </div>

          {/* Quality Guarantee */}
          <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-custom-primary-green hover:-translate-y-2 md:col-span-2 lg:col-span-1">
            <div className="w-16 h-16 bg-gradient-to-br from-custom-primary-green to-custom-accent-green rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <FontAwesomeIcon icon={faAward} className="w-8 h-8 text-white" />
            </div>
            <h3 className="desktop-text-2xl font-bold text-gray-900 mb-4">Quality Guarantee</h3>
            <p className="desktop-text-lg text-gray-600 mb-6 leading-relaxed">
              Every book comes with our quality guarantee. If you're not satisfied, we'll make it right with our hassle-free return policy.
            </p>
            <div className="flex items-center text-custom-primary-green font-semibold">
              <FontAwesomeIcon icon={faCertificate} className="w-5 h-5 mr-2" />
              <span className="desktop-text-lg">30-day guarantee</span>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-custom-dark-grey via-custom-primary-green to-custom-accent-green rounded-3xl p-12 text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {/* Books Count */}
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-custom-primary-green to-custom-accent-green rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <FontAwesomeIcon icon={faBook} className="w-10 h-10 text-white" />
              </div>
              <div className="desktop-text-4xl font-bold mb-2">
                <AnimatedCounter end={50000} duration={2500} />+
              </div>
              <div className="desktop-text-lg text-gray-300 font-medium">Books</div>
              <div className="desktop-text-sm text-gray-400 mt-1">Massive collection</div>
            </div>

            {/* Rating */}
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-custom-accent-green to-custom-primary-green rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <FontAwesomeIcon icon={faStar} className="w-10 h-10 text-white" />
              </div>
              <div className="desktop-text-4xl font-bold mb-2">4.9/5</div>
              <div className="desktop-text-lg text-gray-300 font-medium">Rating</div>
              <div className="desktop-text-sm text-gray-400 mt-1">Customer satisfaction</div>
            </div>

            {/* Fast Delivery */}
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-custom-primary-green to-custom-accent-green rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <FontAwesomeIcon icon={faRocket} className="w-10 h-10 text-white" />
              </div>
              <div className="desktop-text-4xl font-bold mb-2">Fast</div>
              <div className="desktop-text-lg text-gray-300 font-medium">Delivery</div>
              <div className="desktop-text-sm text-gray-400 mt-1">Same day shipping</div>
            </div>

            {/* 24/7 Support */}
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-custom-accent-green to-custom-primary-green rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <FontAwesomeIcon icon={faHeadset} className="w-10 h-10 text-white" />
              </div>
              <div className="desktop-text-4xl font-bold mb-2">24/7</div>
              <div className="desktop-text-lg text-gray-300 font-medium">Support</div>
              <div className="desktop-text-sm text-gray-400 mt-1">Always here to help</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
