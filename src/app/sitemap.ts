import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.pokefolder.com',
      lastModified: new Date(),
    },
    {
      url: 'https://www.pokefolder.com/search',
      lastModified: new Date(),
    },
    {
      url: 'https://www.pokefolder.com/sets',
      lastModified: new Date(),
    },
  ];
}
