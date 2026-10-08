import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/requireAdmin';
import { serializeArchiveItem } from '@/lib/serialize';
import { HOSTED_VIDEO_ERROR, isHostedVideoUrl } from '@/lib/storage';

export async function PATCH(request, { params }) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: 'Not authorized.' }, { status: 403 });
  }

  const { id } = await params;
  const body = await request.json();
  const { slug, title, type, date, image, description, body: itemBody, videoUrl, isDraft, isDownloadPending } = body || {};

  // An empty string removes the video; undefined leaves it untouched.
  if (videoUrl && !isHostedVideoUrl(videoUrl)) {
    return NextResponse.json({ error: HOSTED_VIDEO_ERROR }, { status: 400 });
  }

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
      ...(videoUrl !== undefined && { videoUrl: videoUrl ? videoUrl.trim() : null }),
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
