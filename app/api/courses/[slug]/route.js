import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { serializeCourse } from '@/lib/serialize';

export async function GET(request, { params }) {
  const { slug } = await params;
  const course = await prisma.course.findUnique({
    where: { slug },
    include: { lessons: true },
  });

  if (!course) {
    return NextResponse.json({ error: 'Course not found.' }, { status: 404 });
  }

  return NextResponse.json({ course: serializeCourse(course) });
}
