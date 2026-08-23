'use client';

import { useState } from 'react';
import UploadField from '../UploadField';

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export default function ArchiveForm({ initial, onSubmit, submitLabel }) {
  const [title, setTitle] = useState(initial?.title || '');
  const [slug, setSlug] = useState(initial?.slug || '');
  const [slugTouched, setSlugTouched] = useState(!!initial);
  const [type, setType] = useState(initial?.type || 'Sermon');
  const [date, setDate] = useState(initial?.date || new Date().toISOString().slice(0, 10));
  const [image, setImage] = useState(initial?.image || '');
  const [description, setDescription] = useState(initial?.description || '');
  const [bodyText, setBodyText] = useState((initial?.body || []).join('\n'));
  const [isDraft, setIsDraft] = useState(!!initial?.isDraft);
  const [isDownloadPending, setIsDownloadPending] = useState(!!initial?.isDownloadPending);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTitleChange = (value) => {
    setTitle(value);
    if (!slugTouched) setSlug(slugify(value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    const body = bodyText
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);

    try {
      await onSubmit({
        title,
        slug,
        type,
        date,
        image,
        description,
        body,
        isDraft,
        isDownloadPending,
      });
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
        <label className="form-label">Title</label>
        <input className="form-input" required value={title} onChange={(e) => handleTitleChange(e.target.value)} />
      </div>
      <div>
        <label className="form-label">Slug</label>
        <input
          className="form-input"
          required
          value={slug}
          onChange={(e) => {
            setSlug(e.target.value);
            setSlugTouched(true);
          }}
        />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="form-label">Type</label>
          <select className="form-input" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="Sermon">Sermon</option>
            <option value="Article">Article</option>
            <option value="PDF">PDF</option>
          </select>
        </div>
        <div>
          <label className="form-label">Date</label>
          <input type="date" className="form-input" required value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
      </div>
      <UploadField label="Image" value={image} onChange={setImage} accept="image/*" />
      <div>
        <label className="form-label">Short Description</label>
        <textarea className="form-input" required rows="2" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label className="form-label">Body (one paragraph per line)</label>
        <textarea className="form-input" rows="5" value={bodyText} onChange={(e) => setBodyText(e.target.value)} />
      </div>

      {type === 'PDF' && (
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" checked={isDownloadPending} onChange={(e) => setIsDownloadPending(e.target.checked)} />
          Show as &quot;file coming soon&quot; (no PDF uploaded yet)
        </label>
      )}
      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input type="checkbox" checked={isDraft} onChange={(e) => setIsDraft(e.target.checked)} />
        Mark as draft (shows a placeholder note)
      </label>

      <button type="submit" disabled={isSubmitting} className="btn btn-primary disabled:opacity-60">
        {isSubmitting ? 'Saving...' : submitLabel}
      </button>
    </form>
  );
}
