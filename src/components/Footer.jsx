import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Heart, 
  BookOpen, 
  Star,
  ArrowRight,
  Facebook,
  Twitter,
  Instagram,
  CreditCard,
  Shield,
  Gift,
  Users,
  HelpCircle,
  Truck,
  Award
} from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-emerald-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold mb-4">Join Our Reading Community</h3>
          <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
            Get exclusive deals, new release alerts, and personalized recommendations
          </p>
          
          {subscribed ? (
            <div className="bg-white/20 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-white text-lg font-semibold">
                🎉 Welcome to the Ikirezi family! Check your email for a special welcome offer.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-3 rounded-l-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-r-lg hover:bg-amber-600 transition-colors duration-300 flex items-center"
              >
                Subscribe
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Shop Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">I</span>
              </div>
              <span className="text-xl font-bold">Ikirezi Bookstore</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
              Your premier destination for curated literature. Discover stories that inspire, educate, and entertain.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-colors duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-colors duration-300">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-colors duration-300">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="font-semibold text-emerald-400 mb-4 text-lg">Shop</h4>
            <ul className="space-y-3">
              <FooterLink name="All Books" path="/books" />
              <FooterLink name="New Releases" path="/new-releases" />
              <FooterLink name="Bestsellers" path="/bestsellers" />
              <FooterLink name="eBooks" path="/ebooks" />
              <FooterLink name="Audiobooks" path="/audiobooks" />
              <FooterLink name="Textbooks" path="/textbooks" />
            </ul>
          </div>

          {/* Customer Service Column */}
          <div>
            <h4 className="font-semibold text-emerald-400 mb-4 text-lg">Customer Service</h4>
            <ul className="space-y-3">
              <FooterLink name="Help Center" path="/help" />
              <FooterLink name="Shipping & Returns" path="/shipping-returns" />
              <FooterLink name="Order Status" path="/orders" />
              <FooterLink name="Gift Cards" path="/gift-cards" />
              <FooterLink name="Contact Us" path="/contact" />
              <FooterLink name="Accessibility" path="/accessibility" />
            </ul>
          </div>

          {/* Company & Membership Column */}
          <div>
            <h4 className="font-semibold text-emerald-400 mb-4 text-lg">Company</h4>
            <ul className="space-y-3">
              <FooterLink name="About Ikirezi" path="/about" />
              <FooterLink name="Careers" path="/careers" />
              <FooterLink name="Press" path="/press" />
              <FooterLink name="Affiliates" path="/affiliates" />
              <FooterLink name="Loyalty Program" path="/loyalty" />
              <FooterLink name="Book Clubs" path="/book-clubs" />
            </ul>
          </div>
        </div>

        {/* Trust & Payment Section */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            
            {/* Trust Badges */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-gray-400">
                <Shield className="w-5 h-5 text-emerald-400" />
                <span className="text-sm">Secure Payment</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Truck className="w-5 h-5 text-emerald-400" />
                <span className="text-sm">Free Shipping Over $50</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Award className="w-5 h-5 text-emerald-400" />
                <span className="text-sm">Award-Winning Service</span>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-400 mr-2">We Accept:</div>
              <div className="flex space-x-2 opacity-70">
                <CreditCard className="w-8 h-8 text-gray-400" />
                <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-300">VISA</span>
                </div>
                <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-300">MC</span>
                </div>
                <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-300">PP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 bg-gray-950 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-gray-400">
            
            {/* Copyright */}
            <div className="flex items-center space-x-2">
              <span>© {new Date().getFullYear()} Ikirezi Bookstore. All rights reserved.</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
            </div>
            
            {/* Legal Links */}
            <div className="flex space-x-6">
              <LegalLink name="Privacy Policy" path="/privacy" />
              <LegalLink name="Terms of Service" path="/terms" />
              <LegalLink name="Cookie Settings" path="/cookies" />
              <LegalLink name="Do Not Sell My Info" path="/donotsell" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Helper Components
const FooterLink = ({ name, path }) => (
  <li>
    <Link 
      to={path}
      className="text-gray-400 hover:text-amber-400 transition-colors duration-300 hover:underline text-sm"
    >
      {name}
    </Link>
  </li>
);

const LegalLink = ({ name, path }) => (
  <Link 
    to={path}
    className="text-gray-500 hover:text-gray-300 transition-colors duration-300 text-xs"
  >
    {name}
  </Link>
);

export default Footer;