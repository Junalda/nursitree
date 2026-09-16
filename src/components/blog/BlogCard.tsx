import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock, Leaf } from 'lucide-react';
import type { BlogPost } from '@/lib/blog';
import { formatDate } from '@/lib/blog';

interface BlogCardProps {
  post: BlogPost;
  /** Larger, prominent variant for the first/featured article. */
  featured?: boolean;
}

/**
 * Card used in the blog overview grid. Uses the same visual language as the rest
 * of NursiTree: rounded-2xl white card, subtle border + shadow, orange category
 * label, hover lift. The whole card is a single link to the article.
 */
const BlogCard: React.FC<BlogCardProps> = ({ post, featured = false }) => {
  return (
    <article className="group h-full">
      <Link
        to={`/blog/${post.slug}`}
        className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#6BA539]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6BA539]/50"
        aria-label={post.title}
      >
        {/* Featured image (with graceful branded fallback) */}
        <div className={`relative overflow-hidden bg-gray-50 ${featured ? 'aspect-[16/9]' : 'aspect-[16/10]'}`}>
          {post.featuredImage ? (
            <img
              src={post.featuredImage}
              alt={post.featuredImageAlt || post.title}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#6BA539]/15 via-white to-[#E8854A]/15">
              <Leaf className="h-10 w-10 text-[#6BA539]/50" aria-hidden="true" />
            </div>
          )}
          <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-white/95 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#E8854A] shadow-sm backdrop-blur-sm">
            {post.category}
          </span>
        </div>

        {/* Body */}
        <div className={`flex flex-1 flex-col ${featured ? 'p-7 sm:p-8' : 'p-6'}`}>
          <div className="mb-3 flex items-center gap-4 text-xs text-gray-400">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {post.readingTimeMinutes} min lezen
            </span>
          </div>

          <h3 className={`font-bold leading-snug text-gray-900 transition-colors group-hover:text-[#6BA539] ${featured ? 'text-2xl sm:text-3xl' : 'text-xl'}`}>
            {post.title}
          </h3>

          {post.excerpt && (
            <p className={`mt-3 flex-1 leading-relaxed text-gray-500 ${featured ? 'text-base' : 'text-sm'}`}>
              {post.excerpt}
            </p>
          )}

          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#E8854A]">
            Lees verder
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </article>
  );
};

export default BlogCard;
