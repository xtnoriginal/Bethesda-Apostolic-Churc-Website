'use client';

import Link from 'next/link';
import AdminGuard from './AdminGuard';
import { ArrowLeft, BookOpen, GraduationCap } from 'lucide-react';

export default function AdminPage() {
  return (
    <AdminGuard>
      <div className="section bg-gray-50 min-h-screen">
        <div className="container mx-auto max-w-3xl">
          <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-8">
            <ArrowLeft className="mr-2" />
            Back to Site
          </Link>

          <h1 className="text-3xl font-bold mb-2">Admin Portal</h1>
          <p className="text-gray-600 mb-10">Manage courses, lessons, and archive content.</p>

          <div className="grid sm:grid-cols-2 gap-6">
            <Link href="/admin/courses" className="card p-8 block hover:shadow-lg transition-shadow">
              <GraduationCap className="text-3xl text-blue-600 mb-4" />
              <h2 className="text-xl font-bold mb-1">Courses</h2>
              <p className="text-gray-600 text-sm">Create and edit courses and their lessons.</p>
            </Link>
            <Link href="/admin/archives" className="card p-8 block hover:shadow-lg transition-shadow">
              <BookOpen className="text-3xl text-blue-600 mb-4" />
              <h2 className="text-xl font-bold mb-1">Archives</h2>
              <p className="text-gray-600 text-sm">Create and edit sermons, articles, and PDFs.</p>
            </Link>
          </div>
        </div>
      </div>
    </AdminGuard>
  );
}
