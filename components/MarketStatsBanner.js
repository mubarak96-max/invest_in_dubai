'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, Home, DollarSign, Calendar, ArrowUp, ArrowDown, Building2, Users } from 'lucide-react';

const iconMap = {
  'dollar-sign': DollarSign,
  'trending-up': TrendingUp,
  'home': Home,
  'calendar': Calendar,
  'building': Building2,
  'users': Users,
};

export default function MarketStatsBanner({ stats }) {
  const [animatedValues, setAnimatedValues] = useState({
    avgPrice: 0,
    roi: 0,
    growth: 0,
    transactions: 0
  });

  // Prefer Sanity data if provided; otherwise fallback to defaults
  const marketStats = (stats && stats.length > 0) ? stats.map((s, idx) => ({
    id: s.order || idx + 1,
    icon: iconMap[s.icon] || TrendingUp,
    label: s.label,
    value: s.value,
    unit: s.unit || '',
    change: s.change,
    trend: s.trend || 'up',
    description: s.description || ''
  })) : [
    {
      id: 1,
      icon: DollarSign,
      label: "Average Property Price",
      value: "2.1M",
      unit: "AED",
      change: "+12.5%",
      trend: "up",
      description: "Q4 2024 vs Q4 2023"
    },
    {
      id: 2,
      icon: TrendingUp,
      label: "Average ROI",
      value: "8.2",
      unit: "%",
      change: "+1.3%",
      trend: "up",
      description: "Annual rental yield"
    },
    {
      id: 3,
      icon: Home,
      label: "Market Growth",
      value: "15.7",
      unit: "%",
      change: "+2.1%",
      trend: "up",
      description: "Year-over-year"
    },
    {
      id: 4,
      icon: Calendar,
      label: "Monthly Transactions",
      value: "4.2K",
      unit: "",
      change: "+8.9%",
      trend: "up",
      description: "Properties sold"
    }
  ];

  // Animate numbers on component mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const animateNumbers = () => {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;

        setAnimatedValues({
          avgPrice: Math.floor(2.1 * progress * 100) / 100,
          roi: Math.floor(8.2 * progress * 10) / 10,
          growth: Math.floor(15.7 * progress * 10) / 10,
          transactions: Math.floor(4.2 * progress * 10) / 10
        });

        if (currentStep >= steps) {
          clearInterval(interval);
        }
      }, stepDuration);
    };

    // Start animation after a short delay
    const timeout = setTimeout(animateNumbers, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const formatAnimatedValue = (statId, animatedValue) => {
    switch (statId) {
      case 1:
        return animatedValue.toFixed(1);
      case 2:
        return animatedValue.toFixed(1);
      case 3:
        return animatedValue.toFixed(1);
      case 4:
        return animatedValue.toFixed(1);
      default:
        return animatedValue.toString();
    }
  };

  const getAnimatedValue = (statId) => {
    switch (statId) {
      case 1:
        return animatedValues.avgPrice;
      case 2:
        return animatedValues.roi;
      case 3:
        return animatedValues.growth;
      case 4:
        return animatedValues.transactions;
      default:
        return 0;
    }
  };

  return (
    <section className="py-4 lg:py-6 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-3 lg:mb-4">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
            Dubai Market Insights
          </h2>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {marketStats.map((stat) => (
            <div
              key={stat.id}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 hover:bg-white/15 transition-all duration-300 group"
            >
              {/* Icon */}
              <div className="flex items-center justify-between mb-2">
                <div className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                  <stat.icon className="w-3.5 h-3.5 text-white" />
                </div>

                {/* Trend Indicator */}
                <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${stat.trend === 'up'
                  ? 'bg-green-500/20 text-green-100'
                  : 'bg-red-500/20 text-red-100'
                  }`}>
                  {stat.trend === 'up' ? (
                    <ArrowUp className="w-3 h-3" />
                  ) : (
                    <ArrowDown className="w-3 h-3" />
                  )}
                  <span>{stat.change}</span>
                </div>
              </div>

              {/* Value */}
              <div className="mb-2">
                <div className="flex items-baseline space-x-1">
                  {stat.unit === "AED" && (
                    <span className="text-sm font-semibold text-blue-100">AED</span>
                  )}
                  <span className="text-xl lg:text-2xl font-bold text-white">
                    {formatAnimatedValue(stat.id, getAnimatedValue(stat.id))}
                  </span>
                  {stat.unit !== "AED" && stat.unit && (
                    <span className="text-sm font-semibold text-blue-100">{stat.unit}</span>
                  )}
                </div>
              </div>

              {/* Label */}
              <h3 className="text-white font-medium text-xs">
                {stat.label}
              </h3>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-3 lg:mt-4 text-center">
          <button className="bg-white/20 hover:bg-white/30 text-white text-xs font-medium py-2 px-4 rounded-full border border-white/30 transition-all duration-200">
            View Full Report
          </button>
        </div>
      </div>
    </section>
  );
}
