import React, { useEffect, useRef, useState } from 'react';

const features = [
  {
    title: 'Drukbevolkte buitenruimtes',
    desc: 'Ontworpen voor steden en andere drukke omgevingen waar ruimte schaars is.',
  },
  {
    title: 'Groenere projecten',
    desc: 'Maakt elk project eenvoudig groener zonder extra complexiteit.',
  },
  {
    title: 'Kortere doorlooptijd',
    desc: 'Gestandaardiseerd systeem dat de bouwtijd aanzienlijk verkort.',
  },
  {
    title: 'Minder fouten',
    desc: 'Bewezen ontwerp dat faalkosten minimaliseert en resultaat garandeert.',
  },
];

const ZwhIntro: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="zwh-intro"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ marginTop: '-1px' }}
    >
      {/* Gradient fill behind the angled shape: white at top (matches hero) → #f8faf6 at bottom (matches product section) */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #ffffff 0%, #f8faf6 100%)' }} aria-hidden="true" />


      {/* Dynamic orange shape — narrower on left, expanding to right */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute inset-0 bg-[#E8854A]"
          style={{
            clipPath: 'polygon(0 8%, 100% 0%, 100% 100%, 0 92%)',
          }}
        />
        {/* Subtle depth overlay — lighter on the right for the expanding feel */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(105deg, rgba(0,0,0,0.06) 0%, transparent 40%, rgba(255,255,255,0.08) 100%)',
            clipPath: 'polygon(0 8%, 100% 0%, 100% 100%, 0 92%)',
          }}
        />
      </div>

      {/* Content — positioned within the orange area with enough padding */}
      <div className="relative z-10 py-32 sm:py-40 lg:py-44">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div
            className={`max-w-3xl mx-auto text-center mb-20 transition-all duration-700 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="text-white/80 text-sm font-semibold uppercase tracking-[0.2em]">
              Achtergrond
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-4 mb-6 tracking-tight">
              Ontwikkeld voor de
              <br className="hidden sm:block" />
              <span className="text-white/90"> realiteit</span> van de stad
            </h2>
            <p className="text-lg text-white/80 leading-relaxed">
              We hebben BRENT ontwikkeld voor iedereen die actief werkt aan de invulling
              van steden en andere drukbevolkte buitenruimtes. Mensen die hun projecten
              graag groener, maar ook simpeler willen maken. Zodat de doorlooptijd korter
              wordt, er minder fouten worden gemaakt en er onderaan de streep meer
              overblijft.
            </p>
          </div>

          {/* Feature cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div
                key={f.title}
                className={`group p-8 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 hover:bg-white/25 hover:border-white/40 transition-all duration-500 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: visible ? `${200 + i * 100}ms` : '0ms' }}
              >
                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-white/75 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ZwhIntro;
