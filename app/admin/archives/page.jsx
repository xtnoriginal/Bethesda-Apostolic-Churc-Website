'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaArrowLeft, FaPlus, FaTrash } from 'react-icons/fa';
import AdminGuard from '../AdminGuard';

function ArchivesListContent() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadItems = () => {
    fetch('/api/archives')
      .then((res) => res.json())
      .then((data) => setItems(data.items || []))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleDelete = async (item) => {
    if (!window.confirm(`Delete "${item.title}"?`)) return;
    await fetch(`/api/admin/archives/${item.dbId}`, { method: 'DELETE' });
    loadItems();
  };

  if (isLoading) {
    return <div className="section bg-white min-h-screen" />;
  }

  return (
    <div className="section bg-white min-h-screen">
      <div className="container mx-auto max-w-3xl">
        <Link href="/admin" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-8">
          <FaArrowLeft className="mr-2" />
          Back to Admin
        </Link>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Archives</h1>
          <Link href="/admin/archives/new" className="btn btn-primary text-sm">
            <FaPlus className="mr-2" />
            New Item
          </Link>
        </div>

        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.dbId} className="card p-4 flex items-center justify-between">
              <div>
                <div className="font-semibold text-gray-900">{item.title}</div>
                <div className="text-sm text-gray-500">
                  {item.type} &middot; {item.slug} &middot; {item.date}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Link href={`/admin/archives/${item.dbId}`} className="text-blue-600 text-sm font-medium hover:text-blue-800">
                  Edit
                </Link>
                <button onClick={() => handleDelete(item)} className="text-red-600 hover:text-red-800" aria-label="Delete item">
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
          {items.length === 0 && <p className="text-gray-500">No archive items yet.</p>}
        </div>
      </div>
    </div>
  );
}

export default function AdminArchivesPage() {
  return (
    <AdminGuard>
      <ArchivesListContent />
    </AdminGuard>
  );
}
