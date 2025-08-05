'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaYoutube, FaCalendarAlt, FaClock } from 'react-icons/fa';

const sermons = [
  {
    id: 1,
    title: 'Murehwa-Mutoko Passover 2025 || Bishop N Manhango',
    preacher: 'Bishop N Manhango',
    date: 'July 27, 2025',
    duration: '46:11',
    image: '/images/1.jpg',
    video: 'https://youtu.be/HPVrTZjYbPY?si=EyQLsJ9TiJTO41SP',
    description: 'Murehwa-Mutoko Passover 2025'
  },
  {
    id: 2,
    title: 'Marondera Passover 2025 - Mai ArchBishop Manhango',
    preacher: 'Mai ArchBishop Manhango',
    date: 'June 11, 2023',
    duration: '10:12',
    image: '/images/2.jpg',
    video: 'https://youtu.be/HPgtLSWVSnU?si=NJ49NDca3oRhhun7',
    description: 'Marondera Passover 2025'
  },
  {
    id: 3,
    title: 'Zaka Jerera Passover 2025 - Mai ArchBishop Manhango Sermon',
    preacher: 'Mai ArchBishop Manhango',
    date: 'July 20, 2025',
    duration: '10:52',
    image: '/images/3.jpg',
    video: 'https://youtu.be/mwRDA6jkILk?si=WzDzXfFfxjhldyG_',
    description: 'Zaka Jerera Passover 2025'
  },
];

const youtubeChannelUrl = 'https://www.youtube.com/@bethesdaapostolicchurch4090';

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
              className="bg-white rounded-xl overflow-hidden shadow-md group hover:shadow-xl transition-shadow duration-300 hover:scale-[1.02] transition-transform"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={sermon.video} target="_blank" rel="noopener noreferrer">
                <div className="relative h-48 bg-gray-200 overflow-hidden">
                  <Image
                    src={sermon.image}
                    alt={sermon.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition-colors"
                      aria-label={`Play sermon: ${sermon.title}`}
                    >
                      <FaYoutube className="text-4xl" />
                    </button>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 text-red-600 text-xs font-semibold px-2 py-1 rounded">
                    {sermon.duration}
                  </div>
                </div>
              </Link>
              
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                  <div className="flex items-center">
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
                
                <div className="flex justify-center items-center pt-4 border-t border-gray-100">
                  <Link
                    href={sermon.video}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-red-600 hover:text-red-700 flex items-center hover:scale-105 transition-transform duration-200"
                  >
                    <FaYoutube className="mr-1 text-base" /> Watch Sermon
                  </Link>
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
          <Link
            href={youtubeChannelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary transition duration-300 ease-in-out hover:scale-105"
          >
            View All Sermons
          </Link>
        </motion.div>
      </div>
    </section>
  );
}