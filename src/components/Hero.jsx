'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-white"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left side - Content */}
          <motion.div 
            className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-12"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Welcome to <span className="text-blue-600">Bethesda</span> Apostolic Church
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              A vibrant community of believers dedicated to spreading the love of Christ. 
              Join us as we worship, learn, and grow together in faith.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                href="#about" 
                className="btn btn-primary inline-flex items-center justify-center"
              >
                Learn More About Us
              </Link>
              <Link 
                href="#sermons" 
                className="btn btn-secondary inline-flex items-center justify-center"
              >
                Watch Sermons
              </Link>
            </div>
            
            <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { label: 'Sunday service', value: 'Sundays 11:30 AM - 01:00 PM' },
                { label: 'Mid week prayer', value: 'Wednesdays 05:30 PM' },
                { label: 'Mid week prayer', value: 'Fridays 05:30 PM' },
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
                  whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <h4 className="font-semibold text-gray-900">{item.label}</h4>
                  <p className="text-blue-600 font-medium">{item.value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Right side - Image */}
          <motion.div 
            className="w-full lg:w-1/2 relative mt-8 lg:mt-0 lg:pl-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl w-full">
              <div className="aspect-w-16 aspect-h-9 w-full">
                <Image
                  src="/1.jpg"
                  alt="Church Service"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4 sm:p-6 md:p-8">
                <div className="text-white">
                  <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">Join Us This Sunday</h3>
                  <p className="text-blue-200 text-sm sm:text-base">Experience the presence of God with us</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
