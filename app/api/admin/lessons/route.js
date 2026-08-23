import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/requireAdmin';
import { serializeLesson } from '@/lib/serialize';

export async function POST(request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: 'Not authorized.' }, { status: 403 });
  }

  const body = await request.json();
  const { courseId, lessonKey, title, type, duration, body: lessonBody, audioUrl, isDraft, isComingSoon, linkHref, linkLabel } = body || {};

  if (!courseId || !lessonKey || !title || !type) {
    return NextResponse.json({ error: 'courseId, lessonKey, title, and type are required.' }, { status: 400 });
  }

  const existingCount = await prisma.lesson.count({ where: { courseId } });

  const lesson = await prisma.lesson.create({
    data: {
      courseId,
      lessonKey,
      title,
      type,
      duration: duration || '',
      order: existingCount,
      body: lessonBody ? JSON.stringify(lessonBody) : null,
      audioUrl: audioUrl || null,
      isDraft: !!isDraft,
      isComingSoon: !!isComingSoon,
      linkHref: linkHref || null,
      linkLabel: linkLabel || null,
    },
  });

  return NextResponse.json({ lesson: serializeLesson(lesson) }, { status: 201 });
}
