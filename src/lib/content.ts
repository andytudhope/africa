import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';
import { Post, PostMeta, Section, SECTIONS } from '@/types';

const contentDirectory = path.join(process.cwd(), 'content');

// Process markdown inside <div markdown="1"> tags (MkDocs convention)
async function processMarkdownDivs(content: string): Promise<string> {
  const divRegex = /<div\s+markdown="1"\s+class="([^"]+)">([\s\S]*?)<\/div>/g;
  const matches = [...content.matchAll(divRegex)];

  let result = content;
  for (const match of matches) {
    const [fullMatch, className, innerContent] = match;
    // Process the inner markdown content
    const processed = await remark()
      .use(gfm)
      .use(html, { sanitize: false })
      .process(innerContent.trim());

    // Replace with processed HTML inside the div (without markdown="1")
    const replacement = `<div class="${className}">${processed.toString()}</div>`;
    result = result.replace(fullMatch, replacement);
  }

  return result;
}

export function getPostSlugs(section: Section): string[] {
  const sectionPath = path.join(contentDirectory, section);
  if (!fs.existsSync(sectionPath)) return [];

  return fs.readdirSync(sectionPath)
    .filter(file => file.endsWith('.md') && file !== 'index.md')
    .map(file => file.replace(/\.md$/, ''));
}

export function getAllPosts(): PostMeta[] {
  const posts: PostMeta[] = [];

  for (const section of SECTIONS) {
    const slugs = getPostSlugs(section);
    for (const slug of slugs) {
      const meta = getPostMeta(section, slug);
      if (meta) posts.push(meta);
    }
  }

  return posts;
}

export function getPostMeta(section: Section, slug: string): PostMeta | null {
  const fullPath = path.join(contentDirectory, section, `${slug}.md`);

  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data } = matter(fileContents);

  return {
    title: data.title || slug,
    description: data.description,
    image: data.image,
    slug,
    section,
  };
}

export async function getPost(section: Section, slug: string): Promise<Post | null> {
  const fullPath = path.join(contentDirectory, section, `${slug}.md`);

  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  // Process markdown - fix image paths and convert to HTML
  let processedContent = content
    // Fix local image paths
    .replace(/!\[([^\]]*)\]\(\.\/img\/([^)]+)\)/g, `![$1](/images/${section}/$2)`)
    .replace(/!\[([^\]]*)\]\(\.\.\/assets\/([^)]+)\)/g, '![$1](/images/$2)')
    // Handle HTML img tags with local paths
    .replace(/src="\.\/img\/([^"]+)"/g, `src="/images/${section}/$1"`)
    .replace(/src="\.\.\/assets\/([^"]+)"/g, 'src="/images/$1"')
    // Fix internal links - remove .md extension
    .replace(/\]\(\.\/([^)]+)\.md\)/g, `](/${section}/$1)`)
    .replace(/\]\(\.\/([^)]+)\)/g, (match, p1) => {
      if (p1.includes('.')) return match; // Keep file extensions
      return `](/${section}/${p1})`;
    });

  // Process markdown inside <div markdown="1"> tags first
  processedContent = await processMarkdownDivs(processedContent);

  const processedHtml = await remark()
    .use(gfm)
    .use(html, { sanitize: false })
    .process(processedContent);

  return {
    title: data.title || slug,
    description: data.description,
    image: data.image,
    slug,
    section,
    content: processedHtml.toString(),
  };
}

export async function getSectionIndex(section: Section): Promise<{ content: string; title: string; description?: string } | null> {
  const fullPath = path.join(contentDirectory, section, 'index.md');

  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  // Process markdown
  let processedContent = content
    .replace(/!\[([^\]]*)\]\(\.\/img\/([^)]+)\)/g, `![$1](/images/${section}/$2)`)
    .replace(/!\[([^\]]*)\]\(\.\.\/assets\/([^)]+)\)/g, '![$1](/images/$2)')
    .replace(/src="\.\/img\/([^"]+)"/g, `src="/images/${section}/$1"`)
    .replace(/src="\.\.\/assets\/([^"]+)"/g, 'src="/images/$1"');

  // Process markdown inside <div markdown="1"> tags first
  processedContent = await processMarkdownDivs(processedContent);

  const processedHtml = await remark()
    .use(gfm)
    .use(html, { sanitize: false })
    .process(processedContent);

  return {
    title: data.title || section,
    description: data.description,
    content: processedHtml.toString(),
  };
}

export function generateSearchIndex(): { title: string; section: string; slug: string; excerpt: string }[] {
  const index: { title: string; section: string; slug: string; excerpt: string }[] = [];

  for (const section of SECTIONS) {
    const sectionPath = path.join(contentDirectory, section);
    if (!fs.existsSync(sectionPath)) continue;

    const files = fs.readdirSync(sectionPath).filter(f => f.endsWith('.md'));

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
        .trim();

      index.push({
        title: data.title || slug || section,
        section,
        slug,
        excerpt: plainText.substring(0, 200),
      });
    }
  }

  return index;
}
