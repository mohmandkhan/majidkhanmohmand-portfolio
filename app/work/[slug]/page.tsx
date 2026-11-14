import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Footer } from '@/components/Footer';
import { Pair } from '@/components/Measured';
import { Parcel, Shot } from '@/components/ProductIndex';
import { brands, highlights, measured, person } from '@/content/profile';
import { bySlug, districtColor, KIND_LABEL, listed, products } from '@/lib/data';
import { ld, productLd } from '@/lib/schema';

export const dynamicParams = false;
export function generateStaticParams() {
  return products.filter((p) => p.kind !== 'venture').map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = bySlug((await params).slug);
  if (!p) return {};
  const title = `${p.name}: ${p.summary.replace(/\.$/, '')}`.slice(0, 90);
  const description = (p.description || p.summary).slice(0, 300);
  // the home page's screenshot as a JPEG (public/shots/og, scripts/compile_products.py), or the site's own card
  const og = p.shot ? { url: `/shots/og/${p.slug}.jpg`, width: 1200, height: 750 } : { url: '/og.png', width: 1200, height: 630 };
  return {
    title, description,
    alternates: { canonical: `/work/${p.slug}/` },
    openGraph: { type: 'article', title: `${p.name} — ${person.name}`, description, images: [og] },
    twitter: { card: 'summary_large_image', title: `${p.name} — ${person.name}`, description, images: [og.url] },
  };
}

export default async function Work({ params }: { params: Promise<{ slug: string }> }) {
  const p = bySlug((await params).slug);
  if (!p || p.kind === 'venture') notFound();
  const related = listed.filter((x) => x.slug !== p.slug && (x.category === p.category || x.brand === p.brand)).slice(0, 6);
  const i = listed.findIndex((x) => x.slug === p.slug);
  const prev = listed[(i - 1 + listed.length) % listed.length], next = listed[(i + 1) % listed.length];
  const results = measured.filter((m) => 'product' in m && m.product === p.slug);
  const record = highlights[p.slug] ?? [];
  const brand = brands.find((b) => b.key === p.brand);
  const facts: [string, React.ReactNode][] = [
    ['Brand', brand ? <a href={brand.url} className="text-chalk underline-offset-4 hover:underline">{brand.name}</a> : p.brand],
    ['What it is for', p.category],
    ['My part', KIND_LABEL[p.kind]],
    ['Address', <a key="a" href={p.url} className="text-chalk underline-offset-4 hover:underline">{p.host}</a>],
    ...(p.launcher ? [['In the Ecosystem launcher', `${p.launcher.emoji} ${p.launcher.group}`] as [string, React.ReactNode]] : []),
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={ld(productLd(p))} />
      <article className="mx-auto max-w-[1240px] px-5 pb-20 pt-10 sm:px-8 md:pt-14">
        <nav aria-label="Breadcrumb" className="text-[14px] text-haze">
          <Link href="/" className="hover:text-chalk">{person.name}</Link>
          <span className="mx-2" aria-hidden="true">/</span>
          <Link href="/#estate" className="hover:text-chalk">The estate</Link>
          <span className="mx-2" aria-hidden="true">/</span>
          <span className="text-chalk-2">{p.name}</span>
        </nav>

        <div className="mt-8 grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center">
          <div>
            <p className="flex items-center gap-2.5 text-[14.5px] text-haze">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: districtColor(p.brand) }} aria-hidden="true" />
              {p.brand}, {p.category}
            </p>
            <h1 className="serif mt-3 text-[52px] leading-[0.98] text-chalk md:text-[76px]">{p.name}</h1>
            <p className="mt-5 text-[19px] leading-relaxed text-chalk-2">{p.summary}</p>
            <p className="mt-6 inline-flex rounded-full border border-contour-2 px-3 py-1 text-[13.5px] text-chalk-2">{KIND_LABEL[p.kind]}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={p.url} className="rounded-full bg-chalk px-5 py-2.5 text-[15.5px] font-semibold text-night hover:opacity-90">Open {p.host}</a>
              <Link href="/#contact" className="rounded-full border border-contour-2 px-5 py-2.5 text-[15.5px] font-semibold text-chalk hover:bg-raise">Ask about it</Link>
            </div>
          </div>
          <div className={`relative ${p.phone ? 'pb-10 pr-6 sm:pr-10' : ''}`}>
            <a href={p.url} aria-label={`Open ${p.host}`}><Shot p={p} className="shadow-2xl" /></a>
            {p.phone && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={p.phone} alt={`${p.name} on a phone`} width={520} height={1125} loading="lazy" decoding="async"
                className="absolute bottom-0 right-0 w-[26%] min-w-[92px] rounded-[18px] border-[5px] border-raise bg-night shadow-2xl ring-1 ring-contour-2 sm:rounded-[26px] sm:border-[7px]" />
            )}
          </div>
        </div>

        {results.length > 0 && (
          <section aria-labelledby="measured" className="mt-20">
            <h2 id="measured" className="serif text-[34px] text-chalk">Measured, before and after</h2>
            <div className="mt-6">{results.map((m) => <Pair key={m.id} m={m} brief={record.length > 0} />)}</div>
          </section>
        )}

        <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <div>
            <h2 className="serif text-[34px] text-chalk">What it is</h2>
            <p className="mt-4 max-w-[68ch] text-[17px] leading-relaxed text-chalk-2">{p.description || p.summary}</p>
            {record.length > 0 && (
              <>
                <h2 className="serif mt-12 text-[34px] text-chalk">On the record</h2>
                <ul className="mt-5 space-y-4">
                  {record.map((r) => <li key={r} className="max-w-[68ch] border-l-2 border-d-storeswiki pl-4 text-[16.5px] leading-relaxed text-chalk-2">{r}</li>)}
                </ul>
              </>
            )}
            {p.steps.length > 0 && (
              <>
                <h2 className="serif mt-12 text-[34px] text-chalk">How it works</h2>
                <ol className="mt-5 space-y-4">
                  {p.steps.map((s, n) => (
                    <li key={s} className="grid grid-cols-[2.2rem_minmax(0,1fr)] gap-3">
                      <span className="serif num text-[28px] leading-none text-haze">{n + 1}</span>
                      <span className="text-[16.5px] leading-relaxed text-chalk-2">{s}</span>
                    </li>
                  ))}
                </ol>
              </>
            )}
          </div>
          <aside className="space-y-10">
            <dl className="divide-y divide-contour border-y border-contour text-[15px]">
              {facts.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-4 py-2.5">
                  <dt className="text-haze">{k}</dt>
                  <dd className="text-chalk-2">{v}</dd>
                </div>
              ))}
            </dl>
            {p.benefits.length > 0 && (
              <div>
                <h2 className="text-[15px] font-semibold text-chalk">What it does</h2>
                <ul className="mt-3 space-y-2 text-[15.5px] text-haze">{p.benefits.map((b) => <li key={b} className="border-t border-contour pt-2">{b}</li>)}</ul>
              </div>
            )}
            {p.stack.length > 0 && (
              <div>
                <h2 className="text-[15px] font-semibold text-chalk">Built with</h2>
                <p className="mt-3 flex flex-wrap gap-2">{p.stack.map((s) => <span key={s} className="rounded-full border border-contour-2 px-2.5 py-0.5 text-[13.5px] text-chalk-2">{s}</span>)}</p>
              </div>
            )}
            <div>
              <h2 className="text-[15px] font-semibold text-chalk">Where it runs</h2>
              <p className="mt-3 text-[15.5px] leading-relaxed text-haze">On the estate’s shared platform: Proxmox and LXC on Google Cloud, AWS and Hetzner, behind Cloudflare, with encrypted backups and staging-first releases.</p>
            </div>
          </aside>
        </div>

        <nav aria-label="More of the estate" className="mt-20 grid gap-px overflow-hidden rounded-xl border border-contour bg-contour sm:grid-cols-2">
          {[{ k: 'Previous', x: prev }, { k: 'Next', x: next }].map(({ k, x }) => (
            <Link key={k} href={`/work/${x.slug}/`} className={`group flex items-center gap-4 bg-night p-5 hover:bg-ground ${k === 'Next' ? 'sm:flex-row-reverse sm:text-right' : ''}`}>
              <span className="w-28 shrink-0"><Shot p={x} /></span>
              <span className="min-w-0">
                <span className="block text-[13.5px] text-haze">{k} in the estate</span>
                <span className="mt-0.5 block truncate text-[18px] font-semibold text-chalk group-hover:underline group-hover:underline-offset-4">{x.name}</span>
              </span>
            </Link>
          ))}
        </nav>

        {related.length > 0 && (
          <section aria-labelledby="related" className="mt-24 border-t border-contour pt-12">
            <h2 id="related" className="serif text-[34px] text-chalk">Nearby in the estate</h2>
            <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-7 sm:gap-y-10 lg:grid-cols-3">{related.map((r) => <Parcel key={r.slug} p={r} />)}</div>
          </section>
        )}
      </article>
      <Footer />
    </>
  );
}
