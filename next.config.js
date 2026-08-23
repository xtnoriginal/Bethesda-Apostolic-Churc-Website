/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'mdx'],

  // Deliberately no `output: 'standalone'`. Vercel runs its own output
  // tracing and reads .next/next-server.js.nft.json; standalone writes its
  // traces under .next/standalone and never emits that file, so the deploy
  // dies with ENOENT on it. It also breaks `next start` locally. Set it only
  // for a self-hosted container build.

  serverExternalPackages: ['sharp', 'onnxruntime-node'],
  productionBrowserSourceMaps: process.env.NODE_ENV === 'development',
};

module.exports = nextConfig;
