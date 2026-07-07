import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Quote } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';

/* ─── Images ─── */
const HERO_IMG = 'https://d64gsuwffb70l.cloudfront.net/69cd2e1dc76c2b3ecc191d41_1777924827710_9b14aa7d.jpg';
const TONY_IMG = 'https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1777917750409_5cc1e341.jpg';
const GERBRAND_IMG = 'https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1777917748637_d70304eb.jpg';
const SERVICES_IMG = 'https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1777923527304_9779bb96.png';

/* Scroll animation hook */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -30px 0px'
    });
    if (ref.current) {
      ref.current.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    }
    return () => observer.disconnect();
  }, []);
  return ref;
}

/* ─── Intersection observer hook for section animations ─── */
function useSectionVisible(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, {
      threshold
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return {
    ref,
    visible
  };
}

/* ─── Values Data ─── */
const values = [{
  title: 'Betrouwbaar',
  text: 'We maken samen goede afspraken en komen die altijd na. Vraag maar aan onze tevreden klanten.',
  accent: '#E8854A'
}, {
  title: 'Innovatief',
  text: 'We zijn een innovatieve partner die partijen met elkaar verbindt en zoekt naar een manier waarop het wel kan.',
  accent: '#6BA539'
}, {
  title: 'Betrokken',
  text: 'We reageren snel op vragen, denken mee en informeren de omgeving op een menselijke manier.',
  accent: '#E8854A'
}, {
  title: 'Kwaliteit',
  text: 'We willen alleen maar steengoede dingen maken, die lang meegaan. En bijdragen aan een groene toekomst.',
  accent: '#6BA539'
}];

/* ─── Logo URLs (provided organization logos).
       The Gemeente Apeldoorn logo PNG has built-in whitespace and acts as
       the OPTICAL SIZE REFERENCE. The Sportbedrijf Rotterdam and Gemeente
       Rotterdam logos are tightly cropped (no built-in whitespace), so we
       size them down via TIGHT_CROPPED_LOGOS so every testimonial logo
       appears optically equal in size to the Apeldoorn logo on desktop,
       tablet, mobile portrait and mobile landscape. ─── */
const LOGO_GEMEENTE_ROTTERDAM = 'https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1778487909424_dc641438.png';
const LOGO_GEMEENTE_APELDOORN = 'https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1778485303458_f238e827.png';
const LOGO_SPORTBEDRIJF_ROTTERDAM = 'https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1778829945182_52a6473e.png';
const TIGHT_CROPPED_LOGOS = new Set<string>([LOGO_SPORTBEDRIJF_ROTTERDAM, LOGO_GEMEENTE_ROTTERDAM]);


/* ─── Testimonials Data ─── */
const testimonials = [{
  quote: 'De samenwerking met NursiTree heb ik als zeer prettig ervaren: betrokken, deskundig en met ruimte om tijdens de pilot bij te sturen.',
  name: 'Martin Nugteren',
  role: 'Projectleider',
  org: 'Gemeente Rotterdam',
  logo: LOGO_GEMEENTE_ROTTERDAM,
  logoAlt: 'Logo Gemeente Rotterdam',
  accentColor: '#6BA539'
}, {
  quote: 'De communicatie en samenwerking met NursiTree was prettig, het actief meedenken van de kant van NursiTree hebben we als zeer prettig ervaren. Ook in de uitvoering was de samenwerking en de planning goed.',
  name: 'Eddie Rijckenberg',
  role: 'Projectleider',
  org: 'Gemeente Apeldoorn',
  logo: LOGO_GEMEENTE_APELDOORN,
  logoAlt: 'Logo Gemeente Apeldoorn',
  accentColor: '#E8854A'
}, {
  quote: 'Tijdens het traject met NursiTree werd actief geluisterd naar onze input en snel geschakeld wanneer aanpassingen nodig waren. Dat heb ik als erg positief ervaren.',
  name: 'Timon Schorel',
  role: 'Professional beheer en onderhoud',
  org: 'Sportbedrijf Rotterdam',
  logo: LOGO_SPORTBEDRIJF_ROTTERDAM,
  logoAlt: 'Logo Sportbedrijf Rotterdam',
  accentColor: '#6BA539'
}];

const OverOnsPage: React.FC = () => {
  const [showFullTony, setShowFullTony] = useState(false);
  const [showFullGerbrand, setShowFullGerbrand] = useState(false);
  const pageRef = useScrollReveal();
  const heroRef = useRef<HTMLDivElement>(null);
  const section2 = useSectionVisible(0.12);

  /* Hero entrance animation — matching ZwhHero */
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    requestAnimationFrame(() => {
      el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  }, []);
  return <PageLayout>
      <SEO title="Over ons | NursiTree — Tony Hoekstra & Gerbrand van de Weerd" description="Maak kennis met NursiTree: oprichters Tony Hoekstra en Gerbrand van de Weerd, hun missie voor stedelijke vergroening en de waarden achter de Urban Tree Pit." keywords="Over NursiTree, Tony Hoekstra, Gerbrand van de Weerd, Urban Tree Pit oprichters, stedelijke vergroening, missie NursiTree, boomtechnologie" breadcrumbs={[{
      name: 'Home',
      url: 'https://www.nursitree.com/'
    }, {
      name: 'Over ons',
      url: 'https://www.nursitree.com/over-ons'
    }]} jsonLd={{
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'Over NursiTree',
      url: 'https://www.nursitree.com/over-ons',
      description: 'Over NursiTree: het verhaal, de missie en de oprichters Tony Hoekstra en Gerbrand van de Weerd, die met de Urban Tree Pit van de stad een boomkwekerij maken.',
      mainEntity: {
        '@type': 'Organization',
        name: 'NursiTree B.V.',
        url: 'https://www.nursitree.com/',
        founder: [{
          '@type': 'Person',
          name: 'Tony Hoekstra'
        }, {
          '@type': 'Person',
          name: 'Gerbrand van de Weerd'
        }]
      }
    }} />
      <div ref={pageRef}>

        {/* ═══════════════════════════════════════════════════════════════
            1. HERO — Diagonal bottom edge flows into section 2
            ═══════════════════════════════════════════════════════════════ */}
        <section className="relative z-[3] min-h-[85vh] sm:min-h-[92vh] flex items-center overflow-hidden bg-white" style={{
        clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 4vw), 0 100%)'
      }}>
          {/* Subtle background accents — matching ZwhHero */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-[#E8854A]/[0.04] to-transparent" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#6BA539]/[0.03] rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

          <div ref={heroRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-0 w-full relative z-10">
            <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 lg:gap-24 items-center">
              {/* Left — Copy */}
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#E8854A]/10 text-[#E8854A] text-xs sm:text-sm font-medium mb-6 sm:mb-10 border border-[#E8854A]/15 lg:hidden">
                  Over Ons
                </div>


                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-gray-900 leading-[1.08] tracking-tight mb-5 sm:mb-8">
                  Samen maken we ruimte voor{' '}
                  <span className="text-[#E8854A]">groei</span>
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-gray-500 leading-relaxed mb-8 sm:mb-12 max-w-lg text-left">Wij willen graag bijdragen aan een gezond en leefbaar (stads)klimaat. Want de uitdagingen voor drukke steden worden alleen maar groter. Maar we zijn ervan overtuigd dat we door goed samen te werken, voor iedereen een duurzame toekomst kunnen creëren. </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <a href="#wie-zijn-wij" onClick={e => {
                  e.preventDefault();
                  document.getElementById('wie-zijn-wij')?.scrollIntoView({
                    behavior: 'smooth'
                  });
                }} className="px-6 sm:px-8 py-3.5 sm:py-4 bg-[#E8854A] text-white text-sm sm:text-base font-semibold rounded-xl hover:bg-[#D27337] transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                    Maak kennis met ons
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                  <Link to="/#contact-section" className="lg:hidden px-6 sm:px-8 py-3.5 sm:py-4 border-2 border-gray-200 text-gray-700 text-sm sm:text-base font-semibold rounded-xl hover:border-[#E8854A] hover:text-[#E8854A] transition-all duration-200 flex items-center justify-center gap-2">

                    Neem contact op
                  </Link>

                </div>
              </div>

              {/* Right — Hero image */}
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img src={HERO_IMG} alt="NursiTree team en stedelijke vergroening" className="w-full h-[280px] sm:h-[350px] md:h-[400px] lg:h-[520px] object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                {/* Floating card — bottom left */}
                <div className="absolute -bottom-4 sm:-bottom-6 left-2 sm:-left-6 bg-[#6BA539] rounded-xl shadow-xl p-3 sm:p-5 border border-[#6BA539] animate-float hidden sm:block">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div>
                      <div className="text-xl sm:text-2xl font-bold text-white">25+</div>
                      <div className="text-xs sm:text-sm text-white/80">Jaar expertise</div>
                    </div>
                  </div>
                </div>

                {/* Floating card — top right */}
                <div className="absolute -top-4 -right-4 bg-[#E8854A] rounded-xl shadow-xl p-4 border border-[#E8854A] hidden md:block animate-float-slow">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="text-xl font-bold text-white">Over</div>
                      <div className="text-xs text-white/80">Ons</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            2. MISSION — Orange diagonal design matching ZwhIntro
            ═══════════════════════════════════════════════════════════════ */}
        <section ref={section2.ref} className="relative z-[1] overflow-hidden" style={{
        marginTop: 'calc(-4vw - 1px)'
      }}>
          {/* Background fill — pure white to avoid grey line at section boundary */}
          <div className="absolute inset-0 bg-white" aria-hidden="true" />


          {/* Dynamic orange shape — narrower on left, expanding to right (matching ZwhIntro) */}
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute inset-0 bg-[#E8854A]" style={{
            clipPath: 'polygon(0 8%, 100% 0%, 100% 100%, 0 92%)'
          }} />
            {/* Subtle depth overlay — lighter on the right for the expanding feel */}
            <div className="absolute inset-0" style={{
            background: 'linear-gradient(105deg, rgba(0,0,0,0.06) 0%, transparent 40%, rgba(255,255,255,0.08) 100%)',
            clipPath: 'polygon(0 8%, 100% 0%, 100% 100%, 0 92%)'
          }} />
          </div>

          {/* Content — positioned within the orange area with enough padding */}
          <div className="relative z-10 py-32 sm:py-40 lg:py-44">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Header + Text */}
              <div className={`max-w-3xl mx-auto text-center transition-all duration-700 ${section2.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8 tracking-tight">
                  Wat betekent NursiTree?
                </h2>
                <div className="space-y-6">
                  <p className="text-lg text-white/85 leading-relaxed">
                    NursiTree is een samenvoeging van de woorden Nursery, City & Tree.{' '}
                    <br className="hidden sm:block" />
                    Want dat is wat we doen: we maken van de stad een boomkwekerij.
                  </p>
                  <p className="text-lg text-white/85 leading-relaxed">
                    Omdat goed groeiende bomen onmisbaar zijn voor een prettig leefklimaat in bebouwd gebied. Met het NursiTree-systeem zorgen we voor goed groeiende bomen waar het eerst niet mogelijk was.
                  </p>
                </div>

                {/* 3 blocks moved from former section 3 */}
                <div className="flex flex-wrap justify-center gap-4 mt-10">
                  {[{
                  word: 'Nursery',
                  sub: 'Kwekerij'
                }, {
                  word: 'City',
                  sub: 'Stad'
                }, {
                  word: 'Tree',
                  sub: 'Boom'
                }].map(item => <div key={item.word} className="px-6 py-4 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 text-center">
                      <div className="text-white font-bold text-lg">{item.word}</div>
                      <div className="text-white/60 text-xs mt-0.5">{item.sub}</div>
                    </div>)}
                </div>

                <div className="mt-12">
                  <Link to="/projecten" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#E8854A] text-base font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl">
                    Bekijk onze projecten
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>

              </div>
            </div>
          </div>
        </section>



        {/* 4. FOUNDERS — Diagonal top edge connects to section 2's bottom */}
        <section id="wie-zijn-wij" className="relative z-[3] bg-white scroll-mt-24" style={{
        clipPath: 'polygon(0 0, 100% 4vw, 100% 100%, 0 100%)',
        marginTop: 'calc(-4vw - 1px)',
        paddingTop: 'calc(7rem + 4vw)',
        paddingBottom: '9rem'
      }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


            <div className="max-w-3xl mb-20 animate-on-scroll">
              <span className="text-[#E8854A] text-sm font-semibold uppercase tracking-wider">De oprichters</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-5 mb-8 leading-tight tracking-tight text-left">
                Wie zijn wij?
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-10 lg:gap-14 max-w-5xl mb-20 max-md:landscape:max-w-[640px] max-md:landscape:mx-auto max-md:landscape:px-2 max-md:landscape:gap-6">

              {/* Gerbrand */}
              <div className="animate-on-scroll bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative h-80 sm:h-96 max-md:landscape:h-72 overflow-hidden">
                  <img src={TONY_IMG} alt="Gerbrand van de Weerd" className="w-full h-full object-cover object-top max-md:landscape:object-[center_30%] transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 max-md:landscape:bottom-3 max-md:landscape:left-4 max-md:landscape:right-4">
                    <h3 className="text-2xl font-bold text-white max-md:landscape:text-lg">Gerbrand van de Weerd</h3>
                    <p className="text-white/70 text-sm mt-1 max-md:landscape:text-xs max-md:landscape:mt-0">Co-founder</p>
                  </div>
                  {/* Desktop-only hover overlay with personal text */}
                  <div className="hidden lg:flex absolute inset-0 bg-black/75 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out flex-col justify-center px-8 py-6">
                    <p className="text-white/90 text-[14px] leading-relaxed mb-3">
                      Als kind ging ik met mijn vader mee langs aanleg- en onderhoudsprojecten en wilde ik uitvoerder bij een aannemersbedrijf worden.
                    </p>
                    <p className="text-white/90 text-[14px] leading-relaxed mb-3">
                      Ik ben in mijn werk altijd op zoek geweest naar hoe dingen beter kunnen. En juist de dingen waarvan iedereen zegt dat het lastig is, blijven mij triggeren.
                    </p>
                    <p className="text-white/90 text-[14px] leading-relaxed">
                      Ik zoek daarvoor altijd naar creatieve oplossingen met een focus op duurzame resultaten.
                    </p>
                  </div>
                </div>
              </div>

              {/* Tony */}
              <div className="animate-on-scroll animate-on-scroll-delay-2 bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative h-80 sm:h-96 max-md:landscape:h-72 overflow-hidden">
                  <img src={GERBRAND_IMG} alt="Tony Hoekstra" className="w-full h-full object-cover object-top max-md:landscape:object-[center_30%] transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 max-md:landscape:bottom-3 max-md:landscape:left-4 max-md:landscape:right-4">
                    <h3 className="text-2xl font-bold text-white max-md:landscape:text-lg">Tony Hoekstra</h3>
                    <p className="text-white/70 text-sm mt-1 max-md:landscape:text-xs max-md:landscape:mt-0">Co-founder</p>
                  </div>

                  {/* Desktop-only hover overlay with personal text */}
                  <div className="hidden lg:flex absolute inset-0 bg-black/75 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out flex-col justify-center px-8 py-6">
                    <p className="text-white/90 text-[14px] leading-relaxed mb-3">
                      Vroeger wilde ik dierenarts worden, maar uiteindelijk heb ik de opleiding Landscape and Environment Management gedaan.
                    </p>
                    <p className="text-white/90 text-[14px] leading-relaxed mb-3">
                      Bij Bomenwacht heb ik zowel op project- als op managementniveau veel geleerd, maar wat ik zo mooi vind aan NursiTree is dat we iets complex zo simpel mogelijk laten ogen.
                    </p>
                    <p className="text-white/90 text-[14px] leading-relaxed">
                      Als ecoloog vind ik het mooi om waarde toe te voegen aan het bebouwde gebied. In groengebieden regelt de natuur dat zelf wel.
                    </p>
                  </div>
                </div>
              </div>
            </div>



            <div className="max-w-3xl animate-on-scroll">
              <div className="space-y-6">
                <p className="text-lg text-gray-600 leading-relaxed text-left">
                  Wij zijn Tony en Gerbrand, de oprichters en gezichten achter NursiTree en ontwikkelaars van BRENT, onze eerste Urban Tree Pit.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed text-left">Onze roots liggen in de bomenwereld. Als collega's bij Bomenwacht Nederland zagen we bij verschillende uitdagingen in de ruimtelijke ontwikkeling dat partijen elkaar nog niet goed weten te vinden.</p>
                <p className="text-lg text-gray-600 leading-relaxed text-left">
                  Daarom gingen we samen aan de slag, en bedachten een slimme, inmiddels gepatenteerde oplossing voor de buitenruimte van morgen.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed text-left">
                  We werken op het snijvlak van{' '}
                  <span className="font-semibold text-gray-900">bouwkunde</span>,{' '}
                  <span className="font-semibold text-gray-900">techniek</span>,{' '}
                  <span className="font-semibold text-gray-900">industrieel ontwerp</span>,{' '}
                  <span className="font-semibold text-gray-900">landschapsinrichting</span>,{' '}
                  <span className="font-semibold text-gray-900">duurzaamheid</span> én{' '}
                  <span className="font-semibold text-gray-900">menselijkheid</span>. Dát maakt ons product zo effectief en ons werk zo leuk.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 mt-12">
                {['Bouwkunde', 'Techniek', 'Industrieel ontwerp', 'Landschapsinrichting', 'Duurzaamheid', 'Menselijkheid'].map(tag => <span key={tag} className="px-4 py-2 rounded-full bg-[#E8854A]/8 text-[#E8854A] text-sm font-medium border border-[#E8854A]/10">
                    {tag}
                  </span>)}
              </div>
            </div>
          </div>
        </section>



        {/* 6. VALUES — Green diagonal design matching ZwhGreenCta */}
        <section className="relative z-[2]" style={{
        paddingTop: '4rem',
        paddingBottom: '4rem'
      }}>
          {/* Background fills — eliminate any white seam between the green
              diagonal and the gray-50 testimonials section that follows.
              Top-right triangle (above the green) stays white to match the
              white founders section above; bottom-right triangle (below the
              green) is gray-50 to match the testimonials section below. */}
          <div className="absolute inset-0 bg-white" aria-hidden="true" />
          <div className="absolute inset-0 bg-gray-50" aria-hidden="true" style={{
          clipPath: 'polygon(0 100%, 100% 92%, 100% 100%)'
        }} />

          {/* Green diagonal background — mirrored expanding shape */}
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute inset-0" style={{
            background: 'linear-gradient(135deg, #4E8A25 0%, #6BA539 100%)',
            clipPath: 'polygon(0 0%, 100% 8%, 100% 92%, 0 100%)'
          }} />
            {/* Subtle overlay for depth */}
            <div className="absolute inset-0" style={{
            background: 'linear-gradient(255deg, rgba(0,0,0,0.06) 0%, transparent 40%, rgba(255,255,255,0.08) 100%)',
            clipPath: 'polygon(0 0%, 100% 8%, 100% 92%, 0 100%)'
          }} />
          </div>

          {/* Content */}
          <div className="relative z-10 py-20 sm:py-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mb-16 sm:mb-20 animate-on-scroll">
                <span className="text-white/70 text-sm font-semibold uppercase tracking-wider">Onze waarden</span>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mt-5 mb-8 leading-tight tracking-tight text-left">
                  NursiTree in 4 woorden
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
                {values.map((v, i) => <div key={v.title} className={`animate-on-scroll animate-on-scroll-delay-${i % 4 + 1} bg-white/15 backdrop-blur-sm rounded-2xl p-8 sm:p-10 border border-white/20 hover:bg-white/25 transition-all duration-300 group`}>
                    <h3 className="text-xl font-bold text-white mb-5 text-left">{v.title}</h3>
                    <p className="text-white/75 leading-relaxed text-[15px] text-left">{v.text}</p>
                  </div>)}
              </div>
            </div>
          </div>
        </section>



        {/* 7. PERSONAL STORIES — Hidden on desktop, visible on tablet/mobile */}
        <section className="py-28 sm:py-36 max-md:landscape:py-16 bg-white lg:hidden">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-20 max-md:landscape:mb-10 animate-on-scroll">
              <span className="text-[#E8854A] text-sm font-semibold uppercase tracking-wider">Persoonlijk</span>
              <h2 className="text-3xl sm:text-4xl max-md:landscape:text-2xl font-bold text-gray-900 mt-5 max-md:landscape:mt-3 mb-8 max-md:landscape:mb-4 leading-tight tracking-tight text-left">
                Wij maken complexe dingen simpel
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 max-md:landscape:gap-6 max-w-6xl">
              {/* Tony's story */}
              <div className="animate-on-scroll bg-gray-50 rounded-2xl p-10 lg:p-12 max-md:landscape:p-6 border border-gray-100 relative">
                <div className="absolute top-10 right-10 max-md:landscape:top-5 max-md:landscape:right-5 opacity-10">
                  <Quote className="w-16 h-16 max-md:landscape:w-10 max-md:landscape:h-10 text-[#E8854A]" />
                </div>

                <div className="flex items-center gap-4 max-md:landscape:gap-3 mb-10 max-md:landscape:mb-5">
                  <div className="w-16 h-16 max-md:landscape:w-12 max-md:landscape:h-12 rounded-full overflow-hidden border-2 border-[#E8854A]/20 flex-shrink-0">
                    <img src={TONY_IMG} alt="Tony Hoekstra" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-lg max-md:landscape:text-base font-bold text-gray-900">Gerbrand van de Weerd</h3>
                    <p className="text-[#E8854A] text-sm max-md:landscape:text-xs font-medium italic">'Creatieve oplossingen zoeken'</p>
                  </div>
                </div>

                <div className="space-y-4 max-md:landscape:space-y-2 relative z-10">
                  <p className="text-gray-600 max-md:landscape:text-sm leading-relaxed max-md:landscape:leading-snug text-left">
                    Als kind ging ik met mijn vader mee langs aanleg- en onderhoudsprojecten en wilde ik uitvoerder bij een aannemersbedrijf worden.
                  </p>
                  <p className="text-gray-600 max-md:landscape:text-sm leading-relaxed max-md:landscape:leading-snug text-left">
                    Ik ben in mijn werk altijd op zoek geweest naar hoe dingen beter kunnen. En juist de dingen waarvan iedereen zegt dat het lastig is, blijven mij triggeren.
                  </p>
                  {showFullTony && <p className="text-gray-600 max-md:landscape:text-sm leading-relaxed max-md:landscape:leading-snug text-left">
                      Ik zoek daarvoor altijd naar creatieve oplossingen met een focus op duurzame resultaten.
                    </p>}
                  <button onClick={() => setShowFullTony(!showFullTony)} className="text-[#E8854A] text-sm max-md:landscape:text-xs font-semibold hover:underline transition-all mt-2 max-md:landscape:mt-1">
                    {showFullTony ? 'Minder lezen' : 'Meer lezen'}
                  </button>
                </div>
              </div>

              {/* Gerbrand's story */}
              <div className="animate-on-scroll animate-on-scroll-delay-2 bg-gray-50 rounded-2xl p-10 lg:p-12 max-md:landscape:p-6 border border-gray-100 relative">
                <div className="absolute top-10 right-10 max-md:landscape:top-5 max-md:landscape:right-5 opacity-10">
                  <Quote className="w-16 h-16 max-md:landscape:w-10 max-md:landscape:h-10 text-[#E8854A]" />
                </div>

                <div className="flex items-center gap-4 max-md:landscape:gap-3 mb-10 max-md:landscape:mb-5">
                  <div className="w-16 h-16 max-md:landscape:w-12 max-md:landscape:h-12 rounded-full overflow-hidden border-2 border-[#E8854A]/20 flex-shrink-0">
                    <img src={GERBRAND_IMG} alt="Gerbrand van de Weerd" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-lg max-md:landscape:text-base font-bold text-gray-900">Tony Hoekstra</h3>
                    <p className="text-[#E8854A] text-sm max-md:landscape:text-xs font-medium italic">'Nieuwe werelden openen'</p>
                  </div>
                </div>

                <div className="space-y-4 max-md:landscape:space-y-2 relative z-10">
                  <p className="text-gray-600 max-md:landscape:text-sm leading-relaxed max-md:landscape:leading-snug text-left">
                    Vroeger wilde ik dierenarts worden, maar uiteindelijk heb ik de opleiding Landscape and Environment Management gedaan.
                  </p>
                  <p className="text-gray-600 max-md:landscape:text-sm leading-relaxed max-md:landscape:leading-snug text-left">
                    Bij Bomenwacht heb ik zowel op project- als op managementniveau veel geleerd, maar wat ik zo mooi vind aan NursiTree is dat we iets complex zo simpel mogelijk laten ogen.
                  </p>
                  {showFullGerbrand && <p className="text-gray-600 max-md:landscape:text-sm leading-relaxed max-md:landscape:leading-snug text-left">
                      Als ecoloog vind ik het mooi om waarde toe te voegen aan het bebouwde gebied. In groengebieden regelt de natuur dat zelf wel.
                    </p>}
                  <button onClick={() => setShowFullGerbrand(!showFullGerbrand)} className="text-[#E8854A] text-sm max-md:landscape:text-xs font-semibold hover:underline transition-all mt-2 max-md:landscape:mt-1">
                    {showFullGerbrand ? 'Minder lezen' : 'Meer lezen'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* 8. TESTIMONIALS — Matching Platform page design — Diagonal bottom edge flows into section 9 */}
        <section className="relative z-[3] bg-gray-50 overflow-hidden" style={{
        clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 4vw), 0 100%)',
        paddingTop: '6rem',
        paddingBottom: 'calc(8rem + 4vw)'
      }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Header — matches PlatformSocialProof */}
            <div className="max-w-3xl mx-auto text-center mb-20">
              <span className="text-[#6BA539] text-sm font-semibold uppercase tracking-[0.2em]">
                Ervaringen
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6 tracking-tight">
                Dit zeggen anderen over ons
              </h2>
              <p className="text-lg text-gray-500 leading-relaxed">Gemeenten, aannemers en beheerders delen hun ervaring met NursiTree</p>
            </div>

            {/* Testimonial cards — matches PlatformSocialProof exactly */}
            <div className="grid md:grid-cols-3 gap-8 max-md:landscape:max-w-[640px] max-md:landscape:mx-auto max-md:landscape:px-2">

              {testimonials.map(t => <div key={t.name} className="group bg-white rounded-2xl p-8 border border-gray-100 hover:border-transparent hover:shadow-xl transition-all duration-500 relative overflow-hidden">
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
                        className={t.logo === LOGO_GEMEENTE_ROTTERDAM ? 'w-full h-full object-contain scale-[1.5]' : TIGHT_CROPPED_LOGOS.has(t.logo) ? 'w-[90%] h-[90%] object-contain' : 'max-w-full max-h-full w-auto h-auto object-contain'}
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
        </section>


        {/* 9. SERVICES BRIDGE — Pulled up to connect with testimonials diagonal */}
        <section className="relative z-[1] bg-white" style={{
        marginTop: '-4vw',
        paddingTop: 'calc(7rem + 4vw)',
        paddingBottom: '7rem'
      }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-20 lg:gap-28 items-center">
              <div className="animate-on-scroll relative order-2 lg:order-1">
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <img src={SERVICES_IMG} alt="NursiTree diensten" className="w-full h-[350px] lg:h-[420px] object-cover" />
                </div>
              </div>

              <div className="animate-on-scroll animate-on-scroll-delay-2 order-1 lg:order-2">
                <span className="text-[#E8854A] text-sm font-semibold uppercase tracking-wider">Onze diensten</span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-5 mb-10 leading-tight tracking-tight text-left">
                  Dit zijn onze diensten
                </h2>
                <p className="text-lg text-gray-500 leading-relaxed mb-10 text-left">
                  Van engineering tot installatie en van monitoring tot verplanting. Wat jullie situatie ook nodig heeft, we maken samen een passend plan voor meer vergroening en boomkroonvolume in jullie project.
                </p>
                <Link to="/diensten" className="inline-flex items-center gap-2 px-8 py-4 bg-[#E8854A] text-white text-base font-semibold rounded-xl hover:bg-[#D27337] transition-all duration-200 shadow-lg hover:shadow-xl">
                  Zo doen we dat
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 10. PRODUCT BRIDGE — Diagonal bottom edge flows into Final CTA */}
        <section className="relative z-[3] bg-gray-50" style={{
        clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 4vw), 0 100%)',
        paddingTop: '7rem',
        paddingBottom: 'calc(9rem + 4vw)'
      }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl animate-on-scroll">


              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 leading-tight tracking-tight text-left">
                Zo werkt de Urban Tree Pit
              </h2>

              <p className="text-lg text-gray-500 leading-relaxed mb-12 max-w-2xl text-left">
                De Urban Tree Pit is onze gepatenteerde groeiplaats voor grote bomen met veel boomkroonvolume op plekken waar weinig ruimte is. Wil je weten hoe dit precies werkt?
              </p>

              <Link to="/zo-werkt-het" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#E8854A] text-base font-semibold rounded-xl border-2 border-[#E8854A] hover:bg-[#E8854A] hover:text-white transition-all duration-200 shadow-sm hover:shadow-lg">
                We leggen het graag uit
                <ArrowRight className="w-5 h-5" />
              </Link>

            </div>
          </div>
        </section>

        {/* 11. FINAL CTA — Pulled up to connect with Product Bridge diagonal */}
        <section className="relative z-[1] bg-gray-50" style={{
        marginTop: 'calc(-4vw - 3px)',
        paddingTop: 'calc(3rem + 4vw)',
        paddingBottom: '10rem'
      }}>
          {/* Layer 1: Dark footer-color transition zone at the bottom */}

          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute inset-0 bg-[#182418]" style={{
            clipPath: 'polygon(0 62%, 100% 76%, 100% 100%, 0 100%)'
          }} />
          </div>

          {/* Layer 2: The orange expanding rectangle shape */}
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute inset-0 bg-[#E8854A]" style={{
            clipPath: 'polygon(0 14%, 100% 0%, 100% 76%, 0 62%)'
          }} />
            <div className="absolute inset-0" style={{
            background: 'linear-gradient(105deg, rgba(0,0,0,0.06) 0%, transparent 40%, rgba(255,255,255,0.08) 100%)',
            clipPath: 'polygon(0 14%, 100% 0%, 100% 76%, 0 62%)'
          }} />
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight tracking-tight">
              Neem contact met ons op
            </h2>

            <p className="text-lg text-white/85 mb-12 max-w-2xl mx-auto leading-relaxed">
              Benieuwd hoe NursiTree kan bijdragen aan jouw project? We denken graag met je mee.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/#contact-section" className="px-8 py-4 rounded-xl text-base font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 bg-white text-[#E8854A] hover:bg-gray-50">
                Neem contact op
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

          </div>
        </section>


      </div>
    </PageLayout>;
};
export default OverOnsPage;