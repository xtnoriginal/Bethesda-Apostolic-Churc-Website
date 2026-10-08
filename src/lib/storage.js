// Video storage on an S3-compatible bucket (Cloudflare R2 or AWS S3).
//
// Videos are too big to pass through the Next.js server (Vercel caps request
// bodies at ~4.5MB), so the admin's browser uploads straight to the bucket
// using a short-lived presigned PUT URL issued by /api/admin/upload/video.
// The bucket then serves the file publicly from S3_PUBLIC_URL.
//
// Required env vars (see .env.example):
//   S3_ENDPOINT           R2: https://<account-id>.r2.cloudflarestorage.com
//                         AWS: leave unset
//   S3_REGION             R2: auto        AWS: e.g. eu-west-1
//   S3_BUCKET
//   S3_ACCESS_KEY_ID
//   S3_SECRET_ACCESS_KEY
//   S3_PUBLIC_URL         public origin the bucket is served from, e.g.
//                         https://videos.example.org or https://pub-xxxx.r2.dev
//
// The bucket's CORS policy must allow PUT with a Content-Type header from the
// site's origin, or the browser upload is blocked.

import { randomUUID } from 'crypto';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export const VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/quicktime'];
// A single presigned PUT is limited to 5GB by S3/R2.
export const MAX_VIDEO_BYTES = 5 * 1024 * 1024 * 1024;
const UPLOAD_URL_TTL_SECONDS = 60 * 60;

const publicUrl = () => (process.env.S3_PUBLIC_URL || '').replace(/\/$/, '');

export function isStorageConfigured() {
  return Boolean(
    process.env.S3_BUCKET &&
      process.env.S3_ACCESS_KEY_ID &&
      process.env.S3_SECRET_ACCESS_KEY &&
      publicUrl()
  );
}

let client;
function s3() {
  client ??= new S3Client({
    region: process.env.S3_REGION || 'auto',
    endpoint: process.env.S3_ENDPOINT || undefined,
    // R2 serves the S3 API path-style (endpoint/bucket/key).
    forcePathStyle: Boolean(process.env.S3_ENDPOINT),
    // Newer SDKs sign a CRC32 checksum into PUT URLs by default, which a
    // browser upload can't supply, so R2/S3 would reject the request.
    requestChecksumCalculation: 'WHEN_REQUIRED',
    responseChecksumValidation: 'WHEN_REQUIRED',
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });
  return client;
}

/** Presigned PUT for one video. The browser must send the same Content-Type. */
export async function createVideoUpload({ filename, contentType }) {
  const safeName = (filename || 'video').replace(/[^a-zA-Z0-9._-]/g, '-').slice(-100);
  const key = `videos/${randomUUID()}-${safeName}`;
  const uploadUrl = await getSignedUrl(
    s3(),
    new PutObjectCommand({ Bucket: process.env.S3_BUCKET, Key: key, ContentType: contentType }),
    { expiresIn: UPLOAD_URL_TTL_SECONDS }
  );
  return { uploadUrl, url: `${publicUrl()}/${key}` };
}

/** True for a URL that points at a video in our own bucket. */
export function isHostedVideoUrl(url) {
  const base = publicUrl();
  return typeof url === 'string' && !!base && url.startsWith(`${base}/videos/`);
}

export const HOSTED_VIDEO_ERROR = 'Video must be uploaded through the video upload field.';
