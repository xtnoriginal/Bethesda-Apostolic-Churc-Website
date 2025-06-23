/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com'],
  },
  // Use App Router
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['sharp', 'onnxruntime-node'],
  },
  // Configure page extensions
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'mdx'],
  // Enable static exports for static site generation
  output: 'standalone',
  // Webpack configuration
  webpack: (config, { isServer }) => {
    // Add support for .jsx imports
    config.resolve.extensions.push('.jsx');
    
    // Important: return the modified config
    return config;
  },
  // Enable source maps in development
  productionBrowserSourceMaps: process.env.NODE_ENV === 'development',
};

module.exports = nextConfig;
