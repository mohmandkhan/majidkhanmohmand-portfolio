import type { MetadataRoute } from 'next';
import { SITE } from '@/content/profile';

// every crawler, search and AI alike, may read everything: the site exists to be found and quoted
export const dynamic = 'force-static';
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      ...['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'anthropic-ai', 'PerplexityBot', 'Google-Extended', 'Applebot-Extended', 'Bingbot', 'CCBot']
        .map((u) => ({ userAgent: u, allow: '/' })),
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
