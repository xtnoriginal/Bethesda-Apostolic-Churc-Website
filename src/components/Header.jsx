// src/components/Header.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { ministries } from '@/data/ministries';
import { Menu, ChevronDown, X } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isMinistriesMenuOpen, setIsMinistriesMenuOpen] = useState(false);
  const [isMobileMinistriesOpen, setIsMobileMinistriesOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const observer = useRef(null);
  const accountMenuRef = useRef(null);
  const ministriesMenuRef = useRef(null);
  const { user, isLoading, logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(e.target)) {
        setIsAccountMenuOpen(false);
      }
      if (ministriesMenuRef.current && !ministriesMenuRef.current.contains(e.target)) {
        setIsMinistriesMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);

    const sections = document.querySelectorAll('section[id]');

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    observer.current = new IntersectionObserver(handleIntersection, observerOptions);
    sections.forEach((section) => observer.current.observe(section));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  const navLinks = [
    { name: 'About', href: '/about' },
    { name: 'Sermons', href: '/#sermons' },
    { name: 'Events', href: '/events' },
    { name: 'Ministries', dropdown: true },
    { name: 'Our Founder', href: '/founder' },
    { name: 'Courses', href: '/courses' },
    { name: 'Contact', href: '/contact' },
  ];

  const getHeaderClass = () => {
    const baseClass = 'fixed w-full z-50 transition-all duration-300';
    const scrolledClass = isScrolled
      ? 'py-2 bg-white/90 backdrop-blur-md shadow-md'
      : 'py-4 bg-white/60 backdrop-blur-sm';
    return `${baseClass} ${scrolledClass}`;
  };

  return (
    <header className={getHeaderClass()}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative w-10 h-10 flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Bethesda Apostolic Church Logo"
              fill
              className="object-contain"
              sizes="40px"
              priority
            />
          </div>
          <span className="text-xl font-bold text-gray-900 ml-2 whitespace-nowrap">
            Bethesda <span className="text-blue-600">Apostolic Church</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            if (link.dropdown) {
              return (
                <div key={link.name} className="relative" ref={ministriesMenuRef}>
                  <button
                    onClick={() => setIsMinistriesMenuOpen((open) => !open)}
                    className="relative px-4 py-2 text-sm font-medium flex items-center gap-1 text-gray-700 hover:text-blue-600 transition-colors duration-200"
                  >
                    {link.name}
                    <ChevronDown
                      className={`text-xs transition-transform duration-200 ${isMinistriesMenuOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <AnimatePresence>
                    {isMinistriesMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 mt-3 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50"
                      >
                        {ministries.map((ministry) => (
                          <Link
                            key={ministry.slug}
                            href={ministry.href || `/ministries/${ministry.slug}`}
                            onClick={() => setIsMinistriesMenuOpen(false)}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            {ministry.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            const isActive = link.href.includes('#') && activeSection === link.href.split('#')[1];
            return (
              <Link
                key={link.name}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium"
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 bg-blue-50 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span
                  className={`relative z-10 transition-colors duration-200 ${
                    isActive ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  {link.name}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center space-x-3">
          {/* Auth control (desktop) */}
          <div className="hidden md:flex items-center" ref={accountMenuRef}>
            {!isLoading && user ? (
              <div className="relative">
                <button
                  onClick={() => setIsAccountMenuOpen((open) => !open)}
                  className="flex items-center space-x-2 group"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <ChevronDown
                    className={`text-xs text-gray-500 transition-transform duration-200 ${isAccountMenuOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                <AnimatePresence>
                  {isAccountMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50"
                    >
                      <div className="px-4 py-2 text-sm text-gray-500 truncate border-b border-gray-100 mb-1">
                        {user.name}
                      </div>
                      <Link
                        href="/dashboard"
                        onClick={() => setIsAccountMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/profile"
                        onClick={() => setIsAccountMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Profile
                      </Link>
                      {user.isAdmin && (
                        <Link
                          href="/admin"
                          onClick={() => setIsAccountMenuOpen(false)}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          Admin
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          logout();
                          setIsAccountMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link href="/login" className="btn btn-primary text-sm py-2 px-5">
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden bg-white shadow-lg overflow-hidden"
          >
            <div className="px-4 pt-2 pb-4 space-y-1">
              {navLinks.map((link) => {
                if (link.dropdown) {
                  return (
                    <div key={link.name}>
                      <button
                        onClick={() => setIsMobileMinistriesOpen((open) => !open)}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100"
                      >
                        {link.name}
                        <ChevronDown
                          className={`text-xs transition-transform duration-200 ${isMobileMinistriesOpen ? 'rotate-180' : ''}`}
                        />
                      </button>
                      {isMobileMinistriesOpen && (
                        <div className="pl-6 space-y-1">
                          {ministries.map((ministry) => (
                            <Link
                              key={ministry.slug}
                              href={ministry.href || `/ministries/${ministry.slug}`}
                              onClick={() => {
                                setIsMenuOpen(false);
                                setIsMobileMinistriesOpen(false);
                              }}
                              className="block px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100"
                            >
                              {ministry.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                const isActive = link.href.includes('#') && activeSection === link.href.split('#')[1];
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`block px-3 py-2 rounded-lg font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-600 font-semibold'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="pt-2 mt-2 border-t border-gray-100">
                {!isLoading && user ? (
                  <>
                    <Link
                      href="/dashboard"
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-3 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/profile"
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-3 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    {user.isAdmin && (
                      <Link
                        href="/admin"
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-3 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100"
                      >
                        Admin
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg font-medium text-red-600 hover:bg-gray-100"
                    >
                      Logout ({user.name})
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-2 rounded-lg font-medium text-blue-600 hover:bg-blue-50"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
