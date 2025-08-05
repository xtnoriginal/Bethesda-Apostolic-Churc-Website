
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

export default function ChurchArchivePage() {
  const churchDescription = `
    Welcome to our church archive, a visual journey through the history and vibrant life of our community. This collection of photos captures moments from our Sunday services, ministry events, conferences, and fellowships. It tells the story of our growth, our shared faith, and the joy we find in Christ. We are more than just a church; we are a family, and this archive is a testament to the bonds we've formed and the work God has done in our midst.
  `;

 
  const galleryImages = [
    { src: '/images/13.jpg', alt: 'Youth Conference' },
    { src: '/images/12.jpg', alt: 'Matumba Conference' },
    { src: '/images/50.jpg', alt: 'Church Service' },
    { src: '/images/8.jpg', alt: 'Youth Ministry' },
    { src: '/images/51.jpg', alt: 'Church Fellowship' },
    { src: '/images/52.jpg', alt: 'Worship Session'},
    { src: '/images/11.jpg', alt: 'Ruwadzano Conference Session' },
    { src: '/images/6.jpg', alt: 'Ruwadzano Event' },
    { src: '/images/15.jpg', alt: 'Ruwadzano Outreach' },
    { src: '/images/5.jpg', alt: 'BMCU Conference' },
    { src: '/images/14.jpg', alt: 'BMCU Fellowship' },
    { src: '/images/16.jpg', alt: 'BMCU members' },
    { src: '/images/70.jpg', alt: 'Church gathering' },
    { src: '/images/71.jpg', alt: 'Church members' },
    { src: '/images/72.jpg', alt: 'Worship' },
    { src: '/images/73.jpg', alt: 'Praise and Worship' },
    { src: '/images/74.jpg', alt: 'Group Photo' },
    { src: '/images/75.jpg', alt: 'Prayer Group' },
    { src: '/images/76.jpg', alt: 'Youth gathering' },
    { src: '/images/77.jpg', alt: 'Conference Photo' },
    { src: '/images/78.jpg', alt: 'Church community' },
    { src: '/images/79.jpg', alt: 'Church event' },
    { src: '/images/80.jpg', alt: 'Youth event' },
    { src: '/images/81.jpg', alt: 'Group prayer' },
    { src: '/images/82.jpg', alt: 'Church outreach' },
    { src: '/images/83.jpg', alt: 'Fellowship' },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header section with background image and black overlay */}
      <header className="relative h-[400px] md:h-[500px] flex items-center justify-center text-center p-4">
        <Image
          src="/images/home.jpg" 
          alt="Church Archive"
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
            Our Church Archive
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-white">
            A visual history of our community, faith, and fellowship.
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p>{churchDescription}</p>
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
            Moments in Time
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