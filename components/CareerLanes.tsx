import { experience } from '@/content/profile';
import { Plot } from './Plot';

// Twelve years at a glance: one lane per engagement on a shared time axis, so the overlaps show — the consultancy and the
// government programme, Sweden and the Gulf, the newsroom and the company. Each lane opens its entry below.
const BUILT = new Date();
const NOW = BUILT.getUTCFullYear() + BUILT.getUTCMonth() / 12 + 0.04;
const A0 = 2011.6, A1 = 2027.1;
const t = (s: string) => {
  if (s === 'present') return NOW;
  const [y, m] = s.split('-').map(Number);
  return y + ((m || 1) - 1) / 12;
};
const f = (v: number) => (v - A0) / (A1 - A0);
const pc = (v: number) => `${(f(v) * 100).toFixed(3)}%`;
const SHORT: Record<string, string> = {
  'National Incubation Center, Government of Pakistan': 'National Incubation Center',
  'Nordic Software Technologies / QURB Services': 'QURB Services',
  'Nordic Software Technologies FZE': 'Nordic Software Technologies',
};
const PLACE: Record<string, string> = { PK: 'Pakistan', SE: 'Sweden', AE: 'UAE', US: 'USA' };
const STUDY = [
  { at: 2012.5, name: 'BSc (Hons) Computer Science', where: 'Peshawar' },
  { at: 2021.5, name: 'MSc Software Engineering', where: 'Sweden' },
];

export const jobId = (org: string, from: string) => `job-${org.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${from.slice(0, 4)}`;

type Lane = { key: string; name: string; where: string; a: number; b: number; href?: string; now?: boolean; study?: boolean; aria: string };

export function CareerLanes() {
  const lanes: Lane[] = [
    ...[...experience].sort((x, y) => t(x.from) - t(y.from)).map((j) => ({
      key: j.org + j.from, name: SHORT[j.org] ?? j.org, where: PLACE[j.country.find((c) => PLACE[c]) ?? ''] ?? '',
      a: t(j.from), b: t(j.to), href: `#${jobId(j.org, j.from)}`, now: j.to === 'present',
      aria: `${j.org}, ${j.from.slice(0, 4)} to ${j.to === 'present' ? 'now' : j.to.slice(0, 4)}`,
    })),
    ...STUDY.map((s) => ({ key: s.name, name: s.name, where: s.where, a: s.at, b: s.at, study: true, aria: `${s.name}, ${s.where}, ${Math.floor(s.at)}` })),
  ];
  const years = Array.from({ length: 2027 - 2012 }, (_, i) => 2012 + i);
  return (
    <Plot className="relative">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {years.map((y) => (
          <span key={y} className="absolute top-0 bottom-7 border-l border-contour" style={{ left: pc(y) }}>
            {y % 2 === 1 && <span className="num absolute -bottom-7 -translate-x-1/2 text-[12px] text-mist">{y}</span>}
          </span>
        ))}
        <span className="absolute top-0 bottom-7 border-l border-dashed border-haze" style={{ left: pc(NOW) }}>
          <span className="absolute -top-0.5 right-1.5 text-[12px] leading-none text-haze">now</span>
        </span>
      </div>
      <ol className="relative pb-10 pt-6">
        {lanes.map((l, i) => {
          // the name sits after a bar that ends early, before one that ends late (desktop); above it on a phone
          const after = f(l.b) < 0.56;
          const label = (
            <span className="whitespace-nowrap text-[13.5px] leading-none">
              <span className={l.study ? 'text-chalk-2' : 'font-semibold text-chalk'}>{l.name}</span>
              {l.where && <span className="text-haze">, {l.where}</span>}
            </span>
          );
          const body = (
            <>
              <span className="plot-fade block pb-1.5 pt-2 md:hidden" style={{ ['--i' as string]: i + 2 }}>{label}</span>
              <span className="relative block h-3 md:h-8">
                <span className="absolute inset-y-0 flex items-center" style={{ left: pc(l.a), width: l.study ? 0 : `calc(${pc(l.b)} - ${pc(l.a)})` }}>
                  {l.study
                    ? <span className="plot-fade block h-2.5 w-2.5 shrink-0 -translate-x-1/2 rotate-45 border border-chalk bg-night" style={{ ['--i' as string]: i }} />
                    : <span className={`plot-grow block h-2.5 w-full rounded-[3px] ${l.now ? 'bg-d-storeswiki' : 'bg-chalk-2/75 group-hover:bg-chalk'}`} style={{ ['--i' as string]: i }} />}
                  <span className={`plot-fade absolute top-1/2 hidden -translate-y-1/2 md:block ${after ? 'left-[calc(100%+12px)]' : 'right-[calc(100%+12px)]'}`} style={{ ['--i' as string]: i + 2 }}>{label}</span>
                </span>
              </span>
            </>
          );
          return (
            <li key={l.key} aria-label={l.aria}>
              {l.href ? <a href={l.href} className="group block">{body}</a> : <div>{body}</div>}
            </li>
          );
        })}
      </ol>
    </Plot>
  );
}
