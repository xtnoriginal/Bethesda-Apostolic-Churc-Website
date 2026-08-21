import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { requireAdmin } from '@/lib/requireAdmin';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

export async function POST(request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: 'Not authorized.' }, { status: 403 });
  }

  const formData = await request.formData();
  const file = formData.get('file');
  if (!file || typeof file === 'string') {
    return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
  }

  await mkdir(UPLOAD_DIR, { recursive: true });

  const originalName = file.name || 'upload';
  const safeName = originalName.replace(/[^a-zA-Z0-9._-]/g, '-');
  const filename = `${randomUUID()}-${safeName}`;
  const filePath = path.join(UPLOAD_DIR, filename);

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(filePath, buffer);

  return NextResponse.json({ url: `/uploads/${filename}` }, { status: 201 });
}
