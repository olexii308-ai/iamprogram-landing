import type { MetadataRoute } from 'next';

function resolveSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || 'https://bravery.academy').replace(/\/$/, '');
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = resolveSiteUrl();
  const now = new Date();

  return [
    {
      url: `${siteUrl}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1
    },
    {
      url: `${siteUrl}/features/zero-knowledge`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9
    },
    {
      url: `${siteUrl}/features/ai-supervision`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9
    },
    {
      url: `${siteUrl}/for/private-psychologist`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85
    },
    {
      url: `${siteUrl}/compare/vs-simplepractice`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: `${siteUrl}/compare/vs-upheal`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5
    },
    {
      url: `${siteUrl}/terms`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5
    }
  ];
}
