import { notFound } from 'next/navigation';
import { SECTIONS, Section } from '@/types';
import { getPost, getPostSlugs } from '@/lib/content';
import TableOfContents from '@/components/TableOfContents';

interface PostPageProps {
  params: Promise<{
    section: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const params: { section: string; slug: string }[] = [];

  for (const section of SECTIONS) {
    const slugs = getPostSlugs(section);
    for (const slug of slugs) {
      params.push({ section, slug });
    }
  }

  return params;
}

export async function generateMetadata({ params }: PostPageProps) {
  const { section, slug } = await params;

  if (!SECTIONS.includes(section as Section)) {
    return { title: 'Not Found' };
  }

  const post = await getPost(section as Section, slug);

  if (!post) {
    return { title: 'Not Found' };
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { section, slug } = await params;

  if (!SECTIONS.includes(section as Section)) {
    notFound();
  }

  const post = await getPost(section as Section, slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex gap-8">
        <article className="flex-1 min-w-0 max-w-4xl">
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
        <TableOfContents content={post.content} />
      </div>
    </div>
  );
}
