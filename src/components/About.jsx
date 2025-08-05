'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function About() {
  const images = ['/1.jpg', '/2.jpg'];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 20000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section id="about" className="section bg-white">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left side - Image Carousel (Desktop only) */}
          <div className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-12 relative hidden lg:block group">
            <motion.div
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
                      alt={`Church image ${currentImageIndex + 1}`}
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
                <div className="text-3xl font-bold">70+</div>
                <div className="text-xs uppercase tracking-wider">Years of Ministry</div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right side - Content */}
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-block px-3 py-1 mb-4 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full">
              About Our Church
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              A Place of <span className="text-blue-600">Faith</span>, Hope & Love
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Bethesda Apostolic Church has been a beacon of hope in our community for over 73 years.
              Founded on the principles of faith, love, and service, we strive to create a welcoming
              environment where everyone can experience the transformative power of God's love.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Our mission is to lead people into a growing relationship with Jesus Christ through
              authentic worship, biblical teaching, and genuine community. We believe in the power of
              the Holy Spirit to change lives and make a difference in our world.
            </p>

            {/* Image Carousel (Mobile only) - with hover effects */}
            <div className="w-full relative block lg:hidden mb-12 group">
              <motion.div
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
                        alt={`Church image ${currentImageIndex + 1}`}
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
                  <div className="text-3xl font-bold">70+</div>
                  <div className="text-xs uppercase tracking-wider">Years of Ministry</div>
                </motion.div>
              </motion.div>
            </div>

            <div className="space-y-4 mt-8 lg:mt-0">
              {[
                {
                  icon: '✝️',
                  title: 'Our Beliefs',
                  description: 'We believe in the Bible as the inspired Word of God and the foundation of our faith.'
                },
                {
                  icon: '🙏',
                  title: 'Our Vision',
                  description: 'To be a church that transforms lives through the power of the Gospel.'
                },
                {
                  icon: '❤️',
                  title: 'Our Values',
                  description: 'Love, faith, integrity, service, and community guide everything we do.'
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
              <Link
                href="#beliefs"
                className="btn btn-primary transition duration-300 ease-in-out hover:scale-105 hover:bg-blue-700"
              >
                Our Beliefs
              </Link>
              <Link
                href="/ministries/leadership"
                className="btn bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition duration-300 ease-in-out hover:scale-105"
              >
                Meet Our Priest
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}