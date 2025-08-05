'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaTimes, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

// The duration for each image in the carousel in milliseconds
const CAROUSEL_INTERVAL = 7000;

export default function EventModal({ event, onClose }) {
  if (!event) return null;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Start the automatic image carousel
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % event.images.length);
    }, CAROUSEL_INTERVAL);

    // Clean up the interval when the modal closes
    return () => clearInterval(interval);
  }, [event.images.length]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white z-20 bg-black/30 p-2 rounded-full hover:bg-black/50 transition-colors"
            aria-label="Close modal"
          >
            <FaTimes className="text-xl" />
          </button>

          {/* Image Carousel */}
          <div className="relative h-64 sm:h-80 md:h-96 w-full rounded-t-xl overflow-hidden">
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
                  src={event.images[currentImageIndex]}
                  alt={`${event.title} image ${currentImageIndex + 1}`}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </motion.div>
            </AnimatePresence>
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
              {event.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${index === currentImageIndex ? 'bg-white w-8' : 'bg-white/50'}`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          {/* Event Details */}
          <div className="p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{event.title}</h2>
            
            <div className="flex flex-wrap items-center text-sm text-gray-600 mb-6 space-y-2 md:space-y-0 md:space-x-6">
              <div className="flex items-center">
                <FaCalendarAlt className="mr-2 text-blue-600" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="mr-2 text-blue-600" />
                <span>{event.location}</span>
              </div>
            </div>
            
            <p className="text-gray-700 leading-relaxed">{event.description}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}