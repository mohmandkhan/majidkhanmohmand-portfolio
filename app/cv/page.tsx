import type { Metadata } from 'next';
import { PrintButton } from '@/components/PrintButton';
import { certifications, education, experience, languages, oversightWork, person, research, skills, social, teaching } from '@/content/profile';
import { listed } from '@/lib/data';

export const metadata: Metadata = {
  title: 'CV',
  description: `The CV of ${person.name}: ${person.role}. Experience, flagship products, skills, education and certifications — printable.`,
  alternates: { canonical: '/cv/' },
};

function month(s: string) {
  if (s === 'present') return 'present';
  const [y, m] = s.split('-');
  return m ? new Date(Number(y), Number(m) - 1).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }) : y;
}

/** The CV as a page that prints well on A4 (the same facts as the rest of the site, in a CV's order). */
export default function CV() {
  const built = listed.filter((p) => p.kind === 'built');
  const operated = listed.filter((p) => p.kind === 'operated');
  return (
    <article className="mx-auto max-w-[900px] px-5 py-12 sm:px-8 print:max-w-none print:px-0 print:py-0">
      <div className="no-print mb-8 flex items-center justify-between gap-4">
        <p className="text-[14px] text-haze">Print it, or save it as a PDF from the print dialog.</p>
        <PrintButton />
      </div>
      <header className="border-b border-contour pb-6 print:border-black/20">
        <h1 className="serif text-[52px] leading-none text-chalk print:text-[34pt] print:text-black">{person.name}</h1>
        <p className="mt-3 text-[18px] text-chalk-2 print:text-[12pt] print:text-black">{person.role}. {person.focus}.</p>
        <p className="mt-3 text-[14.5px] text-haze print:text-[9.5pt] print:text-black">
          {person.email} · {person.emailAlt} · {person.phone} · {person.location} · majidkhanmohmand.com · linkedin.com/in/majidkhanmohmand · github.com/mohmandkhan
        </p>
      </header>

      <section className="mt-7">
        <p className="text-[16px] leading-relaxed text-chalk-2 print:text-[10pt] print:text-black">{person.summary}</p>
      </section>

      <Block title="Research interests">
        <ul className="space-y-2">{research.interests.map((r) => <li key={r.title}><b className="text-chalk print:text-black">{r.title}.</b> {r.text}</li>)}</ul>
      </Block>

      <Block title="Selected work: LLM agents, context and oversight">
        <ul className="space-y-2">{oversightWork.map((w) => <li key={w.title}><b className="text-chalk print:text-black">{w.title}.</b> {w.text}</li>)}</ul>
      </Block>

      <Block title="Experience">
        <div className="space-y-5">
          {experience.map((j) => (
            <div key={j.org + j.from} className="break-inside-avoid">
              <p className="flex flex-wrap items-baseline justify-between gap-x-4">
                <b className="text-[16.5px] text-chalk print:text-[11pt] print:text-black">{j.role}, {j.org}</b>
                <span className="num text-[14px] text-haze print:text-black">{month(j.from)} – {month(j.to)} · {j.where}</span>
              </p>
              <ul className="mt-1.5 list-disc space-y-1 pl-5">{j.points.map((p) => <li key={p}>{p}</li>)}</ul>
            </div>
          ))}
        </div>
      </Block>

      <Block title="Flagship products, designed and built in-house">
        <ul className="space-y-1.5">{built.map((p) => <li key={p.slug}><b className="text-chalk print:text-black">{p.name}</b> ({p.host}). {p.description}</li>)}</ul>
      </Block>

      <Block title="Deployed and operated platforms">
        <p>{operated.map((p) => `${p.name} (${p.host})`).join(' · ')}</p>
      </Block>

      <Block title="Skills">
        <ul className="space-y-1.5">{skills.map((s) => <li key={s.area}><b className="text-chalk print:text-black">{s.area}:</b> {s.items.join(', ')}</li>)}</ul>
      </Block>

      <Block title="Teaching and writing">
        <p>{teaching.channel.name}: {teaching.channel.text} Publications: {teaching.writing.map((w) => w.name).join(', ')}.</p>
      </Block>

      <div className="grid gap-6 sm:grid-cols-3">
        <Block title="Education"><ul className="space-y-1">{education.map((e) => <li key={e.degree}>{e.degree}, {e.where}</li>)}</ul></Block>
        <Block title="Certifications"><ul className="space-y-1">{certifications.map((c) => <li key={c}>{c}</li>)}</ul></Block>
        <Block title="Languages"><ul className="space-y-1">{languages.map((l) => <li key={l.name}>{l.name}: {l.level}</li>)}</ul></Block>
      </div>

      <Block title="Profiles">
        <p>{social.map((s) => `${s.name}: ${s.url.replace('https://', '')}`).join(' · ')}</p>
      </Block>
    </article>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="break-after-avoid border-b border-contour pb-1.5 text-[13px] font-semibold tracking-[0.04em] text-haze print:border-black/20 print:text-[9pt] print:text-black">{title}</h2>
      <div className="mt-3 text-[15px] leading-relaxed text-chalk-2 print:text-[9.5pt] print:leading-snug print:text-black">{children}</div>
    </section>
  );
}
