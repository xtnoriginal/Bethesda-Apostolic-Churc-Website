'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

export default function BMCUPage() {
  const ministryDescription = `
    The BMCU (Bethesda Men's Christian Union) Ministry is a brotherhood of men dedicated to spiritual growth, fellowship, and service. Our purpose is to equip men to be leaders in their homes, the church, and the community. We provide a platform for men to study the Word of God, share in meaningful fellowship, and support one another as we strive to live out our faith in practical ways. Through our conferences and various activities, we address the unique challenges men face and empower them to be strong, godly examples for the next generation.
  `;


  const galleryImages = [
    { src: '/images/5.jpg', alt: 'BMCU Conference' },
    { src: '/images/14.jpg', alt: 'BMCU Fellowship' },
    { src: '/images/16.jpg', alt: 'BMCU members' },
    { src: '/images/90.jpg'},
    { src: '/images/91.jpg' },
    { src: '/images/92.jpg' },
    { src: '/images/93.jpg' },
    { src: '/images/94.jpg' },
    { src: '/images/95.jpg' },
    { src: '/images/96.jpg' },
    { src: '/images/97.jpg' },
    { src: '/images/98.jpg' },
    { src: '/images/99.jpg' },
    { src: '/images/100.jpg' },
    { src: '/images/101.jpg' },
    { src: '/images/102.jpg' },
    { src: '/images/103.jpg' },
    { src: '/images/104.jpg' }, 
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header section with background image and black overlay */}
      <header className="relative h-[400px] md:h-[500px] flex items-center justify-center text-center p-4">
        <Image
          src="/images/5.jpg"
          alt="BMCU Ministry"
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
            BMCU Ministry
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-white">
            A Men dedicated to serving God with strength, purpose and leadership.
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p>{ministryDescription}</p>
          </motion.div>
        </section>

        <section className="mb-16">
          <motion.h2
            className="text-3xl font-bold text-center text-gray-900 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ministry Highlights
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                className="relative h-48 sm:h-64 rounded-lg overflow-hidden shadow-md group"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}