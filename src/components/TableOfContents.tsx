'use client';

import { useEffect, useState } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Extract headings from HTML content
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const headingElements = doc.querySelectorAll('h1, h2, h3');

    const items: TocItem[] = [];
    headingElements.forEach((heading, index) => {
      const text = heading.textContent || '';
      // Create ID from heading text
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') || `heading-${index}`;

      items.push({
        id,
        text,
        level: parseInt(heading.tagName[1]),
      });
    });

    setHeadings(items);
  }, [content]);

  useEffect(() => {
    // Add IDs to actual headings in the DOM
    const articleHeadings = document.querySelectorAll('article h1, article h2, article h3');
    articleHeadings.forEach((heading, index) => {
      const text = heading.textContent || '';
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') || `heading-${index}`;
      heading.id = id;
    });

    // Set up intersection observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -80% 0px' }
    );

    articleHeadings.forEach((heading) => {
      observer.observe(heading);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) {
    return null;
  }

  return (
    <nav className="hidden lg:block sticky top-24 w-64 max-h-[calc(100vh-8rem)] overflow-y-auto pl-8 border-l border-gray-200 flex-shrink-0">
      <h4 className="text-sm font-semibold text-gray-900 mb-4">On this page</h4>
      <ul className="space-y-2 text-sm list-none p-0 m-0">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className="m-0 p-0"
            style={{ paddingLeft: `${(heading.level - 1) * 0.75}rem` }}
          >
            <a
              href={`#${heading.id}`}
              className={`block py-1 transition-colors no-underline ${
                activeId === heading.id
                  ? 'text-primary-500 font-medium'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById(heading.id);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                  setActiveId(heading.id);
                }
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
