import React from 'react';
import type { BlogPost } from '@/lib/blog';
import BlogCard from './BlogCard';

interface RelatedPostsProps {
  posts: BlogPost[];
}

/** "Gerelateerde artikelen" grid shown at the bottom of an article. */
const RelatedPosts: React.FC<RelatedPostsProps> = ({ posts }) => {
  if (!posts.length) return null;

  return (
    <section aria-labelledby="related-heading" className="mt-16 sm:mt-20">
      <h2 id="related-heading" className="mb-8 text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
        Gerelateerde artikelen
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
};

export default RelatedPosts;
