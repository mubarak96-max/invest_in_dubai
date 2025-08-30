'use client';

import { useState, useEffect } from 'react';
import { Download, FileText, X } from 'lucide-react';

export default function BrochureDownload({ projectTitle, brochureUrl, onContactRequest }) {
  console.log('Rendering BrochureDownload with:', { projectTitle, brochureUrl, hasOnContactRequest: !!onContactRequest });

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleButtonClick = (e) => {
    e.preventDefault();
    console.log('Button clicked, brochureUrl:', brochureUrl);
    if (brochureUrl) {
      setIsOpen(true);
    } else if (onContactRequest) {
      onContactRequest();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted, starting download...');
    setError(null);
    setIsSubmitting(true);

    try {
      if (!brochureUrl) {
        throw new Error('No brochure URL provided');
      }

      // First, submit the lead data
      try {
        const leadResponse = await fetch('/api/brochure-request', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            projectTitle,
            timestamp: new Date().toISOString()
          })
        });

        if (!leadResponse.ok) {
          console.warn('Failed to save lead data:', await leadResponse.text());
        }
      } catch (apiError) {
        console.error('Error saving lead data:', apiError);
        // Continue with download even if lead saving fails
      }

      // Then start the download
      const absoluteUrl = brochureUrl.startsWith('http') ? brochureUrl : `https://cdn.sanity.io${brochureUrl}`;
      console.log('Fetching brochure from:', absoluteUrl);

      const response = await fetch(absoluteUrl);

      if (!response.ok) {
        throw new Error(`Failed to fetch brochure: ${response.status} ${response.statusText}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${projectTitle.replace(/\s+/g, '-').toLowerCase()}-brochure.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      setDownloadStarted(true);

      // Close the modal after successful download
      setTimeout(() => {
        setIsOpen(false);
        setDownloadStarted(false);
        // Reset form data
        setFormData({
          name: '',
          email: '',
          phone: '',
        });
      }, 2000);

    } catch (error) {
      console.error('Error downloading brochure:', error);
      setError(error.message || 'There was an error downloading the brochure. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="relative">
      <button
        onClick={handleButtonClick}
        className={`w-full flex items-center justify-center gap-2 ${brochureUrl ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
          } text-white font-medium py-3 px-6 rounded-lg transition-colors`}
        disabled={!brochureUrl && !onContactRequest}
      >
        <Download className="w-5 h-5" />
        {brochureUrl ? 'Download Brochure' : 'Brochure Not Available'}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-[9999]">
          <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              disabled={isSubmitting}
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-6">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-3">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Download Brochure</h3>
              <p className="mt-1 text-sm text-gray-500">
                {downloadStarted
                  ? 'Thank you! Your download will start shortly.'
                  : `Enter your details to download the ${projectTitle} brochure.`}
              </p>
              {error && (
                <div className="mt-2 text-sm text-red-600">
                  {error}
                </div>
              )}
            </div>

            {!downloadStarted && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="John Smith"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="+971 50 123 4567"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        Download Brochure
                      </>
                    )}
                  </button>
                </div>

                <p className="text-xs text-gray-500 text-center mt-4">
                  By downloading, you agree to our Privacy Policy and consent to receiving marketing communications.
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
