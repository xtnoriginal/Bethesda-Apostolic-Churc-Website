'use client';

import { useRef, useState } from 'react';
import VideoPlayer from '@/components/VideoPlayer';

const ACCEPT = 'video/mp4,video/webm,video/quicktime';

// Two steps: ask our API for a presigned URL, then PUT the file straight to
// the bucket. XMLHttpRequest rather than fetch because fetch can't report
// upload progress, and sermon-length files take a while.
function putWithProgress(url, file, onProgress, xhrRef) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhrRef.current = xhr;
    xhr.open('PUT', url);
    xhr.setRequestHeader('Content-Type', file.type);
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) onProgress(Math.round((e.loaded / e.total) * 100));
    };
    xhr.onload = () =>
      xhr.status >= 200 && xhr.status < 300
        ? resolve()
        : reject(new Error(`Upload failed (${xhr.status}).`));
    xhr.onerror = () =>
      reject(new Error('Upload failed. Check your connection and the bucket CORS settings.'));
    xhr.onabort = () => reject(new Error('Upload cancelled.'));
    xhr.send(file);
  });
}

export default function VideoUploadField({ label = 'Video', value, onChange, poster, onUploadingChange }) {
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState('');
  const xhrRef = useRef(null);
  const inputRef = useRef(null);

  const setUploading = (uploading) => {
    setProgress(uploading ? 0 : null);
    onUploadingChange?.(uploading);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError('');
    setUploading(true);
    try {
      const res = await fetch('/api/admin/upload/video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename: file.name, contentType: file.type, size: file.size }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not start upload.');
      await putWithProgress(data.uploadUrl, file, setProgress, xhrRef);
      onChange(data.url);
    } catch (err) {
      setError(err.message);
    } finally {
      xhrRef.current = null;
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const isUploading = progress !== null;

  return (
    <div>
      <label className="form-label">{label}</label>

      {value && !isUploading && (
        <div className="mb-3">
          <VideoPlayer src={value} poster={poster} />
          <button
            type="button"
            onClick={() => onChange('')}
            className="mt-2 text-sm text-red-600 hover:text-red-800 font-medium"
          >
            Remove video
          </button>
        </div>
      )}

      <div className="flex items-center gap-3">
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT}
          onChange={handleFileChange}
          disabled={isUploading}
          className="text-sm"
        />
        {isUploading && (
          <button
            type="button"
            onClick={() => xhrRef.current?.abort()}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Cancel
          </button>
        )}
      </div>

      {isUploading && (
        <div className="mt-2">
          <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
            <div className="h-full bg-blue-600 transition-all" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-xs text-gray-500 mt-1">Uploading… {progress}% — keep this page open.</p>
        </div>
      )}

      <p className="text-xs text-gray-500 mt-1">
        MP4 (H.264) plays everywhere, including iPhones. {value ? 'Choosing a new file replaces the current video.' : ''}
      </p>
      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
    </div>
  );
}
