import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface BlogCTAProps {
  title?: string;
  text?: string;
  buttonLabel?: string;
  to?: string;
}

/**
 * Call-to-action block shown at the end of a blog article. Reuses the site's
 * green gradient CTA styling (see ZwhGreenCta / Producten CTA).
 */
const BlogCTA: React.FC<BlogCTAProps> = ({
  title = 'Benieuwd naar de mogelijkheden?',
  text = 'Ontdek hoe de Urban Tree Pit van NursiTree stadsbomen gezond laat doorgroeien. We denken graag met je mee over de beste oplossing voor jouw project.',
  buttonLabel = 'Neem contact op',
  to = '/#contact-section',
}) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#4E8A25] to-[#6BA539] px-6 py-10 sm:px-10 sm:py-12 text-center shadow-lg">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'linear-gradient(255deg, rgba(0,0,0,0.08) 0%, transparent 45%, rgba(255,255,255,0.10) 100%)' }}
        aria-hidden="true"
      />
      <div className="relative z-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/85">{text}</p>
        <div className="mt-8 flex justify-center">
          <Link
            to={to}
            className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-semibold text-[#6BA539] shadow-lg transition-all duration-200 hover:bg-gray-50 hover:shadow-xl"
          >
            {buttonLabel}
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCTA;
