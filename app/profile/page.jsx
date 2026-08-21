'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoading, logout, updateProfile } = useAuth();
  const [name, setName] = useState('');
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/login?redirect=/profile');
    }
  }, [isLoading, user, router]);

  useEffect(() => {
    if (user) setName(user.name);
  }, [user]);

  if (isLoading || !user) {
    return <div className="section bg-white min-h-screen" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await updateProfile({ name });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="section bg-gray-50 min-h-screen">
      <div className="container mx-auto max-w-xl">
        <Link href="/dashboard" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-8">
          <FaArrowLeft className="mr-2" />
          Back to Dashboard
        </Link>

        <motion.div
          className="card p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-2">Your Profile</h1>
          <p className="text-gray-600 mb-8">Manage your account details.</p>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="form-label" htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                required
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="form-label" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                disabled
                className="form-input bg-gray-100 text-gray-500 cursor-not-allowed"
                value={user.email}
              />
              <p className="text-xs text-gray-500 mt-1">Email can't be changed yet.</p>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
              {saved && (
                <span className="flex items-center text-green-600 text-sm font-medium">
                  <FaCheckCircle className="mr-2" />
                  Saved
                </span>
              )}
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <button
              onClick={logout}
              className="text-red-600 hover:text-red-800 font-medium text-sm"
            >
              Log Out
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
