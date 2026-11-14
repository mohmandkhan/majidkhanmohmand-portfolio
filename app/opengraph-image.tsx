import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';
export const alt = 'Majid Khan Mohmand: an estate of AI products, mapped';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const HUES = ['#4f7bff', '#2fc7a8', '#f2c14e', '#e0b0ff', '#ff6f4f', '#8b98ae'];

// the share card: the name over a field of lights, one per product, in its district's colour
export default async function OG() {
  const serif = await readFile(path.join(process.cwd(), 'node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff'));
  let s = 7;
  const r = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  const dots = Array.from({ length: 67 }, (_, i) => ({ x: 640 + r() * 520, y: 60 + r() * 510, d: i % 6, big: i % 4 === 0 }));
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: '#0b1322', position: 'relative', fontFamily: 'Serif' }}>
        {dots.map((d, i) => (
          <div key={i} style={{ position: 'absolute', left: d.x, top: d.y, width: d.big ? 16 : 10, height: d.big ? 16 : 10, borderRadius: 999,
            background: HUES[d.d], boxShadow: `0 0 ${d.big ? 22 : 12}px ${HUES[d.d]}` }} />
        ))}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px', width: 700 }}>
          <div style={{ fontSize: 96, lineHeight: 0.95, color: '#ecf1f8' }}>Majid Khan Mohmand</div>
          <div style={{ marginTop: 28, fontSize: 34, lineHeight: 1.25, color: '#c9d3e2' }}>An estate of about 80 live AI products, built and run with AI agents under rigorous oversight</div>
          <div style={{ marginTop: 34, fontSize: 26, color: '#93a1b8' }}>majidkhanmohmand.com</div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: 'Serif', data: serif, style: 'normal', weight: 400 }] },
  );
}
