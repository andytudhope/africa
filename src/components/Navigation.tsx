'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_STRUCTURE, type Section } from '@/types';
import { SECTION_DATA, getFirstSectionItem } from '@/lib/sections';
import { Search } from './Search';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.nav-menu') && !target.closest('.menu-button')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Title */}
          <Link href="/" className="flex items-center gap-3">
            <img src="/images/home/enso.png" alt="Enso" className="h-10 w-auto" />
            <span className="font-medium text-gray-900 hidden sm:inline">A Simple Path</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_STRUCTURE.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`px-4 py-2 text-sm font-medium transition-colors
                    ${isActive ? 'text-primary-500' : 'text-gray-700 hover:text-primary-500'}`}
                >
                  {item.title}
                </Link>
              );
            })}
          </div>

          {/* Search */}
          <div className="hidden md:block">
            <Search />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="menu-button md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div id="mobile-navigation" className="nav-menu md:hidden max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-gray-200 py-4">
            <div className="mb-4">
              <Search />
            </div>
            <div className="space-y-1">
              {NAV_STRUCTURE.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                const sectionKey = item.href.slice(1);
                const section = sectionKey in SECTION_DATA ? sectionKey as Section : null;
                const sectionItems = isActive && section
                  ? [...SECTION_DATA[section].items].sort((a, b) => a.order - b.order)
                  : [];
                const firstItem = section ? getFirstSectionItem(section) : undefined;
                return (
                  <div key={item.title}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-2 text-sm font-medium transition-colors
                      ${isActive ? 'text-primary-500' : 'text-gray-700 hover:text-primary-500'}`}
                  >
                    {item.title}
                  </Link>
                  {sectionItems.length > 0 && (
                    <ul className="ml-4 space-y-1 border-l border-gray-200 pl-3">
                      {sectionItems.map((sectionItem) => {
                        const isCurrent = pathname === sectionItem.href ||
                          (pathname === item.href && sectionItem.href === firstItem?.href);
                        const className = `block rounded-md px-4 py-2 text-sm transition-colors ${
                          isCurrent
                            ? 'text-primary-600 bg-primary-50 font-medium'
                            : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                        }`;

                        return (
                          <li key={sectionItem.href}>
                            {'external' in sectionItem && sectionItem.external ? (
                              <a href={sectionItem.href} target="_blank" rel="noopener noreferrer" className={className} onClick={() => setIsMenuOpen(false)}>
                                {sectionItem.sidebarTitle}
                                <span className="ml-1" aria-label="(opens in a new tab)">↗</span>
                              </a>
                            ) : (
                              <Link href={sectionItem.href} className={className} aria-current={isCurrent ? 'page' : undefined} onClick={() => setIsMenuOpen(false)}>
                                {sectionItem.sidebarTitle}
                              </Link>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
