import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar, Clock, RefreshCw, User, Leaf } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import BlogCTA from '@/components/blog/BlogCTA';
import RelatedPosts from '@/components/blog/RelatedPosts';
import { getPostBySlug, getRelatedPosts, formatDate } from '@/lib/blog';

const BASE_URL = 'https://www.nursitree.com';
const PUBLISHER_LOGO = 'https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1775054327617_3e9d5fc0.png';

const BlogPostPage: React.FC = () => {
  const { slug = '' } = useParams();
  const post = getPostBySlug(slug);

  // Fallback: unknown or draft slug → branded not-found, excluded from indexing.
  if (!post) {
    return (
      <PageLayout>
        <SEO
          title="Artikel niet gevonden | NursiTree Blog"
          description="Dit blogartikel bestaat niet of is niet meer beschikbaar."
          noindex
        />
        <section className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-xl px-4 text-center sm:px-6 lg:px-8">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#6BA539]/10">
              <Leaf className="h-8 w-8 text-[#6BA539]" aria-hidden="true" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Artikel niet gevonden</h1>
            <p className="mt-4 text-gray-500">
              Het artikel dat je zoekt bestaat niet of is verplaatst.
            </p>
            <Link
              to="/blog"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#6BA539] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#5A9030]"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Naar het blogoverzicht
            </Link>
          </div>
        </section>
      </PageLayout>
    );
  }

  const related = getRelatedPosts(post, 3);
  const canonical = `${BASE_URL}/blog/${post.slug}`;
  const description = post.seoDescription || post.excerpt;

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    ...(post.featuredImage ? { image: post.featuredImage } : {}),
    author: { '@type': 'Organization', name: post.author, url: `${BASE_URL}/` },
    publisher: {
      '@type': 'Organization',
      name: 'NursiTree',
      url: `${BASE_URL}/`,
      logo: { '@type': 'ImageObject', url: PUBLISHER_LOGO },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
    ...(post.keywords && post.keywords.length ? { keywords: post.keywords.join(', ') } : {}),
    inLanguage: 'nl-NL',
  };

  return (
    <PageLayout>
      <SEO
        title={`${post.seoTitle || post.title} | NursiTree Blog`}
        description={description}
        canonical={canonical}
        ogType="article"
        ogImage={post.featuredImage}
        keywords={post.keywords?.join(', ')}
        jsonLd={articleJsonLd}
        breadcrumbs={[
          { name: 'Home', url: `${BASE_URL}/` },
          { name: 'Blog', url: `${BASE_URL}/blog` },
          { name: post.title, url: canonical },
        ]}
      />

      <article className="bg-white">
        {/* Header */}
        <header className="mx-auto max-w-3xl px-4 pt-10 sm:px-6 sm:pt-14 lg:px-8">
          <nav aria-label="Kruimelpad" className="mb-8">
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-[#6BA539]"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Terug naar blog
            </Link>
          </nav>

          <span className="text-sm font-semibold uppercase tracking-[0.15em] text-[#E8854A]">
            {post.category}
          </span>
          <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-[2.75rem]">
            {post.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-400">
            <span className="inline-flex items-center gap-1.5">
              <User className="h-4 w-4" aria-hidden="true" />
              {post.author}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            </span>
            {post.updatedAt && post.updatedAt !== post.publishedAt && (
              <span className="inline-flex items-center gap-1.5">
                <RefreshCw className="h-4 w-4" aria-hidden="true" />
                Bijgewerkt op <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time>
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" aria-hidden="true" />
              {post.readingTimeMinutes} min lezen
            </span>
          </div>
        </header>

        {/* Featured image */}
        {post.featuredImage && (
          <figure className="mx-auto mt-10 max-w-4xl px-4 sm:px-6 lg:px-8">
            <img
              src={post.featuredImage}
              alt={post.featuredImageAlt || post.title}
              decoding="async"
              className="aspect-[16/9] w-full rounded-2xl object-cover shadow-md"
            />
          </figure>
        )}

        {/* Body */}
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div
            className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-gray-900 prose-p:text-gray-600 prose-p:leading-relaxed prose-a:font-medium prose-a:text-[#6BA539] hover:prose-a:text-[#5A9030] prose-strong:text-gray-900 prose-li:text-gray-600 prose-li:marker:text-[#6BA539] prose-img:rounded-xl prose-blockquote:border-l-[#6BA539] prose-blockquote:text-gray-600"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          {/* CTA */}
          <div className="mt-14">
            <BlogCTA />
          </div>

          {/* Back link */}
          <div className="mt-12 border-t border-gray-100 pt-8">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#E8854A] transition-colors hover:text-[#d9763d]"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Terug naar het blogoverzicht
            </Link>
          </div>
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 sm:pb-24 lg:px-8">
            <RelatedPosts posts={related} />
          </div>
        )}
      </article>
    </PageLayout>
  );
};

export default BlogPostPage;
