import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { serializeArchiveItem } from '@/lib/serialize';

export async function GET(request, { params }) {
  const { slug } = await params;
  const item = await prisma.archiveItem.findUnique({ where: { slug } });

  if (!item) {
    return NextResponse.json({ error: 'Not found.' }, { status: 404 });
  }

  return NextResponse.json({ item: serializeArchiveItem(item) });
}
