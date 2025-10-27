import { SEOHead } from '../components/SEOHead';
import { AdvancedParallax, FloatingElements } from '../components/AdvancedParallax';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { 
  Shield, 
  Eye, 
  Lock, 
  Database, 
  UserCheck,
  FileText,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

export function Privacy() {
  const [heroRef, heroVisible] = useScrollAnimation(0.1);
  const [contentRef, contentVisible] = useScrollAnimation(0.2);

  const privacySections = [
    {
      icon: Database,
      title: "Information We Collect",
      content: [
        "Personal information you provide (name, email, address)",
        "Payment and billing information",
        "Account preferences and settings",
        "Communication records and support interactions",
        "Website usage data and analytics",
        "Device information and IP addresses"
      ]
    },
    {
      icon: Eye,
      title: "How We Use Your Information",
      content: [
        "Process orders and provide customer service",
        "Send important updates about your account",
        "Improve our website and services",
        "Personalize your reading recommendations",
        "Send marketing communications (with your consent)",
        "Comply with legal obligations"
      ]
    },
    {
      icon: Lock,
      title: "Information Protection",
      content: [
        "SSL encryption for all data transmission",
        "Secure servers with regular security updates",
        "Limited access to personal information",
        "Regular security audits and assessments",
        "Employee training on data protection",
        "Incident response procedures"
      ]
    },
    {
      icon: UserCheck,
      title: "Your Rights",
      content: [
        "Access your personal information",
        "Correct inaccurate data",
        "Delete your account and data",
        "Opt-out of marketing communications",
        "Data portability",
        "Withdraw consent at any time"
      ]
    }
  ];

  return (
    <>
      <SEOHead 
        title="Privacy Policy | Ikirezi Bookstore"
        description="Learn how Ikirezi protects your privacy and handles your personal information. Read our comprehensive privacy policy."
        keywords="privacy policy, data protection, personal information, ikirezi privacy, GDPR"
      />
      
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden">
          <FloatingElements count={8} intensity={0.4} />
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
          
          <div ref={heroRef} className="desktop-container relative z-10 text-center">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl flex items-center justify-center shadow-2xl">
                <Shield className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="desktop-text-6xl font-bold text-white mb-6">
              Privacy <span className="text-yellow-300">Policy</span>
            </h1>
            <p className="desktop-text-2xl text-blue-100 max-w-4xl mx-auto mb-8 leading-relaxed">
              Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
            </p>
            <div className="flex justify-center items-center space-x-8 mt-12">
              <div className="flex items-center space-x-2 text-blue-100">
                <CheckCircle className="w-6 h-6" />
                <span className="desktop-text-lg">GDPR Compliant</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-100">
                <Lock className="w-6 h-6" />
                <span className="desktop-text-lg">Secure Data</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-100">
                <Eye className="w-6 h-6" />
                <span className="desktop-text-lg">Transparent</span>
              </div>
            </div>
          </div>
        </section>

        {/* Last Updated */}
        <section className="py-8 bg-white border-b border-gray-200">
          <div className="desktop-container">
            <div className="flex items-center justify-center space-x-4">
              <FileText className="w-6 h-6 text-gray-500" />
              <p className="desktop-text-lg text-gray-600">
                Last updated: <span className="font-semibold text-gray-900">December 15, 2024</span>
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section ref={contentRef} className="py-24 bg-white relative overflow-hidden">
          <FloatingElements count={4} intensity={0.1} />
          <div className="desktop-container">
            <div className="max-w-4xl mx-auto">
              {/* Introduction */}
              <div className="mb-16">
                <h2 className="desktop-text-4xl font-bold text-gray-900 mb-8">
                  Our Commitment to Your Privacy
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="desktop-text-lg text-gray-600 leading-relaxed mb-6">
                    At Ikirezi, we are committed to protecting your privacy and ensuring the security of your personal information. 
                    This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our 
                    website or use our services.
                  </p>
                  <p className="desktop-text-lg text-gray-600 leading-relaxed">
                    By using our services, you agree to the collection and use of information in accordance with this policy. 
                    If you do not agree with our policies and practices, please do not use our services.
                  </p>
                </div>
              </div>

              {/* Privacy Sections */}
              <div className="space-y-16">
                {privacySections.map((section, index) => (
                  <AdvancedParallax key={index} intensity={0.1} className="group">
                    <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-3xl p-8 hover:shadow-xl transition-all duration-500 border border-gray-100 group-hover:border-blue-200">
                      <div className="flex items-start space-x-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                          <section.icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="desktop-text-3xl font-bold text-gray-900 mb-6 group-hover:text-blue-600 transition-colors duration-300">
                            {section.title}
                          </h3>
                          <ul className="space-y-3">
                            {section.content.map((item, idx) => (
                              <li key={idx} className="flex items-start space-x-3">
                                <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                <span className="desktop-text-lg text-gray-700">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </AdvancedParallax>
                ))}
              </div>

              {/* Detailed Sections */}
              <div className="mt-20 space-y-12">
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <h3 className="desktop-text-2xl font-bold text-gray-900 mb-6">Cookies and Tracking Technologies</h3>
                  <p className="desktop-text-lg text-gray-600 leading-relaxed mb-4">
                    We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, 
                    and personalize content. You can control cookie settings through your browser preferences.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="desktop-text-base text-gray-700">Essential cookies for website functionality</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="desktop-text-base text-gray-700">Analytics cookies to understand user behavior</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="desktop-text-base text-gray-700">Marketing cookies for personalized content</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <h3 className="desktop-text-2xl font-bold text-gray-900 mb-6">Third-Party Services</h3>
                  <p className="desktop-text-lg text-gray-600 leading-relaxed mb-4">
                    We may use third-party services for payment processing, analytics, and marketing. These services have their 
                    own privacy policies, and we encourage you to review them.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="desktop-text-base text-gray-700">Payment processors (Stripe, PayPal)</span>
                    </div>
                    <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="desktop-text-base text-gray-700">Analytics (Google Analytics)</span>
                    </div>
                    <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="desktop-text-base text-gray-700">Email marketing (Mailchimp)</span>
                    </div>
                    <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="desktop-text-base text-gray-700">Customer support (Zendesk)</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 border border-red-200">
                  <div className="flex items-start space-x-4">
                    <AlertTriangle className="w-8 h-8 text-red-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="desktop-text-2xl font-bold text-gray-900 mb-4">Data Breach Notification</h3>
                      <p className="desktop-text-lg text-gray-700 leading-relaxed">
                        In the unlikely event of a data breach that affects your personal information, we will notify you 
                        within 72 hours as required by law. We will also notify relevant authorities and take immediate 
                        steps to secure our systems.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="mt-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 text-white">
                <h3 className="desktop-text-3xl font-bold mb-6">Questions About Your Privacy?</h3>
                <p className="desktop-text-lg text-blue-100 mb-8 leading-relaxed">
                  If you have any questions about this Privacy Policy or how we handle your personal information, 
                  please don't hesitate to contact us.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="desktop-text-xl font-bold mb-3">Email Us</h4>
                    <p className="desktop-text-lg text-blue-100">privacy@ikirezi.com</p>
                  </div>
                  <div>
                    <h4 className="desktop-text-xl font-bold mb-3">Call Us</h4>
                    <p className="desktop-text-lg text-blue-100">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
