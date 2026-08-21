import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/requireAdmin';
import { serializeCourse } from '@/lib/serialize';

export async function GET() {
  const courses = await prisma.course.findMany({
    include: { lessons: true },
    orderBy: { createdAt: 'asc' },
  });
  return NextResponse.json({ courses: courses.map(serializeCourse) });
}

export async function POST(request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: 'Not authorized.' }, { status: 403 });
  }

  const body = await request.json();
  const { slug, title, category, description, image } = body || {};
  if (!slug || !title || !category || !description || !image) {
    return NextResponse.json({ error: 'slug, title, category, description, and image are required.' }, { status: 400 });
  }

  const existing = await prisma.course.findUnique({ where: { slug } });
  if (existing) {
    return NextResponse.json({ error: 'A course with this slug already exists.' }, { status: 409 });
  }

  const course = await prisma.course.create({
    data: { slug, title, category, description, image },
    include: { lessons: true },
  });

  return NextResponse.json({ course: serializeCourse(course) }, { status: 201 });
}
