'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ministries } from '@/data/ministries';

export default function WingsSection() {
  return (
    <section className="section bg-gray-50">
      <div className="container mx-auto">
        <div className="section-title">
          <h2>Our Wings</h2>
          <p className="max-w-2xl mx-auto text-gray-600 mt-4">
            Bethesda Apostolic Church is served by several wings, each with its own focus
            within the life of the church.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {ministries.map((ministry, index) => (
            <motion.div
              key={ministry.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={ministry.href || `/ministries/${ministry.slug}`}
                className="card block group h-full"
              >
                <div className="relative w-full h-40">
                  <Image
                    src={ministry.image}
                    alt={ministry.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-1">{ministry.name}</h3>
                  <p className="text-gray-600 text-sm">{ministry.tagline}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
