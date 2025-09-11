// src/components/Header.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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
  
  // GSAP refs
  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const brandTextRef = useRef(null);
  const navLinksRef = useRef([]);
  const mobileMenuRef = useRef(null);
  const hamburgerRef = useRef(null);

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance animation
      if (headerRef.current) {
        gsap.fromTo(headerRef.current,
          { y: -100, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 1, 
            ease: "power3.out",
            delay: 0.2
          }
        );
      }

      // Logo animation
      if (logoRef.current) {
        gsap.fromTo(logoRef.current,
          { scale: 0, rotation: -360 },
          { 
            scale: 1, 
            rotation: 0, 
            duration: 1.2, 
            delay: 0.8,
            ease: "back.out(1.7)"
          }
        );
      }

      // Brand text animation - slide in from left
      if (brandTextRef.current) {
        gsap.fromTo(brandTextRef.current,
          { x: -50, opacity: 0 },
          { 
            x: 0, 
            opacity: 1, 
            duration: 1, 
            delay: 1,
            ease: "power3.out"
          }
        );
      }

      // Navigation links staggered animation
      navLinksRef.current.forEach((link, index) => {
        if (link) {
          gsap.fromTo(link,
            { y: -30, opacity: 0 },
            { 
              y: 0, 
              opacity: 1, 
              duration: 0.6, 
              delay: 1.2 + (index * 0.1),
              ease: "power2.out"
            }
          );

          // Link hover effects
          link.addEventListener('mouseenter', () => {
            gsap.to(link, { 
              scale: 1.05, 
              y: -2,
              duration: 0.3, 
              ease: "power2.out"
            });
          });

          link.addEventListener('mouseleave', () => {
            gsap.to(link, { 
              scale: 1, 
              y: 0,
              duration: 0.3, 
              ease: "power2.out"
            });
          });
        }
      });

      // Hamburger menu animation
      if (hamburgerRef.current) {
        gsap.fromTo(hamburgerRef.current,
          { scale: 0, rotation: 180 },
          { 
            scale: 1, 
            rotation: 0, 
            duration: 0.8, 
            delay: 1.5,
            ease: "back.out(1.7)"
          }
        );
      }

    }, headerRef);

    return () => ctx.revert();
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isMenuOpen) {
        gsap.fromTo(mobileMenuRef.current,
          { height: 0, opacity: 0 },
          { 
            height: 'auto', 
            opacity: 1, 
            duration: 0.4, 
            ease: "power2.out"
          }
        );

        // Animate mobile menu items
        const menuItems = mobileMenuRef.current.querySelectorAll('a');
        gsap.fromTo(menuItems,
          { x: -30, opacity: 0 },
          { 
            x: 0, 
            opacity: 1, 
            duration: 0.3, 
            stagger: 0.1,
            delay: 0.2,
            ease: "power2.out"
          }
        );
      } else {
        gsap.to(mobileMenuRef.current, {
          height: 0, 
          opacity: 0, 
          duration: 0.3, 
          ease: "power2.in"
        });
      }
    }
  }, [isMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Sermons', href: '#sermons' },
    { name: 'Events', href: '#events' },
    { name: 'Neniwo', href: '#neniwo' },
    { name: 'Scholarship', href: '#baccet' },
    { name: 'Contact', href: '#contact' },
  ];

  const getHeaderClass = () => {
    const baseClass = 'fixed w-full z-50 transition-all duration-300 bg-white/90 backdrop-blur-lg shadow-lg border-b border-white/20';
    const scrolledClass = isScrolled ? 'py-2' : 'py-4';
    
    return `${baseClass} ${scrolledClass}`;
  };

  return (
    <header ref={headerRef} className={getHeaderClass()}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="#home" className="flex items-center space-x-2">
          <div ref={logoRef} className="relative w-10 h-10">
            <Image 
              src="/logo.png" 
              alt="Bethesda Apostolic Church Logo" 
              fill 
              sizes="40px"
              className="object-contain"
              priority
            />
          </div>
          <span ref={brandTextRef} className="text-xl md:text-2xl font-bold text-gray-900 ml-2">
            Bethesda <span style={{color: '#0033A0'}}>Apostolic Church</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link, index) => (
            <Link
              key={link.name}
              ref={el => navLinksRef.current[index] = el}
              href={link.href}
              className={`font-medium transition-colors duration-200 ${
                activeSection === link.href.slice(1) 
                  ? 'font-semibold' 
                  : 'text-gray-700'
              }`}
              style={{
                color: activeSection === link.href.slice(1) ? '#0033A0' : undefined
              }}
              onMouseEnter={(e) => e.target.style.color = '#0033A0'}
              onMouseLeave={(e) => {
                if (activeSection !== link.href.slice(1)) {
                  e.target.style.color = '#374151';
                }
              }}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button 
          ref={hamburgerRef}
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
        <div ref={mobileMenuRef} className="md:hidden bg-white shadow-lg overflow-hidden">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`block px-3 py-2 rounded-md font-medium ${
                  activeSection === link.href.slice(1)
                    ? 'font-semibold'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                style={{
                  backgroundColor: activeSection === link.href.slice(1) ? '#f0f4ff' : undefined,
                  color: activeSection === link.href.slice(1) ? '#0033A0' : undefined
                }}
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