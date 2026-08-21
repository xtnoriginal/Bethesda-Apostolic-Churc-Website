import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/requireAdmin';
import { serializeArchiveItem } from '@/lib/serialize';

export async function PATCH(request, { params }) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: 'Not authorized.' }, { status: 403 });
  }

  const { id } = await params;
  const body = await request.json();
  const { slug, title, type, date, image, description, body: itemBody, isDraft, isDownloadPending } = body || {};

  const item = await prisma.archiveItem.update({
    where: { id },
    data: {
      ...(slug !== undefined && { slug }),
      ...(title !== undefined && { title }),
      ...(type !== undefined && { type }),
      ...(date !== undefined && { date: new Date(date) }),
      ...(image !== undefined && { image }),
      ...(description !== undefined && { description }),
      ...(itemBody !== undefined && { body: itemBody ? JSON.stringify(itemBody) : null }),
      ...(isDraft !== undefined && { isDraft: !!isDraft }),
      ...(isDownloadPending !== undefined && { isDownloadPending: !!isDownloadPending }),
    },
  });

  return NextResponse.json({ item: serializeArchiveItem(item) });
}

export async function DELETE(request, { params }) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: 'Not authorized.' }, { status: 403 });
  }

  const { id } = await params;
  await prisma.archiveItem.delete({ where: { id } });

  return NextResponse.json({ ok: true });
}
