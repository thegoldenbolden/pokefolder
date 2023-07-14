/** @type {import("next").NextConfig} */

const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === 'true'
});

const nextConfig = {
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    domains: ['images.pokemontcg.io']
  }
};

module.exports = withBundleAnalyzer(nextConfig)