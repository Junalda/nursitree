import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface BreadcrumbItem {
  name: string;
  url: string; // absolute URL
}

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
  /** Comma-separated keywords (used by some search engines / AI crawlers). */
  keywords?: string;
  /** Optional JSON-LD structured data object (or array of objects). Will be injected as <script type="application/ld+json">. */
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
  /** Optional breadcrumb trail. When provided, a BreadcrumbList JSON-LD is added automatically. */
  breadcrumbs?: BreadcrumbItem[];
}

const BASE_URL = 'https://www.nursitree.com';
const DEFAULT_OG_IMAGE = 'https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1775062143729_5e0f84cb.png';
const JSONLD_PAGE_ID = 'seo-jsonld-page';
const JSONLD_BREADCRUMB_ID = 'seo-jsonld-breadcrumb';

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogImage,
  ogType = 'website',
  noindex = false,
  keywords,
  jsonLd,
  breadcrumbs,
}) => {
  const { pathname } = useLocation();
  const fullCanonical = canonical || `${BASE_URL}${pathname}`;

  useEffect(() => {
    // Set document title
    document.title = title;

    // Helper to set or create a meta tag
    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    const removeMeta = (attr: string, key: string) => {
      const el = document.querySelector(`meta[${attr}="${key}"]`);
      if (el) el.parentNode?.removeChild(el);
    };

    // Helper to set or create a link tag
    const setLink = (rel: string, href: string) => {
      let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    // Helper to inject (or replace) a JSON-LD <script> with a stable id
    const setJsonLd = (id: string, data: unknown) => {
      let el = document.getElementById(id) as HTMLScriptElement | null;
      if (!el) {
        el = document.createElement('script');
        el.type = 'application/ld+json';
        el.id = id;
        document.head.appendChild(el);
      }
      el.textContent = JSON.stringify(data);
    };

    const removeJsonLd = (id: string) => {
      const el = document.getElementById(id);
      if (el) el.parentNode?.removeChild(el);
    };

    // Meta description
    setMeta('name', 'description', description);

    // Keywords (optional)
    if (keywords && keywords.trim().length > 0) {
      setMeta('name', 'keywords', keywords);
    } else {
      removeMeta('name', 'keywords');
    }

    // Canonical URL
    setLink('canonical', fullCanonical);

    // Robots
    if (noindex) {
      setMeta('name', 'robots', 'noindex, nofollow');
    } else {
      setMeta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    }

    // Open Graph
    setMeta('property', 'og:title', ogTitle || title);
    setMeta('property', 'og:description', ogDescription || description);
    setMeta('property', 'og:url', fullCanonical);
    setMeta('property', 'og:type', ogType);
    setMeta('property', 'og:image', ogImage || DEFAULT_OG_IMAGE);
    setMeta('property', 'og:site_name', 'NursiTree');
    setMeta('property', 'og:locale', 'nl_NL');

    // Twitter Card
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', ogTitle || title);
    setMeta('name', 'twitter:description', ogDescription || description);
    setMeta('name', 'twitter:image', ogImage || DEFAULT_OG_IMAGE);

    // Page-level JSON-LD (e.g. Product, WebPage, Service, AboutPage)
    if (jsonLd) {
      setJsonLd(JSONLD_PAGE_ID, jsonLd);
    } else {
      removeJsonLd(JSONLD_PAGE_ID);
    }

    // Breadcrumb JSON-LD
    if (breadcrumbs && breadcrumbs.length > 0) {
      setJsonLd(JSONLD_BREADCRUMB_ID, {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((b, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: b.name,
          item: b.url,
        })),
      });
    } else {
      removeJsonLd(JSONLD_BREADCRUMB_ID);
    }

    return () => {
      // Clean up page-level JSON-LD on unmount so the next page starts clean
      removeJsonLd(JSONLD_PAGE_ID);
      removeJsonLd(JSONLD_BREADCRUMB_ID);
    };
  }, [title, description, fullCanonical, ogTitle, ogDescription, ogImage, ogType, noindex, keywords, jsonLd, breadcrumbs]);

  return null;
};

export default SEO;
