import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blogFiles = glob({
  pattern: '*.md',
  base: './src/content/blog',
  generateId: ({ entry }) => entry.replace(/\.md$/, ''),
});

const blog = defineCollection({
  loader: {
    ...blogFiles,
    async load(context) {
      // glob() returns early for an empty directory; clear cached posts first
      // so deleting the last source post also removes its published page.
      context.store.clear();
      await blogFiles.load(context);
    },
  },
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    blogSource: z.string(),
  }),
});

export const collections = { blog };
