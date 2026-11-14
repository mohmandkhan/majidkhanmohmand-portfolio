import land from '@/content/land.json';
import { countries } from '@/content/profile';
import { Plot } from './Plot';

// The career as a survey trace over a dot-matrix world (Natural Earth's land, sampled every 2°; scripts/land_dots.py):
// the countries the work came from, joined in order, and the countries Code Engineers' clients came from. Home is Italy.
type Land = { lon0: number; lon1: number; lat0: number; step: number; rows: [number, [number, number][]][] };
const { lon0, lon1, lat0, step, rows } = land as unknown as Land;
const W = 1000;
const K = W / (lon1 - lon0);                     // px per degree
const H = Math.round((lat0 + 56) * K);           // down to 56°S, room under New Zealand
const X = (lon: number) => Math.round((lon - lon0) * K * 10) / 10;
const Y = (lat: number) => Math.round((lat0 - lat) * K * 10) / 10;

const LAND = rows.map(([r, runs]) => runs.map(([a, b]) => `M${X(lon0 + a * step)} ${Y(lat0 - r * step)}H${(X(lon0 + b * step) + 0.01).toFixed(2)}`).join('')).join('');

const PATH: [string, string][] = [['PK', 'SE'], ['SE', 'SA'], ['SA', 'AE'], ['AE', 'US']];
const CLIENTS: [string, string][] = [['PK', 'NZ'], ['PK', 'AF'], ['PK', 'US'], ['IT', 'GB'], ['IT', 'DE'], ['IT', 'CH']];
const WORK = ['PK', 'SE', 'SA', 'AE', 'US'];
const WHEN: Record<string, string> = { PK: '2013–2019', SE: '2019–2025', SA: '2019–2022', AE: '2022–2024', US: '2024–now', IT: 'home' };
// where each label sits, by hand: the Gulf and the Hindu Kush are crowded at this scale
const LABEL: Record<string, { dx: number; dy: number; a: 'start' | 'end' }> = {
  US: { dx: -13, dy: 2, a: 'end' },
  SE: { dx: 13, dy: -2, a: 'start' },
  SA: { dx: -12, dy: 6, a: 'end' },
  AE: { dx: 9, dy: 24, a: 'start' },
  PK: { dx: 13, dy: 4, a: 'start' },
  AF: { dx: -9, dy: -14, a: 'end' },
  IT: { dx: -12, dy: 16, a: 'end' },
  NZ: { dx: -12, dy: 4, a: 'end' },
  GB: { dx: -10, dy: 2, a: 'end' },
  DE: { dx: 9, dy: 6, a: 'start' },
  CH: { dx: -9, dy: 15, a: 'end' },
};

function arc(a: string, b: string, lift: number) {
  const p = countries[a], q = countries[b];
  const x1 = X(p.lon), y1 = Y(p.lat), x2 = X(q.lon), y2 = Y(q.lat);
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2 - Math.hypot(x2 - x1, y2 - y1) * lift;
  return `M${x1},${y1} Q${mx.toFixed(1)},${my.toFixed(1)} ${x2},${y2}`;
}

const halo = { paintOrder: 'stroke' as const, stroke: 'var(--night)', strokeWidth: 5, strokeLinejoin: 'round' as const };

export function WorldTrace() {
  return (
    <Plot>
      <figure>
        <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:overflow-visible sm:px-0">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full min-w-[760px] sm:min-w-0" role="img"
          aria-label="Where the work came from, in order: Pakistan, Sweden, Saudi Arabia, the United Arab Emirates and the United States; clients in New Zealand, Afghanistan, the United States, the United Kingdom, Germany and Switzerland; home is Catania, Italy">
          <defs>
            <radialGradient id="wt-glow">
              <stop offset="0%" stopColor="var(--d-storeswiki)" stopOpacity="0.42" />
              <stop offset="100%" stopColor="var(--d-storeswiki)" stopOpacity="0" />
            </radialGradient>
          </defs>
          {[-30, 0, 30, 60].map((l) => (
            <g key={l}>
              <line x1={0} x2={W} y1={Y(l)} y2={Y(l)} stroke={l === 0 ? 'var(--contour-2)' : 'var(--contour)'} strokeWidth="1" strokeDasharray={l === 0 ? undefined : '2 6'} />
              <text x={4} y={Y(l) - 6} fontSize="11" fill="var(--mist)">{l === 0 ? 'equator' : `${Math.abs(l)}°${l > 0 ? 'N' : 'S'}`}</text>
            </g>
          ))}
          <path d={LAND} fill="none" stroke="var(--contour-2)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray={`0 ${(step * K).toFixed(3)}`} />
          {WORK.map((k) => <circle key={k} cx={X(countries[k].lon)} cy={Y(countries[k].lat)} r="30" fill="url(#wt-glow)" />)}

          {CLIENTS.map(([a, b], i) => (
            <path key={a + b} className="plot-fade" style={{ ['--i' as string]: 9 + i }} d={arc(a, b, 0.14)} fill="none" stroke="var(--haze)" strokeWidth="1.3" strokeDasharray="3 5" />
          ))}
          {PATH.map(([a, b], i) => (
            <path key={a + b} className="plot-draw" style={{ ['--i' as string]: i }} pathLength={1} strokeDasharray="1" d={arc(a, b, a === 'AE' ? 0.2 : 0.24)}
              fill="none" stroke="var(--d-storeswiki)" strokeWidth="2.4" strokeLinecap="round" />
          ))}

          {Object.entries(countries).map(([k, c]) => {
            const work = WORK.includes(k), home = k === 'IT';
            const x = X(c.lon), y = Y(c.lat), L = LABEL[k];
            return (
              <g key={k}>
                {home ? (
                  <>
                    <circle cx={x} cy={y} r="8" fill="none" stroke="var(--d-cabscloud)" strokeWidth="1.8" />
                    <circle cx={x} cy={y} r="3" fill="var(--d-cabscloud)" />
                  </>
                ) : (
                  <circle cx={x} cy={y} r={work ? 6 : 4.2} fill={work ? 'var(--chalk)' : 'var(--night)'} stroke="var(--chalk)" strokeWidth="1.6" />
                )}
                <text x={x + L.dx} y={y + L.dy} textAnchor={L.a} fontSize={work || home ? 14.5 : 13} fill={work || home ? 'var(--chalk)' : 'var(--chalk-2)'} fontWeight={work || home ? 600 : 400} {...halo}>{home ? 'Catania, Italy' : c.name}</text>
                {WHEN[k] && <text x={x + L.dx} y={y + L.dy + 16} textAnchor={L.a} fontSize="12.5" fill="var(--haze)" {...halo}>{WHEN[k]}</text>}
              </g>
            );
          })}
        </svg>
        </div>
        <figcaption className="mt-3 max-w-[72ch] text-[14px] leading-relaxed text-haze">
          The solid line joins the countries the work came from, in order. The hollow dots are clients’ countries: Code Engineers’ in the USA, New Zealand and Afghanistan; on Fiverr, the UK, Germany, Switzerland and the USA. The ring is home.<span className="sm:hidden"> Swipe the map to pan it.</span>
        </figcaption>
      </figure>
    </Plot>
  );
}
