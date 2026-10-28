import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtemp, mkdir, writeFile, readFile, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { importBlog } from '../scripts/import-blog.mjs';
import remarkBlogLinks from '../scripts/remark-blog-links.mjs';

test('imports dated Markdown without changing the source; removes stale posts', async () => {
  const root = await mkdtemp(join(tmpdir(), 'dora-blog-'));
  try {
    const source = join(root, 'source');
    const output = join(root, 'output');
    await mkdir(source);
    await mkdir(output);
    const markdown = '# Hello dora\n\nA post about robotics.\n\n```rust\nlet x = 1;\n```\n';
    await writeFile(join(source, '2026-09-02-hello.md'), markdown);
    await writeFile(join(source, 'README.md'), '# Instructions');
    await writeFile(join(output, 'stale.md'), '# Old post');
    await mkdir(join(source, 'images'));
    await writeFile(join(source, 'images', 'diagram.svg'), '<svg xmlns="http://www.w3.org/2000/svg"/>');
    await importBlog(source, output, join(root, 'assets'));
    assert.deepEqual(await readdir(output), ['2026-09-02-hello.md']);
    assert.match(await readFile(join(root, 'assets', 'diagram.svg'), 'utf8'), /<svg/);
    const generated = await readFile(join(output, '2026-09-02-hello.md'), 'utf8');
    assert.match(generated, /title: "Hello dora"/);
    assert.match(generated, /date: "2026-09-02"/);
    assert.match(generated, /description: "A post about robotics\."/);
    assert.match(generated, /```rust\nlet x = 1;/);
    assert.doesNotMatch(generated, /\n# Hello dora/);
    assert.equal(await readFile(join(source, '2026-09-02-hello.md'), 'utf8'), markdown);
    await assert.rejects(importBlog(join(root, 'missing'), output, join(root, 'assets')));
    assert.deepEqual(await readdir(output), ['2026-09-02-hello.md']);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test('rewrites repository links, images, references and sibling posts; preserves anchors and code', () => {
  const nodes = [
    { type: 'link', url: '../api-rust.md#stability' },
    { type: 'image', url: './images/diagram.png' },
    { type: 'definition', url: '../../examples/rust-dataflow/' },
    { type: 'link', url: './2026-09-02-hello.md#intro' },
    { type: 'link', url: '#intro' },
    { type: 'link', url: 'https://example.com' },
    { type: 'code', value: '[sample](../api-rust.md)' },
  ];
  const tree = { type: 'root', children: nodes };
  const transform = remarkBlogLinks();
  transform(tree, { data: { astro: { frontmatter: { blogSource: '2026-10-28-post.md' } } } });
  assert.equal(nodes[0].url, 'https://github.com/dora-rs/dora/blob/main/docs/api-rust.md#stability');
  assert.equal(nodes[1].url, '/blog/images/diagram.png');
  assert.equal(nodes[2].url, 'https://github.com/dora-rs/dora/tree/main/examples/rust-dataflow/');
  assert.equal(nodes[3].url, '/blog/2026-09-02-hello/#intro');
  assert.equal(nodes[4].url, '#intro');
  assert.equal(nodes[5].url, 'https://example.com');
  assert.equal(nodes[6].value, '[sample](../api-rust.md)');
  const other = { type: 'link', url: '../untouched.md' };
  transform(other, { data: {} });
  assert.equal(other.url, '../untouched.md');
});

test('deleting the last post clears the generated collection', async () => {
  const root = await mkdtemp(join(tmpdir(), 'dora-blog-empty-'));
  try {
    const source = join(root, 'source');
    const output = join(root, 'output');
    await mkdir(source);
    await mkdir(output);
    await writeFile(join(output, '2026-09-02-deleted.md'), '# Deleted post');
    await mkdir(join(root, 'assets'));
    await writeFile(join(root, 'assets', 'stale.svg'), '<svg/>');
    await importBlog(source, output, join(root, 'assets'));
    assert.deepEqual(await readdir(output), []);
    await assert.rejects(readdir(join(root, 'assets')), { code: 'ENOENT' });
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
