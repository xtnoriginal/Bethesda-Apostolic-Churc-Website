/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

  // Configure page extensions
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'mdx'],

  // Enable static exports for static site generation
  output: 'standalone',

  // Updated experimental option
  serverExternalPackages: ['sharp', 'onnxruntime-node'],

  // Webpack configuration
  webpack: (config) => {
    config.resolve.extensions.push('.jsx');
    return config;
  },

  // Enable source maps in development
  productionBrowserSourceMaps: process.env.NODE_ENV === 'development',
};

module.exports = nextConfig;