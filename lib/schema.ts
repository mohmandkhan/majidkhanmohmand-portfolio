// Structured data (schema.org, JSON-LD) for search engines and answer engines: who Majid is, what Majid founded and
// built, and the questions people ask. Every fact here is also visible on the page it describes.
import { brands, certifications, experience, faq, languages, person, SITE, skills, social } from '@/content/profile';
import { listed, type Product } from '@/lib/data';

export const PERSON_ID = `${SITE}/#person`;

export function personLd() {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: person.name,
    url: SITE,
    image: `${SITE}${person.portrait}`,
    jobTitle: 'Technical founder and senior full-stack and cloud engineer',
    description: person.summary,
    email: `mailto:${person.email}`,
    telephone: person.phone,
    address: { '@type': 'PostalAddress', addressLocality: 'Catania', addressCountry: 'IT' },
    worksFor: { '@type': 'Organization', name: 'StoresWiki LLC', url: 'https://storeswiki.com' },
    alumniOf: [{ '@type': 'CollegeOrUniversity', name: 'University of Peshawar' }],
    knowsLanguage: languages.map((l) => l.name),
    knowsAbout: [...new Set(skills.flatMap((s) => s.items.slice(0, 6)))].slice(0, 40),
    hasCredential: certifications.map((c) => ({ '@type': 'EducationalOccupationalCredential', name: c })),
    sameAs: social.map((s) => s.url),
  };
}

export function homeLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      personLd(),
      { '@type': 'WebSite', '@id': `${SITE}/#website`, url: SITE, name: person.name, publisher: { '@id': PERSON_ID }, inLanguage: 'en' },
      { '@type': 'ProfilePage', '@id': `${SITE}/#profile`, url: SITE, mainEntity: { '@id': PERSON_ID }, about: { '@id': PERSON_ID }, inLanguage: 'en' },
      ...brands.filter((b) => b.key !== 'Media').map((b) => ({
        '@type': 'Organization', name: b.name, url: b.url, description: b.text,
        ...(b.key === 'Code Engineers' || b.key === 'StoresWiki' ? { founder: { '@id': PERSON_ID } } : {}),
      })),
      {
        '@type': 'ItemList', name: 'Products, platforms and publications built or operated by Majid Khan Mohmand',
        itemListElement: listed.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE}/work/${p.slug}/`, name: p.name })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
      ...experience.map((j) => ({
        '@type': 'OrganizationRole', roleName: j.role, startDate: j.from, ...(j.to !== 'present' ? { endDate: j.to } : {}),
        member: { '@id': PERSON_ID }, memberOf: { '@type': 'Organization', name: j.org },
      })),
    ],
  };
}

export function productLd(p: Product) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': p.kind === 'media' ? 'WebSite' : 'SoftwareApplication',
        name: p.name, url: p.url, description: p.description || p.summary,
        ...(p.kind === 'media' ? {} : { applicationCategory: p.category, operatingSystem: 'Web' }),
        ...(p.shot ? { image: `${SITE}${p.shot}` } : {}),
        ...(p.kind === 'built' ? { creator: { '@id': PERSON_ID }, author: { '@id': PERSON_ID } } : { provider: { '@id': PERSON_ID } }),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: person.name, item: SITE },
          { '@type': 'ListItem', position: 2, name: 'The estate', item: `${SITE}/#estate` },
          { '@type': 'ListItem', position: 3, name: p.name, item: `${SITE}/work/${p.slug}/` },
        ],
      },
      { ...personLd() },
    ],
  };
}

export const ld = (o: object) => ({ __html: JSON.stringify(o).replace(/</g, '\\u003c') });
