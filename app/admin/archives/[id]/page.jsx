'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import { FaArrowLeft, FaTrash } from 'react-icons/fa';
import AdminGuard from '../../AdminGuard';
import ArchiveForm from '../ArchiveForm';

function EditArchiveContent({ id }) {
  const router = useRouter();
  const [item, setItem] = useState(undefined);

  useEffect(() => {
    fetch('/api/archives')
      .then((res) => res.json())
      .then((data) => {
        const found = (data.items || []).find((i) => i.dbId === id);
        setItem(found || null);
      });
  }, [id]);

  if (item === undefined) {
    return <div className="section bg-white min-h-screen" />;
  }

  if (item === null) {
    return (
      <div className="section bg-white min-h-screen">
        <div className="container mx-auto max-w-xl text-center">
          <p className="text-gray-600 mb-4">Item not found.</p>
          <Link href="/admin/archives" className="text-blue-600 hover:text-blue-800">
            Back to Archives
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (payload) => {
    const res = await fetch(`/api/admin/archives/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Could not save item.');
    router.push('/admin/archives');
  };

  const handleDelete = async () => {
    if (!window.confirm(`Delete "${item.title}"?`)) return;
    await fetch(`/api/admin/archives/${id}`, { method: 'DELETE' });
    router.push('/admin/archives');
  };

  return (
    <div className="section bg-white min-h-screen">
      <div className="container mx-auto max-w-xl">
        <div className="flex items-center justify-between mb-8">
          <Link href="/admin/archives" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <FaArrowLeft className="mr-2" />
            Back to Archives
          </Link>
          <button onClick={handleDelete} className="flex items-center text-red-600 hover:text-red-800 text-sm font-medium">
            <FaTrash className="mr-2" />
            Delete
          </button>
        </div>

        <h1 className="text-3xl font-bold mb-8">Edit Archive Item</h1>

        <ArchiveForm initial={item} onSubmit={handleSubmit} submitLabel="Save Changes" />
      </div>
    </div>
  );
}

export default function EditArchivePage({ params }) {
  const { id } = use(params);
  return (
    <AdminGuard>
      <EditArchiveContent id={id} />
    </AdminGuard>
  );
}
