'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaMapMarkerAlt } from 'react-icons/fa';
import { useState, useEffect } from 'react';


function PriestCard({ priest, delay }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (priest.images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % priest.images.length
      );
    }, 4000); 

    return () => clearInterval(timer);
  }, [priest.images.length]);

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: delay }}
    >
      <div className="relative h-64 overflow-hidden rounded-t-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <Image
              src={priest.images[currentImageIndex]}
              alt={priest.name}
              fill
              style={{ objectFit: 'cover' }}
              className="group-hover:scale-105 transition-transform duration-300"
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Image navigation dots */}
        {priest.images.length > 1 && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-20">
            {priest.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentImageIndex ? 'bg-white w-8' : 'bg-white/50'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
      <div className="p-6 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{priest.name}</h3>
        <div className="flex items-center justify-center text-gray-600 text-lg">
          <FaMapMarkerAlt className="text-blue-600 mr-2" />
          <span>{priest.branch}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function LeadershipPage() {
  const priests = [
    {
      name: 'Bishop N Manhango',
      branch: 'Main Branch, Harare',
      images: ['/images/120.jpg', '/images/121.jpg', '/images/122.jpg', '/images/123.jpg'], 
    },
    {
      name: 'Priest K Manhango',
      branch: '**** Branch',
      images: ['/images/126.jpg', '/images/127.jpg'], 
    },
    {
      name: 'Priest Zvandasara',
      branch: '**** Branch',
      images: ['/images/125.jpg'], 
    },
    {
      name: 'Priest *****',
      branch: '**** Branch',
      images: ['/images/128.jpg'], 
    },
    {
      name: 'Priest *****', 
      branch: '**** Branch',
      images: ['/images/129.jpg', '/images/131.jpg'], 
    },
    {
      name: 'Priest *****',  
      branch: '**** Branch',
      images: ['/images/130.jpg'], 
    },
    {
      name: 'Priest *****',  
      branch: '**** Branch',
      images: ['/images/132.jpg'], 
    },
    {
      name: 'Priest *****',
      branch: '**** Branch',
      images: ['/images/133.jpg'],
    },
    {
      name: 'Priest *****',
      branch: '**** Branch',
      images: ['/images/134.jpg', '/images/135.jpg'],
    },
    {
      name: 'Priest *****',
      branch: '**** Branch',
      images: ['/images/136.jpg', '/images/137.jpg', '/images/138.jpg'],
    }
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header section with background image and black overlay */}
      <header className="relative h-[400px] md:h-[500px] flex items-center justify-center text-center p-4">
        <Image
          src="/images/101.jpg"
          alt="Church Leadership"
          fill
          style={{ objectFit: 'cover' }}
          className="z-0"
        />
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
        
        <motion.div
          className="relative z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
            Our Priesthood
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-white">
            Meet the spiritual leaders guiding our church community.
          </p>
        </motion.div>
      </header>

      <main className="container mx-auto px-4 py-16">
        {/* Consistent Back to Home button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <FaArrowLeft className="mr-2" />
            Back to Home
          </Link>
        </motion.div>

        <section className="bg-white p-8 rounded-xl shadow-lg mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="prose max-w-none text-gray-700"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Shepherds</h2>
            <p>
              Our church is blessed with dedicated spiritual leaders who serve with humility and passion. They provide guidance, mentorship, and support to our congregation, ensuring we are grounded in the Word of God and united in our mission to spread His love.
            </p>
          </motion.div>
        </section>

        <section>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {priests.map((priest, index) => (
              <PriestCard key={index} priest={priest} delay={index * 0.2} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}