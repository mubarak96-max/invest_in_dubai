import { PieChart } from 'lucide-react';

export default function PaymentPlan({ plan }) {
  if (!plan || plan.length === 0) {
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
        <PieChart className="w-6 h-6 mr-3 text-blue-600" />
        Payment Plan
      </h2>
      <ul className="space-y-4">
        {plan.map((item, index) => (
          <li key={index} className="bg-gray-50 p-4 rounded-md">
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-700 font-medium">{item.milestone}</span>
              <span className="font-bold bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{item.percentage}%</span>
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${item.percentage}%` }}
              ></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
