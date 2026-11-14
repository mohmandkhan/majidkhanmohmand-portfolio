'use client';

import { useEffect, useState } from 'react';
import { n, network as baked, words, type Network } from '@/lib/data';

const FEED = 'https://channels.storeswiki.com/data/network.json';
const PLAT = [
  { k: 'youtube', name: 'YouTube', word: 'subscribers' },
  { k: 'facebook', name: 'Facebook', word: 'followers' },
  { k: 'instagram', name: 'Instagram', word: 'followers' },
];

/** The channels network as channels.storeswiki.com counts it every hour: the build's figures first, the live ones as
 *  soon as they arrive. */
export function LiveNetwork() {
  const [net, setNet] = useState<Network>(baked);
  const [live, setLive] = useState(false);
  useEffect(() => {
    fetch(`${FEED}?t=${Date.now()}`, { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d: Network) => { if (d?.channels?.length) { setNet(d); setLive(true); } })
      .catch(() => {});
  }, []);
  const t = net.totals;
  const maxP = Math.max(...PLAT.map((p) => t.by_platform[p.k]?.followers ?? 0), 1);
  const top = [...net.channels].sort((a, b) => b.audience - a.audience).slice(0, 6);
  const maxTop = Math.max(...top.map((c) => c.audience), 1);
  const at = new Date(net.generated);
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div>
        <p className="flex items-center gap-2 text-[13.5px] text-haze">
          <span className={`inline-block h-2 w-2 rounded-full ${live ? 'bg-d-cabscloud' : 'bg-mist'}`} aria-hidden="true" />
          {live ? 'Live from channels.storeswiki.com' : 'As counted when this page was built'}, {at.toUTCString().slice(5, 22)} UTC
        </p>
        <p className="mt-4 serif text-[44px] leading-[1.05] text-chalk md:text-[54px]">
          {t.channels} channels, {n(t.audience)} followers, {words(t.views)} views
        </p>
        <p className="mt-3 text-haze">{t.making} more channels are built and branded, waiting for their projects to launch.</p>
        <div className="mt-8 space-y-4">
          {PLAT.map((p) => {
            const v = t.by_platform[p.k];
            return (
              <div key={p.k}>
                <p className="flex items-baseline justify-between gap-3 text-[14px]">
                  <span className="font-semibold text-chalk">{p.name}</span>
                  <span className="num text-haze">{n(v?.followers ?? 0)} {p.word} on {v?.channels ?? 0} channels</span>
                </p>
                <div className="mt-1.5 h-2.5 rounded bg-raise">
                  <div className="h-full rounded bg-chalk/85" style={{ width: `${Math.max(1.5, ((v?.followers ?? 0) / maxP) * 100)}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <p className="text-[13.5px] text-haze">The most followed, across the three platforms</p>
        <ol className="mt-4 divide-y divide-contour border-y border-contour">
          {top.map((c, i) => (
            <li key={c.id} className="grid grid-cols-[1.8rem_minmax(0,1fr)_auto] items-center gap-3 py-3">
              <span className="num tight text-[20px] font-semibold text-mist">{i + 1}</span>
              <div className="min-w-0">
                <p className="truncate font-medium text-chalk">{c.name}</p>
                <div className="mt-1.5 h-1.5 rounded bg-raise">
                  <div className="h-full rounded bg-d-storeswiki" style={{ width: `${(c.audience / maxTop) * 100}%` }} />
                </div>
              </div>
              <span className="num tight text-right text-[15px] font-semibold text-chalk">{n(c.audience)}</span>
            </li>
          ))}
        </ol>
        <a href="https://channels.storeswiki.com" className="mt-4 inline-block text-[15px] font-semibold text-chalk underline underline-offset-4">Every channel, ranked, on channels.storeswiki.com</a>
      </div>
    </div>
  );
}
