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
  output: 'standalone',
  serverExternalPackages: ['sharp', 'onnxruntime-node'],
  productionBrowserSourceMaps: process.env.NODE_ENV === 'development',
};

module.exports = nextConfig;
