import { events } from '@/data/events';
import { buildCalendar } from '@/lib/ical';
import { absoluteUrl } from '@/lib/site';

// Prerendered at build time like robots.txt and sitemap.xml. The URL doubles
// as a subscription feed: calendar apps that subscribe to it pick up new
// events after the next deploy.
export const dynamic = 'force-static';

export function GET() {
  return new Response(buildCalendar(events, { url: absoluteUrl('/events') }), {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'attachment; filename="bethesda-events.ics"',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
