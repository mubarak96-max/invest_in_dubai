"use client"

import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-accent-white border-b border-primary-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="flex items-center">
              <span className="text-2xl lg:text-3xl font-bold text-primary-900">
                Provident
              </span>
              <span className="text-2xl lg:text-3xl font-bold text-primary-500">
                .
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a
                href="#"
                className="text-primary-700 hover:text-accent-black px-3 py-2 text-sm lg:text-base font-medium transition-colors duration-200"
              >
                Buy
              </a>
              <a
                href="#"
                className="text-primary-700 hover:text-accent-black px-3 py-2 text-sm lg:text-base font-medium transition-colors duration-200"
              >
                Rent
              </a>
              <a
                href="#"
                className="text-primary-700 hover:text-accent-black px-3 py-2 text-sm lg:text-base font-medium transition-colors duration-200"
              >
                Projects
              </a>
              <a
                href="#"
                className="text-primary-700 hover:text-accent-black px-3 py-2 text-sm lg:text-base font-medium transition-colors duration-200"
              >
                Developers
              </a>
              <a
                href="#"
                className="text-primary-700 hover:text-accent-black px-3 py-2 text-sm lg:text-base font-medium transition-colors duration-200"
              >
                Areas
              </a>
              <a
                href="#"
                className="text-primary-700 hover:text-accent-black px-3 py-2 text-sm lg:text-base font-medium transition-colors duration-200"
              >
                Services
              </a>
              <a
                href="#"
                className="text-primary-700 hover:text-accent-black px-3 py-2 text-sm lg:text-base font-medium transition-colors duration-200"
              >
                Blogs
              </a>
              <a
                href="#"
                className="text-primary-700 hover:text-accent-black px-3 py-2 text-sm lg:text-base font-medium transition-colors duration-200"
              >
                More
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-primary-700 hover:text-accent-black hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 transition-colors duration-200"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Close icon */}
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-accent-off-white border-t border-primary-200">
          <a
            href="#"
            className="text-primary-700 hover:text-accent-black hover:bg-primary-100 block px-3 py-2 text-base font-medium transition-colors duration-200"
          >
            Buy
          </a>
          <a
            href="#"
            className="text-primary-700 hover:text-accent-black hover:bg-primary-100 block px-3 py-2 text-base font-medium transition-colors duration-200"
          >
            Rent
          </a>
          <a
            href="#"
            className="text-primary-700 hover:text-accent-black hover:bg-primary-100 block px-3 py-2 text-base font-medium transition-colors duration-200"
          >
            Projects
          </a>
          <a
            href="#"
            className="text-primary-700 hover:text-accent-black hover:bg-primary-100 block px-3 py-2 text-base font-medium transition-colors duration-200"
          >
            Developers
          </a>
          <a
            href="#"
            className="text-primary-700 hover:text-accent-black hover:bg-primary-100 block px-3 py-2 text-base font-medium transition-colors duration-200"
          >
            Areas
          </a>
          <a
            href="#"
            className="text-primary-700 hover:text-accent-black hover:bg-primary-100 block px-3 py-2 text-base font-medium transition-colors duration-200"
          >
            Services
          </a>
          <a
            href="#"
            className="text-primary-700 hover:text-accent-black hover:bg-primary-100 block px-3 py-2 text-base font-medium transition-colors duration-200"
          >
            Blogs
          </a>
          <a
            href="#"
            className="text-primary-700 hover:text-accent-black hover:bg-primary-100 block px-3 py-2 text-base font-medium transition-colors duration-200"
          >
            More
          </a>
        </div>
      </div>
    </nav>
  );
}