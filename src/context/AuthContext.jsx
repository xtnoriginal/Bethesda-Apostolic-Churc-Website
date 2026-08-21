'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

const USERS_KEY = 'bac_auth_users';
const SESSION_KEY = 'bac_auth_session';
const progressKey = (email) => `bac_progress:${email}`;

function readJSON(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const session = readJSON(SESSION_KEY, null);
    setUser(session);
    setIsLoading(false);
  }, []);

  const signup = ({ name, email, password }) => {
    const users = readJSON(USERS_KEY, []);
    if (users.some((u) => u.email === email)) {
      throw new Error('An account with this email already exists.');
    }
    const newUser = { name, email, password };
    writeJSON(USERS_KEY, [...users, newUser]);
    const session = { name, email };
    writeJSON(SESSION_KEY, session);
    setUser(session);
    return session;
  };

  const login = ({ email, password }) => {
    const users = readJSON(USERS_KEY, []);
    const match = users.find((u) => u.email === email && u.password === password);
    if (!match) {
      throw new Error('Invalid email or password.');
    }
    const session = { name: match.name, email: match.email };
    writeJSON(SESSION_KEY, session);
    setUser(session);
    return session;
  };

  const logout = () => {
    window.localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  const updateProfile = ({ name }) => {
    if (!user) return;
    const users = readJSON(USERS_KEY, []);
    const nextUsers = users.map((u) => (u.email === user.email ? { ...u, name } : u));
    writeJSON(USERS_KEY, nextUsers);
    const session = { ...user, name };
    writeJSON(SESSION_KEY, session);
    setUser(session);
    return session;
  };

  const markLessonComplete = (courseSlug, lessonId) => {
    if (!user) return;
    const progress = readJSON(progressKey(user.email), {});
    const completed = new Set(progress[courseSlug] || []);
    completed.add(lessonId);
    const next = { ...progress, [courseSlug]: Array.from(completed) };
    writeJSON(progressKey(user.email), next);
  };

  const getProgress = (courseSlug) => {
    if (!user) return [];
    const progress = readJSON(progressKey(user.email), {});
    return progress[courseSlug] || [];
  };

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
