import React from "react";
import { Card, CardContent } from "./ui/card";
import { Star, Quote } from "lucide-react";
import { useState, useEffect } from "react";

interface TestimonialsSectionProps {
  darkMode?: boolean
}

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Parent",
    content: "Therabee transformed how we approach my daughter's therapy. The convenience of home sessions and the quality of therapists exceeded our expectations.",
    rating: 5,
    avatar: "SJ"
  },
  {
    name: "Dr. Michael Chen",
    role: "Licensed Therapist",
    content: "As a therapist, I love how Therabee streamlines my practice. The scheduling, payments, and progress tracking tools are incredibly intuitive.",
    rating: 5,
    avatar: "MC"
  },
  {
    name: "Emma Rodriguez",
    role: "Parent",
    content: "Finding the right therapist for my son was always challenging. Therabee made it simple, and the results have been amazing.",
    rating: 5,
    avatar: "ER"
  },
  {
    name: "Dr. Amanda Foster",
    role: "Child Psychologist",
    content: "The platform's security features and HIPAA compliance give me confidence that my patients' information is always protected.",
    rating: 5,
    avatar: "AF"
  },
  {
    name: "James Mitchell",
    role: "Parent",
    content: "The progress tracking feature helps me stay involved in my child's therapy journey. It's reassuring to see the improvements over time.",
    rating: 5,
    avatar: "JM"
  }
];

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ darkMode = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: rating }).map((_, i) => (
      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
    ));
  };

  return (
    <section 
      id="testimonials" 
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
            What Our <span className={darkMode ? 'text-accent-blue' : 'text-[#1A1A1A]'}>
              Community
            </span> Says
          </h2>
          <p className={`text-base sm:text-lg md:text-xl max-w-2xl mx-auto px-4 ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Hear from families and therapists who have experienced the difference 
            that Therabee makes in their therapy journey.
          </p>
          <div className={`w-24 h-1 rounded-full mx-auto mt-6 ${
            darkMode ? 'bg-accent-blue' : 'bg-[#1A1A1A]'
          }`} />
        </div>

        {/* Testimonials Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className="w-full flex-shrink-0 px-4 sm:px-6"
                >
                  <Card className={`border-0 shadow-lg hover:shadow-xl max-w-3xl mx-auto transition-shadow duration-300 ${
                    darkMode 
                      ? 'bg-black border-gray-700' 
                      : 'bg-white border-[#E6E6E6]'
                  }`}>
                    <CardContent className="p-6 sm:p-8 text-center">
                      {/* Quote Icon */}
                      <div className="mb-4 sm:mb-6">
                        <Quote className={`w-10 h-10 sm:w-12 sm:h-12 mx-auto ${
                          darkMode ? 'text-accent-blue/20' : 'text-accent-blue/30'
                        }`} />
                      </div>

                      {/* Testimonial Text */}
                      <blockquote className={`text-base sm:text-lg md:text-xl leading-relaxed mb-6 sm:mb-8 italic ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        "{testimonial.content}"
                      </blockquote>

                      {/* Rating */}
                      <div className="flex justify-center mb-4 sm:mb-6">
                        {renderStars(testimonial.rating)}
                      </div>

                      {/* Author */}
                      <div className="flex items-center justify-center space-x-4">
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-semibold shadow-lg ${
                          darkMode 
                            ? 'bg-accent-blue text-white' 
                            : 'bg-accent-blue text-white'
                        }`}>
                          {testimonial.avatar}
                        </div>
                        <div className="text-left">
                          <div className={`font-semibold text-sm sm:text-base ${
                            darkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                            {testimonial.name}
                          </div>
                          <div className={`text-xs sm:text-sm ${
                            darkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {testimonial.role}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center mt-6 sm:mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? darkMode 
                      ? 'bg-accent-blue' 
                      : 'bg-accent-blue'
                    : darkMode 
                      ? 'bg-accent-blue/30 hover:bg-accent-blue/50' 
                      : 'bg-accent-blue/30 hover:bg-accent-blue/50'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16">
          {[
            { value: "500+", label: "Verified Therapists" },
            { value: "10k+", label: "Successful Sessions" },
            { value: "98%", label: "Family Satisfaction" }
          ].map((stat, index) => (
            <div 
              key={stat.label}
              className="text-center"
            >
              <div className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 ${
                darkMode ? 'text-accent-blue' : 'text-[#1A1A1A]'
              }`}>
                {stat.value}
              </div>
              <div className={`text-sm sm:text-base ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
