'use client';

import { useState } from 'react';
import { User, Mail, Phone, MessageSquare, Send } from 'lucide-react';

export default function ContactAgentForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd handle form submission here (e.g., API call)
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
        <h3 className="font-semibold text-green-800">Thank you!</h3>
        <p className="text-sm text-green-700">Your message has been sent. The agent will contact you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="sr-only">Name</label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" id="name" placeholder="Your Name" required className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="sr-only">Email</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="email" id="email" placeholder="Your Email" required className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
        </div>
      </div>
      <div>
        <label htmlFor="phone" className="sr-only">Phone</label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="tel" id="phone" placeholder="Your Phone" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="sr-only">Message</label>
        <div className="relative">
          <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <textarea id="message" rows="4" placeholder="I'm interested in this property..." required className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"></textarea>
        </div>
      </div>
      <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center group">
        <span>Send Message</span>
        <Send className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
      </button>
    </form>
  );
}
