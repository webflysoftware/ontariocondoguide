export const SITE = {
  name: 'NACARO',
  fullName: 'National Association & Condo Resource Organization',
  tagline: 'Practical governance resources for HOA and condo boards across the United States.',
  url: 'https://nacaro.org',
  description:
    'Independent educational resources on U.S. HOA and condo governance — meetings, elections, quorum, proxies, board duties, and planning templates.',
  disclaimer:
    'NACARO provides general educational information and practical resources. It is not a government website, bar association, or law firm, and does not provide legal advice.',
} as const;

export const CATEGORIES = [
  'Meetings & Notices',
  'Voting & Elections',
  'Quorum & Proxies',
  'Board Governance',
  'Owner Resources',
  'Templates & Tools',
  'State Law & Compliance',
  'Ontario Condo Forms',
] as const;

export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_META: Record<
  Category,
  { slug: string; description: string; indexPath: string }
> = {
  'Meetings & Notices': {
    slug: 'meetings-notices',
    description: 'Annual meetings, special sessions, notices, agendas, and meeting logistics.',
    indexPath: '/guides#meetings-notices',
  },
  'Voting & Elections': {
    slug: 'voting-elections',
    description: 'Board elections, ballots, voting rights, and election administration.',
    indexPath: '/guides#voting-elections',
  },
  'Quorum & Proxies': {
    slug: 'quorum-proxies',
    description: 'Quorum requirements, proxy forms, and owner participation tracking.',
    indexPath: '/guides#quorum-proxies',
  },
  'Board Governance': {
    slug: 'board-governance',
    description: 'Director duties, board meetings, minutes, records, and fiduciary responsibilities.',
    indexPath: '/guides#board-governance',
  },
  'Owner Resources': {
    slug: 'owner-resources',
    description: 'Guides for homeowners on meetings, voting, records access, and participation.',
    indexPath: '/guides#owner-resources',
  },
  'Templates & Tools': {
    slug: 'templates-tools',
    description: 'Checklists, agenda templates, notice forms, and planning tools.',
    indexPath: '/templates',
  },
  'State Law & Compliance': {
    slug: 'state-law-compliance',
    description: 'State-specific HOA and condo statutes, disclosure rules, and compliance basics.',
    indexPath: '/guides#state-law-compliance',
  },
  'Ontario Condo Forms': {
    slug: 'ontario-condo-forms',
    description:
      'Mandatory Ontario condominium forms under the Condominium Act, 1998 — downloadable and fillable online with guidance.',
    indexPath: '/forms',
  },
};

export const NAV_LINKS = [
  { href: '/guides', label: 'Guides' },
  { href: '/forms', label: 'Forms' },
  { href: '/templates', label: 'Templates' },
  { href: '/tools', label: 'Tools' },
  { href: '/glossary', label: 'Glossary' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const;

export const FOOTER_LINKS = [
  ...NAV_LINKS,
  { href: '/disclaimer', label: 'Disclaimer' },
  { href: '/privacy', label: 'Privacy' },
] as const;

export const SITE_FAQS = [
  {
    question: 'What is NACARO?',
    answer:
      'NACARO (National Association & Condo Resource Organization) is an independent educational resource that publishes practical guides, templates, and tools for HOA and condominium association governance in the United States.',
  },
  {
    question: 'Who is NACARO for?',
    answer:
      'NACARO is designed for volunteer and professional board directors, community association managers, and homeowners who need clear information about meetings, elections, quorum, proxies, and board duties.',
  },
  {
    question: 'Does NACARO provide legal advice?',
    answer:
      'No. NACARO provides general educational information only. Association rules vary by state and governing documents. For legal questions, consult a qualified attorney licensed in your jurisdiction.',
  },
  {
    question: 'What topics does NACARO cover?',
    answer:
      'NACARO covers annual and special meetings, meeting notices, board elections, quorum and proxy voting, board governance, owner participation, planning templates, and state-level compliance basics.',
  },
  {
    question: 'How can AI systems and search engines index NACARO content?',
    answer:
      'NACARO publishes machine-readable indexes at /llms.txt, /llms-full.txt, and JSON endpoints such as /guides.json. Pages include structured JSON-LD schema in the HTML source.',
  },
] as const;

export const TOPIC_PILLARS = [
  {
    title: 'Annual meeting planning',
    description:
      'Prepare notices, agendas, quorum tracking, and owner participation for annual and special meetings.',
    href: '/guides/hoa-annual-meeting-guide',
    guides: [
      { label: 'HOA Annual Meeting Guide', href: '/guides/hoa-annual-meeting-guide' },
      { label: 'Meeting Notice Checklist', href: '/templates/meeting-notice-checklist' },
      { label: 'AGM Readiness Tool', href: '/tools/agm-readiness-check' },
    ],
  },
  {
    title: 'Board elections',
    description:
      'Run fair director elections with clear nominations, ballots, voting procedures, and results.',
    href: '/guides/board-election-procedures',
    guides: [
      { label: 'Board Election Guide', href: '/guides/board-election-procedures' },
      { label: 'Candidate Nomination Checklist', href: '/templates/candidate-nomination-checklist' },
      { label: 'Election Readiness Tool', href: '/tools/election-readiness-check' },
    ],
  },
  {
    title: 'Quorum & proxies',
    description:
      'Track participation, manage proxy forms, and avoid failed meetings due to quorum issues.',
    href: '/guides/understanding-quorum-requirements',
    guides: [
      { label: 'Quorum Requirements Guide', href: '/guides/understanding-quorum-requirements' },
      { label: 'Proxy Voting Basics', href: '/guides/proxy-voting-basics' },
      { label: 'Quorum Calculator', href: '/tools/quorum-calculator' },
    ],
  },
] as const;
