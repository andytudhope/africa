import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const SECTIONS = ['essays', 'poetry', 'prose', 'academy', 'soul'] as const;
const contentDirectory = path.join(process.cwd(), 'content');
const publicDirectory = path.join(process.cwd(), 'public');

interface SearchIndexItem {
  title: string;
  section: string;
  slug: string;
  excerpt: string;
  content: string; // Full searchable content
}

function generateSearchIndex(): SearchIndexItem[] {
  const index: SearchIndexItem[] = [];

  for (const section of SECTIONS) {
    const sectionPath = path.join(contentDirectory, section);
    if (!fs.existsSync(sectionPath)) continue;

    const files = fs.readdirSync(sectionPath).filter((f) => f.endsWith('.md'));

    for (const file of files) {
      const fullPath = path.join(sectionPath, file);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      const slug = file === 'index.md' ? '' : file.replace(/\.md$/, '');
      const plainText = content
        .replace(/```[\s\S]*?```/g, '')
        .replace(/`[^`]+`/g, '')
        .replace(/!\[.*?\]\(.*?\)/g, '')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/<[^>]+>/g, '')
        .replace(/[#*_~]/g, '')
        .replace(/\n+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase();

      index.push({
        title: data.title || slug || section,
        section,
        slug,
        excerpt: plainText.substring(0, 200),
        content: plainText, // Store full content for searching
      });
    }
  }

  return index;
}

// Generate and write the index
const searchIndex = generateSearchIndex();
fs.writeFileSync(
  path.join(publicDirectory, 'search-index.json'),
  JSON.stringify(searchIndex, null, 2)
);

console.log(`Generated search index with ${searchIndex.length} entries`);
