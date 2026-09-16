import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock, Leaf } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import BlogCard from '@/components/blog/BlogCard';
import { getAllPosts, formatDate } from '@/lib/blog';

const BASE_URL = 'https://www.nursitree.com';

const BlogPage: React.FC = () => {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${BASE_URL}/blog`,
    name: 'NursiTree Blog',
    description:
      'Inzichten over stedelijke vergroening, boomwaarde en de Urban Tree Pit — praktische kennis voor gezonde stadsbomen.',
    url: `${BASE_URL}/blog`,
    inLanguage: 'nl-NL',
    publisher: {
      '@type': 'Organization',
      name: 'NursiTree',
      url: `${BASE_URL}/`,
    },
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: `${BASE_URL}/blog/${p.slug}`,
      datePublished: p.publishedAt,
      ...(p.updatedAt ? { dateModified: p.updatedAt } : {}),
      ...(p.featuredImage ? { image: p.featuredImage } : {}),
    })),
  };

  return (
    <PageLayout>
      <SEO
        title="Blog | Kennis over stedelijke vergroening | NursiTree"
        description="Inzichten en praktische kennis over stedelijke vergroening, boomwaarde en de Urban Tree Pit. Lees hoe je stadsbomen gezond laat doorgroeien tot hun volledige potentie."
        keywords="NursiTree blog, stedelijke vergroening, stadsbomen, boomkroonvolume, Urban Tree Pit, klimaatadaptatie, biodiversiteit stad"
        ogType="website"
        jsonLd={blogJsonLd}
        breadcrumbs={[
          { name: 'Home', url: `${BASE_URL}/` },
          { name: 'Blog', url: `${BASE_URL}/blog` },
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute top-0 right-0 h-full w-1/2 bg-gradient-to-bl from-[#6BA539]/[0.05] to-transparent" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 h-80 w-80 -translate-x-1/3 translate-y-1/3 rounded-full bg-[#E8854A]/[0.05] blur-3xl" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24 text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#E8854A]">Blog</span>
          <h1 className="mt-4 text-3xl font-bold leading-[1.1] tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            Kennis over <span className="text-[#6BA539]">stedelijke vergroening</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-500 sm:text-lg">
            Inzichten, achtergronden en praktische kennis over boomwaarde, klimaatadaptatie en hoe je
            stadsbomen gezond laat doorgroeien tot hun volledige potentie.
          </p>
        </div>
      </section>

      {/* Articles */}
      <section className="bg-gray-50 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            // Fallback: no published articles yet.
            <div className="mx-auto max-w-xl rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#6BA539]/10">
                <Leaf className="h-7 w-7 text-[#6BA539]" aria-hidden="true" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Binnenkort meer</h2>
              <p className="mt-3 text-gray-500">
                Er zijn nog geen artikelen gepubliceerd. Kom binnenkort terug voor nieuwe inzichten.
              </p>
              <Link
                to="/"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#6BA539] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#5A9030]"
              >
                Terug naar home
              </Link>
            </div>
          ) : (
            <>
              {/* Featured (newest) article — horizontal card on desktop */}
              {featured && (
                <article className="group mb-12">
                  <Link
                    to={`/blog/${featured.slug}`}
                    className="grid overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#6BA539]/20 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6BA539]/50 lg:grid-cols-2"
                    aria-label={featured.title}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-gray-50 lg:aspect-auto lg:h-full lg:min-h-[320px]">
                      {featured.featuredImage ? (
                        <img
                          src={featured.featuredImage}
                          alt={featured.featuredImageAlt || featured.title}
                          decoding="async"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#6BA539]/15 via-white to-[#E8854A]/15">
                          <Leaf className="h-12 w-12 text-[#6BA539]/50" aria-hidden="true" />
                        </div>
                      )}
                      <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-white/95 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#E8854A] shadow-sm backdrop-blur-sm">
                        {featured.category}
                      </span>
                    </div>
                    <div className="flex flex-col justify-center p-7 sm:p-10">
                      <div className="mb-3 flex items-center gap-4 text-xs text-gray-400">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                          <time dateTime={featured.publishedAt}>{formatDate(featured.publishedAt)}</time>
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                          {featured.readingTimeMinutes} min lezen
                        </span>
                      </div>
                      <h2 className="text-2xl font-bold leading-snug tracking-tight text-gray-900 transition-colors group-hover:text-[#6BA539] sm:text-3xl">
                        {featured.title}
                      </h2>
                      {featured.excerpt && (
                        <p className="mt-4 leading-relaxed text-gray-500">{featured.excerpt}</p>
                      )}
                      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#E8854A]">
                        Lees verder
                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </article>
              )}

              {/* Remaining articles grid */}
              {rest.length > 0 && (
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((post) => (
                    <BlogCard key={post.slug} post={post} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default BlogPage;
