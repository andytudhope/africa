import type { Heading, Root } from 'mdast';
import type { Plugin } from 'unified';
import type { Node } from 'unist';

type HeadingIdCounts = Map<string, number>;

export function slugifyHeadingText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function getUniqueHeadingId(
  text: string,
  counts: HeadingIdCounts,
  fallback: string
): string {
  const baseId = slugifyHeadingText(text) || fallback;
  const count = counts.get(baseId) ?? 0;
  counts.set(baseId, count + 1);

  return count === 0 ? baseId : `${baseId}-${count + 1}`;
}

function getNodeText(node: Node): string {
  if ('value' in node && typeof node.value === 'string') {
    return node.value;
  }

  if ('children' in node && Array.isArray(node.children)) {
    return node.children.map((child) => getNodeText(child as Node)).join('');
  }

  return '';
}

function walkMarkdownTree(
  node: Node,
  visitor: (node: Node) => void
): void {
  visitor(node);

  if ('children' in node && Array.isArray(node.children)) {
    node.children.forEach((child) => walkMarkdownTree(child as Node, visitor));
  }
}

function isHeading(node: Node): node is Heading {
  return node.type === 'heading';
}

export const addHeadingIds: Plugin<[], Root> = () => {
  return (tree: Root) => {
    const counts: HeadingIdCounts = new Map();
    let fallbackIndex = 0;

    walkMarkdownTree(tree, (node) => {
      if (!isHeading(node)) {
        return;
      }

      const hProperties = node.data?.hProperties as Record<string, unknown> | undefined;
      const existingId = hProperties?.id;

      if (typeof existingId === 'string' && existingId.length > 0) {
        counts.set(existingId, (counts.get(existingId) ?? 0) + 1);
        return;
      }

      const id = getUniqueHeadingId(
        getNodeText(node),
        counts,
        `heading-${fallbackIndex}`
      );

      fallbackIndex += 1;
      node.data = {
        ...node.data,
        hProperties: {
          ...hProperties,
          id,
        },
      };
    });
  };
};
