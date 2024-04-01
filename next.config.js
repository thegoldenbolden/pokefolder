/** @type {import("next").NextConfig} */
module.exports = {
  experimental: {
    ppr: true,
  },
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    domains: ["images.pokemontcg.io"],
  },
};
