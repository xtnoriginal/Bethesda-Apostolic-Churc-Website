import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/requireAdmin';
import { serializeLesson } from '@/lib/serialize';
import { HOSTED_VIDEO_ERROR, isHostedVideoUrl } from '@/lib/storage';

export async function PATCH(request, { params }) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: 'Not authorized.' }, { status: 403 });
  }

  const { id } = await params;
  const body = await request.json();
  const { lessonKey, title, type, duration, body: lessonBody, audioUrl, videoUrl, isDraft, isComingSoon, linkHref, linkLabel } = body || {};

  if (videoUrl && !isHostedVideoUrl(videoUrl)) {
    return NextResponse.json({ error: HOSTED_VIDEO_ERROR }, { status: 400 });
  }

  const lesson = await prisma.lesson.update({
    where: { id },
    data: {
      ...(lessonKey !== undefined && { lessonKey }),
      ...(title !== undefined && { title }),
      ...(type !== undefined && { type }),
      ...(duration !== undefined && { duration }),
      ...(lessonBody !== undefined && { body: lessonBody ? JSON.stringify(lessonBody) : null }),
      ...(audioUrl !== undefined && { audioUrl: audioUrl || null }),
      ...(videoUrl !== undefined && { videoUrl: videoUrl || null }),
      ...(isDraft !== undefined && { isDraft: !!isDraft }),
      ...(isComingSoon !== undefined && { isComingSoon: !!isComingSoon }),
      ...(linkHref !== undefined && { linkHref: linkHref || null }),
      ...(linkLabel !== undefined && { linkLabel: linkLabel || null }),
    },
  });

  return NextResponse.json({ lesson: serializeLesson(lesson) });
}

export async function DELETE(request, { params }) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: 'Not authorized.' }, { status: 403 });
  }

  const { id } = await params;
  await prisma.lesson.delete({ where: { id } });

  return NextResponse.json({ ok: true });
}
