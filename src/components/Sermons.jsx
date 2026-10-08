'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Youtube } from './BrandIcons';
import { youTubeEmbedUrl, youTubeThumbnailUrl } from '@/lib/youtube';

const formatDate = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

const youtubeChannelUrl = 'https://www.youtube.com/@bethesdaapostolicchurch4090';

export default function Sermons() {
  const [sermons, setSermons] = useState(null);
  const [playingId, setPlayingId] = useState(null);

  useEffect(() => {
    fetch('/api/sermons?limit=3')
      .then((res) => (res.ok ? res.json() : { sermons: [] }))
      .then((data) => setSermons(data.sermons || []))
      .catch(() => setSermons([]));
  }, []);

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
          {sermons === null &&
            [0, 1, 2].map((i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-md animate-pulse">
                <div className="aspect-video bg-gray-200" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-6 bg-gray-200 rounded" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                </div>
              </div>
            ))}
          {sermons?.map((sermon, index) => (
            <motion.div
              key={sermon.id}
              className="bg-white rounded-xl overflow-hidden shadow-md group hover:shadow-xl transition-shadow duration-300 hover:scale-[1.02] transition-transform"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {playingId === sermon.id ? (
                <div className="relative aspect-video bg-black">
                  <iframe
                    src={`${youTubeEmbedUrl(sermon.youtubeUrl)}&autoplay=1`}
                    title={sermon.title}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setPlayingId(sermon.id)}
                  className="relative block w-full aspect-video bg-gray-200 overflow-hidden"
                  aria-label={`Play sermon: ${sermon.title}`}
                >
                  <Image
                    src={sermon.image || youTubeThumbnailUrl(sermon.youtubeUrl)}
                    alt={sermon.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                    <span className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition-colors">
                      <Youtube className="text-4xl" />
                    </span>
                  </div>
                  {sermon.duration && (
                    <div className="absolute top-4 right-4 bg-white/90 text-red-600 text-xs font-semibold px-2 py-1 rounded">
                      {sermon.duration}
                    </div>
                  )}
                </button>
              )}
              
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                  <div className="flex items-center">
                    <Calendar className="mr-1" />
                    <span>{formatDate(sermon.date)}</span>
                  </div>
                  {sermon.duration && (
                    <div className="flex items-center">
                      <Clock className="mr-1" />
                      <span>{sermon.duration}</span>
                    </div>
                  )}
                </div>
                
                <h3 className="text-xl font-bold mb-2 line-clamp-2">{sermon.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{sermon.description}</p>
                <div className="text-sm font-medium text-gray-900 mb-4">Preacher: {sermon.preacher}</div>
                
                <div className="flex justify-center items-center pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setPlayingId(sermon.id)}
                    className="text-sm font-medium text-red-600 hover:text-red-700 flex items-center hover:scale-105 transition-transform duration-200"
                  >
                    <Youtube className="mr-1 text-base" /> Watch Sermon
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