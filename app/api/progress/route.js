import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Not authenticated.' }, { status: 401 });
  }

  const rows = await prisma.lessonProgress.findMany({
    where: { userId: session.user.id },
  });

  const progress = {};
  for (const row of rows) {
    if (!progress[row.courseSlug]) progress[row.courseSlug] = [];
    progress[row.courseSlug].push(row.lessonId);
  }

  return NextResponse.json({ progress });
}

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Not authenticated.' }, { status: 401 });
  }

  const body = await request.json();
  const { courseSlug, lessonId } = body || {};
  if (!courseSlug || !lessonId) {
    return NextResponse.json({ error: 'courseSlug and lessonId are required.' }, { status: 400 });
  }

  await prisma.lessonProgress.upsert({
    where: {
      userId_courseSlug_lessonId: {
        userId: session.user.id,
        courseSlug,
        lessonId,
      },
    },
    update: {},
    create: {
      userId: session.user.id,
      courseSlug,
      lessonId,
    },
  });

  return NextResponse.json({ ok: true });
}
