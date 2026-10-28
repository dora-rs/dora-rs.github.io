# dora website

Astro website deployed to GitHub Pages.

## Development

```sh
npm ci
git clone --depth 1 --filter=blob:none --sparse https://github.com/dora-rs/dora.git .blog-source
git -C .blog-source sparse-checkout set docs/blog
npm run dev
```

If you already have a dora checkout, set `BLOG_SOURCE_DIR` to its `docs/blog`
directory instead of cloning it:

```sh
BLOG_SOURCE_DIR=/path/to/dora/docs/blog npm run dev
BLOG_SOURCE_DIR=/path/to/dora/docs/blog npm run build
```

Run `npm test` for the blog import and link regression tests. After building,
start `npm run preview -- --host 127.0.0.1` and run `npm run test:browser` for
browser checks (requires Playwright Chromium).

## Blog

Write posts in **dora-rs/dora**, under `docs/blog/YYYY-MM-DD-slug.md`, with
an H1 title followed by an introductory paragraph. No frontmatter is required.
The filename supplies the publication date and stable `/blog/YYYY-MM-DD-slug/`
URL. All dated posts in that folder are published; keep drafts elsewhere.

Before development or builds, the import script generates an ignored content
collection with titles, dates and excerpts. It does not modify the originals.
Articles support syntax highlighting, tables, heading anchors and Mermaid
fences. Relative documentation and example links point back to the source
repository; links to other posts stay on the website.

The Pages workflow checks out `docs/blog` from dora's `main` branch on every
build. It runs on website pushes or via
**Actions → Deploy to GitHub Pages → Run workflow**. The dora repository's
`website-blog.yml` workflow dispatches it whenever `docs/blog/**` changes on
`main`, so posts appear after the normal build and deployment time. See
[dora's setup instructions](https://github.com/dora-rs/dora/blob/main/docs/website-blog.md)
for the required `WEBSITE_DISPATCH_TOKEN` secret in the dora repository.
