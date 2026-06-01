import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const ZwhFinalCta: React.FC = () => {
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
      className="relative z-[2]"
      style={{ paddingTop: '3rem', paddingBottom: '10rem', marginBottom: '-2px', backgroundColor: '#f8faf6' }}
    >


      {/* Layer 0: Solid full-width dark backstop — guarantees no white sliver
          on ultra-wide screens regardless of clip-path sub-pixel rendering. */}
      <div
        className="absolute left-0 right-0 bottom-0 h-10 bg-[#182418]"
        aria-hidden="true"
      />

      {/* Layer 1: Dark footer-color transition zone at the bottom */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute inset-0 bg-[#182418]"
          style={{
            clipPath: 'polygon(0 62%, 100% 76%, 100% 100%, 0 100%)',
          }}
        />
      </div>

      {/* Layer 2: The orange expanding rectangle shape — positioned above the dark zone */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute inset-0 bg-[#E8854A]"
          style={{
            clipPath: 'polygon(0 14%, 100% 0%, 100% 76%, 0 62%)',
          }}
        />
        {/* Subtle lighter overlay for depth on right side */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(105deg, rgba(0,0,0,0.06) 0%, transparent 40%, rgba(255,255,255,0.08) 100%)',
            clipPath: 'polygon(0 14%, 100% 0%, 100% 76%, 0 62%)',
          }}
        />
      </div>


      {/* Content — sits within the orange area */}
      <div
        className={`relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 text-center transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight tracking-tight">
          Klaar om te starten?
        </h2>
        <p className="text-lg text-white/85 mb-12 max-w-2xl mx-auto leading-relaxed">
          Van ontwerp tot realisatie, wij begeleiden je bij elke stap.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/#contact-section"

            className="px-8 py-4 rounded-xl text-base font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 bg-white text-[#E8854A] hover:bg-gray-50"
          >

            Plan een gesprek
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default ZwhFinalCta;
