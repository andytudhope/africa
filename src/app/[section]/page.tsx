import { notFound } from 'next/navigation';
import { SECTIONS, Section } from '@/types';
import { getFirstSectionItem } from '@/lib/sections';
import PostPage, { generateMetadata as generatePostMetadata } from './[slug]/page';

interface SectionPageProps {
  params: Promise<{ section: string }>;
}

export function generateStaticParams() {
  return SECTIONS.map(section => ({ section }));
}

async function firstPostParams(params: SectionPageProps['params']) {
  const { section } = await params;
  if (!SECTIONS.includes(section as Section)) notFound();

  const item = getFirstSectionItem(section as Section);
  if (!item) notFound();

  return { section, slug: item.href.split('/').filter(Boolean)[1] };
}

export async function generateMetadata({ params }: SectionPageProps) {
  return generatePostMetadata({ params: firstPostParams(params) });
}

export default async function SectionPage({ params }: SectionPageProps) {
  return PostPage({ params: firstPostParams(params) });
}
