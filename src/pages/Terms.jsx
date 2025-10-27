import { SEOHead } from '../components/SEOHead';
import { AdvancedParallax, FloatingElements } from '../components/AdvancedParallax';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { 
  FileText, 
  Scale, 
  AlertCircle, 
  CheckCircle,
  Shield,
  CreditCard,
  Truck,
  RotateCcw
} from 'lucide-react';

export function Terms() {
  const [heroRef, heroVisible] = useScrollAnimation(0.1);
  const [contentRef, contentVisible] = useScrollAnimation(0.2);

  const termsSections = [
    {
      icon: FileText,
      title: "Acceptance of Terms",
      content: [
        "By accessing and using Ikirezi's services, you accept and agree to be bound by these Terms of Service",
        "These terms apply to all visitors, users, and others who access or use the service",
        "If you disagree with any part of these terms, you may not access the service",
        "We reserve the right to update these terms at any time without prior notice"
      ]
    },
    {
      icon: CreditCard,
      title: "Payment and Billing",
      content: [
        "All prices are listed in USD and are subject to applicable taxes",
        "Payment is required at the time of purchase",
        "We accept major credit cards, PayPal, and other approved payment methods",
        "Refunds are processed according to our return policy",
        "We reserve the right to change prices at any time"
      ]
    },
    {
      icon: Truck,
      title: "Shipping and Delivery",
      content: [
        "We ship to addresses within the United States and select international locations",
        "Shipping times are estimates and may vary based on location and carrier",
        "Risk of loss transfers to you upon delivery to the carrier",
        "We are not responsible for delays caused by weather, natural disasters, or carrier issues",
        "International shipping may be subject to customs duties and taxes"
      ]
    },
    {
      icon: RotateCcw,
      title: "Returns and Exchanges",
      content: [
        "Books must be returned in new, unread condition within 30 days of purchase",
        "Return shipping costs are the responsibility of the customer unless the item is defective",
        "Digital products are generally non-refundable",
        "Custom or personalized items cannot be returned",
        "Refunds will be processed to the original payment method within 5-10 business days"
      ]
    },
    {
      icon: Shield,
      title: "User Accounts and Responsibilities",
      content: [
        "You are responsible for maintaining the confidentiality of your account",
        "You must provide accurate and complete information when creating an account",
        "You are responsible for all activities that occur under your account",
        "You must notify us immediately of any unauthorized use of your account",
        "We reserve the right to suspend or terminate accounts that violate these terms"
      ]
    },
    {
      icon: AlertCircle,
      title: "Prohibited Uses",
      content: [
        "You may not use our service for any unlawful purpose or to solicit others to perform unlawful acts",
        "You may not violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances",
        "You may not infringe upon or violate our intellectual property rights or the intellectual property rights of others",
        "You may not harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate",
        "You may not submit false or misleading information"
      ]
    }
  ];

  return (
    <>
      <SEOHead 
        title="Terms of Service | Ikirezi Bookstore"
        description="Read Ikirezi's Terms of Service to understand your rights and responsibilities when using our platform."
        keywords="terms of service, legal terms, user agreement, ikirezi terms, conditions"
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
                <Scale className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="desktop-text-6xl font-bold text-white mb-6">
              Terms of <span className="text-yellow-300">Service</span>
            </h1>
            <p className="desktop-text-2xl text-blue-100 max-w-4xl mx-auto mb-8 leading-relaxed">
              Please read these terms carefully before using our service. By using Ikirezi, you agree to be bound by these terms.
            </p>
            <div className="flex justify-center items-center space-x-8 mt-12">
              <div className="flex items-center space-x-2 text-blue-100">
                <CheckCircle className="w-6 h-6" />
                <span className="desktop-text-lg">Legally Binding</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-100">
                <Shield className="w-6 h-6" />
                <span className="desktop-text-lg">Protects Both Parties</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-100">
                <FileText className="w-6 h-6" />
                <span className="desktop-text-lg">Clear Guidelines</span>
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
                  Agreement to Terms
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="desktop-text-lg text-gray-600 leading-relaxed mb-6">
                    These Terms of Service ("Terms") govern your use of the Ikirezi website and services 
                    (collectively, the "Service") operated by Ikirezi Bookstore ("us", "we", or "our").
                  </p>
                  <p className="desktop-text-lg text-gray-600 leading-relaxed">
                    By accessing or using our Service, you agree to be bound by these Terms. If you disagree 
                    with any part of these terms, then you may not access the Service.
                  </p>
                </div>
              </div>

              {/* Terms Sections */}
              <div className="space-y-16">
                {termsSections.map((section, index) => (
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

              {/* Additional Legal Sections */}
              <div className="mt-20 space-y-12">
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <h3 className="desktop-text-2xl font-bold text-gray-900 mb-6">Intellectual Property Rights</h3>
                  <p className="desktop-text-lg text-gray-600 leading-relaxed mb-4">
                    The Service and its original content, features, and functionality are and will remain the exclusive 
                    property of Ikirezi Bookstore and its licensors. The Service is protected by copyright, trademark, 
                    and other laws.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="desktop-text-base text-gray-700">All book content remains the property of respective authors and publishers</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="desktop-text-base text-gray-700">Our website design and functionality are proprietary</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="desktop-text-base text-gray-700">User-generated content may be used for promotional purposes</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <h3 className="desktop-text-2xl font-bold text-gray-900 mb-6">Limitation of Liability</h3>
                  <p className="desktop-text-lg text-gray-600 leading-relaxed mb-4">
                    In no event shall Ikirezi Bookstore, nor its directors, employees, partners, agents, suppliers, 
                    or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, 
                    including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                  </p>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="desktop-text-base text-yellow-800">
                      <strong>Note:</strong> This limitation applies to the fullest extent permitted by law and does not 
                      affect your statutory rights as a consumer.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <h3 className="desktop-text-2xl font-bold text-gray-900 mb-6">Governing Law and Dispute Resolution</h3>
                  <p className="desktop-text-lg text-gray-600 leading-relaxed mb-4">
                    These Terms shall be interpreted and governed by the laws of the State of California, without 
                    regard to its conflict of law provisions. Any disputes arising from these Terms or your use of 
                    the Service shall be resolved through binding arbitration.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="desktop-text-base text-gray-700">Disputes will be resolved through individual arbitration</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="desktop-text-base text-gray-700">Class action lawsuits are waived</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="desktop-text-base text-gray-700">Arbitration will be conducted in California</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 border border-red-200">
                  <div className="flex items-start space-x-4">
                    <AlertCircle className="w-8 h-8 text-red-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="desktop-text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h3>
                      <p className="desktop-text-lg text-gray-700 leading-relaxed">
                        We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
                        If a revision is material, we will try to provide at least 30 days notice prior to any new 
                        terms taking effect. Your continued use of the Service after any such changes constitutes 
                        your acceptance of the new Terms.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="mt-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 text-white">
                <h3 className="desktop-text-3xl font-bold mb-6">Questions About These Terms?</h3>
                <p className="desktop-text-lg text-blue-100 mb-8 leading-relaxed">
                  If you have any questions about these Terms of Service, please contact us for clarification.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="desktop-text-xl font-bold mb-3">Legal Department</h4>
                    <p className="desktop-text-lg text-blue-100">legal@ikirezi.com</p>
                  </div>
                  <div>
                    <h4 className="desktop-text-xl font-bold mb-3">General Inquiries</h4>
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
