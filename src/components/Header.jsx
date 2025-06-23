'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa';
import Image from 'next/image';

// Section colors mapping
const sectionColors = {
  home: 'bg-white/90 hover:bg-white',
  about: 'bg-blue-50/90 hover:bg-blue-50',
  sermons: 'bg-white/90 hover:bg-white',
  events: 'bg-gray-50/90 hover:bg-gray-50',
  neniwo: 'bg-blue-600/90 hover:bg-blue-600 text-white',
  baccet: 'bg-blue-800/90 hover:bg-blue-800 text-white',
  contact: 'bg-blue-50/90 hover:bg-blue-50',
};

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const observer = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Set up intersection observer for section detection
    const sections = document.querySelectorAll('section[id]');
    
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const handleIntersection = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    observer.current = new IntersectionObserver(handleIntersection, observerOptions);
    sections.forEach(section => observer.current.observe(section));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Sermons', href: '#sermons' },
    { name: 'Events', href: '#events' },
    { name: 'Neniwo', href: '#neniwo' },
    { name: 'Scholarship', href: '#baccet' },
    { name: 'Contact', href: '#contact' },
  ];

  // Get the current section's color class or default to white
  const getHeaderClass = () => {
    const baseClass = 'fixed w-full z-50 transition-all duration-300';
    const scrolledClass = isScrolled ? 'py-2' : 'py-4'; // Removed shadow from here
    const colorClass = sectionColors[activeSection] || 'bg-white/90 hover:bg-white';
    
    return `${baseClass} ${scrolledClass} ${colorClass} border-b-0`; // Added border-b-0 to ensure no border
  };

  return (
    <header className={getHeaderClass()}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="#home" className="flex items-center space-x-2">
          <div className="relative w-10 h-10">
            <Image 
              src="/logo.png" 
              alt="Bethesda Apostolic Church Logo" 
              fill 
              className="object-contain"
              priority
            />
          </div>
          <span className="text-2xl font-bold text-gray-900 ml-2">
            Bethesda <span className="text-blue-600">Apostolic Church</span>
          </span>
        </Link>


        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`font-medium transition-colors duration-200 ${
                activeSection === link.href.slice(1) 
                  ? 'text-blue-600 font-semibold' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <FaTimes className="w-6 h-6" />
          ) : (
            <FaBars className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`block px-3 py-2 rounded-md font-medium ${
                  activeSection === link.href.slice(1)
                    ? 'bg-blue-100 text-blue-700 font-semibold'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
