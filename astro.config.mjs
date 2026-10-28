import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import remarkBlogLinks from './scripts/remark-blog-links.mjs';

export default defineConfig({
  site: 'https://dora-rs.ai',
  base: '/',
  markdown: { remarkPlugins: [remarkBlogLinks] },
  integrations: [sitemap(), react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
