export interface NavItem {
  title: string;
  href: string;
}

export interface PostMeta {
  title: string;
  description?: string;
  image?: string;
  slug: string;
  section: string;
}

export interface Post extends PostMeta {
  content: string;
}

export const SECTIONS = ['essays', 'poetry', 'prose', 'academy', 'soul'] as const;
export type Section = typeof SECTIONS[number];

// Top-level navigation items (sidebar content comes from JSON files)
export const NAV_STRUCTURE: NavItem[] = [
  { title: 'Home', href: '/' },
  { title: 'Essays', href: '/essays' },
  { title: 'Poetry', href: '/poetry' },
  { title: 'Prose', href: '/prose' },
  { title: 'Academic Work', href: '/academy' },
  { title: 'Soul', href: '/soul' },
];
