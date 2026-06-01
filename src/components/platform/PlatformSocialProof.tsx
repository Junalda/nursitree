import React from 'react';
import { Quote } from 'lucide-react';

/* ─── Logo URLs (provided organization logos).
       The Gemeente Apeldoorn logo PNG has built-in whitespace and acts as
       the OPTICAL SIZE REFERENCE. The Sportbedrijf Rotterdam and
       Gemeente Rotterdam logos are tightly cropped (no built-in
       whitespace), so they are sized down via TIGHT_CROPPED_LOGOS
       so every testimonial logo appears optically equal in size to
       the Apeldoorn logo on desktop, tablet, mobile portrait and
       mobile landscape. ─── */
const LOGO_SPORTBEDRIJF_ROTTERDAM = 'https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1778829945182_52a6473e.png';
const LOGO_GEMEENTE_APELDOORN = 'https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1778485303458_f238e827.png';
const LOGO_GEMEENTE_ROTTERDAM = 'https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1778487909424_dc641438.png';
const TIGHT_CROPPED_LOGOS = new Set<string>([LOGO_SPORTBEDRIJF_ROTTERDAM, LOGO_GEMEENTE_ROTTERDAM]);

const testimonials = [{
  quote: 'Wat ik vooral waardeerde, was de open communicatie en de bereidheid om tijdens de pilot te evalueren en bij te sturen waar nodig.',
  name: 'Arjan van Bodegom',
  role: 'Locatiemanager',
  org: 'Sportbedrijf Rotterdam',
  logo: LOGO_SPORTBEDRIJF_ROTTERDAM,
  logoAlt: 'Logo Sportbedrijf Rotterdam',
  accentColor: '#6BA539'
}, {
  quote: 'Al met al een geslaagd project in de gemeente Apeldoorn. Wij zijn benieuwd hoe de bomen zich ontwikkelen de komende 20 jaar.',
  name: 'Tonnie Berends',
  role: 'Directievoerder',
  org: 'Gemeente Apeldoorn',
  logo: LOGO_GEMEENTE_APELDOORN,
  logoAlt: 'Logo Gemeente Apeldoorn',
  accentColor: '#E8854A'
}, {
  quote: 'Ik kijk positief terug op het pilotproject met NursiTree. De communicatie was prettig, er werd goed meegedacht en er was duidelijk aandacht voor onze praktijkervaring.',
  name: 'Martin Nugteren',
  role: 'Projectleider',
  org: 'Gemeente Rotterdam',
  logo: LOGO_GEMEENTE_ROTTERDAM,
  logoAlt: 'Logo Gemeente Rotterdam',
  accentColor: '#6BA539'
}];
const PlatformSocialProof: React.FC = () => {
  return <section className="py-24 sm:py-32 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="text-[#6BA539] text-sm font-semibold uppercase tracking-[0.2em]">
            Ervaringen
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6 tracking-tight">
            Dit zeggen anderen over ons
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed">Gemeenten, aannemers en beheerders delen hun ervaring met het NursiTree Platform.</p>

        </div>

        {/* Testimonial cards */}

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map(t => <div key={t.name} className="group bg-white rounded-2xl p-8 border border-gray-100 hover:border-transparent hover:shadow-xl transition-all duration-500 relative overflow-hidden w-full landscape:max-md:max-w-[420px] landscape:max-md:mx-auto">

              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
            background: t.accentColor
          }} />

              {/* Quote icon */}
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-6" style={{
            backgroundColor: `${t.accentColor}10`
          }}>
                <Quote className="w-5 h-5" style={{
              color: t.accentColor
            }} />
              </div>

              {/* Quote text */}
              <p className="text-gray-600 text-sm leading-relaxed mb-8 min-h-[100px]">
                "{t.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-6 border-t border-gray-100">
                {/* Logo tile — uniform 12x12 white tile, centered, object-contain.
                    All testimonial logos must appear optically equal in size to
                    the Gemeente Apeldoorn logo (the reference). The Apeldoorn
                    PNG has built-in whitespace, so at max-w-full / max-h-full
                    it visually renders at ~72% of the tile. The Sportbedrijf
                    Rotterdam and Gemeente Rotterdam logos are tightly cropped,
                    so we render those at 72% width/height to match Apeldoorn's
                    optical size. Proportions are preserved (object-contain),
                    centered both axes, never cropped or stretched, on desktop,
                    tablet, mobile portrait and mobile landscape. */}
                <div className="w-12 h-12 rounded-lg bg-white border border-gray-100 flex items-center justify-center p-1.5 shadow-sm flex-shrink-0 overflow-hidden">
                  <img
                    src={t.logo}
                    alt={t.logoAlt}
                    className={TIGHT_CROPPED_LOGOS.has(t.logo) ? 'w-[72%] h-[72%] object-contain' : 'max-w-full max-h-full w-auto h-auto object-contain'}
                    loading="lazy"
                    decoding="async"
                  />
                </div>


                <div className="min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate">{t.name}</p>
                  <p className="text-xs text-gray-400">
                    {t.role},<br className="lg:hidden" /> {t.org}
                  </p>
                </div>

              </div>
            </div>)}
        </div>
      </div>
    </section>;
};
export default PlatformSocialProof;
