'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import {
  FaArrowLeft,
  FaCheckCircle,
  FaChevronDown,
  FaFileAlt,
  FaHeadphones,
  FaPlayCircle,
  FaRegCircle,
  FaVideo,
} from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';
import { getCourseBySlug } from '@/data/courses';
import PlaceholderNote from '@/components/PlaceholderNote';

const typeMeta = {
  text: { icon: FaFileAlt, label: 'Text' },
  audio: { icon: FaHeadphones, label: 'Audio' },
  video: { icon: FaVideo, label: 'Video' },
};

function LessonBody({ lesson }) {
  return (
    <div className="pt-4 border-t border-gray-100">
      {lesson.isDraft && (
        <PlaceholderNote text="Draft outline — replace with your finished teaching material." className="mb-4" />
      )}

      {lesson.type === 'audio' && lesson.audioUrl && (
        <audio controls className="w-full mb-4">
          <source src={lesson.audioUrl} type="audio/wav" />
        </audio>
      )}

      {lesson.type === 'video' && lesson.isComingSoon && (
        <div className="mb-4 rounded-xl bg-gray-100 border border-dashed border-gray-300 p-8 text-center">
          <FaPlayCircle className="mx-auto text-4xl text-gray-400 mb-2" />
          <p className="text-gray-500 font-medium">Video coming soon</p>
        </div>
      )}

      {lesson.body?.map((paragraph, i) => (
        <p key={i} className="text-gray-600 leading-relaxed mb-3 last:mb-0">
          {paragraph}
        </p>
      ))}

      {lesson.linkHref && (
        <Link
          href={lesson.linkHref}
          className="inline-block mt-2 text-blue-600 hover:text-blue-800 font-medium text-sm"
        >
          {lesson.linkLabel || 'Read more'} →
        </Link>
      )}
    </div>
  );
}

export default function CourseDetailPage({ params }) {
  const { slug } = use(params);
  const router = useRouter();
  const { user, isLoading, markLessonComplete, getProgress } = useAuth();
  const [, forceRerender] = useState(0);
  const [openLessonId, setOpenLessonId] = useState(null);

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

  const handleToggleComplete = (lessonId) => {
    markLessonComplete(course.slug, lessonId);
    forceRerender((n) => n + 1);
  };

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
            {course.lessons.map((lesson) => {
              const isComplete = completedLessons.includes(lesson.id);
              const isOpen = openLessonId === lesson.id;
              const TypeIcon = typeMeta[lesson.type]?.icon || FaFileAlt;
              const typeLabel = typeMeta[lesson.type]?.label || 'Text';

              return (
                <div key={lesson.id} className="card p-4">
                  <button
                    className="w-full flex items-center justify-between gap-4 text-left"
                    onClick={() => setOpenLessonId(isOpen ? null : lesson.id)}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex-shrink-0 w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                        <TypeIcon />
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium text-gray-900 truncate">{lesson.title}</div>
                        <div className="text-xs text-gray-500">
                          {typeLabel} &middot; {lesson.duration}
                        </div>
                      </div>
                    </div>
                    <FaChevronDown
                      className={`flex-shrink-0 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {isOpen && (
                    <>
                      <LessonBody lesson={lesson} />
                      <button
                        onClick={() => handleToggleComplete(lesson.id)}
                        disabled={isComplete}
                        className={`btn mt-4 text-sm ${isComplete ? 'bg-green-100 text-green-700' : 'btn-secondary'}`}
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
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
