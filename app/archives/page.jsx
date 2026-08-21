'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaBook, FaPlayCircle, FaFilePdf } from 'react-icons/fa';

const typeIcons = {
  Sermon: FaPlayCircle,
  Article: FaBook,
  PDF: FaFilePdf,
};

const categories = ['All', 'Sermon', 'Article', 'PDF'];

function groupByYear(items) {
  return items.reduce((acc, item) => {
    const year = new Date(item.date).getFullYear();
    acc[year] = acc[year] || [];
    acc[year].push(item);
    return acc;
  }, {});
}

export default function ArchivesPage() {
  const [filter, setFilter] = useState('All');
  const [archiveItems, setArchiveItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/archives')
      .then((res) => res.json())
      .then((data) => setArchiveItems(data.items || []))
      .catch(() => setArchiveItems([]))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredItems = filter === 'All' ? archiveItems : archiveItems.filter((i) => i.type === filter);
  const archiveData = groupByYear(filteredItems);

  if (isLoading) {
    return <div className="bg-white min-h-screen" />;
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section (JW.org clean style) */}
      <header className="relative h-[300px] md:h-[400px] flex items-center justify-center text-center p-4 border-b border-gray-200">
        <Image
          src="/images/18.jpg"
          alt="Archives"
          fill
          className="object-cover z-0 opacity-80"
        />
        <div className="absolute inset-0 bg-black opacity-40 z-10"></div>

        <motion.div
          className="relative z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-semibold text-white tracking-wide">
            Archives
          </h1>
          <p className="text-lg md:text-xl text-white mt-3 max-w-2xl mx-auto">
            Browse sermons, articles, teachings, and ministry resources.
          </p>
        </motion.div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Filter Section */}
        <motion.div
          className="flex flex-wrap gap-3 justify-center mb-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all shadow-sm border ${
                filter === cat
                  ? 'bg-blue-700 text-white border-blue-700'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Year Sections */}
        <div className="space-y-20">
          {Object.keys(archiveData)
            .sort((a, b) => b - a)
            .map((year) => (
              <section key={year}>
                <motion.h2
                  className="text-3xl font-semibold text-gray-900 mb-8 border-b pb-3 border-gray-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  {year}
                </motion.h2>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
                  <AnimatePresence>
                    {archiveData[year].map((item, index) => {
                      const Icon = typeIcons[item.type] || FaBook;
                      return (
                        <motion.div
                          key={item.slug}
                          className="rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition overflow-hidden"
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <div className="relative h-52 bg-gray-50">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-cover"
                            />
                          </div>

                          <div className="p-6">
                            <div className="flex items-center gap-2 text-blue-700 text-sm font-medium mb-2">
                              <Icon /> <span>{item.type}</span>
                            </div>

                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              {item.title}
                            </h3>

                            <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                              {item.description}
                            </p>

                            <p className="text-xs text-gray-500 mb-4">
                              {new Date(item.date).toLocaleDateString()}
                            </p>

                            <Link
                              href={`/archives/${item.slug}`}
                              className="inline-block bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition text-sm"
                            >
                              View
                            </Link>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </section>
            ))}
        </div>
      </main>
    </div>
  );
}
