export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      crawlDelay: 30
    },
    sitemap: 'https://pokefolder.com/sitemap.xml'
  };
}
