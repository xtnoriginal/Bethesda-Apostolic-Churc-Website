'use client';

import Link from 'next/link';
import { use, useEffect, useState } from 'react';
import { FaArrowLeft, FaPlus, FaTrash } from 'react-icons/fa';
import AdminGuard from '../../AdminGuard';
import UploadField from '../../UploadField';

function LessonForm({ courseId, lesson, onSaved, onCancel }) {
  const isEdit = !!lesson;
  const [lessonKey, setLessonKey] = useState(lesson?.id || '');
  const [title, setTitle] = useState(lesson?.title || '');
  const [type, setType] = useState(lesson?.type || 'text');
  const [duration, setDuration] = useState(lesson?.duration || '');
  const [bodyText, setBodyText] = useState((lesson?.body || []).join('\n'));
  const [audioUrl, setAudioUrl] = useState(lesson?.audioUrl || '');
  const [isDraft, setIsDraft] = useState(!!lesson?.isDraft);
  const [isComingSoon, setIsComingSoon] = useState(!!lesson?.isComingSoon);
  const [linkHref, setLinkHref] = useState(lesson?.linkHref || '');
  const [linkLabel, setLinkLabel] = useState(lesson?.linkLabel || '');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const body = bodyText
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);

    const payload = {
      lessonKey,
      title,
      type,
      duration,
      body,
      audioUrl: type === 'audio' ? audioUrl : undefined,
      isDraft,
      isComingSoon: type === 'video' ? isComingSoon : false,
      linkHref: linkHref || undefined,
      linkLabel: linkLabel || undefined,
    };

    try {
      const url = isEdit ? `/api/admin/lessons/${lesson.dbId}` : '/api/admin/lessons';
      const method = isEdit ? 'PATCH' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(isEdit ? payload : { ...payload, courseId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not save lesson.');
      onSaved();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4 space-y-3 bg-gray-50">
      {error && <p className="text-red-600 text-xs">{error}</p>}

      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className="form-label">Lesson Key (used in the URL, e.g. l1)</label>
          <input className="form-input" required value={lessonKey} onChange={(e) => setLessonKey(e.target.value)} />
        </div>
        <div>
          <label className="form-label">Title</label>
          <input className="form-input" required value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label className="form-label">Type</label>
          <select className="form-input" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="text">Text</option>
            <option value="audio">Audio</option>
            <option value="video">Video</option>
          </select>
        </div>
        <div>
          <label className="form-label">Duration (e.g. &quot;4 min read&quot;)</label>
          <input className="form-input" value={duration} onChange={(e) => setDuration(e.target.value)} />
        </div>
      </div>

      <div>
        <label className="form-label">Body (one paragraph per line)</label>
        <textarea className="form-input" rows="4" value={bodyText} onChange={(e) => setBodyText(e.target.value)} />
      </div>

      {type === 'audio' && <UploadField label="Audio File" value={audioUrl} onChange={setAudioUrl} accept="audio/*" />}

      {type === 'video' && (
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" checked={isComingSoon} onChange={(e) => setIsComingSoon(e.target.checked)} />
          Show as &quot;coming soon&quot; (no video file yet)
        </label>
      )}

      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className="form-label">Link href (optional)</label>
          <input className="form-input" value={linkHref} onChange={(e) => setLinkHref(e.target.value)} />
        </div>
        <div>
          <label className="form-label">Link label (optional)</label>
          <input className="form-input" value={linkLabel} onChange={(e) => setLinkLabel(e.target.value)} />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input type="checkbox" checked={isDraft} onChange={(e) => setIsDraft(e.target.checked)} />
        Mark as draft (shows a placeholder note)
      </label>

      <div className="flex items-center gap-3 pt-2">
        <button type="submit" disabled={isSubmitting} className="btn btn-primary text-sm disabled:opacity-60">
          {isSubmitting ? 'Saving...' : 'Save Lesson'}
        </button>
        <button type="button" onClick={onCancel} className="text-gray-600 text-sm hover:text-gray-900">
          Cancel
        </button>
      </div>
    </form>
  );
}

function EditCourseContent({ id }) {
  const [course, setCourse] = useState(undefined);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState(false);
  const [editingLesson, setEditingLesson] = useState(undefined); // undefined = none open, null = new, object = editing existing

  const loadCourse = () => {
    fetch('/api/courses')
      .then((res) => res.json())
      .then((data) => {
        const found = (data.courses || []).find((c) => c.dbId === id);
        setCourse(found || null);
        if (found) {
          setTitle(found.title);
          setSlug(found.slug);
          setCategory(found.category);
          setDescription(found.description);
          setImage(found.image);
        }
      });
  };

  useEffect(() => {
    loadCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (course === undefined) {
    return <div className="section bg-white min-h-screen" />;
  }

  if (course === null) {
    return (
      <div className="section bg-white min-h-screen">
        <div className="container mx-auto max-w-xl text-center">
          <p className="text-gray-600 mb-4">Course not found.</p>
          <Link href="/admin/courses" className="text-blue-600 hover:text-blue-800">
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  const handleSaveCourse = async (e) => {
    e.preventDefault();
    setError('');
    setIsSaving(true);
    try {
      const res = await fetch(`/api/admin/courses/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, slug, category, description, image }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not save course.');
      setSavedMsg(true);
      setTimeout(() => setSavedMsg(false), 2000);
      loadCourse();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteLesson = async (lesson) => {
    if (!window.confirm(`Delete lesson "${lesson.title}"?`)) return;
    await fetch(`/api/admin/lessons/${lesson.dbId}`, { method: 'DELETE' });
    loadCourse();
  };

  return (
    <div className="section bg-white min-h-screen">
      <div className="container mx-auto max-w-3xl">
        <Link href="/admin/courses" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-8">
          <FaArrowLeft className="mr-2" />
          Back to Courses
        </Link>

        <h1 className="text-3xl font-bold mb-8">Edit Course</h1>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">{error}</div>
        )}

        <form onSubmit={handleSaveCourse} className="card p-6 space-y-4 mb-12">
          <div>
            <label className="form-label">Title</label>
            <input className="form-input" required value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <label className="form-label">Slug</label>
            <input className="form-input" required value={slug} onChange={(e) => setSlug(e.target.value)} />
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
          <div className="flex items-center gap-4">
            <button type="submit" disabled={isSaving} className="btn btn-primary text-sm disabled:opacity-60">
              {isSaving ? 'Saving...' : 'Save Course'}
            </button>
            {savedMsg && <span className="text-green-600 text-sm font-medium">Saved</span>}
          </div>
        </form>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Lessons</h2>
          {editingLesson === undefined && (
            <button onClick={() => setEditingLesson(null)} className="btn btn-secondary text-sm">
              <FaPlus className="mr-2" />
              Add Lesson
            </button>
          )}
        </div>

        <div className="space-y-3">
          {course.lessons.map((lesson) =>
            editingLesson?.dbId === lesson.dbId ? (
              <LessonForm
                key={lesson.dbId}
                courseId={id}
                lesson={lesson}
                onSaved={() => {
                  setEditingLesson(undefined);
                  loadCourse();
                }}
                onCancel={() => setEditingLesson(undefined)}
              />
            ) : (
              <div key={lesson.dbId} className="card p-4 flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">{lesson.title}</div>
                  <div className="text-xs text-gray-500">
                    {lesson.type} &middot; {lesson.id}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setEditingLesson(lesson)}
                    className="text-blue-600 text-sm font-medium hover:text-blue-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteLesson(lesson)}
                    className="text-red-600 hover:text-red-800"
                    aria-label="Delete lesson"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            )
          )}

          {editingLesson === null && (
            <LessonForm
              courseId={id}
              lesson={null}
              onSaved={() => {
                setEditingLesson(undefined);
                loadCourse();
              }}
              onCancel={() => setEditingLesson(undefined)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default function EditCoursePage({ params }) {
  const { id } = use(params);
  return (
    <AdminGuard>
      <EditCourseContent id={id} />
    </AdminGuard>
  );
}
