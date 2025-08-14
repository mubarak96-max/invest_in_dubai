'use client';

import { Shield, TrendingUp, Users } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      id: 1,
      icon: Shield,
      title: "Exclusive Access to Prime Properties",
      description: "Gain priority access to exclusive listings and off-plan developments in Dubai's top markets."
    },
    {
      id: 2,
      icon: TrendingUp,
      title: "Proven Track Record of Success",
      description: "Achieve your goals with our trusted expertise, delivering results for investors, buyers, and sellers."
    },
    {
      id: 3,
      icon: Users,
      title: "Expert Guidance in Dubai's Market",
      description: "Make informed, profitable decisions with our strategic insights into Dubai's real estate market."
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-900 mb-4">
            Dubai's Premier Property Marketplace
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 hover:shadow-lg transition-all duration-300"
            >
              {/* Icon */}
              <div className="mb-6">
                <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl lg:text-2xl font-bold text-blue-900 mb-4 leading-tight">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
