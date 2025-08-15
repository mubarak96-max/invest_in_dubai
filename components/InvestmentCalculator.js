'use client';

import { useState, useEffect } from 'react';
import { Calculator, DollarSign, TrendingUp, Calendar, Home, PieChart } from 'lucide-react';

export default function InvestmentCalculator() {
  const [inputs, setInputs] = useState({
    propertyPrice: 2000000,
    initialInvestment: 20,
    rentalYield: 7,
    propertyType: 'apartment'
  });

  const [results, setResults] = useState({
    annualRental: 0,
    monthlyRental: 0,
    netROI: 0,
    breakEven: 0,
    totalReturn: 0
  });

  // Calculate results whenever inputs change
  useEffect(() => {
    calculateInvestment();
  }, [inputs]);

  const calculateInvestment = () => {
    const { propertyPrice, initialInvestment, rentalYield } = inputs;
    
    // Investment calculations
    const totalInvestment = (propertyPrice * initialInvestment) / 100;
    
    // Rental income
    const annualRental = (propertyPrice * rentalYield) / 100;
    const monthlyRental = annualRental / 12;
    
    // ROI calculation
    const netROI = (annualRental / totalInvestment) * 100;
    
    // Break-even calculation (years)
    const breakEven = totalInvestment / annualRental;
    
    // 10-year total return
    const totalReturn = (annualRental * 10) - totalInvestment;

    setResults({
      annualRental: Math.round(annualRental),
      monthlyRental: Math.round(monthlyRental),
      netROI: Math.round(netROI * 10) / 10,
      breakEven: Math.round(breakEven * 10) / 10,
      totalReturn: Math.round(totalReturn)
    });
  };

  const handleInputChange = (field, value) => {
    setInputs(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <section className="py-8 lg:py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Calculator className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Investment Calculator</h2>
                <p className="text-blue-100 text-sm">Calculate your Dubai property ROI</p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 p-6">
            
            {/* Input Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Property Details</h3>
              
              {/* Property Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Price
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min="500000"
                    max="10000000"
                    step="50000"
                    value={inputs.propertyPrice}
                    onChange={(e) => handleInputChange('propertyPrice', e.target.value)}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>AED 500K</span>
                    <span className="font-semibold text-blue-600">
                      {formatCurrency(inputs.propertyPrice)}
                    </span>
                    <span>AED 10M</span>
                  </div>
                </div>
              </div>

              {/* Initial Investment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Initial Investment ({inputs.initialInvestment}%)
                </label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={inputs.initialInvestment}
                  onChange={(e) => handleInputChange('initialInvestment', e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>10%</span>
                  <span className="font-semibold text-blue-600">
                    {formatCurrency((inputs.propertyPrice * inputs.initialInvestment) / 100)}
                  </span>
                  <span>100%</span>
                </div>
              </div>


              {/* Rental Yield */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Rental Yield ({inputs.rentalYield}%)
                </label>
                <input
                  type="range"
                  min="4"
                  max="12"
                  step="0.5"
                  value={inputs.rentalYield}
                  onChange={(e) => handleInputChange('rentalYield', e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>4%</span>
                  <span>12%</span>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Investment Analysis</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Monthly Rental */}
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">Monthly Rental</span>
                  </div>
                  <p className="text-2xl font-bold text-green-900">
                    {formatCurrency(results.monthlyRental)}
                  </p>
                </div>

                {/* Annual Rental */}
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Home className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">Annual Rental</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-900">
                    {formatCurrency(results.annualRental)}
                  </p>
                </div>

                {/* Net ROI */}
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium text-purple-800">Annual ROI</span>
                  </div>
                  <p className="text-2xl font-bold text-purple-900">
                    {results.netROI}%
                  </p>
                </div>

                {/* Break Even */}
                <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="w-4 h-4 text-orange-600" />
                    <span className="text-sm font-medium text-orange-800">Payback Period</span>
                  </div>
                  <p className="text-2xl font-bold text-orange-900">
                    {results.breakEven > 0 ? `${results.breakEven} yrs` : 'Immediate'}
                  </p>
                </div>
              </div>

              {/* Summary */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center space-x-2 mb-3">
                  <PieChart className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-800">10-Year Projection</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Initial Investment:</span>
                    <span className="font-semibold">
                      {formatCurrency((inputs.propertyPrice * inputs.initialInvestment) / 100)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Annual Rental Income:</span>
                    <span className="font-semibold text-green-600">
                      {formatCurrency(results.annualRental)}
                    </span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-gray-800 font-medium">Net Profit (10 yrs):</span>
                    <span className={`font-bold ${results.totalReturn > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(results.totalReturn)}
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
                Find Properties with This ROI
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
