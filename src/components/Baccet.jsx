'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Baccet() {
  const stats = [
    { value: '100+', label: 'Students Supported Annually' },
    { value: 'ZWL 1.5M+', label: 'Invested in Education' },
    { value: '80%', label: 'Academic Success Rate' },
    { value: '5+', label: 'Years of Service' },
  ];

  return (
    <section id="baccet" className="section bg-white">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left side - Content */}
          <motion.div 
            className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-12"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-3 py-1 mb-4 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full">
              BACCET
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
              <span className="text-blue-600">Bethesda Apostolic Church</span> Education Trust
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              The Bethesda Apostolic Church Christian Education Trust (BACCET) is committed to providing 
              educational opportunities for children from less privileged families within our community. 
              Each year, we support between 100-150 students with school fees, uniforms, and learning materials.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Our mission is to break the cycle of poverty through education, empowering the next generation 
              with knowledge and skills for a brighter future. We believe that every child deserves access to 
              quality education, regardless of their family's financial situation.
            </p>
            
            <div className="space-y-4 mb-8">
              {[
                {
                  icon: '🎓',
                  title: 'Our Impact',
                  description: 'Supporting over 100 students annually with full educational support.'
                },
                {
                  icon: '❤️',
                  title: 'Our Mission',
                  description: 'Ensuring no child is denied education due to financial constraints.'
                },
                {
                  icon: '🤝',
                  title: 'Get Involved',
                  description: 'Your support can change a child\'s life through education.'
                }
              ].map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-100 text-blue-600 rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{item.title}</h4>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a 
                href="#apply" 
                className="btn bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto text-center"
              >
                Apply for Scholarship
              </a>
              <a 
                href="#donate" 
                className="btn bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 w-full sm:w-auto text-center"
              >
                Donate Now
              </a>
            </div>
          </motion.div>

          {/* Right side - Stats and Image */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-blue-50 rounded-2xl p-8 shadow-lg">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-2xl sm:text-3xl font-bold text-blue-600">{stat.value}</div>
                    <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
              
              <div className="relative rounded-xl overflow-hidden h-48 sm:h-56 md:h-64 mt-4 sm:mt-0">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-blue-700/80 flex items-center justify-center">
                  <div className="text-center text-white p-4 sm:p-6">
                    <div className="text-lg sm:text-xl md:text-2xl font-bold mb-2 leading-tight">Education is the most powerful weapon <span className="italic">Vana mudzidze nesimba</span></div>
                    <p className="text-blue-100 text-sm sm:text-base">- Late Arch Bishop L Manhango</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-gray-600 mb-4">
                  Join us in making a difference in the lives of underprivileged students.
                </p>
                <a 
                  href="#contact" 
                  className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Contact Us for More Info
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
