import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { UserPlus, Search, CreditCard, Video, TrendingUp } from "lucide-react";

interface HowItWorksSectionProps {
  darkMode?: boolean
}

const steps = [
  {
    icon: UserPlus,
    title: "Sign Up",
    description: "Parents and therapists register with secure verification and background checks.",
    number: "01"
  },
  {
    icon: Search,
    title: "Browse Therapists",
    description: "Explore verified therapist profiles, specializations, and real-time availability.",
    number: "02"
  },
  {
    icon: CreditCard,
    title: "Book & Pay",
    description: "Secure appointment booking with integrated payments via Stripe and Razorpay.",
    number: "03"
  },
  {
    icon: Video,
    title: "Attend Session",
    description: "Join high-quality video sessions powered by Zoom with interactive therapy tools.",
    number: "04"
  },
  {
    icon: TrendingUp,
    title: "Track Progress",
    description: "Receive detailed progress reports, session summaries, and milestone updates.",
    number: "05"
  }
];

const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ darkMode = false }) => {
  return (
    <section 
      id="how-it-works" 
      className={`py-12 sm:py-16 lg:py-20 transition-colors duration-300 ${
        darkMode 
          ? 'bg-black' 
          : 'bg-[#F9F9F9]'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 px-4 ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}>
            How <span className={darkMode ? 'text-accent-blue' : 'text-[#1A1A1A]'}>
              Therabee
            </span> Works
          </h2>
          <p className={`text-base sm:text-lg md:text-xl max-w-2xl mx-auto px-4 ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Get started with therapy in just 5 simple steps. Our streamlined process 
            makes it easy for families to connect with the right therapist.
          </p>
          <div className={`w-24 h-1 rounded-full mx-auto mt-6 ${
            darkMode ? 'bg-accent-blue' : 'bg-[#1A1A1A]'
          }`} />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Steps */}
          <div className="space-y-8 sm:space-y-12 lg:space-y-16">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12"
              >
                {/* Content */}
                <div className="flex-1 text-center lg:text-left w-full">
                  <div className={`rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border ${
                    darkMode 
                      ? 'bg-black border-gray-700' 
                      : 'bg-white border-[#E6E6E6]'
                  }`}>
                    <div className="flex items-center justify-center lg:justify-start mb-4">
                      <span className={`text-4xl sm:text-5xl lg:text-6xl font-bold mr-4 ${
                        darkMode ? 'text-accent-blue/20' : 'text-accent-blue/20'
                      }`}>
                        {step.number}
                      </span>
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center ${
                        darkMode ? 'bg-accent-blue/40' : 'bg-accent-blue/50'
                      }`}>
                        <step.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                    </div>
                    <h3 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 ${
                      darkMode ? 'text-white' : 'text-gray-800'
                    }`}>
                      {step.title}
                    </h3>
                    <p className={`text-sm sm:text-base leading-relaxed ${
                      darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Center Circle (Desktop) */}
                <div className="hidden lg:flex items-center justify-center">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    darkMode ? 'bg-accent-blue/40' : 'bg-accent-blue/50'
                  }`}>
                    <div className={`w-8 h-8 rounded-full ${
                      darkMode ? 'bg-gray-800' : 'bg-white'
                    }`} />
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="flex-1 hidden lg:block"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 sm:mt-16">
          <div className={`rounded-2xl p-6 sm:p-8 shadow-lg max-w-2xl mx-auto border ${
            darkMode 
              ? 'bg-black border-gray-700' 
              : 'bg-white border-[#E6E6E6]'
          }`}>
            <h3 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}>
              Ready to Get Started?
            </h3>
            <p className={`text-sm sm:text-base mb-6 ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Join thousands of families who have found the right therapeutic support through Therabee.
            </p>
            <Link to="/login">
              <button className={`px-6 sm:px-8 py-3 sm:py-4 font-semibold rounded-lg hover:shadow-lg transition-shadow duration-300 text-base sm:text-lg flex items-center justify-center mx-auto ${
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

export default HowItWorksSection;
