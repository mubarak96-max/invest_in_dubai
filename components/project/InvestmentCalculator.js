'use client';

import { useState, useEffect, useMemo } from 'react';

export default function InvestmentCalculator({ price, onGetAnalysis }) {
  const [propertyPrice, setPropertyPrice] = useState(price || 5000000);
  const [monthlyRent, setMonthlyRent] = useState(Math.round((price || 5000000) * 0.065 / 12));
  const [annualCosts, setAnnualCosts] = useState(Math.round((price || 5000000) * 0.015));

  const results = useMemo(() => {
    const annualRent = monthlyRent * 12;
    const netAnnualRent = annualRent - annualCosts;
    const grossYield = propertyPrice > 0 ? (annualRent / propertyPrice) * 100 : 0;
    const netYield = propertyPrice > 0 ? (netAnnualRent / propertyPrice) * 100 : 0;

    return {
      annualRent,
      netAnnualRent,
      grossYield,
      netYield,
    };
  }, [propertyPrice, monthlyRent, annualCosts]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md my-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Rental Yield Calculator</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Property Price (AED)</label>
            <input type="number" value={propertyPrice} onChange={(e) => setPropertyPrice(Number(e.target.value))} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Estimated Monthly Rent (AED)</label>
            <input type="number" value={monthlyRent} onChange={(e) => setMonthlyRent(Number(e.target.value))} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Total Annual Costs (AED)</label>
            <input type="number" step="0.1" value={annualCosts} onChange={(e) => setAnnualCosts(Number(e.target.value))} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            <p className="text-xs text-gray-500 mt-1">Includes service charges, maintenance, etc.</p>
          </div>
        </div>

        {/* Results */}
        <div className="bg-gray-50 p-6 rounded-lg flex flex-col justify-center">
          <h3 className="text-lg font-medium text-gray-800 mb-4 text-center">Investment Projection</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-green-100 p-3 rounded-md">
              <span className="font-medium text-green-800">Annual Gross Rent</span>
              <span className="font-bold text-lg text-green-900">{formatCurrency(results.annualRent)}</span>
            </div>
            <div className="flex justify-between items-center bg-blue-100 p-3 rounded-md">
              <span className="font-medium text-blue-800">Gross Rental Yield</span>
              <span className="font-bold text-lg text-blue-900">{results.grossYield.toFixed(2)}%</span>
            </div>
            <div className="flex justify-between items-center bg-purple-100 p-3 rounded-md">
              <span className="font-medium text-purple-800">Net Rental Yield</span>
              <span className="font-bold text-lg text-purple-900">{results.netYield.toFixed(2)}%</span>
            </div>
             <div className="flex justify-between items-center bg-yellow-100 p-3 rounded-md">
              <span className="font-medium text-yellow-800">Annual Net Profit</span>
              <span className="font-bold text-lg text-yellow-900">{formatCurrency(results.netAnnualRent)}</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4 text-center">*Estimates are for illustrative purposes only. Please conduct your own due diligence.</p>

          {onGetAnalysis && (
            <div className="mt-6 text-center">
              <button 
                onClick={onGetAnalysis}
                className="w-full px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Get a Personalised Analysis
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
