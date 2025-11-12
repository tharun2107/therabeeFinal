import React from "react";
import { Separator } from "./ui/separator";
import { Heart, Linkedin, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

interface FooterProps {
  darkMode?: boolean
}

const Footer: React.FC<FooterProps> = ({ darkMode = false }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`relative overflow-hidden transition-colors duration-300 ${
      darkMode 
        ? 'bg-black text-white' 
        : 'bg-[#1A1A1A] text-white'
    }`}>
      {/* Top border */}
      <div className={`h-1 ${
        darkMode ? 'bg-accent-blue' : 'bg-accent-blue'
      }`} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">Therabee</h3>
              <p className="text-gray-300 leading-relaxed">
                Connecting children with trusted therapists through secure, 
                accessible, and innovative technology solutions.
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className={`w-4 h-4 ${darkMode ? 'text-accent-blue' : 'text-accent-blue'}`} />
                <span className="text-gray-300 text-sm">hello@therabee.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className={`w-4 h-4 ${darkMode ? 'text-accent-blue' : 'text-accent-blue'}`} />
                <span className="text-gray-300 text-sm">1-800-THERAPY</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className={`w-4 h-4 ${darkMode ? 'text-accent-blue' : 'text-accent-blue'}`} />
                <span className="text-gray-300 text-sm">San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 sm:space-y-6">
            <h4 className={`text-base sm:text-lg font-semibold ${
              darkMode ? 'text-accent-blue' : 'text-accent-blue'
            }`}>Quick Links</h4>
            <ul className="space-y-2 sm:space-y-3">
              {['About Us', 'How It Works', 'Find Therapists', 'Pricing', 'Blog'].map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-gray-300 hover:text-accent-blue transition-colors text-sm block"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4 sm:space-y-6">
            <h4 className={`text-base sm:text-lg font-semibold ${
              darkMode ? 'text-accent-blue' : 'text-accent-blue'
            }`}>Support</h4>
            <ul className="space-y-2 sm:space-y-3">
              {['Help Center', 'Contact Support', 'Safety & Privacy', 'Community Guidelines', 'Emergency Resources', 'System Status'].map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-gray-300 hover:text-accent-blue transition-colors text-sm block"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Social */}
          <div className="space-y-4 sm:space-y-6">
            <h4 className={`text-base sm:text-lg font-semibold ${
              darkMode ? 'text-accent-blue' : 'text-accent-blue'
            }`}>Legal</h4>
            <ul className="space-y-2 sm:space-y-3">
              {['Privacy Policy', 'Terms of Service', 'HIPAA Compliance', 'Cookie Policy', 'Accessibility'].map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-gray-300 hover:text-accent-blue transition-colors text-sm block"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>

            {/* Social Media */}
            <div className="space-y-4">
              <h5 className={`text-sm font-semibold ${
                darkMode ? 'text-accent-blue' : 'text-accent-blue'
              }`}>Follow Us</h5>
              <div className="flex space-x-4">
                {[
                  { icon: Linkedin, href: '#', label: 'LinkedIn' },
                  { icon: Twitter, href: '#', label: 'Twitter' },
                  { icon: Instagram, href: '#', label: 'Instagram' }
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className={`w-10 h-10 rounded-full flex items-center justify-center hover:shadow-lg transition-shadow ${
                      darkMode ? 'bg-accent-blue/30' : 'bg-accent-blue/40'
                    }`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4 text-white" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Separator className={`my-6 sm:my-8 ${darkMode ? 'bg-gray-800' : 'bg-gray-700'}`} />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 text-gray-300 text-xs sm:text-sm">
            <span>© {currentYear} Therabee. All Rights Reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center space-x-1">
              <span>Made with</span>
              <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 fill-current" />
              <span>for families</span>
            </span>
          </div>

          {/* Certifications */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className={`px-2 sm:px-3 py-1 rounded ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'} shadow-lg`}>
              <span className={`text-[10px] sm:text-xs font-semibold ${darkMode ? 'text-accent-blue' : 'text-[#1A1A1A]'}`}>HIPAA Compliant</span>
            </div>
            <div className={`px-2 sm:px-3 py-1 rounded ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'} shadow-lg`}>
              <span className={`text-[10px] sm:text-xs font-semibold ${darkMode ? 'text-accent-blue' : 'text-[#1A1A1A]'}`}>SOC 2 Certified</span>
            </div>
          </div>
        </div>

        {/* Emergency Notice */}
        <div className={`mt-6 sm:mt-8 p-3 sm:p-4 rounded-lg ${
          darkMode 
            ? 'bg-red-900/30 border border-red-800' 
            : 'bg-red-50 border border-red-200'
        }`}>
          <p className={`text-sm text-center ${
            darkMode ? 'text-red-300' : 'text-red-700'
          }`}>
            <strong>Crisis Support:</strong> If you or your child are experiencing a mental health emergency, 
            please call <a href="tel:988" className="underline font-semibold">988</a> (Suicide & Crisis Lifeline) or go to your nearest emergency room immediately.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;