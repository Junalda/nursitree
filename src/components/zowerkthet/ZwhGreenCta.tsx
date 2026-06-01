import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const ZwhGreenCta: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative z-[2] mt-16 sm:mt-24"
      style={{ paddingTop: '4rem', paddingBottom: '4rem' }}
    >

      {/* The mirrored expanding rectangle shape — expands from right to left */}
      <div
        className="absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #4E8A25 0%, #6BA539 100%)',
            clipPath: 'polygon(0 0%, 100% 18%, 100% 82%, 0 100%)',
          }}
        />
        {/* Subtle overlay for depth — gradient reversed from orange version */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(255deg, rgba(0,0,0,0.06) 0%, transparent 40%, rgba(255,255,255,0.08) 100%)',
            clipPath: 'polygon(0 0%, 100% 18%, 100% 82%, 0 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div
        className={`relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight tracking-tight">
          Laten we kennismaken
        </h2>
        <p className="text-lg text-white/85 mb-12 max-w-2xl mx-auto leading-relaxed">
          Ontdek hoe BRENT past binnen jouw project. We denken graag met je mee over de beste oplossing voor stedelijke vergroening.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/#contact-section"
            className="px-8 py-4 rounded-xl text-base font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 bg-white text-[#6BA539] hover:bg-gray-50"
          >
            Neem contact op
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>



      </div>
    </section>
  );
};

export default ZwhGreenCta;
