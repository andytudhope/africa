import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';
import { SECTIONS, Section } from '@/types';

interface SectionPageProps {
  params: Promise<{
    section: string;
  }>;
}

interface SectionItem {
  order: number;
  title: string;
  description: string;
  image: string;
  href: string;
  external?: boolean;
}

interface SectionData {
  title: string;
  description?: string;
  items: SectionItem[];
}

interface MarkdownData {
  title: string;
  content: string;
}

export async function generateStaticParams() {
  return SECTIONS.map((section) => ({
    section,
  }));
}

function getSectionData(section: Section): SectionData | null {
  const dataPath = path.join(process.cwd(), 'content', 'data', `${section}.json`);

  if (!fs.existsSync(dataPath)) return null;

  const fileContents = fs.readFileSync(dataPath, 'utf8');
  return JSON.parse(fileContents);
}

async function getMarkdownContent(section: Section): Promise<MarkdownData | null> {
  const mdPath = path.join(process.cwd(), 'content', section, 'index.md');

  if (!fs.existsSync(mdPath)) return null;

  const fileContents = fs.readFileSync(mdPath, 'utf8');
  const { data, content } = matter(fileContents);

  const processedContent = await remark()
    .use(gfm)
    .use(html, { sanitize: false })
    .process(content);

  return {
    title: data.title || section,
    content: processedContent.toString(),
  };
}

export async function generateMetadata({ params }: SectionPageProps) {
  const { section } = await params;

  if (!SECTIONS.includes(section as Section)) {
    return { title: 'Not Found' };
  }

  // Soul section uses markdown
  if (section === 'soul') {
    const mdData = await getMarkdownContent(section as Section);
    return {
      title: mdData?.title || 'Soul',
    };
  }

  const data = getSectionData(section as Section);

  return {
    title: data?.title || section,
    description: data?.description,
  };
}

export default async function SectionPage({ params }: SectionPageProps) {
  const { section } = await params;

  if (!SECTIONS.includes(section as Section)) {
    notFound();
  }

  // Soul section renders markdown content
  if (section === 'soul') {
    const mdData = await getMarkdownContent(section as Section);

    if (!mdData) {
      notFound();
    }

    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: mdData.content }}
        />
      </div>
    );
  }

  const data = getSectionData(section as Section);

  if (!data) {
    notFound();
  }

  // Sort items by order field
  const sortedItems = [...data.items].sort((a, b) => (a.order || 0) - (b.order || 0));

  // Filter out external links for index page cards (they show in sidebar only)
  const cardItems = sortedItems.filter(item => !item.external);

  const hasDescriptions = cardItems.some(item => item.description && item.description.length > 0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-light text-gray-600 mb-2">{data.title}</h1>
      {data.description && (
        <p className="text-gray-500 mb-8">{data.description}</p>
      )}

      {hasDescriptions ? (
        // Cards with descriptions (essays, prose, academy style)
        <div className="space-y-6">
          {cardItems.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-6 overflow-hidden"
            >
              <div className="md:flex md:gap-6 md:items-center">
                {item.image && (
                  <div className="md:w-1/4 mb-4 md:mb-0 flex-shrink-0 flex items-center justify-center">
                    <div className="w-full h-40 flex items-center justify-center">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="max-w-full max-h-40 rounded-md object-contain"
                      />
                    </div>
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                  {item.href.startsWith('http') ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-6 py-2 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      Read More
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="inline-block px-6 py-2 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      Read More
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Grid cards without descriptions (poetry, soul style)
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cardItems.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-4 text-center flex flex-col"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {item.title}
              </h3>
              {item.image && (
                <div className="w-full h-48 flex items-center justify-center mb-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="max-w-full max-h-48 rounded-md object-contain"
                  />
                </div>
              )}
              {item.href.startsWith('http') ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-2 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors mt-auto"
                >
                  Read It
                </a>
              ) : (
                <Link
                  href={item.href}
                  className="inline-block px-6 py-2 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors mt-auto"
                >
                  Read It
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
