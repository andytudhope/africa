import katex from 'katex';
import type { Root } from 'mdast';
import type { Node, Parent } from 'unist';
import type { Plugin } from 'unified';

// Render during the build so equations work without client-side JavaScript.
export const renderMath: Plugin<[], Root> = () => tree => {
  function transform(node: Node) {
    if ('children' in node) {
      const parent = node as Parent;
      parent.children = parent.children.map(child => {
        if (child.type === 'math' || child.type === 'inlineMath') {
          return {
            type: 'html',
            value: katex.renderToString((child as Node & { value: string }).value, {
              displayMode: child.type === 'math',
              throwOnError: true,
              output: 'htmlAndMathml',
            }),
          };
        }
        transform(child);
        return child;
      });
    }
  }
  transform(tree);
};
