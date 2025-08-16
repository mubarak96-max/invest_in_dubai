'use client';

import { Receipt, Percent, TrendingUp } from 'lucide-react';

export default function PropertyFinancials({ property }) {
  const formatAED = (n) => new Intl.NumberFormat('en-AE', { style: 'currency', currency: 'AED', maximumFractionDigits: 0 }).format(n);

  const scPerSqft = property.financials?.serviceCharge ?? 18; // AED/sqft
  const annualSC = Math.round(scPerSqft * property.area);
  const estDownPayment = Math.round(property.price * 0.25);
  const estMortgage = Math.round((property.price - estDownPayment) * 0.75);

  return (
    <aside className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Financials</h3>

      <div className="space-y-3">
        <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
          <div className="flex items-center space-x-2 text-blue-800">
            <Receipt className="w-4 h-4" />
            <span className="text-sm">Service Charges (annual)</span>
          </div>
          <span className="text-sm font-bold text-blue-900">{formatAED(annualSC)}</span>
        </div>

        <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-3 py-2">
          <div className="flex items-center space-x-2 text-green-800">
            <Percent className="w-4 h-4" />
            <span className="text-sm">Est. Down Payment (25%)</span>
          </div>
          <span className="text-sm font-bold text-green-900">{formatAED(estDownPayment)}</span>
        </div>

        <div className="flex items-center justify-between bg-purple-50 border border-purple-200 rounded-lg px-3 py-2">
          <div className="flex items-center space-x-2 text-purple-800">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm">Est. Mortgage Amount</span>
          </div>
          <span className="text-sm font-bold text-purple-900">{formatAED(estMortgage)}</span>
        </div>
      </div>

      <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors">
        Get Mortgage Pre-Approval
      </button>
    </aside>
  );
}
