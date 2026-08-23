'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AdminGuard from '../../AdminGuard';
import UploadField from '../../UploadField';
import { ArrowLeft } from 'lucide-react';

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function NewCourseContent() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [slugTouched, setSlugTouched] = useState(false);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTitleChange = (value) => {
    setTitle(value);
    if (!slugTouched) setSlug(slugify(value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, slug, category, description, image }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not create course.');
      router.push(`/admin/courses/${data.course.dbId}`);
    } catch (err) {
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="section bg-white min-h-screen">
      <div className="container mx-auto max-w-xl">
        <Link href="/admin/courses" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-8">
          <ArrowLeft className="mr-2" />
          Back to Courses
        </Link>

        <h1 className="text-3xl font-bold mb-8">New Course</h1>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="form-label">Title</label>
            <input className="form-input" required value={title} onChange={(e) => handleTitleChange(e.target.value)} />
          </div>
          <div>
            <label className="form-label">Slug</label>
            <input
              className="form-input"
              required
              value={slug}
              onChange={(e) => {
                setSlug(e.target.value);
                setSlugTouched(true);
              }}
            />
          </div>
          <div>
            <label className="form-label">Category</label>
            <input className="form-input" required value={category} onChange={(e) => setCategory(e.target.value)} />
          </div>
          <div>
            <label className="form-label">Description</label>
            <textarea className="form-input" required rows="3" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <UploadField label="Cover Image" value={image} onChange={setImage} accept="image/*" />

          <button type="submit" disabled={isSubmitting} className="btn btn-primary disabled:opacity-60">
            {isSubmitting ? 'Creating...' : 'Create Course'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function NewCoursePage() {
  return (
    <AdminGuard>
      <NewCourseContent />
    </AdminGuard>
  );
}
