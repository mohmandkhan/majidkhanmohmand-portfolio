import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import '@fontsource-variable/instrument-sans/wdth.css';
import '@fontsource/instrument-serif/400.css';
import '@fontsource/instrument-serif/400-italic.css';
import './globals.css';
import { Header } from '@/components/Chrome';
import { person, SITE } from '@/content/profile';

const description =
  'Majid Khan Mohmand: technical founder and senior full-stack and cloud engineer. Co-founder of StoresWiki LLC and founder of Code Engineers; 12+ years, 150+ projects, an estate of ~80 live AI products run with LLM agents under rigorous oversight.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: `${person.name}: technical founder, AI agents and cloud engineering`, template: `%s — ${person.name}` },
  description,
  applicationName: person.name,
  authors: [{ name: person.name, url: SITE }],
  creator: person.name,
  keywords: ['Majid Khan Mohmand', 'StoresWiki', 'Code Engineers', 'CabsCloud', 'AutoGineer', 'Market Studio', 'ChannelForge', 'ReelForge',
    'full-stack engineer', 'cloud architect', 'AI agents', 'LLM oversight', 'Claude Code', 'Next.js', 'AWS', 'Google Cloud', 'Italy'],
  alternates: { canonical: '/' },
  openGraph: { type: 'profile', url: SITE, siteName: person.name, title: `${person.name}: an estate of AI products, mapped`, description,
    firstName: 'Majid', lastName: 'Khan Mohmand', locale: 'en_GB' },
  twitter: { card: 'summary_large_image', creator: '@majidkhanmohman', title: `${person.name}: an estate of AI products, mapped`, description },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  icons: { icon: '/icon.svg' },
  other: { 'theme-color': '#0b1322' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [{ media: '(prefers-color-scheme: dark)', color: '#0b1322' }, { media: '(prefers-color-scheme: light)', color: '#0b1322' }],
};

// dark unless the visitor chose light here before: applied before the first paint, so no flash
const THEME = `try{var t=localStorage.getItem('theme');document.documentElement.dataset.theme=t==='light'?'light':'dark'}catch(e){document.documentElement.dataset.theme='dark'}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME }} />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="For language models" />
      </head>
      <body className="min-h-screen">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-50 focus:rounded focus:bg-chalk focus:px-3 focus:py-2 focus:text-night">Skip to the content</a>
        <Header />
        <main id="main">{children}</main>
        {/* The estate's Ecosystem waffle (cloud.autogineer.com): the script alone floats its launcher on the right edge.
            Never a [data-ecosystem-launcher] placeholder. CSP in vercel.json allows that origin. */}
        <Script src="https://cloud.autogineer.com/ecosystem.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
