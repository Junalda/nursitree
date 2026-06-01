import React, { useEffect, useRef, useState } from 'react';

const blocks = [
  {
    number: '01',
    title: 'Afmetingen',
    stat: '2,50 × 3,30 × 1,30 m',
    statLabel: 'Standaardmaat',
    text: 'Dankzij de standaardafmetingen van 2,50 x 3,30 x 1,30 meter past het systeem naadloos binnen de gebruikelijke maatvoering van parkeervakken.',

  },
  {
    number: '02',
    title: 'Groeiruimte',
    stat: '7 m³',
    statLabel: 'Substraat',
    text: 'De groeiplaats bevat 7 m³ substraat, voldoende voor een gezonde groei van 15 tot 20 jaar (afhankelijk van de boomsoort).',
  },
  {
    number: '03',
    title: 'Waterbeheer',
    stat: '1.200 L',
    statLabel: 'Reservoir',
    text: 'Het systeem beschikt over een waterreservoir van 1.200 liter, voldoende voor een droogteperiode van circa 20 dagen. Dit slimme systeem reguleert de watergift via een extern vlottersysteem, zorgt dat capillair materiaal vocht geleidelijk afgeeft aan de wortelkluit én voorkomt wateroverlast door overtollig regenwater af te voeren naar de omliggende bodem of het regenwaterriool.',
  },
  {
    number: '04',
    title: 'Stabiliteit',
    stat: '15–20 jr',
    statLabel: 'Levensduur',
    text: 'De afmetingen van de bak zijn voldoende voor de benodigde stabiliteit gedurende de looptijd binnen de Urban Tree Pit.',
  },
];


const ZwhHowItWorks: React.FC = () => {
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
    <section ref={ref} className="py-24 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`max-w-3xl mx-auto text-center mb-20 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="text-[#6BA539] text-sm font-semibold uppercase tracking-[0.2em]">
            Techniek
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6 tracking-tight">
            Zo werkt het
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed">
            Vier kernprincipes maken BRENT tot de meest doordachte groeiplaats voor
            stedelijke bomen.
          </p>
        </div>

        {/* Blocks */}
        <div className="grid md:grid-cols-2 gap-8">
          {blocks.map((b, i) => (
            <div
              key={b.number}
              className={`group relative p-8 sm:p-10 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-xl hover:border-[#6BA539]/20 transition-all duration-500 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: visible ? `${150 + i * 100}ms` : '0ms' }}
            >
              {/* Number */}
              <span className="absolute top-6 right-8 text-6xl font-black text-[#6BA539]/20 group-hover:text-[#6BA539]/30 transition-colors select-none">
                {b.number}
              </span>

              <div className="relative pt-2">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{b.title}</h3>

                {/* Stat */}
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl font-black text-[#6BA539]">{b.stat}</span>
                  <span className="text-sm text-gray-400 font-medium">{b.statLabel}</span>
                </div>

                <p className="text-sm text-gray-500 leading-relaxed">{b.text}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ZwhHowItWorks;
