import { useState } from 'react';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStatus('success');
      setMessage('Thank you for subscribing! Check your email for confirmation.');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (status === 'error') {
      setStatus('idle');
      setMessage('');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
      aria-labelledby="newsletter-heading"
    >
      <div className="flex-1 relative">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address for newsletter subscription
        </label>
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter your email"
          className="w-full px-4 py-3 pr-10 rounded-lg border-0 focus:ring-2 focus:ring-yellow-400 focus:outline-none text-gray-900 placeholder-gray-500"
          disabled={status === 'loading'}
          aria-describedby={message ? 'newsletter-message' : undefined}
          aria-invalid={status === 'error'}
          aria-label="Email address for newsletter subscription"
        />
        <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true" />
      </div>
      
      <button 
        type="submit"
        disabled={status === 'loading' || status === 'success'}
        className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:ring-4 focus:ring-yellow-300 focus:outline-none flex items-center justify-center"
        aria-label="Subscribe to newsletter"
      >
        {status === 'loading' ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 mr-2"></div>
            Subscribing...
          </>
        ) : status === 'success' ? (
          <>
            <CheckCircle className="w-4 h-4 mr-2" />
            Subscribed!
          </>
        ) : (
          'Subscribe'
        )}
      </button>

      {message && (
        <div 
          id="newsletter-message"
          className={`mt-2 text-sm flex items-center justify-center ${
            status === 'success' ? 'text-green-200' : 'text-red-200'
          }`}
          role="alert"
          aria-live="polite"
        >
          {status === 'error' && <AlertCircle className="w-4 h-4 mr-1" />}
          {status === 'success' && <CheckCircle className="w-4 h-4 mr-1" />}
          {message}
        </div>
      )}
    </form>
  );
}

