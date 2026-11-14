import type { MetadataRoute } from 'next';
import { SITE } from '@/content/profile';
import { listed } from '@/lib/data';

export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE}/cv/`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    ...listed.map((p) => ({ url: `${SITE}/work/${p.slug}/`, lastModified: now, changeFrequency: 'monthly' as const, priority: p.kind === 'built' ? 0.8 : 0.6 })),
  ];
}
