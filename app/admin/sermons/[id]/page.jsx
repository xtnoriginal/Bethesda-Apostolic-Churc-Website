'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import AdminGuard from '../../AdminGuard';
import SermonForm from '../SermonForm';
import { ArrowLeft, Trash2 } from 'lucide-react';

function EditSermonContent({ id }) {
  const router = useRouter();
  const [sermon, setSermon] = useState(undefined);

  useEffect(() => {
    fetch('/api/sermons')
      .then((res) => res.json())
      .then((data) => setSermon((data.sermons || []).find((s) => s.id === id) || null));
  }, [id]);

  if (sermon === undefined) {
    return <div className="section bg-white min-h-screen" />;
  }

  if (sermon === null) {
    return (
      <div className="section bg-white min-h-screen">
        <div className="container mx-auto max-w-xl text-center">
          <p className="text-gray-600 mb-4">Sermon not found.</p>
          <Link href="/admin/sermons" className="text-blue-600 hover:text-blue-800">
            Back to Sermons
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (payload) => {
    const res = await fetch(`/api/admin/sermons/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Could not save sermon.');
    router.push('/admin/sermons');
  };

  const handleDelete = async () => {
    if (!window.confirm(`Delete "${sermon.title}"?`)) return;
    await fetch(`/api/admin/sermons/${id}`, { method: 'DELETE' });
    router.push('/admin/sermons');
  };

  return (
    <div className="section bg-white min-h-screen">
      <div className="container mx-auto max-w-xl">
        <div className="flex items-center justify-between mb-8">
          <Link href="/admin/sermons" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <ArrowLeft className="mr-2" />
            Back to Sermons
          </Link>
          <button onClick={handleDelete} className="flex items-center text-red-600 hover:text-red-800 text-sm font-medium">
            <Trash2 className="mr-2" />
            Delete
          </button>
        </div>

        <h1 className="text-3xl font-bold mb-8">Edit Sermon</h1>

        <SermonForm initial={sermon} onSubmit={handleSubmit} submitLabel="Save Changes" />
      </div>
    </div>
  );
}

export default function EditSermonPage({ params }) {
  const { id } = use(params);
  return (
    <AdminGuard>
      <EditSermonContent id={id} />
    </AdminGuard>
  );
}
