"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-lg transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/logo.png"
                alt="Invest in Dubai Logo"
                width={40}
                height={40}
                className="w-8 h-8 lg:w-10 lg:h-10"
                priority
              />
              <span className="text-xl lg:text-2xl font-bold text-gray-800">
                Invest in Dubai
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                href="/buy"
                className="px-3 py-2 text-sm lg:text-base font-medium text-blue-700 hover:text-blue-900 transition-colors duration-300"
              >
                Buy
              </Link>
              <Link
                href="/off-plan"
                className="px-3 py-2 text-sm lg:text-base font-medium text-blue-700 hover:text-blue-900 transition-colors duration-300"
              >
                Off Plan
              </Link>
              {/* <Link
                href="/rent"
                className="px-3 py-2 text-sm lg:text-base font-medium text-blue-700 hover:text-blue-900 transition-colors duration-300"
              >
                Rent
              </Link> */}
              <Link
                href="/projects"
                className="px-3 py-2 text-sm lg:text-base font-medium text-blue-700 hover:text-blue-900 transition-colors duration-300"
              >
                Projects
              </Link>
              <Link
                href="/developers"
                className="px-3 py-2 text-sm lg:text-base font-medium text-blue-700 hover:text-blue-900 transition-colors duration-300"
              >
                Developers
              </Link>
              <Link
                href="/property-map"
                className="px-3 py-2 text-sm lg:text-base font-medium text-blue-700 hover:text-blue-900 transition-colors duration-300"
              >
                Property Map
              </Link>
              <Link
                href="/areas"
                className="px-3 py-2 text-sm lg:text-base font-medium text-blue-700 hover:text-blue-900 transition-colors duration-300"
              >
                Areas
              </Link>
              {/* <a
                href="#"
                className="px-3 py-2 text-sm lg:text-base font-medium text-blue-700 hover:text-blue-900 transition-colors duration-300"
              >
                Services
              </a> */}
              <a
                href="#"
                className="px-3 py-2 text-sm lg:text-base font-medium text-blue-700 hover:text-blue-900 transition-colors duration-300"
              >
                Blogs
              </a>
              {/* <a
                 href="#"
                 className="px-3 py-2 text-sm lg:text-base font-medium text-blue-700 hover:text-blue-900 transition-colors duration-300"
               >
                 More
               </a> */}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-blue-700 hover:text-blue-900 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-300"
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
        <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-50 border-t border-blue-200">
          <Link
            href="/buy"
            onClick={closeMenu}
            className="text-blue-700 hover:text-blue-900 hover:bg-blue-50 block px-3 py-2 text-base font-medium transition-colors duration-200"
          >
            Buy
          </Link>
          <Link
            href="/off-plan"
            onClick={closeMenu}
            className="text-blue-700 hover:text-blue-900 hover:bg-blue-50 block px-3 py-2 text-base font-medium transition-colors duration-200"
          >
            Off Plan
          </Link>
          {/* <Link
            href="/rent"
            className="text-blue-700 hover:text-blue-900 hover:bg-blue-50 block px-3 py-2 text-base font-medium transition-colors duration-200"
          >
            Rent
          </Link> */}
          <Link
            href="/projects"
            onClick={closeMenu}
            className="text-blue-700 hover:text-blue-900 hover:bg-blue-50 block px-3 py-2 text-base font-medium transition-colors duration-200"
          >
            Projects
          </Link>
          <Link
            href="/developers"
            onClick={closeMenu}
            className="text-blue-700 hover:text-blue-900 hover:bg-blue-50 block px-3 py-2 text-base font-medium transition-colors duration-200"
          >
            Developers
          </Link>
          <Link
            href="/property-map"
            onClick={closeMenu}
            className="text-blue-700 hover:text-blue-900 hover:bg-blue-50 block px-3 py-2 text-base font-medium transition-colors duration-200"
          >
            Property Map
          </Link>
          <Link
            href="/areas"
            onClick={closeMenu}
            className="text-blue-700 hover:text-blue-900 hover:bg-blue-50 block px-3 py-2 text-base font-medium transition-colors duration-200"
          >
            Areas
          </Link>
          {/* <a
            href="#"
            className="text-blue-700 hover:text-blue-900 hover:bg-blue-50 block px-3 py-2 text-base font-medium transition-colors duration-200"
          >
            Services
          </a> */}
          <a
            href="#"
            className="text-blue-700 hover:text-blue-900 hover:bg-blue-50 block px-3 py-2 text-base font-medium transition-colors duration-200"
          >
            Blogs
          </a>
          {/* <a
            href="#"
            className="text-blue-700 hover:text-blue-900 hover:bg-blue-50 block px-3 py-2 text-base font-medium transition-colors duration-200"
          >
            More
          </a> */}
        </div>
      </div>
    </nav>
  );
}