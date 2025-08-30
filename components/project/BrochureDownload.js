'use client';

import { useState, useEffect } from 'react';
import { Download, FileText, X } from 'lucide-react';

export default function BrochureDownload({ projectTitle, brochureUrl, onContactRequest, isOpen: externalIsOpen, onClose: externalOnClose }) {
  // local state only used when this component is uncontrolled
  const [localIsOpen, setLocalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [error, setError] = useState(null);

  const isControlled = typeof externalIsOpen === 'boolean';
  const modalOpen = isControlled ? externalIsOpen : localIsOpen;

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [modalOpen]);

  const handleButtonClick = (e) => {
    e.preventDefault();
    console.debug('BrochureDownload button clicked', { brochureUrl, hasOnContactRequest: !!onContactRequest, isControlled });
    if (brochureUrl) {
      if (isControlled) {
        // parent should open the modal when controlled
        console.debug('Component is controlled — parent should open the modal');
      } else {
        console.debug('Opening local brochure modal');
        setLocalIsOpen(true);
      }
    } else if (onContactRequest) {
      console.debug('No brochureUrl — calling onContactRequest (open contact modal)');
      onContactRequest();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (!brochureUrl) {
        throw new Error('No brochure URL provided');
      }

      // Normalize brochureUrl (support string or Sanity asset object)
      const resolveBrochureUrl = (b) => {
        try {
          if (!b) return null;
          if (typeof b === 'string') return b.startsWith('http') ? b : (b.startsWith('/') ? `https://cdn.sanity.io${b}` : b);
          if (typeof b === 'object') {
            // common shapes: { asset: { url: '...' } } or { url: '...' }
            if (b.asset && typeof b.asset === 'object') {
              if (typeof b.asset.url === 'string') return b.asset.url;
            }
            if (typeof b.url === 'string') return b.url;
            // fallback: if object already contains a string-like value
            return null;
          }
          return null;
        } catch (err) {
          console.error('Error resolving brochureUrl shape', err, b);
          return null;
        }
      };

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
      }

      // Then initiate the download
      const absoluteUrl = resolveBrochureUrl(brochureUrl);
      if (!absoluteUrl) {
        throw new Error('Unable to resolve a downloadable brochure URL. Check the project data shape.');
      }
      console.debug('Resolved brochure download URL:', absoluteUrl);
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
        // close depending on controlled/uncontrolled
        if (isControlled) {
          externalOnClose && externalOnClose();
        } else {
          setLocalIsOpen(false);
        }
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

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleButtonClick}
        className={`w-full flex items-center justify-center gap-2 ${brochureUrl ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
          } text-white font-medium py-3 px-6 rounded-lg transition-colors`}
        disabled={!brochureUrl && !onContactRequest}
      >
        <Download className="w-5 h-5" />
        {brochureUrl ? 'Download Brochure' : 'Brochure Not Available'}
      </button>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-[9999]">
          <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
            <button
              onClick={() => {
                if (isControlled && externalOnClose) {
                  externalOnClose();
                } else {
                  setLocalIsOpen(false);
                }
              }}
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
              {/* {process.env.NODE_ENV === 'development' && (
                <div className="mt-2 text-xs text-gray-500">Debug brochure prop: {JSON.stringify(brochureUrl)}</div>
              )} */}
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
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Download className="w-4 h-4 mr-2" />
                        Download Brochure
                      </div>
                    )}
                  </button>
                </div>

                <p className="text-xs text-gray-500 text-center mt-4">
                  By downloading, you agree to our Privacy Policy and consent to receiving marketing communications.
                </p>
                {error && brochureUrl && (
                  <div className="mt-3 text-sm text-center">
                    <p className="text-gray-600">If the automatic download failed, try this link:</p>
                    <a href={typeof brochureUrl === 'string' ? brochureUrl : (brochureUrl?.asset?.url || brochureUrl?.url || '#')} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                      Open brochure in new tab
                    </a>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
