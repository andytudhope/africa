'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Import JSON data directly - Next.js handles this at build time
import essaysData from '../../content/data/essays.json';
import poetryData from '../../content/data/poetry.json';
import proseData from '../../content/data/prose.json';
import academyData from '../../content/data/academy.json';
import soulData from '../../content/data/soul.json';

interface SectionItem {
  order: number;
  sidebarTitle: string;
  title: string;
  href: string;
  external?: boolean;
}

interface SectionData {
  title: string;
  items: SectionItem[];
}

const SECTION_DATA: Record<string, SectionData> = {
  essays: essaysData as SectionData,
  poetry: poetryData as SectionData,
  prose: proseData as SectionData,
  academy: academyData as SectionData,
  soul: soulData as SectionData,
};

const SECTION_CONFIG: Record<string, { title: string; indexTitle: string; indexHref: string }> = {
  essays: { title: 'Essays', indexTitle: 'Introduction', indexHref: '/essays' },
  poetry: { title: 'Poetry', indexTitle: 'Overview', indexHref: '/poetry' },
  prose: { title: 'Prose', indexTitle: 'Overview', indexHref: '/prose' },
  academy: { title: 'Academic Work', indexTitle: 'Overview', indexHref: '/academy' },
  soul: { title: 'Soul', indexTitle: 'Pearls', indexHref: '/soul' },
};

export function Sidebar() {
  const pathname = usePathname();

  // Don't show sidebar on home page
  if (pathname === '/') return null;

  // Determine current section from pathname
  const currentSectionKey = Object.keys(SECTION_DATA).find(
    key => pathname === `/${key}` || pathname.startsWith(`/${key}/`)
  );

  if (!currentSectionKey) return null;

  const sectionData = SECTION_DATA[currentSectionKey];
  const sectionConfig = SECTION_CONFIG[currentSectionKey];

  // Sort items by order
  const sortedItems = [...sectionData.items].sort((a, b) => a.order - b.order);

  return (
    <aside className="hidden md:flex md:flex-col fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-200">
      {/* Scrollable nav section */}
      <nav className="flex-1 overflow-y-auto p-4">
        {/* Section title */}
        <h2 className="px-3 py-2 text-lg font-medium text-gray-900 mb-2">
          {sectionConfig.title}
        </h2>

        {/* Section items */}
        <div className="space-y-1">
          {/* Index page link */}
          <Link
            href={sectionConfig.indexHref}
            className={`block px-3 py-2 text-sm rounded-md transition-colors
              ${pathname === sectionConfig.indexHref
                ? 'text-primary-600 bg-primary-50 font-medium'
                : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'}`}
          >
            {sectionConfig.indexTitle}
          </Link>

          {/* Content items */}
          {sortedItems.map((item) => (
            item.external ? (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-md"
              >
                {item.sidebarTitle}
                <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 text-sm rounded-md transition-colors
                  ${pathname === item.href
                    ? 'text-primary-600 bg-primary-50 font-medium'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'}`}
              >
                {item.sidebarTitle}
              </Link>
            )
          ))}
        </div>
      </nav>

      {/* Social links at bottom */}
      <div className="flex-shrink-0 p-4 border-t border-gray-200 bg-white">
        <div className="flex justify-center gap-4">
          <a
            href="https://github.com/andytudhope"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-700"
            aria-label="GitHub"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </a>
          <a
            href="https://twitter.com/cryptowanderer"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-700"
            aria-label="Twitter"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </a>
        </div>
      </div>
    </aside>
  );
}
