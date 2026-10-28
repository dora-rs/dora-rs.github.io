export default function remarkBlogLinks() {
  return (tree, file) => {
    const source = file.data.astro?.frontmatter?.blogSource;
    if (!source) return;
    const base = new URL(`docs/blog/${source}`, 'https://repository.invalid/');
    function visit(node) {
      if (['link', 'image', 'definition'].includes(node.type) && node.url &&
          !/^(?:[a-z][a-z\d+.-]*:|\/|#)/i.test(node.url)) {
        const target = new URL(node.url, base);
        const path = target.pathname.slice(1);
        if (/^docs\/blog\/\d{4}-\d{2}-\d{2}-.+\.md$/.test(path)) {
          node.url = `/blog/${path.slice('docs/blog/'.length, -3)}/${target.search}${target.hash}`;
        } else {
          const image = node.type === 'image' || /\.(png|jpe?g|gif|svg|webp|avif)$/i.test(target.pathname);
          const root = image
            ? 'https://raw.githubusercontent.com/dora-rs/dora/main/'
            : `https://github.com/dora-rs/dora/${path.endsWith('/') ? 'tree' : 'blob'}/main/`;
          node.url = `${root}${path}${target.search}${target.hash}`;
        }
      }
      node.children?.forEach(visit);
    }
    visit(tree);
  };
}
