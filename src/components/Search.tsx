'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface SearchResult {
  title: string;
  section: string;
  slug: string;
  excerpt: string;
  content: string;
}

export function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searchIndex, setSearchIndex] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Load search index
  useEffect(() => {
    fetch('/search-index.json')
      .then(res => res.json())
      .then(data => setSearchIndex(data))
      .catch(() => setSearchIndex([]));
  }, []);

  // Handle keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Focus input when opening
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const searchTerms = query.toLowerCase().split(' ').filter(Boolean);

    // Score and filter results
    const scored = searchIndex
      .map(item => {
        const titleLower = item.title.toLowerCase();
        const contentLower = item.content || '';

        let score = 0;
        let matches = true;

        for (const term of searchTerms) {
          const inTitle = titleLower.includes(term);
          const inContent = contentLower.includes(term);

          if (!inTitle && !inContent) {
            matches = false;
            break;
          }

          // Title matches are worth more
          if (inTitle) score += 10;

          // Count occurrences in content
          const contentMatches = (contentLower.match(new RegExp(term, 'g')) || []).length;
          score += Math.min(contentMatches, 20); // Cap at 20 to prevent bias
        }

        return { item, score, matches };
      })
      .filter(({ matches }) => matches)
      .sort((a, b) => b.score - a.score)
      .slice(0, 15)
      .map(({ item }) => item);

    setResults(scored);
  }, [query, searchIndex]);

  const handleSelect = (result: SearchResult) => {
    const path = result.slug ? `/${result.section}/${result.slug}` : `/${result.section}`;
    router.push(path);
    setIsOpen(false);
    setQuery('');
  };

  return (
    <>
      {/* Search Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-500 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span className="hidden sm:inline">Search</span>
        <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-xs font-mono text-gray-400 bg-gray-200 rounded">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {/* Search Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="min-h-screen px-4 text-center">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/50 transition-opacity"
              onClick={() => setIsOpen(false)}
            />

            {/* Modal */}
            <div className="inline-block w-full max-w-xl my-16 text-left align-middle transition-all transform bg-white shadow-xl rounded-lg overflow-hidden">
              {/* Search Input */}
              <div className="flex items-center border-b border-gray-200 px-4">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type to start searching..."
                  className="flex-1 px-4 py-4 text-gray-900 placeholder-gray-500 focus:outline-none"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <kbd className="px-2 py-1 text-xs font-mono bg-gray-100 rounded">ESC</kbd>
                </button>
              </div>

              {/* Results */}
              <div className="max-h-96 overflow-y-auto">
                {results.length > 0 ? (
                  <ul className="py-2">
                    {results.map((result, index) => (
                      <li key={`${result.section}-${result.slug}-${index}`}>
                        <button
                          onClick={() => handleSelect(result)}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-primary-600 uppercase">
                              {result.section}
                            </span>
                          </div>
                          <div className="font-medium text-gray-900 mt-1">
                            {result.title}
                          </div>
                          {result.excerpt && (
                            <div className="text-sm text-gray-500 mt-1 line-clamp-2">
                              {result.excerpt}
                            </div>
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : query ? (
                  <div className="px-4 py-8 text-center text-gray-500">
                    No results found for &quot;{query}&quot;
                  </div>
                ) : (
                  <div className="px-4 py-8 text-center text-gray-500">
                    Start typing to search...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
