'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import DonateModal from './DonateModal';

export default function Neniwo() {
  const images = ['/images/neniwologo.jpg', '/images/neniwo.jpg'];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 20000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section id="neniwo" className="relative section overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gray-50 via-white to-blue-50" />
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-200/30 blur-3xl -z-10" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-blue-100/50 blur-3xl -z-10" />
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left side - Image Carousel (Desktop only) */}
          <motion.div
            className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-12 relative hidden lg:block group"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] transition duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-2xl">
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
                    src={images[currentImageIndex]}
                    alt={`Neniwo Project Image ${currentImageIndex + 1}`}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all ${index === currentImageIndex ? 'bg-white w-8' : 'bg-white/50'}`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            <motion.div
              className="absolute -bottom-6 right-6 bg-blue-600 text-white p-4 sm:p-5 md:p-6 rounded-lg shadow-lg z-10"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="text-4xl font-bold">30,000</div>
              <div className="text-sm uppercase tracking-wider">Seater Capacity</div>
            </motion.div>
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

            {/* Mobile Image Carousel (Mobile only) - Placed under the title */}
            <div className="w-full relative block lg:hidden mb-8 group">
              <div className="relative rounded-2xl overflow-hidden shadow-xl w-full h-[300px] sm:h-[400px]">
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
                      src={images[currentImageIndex]}
                      alt={`Neniwo Project Image ${currentImageIndex + 1}`}
                      fill
                      className="object-cover"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all ${index === currentImageIndex ? 'bg-white w-8' : 'bg-white/50'}`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
              <motion.div
                className="absolute -bottom-6 right-6 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-10"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="text-xl font-bold">30,000</div>
                <div className="text-xs uppercase tracking-wider">Seater Capacity</div>
              </motion.div>
            </div>
            
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
              <button onClick={() => setIsDonateModalOpen(true)} className="btn btn-primary">
                Donate Now
              </button>
              <Link href="/projects" className="btn bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">
                Project Updates
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Donate Modal Component */}
      {isDonateModalOpen && <DonateModal onClose={() => setIsDonateModalOpen(false)} />}
    </section>
  );
}