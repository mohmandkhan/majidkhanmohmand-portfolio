'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

// dark by default; a visitor's choice is kept (the inline script in layout.tsx applies it before the first paint)
export function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  useEffect(() => setTheme((document.documentElement.dataset.theme as 'dark' | 'light') || 'dark'), []);
  const flip = () => {
    const t = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = t;
    try { localStorage.setItem('theme', t); } catch {}
    setTheme(t);
  };
  return (
    <button type="button" onClick={flip} aria-label={theme === 'dark' ? 'Use the light theme' : 'Use the dark theme'}
      className="grid h-9 w-9 place-items-center rounded-full border border-contour-2 text-chalk transition-colors hover:bg-raise">
      {theme === 'dark' ? (
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true"><circle cx="12" cy="12" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.8" />{[0, 45, 90, 135, 180, 225, 270, 315].map((a) => <line key={a} x1="12" y1="2.5" x2="12" y2="4.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" transform={`rotate(${a} 12 12)`} />)}</svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg>
      )}
    </button>
  );
}

const NAV = [
  { href: '/#estate', label: 'The estate' },
  { href: '/#built', label: 'Built' },
  { href: '/#studios', label: 'Studios' },
  { href: '/#oversight', label: 'Oversight' },
  { href: '/#career', label: 'Career' },
  { href: '/cv/', label: 'CV' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="no-print sticky top-0 z-40 border-b border-contour bg-night/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1240px] items-center gap-6 px-5 sm:px-8">
        <Link href="/" className="serif text-[22px] leading-none text-chalk" aria-label="Majid Khan Mohmand, home">Majid Khan Mohmand</Link>
        <nav aria-label="Sections" className="ml-auto hidden items-center gap-6 text-[15px] text-chalk-2 lg:flex">
          {NAV.map((n) => <Link key={n.href} href={n.href} className="hover:text-chalk">{n.label}</Link>)}
          <Link href="/#contact" className="rounded-full bg-chalk px-4 py-1.5 font-semibold text-night hover:opacity-90">Contact</Link>
        </nav>
        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <ThemeToggle />
          <button type="button" className="grid h-9 w-9 place-items-center rounded-full border border-contour-2 lg:hidden" aria-expanded={open} aria-controls="menu"
            aria-label={open ? 'Close the menu' : 'Open the menu'} onClick={() => setOpen(!open)}>
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true">{open ? <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /> : <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />}</svg>
          </button>
        </div>
      </div>
      {open && (
        <nav id="menu" aria-label="Sections" className="border-t border-contour px-5 py-4 lg:hidden">
          {[...NAV, { href: '/#contact', label: 'Contact' }].map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="block py-2.5 text-[17px] text-chalk">{n.label}</Link>
          ))}
        </nav>
      )}
    </header>
  );
}
