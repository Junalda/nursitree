// ============================================================================
// NursiTree blog — content loader
// ============================================================================
//
// This module is the SINGLE source of truth for blog content. Articles live as
// Markdown files in `src/content/blog/*.md` with YAML frontmatter. Adding a new
// article = adding a new `.md` file there. No routing, component or layout code
// needs to change. See `src/content/blog/BLOG_GUIDE.md` for the authoring rules.
//
// How it works:
//  - Vite's `import.meta.glob` imports every Markdown file as raw text at build
//    time (so posts are bundled statically — no runtime fetching, no CMS).
//  - Frontmatter is parsed by a small, dependency-free parser (below).
//  - The Markdown body is rendered to HTML with `marked` (already a dependency)
//    and styled with the `@tailwindcss/typography` `prose` classes in the page.
//
// Drafts (`draft: true`) are excluded from every public list and from direct
// access in production, so they never appear on /blog, are never linked, and are
// never added to the prerender route list or sitemap (see scripts/prerender.mjs).
// In local dev (`npm run dev`) drafts ARE shown so authors can preview them.
// ============================================================================

import { marked } from 'marked';

export interface BlogPost {
  /** URL slug — the article is served at /blog/<slug>. */
  slug: string;
  title: string;
  excerpt: string;
  /** ISO date string, e.g. "2026-09-16". */
  publishedAt: string;
  /** Optional ISO date string for the last update. */
  updatedAt?: string;
  author: string;
  category: string;
  featuredImage?: string;
  featuredImageAlt?: string;
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
  draft: boolean;
  /** Rendered HTML of the Markdown body. */
  contentHtml: string;
  /** Estimated reading time in whole minutes (>= 1). */
  readingTimeMinutes: number;
}

// ----------------------------------------------------------------------------
// Frontmatter parsing (dependency-free, supports the subset documented in
// BLOG_GUIDE.md: strings, quoted strings, booleans, inline [a, b] arrays and
// block "- item" arrays).
// ----------------------------------------------------------------------------

function stripQuotes(value: string): string {
  const v = value.trim();
  if (v.length >= 2 && ((v[0] === '"' && v[v.length - 1] === '"') || (v[0] === "'" && v[v.length - 1] === "'"))) {
    return v.slice(1, -1).replace(/\\"/g, '"').replace(/\\'/g, "'");
  }
  return v;
}

function parseScalarOrArray(raw: string): string | boolean | string[] {
  const v = raw.trim();
  if (v.startsWith('[') && v.endsWith(']')) {
    const inner = v.slice(1, -1).trim();
    if (!inner) return [];
    return inner.split(',').map((s) => stripQuotes(s)).filter((s) => s.length > 0);
  }
  if (v === 'true') return true;
  if (v === 'false') return false;
  return stripQuotes(v);
}

function parseFrontmatter(rawFile: string): { data: Record<string, unknown>; body: string } {
  const match = /^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?([\s\S]*)$/.exec(rawFile);
  if (!match) return { data: {}, body: rawFile };

  const yaml = match[1];
  const body = match[2] ?? '';
  const data: Record<string, unknown> = {};
  const lines = yaml.split(/\r?\n/);

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim() || /^\s*#/.test(line)) {
      i++;
      continue;
    }
    const kv = /^([A-Za-z0-9_]+):\s*(.*)$/.exec(line);
    if (!kv) {
      i++;
      continue;
    }
    const key = kv[1];
    const rest = kv[2];

    if (rest === '') {
      // A bare "key:" may be followed by a block list of "- item" lines.
      const items: string[] = [];
      let j = i + 1;
      while (j < lines.length && /^\s*-\s+/.test(lines[j])) {
        items.push(stripQuotes(lines[j].replace(/^\s*-\s+/, '')));
        j++;
      }
      if (items.length) {
        data[key] = items;
        i = j;
        continue;
      }
      data[key] = '';
      i++;
      continue;
    }

    data[key] = parseScalarOrArray(rest);
    i++;
  }

  return { data, body };
}

// ----------------------------------------------------------------------------
// Markdown rendering
// ----------------------------------------------------------------------------

marked.setOptions({ gfm: true, breaks: false });

function renderMarkdown(body: string): string {
  const html = marked.parse(body, { async: false }) as string;
  // Open external links in a new tab; keep internal (relative or nursitree.com)
  // links as normal in-page navigations.
  return html.replace(/<a href="(https?:\/\/[^"]+)"/g, (full, href: string) => {
    const isInternal = href.includes('nursitree.com');
    return isInternal ? full : `<a href="${href}" target="_blank" rel="noopener noreferrer"`;
  });
}

function readingTime(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

// ----------------------------------------------------------------------------
// Load + normalise all posts
// ----------------------------------------------------------------------------

const rawFiles = import.meta.glob('/src/content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function filenameSlug(path: string): string {
  return path.split('/').pop()!.replace(/\.md$/i, '');
}

function toPost(path: string, raw: string): BlogPost | null {
  // The authoring guide is not an article.
  if (/\/BLOG_GUIDE\.md$/i.test(path)) return null;

  const { data, body } = parseFrontmatter(raw);
  const title = typeof data.title === 'string' ? data.title.trim() : '';
  // A file without a title / body is not a valid post — skip it defensively.
  if (!title) return null;

  const slug = (typeof data.slug === 'string' && data.slug.trim()) || filenameSlug(path);
  const keywords = Array.isArray(data.keywords)
    ? (data.keywords as string[])
    : typeof data.keywords === 'string' && data.keywords
      ? (data.keywords as string).split(',').map((k) => k.trim()).filter(Boolean)
      : undefined;

  return {
    slug,
    title,
    excerpt: typeof data.excerpt === 'string' ? data.excerpt.trim() : '',
    publishedAt: typeof data.publishedAt === 'string' ? data.publishedAt.trim() : '',
    updatedAt: typeof data.updatedAt === 'string' && data.updatedAt.trim() ? data.updatedAt.trim() : undefined,
    author: typeof data.author === 'string' && data.author.trim() ? data.author.trim() : 'NursiTree',
    category: typeof data.category === 'string' && data.category.trim() ? data.category.trim() : 'Blog',
    featuredImage: typeof data.featuredImage === 'string' && data.featuredImage.trim() ? data.featuredImage.trim() : undefined,
    featuredImageAlt: typeof data.featuredImageAlt === 'string' && data.featuredImageAlt.trim() ? data.featuredImageAlt.trim() : undefined,
    seoTitle: typeof data.seoTitle === 'string' && data.seoTitle.trim() ? data.seoTitle.trim() : undefined,
    seoDescription: typeof data.seoDescription === 'string' && data.seoDescription.trim() ? data.seoDescription.trim() : undefined,
    keywords,
    draft: data.draft === true,
    contentHtml: renderMarkdown(body),
    readingTimeMinutes: readingTime(body),
  };
}

// Drafts are visible in local dev for preview, never in a production build.
const INCLUDE_DRAFTS = import.meta.env.DEV;

const allPosts: BlogPost[] = Object.entries(rawFiles)
  .map(([path, raw]) => toPost(path, raw))
  .filter((p): p is BlogPost => p !== null)
  .filter((p) => INCLUDE_DRAFTS || !p.draft)
  .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : a.publishedAt > b.publishedAt ? -1 : 0));

// ----------------------------------------------------------------------------
// Public API
// ----------------------------------------------------------------------------

/** All publishable posts, newest first. */
export function getAllPosts(): BlogPost[] {
  return allPosts;
}

/** A single post by slug, or undefined when it does not exist / is a draft. */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return allPosts.find((p) => p.slug === slug);
}

/** Up to `limit` related posts — same category first, then the newest others. */
export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  const others = allPosts.filter((p) => p.slug !== post.slug);
  const sameCategory = others.filter((p) => p.category === post.category);
  const rest = others.filter((p) => p.category !== post.category);
  return [...sameCategory, ...rest].slice(0, limit);
}

/** Format an ISO date string as a Dutch long date, e.g. "16 september 2026". */
export function formatDate(iso: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' }).format(d);
}
