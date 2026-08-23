'use client';

import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const backgroundImages = ['/images/18.jpg', '/images/9.jpg', '/2.jpg', '/1.jpg'];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden -mt-20 md:-mt-24"
    >
      {/* Rotating background photos */}
      <div className="absolute inset-0 -z-20">
        <AnimatePresence mode="sync">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0"
          >
            <Image
              src={backgroundImages[currentImageIndex]}
              alt="Bethesda Apostolic Church worship service"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dark scrim for text legibility */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

      {/* Image position indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`h-1.5 rounded-full transition-all ${
              index === currentImageIndex ? 'bg-white w-8' : 'bg-white/40 w-4'
            }`}
            aria-label={`Show background image ${index + 1}`}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 pt-24 md:pt-28">
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white">
            Welcome to <span className="text-gold-500">Bethesda</span> Apostolic Church
          </h1>
          <p className="text-lg text-gray-100 mb-8 leading-relaxed">
            A vibrant community of believers dedicated to spreading the love of Christ.
            Join us as we worship, learn, and grow together in faith.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              href="#about"
              className="btn btn-primary inline-flex items-center justify-center transition duration-300 ease-in-out hover:scale-105 hover:bg-blue-700"
            >
              Learn More About Us
            </Link>
            <Link
              href="#sermons"
              className="btn btn-secondary inline-flex items-center justify-center transition duration-300 ease-in-out hover:scale-105 hover:bg-red-700"
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
                className="bg-white/10 backdrop-blur-md p-4 rounded-lg border border-white/20"
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <h4 className="font-semibold text-white">{item.label}</h4>
                <p className="text-gold-300 font-medium">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
