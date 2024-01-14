/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    domains: ['images.pokemontcg.io'],
  },
};

module.exports = nextConfig;
