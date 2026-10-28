// Run against `npm run preview -- --host 127.0.0.1` after a production build.
import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const base = process.env.TEST_URL || 'http://127.0.0.1:4321';
const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto(`${base}/blog/`);
  const posts = page.locator('article h2 a');
  assert.ok(await posts.count() > 0);
  const postLinks = await posts.evaluateAll((links) => links.map((link) => link.getAttribute('href')));
  let totalDiagrams = 0;
  for (const postLink of postLinks) {
    await page.goto(`${base}${postLink}`);
    assert.equal(await page.locator('h1').count(), 1);
    assert.ok(await page.locator('.blog-prose p').count() > 0);
    const diagramCount = await page.locator('pre[data-language="mermaid"] code').count();
    if (diagramCount) {
      await page.waitForFunction((count) => document.querySelectorAll('figure.mermaid svg').length === count, diagramCount);
    }
    totalDiagrams += diagramCount;
    assert.ok(await page.locator('a[href^="https://github.com/dora-rs/dora/blob/main/docs/"]').count() > 0);
    assert.equal(await page.locator('.blog-prose a[href^="../"]').count(), 0);
    for (const width of [390, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      for (const theme of ['dark', 'light']) {
        await page.evaluate((value) => document.documentElement.setAttribute('data-theme', value), theme);
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth && document.querySelector('body > header').scrollWidth <= window.innerWidth));
      }
    }
  }
  await page.goto(`${base}/`);
  await page.getByRole('link', { name: 'Blog', exact: true }).first().click();
  await page.waitForURL('**/blog/');
  assert.deepEqual(errors, []);
  console.log(`Blog browser checks passed; ${totalDiagrams} Mermaid diagrams rendered.`);
} finally {
  await browser.close();
}
