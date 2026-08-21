'use client';

import Link from 'next/link';
import { FaFileAlt, FaHeadphones, FaPlayCircle, FaVideo } from 'react-icons/fa';
import PlaceholderNote from './PlaceholderNote';

export const lessonTypeMeta = {
  text: { icon: FaFileAlt, label: 'Text' },
  audio: { icon: FaHeadphones, label: 'Audio' },
  video: { icon: FaVideo, label: 'Video' },
};

export default function LessonContent({ lesson }) {
  return (
    <div>
      {lesson.isDraft && (
        <PlaceholderNote text="Draft outline — replace with your finished teaching material." className="mb-6" />
      )}

      {lesson.type === 'audio' && lesson.audioUrl && (
        <audio controls className="w-full mb-6">
          <source src={lesson.audioUrl} type="audio/wav" />
        </audio>
      )}

      {lesson.type === 'video' && lesson.isComingSoon && (
        <div className="mb-6 rounded-xl bg-gray-100 border border-dashed border-gray-300 p-12 text-center">
          <FaPlayCircle className="mx-auto text-5xl text-gray-400 mb-3" />
          <p className="text-gray-500 font-medium">Video coming soon</p>
        </div>
      )}

      {lesson.body?.map((paragraph, i) => (
        <p key={i} className="text-gray-600 leading-relaxed mb-4 last:mb-0">
          {paragraph}
        </p>
      ))}

      {lesson.linkHref && (
        <Link
          href={lesson.linkHref}
          className="inline-block mt-2 text-blue-600 hover:text-blue-800 font-medium text-sm"
        >
          {lesson.linkLabel || 'Read more'} →
        </Link>
      )}
    </div>
  );
}
