import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        crawlDelay: 30,
      },
    ],
    sitemap: "https://www.pokefolder.com/sitemap.xml",
  };
}
