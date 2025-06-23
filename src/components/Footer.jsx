'use client';

import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt, FaChurch } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Sermons', href: '#sermons' },
    { name: 'Events', href: '#events' },
    { name: 'Ministries', href: '#ministries' },
    { name: 'Contact', href: '#contact' },
  ];
  
  const ministries = [
    { name: 'Children\'s Ministry', href: '#' },
    { name: 'Youth Ministry', href: '#' },
    { name: 'Men\'s Fellowship', href: '#' },
    { name: 'Women\'s Ministry', href: '#' },
    { name: 'Worship Team', href: '#' },
    { name: 'Outreach', href: '#' },
  ];
  
  const contactInfo = [
    { icon: <FaMapMarkerAlt />, text: '5WHM+93M, Harare, Zimbabwe' },
    { icon: <FaPhone />, text: '+263 71 565 7*6*' },
    { icon: <FaEnvelope />, text: 'bethesdaapostolicchurch@gmail.com' },
  ];
  
  const socialLinks = [
    { icon: <FaFacebook />, href: '#', label: 'Facebook' },
    { icon: <FaTwitter />, href: '#', label: 'Twitter' },
    { icon: <FaInstagram />, href: '#', label: 'Instagram' },
    { icon: <FaYoutube />, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* About */}
          <div>
            <div className="flex items-center mb-4">
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
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.href} 
                  className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center text-white transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-gray-800">Quick Links</h3>
            <ul className="space-y-2">
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
            <ul className="space-y-2">
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
            <ul className="space-y-3">
              {contactInfo.map((info, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-500 mt-1 mr-3">{info.icon}</span>
                  <span className="text-gray-400">{info.text}</span>
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
        <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
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
