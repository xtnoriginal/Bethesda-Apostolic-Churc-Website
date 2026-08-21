'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import { FaArrowLeft, FaBook, FaFilePdf, FaPlayCircle } from 'react-icons/fa';
import PlaceholderNote from '@/components/PlaceholderNote';

const typeIcons = {
  Sermon: FaPlayCircle,
  Article: FaBook,
  PDF: FaFilePdf,
};

export default function ArchiveDetailPage({ params }) {
  const { slug } = use(params);
  const [item, setItem] = useState(undefined);

  useEffect(() => {
    fetch(`/api/archives/${slug}`)
      .then((res) => (res.ok ? res.json() : Promise.resolve(null)))
      .then((data) => setItem(data?.item || null))
      .catch(() => setItem(null));
  }, [slug]);

  if (item === null) {
    notFound();
  }

  if (item === undefined) {
    return <div className="bg-white min-h-screen" />;
  }

  const Icon = typeIcons[item.type] || FaBook;

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto py-16 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/archives" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-8">
            <FaArrowLeft className="mr-2" />
            Back to Archives
          </Link>

          <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-xl mb-8">
            <Image src={item.image} alt={item.title} fill className="object-cover" />
          </div>

          <div className="flex items-center gap-2 text-blue-700 text-sm font-medium mb-3">
            <Icon /> <span>{item.type}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{item.title}</h1>
          <p className="text-sm text-gray-500 mb-8">
            {new Date(item.date).toLocaleDateString()}
          </p>

          {item.isDraft && (
            <PlaceholderNote text="Draft content — replace with the final sermon notes." className="mb-6" />
          )}

          {item.isDownloadPending ? (
            <div className="rounded-xl bg-gray-100 border border-dashed border-gray-300 p-8 text-center mb-6">
              <FaFilePdf className="mx-auto text-4xl text-gray-400 mb-2" />
              <p className="text-gray-500 font-medium">File coming soon</p>
            </div>
          ) : null}

          {item.body?.map((paragraph, i) => (
            <p key={i} className="text-gray-600 leading-relaxed mb-4">
              {paragraph}
            </p>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
