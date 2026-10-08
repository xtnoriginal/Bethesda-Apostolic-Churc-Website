'use client';

import { useState } from 'react';
import UploadField from '../UploadField';
import YouTubeEmbed from '@/components/YouTubeEmbed';
import { isYouTubeUrl, YOUTUBE_URL_ERROR } from '@/lib/youtube';

export default function SermonForm({ initial, onSubmit, submitLabel }) {
  const [title, setTitle] = useState(initial?.title || '');
  const [preacher, setPreacher] = useState(initial?.preacher || '');
  const [date, setDate] = useState(initial?.date || new Date().toISOString().slice(0, 10));
  const [duration, setDuration] = useState(initial?.duration || '');
  const [youtubeUrl, setYoutubeUrl] = useState(initial?.youtubeUrl || '');
  const [description, setDescription] = useState(initial?.description || '');
  const [image, setImage] = useState(initial?.image || '');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValidLink = isYouTubeUrl(youtubeUrl);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!isValidLink) {
      setError(YOUTUBE_URL_ERROR);
      return;
    }
    setIsSubmitting(true);
    try {
      await onSubmit({ title, preacher, date, duration, youtubeUrl, description, image });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">{error}</div>
      )}

      <div>
        <label className="form-label" htmlFor="youtubeUrl">YouTube Link</label>
        <input
          id="youtubeUrl"
          type="url"
          className="form-input"
          required
          placeholder="https://www.youtube.com/watch?v=..."
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
        />
        <p className="text-xs text-gray-500 mt-1">Watch, youtu.be, live or Shorts links all work.</p>
        {youtubeUrl.trim() &&
          (isValidLink ? (
            <YouTubeEmbed url={youtubeUrl} title={title} className="mt-3" />
          ) : (
            <p className="text-xs text-red-600 mt-1">{YOUTUBE_URL_ERROR}</p>
          ))}
      </div>
      <div>
        <label className="form-label">Title</label>
        <input className="form-input" required value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label className="form-label">Preacher</label>
        <input className="form-input" required value={preacher} onChange={(e) => setPreacher(e.target.value)} />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="form-label">Date</label>
          <input type="date" className="form-input" required value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          <label className="form-label">Duration (optional, e.g. 46:11)</label>
          <input className="form-input" value={duration} onChange={(e) => setDuration(e.target.value)} />
        </div>
      </div>
      <div>
        <label className="form-label">Short Description</label>
        <textarea className="form-input" required rows="2" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <UploadField label="Thumbnail (optional — defaults to the YouTube thumbnail)" value={image} onChange={setImage} accept="image/*" />

      <button type="submit" disabled={isSubmitting} className="btn btn-primary disabled:opacity-60">
        {isSubmitting ? 'Saving...' : submitLabel}
      </button>
    </form>
  );
}
