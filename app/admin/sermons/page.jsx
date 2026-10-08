'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import AdminGuard from '../AdminGuard';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';

function SermonsListContent() {
  const [sermons, setSermons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadSermons = () => {
    fetch('/api/sermons')
      .then((res) => res.json())
      .then((data) => setSermons(data.sermons || []))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadSermons();
  }, []);

  const handleDelete = async (sermon) => {
    if (!window.confirm(`Delete "${sermon.title}"?`)) return;
    await fetch(`/api/admin/sermons/${sermon.id}`, { method: 'DELETE' });
    loadSermons();
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

        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold">Sermons</h1>
          <Link href="/admin/sermons/new" className="btn btn-primary text-sm">
            <Plus className="mr-2" />
            New Sermon
          </Link>
        </div>
        <p className="text-gray-600 text-sm mb-8">The three most recent sermons appear on the homepage.</p>

        <div className="space-y-3">
          {sermons.map((sermon, index) => (
            <div key={sermon.id} className="card p-4 flex items-center justify-between">
              <div>
                <div className="font-semibold text-gray-900">{sermon.title}</div>
                <div className="text-sm text-gray-500">
                  {sermon.preacher} &middot; {sermon.date}
                  {index < 3 && <span className="ml-2 text-red-600 font-medium">&middot; On homepage</span>}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Link href={`/admin/sermons/${sermon.id}`} className="text-blue-600 text-sm font-medium hover:text-blue-800">
                  Edit
                </Link>
                <button onClick={() => handleDelete(sermon)} className="text-red-600 hover:text-red-800" aria-label="Delete sermon">
                  <Trash2 />
                </button>
              </div>
            </div>
          ))}
          {sermons.length === 0 && <p className="text-gray-500">No sermons yet.</p>}
        </div>
      </div>
    </div>
  );
}

export default function AdminSermonsPage() {
  return (
    <AdminGuard>
      <SermonsListContent />
    </AdminGuard>
  );
}
