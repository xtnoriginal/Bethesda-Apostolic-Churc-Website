'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaArrowLeft, FaFileAlt, FaGraduationCap, FaHeadphones, FaVideo } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';
import { courses } from '@/data/courses';

const categories = ['All', ...Array.from(new Set(courses.map((c) => c.category)))];

export default function CoursesPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/login?redirect=/courses');
    }
  }, [isLoading, user, router]);

  if (isLoading || !user) {
    return <div className="section bg-white min-h-screen" />;
  }

  const filteredCourses = filter === 'All' ? courses : courses.filter((c) => c.category === filter);

  return (
    <div className="bg-white min-h-screen">
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

          <div className="inline-block px-3 py-1 mb-4 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full mx-auto flex w-fit">
            Welcome, {user.name}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Teaching &amp; <span className="text-blue-600">Courses</span>
          </h1>
          <p className="max-w-2xl mx-auto text-center text-gray-600 mb-12">
            Grow in your faith with our library of teaching series and courses.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course, index) => {
            const hasAudio = course.lessons.some((l) => l.type === 'audio');
            const hasVideo = course.lessons.some((l) => l.type === 'video');
            return (
            <motion.div
              key={course.slug}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/courses/${course.slug}`} className="card block group h-full">
                <div className="relative w-full h-48">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="inline-block px-3 py-1 mb-3 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full">
                    {course.category}
                  </div>
                  <h3 className="font-bold text-xl mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <FaGraduationCap className="mr-2" />
                      {course.lessons.length} lessons
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <FaFileAlt title="Includes text" />
                      {hasAudio && <FaHeadphones title="Includes audio" />}
                      {hasVideo && <FaVideo title="Includes video" />}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
