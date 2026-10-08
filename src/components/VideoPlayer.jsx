// Player for videos hosted in our own bucket (archives and course lessons).
// playsInline keeps iOS from forcing fullscreen; preload="metadata" fetches
// only enough to show duration until the viewer presses play.
export default function VideoPlayer({ src, poster, title, className = '' }) {
  if (!src) return null;
  return (
    <div className={`w-full overflow-hidden rounded-2xl shadow-xl bg-black ${className}`}>
      <video
        src={src}
        poster={poster || undefined}
        controls
        playsInline
        preload="metadata"
        controlsList="nodownload"
        aria-label={title || 'Video'}
        className="block w-full aspect-video bg-black"
      />
    </div>
  );
}
