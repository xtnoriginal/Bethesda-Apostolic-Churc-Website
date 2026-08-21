'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { data: session, status, update } = useSession();
  const [progress, setProgress] = useState({});

  const user = session?.user ? { name: session.user.name, email: session.user.email } : null;
  const isLoading = status === 'loading';

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/progress')
        .then((res) => (res.ok ? res.json() : { progress: {} }))
        .then((data) => setProgress(data.progress || {}))
        .catch(() => setProgress({}));
    } else if (status === 'unauthenticated') {
      setProgress({});
    }
  }, [status]);

  const signup = async ({ name, email, password }) => {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || 'Something went wrong signing up.');
    }
    const result = await signIn('credentials', { redirect: false, email, password });
    if (result?.error) {
      throw new Error('Account created, but automatic login failed. Please log in.');
    }
  };

  const login = async ({ email, password }) => {
    const result = await signIn('credentials', { redirect: false, email, password });
    if (result?.error) {
      throw new Error('Invalid email or password.');
    }
  };

  const logout = () => {
    signOut({ redirect: false });
  };

  const updateProfile = async ({ name }) => {
    const res = await fetch('/api/profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || 'Could not update profile.');
    }
    await update({ name });
  };

  const markLessonComplete = (courseSlug, lessonId) => {
    setProgress((prev) => {
      const existing = prev[courseSlug] || [];
      if (existing.includes(lessonId)) return prev;
      return { ...prev, [courseSlug]: [...existing, lessonId] };
    });

    fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ courseSlug, lessonId }),
    }).catch(() => {});
  };

  const getProgress = (courseSlug) => progress[courseSlug] || [];

  return (
    <AuthContext.Provider
      value={{ user, isLoading, signup, login, logout, updateProfile, markLessonComplete, getProgress }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
