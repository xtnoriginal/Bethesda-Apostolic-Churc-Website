import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/requireAdmin';
import { serializeSermon } from '@/lib/serialize';
import { parseSermonInput } from '@/lib/sermonInput';

export async function PATCH(request, { params }) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: 'Not authorized.' }, { status: 403 });
  }

  const { id } = await params;
  const { data, error } = parseSermonInput(await request.json(), { partial: true });
  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  const sermon = await prisma.sermon.update({ where: { id }, data });
  return NextResponse.json({ sermon: serializeSermon(sermon) });
}

export async function DELETE(request, { params }) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: 'Not authorized.' }, { status: 403 });
  }

  const { id } = await params;
  await prisma.sermon.delete({ where: { id } });

  return NextResponse.json({ ok: true });
}
