import { measured } from '@/content/profile';
import { Plot } from './Plot';

type M = (typeof measured)[number];

function fmt(v: number, unit: string) {
  if (unit === 'US dollars') return `$${v < 0.1 ? v.toFixed(3) : v.toFixed(2)}`;
  if (v >= 1000) return `${new Intl.NumberFormat('en-GB').format(Math.round(v))}`;
  return String(v);
}
const span = (v: number | number[]) => (Array.isArray(v) ? v : [v, v]);

/** One measured change, before and after, on one axis: a range where the measurement was a range, a log scale where
 *  the change spans orders of magnitude. */
export function Pair({ m, brief = false }: { m: M; brief?: boolean }) {
  const [b0, b1] = span(m.before as number | number[]);
  const [a0, a1] = span(m.after as number | number[]);
  const max = Math.max(b1, a1);
  const log = m.scale === 'log';
  const lo = log ? Math.min(b0, a0) / 2 : 0;
  const x = (v: number) => {
    if (log) return (Math.log10(Math.max(v, lo)) - Math.log10(lo)) / (Math.log10(max * 1.15) - Math.log10(lo));
    return v / (max * 1.08);
  };
  const W = 100;
  const bar = (v0: number, v1: number) => ({ left: `${x(v0) * W}%`, width: `${Math.max(1.2, (x(v1) - (v0 === v1 ? 0 : x(v0))) * W)}%` });
  const label = (v0: number, v1: number) => (v0 === v1 ? fmt(v0, m.unit) : `${fmt(v0, m.unit)}–${fmt(v1, m.unit)}`);
  const ratio = b1 > 0 && a1 > 0 ? Math.round(((b0 + b1) / 2) / ((a0 + a1) / 2)) : null;
  return (
    <figure className="grid gap-4 border-t border-contour py-7 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:gap-10">
      <div>
        <figcaption className="text-[17px] font-semibold leading-snug text-chalk">{m.title}</figcaption>
        {!brief && <p className="mt-2 text-[15px] leading-relaxed text-haze">{m.text}</p>}
      </div>
      <Plot className="self-center">
        {[
          { k: 'Before', v: [b0, b1], tone: 'bg-mist', ink: 'text-chalk' },
          { k: 'After', v: [a0, a1], tone: 'bg-chalk', ink: 'text-night' },
        ].map((r, ri) => {
          const end = x(r.v[1]);
          const inside = end > 0.7;   // a long bar carries its figure inside, in the bar's own contrast
          return (
            <div key={r.k} className="mb-3 grid grid-cols-[4.2rem_minmax(0,1fr)] items-center gap-3">
              <span className="text-[13px] text-haze">{r.k}</span>
              <div className="relative h-7 rounded-[3px] bg-raise">
                <div className={`plot-grow absolute inset-y-0 rounded-[3px] ${r.tone}`} style={{ ...(r.v[0] === r.v[1] ? { left: 0, width: bar(r.v[1], r.v[1]).width } : bar(r.v[0], r.v[1])), ['--i' as string]: ri * 3 }} />
                <span className={`plot-fade num tight absolute inset-y-0 flex items-center whitespace-nowrap text-[13.5px] font-semibold ${inside ? r.ink : 'text-chalk'}`}
                  style={{ ...(inside ? { right: `calc(${(1 - end) * 100}% + 8px)` } : { left: `calc(${end * 100}% + 8px)` }), ['--i' as string]: ri * 3 + 3 }}>
                  {label(r.v[0], r.v[1])} {m.unit === 'US dollars' ? '' : m.unit}
                </span>
              </div>
            </div>
          );
        })}
        <p className="pl-[4.95rem] text-[12.5px] text-mist">
          {log ? 'Logarithmic scale' : 'Linear scale'}
          {ratio && ratio >= 3 && m.id !== 'tests' ? `, about ${ratio} times less` : ''}
          {m.id === 'scan' ? ', every guest scanned or counted as failed' : ''}
        </p>
      </Plot>
    </figure>
  );
}

export function Measured() {
  return <div>{measured.map((m) => <Pair key={m.id} m={m} />)}</div>;
}
