import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/requireAdmin';
import {
  createVideoUpload,
  isStorageConfigured,
  MAX_VIDEO_BYTES,
  VIDEO_TYPES,
} from '@/lib/storage';

// Issues a presigned URL; the file itself never passes through this server.
export async function POST(request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: 'Not authorized.' }, { status: 403 });
  }

  if (!isStorageConfigured()) {
    return NextResponse.json(
      { error: 'Video storage is not configured. Set the S3_* environment variables.' },
      { status: 503 }
    );
  }

  const { filename, contentType, size } = (await request.json()) || {};
  if (!VIDEO_TYPES.includes(contentType)) {
    return NextResponse.json({ error: 'Upload an MP4, WebM or MOV video.' }, { status: 400 });
  }
  if (!Number.isFinite(size) || size <= 0 || size > MAX_VIDEO_BYTES) {
    return NextResponse.json({ error: 'Video must be smaller than 5GB.' }, { status: 400 });
  }

  const upload = await createVideoUpload({ filename, contentType });
  return NextResponse.json(upload, { status: 201 });
}
