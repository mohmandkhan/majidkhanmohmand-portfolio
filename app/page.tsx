import Link from 'next/link';
import { EstateMap } from '@/components/EstateMap';
import { LiveNetwork } from '@/components/LiveNetwork';
import { Measured } from '@/components/Measured';
import { ProductIndex, Shot } from '@/components/ProductIndex';
import { WorldTrace } from '@/components/WorldTrace';
import { CareerLanes, jobId } from '@/components/CareerLanes';
import { Footer } from '@/components/Footer';
import {
  brands, certifications, commerce, communities, earlier, education, experience, faq, figures, languages, oss, oversightWork,
  person, research, reviews, skills, social, teaching,
} from '@/content/profile';
import { counts, DISTRICTS, districtColor, listed, network, products, words } from '@/lib/data';
import { homeLd, ld } from '@/lib/schema';

const FEATURE = ['autogineer', 'channelforge', 'tennet-io', 'reelforge'];

function Section({ id, title, lead, children, wide = false }: { id: string; title: string; lead?: React.ReactNode; children: React.ReactNode; wide?: boolean }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-20 border-t border-contour py-20 md:py-28">
      <div className={`mx-auto px-5 sm:px-8 ${wide ? 'max-w-[1240px]' : 'max-w-[1240px]'}`}>
        <h2 id={`${id}-h`} className="serif max-w-[20ch] text-[44px] leading-[1.02] text-chalk md:text-[64px]">{title}</h2>
        {lead && <div className="mt-5 max-w-[64ch] text-[18px] leading-relaxed text-chalk-2">{lead}</div>}
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}

function month(s: string) {
  if (s === 'present') return 'now';
  const [y, m] = s.split('-');
  return m ? new Date(Number(y), Number(m) - 1).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }) : y;
}

export default function Home() {
  const c = counts();
  const built = listed.filter((p) => p.kind === 'built');
  const featured = FEATURE.map((s) => built.find((p) => p.slug === s)!).filter(Boolean);
  const rest = built.filter((p) => !FEATURE.includes(p.slug));
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={ld(homeLd())} />

      {/* ─── the hero: the name, and the estate it runs ─── */}
      <section className="relative overflow-hidden">
        <div className="graticule pointer-events-none absolute inset-0" aria-hidden="true" />
        {/* on a phone the text starts below the estate's floating Ecosystem launcher (fixed, 70–161 px from the top) */}
        <div className="relative mx-auto max-w-[1240px] px-5 pt-[108px] sm:px-8 sm:pt-14 md:pt-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-end">
            <div>
              <p className="text-[15px] text-haze">{person.role}, {person.location}</p>
              <h1 className="serif mt-4 text-[64px] leading-[0.95] text-chalk sm:text-[92px] md:text-[118px]">Majid Khan Mohmand</h1>
              <p className="mt-7 max-w-[54ch] text-[19px] leading-relaxed text-chalk-2 md:text-[21px]">
                I build AI products and run them as one estate: about 80 live applications across the brands of StoresWiki LLC, implemented
                largely by AI agents and held to account by the oversight I design around them.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="#estate" className="rounded-full bg-chalk px-5 py-2.5 text-[15.5px] font-semibold text-night hover:opacity-90">See the estate</Link>
                <Link href="#contact" className="rounded-full border border-contour-2 px-5 py-2.5 text-[15.5px] font-semibold text-chalk hover:bg-raise">Work with me</Link>
                <Link href="/cv/" className="rounded-full border border-contour-2 px-5 py-2.5 text-[15.5px] font-semibold text-chalk hover:bg-raise">The CV</Link>
              </div>
            </div>
            <dl className="grid grid-cols-2 gap-x-8 gap-y-6 border-t border-contour pt-6 sm:grid-cols-3 lg:border-t-0 lg:pt-0">
              {figures.map((f) => (
                <div key={f.label}>
                  <dt className="sr-only">{f.label}</dt>
                  <dd><span className="serif num block text-[46px] leading-none text-chalk">{f.value}</span><span className="mt-1.5 block text-[14px] leading-snug text-haze">{f.label}</span></dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <div id="estate" className="relative mx-auto max-w-[1240px] scroll-mt-16 px-2 pb-6 pt-10 sm:px-6 md:pt-14">
          <EstateMap />
          <div className="mx-auto mt-2 flex max-w-[1180px] flex-wrap items-center gap-x-6 gap-y-2 px-3 text-[13.5px] text-haze">
            <span className="flex items-center gap-2"><svg width="18" height="18" aria-hidden="true"><circle cx="9" cy="9" r="6" fill="var(--chalk-2)" stroke="var(--chalk)" strokeWidth="1.4" /></svg>built in-house ({c.built})</span>
            <span className="flex items-center gap-2"><svg width="18" height="18" aria-hidden="true"><circle cx="9" cy="9" r="4" fill="var(--chalk-2)" /></svg>deployed and operated ({c.operated})</span>
            <span>publications ({c.media})</span>
            <span className="flex items-center gap-2 md:hidden"><svg width="16" height="16" aria-hidden="true"><rect x="3.5" y="3.5" width="9" height="9" rx="1.5" transform="rotate(45 8 8)" fill="var(--night)" stroke="var(--chalk)" strokeWidth="1.3" /></svg>one shared platform</span>
            <span className="lg:ml-auto">Every light is a live product; hover for its name, open it for the whole story.</span>
          </div>
        </div>
      </section>

      {/* ─── the brands ─── */}
      <Section id="brands" title="Six districts, one company"
        lead={<>Everything here belongs to StoresWiki LLC, which I co-founded in 2024, and to the brands it grew from — starting with Code Engineers, the consultancy I founded in 2013. They share one platform: Proxmox and LXC on Google Cloud, AWS and Hetzner, shared databases with per-app isolation, Cloudflare in front, and encrypted backups on six legs.</>}>
        <div className="grid gap-px overflow-hidden rounded-xl border border-contour bg-contour sm:grid-cols-2 lg:grid-cols-3">
          {brands.map((b) => {
            const n = listed.filter((p) => p.brand === b.key).length;
            return (
              <a key={b.key} href={b.url} className="group bg-night p-7 transition-colors hover:bg-ground">
                <span className="flex items-center gap-2.5">
                  <span className="h-3 w-3 rounded-full" style={{ background: districtColor(b.key) }} aria-hidden="true" />
                  <span className="serif text-[30px] leading-none text-chalk">{b.name}</span>
                </span>
                <span className="mt-2 block text-[14px] text-haze">{b.role}, {n} {n === 1 ? 'site' : 'products and sites'}</span>
                <span className="mt-4 block text-[15.5px] leading-relaxed text-chalk-2">{b.text}</span>
                <span className="mt-4 block text-[14px] font-semibold text-chalk group-hover:underline group-hover:underline-offset-4">{b.url.replace('https://', '')}</span>
              </a>
            );
          })}
        </div>
      </Section>

      {/* ─── built in-house ─── */}
      <Section id="built" title="Designed and built in‑house"
        lead={<>{c.built} products I designed and built with my team and our agents, from the marketplace to the agent control plane. Each opens to its own page: what it does, how it works, what it is built with.</>}>
        <div className="grid gap-x-10 gap-y-16 lg:grid-cols-2">
          {featured.map((p) => (
            <Link key={p.slug} href={`/work/${p.slug}/`} className="group block">
              <Shot p={p} className="transition-transform duration-300 group-hover:-translate-y-1" />
              <div className="mt-5 flex items-center gap-2.5">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: districtColor(p.brand) }} aria-hidden="true" />
                <span className="text-[14px] text-haze">{p.brand}, {p.category}</span>
              </div>
              <h3 className="serif mt-2 text-[40px] leading-tight text-chalk group-hover:underline group-hover:decoration-1 group-hover:underline-offset-8">{p.name}</h3>
              <p className="mt-3 max-w-[60ch] text-[16.5px] leading-relaxed text-chalk-2">{p.description}</p>
              {p.stack.length > 0 && <p className="mt-4 flex flex-wrap gap-2">{p.stack.map((s) => <span key={s} className="rounded-full border border-contour-2 px-2.5 py-0.5 text-[13px] text-haze">{s}</span>)}</p>}
            </Link>
          ))}
        </div>
        <div className="mt-20 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-3">
          {rest.map((p) => (
            <Link key={p.slug} href={`/work/${p.slug}/`} className="group block">
              <Shot p={p} />
              <h3 className="mt-3 text-[16px] font-semibold leading-snug text-chalk group-hover:underline group-hover:underline-offset-4 sm:mt-4 sm:text-[19px]">{p.name}</h3>
              <p className="mt-1.5 line-clamp-3 text-[13.5px] leading-relaxed text-haze sm:text-[15px]">{p.description}</p>
            </Link>
          ))}
        </div>
        <div className="mt-16 rounded-xl border border-contour p-7 md:p-9">
          <h3 className="serif text-[30px] text-chalk">And the platforms behind them</h3>
          <p className="mt-3 max-w-[70ch] text-[16px] leading-relaxed text-chalk-2">
            Nexus, the consolidated admin, with its live-alert Situation Room and the Fleet Security Sentinel; Empire OS, a gamified operations
            command center (Next.js 15, React 19, Prisma); the shared Ecosystem launcher that cross-links every product; and the control layer that
            lets concurrent AI agent sessions work safely on one repository and on every production app.
          </p>
        </div>
      </Section>

      {/* ─── the video studios ─── */}
      <Section id="studios" title="Two studios that make and post videos by themselves"
        lead={<>The original programme and ChannelForge research a niche, write and animate original episodes on cloud GPUs, check them with a quality critic and publish them on schedule — without a person in the loop. Every channel they run, and the network’s others, is counted every hour.</>}>
        <LiveNetwork />
        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-contour bg-contour md:grid-cols-3">
          {[
            { t: 'The original programme', d: 'Projects 1 to 10: 65 channels, 16 posting today on YouTube, Facebook and Instagram, with films, Blender episodes and captions that are the voice, word for word.', u: 'https://dossier.storeswiki.com', l: 'The dossier on both systems' },
            { t: 'ChannelForge', d: 'The same engine as a product anyone can use: faceless channels that run themselves, from niche research to scheduled publishing on eight platforms.', u: 'https://forge.storeswiki.com', l: 'forge.storeswiki.com' },
            { t: 'The network', d: 'Every channel, ranked by followers and views, live: the original programme’s, ChannelForge’s and the channels of ReelForge and YouTube Pro.', u: 'https://channels.storeswiki.com', l: 'channels.storeswiki.com' },
          ].map((x) => (
            <a key={x.t} href={x.u} className="group bg-night p-7 hover:bg-ground">
              <span className="serif block text-[28px] text-chalk">{x.t}</span>
              <span className="mt-3 block text-[15.5px] leading-relaxed text-chalk-2">{x.d}</span>
              <span className="mt-4 block text-[14px] font-semibold text-chalk group-hover:underline group-hover:underline-offset-4">{x.l}</span>
            </a>
          ))}
        </div>
      </Section>

      {/* ─── oversight ─── */}
      <Section id="oversight" title="Agents do the work. Oversight decides it is done."
        lead={<>{research.intro}</>}>
        <div className="grid gap-px overflow-hidden rounded-xl border border-contour bg-contour md:grid-cols-2">
          {research.interests.map((r) => (
            <div key={r.title} className="bg-night p-7">
              <h3 className="text-[18px] font-semibold text-chalk">{r.title}</h3>
              <p className="mt-2 text-[15.5px] leading-relaxed text-haze">{r.text}</p>
            </div>
          ))}
        </div>
        <h3 className="serif mt-20 text-[36px] text-chalk">Measured, before and after</h3>
        <div className="mt-6"><Measured /></div>
        <div className="mt-16 grid gap-10 md:grid-cols-2">
          {oversightWork.map((w) => (
            <div key={w.title} className="border-t border-contour pt-5">
              <h3 className="text-[18px] font-semibold text-chalk">{w.title}</h3>
              <p className="mt-2 text-[15.5px] leading-relaxed text-haze">{w.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── operated ─── */}
      <Section id="operated" title="Deployed, integrated and operated"
        lead={<>Platforms I deployed end to end on our own infrastructure — provisioning, a malware audit of the vendor code, LLM, payment, mail and sign-in integration, branding, legal pages and SEO — and run every day, beside the publications.</>}>
        <ProductIndex kinds={['operated', 'media']} />
        <div className="mt-20 grid gap-10 md:grid-cols-2">
          <div className="border-t border-contour pt-5">
            <h3 className="serif text-[30px] text-chalk">The StoresWiki commerce ecosystem</h3>
            <p className="mt-3 text-[16px] leading-relaxed text-chalk-2">Mart, Shop, Services, Grocery, Restaurant and Store. {commerce}</p>
          </div>
          <div className="border-t border-contour pt-5">
            <h3 className="serif text-[30px] text-chalk">A managed open-source cloud</h3>
            <p className="mt-3 text-[16px] leading-relaxed text-chalk-2">More than 50 platforms run as managed services, each containerised with its own database, TLS and reverse-proxy routing, among them:</p>
            <p className="mt-4 flex flex-wrap gap-2">{oss.map((o) => <span key={o} className="rounded-full border border-contour-2 px-2.5 py-0.5 text-[13.5px] text-chalk-2">{o}</span>)}</p>
          </div>
        </div>
      </Section>

      {/* ─── career ─── */}
      <Section id="career" title="Twelve years, ten countries, one habit"
        lead={<>Measure first, and never trust a green result until something could have turned it red. From a consultancy in Pakistan to newsrooms in Sweden, marketplaces in the Gulf and a company of my own.</>}>
        <WorldTrace />
        <h3 className="serif mt-20 text-[36px] text-chalk">Side by side</h3>
        <p className="mt-2 max-w-[64ch] text-[16px] leading-relaxed text-haze">Every engagement on one time axis; the overlaps are the point. Each lane opens its entry below.</p>
        <div className="mt-8"><CareerLanes /></div>
        <ol className="mt-16 space-y-0">
          {experience.map((j) => (
            <li key={j.org + j.from} id={jobId(j.org, j.from)} className="grid scroll-mt-24 gap-4 border-t border-contour py-9 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-10">
              <div>
                <p className="num text-[15px] font-semibold text-chalk">{month(j.from)} – {month(j.to)}</p>
                <p className="mt-1 text-[14px] text-haze">{j.where}</p>
              </div>
              <div>
                <h3 className="serif text-[30px] leading-tight text-chalk">{j.org}</h3>
                <p className="mt-1 text-[16px] font-medium text-chalk-2">{j.role}</p>
                <ul className="mt-4 space-y-2.5 text-[15.5px] leading-relaxed text-haze">
                  {j.points.map((p) => <li key={p} className="relative pl-5 before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-2.5 before:bg-mist">{p}</li>)}
                </ul>
                <p className="mt-4 flex flex-wrap gap-2">{j.stack.map((s) => <span key={s} className="rounded-full border border-contour-2 px-2.5 py-0.5 text-[13px] text-haze">{s}</span>)}</p>
                {j.links && <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[14px]">{j.links.map((l) => <a key={l.url} href={l.url} className="font-semibold text-chalk underline-offset-4 hover:underline">{l.label}</a>)}</p>}
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-10 border-t border-contour pt-8">
          <h3 className="serif text-[28px] text-chalk">Earlier client work, still online</h3>
          <ul className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {earlier.map((e) => (
              <li key={e.name}><a href={e.url} className="font-semibold text-chalk underline-offset-4 hover:underline">{e.name}</a><span className="block text-[14.5px] text-haze">{e.text}</span></li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ─── teaching and writing ─── */}
      <Section id="teaching" title="Teaching and writing"
        lead={<>Free courses on YouTube, and four publications that cover technology, AI, world affairs and games.</>}>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <a href={teaching.channel.url} className="serif text-[34px] text-chalk underline-offset-8 hover:underline">{teaching.channel.name}</a>
            <p className="mt-2 text-chalk-2">{teaching.channel.text}</p>
            <ul className="mt-6 space-y-3">
              {teaching.courses.map((x) => <li key={x.url}><a href={x.url} className="font-medium text-chalk underline-offset-4 hover:underline">{x.name}</a></li>)}
            </ul>
          </div>
          <ul className="divide-y divide-contour border-y border-contour">
            {teaching.writing.map((w) => (
              <li key={w.url} className="py-4"><a href={w.url} className="text-[18px] font-semibold text-chalk underline-offset-4 hover:underline">{w.name}</a><span className="block text-[15px] text-haze">{w.text}</span></li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ─── communities ─── */}
      <Section id="communities" title="Channels and communities"
        lead={<>WhatsApp channels and a Telegram channel for business, technology and the things people love to follow.</>}>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {communities.map((g) => (
            <div key={g.group}>
              <h3 className="text-[15px] font-semibold text-chalk">{g.group}</h3>
              <ul className="mt-3 space-y-2">{g.items.map((i) => <li key={i.url}><a href={i.url} className="text-[15px] text-chalk-2 underline-offset-4 hover:text-chalk hover:underline">{i.name}</a></li>)}</ul>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── skills and credentials ─── */}
      <Section id="skills" title="Tools of the trade">
        <dl className="grid gap-x-10 gap-y-8 md:grid-cols-2">
          {skills.map((s) => (
            <div key={s.area} className="border-t border-contour pt-4">
              <dt className="text-[15px] font-semibold text-chalk">{s.area}</dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-haze">{s.items.join(', ')}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          <div><h3 className="text-[15px] font-semibold text-chalk">Education</h3><ul className="mt-3 space-y-2 text-[15px] text-haze">{education.map((e) => <li key={e.degree}><span className="text-chalk-2">{e.degree}</span>, {e.where}</li>)}</ul></div>
          <div><h3 className="text-[15px] font-semibold text-chalk">Certifications</h3><ul className="mt-3 space-y-2 text-[15px] text-haze">{certifications.map((x) => <li key={x}>{x}</li>)}</ul></div>
          <div><h3 className="text-[15px] font-semibold text-chalk">Languages</h3><ul className="mt-3 space-y-2 text-[15px] text-haze">{languages.map((l) => <li key={l.name}><span className="text-chalk-2">{l.name}</span>, {l.level}</li>)}</ul></div>
        </div>
      </Section>

      {/* ─── questions ─── */}
      <Section id="questions" title="Questions people ask">
        <div className="divide-y divide-contour border-y border-contour">
          {faq.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="cursor-pointer list-none text-[18px] font-semibold text-chalk marker:hidden">
                <span className="mr-3 inline-block text-haze transition-transform group-open:rotate-45" aria-hidden="true">+</span>{f.q}
              </summary>
              <p className="mt-3 max-w-[72ch] pl-7 text-[16px] leading-relaxed text-chalk-2">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* ─── in clients' words ─── */}
      <Section id="reviews" title="In clients’ words" lead={<>Four reviews left on Fiverr, every one of them five stars.</>}>
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          {[reviews.slice(0, 1), reviews.slice(1)].map((col, ci) => (
            <div key={ci} className="grid gap-5">
              {col.map((r) => (
                <figure key={r.who} className={`flex flex-col rounded-xl border border-contour ${ci === 0 ? 'p-8 md:p-10' : 'p-6'}`}>
                  <p className="flex items-center gap-1 text-chalk" aria-label={`${r.rating} out of 5 stars`}>
                    {Array.from({ length: 5 }, (_, i) => <svg key={i} viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true"><path d="M10 1.8l2.5 5.2 5.7.8-4.1 4 1 5.6L10 14.7l-5.1 2.7 1-5.6-4.1-4 5.7-.8z" fill="currentColor" /></svg>)}
                    <span className="num ml-1.5 text-[13.5px] text-haze">{r.rating.toFixed(1)}</span>
                  </p>
                  <blockquote className={ci === 0 ? 'serif mt-5 text-[25px] leading-[1.32] text-chalk md:text-[29px]' : 'mt-3 text-[16.5px] leading-relaxed text-chalk-2'}>“{r.text}”</blockquote>
                  <figcaption className="mt-auto pt-5 text-[14px] text-haze">
                    <span className="font-semibold text-chalk">{r.who}</span>, <span aria-hidden="true">{r.flag} </span>{r.country}. {r.gig}, {r.price}, {r.took}.
                  </figcaption>
                </figure>
              ))}
            </div>
          ))}
        </div>
        <a href="https://www.fiverr.com/majidkhan_moh" className="mt-8 inline-block text-[15px] font-semibold text-chalk underline underline-offset-4">Every review, on Fiverr</a>
      </Section>

      {/* ─── contact ─── */}
      <section id="contact" aria-labelledby="contact-h" className="scroll-mt-20 border-t border-contour py-24 md:py-32">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_auto]">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/majid-face.webp" alt="" width={240} height={240} loading="lazy" decoding="async"
                className="mb-8 h-24 w-24 rounded-full bg-raise ring-1 ring-contour-2 lg:hidden" />
              <h2 id="contact-h" className="serif max-w-[16ch] text-[56px] leading-[0.98] text-chalk md:text-[96px]">Have something to build, or to keep running?</h2>
              <p className="mt-6 max-w-[58ch] text-[18px] text-chalk-2">{person.availability}. I answer every message myself.</p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/majid-portrait.webp" alt={person.name} width={369} height={676} loading="lazy" decoding="async"
              className="-mb-10 hidden h-[400px] w-auto drop-shadow-[0_24px_40px_rgba(0,0,0,0.35)] lg:block" />
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-[1.25fr_1fr_1fr_1fr]">
            {[
              { k: 'Email', v: person.email, u: `mailto:${person.email}` },
              { k: 'WhatsApp or phone', v: person.phone, u: person.whatsapp },
              { k: 'LinkedIn', v: 'in/majidkhanmohmand', u: 'https://www.linkedin.com/in/majidkhanmohmand' },
              { k: 'Hire through Upwork', v: 'Upwork profile', u: 'https://www.upwork.com/freelancers/~01656cd2c7681104f0' },
            ].map((x) => (
              <a key={x.k} href={x.u} className="group relative rounded-xl border border-contour-2 bg-night p-6 transition-colors hover:bg-raise">
                <span className="block text-[14px] text-haze">{x.k}</span>
                <span className="mt-2 block text-[17px] font-semibold text-chalk [overflow-wrap:anywhere] group-hover:underline group-hover:underline-offset-4 sm:[overflow-wrap:normal]">{x.v}</span>
              </a>
            ))}
          </div>
          <p className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[15px]">
            {social.map((s) => <a key={s.name} href={s.url} rel="me" className="text-chalk-2 underline-offset-4 hover:text-chalk hover:underline">{s.name}</a>)}
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}
