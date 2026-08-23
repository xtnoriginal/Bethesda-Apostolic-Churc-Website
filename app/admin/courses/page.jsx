'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import AdminGuard from '../AdminGuard';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';

function CoursesListContent() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadCourses = () => {
    fetch('/api/courses')
      .then((res) => res.json())
      .then((data) => setCourses(data.courses || []))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleDelete = async (course) => {
    if (!window.confirm(`Delete "${course.title}"? This also deletes all its lessons.`)) return;
    await fetch(`/api/admin/courses/${course.dbId}`, { method: 'DELETE' });
    loadCourses();
  };

  if (isLoading) {
    return <div className="section bg-white min-h-screen" />;
  }

  return (
    <div className="section bg-white min-h-screen">
      <div className="container mx-auto max-w-3xl">
        <Link href="/admin" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-8">
          <ArrowLeft className="mr-2" />
          Back to Admin
        </Link>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Courses</h1>
          <Link href="/admin/courses/new" className="btn btn-primary text-sm">
            <Plus className="mr-2" />
            New Course
          </Link>
        </div>

        <div className="space-y-3">
          {courses.map((course) => (
            <div key={course.dbId} className="card p-4 flex items-center justify-between">
              <div>
                <div className="font-semibold text-gray-900">{course.title}</div>
                <div className="text-sm text-gray-500">
                  {course.slug} &middot; {course.lessons.length} lessons
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Link href={`/admin/courses/${course.dbId}`} className="text-blue-600 text-sm font-medium hover:text-blue-800">
                  Edit
                </Link>
                <button onClick={() => handleDelete(course)} className="text-red-600 hover:text-red-800" aria-label="Delete course">
                  <Trash2 />
                </button>
              </div>
            </div>
          ))}
          {courses.length === 0 && <p className="text-gray-500">No courses yet.</p>}
        </div>
      </div>
    </div>
  );
}

export default function AdminCoursesPage() {
  return (
    <AdminGuard>
      <CoursesListContent />
    </AdminGuard>
  );
}
