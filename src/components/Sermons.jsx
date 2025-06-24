'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaPlay, FaCalendarAlt, FaClock, FaDownload } from 'react-icons/fa';

const sermons = [
  {
    id: 1,
    title: 'Walking in Faith Through Difficult Times',
    preacher: 'Preist K****** K*****',
    date: 'June 18, 2023',
    duration: '45:22',
    image: '/images/sermon-1.jpg',
    audio: '#',
    video: '#',
    description: 'Learn how to maintain your faith even when facing life\'s greatest challenges.'
  },
  {
    id: 2,
    title: 'The Power of Prayer',
    preacher: 'Preist K****** K*****',
    date: 'June 11, 2023',
    duration: '38:15',
    image: '/images/sermon-2.jpg',
    audio: '#',
    video: '#',
    description: 'Discover how prayer can transform your spiritual life and bring you closer to God.'
  },
  {
    id: 3,
    title: 'Living a Life of Purpose',
    preacher: 'Preist K****** K*****',
    date: 'June 4, 2023',
    duration: '52:40',
    image: '/images/sermon-3.jpg',
    audio: '#',
    video: '#',
    description: 'Understanding God\'s plan for your life and how to fulfill your divine purpose.'
  },
];

export default function Sermons() {
  return (
    <section id="sermons" className="section bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <motion.div 
            className="inline-block px-3 py-1 mb-4 text-sm font-semibold text-red-600 bg-red-100 rounded-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Recent Sermons
          </motion.div>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Watch & Listen to <span className="text-red-600">Sermons</span>
          </motion.h2>
          <motion.p 
            className="max-w-2xl mx-auto text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Catch up on our latest messages and be inspired by the Word of God.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sermons.map((sermon, index) => (
            <motion.div 
              key={sermon.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative h-48 bg-gray-200 overflow-hidden">
                <Image
                  src={sermon.image}
                  alt={sermon.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <button className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition-colors">
                    <FaPlay className="ml-1" />
                  </button>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 text-red-600 text-xs font-semibold px-2 py-1 rounded">
                  {sermon.duration}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <div className="flex items-center mr-4">
                    <FaCalendarAlt className="mr-1" />
                    <span>{sermon.date}</span>
                  </div>
                  <div className="flex items-center">
                    <FaClock className="mr-1" />
                    <span>{sermon.duration}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-2 line-clamp-2">{sermon.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{sermon.description}</p>
                <div className="text-sm font-medium text-gray-900 mb-4">Preacher: {sermon.preacher}</div>
                
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <button className="text-sm font-medium text-red-600 hover:text-red-700 flex items-center">
                    <FaPlay className="mr-1" /> Watch
                  </button>
                  <button className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center">
                    <FaDownload className="mr-1" /> Download
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <button className="btn btn-secondary">
            View All Sermons
          </button>
        </motion.div>
      </div>
    </section>
  );
}
