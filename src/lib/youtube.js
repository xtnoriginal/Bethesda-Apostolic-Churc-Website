// Parses the YouTube links admins paste into the sermon form and turns them
// into embed URLs. Shared by the API (validation), the admin form (preview)
// and the public sermon page (player), so all three agree on what's valid.

const HOSTS = new Set([
  'youtube.com',
  'www.youtube.com',
  'm.youtube.com',
  'music.youtube.com',
  'youtube-nocookie.com',
  'www.youtube-nocookie.com',
  'youtu.be',
]);

const VIDEO_ID = /^[A-Za-z0-9_-]{11}$/;

// '90', '90s', '1m30s', '1h2m3s' -> seconds
function parseStart(value) {
  if (!value) return 0;
  if (/^\d+$/.test(value)) return Number(value);
  const match = value.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/);
  if (!match) return 0;
  const [, h = 0, m = 0, s = 0] = match;
  return Number(h) * 3600 + Number(m) * 60 + Number(s);
}

/**
 * @returns {{ id: string, start: number, isShort: boolean } | null}
 *   null when the string isn't a link to a single YouTube video.
 */
export function parseYouTubeUrl(input) {
  if (!input || typeof input !== 'string') return null;
  let url;
  try {
    const trimmed = input.trim();
    url = new URL(/^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`);
  } catch {
    return null;
  }
  if (!HOSTS.has(url.hostname.toLowerCase())) return null;

  const segments = url.pathname.split('/').filter(Boolean);
  let id = null;
  let isShort = false;

  if (url.hostname.toLowerCase() === 'youtu.be') {
    id = segments[0];
  } else if (segments[0] === 'watch') {
    id = url.searchParams.get('v');
  } else if (['embed', 'live', 'shorts', 'v'].includes(segments[0])) {
    id = segments[1];
    isShort = segments[0] === 'shorts';
  }

  if (!id || !VIDEO_ID.test(id)) return null;
  const start = parseStart(url.searchParams.get('t') || url.searchParams.get('start'));
  return { id, start, isShort };
}

export function isYouTubeUrl(input) {
  return parseYouTubeUrl(input) !== null;
}

/** Privacy-enhanced embed URL, or null for an invalid link. */
export function youTubeEmbedUrl(input) {
  const video = parseYouTubeUrl(input);
  if (!video) return null;
  const params = new URLSearchParams({ rel: '0' });
  if (video.start) params.set('start', String(video.start));
  return `https://www.youtube-nocookie.com/embed/${video.id}?${params}`;
}

export const YOUTUBE_URL_ERROR =
  'Video must be a link to a single YouTube video, e.g. https://www.youtube.com/watch?v=… or https://youtu.be/…';

/** YouTube's own thumbnail, used when a sermon has no image. */
export function youTubeThumbnailUrl(input) {
  const video = parseYouTubeUrl(input);
  return video ? `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg` : null;
}
