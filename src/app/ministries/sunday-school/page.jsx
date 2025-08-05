// /app/ministries/sunday-school/page.jsx

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaUserGraduate, FaHandsHelping, FaPaintBrush, FaWhatsapp, FaFacebook, FaArrowLeft } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SundaySchoolPage() {
  const ministryDescription = `
    The Bethesda Apostolic Church Sunday School is a vibrant union dedicated to the spiritual growth and empowerment of our youth. Our primary mission is to teach and lead young people to Christ, grounding them in the fear of God and the knowledge of His Word. We provide a nurturing environment where our youth can ask questions, find answers, and build a strong foundation for a life of faith. Through engaging lessons and mentorship, we equip them with the tools they need to navigate the world while keeping their faith at the center of their lives. We believe that by investing in our youth today, we are securing a brighter future for the church.
  `;

  const galleryImages = [
    { src: '/images/13.jpg', alt: 'Youth Conference' },
    { src: '/images/12.jpg', alt: 'Matumba Conference' },
    { src: '/images/50.jpg' },
    { src: '/images/8.jpg', alt: 'Youth Ministry' },
    { src: '/images/51.jpg' },
    { src: '/images/52.jpg'},
    { src: '/images/55.jpg'},
    { src: '/images/56.jpg'},
    { src: '/images/57.jpg'},
    { src: '/images/58.jpg'},
    { src: '/images/59.jpg'},
    { src: '/images/60.jpg'},
    { src: '/images/61.jpg'},
    { src: '/images/62.jpg'},
    { src: '/images/63.jpg'},
    { src: '/images/64.jpg'},
    { src: '/images/65.jpg'},
    { src: '/images/66.jpg'},
    { src: '/images/67.jpg'},
    { src: '/images/68.jpg'},
  ];

  // Images for the slideshow
  const slideshowImages = [
    { src: '/images/53.jpg', alt: 'Youth at the Annual Arts Festival' },
    { src: '/images/54.jpg', alt: 'Another highlight from the Arts Festival' },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % slideshowImages.length
      );
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(timer); // Cleanup timer on component unmount
  }, [slideshowImages.length]);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header section with background image and black overlay */}
      <header className="relative h-[400px] md:h-[500px] flex items-center justify-center text-center p-4">
        <Image
          src="/images/50.jpg"
          alt="Sunday School Ministry"
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
            Sunday School Ministry
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-white">
            Empowering the next generation with the Word of God and the love of Christ.
          </p>
        </motion.div>
      </header>

      <main className="container mx-auto px-4 py-16">
        {/* Consistent Back to Home button from events page */}
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

        <section className="grid md:grid-cols-2 gap-8 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Annual Arts Festival</h3>
            <p className="text-gray-700 mb-4">
              A highlight of our year is the Annual Arts Festival, a special event where our youth can showcase their God-given talents. This festival includes a variety of performances such as:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>**Poems & Memory Verses:** Encouraging young ones to learn and remember God's Word.</li>
              <li>**Choirs:** Lifting their voices in praise and worship.</li>
              <li>**Dramas:** Telling powerful stories that inspire and teach biblical truths.</li>
              <li>**Musical Performances:** Celebrating creativity through song and instrumental music.</li>
            </ul>
            <p className="text-gray-700 mt-4">
              It’s a wonderful opportunity for the entire church community to witness the passion and creativity of our young members.
            </p>
          </motion.div>

          <motion.div
            className="relative h-[400px] rounded-xl overflow-hidden shadow-lg"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
              >
                <Image
                  src={slideshowImages[currentImageIndex].src}
                  alt={slideshowImages[currentImageIndex].alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
              </motion.div>
            </AnimatePresence>
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

        <motion.div
          className="text-center bg-blue-600 text-white p-8 rounded-xl shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-3xl font-bold mb-2">Connect with Us</h3>
          <div className="flex justify-center items-center space-x-6 mt-4">
            <a href="#" className="text-white hover:text-gray-200 transition-colors">
              <FaWhatsapp className="w-10 h-10" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=100092623952022" className="text-white hover:text-gray-200 transition-colors">
              <FaFacebook className="w-10 h-10" />
            </a>
          </div>
        </motion.div>
      </main>
    </div>
  );
}