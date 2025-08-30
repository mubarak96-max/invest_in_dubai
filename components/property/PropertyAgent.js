'use client';

import { Phone, Mail, Star } from 'lucide-react';
import ContactAgentForm from './ContactAgentForm';

export default function PropertyAgent({ property }) {
  const agent = property.agent || {
    name: 'Invest in Dubai Advisor',
    title: 'Property Consultant',
    phone: '+971 4 123 4567',
    email: 'advisor@investindubai.ae',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200',
    rating: 4.8,
    deals: 120,
  };

  return (
    <aside className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-4 mb-4">
        {agent.image && agent.image.trim() !== '' ? (
          <img src={agent.image} alt={agent.name} className="w-14 h-14 rounded-full object-cover" />
        ) : (
          <div className="w-14 h-14 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-gray-500 text-sm font-semibold">{agent.name.charAt(0)}</span>
          </div>
        )}
        <div>
          <div className="font-semibold text-gray-900">{agent.name}</div>
          <div className="text-sm text-gray-600">{agent.title}</div>
          <div className="flex items-center text-yellow-500 text-sm mt-1">
            <Star className="w-4 h-4 fill-current" />
            <span className="ml-1 font-medium">{agent.rating}</span>
            <span className="ml-2 text-gray-400">•</span>
            <span className="ml-2 text-gray-600">{agent.deals} deals</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <a href={`tel:${agent.phone.replace(/\s/g, '')}`} className="w-full inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors">
          <Phone className="w-4 h-4 mr-2" /> Call Agent
        </a>
        <a href={`mailto:${agent.email}`} className="w-full inline-flex items-center justify-center border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-2.5 rounded-lg transition-colors">
          <Mail className="w-4 h-4 mr-2" /> Email Agent
        </a>
      </div>

      <div className="my-6 border-t border-gray-200"></div>

      <div>
        <h3 className="font-semibold text-gray-800 text-center mb-4">Or, send an inquiry</h3>
        <ContactAgentForm />
      </div>

      <p className="text-xs text-gray-500 mt-4 text-center">By contacting, you agree to our terms of service.</p>
    </aside>
  );
}
