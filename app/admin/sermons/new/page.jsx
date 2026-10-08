'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AdminGuard from '../../AdminGuard';
import SermonForm from '../SermonForm';
import { ArrowLeft } from 'lucide-react';

function NewSermonContent() {
  const router = useRouter();

  const handleSubmit = async (payload) => {
    const res = await fetch('/api/sermons', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Could not create sermon.');
    router.push('/admin/sermons');
  };

  return (
    <div className="section bg-white min-h-screen">
      <div className="container mx-auto max-w-xl">
        <Link href="/admin/sermons" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-8">
          <ArrowLeft className="mr-2" />
          Back to Sermons
        </Link>

        <h1 className="text-3xl font-bold mb-8">New Sermon</h1>

        <SermonForm onSubmit={handleSubmit} submitLabel="Create Sermon" />
      </div>
    </div>
  );
}

export default function NewSermonPage() {
  return (
    <AdminGuard>
      <NewSermonContent />
    </AdminGuard>
  );
}
