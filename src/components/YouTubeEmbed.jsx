import { parseYouTubeUrl, youTubeEmbedUrl } from '@/lib/youtube';

// Responsive YouTube player. Regular videos fill the width at 16:9; Shorts
// are portrait, so they're capped in width and centred instead.
export default function YouTubeEmbed({ url, title, className = '' }) {
  const video = parseYouTubeUrl(url);
  if (!video) return null;

  return (
    <div className={`${video.isShort ? 'max-w-xs mx-auto' : 'w-full'} ${className}`}>
      <div
        className={`relative w-full overflow-hidden rounded-2xl shadow-xl bg-black ${
          video.isShort ? 'aspect-[9/16]' : 'aspect-video'
        }`}
      >
        <iframe
          src={youTubeEmbedUrl(url)}
          title={title || 'YouTube video'}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  );
}
