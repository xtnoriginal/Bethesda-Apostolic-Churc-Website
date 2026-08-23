import type { MetadataRoute } from 'next';
import { siteName, siteDescription } from '@/lib/site';

// Replaces public/site.webmanifest, which was an empty `{}` that nothing
// linked to. Next serves this at /manifest.webmanifest and links it for us.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteName,
    short_name: 'Bethesda',
    description: siteDescription,
    start_url: '/',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#0033A0', // Bethesda Blue
    lang: 'en-ZW',
    categories: ['religion', 'lifestyle'],
    icons: [
      {
        src: '/logo.png',
        sizes: 'any',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
