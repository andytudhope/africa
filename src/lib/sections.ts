import essays from '../../content/data/essays.json';
import poetry from '../../content/data/poetry.json';
import prose from '../../content/data/prose.json';
import academy from '../../content/data/academy.json';
import soul from '../../content/data/soul.json';
import type { Section } from '@/types';

export const SECTION_DATA = { essays, poetry, prose, academy, soul };

export function getFirstSectionItem(section: Section) {
  return [...SECTION_DATA[section].items]
    .sort((a, b) => a.order - b.order)
    .find(item => !('external' in item && item.external));
}
