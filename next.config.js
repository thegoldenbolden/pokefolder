/** @type {import("next").NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  experimental: { appDir: true },
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    domains: ['images.pokemontcg.io']
  }
};

module.exports = nextConfig;
