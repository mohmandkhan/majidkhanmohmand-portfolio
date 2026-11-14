'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { CATEGORY_ORDER, districtColor, listed, type Kind, type Product } from '@/lib/data';

export function Shot({ p, className = '' }: { p: Product; className?: string }) {
  if (p.shot)
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={p.shot} alt={`${p.name}: its home page`} width={1200} height={750} loading="lazy" decoding="async"
      className={`block aspect-[16/10] w-full rounded-md object-cover object-top ring-1 ring-contour ${className}`} />;
  // no honest photograph of its home page (demo data, an empty catalogue, an error): drawn as a plan instead, on the
  // district's own colour
  const c = districtColor(p.brand);
  const grid = Array.from({ length: 23 }, (_, i) => (i + 1) * 50);
  return (
    <svg viewBox="0 0 1200 750" className={`block aspect-[16/10] h-auto w-full rounded-md ring-1 ring-contour ${className}`} role="img"
      aria-label={`${p.name}, drawn as a plan`}>
      <rect width="1200" height="750" style={{ fill: `color-mix(in oklab, ${c} 13%, var(--ground))` }} />
      <g stroke={c} strokeOpacity="0.14" strokeWidth="1">
        {grid.map((g) => <line key={`v${g}`} x1={g} x2={g} y1="0" y2="750" />)}
        {grid.filter((g) => g < 750).map((g) => <line key={`h${g}`} x1="0" x2="1200" y1={g} y2={g} />)}
      </g>
      <g fill="none" stroke={c} strokeOpacity="0.7" strokeWidth="2.5">
        <rect x="150" y="100" width="900" height="550" rx="16" style={{ fill: 'var(--night)', fillOpacity: 0.55 }} />
        <line x1="150" y1="152" x2="1050" y2="152" />
        {[184, 208, 232].map((x) => <circle key={x} cx={x} cy="126" r="7" />)}
        {[760, 830, 900].map((x) => <line key={x} x1={x} x2={x + 46} y1="126" y2="126" strokeLinecap="round" />)}
        <rect x="960" y="113" width="62" height="26" rx="13" />
        <line x1="210" x2="760" y1="350" y2="350" strokeLinecap="round" strokeOpacity="0.45" strokeWidth="12" />
        <line x1="210" x2="620" y1="384" y2="384" strokeLinecap="round" strokeOpacity="0.45" strokeWidth="12" />
        <rect x="210" y="424" width="170" height="48" rx="24" />
        {[210, 490, 770].map((x) => <rect key={x} x={x} y="520" width="250" height="90" rx="10" />)}
      </g>
      <text x="210" y="296" className="serif" fontSize="76" fill="var(--chalk)">{p.name}</text>
    </svg>
  );
}

export function Parcel({ p }: { p: Product }) {
  return (
    <Link href={`/work/${p.slug}/`} className="group block rounded-lg p-2 -m-2 transition-colors hover:bg-raise">
      <Shot p={p} />
      <div className="mt-3 flex items-start gap-2.5">
        <span className="mt-[6px] h-2 w-2 shrink-0 rounded-full sm:mt-[8px]" style={{ background: districtColor(p.brand) }} aria-hidden="true" />
        <div className="min-w-0">
          <p className="text-[15px] font-semibold leading-snug text-chalk group-hover:underline group-hover:underline-offset-4 sm:text-[17px]">{p.name}</p>
          <p className="mt-0.5 line-clamp-2 text-[13px] leading-snug text-haze sm:text-[14.5px]">{p.summary}</p>
          <p className="mt-1 truncate text-[11.5px] text-mist sm:text-[12.5px]">{p.host}</p>
        </div>
      </div>
    </Link>
  );
}

/** Every operated platform and publication, by what it is for; filter by purpose or search by name. */
export function ProductIndex({ kinds }: { kinds: Kind[] }) {
  const [cat, setCat] = useState<string>('all');
  const [q, setQ] = useState('');
  const base = useMemo(() => listed.filter((p) => kinds.includes(p.kind)), [kinds]);
  const cats = CATEGORY_ORDER.filter((c) => base.some((p) => p.category === c));
  const shown = base.filter((p) => (cat === 'all' || p.category === cat) && (!q.trim() || `${p.name} ${p.summary} ${p.host} ${p.category}`.toLowerCase().includes(q.trim().toLowerCase())));
  return (
    <div>
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div role="group" aria-label="Purpose" className="flex flex-wrap gap-2">
          {['all', ...cats].map((c) => (
            <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)}
              className={`rounded-full border px-3.5 py-1.5 text-[14px] transition-colors ${cat === c ? 'border-chalk bg-chalk text-night' : 'border-contour-2 text-chalk-2 hover:border-haze'}`}>
              {c === 'all' ? `Everything (${base.length})` : c}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 rounded-full border border-contour-2 px-3.5 py-1.5 focus-within:border-chalk md:ml-auto md:w-64">
          <span className="sr-only">Search</span>
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-haze" aria-hidden="true"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" /><path d="m20 20-3.6-3.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          <input value={q} onChange={(e) => setQ(e.target.value)} type="search" placeholder="Search by name"
            className="min-w-0 flex-1 bg-transparent text-[14.5px] outline-none placeholder:text-mist" />
        </label>
      </div>
      {shown.length ? (
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-7 sm:gap-y-10 lg:grid-cols-3">
          {shown.map((p) => <Parcel key={p.slug} p={p} />)}
        </div>
      ) : (
        <p className="mt-8 text-haze">Nothing matches “{q}”. <button className="underline underline-offset-4" onClick={() => { setQ(''); setCat('all'); }}>Show everything</button></p>
      )}
    </div>
  );
}
