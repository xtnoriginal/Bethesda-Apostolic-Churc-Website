'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Neniwo() {
  const images = ['/neniwo1.jpg', '/neniwo2.jpg', '/neniwo3.jpg'];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Auto-advance the carousel every 20 seconds
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="neniwo" className="section bg-gray-50">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left side - Image Carousel */}
          <motion.div 
            className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-12 relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0"
                >
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">Neniwo Project Image {currentImageIndex + 1}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              {/* Image indicator dots */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all ${index === currentImageIndex ? 'bg-blue-600 w-8' : 'bg-white/50'}`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-4 sm:p-5 md:p-6 rounded-lg shadow-lg z-10">
              <div className="text-4xl font-bold">30,000</div>
              <div className="text-sm uppercase tracking-wider">Seater Capacity</div>
            </div>
          </motion.div>

          {/* Right side - Content */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-block px-3 py-1 mb-4 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full">
              Neniwo Project
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="text-blue-600">Neniwo</span> ndinoivaka
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Join us in our ambitious vision to build a 30,000-seater church in Chivhu Sadza. 
              "Neniwo ndinoivaka" (Me too, I am building) is more than a motto—it's a call to 
              collective action and faith in God's provision for this monumental project.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              This state-of-the-art worship center will serve as a spiritual home for thousands, 
              a beacon of hope for the community, and a testament to what can be achieved through 
              faith and unity in Christ.
            </p>
            
            <div className="space-y-4">
              {[
                {
                  icon: '🏗️',
                  title: 'The Vision',
                  description: 'A 30,000-seater worship center that will serve as a spiritual landmark for generations.'
                },
                {
                  icon: '📍',
                  title: 'Location',
                  description: 'Chivhu Sadza, strategically positioned to serve the surrounding communities.'
                },
                {
                  icon: '🤝',
                  title: 'Be Part of It',
                  description: 'Join us in prayer, giving, and service as we build God\'s house together.'
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
            
            <div className="mt-8 flex flex-wrap gap-4">
              <button className="btn btn-primary">Donate Now</button>
              <button className="btn bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">
                Project Updates
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
