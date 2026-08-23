'use client';

import { useState } from 'react';

export default function UploadField({ label, value, onChange, accept }) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Upload failed.');
      const data = await res.json();
      onChange(data.url);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <label className="form-label">{label}</label>
      <div className="flex items-center gap-3 mb-2">
        <input type="file" accept={accept} onChange={handleFileChange} className="text-sm" />
        {isUploading && <span className="text-sm text-gray-500">Uploading...</span>}
      </div>
      <input
        type="text"
        className="form-input"
        placeholder="Or paste a URL/path directly (e.g. /images/10.jpg)"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
    </div>
  );
}
