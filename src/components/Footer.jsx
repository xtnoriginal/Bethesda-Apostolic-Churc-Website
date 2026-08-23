'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Church } from 'lucide-react';
import { Facebook, Whatsapp, Youtube } from './BrandIcons';
export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  // Ministries link removed from quickLinks
  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Sermons', href: '/#sermons' },
    { name: 'Events', href: '/events' },
    { name: 'Contact', href: '/contact' },
    { name: 'Archives', href: '/archives' },
    { name: 'Our Founder', href: '/founder' },
    { name: 'Courses', href: '/courses' },
  ];
  
  const ministries = [
    { name: 'Sunday School', href: '/ministries/sunday-school' },
    { name: 'Neniwo Project', href: '/projects' },
    { name: 'Donations', href: '/donations' },
  ];
  
  const contactInfo = [
    { icon: <MapPin />, text: '5WHM+93M, Harare, Zimbabwe' },
    { icon: <Phone />, text: '+263 71 565 7*6*' },
    { icon: <Mail />, text: 'bethesdaapostolicchurch@gmail.com' },
  ];
  
  const socialLinks = [
    { icon: <Facebook />, href: 'https://www.facebook.com/share/g/1MUa4mMqrp/', label: 'Facebook' },
    { icon: <Whatsapp />, href: 'https://whatsapp.com/channel/0029VbAOqKW3wtbIHDTjK41T', label: 'WhatsApp' },
    { icon: <Youtube />, href: 'https://www.youtube.com/@bethesdaapostolicchurch4090', label: 'YouTube' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* About */}
          <div>
            <div className="flex items-center mb-4">
              <div className="relative w-10 h-10 flex-shrink-0 mr-3">
                <Image
                  src="/logo.png"
                  alt="Bethesda Apostolic Church Logo"
                  fill
                  className="object-contain"
                  sizes="40px"
                />
              </div>
              <span className="text-xl font-bold text-white">Bethesda <span className="text-gold-500">Apostolic Church</span></span>
            </div>
            <p className="mb-4 text-gray-400">
              A vibrant community of believers dedicated to spreading the love of Christ through worship, teaching, and service.
            </p>
            <div className="flex space-x-4 mt-6">
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
                    <span className="w-1.5 h-1.5 bg-gold-500 rounded-full mr-2"></span>
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
                <li key={index} className="flex items-start group hover:text-white transition-colors">
                  <span className="text-gold-500 mt-1 mr-3 transition-colors group-hover:text-gold-400">{info.icon}</span>
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