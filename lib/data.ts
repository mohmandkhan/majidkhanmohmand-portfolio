import productsJson from '@/content/products.json';
import networkJson from '@/content/network.json';

export type Kind = 'built' | 'operated' | 'media' | 'venture';
export type Product = {
  slug: string; name: string; host: string; url: string; brand: string; kind: Kind; category: string;
  summary: string; description: string; steps: string[]; benefits: string[]; stack: string[];
  launcher: { group: string; emoji: string; color: string } | null; shot: string | null; phone?: string | null;
};

export const products = productsJson as Product[];
export const listed = products.filter((p) => p.kind !== 'venture');
export const bySlug = (s: string) => products.find((p) => p.slug === s);

export const KIND_LABEL: Record<Kind, string> = {
  built: 'Designed and built in-house',
  operated: 'Deployed and operated',
  media: 'Publication',
  venture: 'Studio',
};

// the districts: the brands of StoresWiki LLC, each with its own colour (checked for colour-blind separation)
export const DISTRICTS = [
  { key: 'StoresWiki', color: 'var(--d-storeswiki)', label: 'StoresWiki' },
  { key: 'CabsCloud', color: 'var(--d-cabscloud)', label: 'CabsCloud' },
  { key: 'AutoGineer', color: 'var(--d-autogineer)', label: 'AutoGineer' },
  { key: 'Code Engineers', color: 'var(--d-codeengineers)', label: 'Code Engineers' },
  { key: 'Market Studio', color: 'var(--d-marketstudio)', label: 'Market Studio' },
  { key: 'Media', color: 'var(--d-media)', label: 'Publications' },
] as const;
export const districtColor = (brand: string) => DISTRICTS.find((d) => d.key === brand)?.color ?? 'var(--d-media)';

export const CATEGORY_ORDER = [
  'AI agents & automation', 'Content & video', 'Marketing & SEO', 'Messaging, CRM & social', 'Commerce',
  'Cloud & hosting', 'Productivity & business', 'Learning', 'Developer & internal platforms', 'Media & publishing',
];

export function counts() {
  const k = (x: Kind) => listed.filter((p) => p.kind === x).length;
  return { built: k('built'), operated: k('operated'), media: k('media'), all: listed.length };
}

const fmt = new Intl.NumberFormat('en-GB');
export const n = (x: number) => fmt.format(x);
export function words(x: number): string {
  if (x >= 1e6) return `${(x / 1e6).toFixed(1).replace(/\.0$/, '')} million`;
  return fmt.format(x);
}

// the channels network as it was at build time (content/network.json, from channels.storeswiki.com/data/network.json);
// the page reads the live one again in the browser
export type NetChannel = { id: string; name: string; system: string; project: string; audience: number; views: number; avatar?: string;
  platforms: Record<string, { followers: number | null; views: number | null; url: string } | undefined> };
export type Network = { generated: string; totals: { channels: number; making: number; audience: number; views: number;
  by_platform: Record<string, { channels: number; followers: number; views: number }> }; channels: NetChannel[] };
export const network = networkJson as unknown as Network;
