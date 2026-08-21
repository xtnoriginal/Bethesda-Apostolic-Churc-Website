
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';


const projectUpdates = [
    { id: 1, image: '/images/28.jpg', date: '**** 2025' },
    { id: 2, image: '/images/22.jpg', date: '**** 2025 ' },
    { id: 3, image: '/images/39.jpg', date: '**** 2025' },
    { id: 4, image: '/images/40.jpg', date: '**** 2025' },
    { id: 5, image: '/images/41.jpg', date: '**** 2025' },
    { id: 6, image: '/images/23.jpg', date: '**** 2025' },
    { id: 7, image: '/images/24.jpg', date: '**** 2025' },
    { id: 8, image: '/images/26.jpg', date: '**** 2025' },
    { id: 9, image: '/images/30.jpg', date: '**** 2025' },
    { id: 10, image: '/images/20.jpg', date: '**** 2025' },
    { id: 11, image: '/images/29.jpg', date: '**** 2025' },
    { id: 12, image: '/images/31.jpg', date: '**** 2025' },

];

export default function ProjectsPage() {
  return (
    <div className="section bg-white min-h-screen">
      <div className="container mx-auto py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
              <FaArrowLeft className="mr-2" />
              Back to Home
            </Link>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Project <span className="text-blue-600">Updates</span>
          </h1>
          <p className="max-w-2xl mx-auto text-center text-gray-600 mb-12">
            Follow the progress of our ambitious Neniwo project through these images.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectUpdates.map((update, index) => (
            <motion.div
              key={update.id}
              className="relative w-full h-80 rounded-xl overflow-hidden shadow-md group hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Image
                src={update.image}
                alt={update.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-white">
                  <h3 className="font-bold text-xl">{update.title}</h3>
                  <p className="text-sm">{update.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}