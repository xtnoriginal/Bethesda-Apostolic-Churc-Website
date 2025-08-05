'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

export default function HeroOfFaithPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const galleryImages = [
    { src: '/images/151.jpg', alt : 'Arch Bishop '},
    { src: '/images/152.jpg', alt: 'Arch Bishop'},
    { src: '/images/153.jpg', alt: 'Arch Bishop '},
    { src: '/images/154.jpg', alt: 'Arch Bishop in a church event' },
    { src: '/images/155.jpg', alt: 'Arch Bishop in a Church Event' },
    { src: '/images/156.jpg' , alt: 'Arch Bishop '},
    { src: '/images/157.jpg', alt: 'Arch Bishop Preaching the Word of God' },
    { src: '/images/158.jpg', alt: 'Arch Bishop at Neniwo '},
    { src: '/images/159.jpg', alt: 'Arch Bishop at Neniwo' },
    { src: '/images/160.jpg', alt: 'Arch Bishop giving Pasika' },
    { src: '/images/161.jpg', alt: 'Arch Bishop Preaching in Mountain' },
    { src: '/images/162.jpg', alt: 'Arch Bishop at Youth Conference in 2023' },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="relative h-[400px] md:h-[500px] flex items-center justify-center text-center p-4">
        <Image
          src="/images/150.jpg"
          alt="Arch Bishop tribute"
          fill
          style={{ objectFit: 'cover' }}
          className="z-0"
          priority
        />
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
        
        <motion.div
          className="relative z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
            In Loving Memory
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-white">
            Honoring our late Arch Bishop, a true Hero of Faith.
          </p>
        </motion.div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link href="/ministries" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <FaArrowLeft className="mr-2" />
            Back to Ministries
          </Link>
        </motion.div>

        <motion.section
          className="bg-white p-8 rounded-xl shadow-lg mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 variants={itemVariants} className="text-4xl font-bold text-gray-900 mb-6">
            The Legacy of Our Founder
          </motion.h2>
          <motion.p variants={itemVariants} className="text-gray-700 leading-relaxed mb-4">
            Our late Arch Bishop, a man of unwavering faith and profound vision, founded Bethesda Apostolic Church in 1952. His life was a testament to his dedication to spreading the word of God, a mission he pursued with boundless passion and love.
          </motion.p>
          <motion.p variants={itemVariants} className="text-gray-700 leading-relaxed">
            He was a shepherd to many, a mentor to leaders, and a spiritual father to our entire community. His teachings continue to be the bedrock of our faith, and his memory will forever be cherished in our hearts. We are eternally grateful for the foundation he laid, a legacy of faith, hope, and love that continues to flourish today.
          </motion.p>
        </motion.section>

        <motion.section
          className="grid md:grid-cols-3 gap-8 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="relative h-64 rounded-xl overflow-hidden shadow-lg">
            <Image 
              src="/images/202.jpg"
              alt="Arch Bishop in 1952"
              fill
              style={{ objectFit: 'cover' }}
            />
          </motion.div>
          <motion.div variants={itemVariants} className="md:col-span-2 bg-white p-8 rounded-xl shadow-lg flex items-center">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">A Life of Service</h3>
              <p className="text-gray-700">
                From the church's humble beginnings, he dedicated his life to service. His leadership was marked by compassion, wisdom, and a deep commitment to his flock. He inspired countless individuals to find their purpose in Christ and to live a life of integrity and faith.
              </p>
            </div>
          </motion.div>
        </motion.section>

        {/* Gallery Section */}
        <motion.section
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={containerVariants}
        >
          <motion.h2 variants={itemVariants} className="text-3xl font-bold text-gray-900 mb-8 text-center">
            A Journey of Faith in Pictures
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative h-64 w-full rounded-xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 group"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p className="text-white text-sm font-semibold">{image.alt}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Final Quote Section */}
        <motion.section
          className="bg-blue-600 text-white p-12 rounded-xl shadow-xl text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            "By faith, we remember his teachings and legacy."
          </h3>
          <p className="text-lg md:text-xl font-light">
            A promise to carry on the mission he started.
          </p>
        </motion.section>
      </main>
    </div>
  );
}