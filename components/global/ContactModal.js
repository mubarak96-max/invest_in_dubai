'use client';

import { X } from 'lucide-react';
import ContactForm from '../project/ContactForm';

export default function ContactModal({ isOpen, closeModal, projectTitle }) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
      onClick={closeModal}
    >
      <div 
        className="relative bg-transparent rounded-lg w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <ContactForm projectTitle={projectTitle} />
        <button 
          onClick={closeModal} 
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 bg-white rounded-full p-1"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
