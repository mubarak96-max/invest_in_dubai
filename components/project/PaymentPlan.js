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
      <ul className="space-y-3">
        {plan.map((item, index) => (
          <li key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
            <span className="text-gray-700">{item.milestone}</span>
            <span className="font-bold bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">{item.percentage}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
