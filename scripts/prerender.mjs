// Build-time headless prerender for the Vite SPA.
//
// After `vite build`, this script serves dist/ locally, loads each route in a
// headless Chromium, lets React render, and writes the resulting full HTML back
// to dist/<route>/index.html. Crawlers (GPTBot/OAI-SearchBot) and any non-JS
// client then receive complete page content + per-page <head> meta in the
// initial HTML. The client bundle is unchanged and hydrates this markup.
//
// The visible design is NOT changed: the only normalization is removing the
// IntersectionObserver reveal class `is-visible` inside #root so the static
// markup matches React's initial render exactly (prevents hydration mismatch).

import http from 'node:http';
import { createReadStream, existsSync, statSync, readFileSync, readdirSync, mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, '..', 'dist');
const PORT = 4321;

// Static routes to prerender — mirror the non-blog <Route> list in src/App.tsx
// (the catch-all "*" / 404 is intentionally excluded).
const STATIC_ROUTES = [
  '/',
  '/diensten',
  '/onze-visie',
  '/over-ons',
  '/platform',
  '/zo-werkt-het',
  '/producten',
  '/projecten',
  '/blog',
  '/algemene-voorwaarden',
  '/privacyverklaring',
  '/cookiebeleid',
];

// ---- Blog posts (Markdown content collection) ------------------------------
// Articles live as Markdown files with frontmatter in src/content/blog/. We
// parse just enough frontmatter here (slug, draft, dates) so every PUBLISHED
// article is automatically prerendered and added to the sitemap. Adding a new
// .md file therefore needs NO change to this script. Drafts are skipped.
const BLOG_DIR = path.resolve(__dirname, '..', 'src', 'content', 'blog');
const BASE_URL = 'https://www.nursitree.com';

function parseFrontmatterNode(raw) {
  const m = /^---\s*\r?\n([\s\S]*?)\r?\n---/.exec(raw);
  if (!m) return {};
  const data = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = /^([A-Za-z0-9_]+):\s*(.*)$/.exec(line);
    if (!kv) continue;
    let v = kv[2].trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    if (v === 'true') v = true;
    else if (v === 'false') v = false;
    data[kv[1]] = v;
  }
  return data;
}

function loadBlogPosts() {
  if (!existsSync(BLOG_DIR)) return [];
  return readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.md') && f !== 'BLOG_GUIDE.md')
    .map((f) => {
      const fm = parseFrontmatterNode(readFileSync(path.join(BLOG_DIR, f), 'utf8'));
      const slug = (typeof fm.slug === 'string' && fm.slug) || f.replace(/\.md$/i, '');
      return {
        slug,
        draft: fm.draft === true,
        title: typeof fm.title === 'string' ? fm.title : '',
        publishedAt: typeof fm.publishedAt === 'string' ? fm.publishedAt : '',
        updatedAt: typeof fm.updatedAt === 'string' ? fm.updatedAt : '',
      };
    })
    .filter((p) => p.title && !p.draft);
}

const BLOG_POSTS = loadBlogPosts();
const ROUTES = [...STATIC_ROUTES, ...BLOG_POSTS.map((p) => `/blog/${p.slug}`)];

// Inject blog URLs into the built sitemap (dist/sitemap.xml — copied from
// public/ by Vite). The static site URLs already live in public/sitemap.xml;
// here we append /blog and one entry per published post (with <lastmod>).
function writeSitemap() {
  const sitemapPath = path.join(DIST, 'sitemap.xml');
  if (!existsSync(sitemapPath)) {
    console.warn('  ! sitemap.xml not found in dist/ — skipping blog sitemap injection');
    return;
  }
  let xml = readFileSync(sitemapPath, 'utf8');
  const entries = [];
  entries.push(
    `  <url>\n    <loc>${BASE_URL}/blog</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`
  );
  for (const p of BLOG_POSTS) {
    const lastmod = (p.updatedAt || p.publishedAt || '').slice(0, 10);
    entries.push(
      `  <url>\n    <loc>${BASE_URL}/blog/${p.slug}</loc>` +
        (lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : '') +
        `\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`
    );
  }
  xml = xml.replace('</urlset>', `${entries.join('\n')}\n</urlset>`);
  writeFileSync(sitemapPath, xml, 'utf8');
  console.log(`  ✓ sitemap.xml updated (+${BLOG_POSTS.length} blog post(s), +1 overview)`);
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.webmanifest': 'application/manifest+json',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
};

// The original empty shell — served as the SPA fallback for every route so the
// app always boots from a clean state (never from already-prerendered output).
const shell = readFileSync(path.join(DIST, 'index.html'), 'utf8');

function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
      const ext = path.extname(urlPath);
      const filePath = path.join(DIST, urlPath);
      // Serve real static assets (anything with an extension that exists on disk).
      if (ext && existsSync(filePath) && statSync(filePath).isFile()) {
        res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
        createReadStream(filePath).pipe(res);
        return;
      }
      // Everything else (route navigations) → SPA shell.
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(shell);
    });
    server.listen(PORT, '127.0.0.1', () => resolve(server));
  });
}

async function prerender() {
  const server = await startServer();

  // Browser launch strategy:
  // - Locally: set PUPPETEER_EXECUTABLE_PATH to an installed Chrome/Chromium.
  // - On Vercel/CI: use @sparticuz/chromium, a Chromium build that runs in
  //   minimal environments WITHOUT the system shared libraries (libnspr4.so,
  //   libnss3, …) that the default puppeteer download requires.
  const localExecutable = process.env.PUPPETEER_EXECUTABLE_PATH;
  const launchOptions = localExecutable
    ? {
        headless: true,
        executablePath: localExecutable,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
      }
    : {
        headless: true,
        executablePath: await chromium.executablePath(),
        args: chromium.args,
      };
  const browser = await puppeteer.launch(launchOptions);

  let failed = 0;
  for (const route of ROUTES) {
    const page = await browser.newPage();
    try {
      // Don't block on remote images/fonts/media (CDN assets) — the <img> tags
      // stay in the HTML; we just don't wait for the bytes.
      await page.setRequestInterception(true);
      page.on('request', (r) => {
        const t = r.resourceType();
        if (t === 'image' || t === 'media' || t === 'font') r.abort();
        else r.continue();
      });

      await page.goto(`http://127.0.0.1:${PORT}${route}`, { waitUntil: 'domcontentloaded', timeout: 30000 });

      // Wait until React has rendered real content into #root.
      await page.waitForFunction(
        () => {
          const root = document.getElementById('root');
          return root && root.innerText && root.innerText.trim().length > 200;
        },
        { timeout: 30000 }
      );
      // Small settle so the SEO effect flushes per-page <head> meta/title.
      await new Promise((r) => setTimeout(r, 400));

      // Normalize: remove the post-mount reveal class so static markup == React's
      // initial render (no hydration mismatch). Visible behavior is unchanged —
      // the client re-adds is-visible on scroll exactly as before.
      await page.evaluate(() => {
        document.querySelectorAll('#root .animate-on-scroll.is-visible')
          .forEach((el) => el.classList.remove('is-visible'));
      });

      const html = '<!DOCTYPE html>\n' + (await page.evaluate(() => document.documentElement.outerHTML));

      const outDir = route === '/' ? DIST : path.join(DIST, route);
      mkdirSync(outDir, { recursive: true });
      writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');

      const words = await page.evaluate(() => document.getElementById('root').innerText.trim().split(/\s+/).length);
      console.log(`  ✓ prerendered ${route.padEnd(22)} (${words} words)`);
    } catch (err) {
      failed++;
      console.error(`  ✗ FAILED ${route}: ${err.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  server.close();
  if (failed > 0) {
    console.error(`\nPrerender finished with ${failed} failed route(s).`);
    process.exit(1);
  }

  // Add blog URLs to the sitemap now that all routes rendered successfully.
  writeSitemap();

  console.log(`\nPrerendered ${ROUTES.length} routes into dist/.`);
}

prerender().catch((err) => {
  console.error('Prerender crashed:', err);
  process.exit(1);
});
