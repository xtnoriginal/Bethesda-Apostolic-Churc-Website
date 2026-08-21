'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FaArrowRight, FaUserCircle } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';
import { courses } from '@/data/courses';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoading, getProgress } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/login?redirect=/dashboard');
    }
  }, [isLoading, user, router]);

  if (isLoading || !user) {
    return <div className="section bg-white min-h-screen" />;
  }

  const coursesWithProgress = courses.map((course) => {
    const completed = getProgress(course.slug);
    const percent = Math.round((completed.length / course.lessons.length) * 100);
    return { ...course, completedCount: completed.length, percent };
  });

  const startedCourses = coursesWithProgress.filter((c) => c.completedCount > 0);
  const notStartedCourses = coursesWithProgress.filter((c) => c.completedCount === 0);
  const totalLessonsCompleted = coursesWithProgress.reduce((sum, c) => sum + c.completedCount, 0);

  return (
    <div className="section bg-gray-50 min-h-screen">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10 gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Welcome back, <span className="text-blue-600">{user.name.split(' ')[0]}</span>
              </h1>
              <p className="text-gray-600">Here's where you left off.</p>
            </div>
            <Link
              href="/profile"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              <FaUserCircle className="text-xl" />
              View Profile
            </Link>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <div className="card p-6 text-center">
              <div className="text-3xl font-bold text-blue-600">{startedCourses.length}</div>
              <div className="text-sm text-gray-600 mt-1">Courses in progress</div>
            </div>
            <div className="card p-6 text-center">
              <div className="text-3xl font-bold text-blue-600">
                {coursesWithProgress.filter((c) => c.percent === 100).length}
              </div>
              <div className="text-sm text-gray-600 mt-1">Courses completed</div>
            </div>
            <div className="card p-6 text-center">
              <div className="text-3xl font-bold text-blue-600">{totalLessonsCompleted}</div>
              <div className="text-sm text-gray-600 mt-1">Lessons completed</div>
            </div>
          </div>
        </motion.div>

        {startedCourses.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Continue Learning</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {startedCourses.map((course) => (
                <Link key={course.slug} href={`/courses/${course.slug}`} className="card block group">
                  <div className="relative w-full h-36">
                    <Image src={course.image} alt={course.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold mb-2">{course.title}</h3>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mb-2">
                      <div className="h-full bg-blue-600" style={{ width: `${course.percent}%` }} />
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{course.percent}% complete</span>
                      <FaArrowRight className="text-blue-600" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {notStartedCourses.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">
              {startedCourses.length > 0 ? 'More Courses' : 'Get Started'}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {notStartedCourses.map((course) => (
                <Link key={course.slug} href={`/courses/${course.slug}`} className="card block group">
                  <div className="relative w-full h-36">
                    <Image src={course.image} alt={course.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold mb-2">{course.title}</h3>
                    <span className="text-blue-600 text-sm font-medium inline-flex items-center">
                      Start course <FaArrowRight className="ml-2" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
