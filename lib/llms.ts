// The site as plain Markdown for language models and answer engines (llms.txt, llms-full.txt): the same facts as the
// pages, with the links that prove them.
import { brands, certifications, commerce, communities, earlier, education, experience, faq, highlights, languages, measured, oss, oversightWork,
  person, research, reviews, SITE, skills, social, teaching } from '@/content/profile';
import { listed, network } from '@/lib/data';

const product = (p: (typeof listed)[number]) => `- [${p.name}](${p.url}) — ${p.summary} (details: ${SITE}/work/${p.slug}/)`;

export function llmsTxt() {
  const built = listed.filter((p) => p.kind === 'built');
  return [
    `# ${person.name}`,
    '',
    `> ${person.role}; ${person.focus}. Co-founder of StoresWiki LLC, founder of Code Engineers. Based in ${person.location}. ${person.availability}.`,
    '',
    person.summary,
    '',
    '## Key pages',
    `- [Home: the estate, mapped](${SITE}/)`,
    `- [CV](${SITE}/cv/)`,
    `- [Everything in detail, for language models](${SITE}/llms-full.txt)`,
    '',
    '## Flagship products, built in-house',
    ...built.map(product),
    '',
    '## Related sites',
    '- [The video studios dossier](https://dossier.storeswiki.com) — the two autonomous video systems, every figure measured',
    '- [StoresWiki Channels](https://channels.storeswiki.com) — every channel of the network, ranked, counted hourly',
    ...brands.map((b) => `- [${b.name}](${b.url}) — ${b.role}`),
    '',
    '## Contact',
    `- Email: ${person.email}`,
    `- WhatsApp or phone: ${person.phone}`,
    ...social.map((s) => `- ${s.name}: ${s.url}`),
    '',
  ].join('\n');
}

export function llmsFull() {
  const sec = (t: string, lines: string[]) => [`## ${t}`, '', ...lines, ''];
  return [
    `# ${person.name} — everything, in one file`,
    '',
    `> ${person.role}; ${person.focus}. ${person.location}. ${person.availability}. Email ${person.email}, phone/WhatsApp ${person.phone}.`,
    '',
    person.summary,
    '',
    ...sec('Research interests', [research.intro, '', ...research.interests.map((r) => `- **${r.title}.** ${r.text}`)]),
    ...sec('Measured results', measured.map((m) => `- **${m.title}:** ${Array.isArray(m.before) ? m.before.join('–') : m.before} → ${Array.isArray(m.after) ? m.after.join('–') : m.after} ${m.unit}. ${m.text}`)),
    ...sec('Selected work: agents and oversight', oversightWork.map((w) => `- **${w.title}.** ${w.text}`)),
    ...sec('Experience', experience.flatMap((j) => [`### ${j.role}, ${j.org} (${j.where}), ${j.from} – ${j.to}`, ...j.points.map((p) => `- ${p}`),
      `- Stack: ${j.stack.join(', ')}`, ...(j.links ? [`- Links: ${j.links.map((l) => l.url).join(', ')}`] : []), ''])),
    ...sec('Brands and ventures', brands.map((b) => `- **[${b.name}](${b.url})** (${b.role}): ${b.text}`)),
    ...sec('Every product, platform and publication', listed.map((p) => [
      `### ${p.name} — ${p.url}`,
      `${p.kind === 'built' ? 'Designed and built in-house' : p.kind === 'media' ? 'Publication' : 'Deployed and operated'}; ${p.brand}; ${p.category}.`,
      p.description || p.summary,
      ...(p.steps.length ? ['How it works: ' + p.steps.join(' ')] : []),
      ...(p.benefits.length ? ['What it does: ' + p.benefits.join('; ') + '.'] : []),
      ...(p.stack.length ? ['Built with: ' + p.stack.join(', ') + '.'] : []),
      ...(highlights[p.slug] ?? []).map((h) => `- ${h}`),
      `Page: ${SITE}/work/${p.slug}/`,
      '',
    ].join('\n'))),
    ...sec('The channels network', [`${network.totals.channels} live channels, ${network.totals.audience} followers and subscribers, ${network.totals.views} views on YouTube, Facebook and Instagram (counted ${network.generated}); ${network.totals.making} more being made. Live: https://channels.storeswiki.com`]),
    ...sec('Commerce and managed open source', [`StoresWiki commerce: ${commerce}`, `Managed open-source cloud: 50+ platforms, among them ${oss.join(', ')}.`]),
    ...sec('Teaching and writing', [`- [${teaching.channel.name}](${teaching.channel.url}): ${teaching.channel.text}`, ...teaching.courses.map((c) => `- Course: [${c.name}](${c.url})`), ...teaching.writing.map((w) => `- [${w.name}](${w.url}): ${w.text}`)]),
    ...sec('Communities', communities.flatMap((g) => g.items.map((i) => `- ${g.group}: [${i.name}](${i.url})`))),
    ...sec('Earlier client work', earlier.map((e) => `- [${e.name}](${e.url}): ${e.text}`)),
    ...sec('Skills', skills.map((s) => `- **${s.area}:** ${s.items.join(', ')}`)),
    ...sec('Education, certifications, languages', [...education.map((e) => `- ${e.degree}, ${e.where}`), ...certifications.map((c) => `- Certification: ${c}`), ...languages.map((l) => `- ${l.name}: ${l.level}`)]),
    ...sec('Clients’ reviews (Fiverr)', reviews.map((r) => `- ${r.rating}/5, ${r.who} (${r.country}), ${r.gig}, ${r.price}, ${r.took}: “${r.text}”`)),
    ...sec('Questions and answers', faq.flatMap((f) => [`**${f.q}** ${f.a}`, ''])),
    ...sec('Profiles', social.map((s) => `- ${s.name}: ${s.url}`)),
  ].join('\n');
}
