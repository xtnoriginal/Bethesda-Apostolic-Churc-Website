'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { FaFacebook, FaWhatsapp, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt, FaChurch } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const footerRef = useRef(null);
  const logoRef = useRef(null);
  const sectionsRef = useRef(null);
  const socialLinksRef = useRef(null);
  const copyrightRef = useRef(null);
  const contactItemsRef = useRef(null);
  const quickLinksRef = useRef(null);
  const ministriesRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Footer entrance animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
          end: 'bottom 10%',
          toggleActions: 'play none none reverse'
        }
      });

      // Logo and brand animation
      tl.fromTo(logoRef.current, 
        { opacity: 0, y: 30, scale: 0.9 }, 
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }
      );

      // Sections staggered animation
      tl.fromTo(sectionsRef.current?.children || [], 
        { opacity: 0, y: 40 }, 
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }, 
        '-=0.4'
      );

      // Social links animation
      if (socialLinksRef.current) {
        tl.fromTo(socialLinksRef.current.children, 
          { opacity: 0, scale: 0, rotation: 180 }, 
          { opacity: 1, scale: 1, rotation: 0, duration: 0.4, stagger: 0.1, ease: 'back.out(1.7)' }, 
          '-=0.2'
        );
      }

      // Copyright animation
      tl.fromTo(copyrightRef.current, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 
        '-=0.2'
      );

      // Quick links hover animations
      if (quickLinksRef.current) {
        const links = quickLinksRef.current.querySelectorAll('a');
        links.forEach(link => {
          link.addEventListener('mouseenter', () => {
            gsap.to(link, { x: 5, duration: 0.3, ease: 'power2.out' });
          });
          link.addEventListener('mouseleave', () => {
            gsap.to(link, { x: 0, duration: 0.3, ease: 'power2.out' });
          });
        });
      }

      // Ministries hover animations
      if (ministriesRef.current) {
        const ministryLinks = ministriesRef.current.querySelectorAll('a');
        ministryLinks.forEach(link => {
          link.addEventListener('mouseenter', () => {
            gsap.to(link, { x: 5, duration: 0.3, ease: 'power2.out' });
            const dot = link.querySelector('span');
            if (dot) gsap.to(dot, { scale: 1.5, duration: 0.3, ease: 'back.out(1.7)' });
          });
          link.addEventListener('mouseleave', () => {
            gsap.to(link, { x: 0, duration: 0.3, ease: 'power2.out' });
            const dot = link.querySelector('span');
            if (dot) gsap.to(dot, { scale: 1, duration: 0.3, ease: 'power2.out' });
          });
        });
      }

      // Contact items hover animations
      if (contactItemsRef.current) {
        const contactItems = contactItemsRef.current.querySelectorAll('li');
        contactItems.forEach(item => {
          item.addEventListener('mouseenter', () => {
            gsap.to(item, { x: 5, duration: 0.3, ease: 'power2.out' });
            const icon = item.querySelector('span:first-child');
            if (icon) gsap.to(icon, { scale: 1.2, rotation: 5, duration: 0.3, ease: 'back.out(1.7)' });
          });
          item.addEventListener('mouseleave', () => {
            gsap.to(item, { x: 0, duration: 0.3, ease: 'power2.out' });
            const icon = item.querySelector('span:first-child');
            if (icon) gsap.to(icon, { scale: 1, rotation: 0, duration: 0.3, ease: 'power2.out' });
          });
        });
      }

      // Social links hover animations
      if (socialLinksRef.current) {
        const socialLinks = socialLinksRef.current.querySelectorAll('a');
        socialLinks.forEach(link => {
          link.addEventListener('mouseenter', () => {
            gsap.to(link, { y: -3, scale: 1.1, duration: 0.3, ease: 'back.out(1.7)' });
          });
          link.addEventListener('mouseleave', () => {
            gsap.to(link, { y: 0, scale: 1, duration: 0.3, ease: 'power2.out' });
          });
        });
      }

    }, footerRef);

    return () => ctx.revert();
  }, []);
  
  // Ministries link removed from quickLinks
  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Sermons', href: '#sermons' },
    { name: 'Events', href: '#events' },
    { name: 'Contact', href: '#contact' },
  ];
  
  const ministries = [
    { name: 'Sunday School', href: '/ministries/sunday-school' },
    { name: 'Ruwadzano', href: '/ministries/ruwadzano' },
    { name: 'BMCU', href: '/ministries/bmcu' },
    { name: 'Church', href: '/ministries/church' },
    { name: 'Leadership', href: '/ministries/leadership' },
  ];
  
  const contactInfo = [
    { icon: <FaMapMarkerAlt />, text: '5WHM+93M, Harare, Zimbabwe' },
    { icon: <FaPhone />, text: '+263 71 565 7*6*' },
    { icon: <FaEnvelope />, text: 'bethesdaapostolicchurch@gmail.com' },
  ];
  
  const socialLinks = [
    { icon: <FaFacebook />, href: 'https://www.facebook.com/share/g/1MUa4mMqrp/', label: 'Facebook' },
    { icon: <FaWhatsapp />, href: 'https://whatsapp.com/channel/0029VbAOqKW3wtbIHDTjK41T', label: 'WhatsApp' },
    { icon: <FaYoutube />, href: 'https://www.youtube.com/', label: 'YouTube' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8" ref={footerRef}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12" ref={sectionsRef}>
          {/* About */}
          <div>
            <div className="flex items-center mb-4" ref={logoRef}>
              <img 
                src="/logo.png" 
                alt="Bethesda Apostolic Logo" 
                className="h-10 w-auto mr-3" 
              />
              <span className="text-xl font-bold text-white">Bethesda <span className="text-blue-500">Apostolic Church</span></span>
            </div>
            <p className="mb-4 text-gray-400">
              A vibrant community of believers dedicated to spreading the love of Christ through worship, teaching, and service.
            </p>
            <div className="flex space-x-4 mt-6" ref={socialLinksRef}>
              <a 
                href={socialLinks[0].href} 
                className="w-10 h-10 bg-[#3b5998] hover:bg-[#2d4373] rounded-full flex items-center justify-center text-white transition-colors"
                aria-label={socialLinks[0].label}
              >
                {socialLinks[0].icon}
              </a>
              <a 
                href={socialLinks[1].href} 
                className="w-10 h-10 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center text-white transition-colors"
                aria-label={socialLinks[1].label}
              >
                {socialLinks[1].icon}
              </a>
              <a 
                href={socialLinks[2].href} 
                className="w-10 h-10 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-white transition-colors"
                aria-label={socialLinks[2].label}
              >
                {socialLinks[2].icon}
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-gray-800">Quick Links</h3>
            <ul className="space-y-2" ref={quickLinksRef}>
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Ministries */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-gray-800">Our Ministries</h3>
            <ul className="space-y-2" ref={ministriesRef}>
              {ministries.map((ministry, index) => (
                <li key={index}>
                  <Link 
                    href={ministry.href} 
                    className="text-gray-400 hover:text-blue-400 transition-colors flex items-center"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                    {ministry.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-gray-800">Contact Us</h3>
            <ul className="space-y-3" ref={contactItemsRef}>
              {contactInfo.map((info, index) => (
                <li key={index} className="flex items-start group hover:text-white transition-colors">
                  <span className="text-blue-500 mt-1 mr-3 transition-colors group-hover:text-blue-400">{info.icon}</span>
                  <span className="text-gray-400 transition-colors group-hover:text-white">{info.text}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-6">
              <h4 className="text-white font-medium mb-2">Service Times</h4>
              <ul className="space-y-1 text-sm text-gray-400">
                <li>Sunday: 11:00 AM - 1:00 PM (Sunday Service)</li>
                <li>Wednesday: 6:00 PM (Mid week prayer)</li>
                <li>Friday: 6:00 PM (Mid week prayer)</li>
                <li>* Sunday school and Ruwadzano at 10:00 AM</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm" ref={copyrightRef}>
          <p>© {currentYear} Bethesda Apostolic Church. All Rights Reserved.</p>
          <div className="mt-2 flex flex-wrap justify-center space-x-4">
            <Link href="/privacy-policy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link>
            <span>|</span>
            <Link href="/terms" className="hover:text-blue-400 transition-colors">Terms of Use</Link>
            <span>|</span>
            <Link href="/sitemap" className="hover:text-blue-400 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}