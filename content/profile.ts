// Everything the site says about Majid, in one place. Sources: the CV of 2026-11-03 (myinfrastructure projects/mycv,
// every claim sourced and checked), the brand sites' own pages (read 2026-11-14), the dossier and the channels feed.
// Products and platforms are in products.json (scripts/compile_products.py).

import productsJson from './products.json';

// the address Vercel serves without a redirect (the bare domain answers 307 to www)
export const SITE = 'https://www.majidkhanmohmand.com';
// what the atlas lists (the studios' own sites are shown with the brands, not counted)
const ATLAS = (productsJson as { kind: string }[]).filter((p) => p.kind !== 'venture').length;

export const person = {
  name: 'Majid Khan Mohmand',
  short: 'Majid',
  role: 'Technical founder, senior full-stack and cloud engineer',
  focus: 'LLM agents and the oversight that keeps them honest',
  location: 'Catania, Italy',
  availability: 'Available remote, or on site in San Francisco or London',
  email: 'mohmandkhan@gmail.com',
  emailAlt: 'info@majidkhanmohmand.com',
  phone: '+39 350 827 4261',
  whatsapp: 'https://wa.me/393508274261',
  portrait: '/majid-portrait.png',
  summary:
    'I have built and run production software for more than twelve years: over 150 projects for media groups, government programmes, marketplaces and SaaS ventures. As co-founder of StoresWiki LLC I architect and operate an estate of about 80 live applications across five brands, on Google Cloud, AWS, Hetzner and GPU clouds. Since 2026 LLM coding agents — Claude Code, Kiro, Claude Desktop — do much of the implementation under my direction, and I build the oversight around them: verification with positive and negative controls, guards on irreversible and costly actions, least-privilege credentials and context budgets.',
};

export const social = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/majidkhanmohmand', handle: 'in/majidkhanmohmand' },
  { name: 'GitHub', url: 'https://github.com/mohmandkhan', handle: 'mohmandkhan' },
  { name: 'YouTube', url: 'https://www.youtube.com/@majidmohmand', handle: '@majidmohmand' },
  { name: 'X', url: 'https://x.com/majidkhanmohman', handle: '@majidkhanmohman' },
  { name: 'Medium', url: 'https://medium.com/@majidkhanmohmand', handle: '@majidkhanmohmand' },
  { name: 'Instagram', url: 'https://www.instagram.com/majidkhanmohmand/', handle: '@majidkhanmohmand' },
  { name: 'Facebook', url: 'https://www.facebook.com/majidkhanmohmand007', handle: 'majidkhanmohmand007' },
  { name: 'TikTok', url: 'https://www.tiktok.com/@majidkhanusa1', handle: '@majidkhanusa1' },
  { name: 'Upwork', url: 'https://www.upwork.com/freelancers/~01656cd2c7681104f0', handle: 'Upwork profile' },
  { name: 'Fiverr', url: 'https://www.fiverr.com/majidkhan_moh', handle: 'majidkhan_moh' },
] as const;

// the figures the estate is measured by (each has its source in the CV, the dossier or a live feed)
export const figures = [
  { value: '12+', label: 'years building production software' },
  { value: '150+', label: 'projects delivered' },
  { value: '~80', label: 'live applications operated' },
  { value: String(ATLAS), label: 'products, platforms and sites in this atlas' },
  { value: '10', label: 'countries the work came from' },
];

export const research = {
  intro:
    'Six months of production work done through AI agents, kept as a field record of failures and countermeasures — more than 2,200 dated entries from May to November 2026 — raised four questions I work on.',
  interests: [
    { title: 'Scalable oversight of coding agents', text: 'How often long-horizon agents report success they have not verified — an HTTP 200 taken as proof, a test suite that mocks the system under test, an assertion over an empty set — and which oversight protocols catch it, at what cost.' },
    { title: 'AI control for agents with real privileges', text: 'Guards that inspect the thing an irreversible action would destroy, least-privilege credentials, spend ceilings on GPUs and APIs, and ownership rules when several agents edit one repository.' },
    { title: 'Evaluations whose own validity is tested', text: 'Planted-defect and coverage controls, so that a passing result means the behaviour was actually observed.' },
    { title: 'Instruction-following under context pressure', text: 'How standing rules survive compaction and very long sessions.' },
  ],
};

// before → after, measured; each becomes a small chart
export const measured = [
  { id: 'context', title: 'Always-loaded agent instructions', unit: 'tokens', before: 906000, after: 5400, scale: 'log',
    text: 'A self-sustaining compaction loop: about 906K tokens of always-loaded instructions against a ~200K window, re-injected after every compaction. The loader ignored "load on demand" flags (27 of 39 relabelled files were still injected) but respected file location; moving the corpus cut it about 169 times, and a self-testing guard with a planted-difference control now holds it there.' },
  { id: 'latency', product: 'paperclip-agent-control-plane', title: 'Agent concierge reply time', unit: 'seconds', before: [33, 146], after: [9.5, 16.3], scale: 'linear',
    text: 'In a self-hosted Paperclip control plane (118 agents, 199 skills): a re-wake loop started up to four agent runs per message, Opus answered greetings, and adaptive thinking ignored its token budget. Measured, then fixed: greetings moved to Haiku 4.5, the loop closed, and every one of the 118 agents pinned to its configured model.' },
  { id: 'cost', product: 'paperclip-agent-control-plane', title: 'Cost per concierge message', unit: 'US dollars', before: 0.39, after: 0.015, scale: 'log',
    text: 'The same measurement found recovery wakes silently running every agent on Opus whatever its configured model.' },
  { id: 'scan', title: 'Guests the nightly malware scan called clean without scanning', unit: 'guests', before: 91, after: 0, scale: 'linear',
    text: 'A nightly scan had reported "clean" for 91 guests it never scanned. The replacement covers all 107 guests on three hypervisors and counts an unscanned guest as a failure, never as clean.' },
  { id: 'tests', product: 'tennet-io', title: 'Automated tests across Tennet.io’s services', unit: 'tests', before: 703, after: 5500, scale: 'linear',
    text: 'Its 703 passing tests replaced the LLM client, the event bus and the agent framework with mocks, which hid four swallowed exceptions that disconnected the whole agent loop. The loop was restored — one prompt now yields a plan and an agent team in about 42 seconds — and acceptance moved to real-browser user journeys: about 5,500 automated tests across five services.' },
];

// what the CV records about single products beyond their description (the product pages' "On the record")
export const highlights: Record<string, string[]> = {
  'paperclip-agent-control-plane': [
    'A self-hosted Paperclip control plane with 118 configured agents and 199 skills, and a Telegram concierge in front of them.',
    'The concierge’s reply time fell from 33–146 s to 9.5–16.3 s, and its cost from $0.39 to about $0.015 a message, once the time was measured: a re-wake loop started up to four agent runs per message, Opus answered greetings (now Haiku 4.5), and adaptive thinking ignored its token budget.',
    'Recovery wakes were silently running every agent on Opus whatever its configured model; all 118 are now pinned, and verified.',
  ],
  'tennet-io': [
    'Its 703 passing tests had replaced the LLM client, the event bus and the agent framework with mocks — which hid four swallowed exceptions that disconnected the whole agent loop.',
    'With the loop restored, one prompt yields a plan and an agent team in about 42 seconds, and the agents’ code streams live.',
    'Acceptance moved to real-browser user journeys; the codebase now runs about 5,500 automated tests across five services.',
  ],
  'youtube-pro': [
    'Fifteen defects were planted in its monitoring test suite. The one that escaped showed that an assertion two mechanisms can satisfy independently tests neither of them.',
  ],
  'claude-command-center': [
    'Runs on an LLM gateway: Claude Code headless on AWS Bedrock, with a 109-skill library and named sub-agents.',
    'Metered by per-model credits under daily token caps.',
    'Gemini joined as a second provider through an Anthropic-to-Gemini translating proxy, instead of a second runner.',
  ],
  'reelforge': [
    'Its GPU Generative Engine self-hosted an open-weight talking-avatar model, LongCat-Video-Avatar, on an H100 — chosen after EchoMimicV2 was rejected on quality.',
    'The engine carries 200+ verification suites across 11 formats; watching the rendered episodes still found four defect classes they had missed: captions ahead of speech, lip-sync frozen on padded frames, two speakers sharing one voice and a head-cropped frame.',
  ],
  'storeswiki-channels': [
    'Fed by the Unpacked Commentary Engine: n8n and GPUs producing avatar commentary, explainer and news episodes in 11 formats.',
    'Counts the network’s channels on YouTube, Facebook and Instagram every hour, and ranks them by followers and views.',
  ],
};

export const oversightWork = [
  { title: 'A control layer for AI-native operations', text: 'Agent sessions work concurrently in one shared repository and on about 80 production apps under rules I set: ten standing prohibitions (never end a turn with a $3.85-an-hour GPU still running, confirmed against the provider’s API; never delete, unlist or retitle a public video without comparing its live state with our own publish record), file ownership between concurrent sessions, staging-first releases, and verification defined as the running system, rendered, with paired positive and negative controls.' },
  { title: 'Testing the tests', text: 'Planted 15 defects in a monitoring test suite (YouTube Pro); the one that escaped showed that an assertion two mechanisms can satisfy independently tests neither of them.' },
  { title: 'Generative video on GPUs', text: 'Self-hosted an open-weight talking-avatar model (LongCat-Video-Avatar) on an H100 after rejecting EchoMimicV2 on quality. The engine carries 200+ verification suites across 11 formats — and watching the rendered episodes still found four defect classes the suites had missed: captions ahead of speech, lip-sync frozen on padded frames, two speakers sharing one voice, a head-cropped frame.' },
  { title: 'A verified migration at estate scale', text: 'Moved production from AWS to Google Cloud byte-identical — 116 containers on the core host plus 15 other hosts — each signed off by function (database, cache, mail, payments, webhooks) rather than by HTTP status; 115 of the 116 were green within a day. The work ran as parallel agent lanes with written ownership and safety rails.' },
  { title: 'Security, owned', text: 'Daily malware scanning on three hypervisors; found and contained a supply-chain compromise in a purchased Laravel product (a typosquatted Composer package running an outbound SSH brute-forcer through the app’s own scheduler) and made a malware audit of all third-party code mandatory before deployment; cleaned a crypto-mining intrusion on a cloud VM; patched the estate against a pre-auth PHP RCE.' },
];

export type Job = {
  role: string; org: string; where: string; from: string; to: string; country: string[];
  points: string[]; stack: string[]; links?: { label: string; url: string }[];
};

export const experience: Job[] = [
  { role: 'Co-founder, senior full-stack engineer and cloud architect', org: 'StoresWiki LLC', where: 'USA, remote', from: '2024-04', to: 'present', country: ['US', 'IT'],
    points: [
      'Architect and operate the company’s ~80-app estate end to end: the in-house products, the licensed platforms, the commerce ecosystem and 50+ managed open-source services.',
      'Run engineering AI-first: concurrent LLM agent sessions implement under my direction inside a control layer I designed; I set the priorities, review the results and own every production decision.',
      'Lead full-stack development across React, Next.js, Node.js, Python and Laravel; integrated Claude (on Bedrock), Gemini, OpenAI and OpenRouter across the products; moved production off Railway and Vercel onto self-hosted Coolify with zero data loss.',
      'Designed the shared platform: Proxmox/LXC virtualization, shared PostgreSQL, MySQL, MongoDB, Redis and MinIO with per-app isolation, Nginx Proxy Manager and Cloudflare, encrypted multi-leg backups and a Google Cloud standby behind a Cloudflare switch.',
    ],
    stack: ['Next.js', 'React', 'Node.js', 'Python', 'Laravel', 'Claude', 'GCP', 'AWS', 'Proxmox', 'Cloudflare'],
    links: [{ label: 'storeswiki.com', url: 'https://storeswiki.com' }] },
  { role: 'Senior full-stack web developer', org: 'Aller Media AB', where: 'Sweden, on site', from: '2020-04', to: '2025-02', country: ['SE'],
    points: [
      'Built and maintained high-traffic editorial sites for one of the Nordics’ largest media groups.',
      'Migrated WordPress properties to the in-house Labrador CMS and engineered performance features for large audiences in a cross-functional team.',
    ],
    stack: ['JavaScript', 'React', 'Node.js', 'Sass', 'Webpack', 'Gulp', 'Docker', 'AWS', 'MySQL'],
    links: [
      { label: 'mabra.com', url: 'https://www.mabra.com' }, { label: 'allas.se', url: 'https://www.allas.se' },
      { label: 'elle.se', url: 'https://www.elle.se' }, { label: 'hant.se', url: 'https://www.hant.se' },
      { label: 'residencemagazine.se', url: 'https://www.residencemagazine.se' },
    ] },
  { role: 'AWS cloud developer', org: 'Nordic Software Technologies FZE', where: 'UAE, contract, remote', from: '2024-01', to: '2024-03', country: ['AE'],
    points: [
      'Designed AWS infrastructure for a marketplace: EC2 with custom AMIs, launch templates, auto scaling, load balancers and target groups, security groups, subnets and VPC.',
      'Automated CI/CD from GitHub to the servers with CodeDeploy and CodePipeline; configured Node.js and Next.js microservices on Linux behind Nginx and Cloudflare.',
    ],
    stack: ['AWS', 'EC2', 'CodeDeploy', 'CodePipeline', 'Nginx', 'Cloudflare'] },
  { role: 'Tech lead and MERN stack developer', org: 'Nordic Software Technologies / QURB Services', where: 'UAE, contract, remote', from: '2022-11', to: '2024-01', country: ['AE'],
    points: [
      'Led a team of five as tech lead and Azure cloud developer: sprint planning, code review and architecture for a professional-services marketplace.',
      'Built authentication, payments (Stripe, PayPal), email (SES) and media upload (S3) on the MERN stack with Next.js, Express and MongoDB.',
    ],
    stack: ['MongoDB', 'Express', 'React', 'Node.js', 'Next.js', 'Stripe', 'PayPal', 'Azure'] },
  { role: 'Full-stack web developer and DevOps engineer', org: 'ACS AB', where: 'Sweden and Saudi Arabia, remote', from: '2019-09', to: '2022-09', country: ['SE', 'SA'],
    points: [
      'Delivered a services marketplace, an e-learning marketplace and a social network.',
      'Served as DevOps engineer: Jenkins, Ansible, SonarQube, Docker, Tomcat and Azure.',
    ],
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Next.js', 'AWS', 'Jenkins', 'Ansible'],
    links: [{ label: 'rizzq.online', url: 'https://rizzq.online' }] },
  { role: 'Developer and DevOps engineer', org: 'National Incubation Center, Government of Pakistan', where: 'Pakistan', from: '2019-01', to: '2019-09', country: ['PK'],
    points: [
      'Built a Department of Transportation system on Oracle 11g, PL/SQL, Oracle Forms and Reports and APEX, with Git and Jenkins CI/CD on AWS.',
      'Re-architected and migrated ERKP-SMEDA, a World Bank-funded national project: PHP and MySQL, Scriptcase, multi-cloud deployment and data migration.',
    ],
    stack: ['Oracle 11g', 'PL/SQL', 'APEX', 'PHP', 'MySQL', 'Jenkins', 'AWS'],
    links: [{ label: 'smeda.org', url: 'https://smeda.org' }] },
  { role: 'Founder and CEO, full-stack developer', org: 'Code Engineers', where: 'Pakistan', from: '2013', to: '2019', country: ['PK', 'US', 'NZ', 'AF'],
    points: [
      'Founded and ran a software consultancy delivering custom systems for international clients: an e-commerce marketplace (USA), a taxi dispatch system (Invercargill Taxis, New Zealand), a tenders management system (Afghanistan), a stock tracking system (Hi-Q Pharmaceuticals), a government file tracking system, and point-of-sale and inventory systems.',
    ],
    stack: ['C#', 'ASP.NET', 'PHP', 'SQL Server', 'MySQL', 'Azure', 'Firebase', 'Docker'],
    links: [{ label: 'codeengineers.net', url: 'https://codeengineers.net' }, { label: 'taxitime.co.nz', url: 'https://taxitime.co.nz' }] },
];

export const countries: Record<string, { name: string; lat: number; lon: number }> = {
  PK: { name: 'Pakistan', lat: 34.0, lon: 71.5 },
  SE: { name: 'Sweden', lat: 59.3, lon: 18.1 },
  SA: { name: 'Saudi Arabia', lat: 24.7, lon: 46.7 },
  AE: { name: 'United Arab Emirates', lat: 25.2, lon: 55.3 },
  US: { name: 'United States', lat: 39.0, lon: -77.0 },
  NZ: { name: 'New Zealand', lat: -46.4, lon: 168.4 },
  AF: { name: 'Afghanistan', lat: 34.5, lon: 69.2 },
  IT: { name: 'Italy', lat: 37.5, lon: 15.1 },
  GB: { name: 'United Kingdom', lat: 51.5, lon: -0.1 },
  DE: { name: 'Germany', lat: 52.5, lon: 13.4 },
  CH: { name: 'Switzerland', lat: 47.4, lon: 8.5 },
};

// clients' own words, as left on Fiverr (the previous site showed the same four)
export const reviews = [
  { who: 'bhabjinder', country: 'United Kingdom', flag: '🇬🇧', rating: 5, gig: 'Automations & Agents', price: '€200–€400', took: '3 weeks',
    text: 'Majid has been amazing to work with and his delivered product exceeded our expectations. His communication, advice and transparency was excellent. Nothing was too much trouble for Majid and he insisted on going the extra mile to ensure we were happy. Majid will be our go to person for all our future developments and trouble shooting will highly recommend his services. Amazing !!!' },
  { who: 'theoslsapp', country: 'Germany', flag: '🇩🇪', rating: 5, gig: 'Automations & Agents', price: '€50–€100', took: '6 days',
    text: 'Majid delivered on time and went over my expectations he did great work, smooth communication, will definitely work with him again in the future.' },
  { who: 'stampkey', country: 'Switzerland', flag: '🇨🇭', rating: 5, gig: 'Automations & Agents', price: '€100–€200', took: '10 days',
    text: 'Majid was very helpful to setup a Faceless AI Video automation for me. Thank you.' },
  { who: 'amoore9900', country: 'United States', flag: '🇺🇸', rating: 5, gig: 'Automations & Agents', price: '€100–€200', took: '9 days',
    text: 'Was fast and got it done will use again' },
];

// the brands of StoresWiki LLC, in their own words (their sites, 2026-11-14)
export const brands = [
  { key: 'StoresWiki', name: 'StoresWiki LLC', url: 'https://storeswiki.com', role: 'Co-founder',
    text: 'An AI-first software development, solution architecture and cloud engineering company that designs, builds, hosts and operates AI products and solutions at scale — the parent of CabsCloud, Code Engineers, AutoGineer and Market Studio. Also home to the commerce ecosystem, ChannelForge, the network’s channels and the video studios.' },
  { key: 'CabsCloud', name: 'CabsCloud', url: 'https://cabscloud.com', role: 'Architect and operator',
    text: 'Home to the AI products StoresWiki designs, builds and operates — content, video, voice, agents, commerce and automation — on one cloud.' },
  { key: 'Code Engineers', name: 'Code Engineers', url: 'https://codeengineers.net', role: 'Founder and CEO since 2013',
    text: 'The AI-first software studio of StoresWiki: AI products and agents, AI-first software, solution architecture and cloud infrastructure for businesses that need it to work in production, at scale. Founded in 2013 as a consultancy for international clients.' },
  { key: 'AutoGineer', name: 'AutoGineer', url: 'https://autogineer.com', role: 'Architect and builder',
    text: 'The marketplace connecting businesses with AI automation experts — certified specialists for n8n, Make, Zapier and more, a library of ready-to-use workflow templates, escrow-protected delivery — with Autogineer Cloud for one-click hosting.' },
  { key: 'Market Studio', name: 'Market Studio', url: 'https://marketstudio.ai', role: 'Architect and operator',
    text: 'The AI-first product studio of StoresWiki: software development, solution architecture and cloud engineering for SaaS platforms, AI tools, commerce systems and the brands around them — from blank page to paying customers.' },
  { key: 'Media', name: 'The publications', url: 'https://thetechabc.com', role: 'Author and publisher',
    text: 'The Tech ABC (technology, AI and smartphones), INQ Daily (to-the-point news), True or Game (video games) and Syncverge Tech (VPS and edge cloud guides), plus the channels network.' },
] as const;

export const commerce =
  'About 38 deployable components — 10 Laravel back ends, 24 Flutter apps and 3 Next.js storefronts — on shared MySQL, Redis, MinIO/S3, Firebase and Google Maps, with 9 payment gateways and per-app database and cache isolation; 20+ code-signed Android and iOS builds.';

export const oss = ['Chatwoot', 'Ghost', 'Medusa', 'Penpot', 'Twenty CRM', 'Plausible', 'Matomo', 'Mattermost', 'Mautic', 'Odoo', 'ERPNext', 'Nextcloud', 'Directus', 'NocoDB', 'Moodle', 'LibreChat'];

export const teaching = {
  channel: { name: 'YouTube @majidmohmand', url: 'https://www.youtube.com/@majidmohmand', text: 'Free full courses and engineering walkthroughs — about 3,500 subscribers and 400+ videos.' },
  courses: [
    { name: 'AWS DevOps: a complete project, from zero to hero', url: 'https://www.youtube.com/playlist?list=PL1AQyNKNPaHJkCvDu1hVVt6iwjcvbUHwB' },
    { name: 'Azure pipelines: a Node.js deployment to an Azure VM', url: 'https://www.youtube.com/playlist?list=PL1AQyNKNPaHLKZQsverHRKGIq0EHtjYNh' },
    { name: 'AI automation and AI agents', url: 'https://www.youtube.com/playlist?list=PL1AQyNKNPaHIzmgaQGKrEvEuIz4hhbe97' },
  ],
  writing: [
    { name: 'The Tech ABC', url: 'https://thetechabc.com', text: 'Technology news, AI breakthroughs, smartphone reviews and gaming insights.' },
    { name: 'INQ Daily', url: 'https://inqdaily.com', text: 'To-the-point news and analysis on AI, technology, world affairs, health and business.' },
    { name: 'True or Game', url: 'https://trueorgame.com', text: 'Video game news, leaks and rumours, reviews and comparison guides.' },
    { name: 'Syncverge Tech', url: 'https://syncverge.tech', text: 'VPS and edge cloud guides.' },
    { name: 'Medium', url: 'https://medium.com/@majidkhanmohmand', text: 'Engineering articles.' },
  ],
};

export const communities = [
  { group: 'Business and entrepreneurship', items: [
    { name: 'Market Maverick (MKM)', url: 'https://whatsapp.com/channel/0029VayosDMLNSa9rgibaX0H' },
    { name: 'Millionaires Mindset', url: 'https://whatsapp.com/channel/0029VaosSLIFSAtCtIXmbC0E' },
    { name: 'StoresWiki LLC', url: 'https://whatsapp.com/channel/0029Vaytxl759PwQEA7MEk3z' },
    { name: 'MKM Enterprise', url: 'https://whatsapp.com/channel/0029VayzX3HDeON89j5UZ10Z' },
  ] },
  { group: 'Pakistan', items: [
    { name: 'Batman Pakistan', url: 'https://whatsapp.com/channel/0029VatthhYBqbr4Sx3Erf1L' },
    { name: 'MonsterTools', url: 'https://whatsapp.com/channel/0029VayIHbs7oQhUO9IsHM00' },
    { name: 'Secret Pakistan', url: 'https://whatsapp.com/channel/0029Vauzcbo90x2zsSZUyK1M' },
    { name: 'DALLHAM AI Pakistan', url: 'https://whatsapp.com/channel/0029VauFrN7DJ6HAJwAla73z' },
  ] },
  { group: 'Technology and tools', items: [
    { name: 'The Tech ABC WhatsApp API', url: 'https://whatsapp.com/channel/0029Vatxc4KL2ATy0f8QGB1E' },
    { name: 'MEGA COURSE', url: 'https://whatsapp.com/channel/0029VauBiyv3bbV4mnJ7d63S' },
    { name: 'ClickGrow: social media automation', url: 'https://whatsapp.com/channel/0029VayD0iQGE56cPNzrY90r' },
  ] },
  { group: 'Interests', items: [
    { name: 'Game Lovers', url: 'https://whatsapp.com/channel/0029VazdNxrLikg13bzZiO3n' },
    { name: 'Technology Lovers', url: 'https://whatsapp.com/channel/0029VazQM1jJENy3drf3s83D' },
    { name: 'Cricket Lovers', url: 'https://whatsapp.com/channel/0029VazTgFYBA1f0SOpg1y0N' },
    { name: 'News Lovers', url: 'https://whatsapp.com/channel/0029Vav6NJ72phHQtxGIIw0n' },
  ] },
  { group: 'Telegram', items: [{ name: 'MKM HYPE', url: 'https://t.me/MKMEnterprise' }] },
];

export const earlier = [
  { name: 'QURB Services', text: 'A professional-services marketplace (tech lead, 2022–2024).', url: 'https://app.qurbservices.com' },
  { name: 'Rizzq', text: 'A services marketplace (ACS, 2019–2022).', url: 'https://rizzq.online' },
  { name: 'ERKP-SMEDA', text: 'A World Bank-funded national project, re-architected and migrated (2019).', url: 'https://smeda.org' },
  { name: 'Taxi Time', text: 'A taxi dispatch system for Invercargill Taxis, New Zealand (Code Engineers).', url: 'https://taxitime.co.nz' },
  { name: 'Academy', text: 'An e-learning academy for Avry Group.', url: 'https://academy.avrygroup.com' },
  { name: 'Pearl', text: 'Turn the photos from a trip into a living collage on a spinning globe.', url: 'https://pearltrips.com' },
];

export const skills = [
  { area: 'LLMs and agents', items: ['Claude (Claude Code headless, skills, sub-agents; Opus, Sonnet and Haiku on AWS Bedrock)', 'Gemini', 'OpenAI', 'OpenRouter', 'Perplexity', 'xAI Grok', 'LiteLLM', 'CrewAI', 'Dify', 'n8n', 'MCP', 'Kiro', 'context and prompt engineering', 'multi-agent orchestration', 'LLM gateways and credit metering', 'RAG (Dify, pgvector)', 'voice agents (Deepgram, ElevenLabs)', 'self-hosted video models on H100 GPUs', 'Veo'] },
  { area: 'Evaluation and verification', items: ['Puppeteer', 'Playwright', 'Maestro', 'rendered verification', 'paired positive and negative controls', 'planted-defect tests', 'coverage invariants'] },
  { area: 'Security', items: ['Malware triage of third-party code', 'incident response', 'least-privilege IAM', 'key rotation', 'CSP', 'HMAC signing', 'DNS-takeover hygiene'] },
  { area: 'Languages', items: ['TypeScript', 'JavaScript', 'Python', 'PHP', 'C#', 'Dart', 'SQL', 'PL/SQL', 'Bash'] },
  { area: 'Front end', items: ['React 19', 'Next.js 15', 'React Native (Expo)', 'Flutter', 'Angular', 'HTML5', 'CSS3', 'Sass', 'Tailwind', 'Bootstrap', 'Ant Design', 'Webpack'] },
  { area: 'Back end', items: ['Node.js', 'Express', 'NestJS', 'FastAPI', 'Laravel 12', 'ASP.NET', 'GraphQL', 'REST', 'Socket.IO', 'Prisma', 'Drizzle', 'Oracle APEX'] },
  { area: 'Databases', items: ['PostgreSQL 16', 'MySQL 8', 'MariaDB', 'MongoDB 7', 'Redis 7', 'ClickHouse', 'SQL Server', 'Oracle 11g', 'pgvector', 'MinIO/S3'] },
  { area: 'Cloud and DevOps', items: ['Google Cloud', 'AWS (EC2, S3, SES, Bedrock, ALB, Auto Scaling, VPC, CodeDeploy, CodePipeline)', 'Azure', 'Hetzner', 'Nebius GPUs', 'Proxmox', 'Docker', 'Coolify', 'Dokploy', 'Nginx', 'Cloudflare', 'GitHub Actions', 'Jenkins', 'GitLab CI', 'Ansible', 'SonarQube', 'PM2', 'Linux'] },
  { area: 'Payments and CMS', items: ['Stripe (Connect, escrow, webhooks)', 'PayPal', 'Razorpay', 'Paystack', 'Flutterwave', 'WordPress', 'Ghost', 'Directus', 'Odoo', 'ERPNext', 'Labrador CMS'] },
  { area: 'Practices', items: ['Agile', 'Scrum', 'Kanban', 'XP', 'Shape Up', 'microservices', 'containerization', 'spec-driven development', 'staging-first releases', 'disaster recovery with restore proofs', 'team leadership'] },
];

export const education = [
  { degree: 'MSc, Software Engineering', where: 'Sweden, 2021' },
  { degree: 'BSc (Hons), Computer Science', where: 'University of Peshawar, 2012' },
];

export const certifications = ['Microsoft Azure Fundamentals', 'IBM Data Science Professional Certificate', 'Databricks Certified Associate Developer', 'Databricks Unified Data Analytics', 'Databricks ETL Data Extraction', 'Microsoft Solution Framework', 'IBM Business Partner Integrity Training'];

export const languages = [
  { name: 'English', level: 'Native / C2' }, { name: 'Urdu', level: 'Native / C2' }, { name: 'Pashto', level: 'Native' },
  { name: 'Swedish', level: 'Intermediate' }, { name: 'Italian', level: 'Beginner' },
];

export const faq = [
  { q: 'Who is Majid Khan Mohmand?', a: 'A technical founder and senior full-stack and cloud engineer: co-founder of StoresWiki LLC and founder of Code Engineers. Majid has built production software since 2013 — over 150 projects — and operates an estate of about 80 live applications, run with LLM coding agents under the oversight rules Majid designed.' },
  { q: 'What does Majid build?', a: 'AI products and platforms: AutoGineer (an AI-automation marketplace), Autogineer Cloud (one-click VPS hosting), Tennet.io (collaborative AI agent teams), ReelForge and ChannelForge (AI video and self-running channels), Claude Command Center, Content Engine, YouTube Pro, AvatarTunes, Organized Chaos and LeadGen, plus the StoresWiki commerce ecosystem and 50+ managed open-source platforms.' },
  { q: 'How does Majid work with AI agents?', a: 'Agents implement; Majid directs them and owns every production decision. Verification means the running system, rendered, with paired positive and negative controls; irreversible and costly actions have guards; credentials are least-privilege; and agent context is budgeted.' },
  { q: 'What are StoresWiki, CabsCloud, Code Engineers, AutoGineer and Market Studio?', a: 'The brands of StoresWiki LLC, co-founded by Majid in 2024. StoresWiki LLC is the parent company; CabsCloud is home to the AI products it designs, builds and operates; Code Engineers is the consultancy Majid founded in 2013, now its AI-first software studio; AutoGineer is the AI-automation marketplace, with Autogineer Cloud hosting; Market Studio is its AI-first product studio.' },
  { q: 'What are the autonomous video studios?', a: 'Two systems that research a niche, write and animate original episodes on cloud GPUs, check them with a quality critic and publish them on schedule without a person in the loop: the original programme (65 channels, projects 1 to 10) and ChannelForge, the same engine as a product. Every channel is counted every hour on channels.storeswiki.com.' },
  { q: 'Where is Majid based, and how can I hire Majid?', a: 'In Catania, Italy; available remote, or on site in San Francisco or London. Email mohmandkhan@gmail.com, WhatsApp +39 350 827 4261, or hire through Upwork or Fiverr.' },
  { q: 'Which companies has Majid worked with?', a: 'StoresWiki LLC (USA), Aller Media AB (Sweden), Nordic Software Technologies and QURB Services (UAE), ACS AB (Sweden and Saudi Arabia), the National Incubation Center of the Government of Pakistan, international clients of Code Engineers in the USA, New Zealand and Afghanistan, and clients on Fiverr in the UK, Germany, Switzerland and the USA.' },
  { q: 'Which languages does Majid speak?', a: 'English and Urdu (native, C2), Pashto (native), Swedish (intermediate) and Italian (beginner).' },
];
