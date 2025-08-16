'use client';

import { useMemo } from 'react';
import { TrendingUp, DollarSign, PieChart, Calendar } from 'lucide-react';

export default function PropertyInvestmentAnalysis({ property }) {
  const metrics = useMemo(() => {
    const price = property.price;
    const rentalYield = property.financials?.rentalYield ?? 6.5; // %
    const annualRent = Math.round((price * rentalYield) / 100);
    const monthlyRent = Math.round(annualRent / 12);
    const paybackYears = Math.round((price / annualRent) * 10) / 10;
    const appreciation = property.financials?.appreciation ?? 6.0; // %
    const tenYearProfit = Math.round(annualRent * 10 + (price * (appreciation / 100) * 10) * 0.5); // simplistic

    return { annualRent, monthlyRent, paybackYears, rentalYield, appreciation, tenYearProfit };
  }, [property]);

  const formatAED = (n) => new Intl.NumberFormat('en-AE', { style: 'currency', currency: 'AED', maximumFractionDigits: 0 }).format(n);

  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-4">
        <PieChart className="w-5 h-5 text-gray-700" />
        <h2 className="text-2xl font-bold text-gray-800">Investment Analysis</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="p-4 rounded-lg bg-green-50 border border-green-200">
          <div className="flex items-center space-x-2 text-green-800 mb-1">
            <DollarSign className="w-4 h-4" />
            <span className="text-sm font-medium">Monthly Rent (est.)</span>
          </div>
          <div className="text-2xl font-bold text-green-900">{formatAED(metrics.monthlyRent)}</div>
        </div>
        <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
          <div className="flex items-center space-x-2 text-blue-800 mb-1">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">Gross Yield</span>
          </div>
          <div className="text-2xl font-bold text-blue-900">{metrics.rentalYield}%</div>
        </div>
        <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
          <div className="flex items-center space-x-2 text-orange-800 mb-1">
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-medium">Payback Period</span>
          </div>
          <div className="text-2xl font-bold text-orange-900">{metrics.paybackYears} yrs</div>
        </div>
        <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
          <div className="flex items-center space-x-2 text-purple-800 mb-1">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">10-Year Profit (est.)</span>
          </div>
          <div className="text-2xl font-bold text-purple-900">{formatAED(metrics.tenYearProfit)}</div>
        </div>
      </div>

      <p className="text-xs text-gray-500">Note: Estimates based on Dubai market averages and provided inputs. Actual results may vary.</p>
    </section>
  );
}
