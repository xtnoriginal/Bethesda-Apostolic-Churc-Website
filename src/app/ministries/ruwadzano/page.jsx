'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaWhatsapp, FaFacebook } from 'react-icons/fa';

export default function RuwadzanoPage() {
  const ministryDescription = `
    The Ruwadzano Ministry is a fellowship of women dedicated to serving God and the church community with a spirit of excellence. Our mission is to empower, encourage, and uplift women through prayer, fellowship, and service. We strive to create a nurturing environment where women can grow in their faith, share their experiences, and support one another through life's challenges. Through our various programs and conferences, we focus on strengthening the family unit, promoting spiritual maturity, and reaching out to the broader community with the love of Christ.
  `;

  // Ruwadzano-specific images for the gallery
  const galleryImages = [
    { src: '/images/11.jpg', alt: 'Ruwadzano Conference Session' },
    { src: '/images/6.jpg', alt: 'Ruwadzano Event' },
    { src: '/images/15.jpg', alt: 'Ruwadzano Outreach' },
    { src: '/images/70.jpg'},
    { src: '/images/71.jpg' },
    { src: '/images/72.jpg' },
    { src: '/images/73.jpg' },
    { src: '/images/74.jpg' },
    { src: '/images/75.jpg' },
    { src: '/images/76.jpg' },
    { src: '/images/77.jpg' },
    { src: '/images/78.jpg' },
    { src: '/images/79.jpg' },
    { src: '/images/80.jpg' },
    { src: '/images/81.jpg' },
    { src: '/images/82.jpg' },
    { src: '/images/83.jpg' }, 
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header section with background image and black overlay */}
      <header className="relative h-[400px] md:h-[500px] flex items-center justify-center text-center p-4">
        <Image
          src="/images/11.jpg"
          alt="Ruwadzano Ministry"
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
            Ruwadzano Ministry
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-white">
            Empowering women to serve and grow in faith.
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