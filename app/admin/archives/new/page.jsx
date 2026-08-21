'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';
import AdminGuard from '../../AdminGuard';
import ArchiveForm from '../ArchiveForm';

function NewArchiveContent() {
  const router = useRouter();

  const handleSubmit = async (payload) => {
    const res = await fetch('/api/archives', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Could not create item.');
    router.push('/admin/archives');
  };

  return (
    <div className="section bg-white min-h-screen">
      <div className="container mx-auto max-w-xl">
        <Link href="/admin/archives" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-8">
          <FaArrowLeft className="mr-2" />
          Back to Archives
        </Link>

        <h1 className="text-3xl font-bold mb-8">New Archive Item</h1>

        <ArchiveForm onSubmit={handleSubmit} submitLabel="Create Item" />
      </div>
    </div>
  );
}

export default function NewArchivePage() {
  return (
    <AdminGuard>
      <NewArchiveContent />
    </AdminGuard>
  );
}
