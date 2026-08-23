'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { use } from 'react';
import { getMinistryBySlug } from '@/data/ministries';
import PlaceholderNote from '@/components/PlaceholderNote';
import { ArrowLeft } from 'lucide-react';

export default function MinistryPage({ params }) {
  const { slug } = use(params);
  const ministry = getMinistryBySlug(slug);

  if (!ministry || ministry.href) {
    // ministries with a dedicated `href` (like Sunday School) have their own static page
    notFound();
  }

  return (
    <div className="bg-white min-h-screen">
      <header className="relative h-[320px] md:h-[400px] flex items-center justify-center text-center p-4">
        <Image
          src={ministry.image}
          alt={ministry.name}
          fill
          className="object-cover z-0"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-black/50 z-10" />
        <motion.div
          className="relative z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white">{ministry.name}</h1>
          <p className="text-lg text-white/90 mt-3 max-w-xl mx-auto">{ministry.tagline}</p>
        </motion.div>
      </header>

      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <Link href="/about" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-8">
          <ArrowLeft className="mr-2" />
          Back to About
        </Link>

        <PlaceholderNote text="This page is a placeholder — replace with real information about this wing." className="mb-6" />

        <p className="text-gray-600 leading-relaxed">
          More information about {ministry.name} — its purpose, activities, and how to get
          involved — will be added here.
        </p>
      </div>
    </div>
  );
}
