export const SITE = {
  name: 'Ontario Condo Guide',
  tagline: 'Practical resources for condo boards, owners, and property managers.',
  url: 'https://ontariocondoguide.ca',
  description:
    'Independent educational resources on Ontario condo governance — AGMs, elections, proxies, quorum, and meeting templates.',
  disclaimer:
    'Ontario Condo Guide provides general educational information and practical resources. It is not a government website and does not provide legal advice.',
} as const;

export const CATEGORIES = [
  'AGM & Meetings',
  'Voting & Elections',
  'Proxies & Quorum',
  'Board Governance',
  'Owner Resources',
  'Templates & Tools',
  'Digital Voting',
] as const;

export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_META: Record<
  Category,
  { slug: string; description: string; indexPath: string }
> = {
  'AGM & Meetings': {
    slug: 'agm-meetings',
    description: 'Annual general meetings, owners’ meetings, notices, and meeting logistics.',
    indexPath: '/guides#agm-meetings',
  },
  'Voting & Elections': {
    slug: 'voting-elections',
    description: 'Board elections, voting rights, ballots, and election administration.',
    indexPath: '/guides#voting-elections',
  },
  'Proxies & Quorum': {
    slug: 'proxies-quorum',
    description: 'Proxy forms, quorum requirements, and participation tracking.',
    indexPath: '/guides#proxies-quorum',
  },
  'Board Governance': {
    slug: 'board-governance',
    description: 'Director duties, board meetings, minutes, and governance records.',
    indexPath: '/guides#board-governance',
  },
  'Owner Resources': {
    slug: 'owner-resources',
    description: 'Guides for condo owners on meetings, voting, and participation.',
    indexPath: '/guides#owner-resources',
  },
  'Templates & Tools': {
    slug: 'templates-tools',
    description: 'Checklists, agenda templates, and planning tools.',
    indexPath: '/templates',
  },
  'Digital Voting': {
    slug: 'digital-voting',
    description: 'Electronic voting, virtual meetings, and digital participation.',
    indexPath: '/guides/electronic-voting-ontario-condos',
  },
};

export const NAV_LINKS = [
  { href: '/guides', label: 'Guides' },
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
