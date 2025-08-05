
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';


const pastDonations = [
  { id: 1, image: '/images/34.jpg', date: '**** 2025' },
  { id: 2, image: '/images/35.jpg', date: '**** 2025' },
  { id: 3, image: '/images/36.jpg', date: '**** 2025' },
  { id: 4, image: '/images/37.jpg', date: '**** 2025' },
  { id: 5, image: '/images/38.jpg', date: 'January 2026' },
];

export default function DonationsPage() {
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
            Our <span className="text-blue-600">Past Donations</span>
          </h1>
          <p className="max-w-2xl mx-auto text-center text-gray-600 mb-12">
            See the impact of your generosity through these photos of our BACCET initiatives.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pastDonations.map((item, index) => (
            <motion.div
              key={item.id}
              className="relative w-full h-80 rounded-xl overflow-hidden shadow-md group hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-white">
                  <h3 className="font-bold text-xl">{item.title}</h3>
                  <p className="text-sm">{item.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}