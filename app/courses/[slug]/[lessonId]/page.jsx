'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import { use, useState } from 'react';
import { useEffect } from 'react';
import { FaArrowLeft, FaArrowRight, FaCheckCircle, FaRegCircle } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';
import { getCourseBySlug } from '@/data/courses';
import LessonContent, { lessonTypeMeta } from '@/components/LessonContent';

export default function LessonPage({ params }) {
  const { slug, lessonId } = use(params);
  const router = useRouter();
  const { user, isLoading, markLessonComplete, getProgress } = useAuth();
  const [, forceRerender] = useState(0);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace(`/login?redirect=/courses/${slug}/${lessonId}`);
    }
  }, [isLoading, user, router, slug, lessonId]);

  const course = getCourseBySlug(slug);
  if (!course) {
    notFound();
  }

  const lessonIndex = course.lessons.findIndex((l) => l.id === lessonId);
  const lesson = course.lessons[lessonIndex];
  if (!lesson) {
    notFound();
  }

  if (isLoading || !user) {
    return <div className="section bg-white min-h-screen" />;
  }

  const completedLessons = getProgress(course.slug);
  const isComplete = completedLessons.includes(lesson.id);
  const prevLesson = course.lessons[lessonIndex - 1];
  const nextLesson = course.lessons[lessonIndex + 1];

  const TypeIcon = lessonTypeMeta[lesson.type]?.icon;
  const typeLabel = lessonTypeMeta[lesson.type]?.label || 'Text';

  const handleToggleComplete = () => {
    markLessonComplete(course.slug, lesson.id);
    forceRerender((n) => n + 1);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto py-16 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href={`/courses/${course.slug}`}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-8"
          >
            <FaArrowLeft className="mr-2" />
            Back to {course.title}
          </Link>

          <div className="flex items-center gap-3 mb-4">
            {TypeIcon && (
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                <TypeIcon />
              </div>
            )}
            <div className="text-sm text-gray-500">
              {typeLabel} &middot; {lesson.duration}
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-8">{lesson.title}</h1>

          <LessonContent lesson={lesson} />

          <button
            onClick={handleToggleComplete}
            disabled={isComplete}
            className={`btn mt-8 text-sm ${isComplete ? 'bg-green-100 text-green-700' : 'btn-secondary'}`}
          >
            {isComplete ? (
              <>
                <FaCheckCircle className="mr-2" />
                Completed
              </>
            ) : (
              <>
                <FaRegCircle className="mr-2" />
                Mark Complete
              </>
            )}
          </button>

          <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-100">
            {prevLesson ? (
              <Link
                href={`/courses/${course.slug}/${prevLesson.id}`}
                className="flex items-center text-gray-600 hover:text-blue-600 font-medium text-sm"
              >
                <FaArrowLeft className="mr-2" />
                {prevLesson.title}
              </Link>
            ) : (
              <span />
            )}
            {nextLesson ? (
              <Link
                href={`/courses/${course.slug}/${nextLesson.id}`}
                className="flex items-center text-gray-600 hover:text-blue-600 font-medium text-sm text-right"
              >
                {nextLesson.title}
                <FaArrowRight className="ml-2" />
              </Link>
            ) : (
              <span />
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
