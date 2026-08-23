import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/requireAdmin';
import { serializeCourse } from '@/lib/serialize';

export async function PATCH(request, { params }) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: 'Not authorized.' }, { status: 403 });
  }

  const { id } = await params;
  const body = await request.json();
  const { slug, title, category, description, image } = body || {};

  const course = await prisma.course.update({
    where: { id },
    data: {
      ...(slug !== undefined && { slug }),
      ...(title !== undefined && { title }),
      ...(category !== undefined && { category }),
      ...(description !== undefined && { description }),
      ...(image !== undefined && { image }),
    },
    include: { lessons: true },
  });

  return NextResponse.json({ course: serializeCourse(course) });
}

export async function DELETE(request, { params }) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: 'Not authorized.' }, { status: 403 });
  }

  const { id } = await params;
  await prisma.course.delete({ where: { id } });

  return NextResponse.json({ ok: true });
}
