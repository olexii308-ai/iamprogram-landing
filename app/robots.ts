import type { MetadataRoute } from 'next';

function resolveSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || 'https://bravery.academy').replace(/\/$/, '');
}

export default function robots(): MetadataRoute.Robots {
  const siteUrl = resolveSiteUrl();

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/']
      }
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl
  };
}
