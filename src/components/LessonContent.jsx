'use client';

import Link from 'next/link';
import PlaceholderNote from './PlaceholderNote';
import { FileText, Headphones, CirclePlay, Video, ArrowRight } from 'lucide-react';

export const lessonTypeMeta = {
  text: { icon: FileText, label: 'Text' },
  audio: { icon: Headphones, label: 'Audio' },
  video: { icon: Video, label: 'Video' },
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
          <CirclePlay className="mx-auto text-5xl text-gray-400 mb-3" />
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
          className="group/link inline-flex items-center gap-1 mt-2 text-blue-600 hover:text-blue-800 font-medium text-sm"
        >
          {lesson.linkLabel || 'Read more'}
          <ArrowRight
            className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      )}
    </div>
  );
}
