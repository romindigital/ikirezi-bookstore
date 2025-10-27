import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope, 
  faPhone, 
  faMapMarker, 
  faHeart, 
  faBookOpen, 
  faStar,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

// Advanced, production-ready Footer Component
export function AdvancedFooter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Simple validation
    if (email && email.includes('@')) {
      // In a real app, you'd make an API call here.
      console.log(`Subscribing ${email}`);
      setSubscribed(true);
      // Optional: Clear email after a short delay
      setTimeout(() => setEmail(''), 3000);
    } else {
      alert('Please enter a valid email address.');
    }
  };

  return (
    // Updated styling: darker base, more prominent gradient, and a subtle drop shadow/glow
    <footer className="bg-custom-dark-grey relative overflow-hidden shadow-2xl shadow-custom-primary-green/20">
      
      {/* Dynamic Background Element (Subtle, slow-moving glow/blob for a modern look) */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute w-64 h-64 bg-custom-accent-green rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob top-10 left-10"></div>
        <div className="absolute w-64 h-64 bg-custom-primary-green rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000 bottom-10 right-10"></div>
      </div>
      
      {/* Main Content Area */}
      <div className="desktop-container relative z-20 py-16 md:py-20 lg:py-24 border-t border-custom-primary-green/30">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-12 lg:gap-16">

          {/* Column 1: Company Info & Newsletter (Enhanced) */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center space-x-3">
              <div className="w-14 h-14 bg-gradient-to-br from-custom-primary-green to-custom-accent-green rounded-2xl flex items-center justify-center shadow-lg shadow-custom-primary-green/40">
                <FontAwesomeIcon icon={faBookOpen} className="w-7 h-7 text-white" />
              </div>
              <span className="desktop-text-3xl font-extrabold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent tracking-wider">
                Ikirezi
              </span>
            </div>
            
            <p className="desktop-text-lg text-gray-400 leading-relaxed max-w-md">
              Your premier destination for literature. **Join our journey** to discover, explore, and enjoy a curated collection of worlds.
            </p>
            
            {/* Newsletter Subscription (New Feature) */}
            <div className="space-y-4">
              <h4 className="desktop-text-xl font-semibold text-white">Subscribe to Our Newsletter 📚</h4>
              {subscribed ? (
                <p className="text-custom-accent-green font-medium desktop-text-lg">
                  Thank you for subscribing! Check your inbox.
                </p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex desktop-max-w-md">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-grow p-3 rounded-l-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-custom-primary-green desktop-text-base"
                  />
                  <button
                    type="submit"
                    className="bg-custom-primary-green p-3 rounded-r-lg text-white font-semibold hover:bg-custom-accent-green transition-all duration-300 desktop-hover-scale flex items-center justify-center"
                    aria-label="Subscribe"
                  >
                    <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
            
            {/* Social Links & Rating */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
                {/* Social Links (Added LinkedIn) */}
                <div className="flex space-x-3">
                    <SocialIcon icon={faFacebookF} href="#" colorClass="hover:bg-blue-600" />
                    <SocialIcon icon={faTwitter} href="#" colorClass="hover:bg-sky-400" />
                    <SocialIcon icon={faInstagram} href="#" colorClass="hover:bg-pink-600" />
                    <SocialIcon icon={faLinkedinIn} href="#" colorClass="hover:bg-blue-500" />
                </div>
                {/* Rating (Simplified visual logic for brevity) */}
                <div className="flex items-center space-x-2">
                    <div className="flex text-yellow-400">
                        <FontAwesomeIcon icon={faStar} className="w-4 h-4 fill-current desktop-animate-star-pulse" />
                        <span className="ml-2 desktop-text-lg text-gray-300 font-medium">4.9/5</span>
                    </div>
                </div>
            </div>
          </div>

          {/* Column 2: Quick Links (Condensed) */}
          <div className="space-y-6">
            <h3 className="desktop-text-xl font-bold text-white border-b border-custom-primary-green/50 pb-2">Explore</h3>
            <ul className="space-y-3">
              <AdvancedLink name='Home' path='/' />
              <AdvancedLink name='All Books' path='/books' />
              <AdvancedLink name='New Releases' path='/new' />
              <AdvancedLink name='Categories' path='/categories' />
              <AdvancedLink name='About Us' path='/about' />
            </ul>
          </div>

          {/* Column 3: Customer Service & Resources (Renamed) */}
          <div className="space-y-6">
            <h3 className="desktop-text-xl font-bold text-white border-b border-custom-primary-green/50 pb-2">Support</h3>
            <ul className="space-y-3">
              <AdvancedLink name='Help Center' path='/help' />
              <AdvancedLink name='Shipping & Returns' path='/shipping-returns' />
              <AdvancedLink name='Affiliate Program' path='/affiliates' />
              <AdvancedLink name='Careers' path='/careers' />
              <AdvancedLink name='Contact Us' path='/contact' />
            </ul>
          </div>

          {/* Column 4: Contact Info (Styled) */}
          <div className="space-y-6">
            <h3 className="desktop-text-xl font-bold text-white border-b border-custom-primary-green/50 pb-2">Reach Out</h3>
            <div className="space-y-4">
              <ContactItem icon={faEnvelope} text="info@ikirezi.com" isLink={true} href="mailto:info@ikirezi.com" />
              <ContactItem icon={faPhone} text="+1 (555) 123-4567" isLink={true} href="tel:+15551234567" />
              <ContactItem 
                icon={faMapMarker} 
                text={
                  <>
                    123 Book Street<br />
                    Reading City, RC 12345
                  </>
                }
              />
            </div>
          </div>
        </div>

        {/* --- */}
        
        {/* Bottom Bar: Copyright and Legal */}
        <div className="border-t border-gray-700 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Copyright */}
            <p className="desktop-text-base text-gray-500 flex items-center space-x-2">
              © {new Date().getFullYear()} Ikirezi. All rights reserved. Crafted with <FontAwesomeIcon icon={faHeart} className="w-4 h-4 text-red-500 desktop-animate-pulse" /> in RC.
            </p>
            
            {/* Legal Links */}
            <div className="flex space-x-6">
              <LegalLink name="Privacy Policy" path="/privacy" />
              <LegalLink name="Terms of Service" path="/terms" />
              <LegalLink name="Cookie Settings" path="/cookies" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// --- Helper Components for Cleanliness ---

/**
 * A reusable component for social media icons with advanced hover effects.
 */
const SocialIcon = ({ icon, href, colorClass }) => (
    <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer" 
        className={`w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center transition-all duration-300 desktop-hover-bounce group border border-gray-700 ${colorClass}`}
    >
        <FontAwesomeIcon icon={icon} className="w-5 h-5 text-gray-400 group-hover:text-white" />
    </a>
);

/**
 * A reusable component for main footer navigation links.
 */
const AdvancedLink = ({ name, path }) => (
    <li>
        <Link 
            to={path} 
            className="desktop-text-lg text-gray-400 hover:text-white transition-all duration-300 inline-block relative group"
        >
            <span className="relative z-10">{name}</span>
            {/* Underline animation effect */}
            <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-custom-accent-green transition-all duration-300 group-hover:w-full"></span>
        </Link>
    </li>
);

/**
 * A reusable component for bottom bar legal links.
 */
const LegalLink = ({ name, path }) => (
    <Link 
        to={path} 
        className="desktop-text-sm text-gray-500 hover:text-custom-primary-green transition-colors duration-300 hover:underline"
    >
        {name}
    </Link>
);

/**
 * A reusable component for contact information items.
 */
const ContactItem = ({ icon, text, isLink = false, href }) => {
    const content = (
        <div className="flex items-start space-x-4 group">
            <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-custom-primary-green transition-colors duration-300 shadow-md shadow-gray-900/50 mt-1">
                <FontAwesomeIcon icon={icon} className="w-5 h-5 text-gray-400 group-hover:text-white" />
            </div>
            <span className="desktop-text-lg text-gray-300 group-hover:text-white transition-colors leading-relaxed pt-1">
                {text}
            </span>
        </div>
    );

    if (isLink) {
        return (
            <a href={href} className="block hover:opacity-80 transition-opacity">
                {content}
            </a>
        );
    }
    return content;
};

export { AdvancedFooter as Footer };