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
