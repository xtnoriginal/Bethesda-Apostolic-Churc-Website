import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/requireAdmin';
import { serializeSermon } from '@/lib/serialize';
import { parseSermonInput } from '@/lib/sermonInput';

// Public list, newest first. ?limit=3 for the homepage.
export async function GET(request) {
  const limit = Number(new URL(request.url).searchParams.get('limit')) || undefined;
  const sermons = await prisma.sermon.findMany({
    orderBy: { date: 'desc' },
    ...(limit && { take: Math.min(limit, 100) }),
  });
  return NextResponse.json({ sermons: sermons.map(serializeSermon) });
}

export async function POST(request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: 'Not authorized.' }, { status: 403 });
  }

  const { data, error } = parseSermonInput(await request.json());
  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  const sermon = await prisma.sermon.create({ data });
  return NextResponse.json({ sermon: serializeSermon(sermon) }, { status: 201 });
}
