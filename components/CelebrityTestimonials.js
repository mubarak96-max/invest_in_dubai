'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

export default function CelebrityTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Sample celebrity testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Shah Rukh Khan",
      title: "Bollywood Superstar",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      property: "Burj Khalifa Penthouse",
      location: "Downtown Dubai",
      investment: "AED 45M",
      quote: "Dubai's real estate market is unmatched. My investment in the Burj Khalifa has not only been financially rewarding but has given me a home that's truly iconic. The city's vision and growth potential are extraordinary.",
      rating: 5
    },
    {
      id: 2,
      name: "Cristiano Ronaldo",
      title: "Football Legend",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      property: "Palm Jumeirah Villa",
      location: "Palm Jumeirah",
      investment: "AED 85M",
      quote: "Investing in Dubai was one of my best decisions. The Palm Jumeirah villa offers privacy, luxury, and incredible views. Dubai's real estate market is stable and offers excellent returns.",
      rating: 5
    },
    {
      id: 3,
      name: "Mukesh Ambani",
      title: "Business Tycoon",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      property: "Business Bay Tower",
      location: "Business Bay",
      investment: "AED 120M",
      quote: "Dubai's strategic location and business-friendly environment make it the perfect investment destination. Our Business Bay property has exceeded all expectations in terms of value appreciation.",
      rating: 5
    },
    {
      id: 4,
      name: "Will Smith",
      title: "Hollywood Actor",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      property: "Dubai Marina Apartment",
      location: "Dubai Marina",
      investment: "AED 25M",
      quote: "Dubai Marina offers the perfect blend of luxury and lifestyle. The waterfront views and world-class amenities make it an exceptional place to invest and live. Highly recommended!",
      rating: 5
    },
    {
      id: 5,
      name: "Roger Federer",
      title: "Tennis Champion",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      property: "Dubai Hills Estate Villa",
      location: "Dubai Hills Estate",
      investment: "AED 35M",
      quote: "Dubai Hills Estate provides the perfect family environment with world-class golf courses and amenities. It's a smart investment that offers both lifestyle and financial benefits.",
      rating: 5
    },
    {
      id: 6,
      name: "Angelina Jolie",
      title: "Hollywood Actress",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      property: "Jumeirah Beach Residence",
      location: "JBR",
      investment: "AED 18M",
      quote: "Dubai's real estate market is incredibly sophisticated. My JBR property offers stunning beach views and has been a fantastic investment. The city's growth is remarkable.",
      rating: 5
    }
  ];

  // Carousel navigation functions
  const nextSlide = () => {
    const itemsToShow = isDesktop ? 2 : 1;
    const maxIndex = testimonials.length - itemsToShow;
    setCurrentIndex(prev => prev >= maxIndex ? 0 : prev + 1);
  };

  const prevSlide = () => {
    const itemsToShow = isDesktop ? 2 : 1;
    const maxIndex = testimonials.length - itemsToShow;
    setCurrentIndex(prev => prev <= 0 ? maxIndex : prev - 1);
  };

  // Get visible testimonials based on screen size
  const getVisibleTestimonials = () => {
    const itemsToShow = isDesktop ? 2 : 1;
    const endIndex = Math.min(currentIndex + itemsToShow, testimonials.length);
    return testimonials.slice(currentIndex, endIndex);
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Trusted by Global Icons
          </h2>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto">
            Discover why world-renowned celebrities and business leaders choose Dubai for their real estate investments
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 rounded-full shadow-lg border border-white/20 transition-all duration-200 hover:shadow-xl"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 rounded-full shadow-lg border border-white/20 transition-all duration-200 hover:shadow-xl"
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Testimonials Container */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 px-4">
            {getVisibleTestimonials().map((testimonial) => (
              <div
                key={testimonial.id}
                className="group bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 hover:bg-white/10 transition-all duration-300"
              >
                {/* Quote Icon */}
                <div className="mb-6">
                  <Quote className="w-8 h-8 text-blue-300" />
                </div>

                {/* Testimonial Quote */}
                <blockquote className="text-lg text-white leading-relaxed mb-8 italic">
                  "{testimonial.quote}"
                </blockquote>

                {/* Celebrity Info */}
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-300 mr-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {testimonial.name}
                    </h3>
                    <p className="text-blue-200 text-sm">
                      {testimonial.title}
                    </p>
                  </div>
                </div>

                {/* Property Investment Details */}
                <div className="bg-white/5 rounded-xl p-4 mb-6">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-blue-200">Property</p>
                      <p className="text-white font-semibold">{testimonial.property}</p>
                    </div>
                    <div>
                      <p className="text-blue-200">Location</p>
                      <p className="text-white font-semibold">{testimonial.location}</p>
                    </div>
                    <div>
                      <p className="text-blue-200">Investment</p>
                      <p className="text-white font-semibold">{testimonial.investment}</p>
                    </div>
                    <div>
                      <p className="text-blue-200">Rating</p>
                      <div className="flex items-center">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Verified Badge */}
                <div className="flex items-center text-blue-200 text-sm">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  <span>Verified Investment</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl lg:text-4xl font-bold text-white mb-2">
              50+
            </div>
            <div className="text-blue-200 text-sm">
              Celebrity Investors
            </div>
          </div>
          <div>
            <div className="text-3xl lg:text-4xl font-bold text-white mb-2">
              AED 2.5B+
            </div>
            <div className="text-blue-200 text-sm">
              Total Investments
            </div>
          </div>
          <div>
            <div className="text-3xl lg:text-4xl font-bold text-white mb-2">
              25%
            </div>
            <div className="text-blue-200 text-sm">
              Average ROI
            </div>
          </div>
          <div>
            <div className="text-3xl lg:text-4xl font-bold text-white mb-2">
              15+
            </div>
            <div className="text-blue-200 text-sm">
              Years Experience
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
