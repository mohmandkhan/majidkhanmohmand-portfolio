'use client';

import Link from 'next/link';
import { useMemo, useRef, useState } from 'react';
import { DISTRICTS, KIND_LABEL, listed, type Product } from '@/lib/data';

// Two surveys of the same estate: a landscape sheet for wide screens and a portrait one for phones, where the landscape
// sheet would shrink its names to a few pixels. The island shapes are arbitrary; the sizes are not: area follows the count.
type Frame = {
  id: string; W: number; H: number; core: { x: number; y: number }; place: Record<string, { x: number; y: number }>;
  k: number; title: number; count: number; light: number; coreLabel: boolean;
};
const WIDE: Frame = {
  id: 'w', W: 1200, H: 800, core: { x: 610, y: 450 }, k: 1, title: 30, count: 13, light: 1, coreLabel: true,
  place: {
    StoresWiki: { x: 380, y: 460 }, CabsCloud: { x: 820, y: 430 }, AutoGineer: { x: 1070, y: 200 },
    'Code Engineers': { x: 190, y: 690 }, 'Market Studio': { x: 1075, y: 680 }, Media: { x: 160, y: 210 },
  },
};
const TALL: Frame = {
  id: 't', W: 600, H: 1050, core: { x: 212, y: 618 }, k: 0.72, title: 36, count: 19, light: 1.3, coreLabel: false,
  place: {
    Media: { x: 140, y: 160 }, AutoGineer: { x: 458, y: 150 }, StoresWiki: { x: 168, y: 445 },
    CabsCloud: { x: 404, y: 668 }, 'Code Engineers': { x: 122, y: 840 }, 'Market Studio': { x: 458, y: 966 },
  },
};

function rand(seed: number) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) / 2147483647);
}

/** A closed, gently irregular outline around a centre — the district's "land", and its contour lines. */
function blob(cx: number, cy: number, r: number, seed: number, k = 12) {
  const rnd = rand(seed);
  const pts = Array.from({ length: k }, (_, i) => {
    const a = (i / k) * Math.PI * 2;
    const rr = r * (0.9 + rnd() * 0.22);
    return [cx + Math.cos(a) * rr, cy + Math.sin(a) * rr * 0.86];
  });
  // Catmull-Rom through the points, as cubic Béziers
  let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < k; i++) {
    const p0 = pts[(i - 1 + k) % k], p1 = pts[i], p2 = pts[(i + 1) % k], p3 = pts[(i + 2) % k];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return d + 'Z';
}

type Light = { p: Product; x: number; y: number; r: number; district: number; i: number };

function Survey({ f, className }: { f: Frame; className: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState<Light | null>(null);
  const gid = (key: string) => `g-${f.id}-${key.replace(/\s/g, '')}`;

  const { districts, lights } = useMemo(() => {
    const ds = DISTRICTS.map((d, di) => {
      const items = listed.filter((p) => p.brand === d.key)
        .sort((a, b) => (a.kind === 'built' ? 0 : 1) - (b.kind === 'built' ? 0 : 1) || a.name.localeCompare(b.name));
      const R = (46 + Math.sqrt(items.length) * 30) * f.k;
      return { ...d, items, R, ...f.place[d.key], di };
    });
    const ls: Light[] = [];
    for (const d of ds) {
      const c = (d.R - 22 * f.k) / Math.sqrt(d.items.length + 0.5);
      d.items.forEach((p, i) => {
        const a = i * 2.39996; // the golden angle: even packing from the centre out
        const rr = c * Math.sqrt(i + 0.5);
        // rounded: the server's and the browser's floating point must agree to the last digit, or hydration fails
        ls.push({
          p, x: Math.round((d.x + Math.cos(a) * rr) * 10) / 10, y: Math.round((d.y + Math.sin(a) * rr * 0.86) * 10) / 10,
          r: Math.round((p.kind === 'built' ? 8.5 : 5.2) * f.light * 10) / 10, district: d.di, i,
        });
      });
    }
    return { districts: ds, lights: ls };
  }, [f]);

  const tipStyle = (() => {
    if (!on || !box.current) return undefined;
    const bw = box.current.clientWidth;
    const s = bw / f.W;
    const left = Math.min(Math.max(on.x * s, 110), bw - 110);
    return { left, top: on.y * s - on.r * s - 10 };
  })();

  return (
    <div ref={box} className={`relative w-full select-none ${className}`} role="group" aria-label="The estate: every product, platform and publication, by brand">
      <svg viewBox={`0 0 ${f.W} ${f.H}`} className="block h-auto w-full">
        <defs>
          {DISTRICTS.map((d) => (
            <radialGradient key={d.key} id={gid(d.key)}>
              <stop offset="0%" stopColor={d.color} stopOpacity="0.22" />
              <stop offset="70%" stopColor={d.color} stopOpacity="0.06" />
              <stop offset="100%" stopColor={d.color} stopOpacity="0" />
            </radialGradient>
          ))}
          <filter id={`glow-${f.id}`} x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* roads: every district runs on one shared platform */}
        {districts.map((d) => (
          <path key={`road-${d.key}`} d={`M${f.core.x},${f.core.y} Q${(f.core.x + d.x) / 2 + (d.y - f.core.y) * 0.18},${(f.core.y + d.y) / 2 - (d.x - f.core.x) * 0.18} ${d.x},${d.y}`}
            className="traffic" fill="none" stroke="var(--contour-2)" strokeWidth="1.4" strokeDasharray="2 7" strokeLinecap="round" />
        ))}

        {/* land and contours */}
        {districts.map((d) => (
          <g key={`land-${d.key}`}>
            <path d={blob(d.x, d.y, d.R + 18 * f.k, 11 + d.di * 7)} fill={`url(#${gid(d.key)})`} />
            <path d={blob(d.x, d.y, d.R + 18 * f.k, 11 + d.di * 7)} fill="none" stroke={d.color} strokeOpacity="0.35" strokeWidth="1.2" />
            <path d={blob(d.x, d.y, d.R * 0.72, 23 + d.di * 5)} fill="none" stroke={d.color} strokeOpacity="0.16" strokeWidth="1" />
            <path d={blob(d.x, d.y, d.R * 0.42, 37 + d.di * 3)} fill="none" stroke={d.color} strokeOpacity="0.1" strokeWidth="1" />
            <text x={d.x} y={d.y - d.R - f.title} textAnchor="middle" className="serif" fontSize={f.title} fontStyle="italic" fill="var(--chalk)">{d.label}</text>
            <text x={d.x} y={d.y - d.R - f.count * 0.75} textAnchor="middle" fontSize={f.count} fill="var(--haze)">
              {d.items.length} {d.items.length === 1 ? 'site' : 'products and sites'}
            </text>
          </g>
        ))}

        {/* the shared platform */}
        <g>
          <rect x={f.core.x - 9} y={f.core.y - 9} width="18" height="18" rx="3" fill="var(--night)" stroke="var(--chalk)" strokeWidth="1.6" transform={`rotate(45 ${f.core.x} ${f.core.y})`} />
          {f.coreLabel && <text x={f.core.x} y={f.core.y + 34} textAnchor="middle" fontSize="13" fill="var(--haze)">one shared platform</text>}
        </g>

        {/* the lights */}
        {lights.map((l) => {
          const color = DISTRICTS[l.district].color;
          return (
            <Link key={l.p.slug} href={`/work/${l.p.slug}/`} aria-label={`${l.p.name}: ${l.p.category}, ${KIND_LABEL[l.p.kind].toLowerCase()}`}
              onMouseEnter={() => setOn(l)} onMouseLeave={() => setOn(null)} onFocus={() => setOn(l)} onBlur={() => setOn(null)}>
              <circle cx={l.x} cy={l.y} r={l.r + 7} fill="transparent" />
              <circle className="light" cx={l.x} cy={l.y} r={l.r} fill={color} filter={l.p.kind === 'built' ? `url(#glow-${f.id})` : undefined}
                data-on={on?.p.slug === l.p.slug} stroke={l.p.kind === 'built' ? 'var(--chalk)' : 'none'} strokeWidth={l.p.kind === 'built' ? 1.4 : 0}
                style={{ ['--d' as string]: `${l.district * 170 + l.i * 22}ms` }} />
            </Link>
          );
        })}
      </svg>

      {on && tipStyle && (
        <div role="status" className="pointer-events-none absolute z-20 w-max max-w-[240px] -translate-x-1/2 -translate-y-full rounded-lg border border-contour-2 bg-ground px-3 py-2 text-[13.5px] leading-snug shadow-2xl"
          style={tipStyle}>
          <span className="block font-semibold text-chalk">{on.p.name}</span>
          <span className="block text-haze">{on.p.kind === 'built' ? 'Built in-house' : on.p.kind === 'media' ? 'Publication' : 'Operated'}: {on.p.category}</span>
        </div>
      )}
    </div>
  );
}

export function EstateMap() {
  return (
    <>
      <Survey f={WIDE} className="hidden md:block" />
      <Survey f={TALL} className="md:hidden" />
    </>
  );
}
