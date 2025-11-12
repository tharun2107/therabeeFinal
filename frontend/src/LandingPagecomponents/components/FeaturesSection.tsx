import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Shield, Video, Calendar, CreditCard, Bell, BarChart3, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface FeaturesSectionProps {
  darkMode?: boolean
}

const features = [
  {
    icon: Shield,
    title: "Secure Authentication & Privacy",
    description: "HIPAA-compliant platform with end-to-end encryption to protect your family's sensitive information."
  },
  {
    icon: Video,
    title: "Real-Time Video Sessions",
    description: "High-quality video calls with screen sharing, interactive tools, and secure session recording."
  },
  {
    icon: Calendar,
    title: "Smart Booking & Scheduling",
    description: "Easy appointment scheduling with calendar integration, automated reminders, and rescheduling options."
  },
  {
    icon: CreditCard,
    title: "Safe Payments & Transactions",
    description: "Secure payment processing with multiple options, insurance integration, and transparent pricing."
  },
  {
    icon: Bell,
    title: "In-App Notifications & Reminders",
    description: "Stay connected with timely reminders, session notifications, and important updates from your therapist."
  },
  {
    icon: BarChart3,
    title: "Progress Reports & History",
    description: "Track your child's progress with detailed reports, session notes, and milestone achievements."
  }
];

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ darkMode = false }) => {
  return (
    <section 
      id="features" 
      className={`py-12 sm:py-16 lg:py-20 transition-colors duration-300 ${
        darkMode 
          ? 'bg-black' 
          : 'bg-[#F9F9F9]'
      }`}
    >

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Everything You Need for{" "}
            <span className={darkMode ? 'text-accent-blue' : 'text-[#1A1A1A]'}>
              Successful Therapy
            </span>
          </h2>
          <p className={`text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed px-4 ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Our comprehensive platform provides all the tools families and therapists need 
            for effective, secure, and convenient therapy sessions.
          </p>
          <div className={`w-24 h-1 rounded-full mx-auto mt-6 ${
            darkMode ? 'bg-accent-blue' : 'bg-[#1A1A1A]'
          }`} />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <Card key={index} className={`group hover:shadow-lg transition-shadow duration-300 h-full border ${
              darkMode 
                ? 'border-gray-700 bg-black' 
                : 'border-[#E6E6E6] bg-white'
            }`}>
              <CardHeader className="text-center pb-4">
                <div className={`w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                  darkMode ? 'bg-accent-blue/30' : 'bg-accent-blue/40'
                }`}>
                  <feature.icon className={`w-7 h-7 sm:w-8 sm:h-8 ${
                    darkMode ? 'text-white' : 'text-[#1A1A1A]'
                  }`} />
                </div>
                <CardTitle className={`text-lg sm:text-xl font-semibold ${
                  darkMode ? 'text-white' : 'text-[#1A1A1A]'
                }`}>
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`text-sm sm:text-base text-center leading-relaxed ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 sm:mt-16">
          <p className={`text-base sm:text-lg mb-6 px-4 ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Ready to experience the future of therapy?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
            <Link to="/login">
              <button className={`px-6 sm:px-8 py-3 sm:py-4 font-bold rounded-lg hover:shadow-lg transition-shadow duration-300 w-full sm:w-auto flex items-center justify-center ${
                darkMode 
                  ? 'bg-white text-black hover:bg-gray-200' 
                  : 'bg-black text-white hover:bg-[#1A1A1A]'
              }`}>
                Sign In
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;