'use client';

import { Phone, MessageSquare } from 'lucide-react';

export default function ContactForm({ projectTitle }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic, e.g., send data to an API
    alert('Thank you for your interest! We will be in touch shortly.');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow sticky top-24">
      <h2 className="text-2xl font-bold text-gray-900 mb-1">Register Your Interest</h2>
      <p className="text-sm text-gray-600 mb-4">for {projectTitle}</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="sr-only">Name</label>
          <input type="text" id="name" placeholder="Your Name" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div>
          <label htmlFor="email" className="sr-only">Email</label>
          <input type="email" id="email" placeholder="Your Email" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div>
          <label htmlFor="phone" className="sr-only">Phone</label>
          <input type="tel" id="phone" placeholder="Your Phone Number" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">Submit Inquiry</button>
      </form>
      <div className="mt-6 text-center text-sm text-gray-500">Or contact us directly:</div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <a href="tel:+971501234567" className="flex items-center justify-center p-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
          <Phone className="w-4 h-4 mr-2 text-blue-600" />
          Call Us
        </a>
        <a href="https://wa.me/971501234567" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
          <MessageSquare className="w-4 h-4 mr-2 text-green-500" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
