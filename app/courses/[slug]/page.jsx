'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import { use, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';
import { getCourseBySlug } from '@/data/courses';
import { lessonTypeMeta } from '@/components/LessonContent';

export default function CourseDetailPage({ params }) {
  const { slug } = use(params);
  const router = useRouter();
  const { user, isLoading, getProgress } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace(`/login?redirect=/courses/${slug}`);
    }
  }, [isLoading, user, router, slug]);

  const course = getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  if (isLoading || !user) {
    return <div className="section bg-white min-h-screen" />;
  }

  const completedLessons = getProgress(course.slug);
  const progressPercent = Math.round((completedLessons.length / course.lessons.length) * 100);

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto py-16 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/courses" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-8">
            <FaArrowLeft className="mr-2" />
            Back to Courses
          </Link>

          <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-xl mb-8">
            <Image src={course.image} alt={course.title} fill className="object-cover" />
          </div>

          <div className="inline-block px-3 py-1 mb-4 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full">
            {course.category}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
          <p className="text-gray-600 mb-8">{course.description}</p>

          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="space-y-3">
            {course.lessons.map((lesson, index) => {
              const isComplete = completedLessons.includes(lesson.id);
              const TypeIcon = lessonTypeMeta[lesson.type]?.icon;
              const typeLabel = lessonTypeMeta[lesson.type]?.label || 'Text';

              return (
                <Link
                  key={lesson.id}
                  href={`/courses/${course.slug}/${lesson.id}`}
                  className="card p-4 flex items-center justify-between gap-4 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-semibold">
                      {isComplete ? <FaCheckCircle className="text-green-600" /> : index + 1}
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-gray-900 truncate">{lesson.title}</div>
                      <div className="text-xs text-gray-500">
                        {typeLabel} &middot; {lesson.duration}
                      </div>
                    </div>
                  </div>
                  <FaArrowRight className="flex-shrink-0 text-gray-300 group-hover:text-blue-600 transition-colors" />
                </Link>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
