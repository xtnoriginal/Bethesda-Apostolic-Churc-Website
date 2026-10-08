import { isYouTubeUrl, YOUTUBE_URL_ERROR } from './youtube';

// Validates and normalises an admin sermon payload. With `partial`, missing
// fields are left out (PATCH); otherwise the required ones must be present.
export function parseSermonInput(body, { partial = false } = {}) {
  const { title, preacher, date, duration, description, youtubeUrl, image } = body || {};
  const required = { title, preacher, date, description, youtubeUrl };

  if (!partial) {
    const missing = Object.entries(required).filter(([, v]) => !v).map(([k]) => k);
    if (missing.length) return { error: `${missing.join(', ')} required.` };
  }
  if (youtubeUrl !== undefined && !isYouTubeUrl(youtubeUrl)) {
    return { error: YOUTUBE_URL_ERROR };
  }
  if (date !== undefined && Number.isNaN(new Date(date).getTime())) {
    return { error: 'date is invalid.' };
  }

  const data = {
    ...(title !== undefined && { title: title.trim() }),
    ...(preacher !== undefined && { preacher: preacher.trim() }),
    ...(date !== undefined && { date: new Date(date) }),
    ...(duration !== undefined && { duration: duration.trim() || null }),
    ...(description !== undefined && { description: description.trim() }),
    ...(youtubeUrl !== undefined && { youtubeUrl: youtubeUrl.trim() }),
    ...(image !== undefined && { image: image.trim() || null }),
  };
  return { data };
}
