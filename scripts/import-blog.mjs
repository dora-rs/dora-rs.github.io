import { readdir, readFile, mkdir, rm, writeFile, cp } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

// Keep docs/blog as the single source. Only generated copies receive frontmatter.
export async function importBlog(source, output = 'src/content/blog', assetsOutput = 'public/blog/images') {
  const entries = await readdir(source);
  const names = entries.filter((name) => /^\d{4}-\d{2}-\d{2}-.+\.md$/.test(name));
  const posts = await Promise.all(names.map(async (name) => {
    const markdown = await readFile(join(source, name), 'utf8');
    const heading = /^# (.+)\r?$/m.exec(markdown);
    if (!heading) throw new Error(`Missing H1 title in ${name}`);
    const body = markdown.replace(heading[0], '').trim();
    const description = body.split(/\r?\n\s*\r?\n/)[0].replace(/\s+/g, ' ').slice(0, 240);
    const date = name.slice(0, 10);
    if (new Date(`${date}T00:00:00Z`).toISOString().slice(0, 10) !== date) {
      throw new Error(`Invalid date in ${name}`);
    }
    const metadata = { title: heading[1], date, description, blogSource: name };
    const frontmatter = Object.entries(metadata).map(([key, value]) => `${key}: ${JSON.stringify(value)}`).join('\n');
    return { name, content: `---\n${frontmatter}\n---\n\n${body}\n` };
  }));
  // Read and validate everything before replacing the previous import.
  await rm(output, { recursive: true, force: true });
  await mkdir(output, { recursive: true });
  await rm(assetsOutput, { recursive: true, force: true });
  if (entries.includes('images')) {
    await cp(join(source, 'images'), assetsOutput, { recursive: true });
  }
  await Promise.all(posts.map(({ name, content }) => writeFile(join(output, name), content)));
  console.log(`Imported ${posts.length} blog post(s) from ${source}`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  await importBlog(process.env.BLOG_SOURCE_DIR || '.blog-source/docs/blog');
}
