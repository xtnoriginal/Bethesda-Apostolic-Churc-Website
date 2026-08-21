import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/requireAdmin';
import { serializeArchiveItem } from '@/lib/serialize';

export async function GET() {
  const items = await prisma.archiveItem.findMany({
    orderBy: { date: 'desc' },
  });
  return NextResponse.json({ items: items.map(serializeArchiveItem) });
}

export async function POST(request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: 'Not authorized.' }, { status: 403 });
  }

  const body = await request.json();
  const { slug, title, type, date, image, description, body: itemBody, isDraft, isDownloadPending } = body || {};
  if (!slug || !title || !type || !date || !image || !description) {
    return NextResponse.json({ error: 'slug, title, type, date, image, and description are required.' }, { status: 400 });
  }

  const existing = await prisma.archiveItem.findUnique({ where: { slug } });
  if (existing) {
    return NextResponse.json({ error: 'An archive item with this slug already exists.' }, { status: 409 });
  }

  const item = await prisma.archiveItem.create({
    data: {
      slug,
      title,
      type,
      date: new Date(date),
      image,
      description,
      body: itemBody ? JSON.stringify(itemBody) : null,
      isDraft: !!isDraft,
      isDownloadPending: !!isDownloadPending,
    },
  });

  return NextResponse.json({ item: serializeArchiveItem(item) }, { status: 201 });
}
