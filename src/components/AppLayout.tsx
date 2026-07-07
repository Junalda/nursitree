import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Quote, MapPin, Calendar, Play } from 'lucide-react';

import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import ContactSection from '@/components/ContactSection';

/* ─── Images ─── */
const HERO_IMG = 'https://d64gsuwffb70l.cloudfront.net/69cd2e1dc76c2b3ecc191d41_1775054505111_4d21e005.png';
const SECTION3_TREE_IMG = 'https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1776923880369_ea011b90.png';
const projectImages = ['https://d64gsuwffb70l.cloudfront.net/69cd2e1dc76c2b3ecc191d41_1775054530992_9ded3c29.jpg'];

/* ─── Additional project images ─── */
const SOLUTION_IMG = 'https://d64gsuwffb70l.cloudfront.net/69cd2e1dc76c2b3ecc191d41_1776441316844_36209e55.jpg';

/* ─── Projecten section — each project card below is fully INDEPENDENT.
       No shared data object, no .map() over shared fields, no linked
       images. Every card has its own hardcoded image, title, tags,
       location, date and read time so editing one cannot affect another. ─── */

/* ─── Video ─── */
const SECTION2_VIDEO = 'https://d64gsuwffb70l.cloudfront.net/nursitree_hero_video.mp4';

/* ─── Consistent green — same as CTA section ─── */
const BRAND_GREEN = '#4E8A25';

/* ─── Logo URLs used in the testimonial section.
       The Gemeente Apeldoorn logo PNG has built-in whitespace and is used
       as the OPTICAL SIZE REFERENCE for every other testimonial logo.
       The Sportbedrijf Rotterdam and Gemeente Rotterdam logos are tightly
       cropped (no built-in whitespace), so we scale them down via the
       TIGHT_CROPPED_LOGOS set below so all logos appear visually equal
       in size to the Apeldoorn logo. ─── */
const LOGO_SPORTBEDRIJF_ROTTERDAM_URL = 'https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1778829945182_52a6473e.png';
const LOGO_GEMEENTE_ROTTERDAM_URL = 'https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1778487909424_dc641438.png';
const TIGHT_CROPPED_LOGOS = new Set<string>([LOGO_SPORTBEDRIJF_ROTTERDAM_URL, LOGO_GEMEENTE_ROTTERDAM_URL]);

/* ─── Reviews data (from Platform page section 8) ─── */
const reviews = [{
  quote: 'Ik kijk positief terug op het traject en zie NursiTree als een betrokken en deskundige partner om mee samen te werken.',
  name: 'Martin Nugteren',
  role: 'Projectleider',
  org: 'Gemeente Rotterdam',
  initials: 'MN',
  logo: 'https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1778487909424_dc641438.png',
  logoAlt: 'Logo Gemeente Rotterdam',
  bgColor: BRAND_GREEN,
  textColor: 'text-white',
  subtextColor: 'text-white/70',
  quoteIconBg: 'bg-white/15',
  quoteIconColor: 'text-white',
  borderColor: 'border-white/10',
  avatarBg: 'bg-white/20',
  avatarText: 'text-white'
}, {
  quote: 'Wij zijn blij verrast met de Urban Tree Pit. Een mooie constructie die ons de mogelijkheid biedt bomen toe te passen op locaties waar dit eerst niet mogelijk leek.',
  name: 'Tonnie Berends',
  role: 'Directievoerder',
  org: 'Gemeente Apeldoorn',
  initials: 'TB',
  logo: 'https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1778485303458_f238e827.png',

  logoAlt: 'Logo Gemeente Apeldoorn',
  bgColor: '#E8854A',
  textColor: 'text-white',
  subtextColor: 'text-white/70',
  quoteIconBg: 'bg-white/15',
  quoteIconColor: 'text-white',
  borderColor: 'border-white/10',
  avatarBg: 'bg-white/20',
  avatarText: 'text-white'
}, {
  quote: 'NursiTree is voor ons een betrokken en deskundige partner gebleken. Vooral de open samenwerking en het serieus meenemen van onze input maakten dit traject erg waardevol.',
  name: 'Arjan van Bodegom',
  role: 'Locatiemanager',
  org: 'Sportbedrijf Rotterdam',
  initials: 'AB',
  logo: LOGO_SPORTBEDRIJF_ROTTERDAM_URL,
  logoAlt: 'Logo Sportbedrijf Rotterdam',
  bgColor: '#f5f5f0',
  textColor: 'text-gray-900',
  subtextColor: 'text-gray-500',
  quoteIconBg: 'bg-[#4E8A25]/10',
  quoteIconColor: 'text-[#4E8A25]',
  borderColor: 'border-gray-200',
  avatarBg: 'bg-[#4E8A25]',
  avatarText: 'text-white'
}];


/* Scroll animation hook */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -30px 0px'
    });
    if (ref.current) {
      const els = ref.current.querySelectorAll('.animate-on-scroll');
      els.forEach(el => observer.observe(el));
    }
    return () => observer.disconnect();
  }, []);
  return ref;
}
const AppLayout: React.FC = () => {

  const pageRef = useScrollReveal();
  const [section2Visible, setSection2Visible] = useState(false);
  const section2Ref = useRef<HTMLDivElement>(null);

  /* Vimeo video play state — Apple/Amazon style: thumbnail first, play on click */
  const [videoPlaying, setVideoPlaying] = useState(false);
  const VIMEO_VIDEO_ID = '1069525168';
  const VIMEO_VIDEO_HASH = '68cfe87792';
  const VIMEO_THUMBNAIL = 'https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1778481503241_f92d50ef.png';




  /* Reviews section visibility */
  const [reviewsVisible, setReviewsVisible] = useState(false);
  const reviewsRef = useRef<HTMLDivElement>(null);

  /* Projecten section visibility */
  const [projectenVisible, setProjectenVisible] = useState(false);
  const projectenRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setSection2Visible(true);
    }, {
      threshold: 0.1
    });
    if (section2Ref.current) observer.observe(section2Ref.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setReviewsVisible(true);
    }, {
      threshold: 0.1
    });
    if (reviewsRef.current) observer.observe(reviewsRef.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setProjectenVisible(true);
    }, {
      threshold: 0.1
    });
    if (projectenRef.current) observer.observe(projectenRef.current);
    return () => observer.disconnect();
  }, []);
  return <PageLayout>

      <SEO
        title="NursiTree | Slimme Groeiplaatsen & Urban Tree Pit voor Stedelijke Vergroening"
        description="NursiTree levert gestandaardiseerde, gepatenteerde groeiplaatsen (Urban Tree Pit) voor gezonde bomen in de stad — voor klimaatadaptatie, biodiversiteit en slimme openbare ruimte."
        keywords="Urban Tree Pit, stedelijke vergroening, boomgroeiplaats, klimaatadaptatie, slimme openbare ruimte, boomverplanting, biodiversiteit stad, NursiTree, groeiplaats bomen, hittestress, stadsbomen"
        ogImage="https://d64gsuwffb70l.cloudfront.net/69cd2e1dc76c2b3ecc191d41_1775054478494_25c7d849.png"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'NursiTree',
          alternateName: 'NursiTree B.V.',
          url: 'https://www.nursitree.com/',
          inLanguage: 'nl-NL',
          publisher: {
            '@type': 'Organization',
            name: 'NursiTree',
            url: 'https://www.nursitree.com/'
          },
          description: 'NursiTree maakt van de stad een boomkwekerij met gestandaardiseerde, gepatenteerde groeiplaatsen (Urban Tree Pit) voor gezonde bomen, klimaatadaptatie en biodiversiteit.',
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://www.nursitree.com/?q={search_term_string}',
            'query-input': 'required name=search_term_string'
          }
        }}
      />

      <div ref={pageRef}>


        {/* ============================================================
            1. HERO SECTION — 100vh, extends behind navbar
               Diagonal bottom edge flows into section 2 (green)
               Bottom edge: left at 90% (higher) → right at 100% (lower)
               = slopes DOWNWARD from left to right
               Wrapper bg matches section 2 green so the clipped area
               reveals green, creating a seamless hero→green transition.
         ============================================================ */}
        <div className="relative z-10" style={{
        backgroundColor: BRAND_GREEN
      }}>
          <section className="relative h-screen max-md:landscape:h-auto max-md:landscape:min-h-screen flex flex-col overflow-hidden" style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 90%)'
        }}>

            {/* Background image + overlay that blends to green at the bottom */}
            <div className="absolute inset-0">
              <img src={HERO_IMG} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#182418]/85 via-[#182418]/70 to-[#3a7a1a]/80" />
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex-1 flex flex-col justify-center pt-28 sm:pt-32 pb-20 sm:pb-28 max-md:landscape:pt-24 max-md:landscape:pb-32">


              {/* Eyebrow — visible on tablet & mobile, hidden on desktop */}
              <div className="inline-flex lg:hidden items-center gap-2 px-4 py-2 rounded-full bg-[#E8854A]/20 text-[#E8854A] text-sm font-medium mb-12 border border-[#E8854A]/20 backdrop-blur-sm self-start">
                Stedelijke vergroening, vereenvoudigd
              </div>


              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight max-w-4xl text-left">
                Elke straat verdient{' '}
                <span className="text-[#E8854A]">gezonde bomen</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-white/75 leading-relaxed mt-8 sm:mt-10 mb-10 sm:mb-14 max-w-2xl text-left">Wij leveren gestandaardiseerde groeiplaatsen in de stad zodat bomen overal gezond kunnen groeien.

In onze Urban Tree Pits groeien bomen circa 20 jaar, waarna de bomen eenvoudig te verplaatsen zijn naar een ruime plek om daar het potentieel aan ecosysteemdiensten te bereiken. Op deze manier verandert de stad in de kwekerij voor de stad.</p>

              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Link to="/zo-werkt-het" className="px-8 py-4 bg-[#E8854A] text-white text-base font-semibold rounded-xl hover:bg-[#D27337] transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 animate-pulse-glow">
                  Bekijk onze oplossing
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/#contact-section" className="lg:hidden px-8 py-4 border-2 border-white/25 text-white text-base font-semibold rounded-xl hover:border-white/60 hover:bg-white/10 transition-all duration-200">
                  Neem contact op
                </Link>

              </div>

            </div>
          </section>
        </div>
        {/* END hero wrapper — green bg shows through diagonal clip */}


        {/* ============================================================
            FLOWING SECTIONS WRAPPER 1 (Section 2 → 3 → 4)
            No white gaps — continuous diagonal visual flow.
            Pulled up with -mt-1 to overlap hero wrapper and prevent
            any sub-pixel gap. Hero wrapper green bg seamlessly
            connects to section 2 green.
         ============================================================ */}
        <div className="relative overflow-hidden -mt-1">

          {/* Base gradient fill — starts with BRAND_GREEN (hero/section 2),
              transitions to grey (section 3A), then WHITE (section 3B),
              then orange only where section 4 actually begins. The extended
              WHITE band ensures no orange can leak through any diagonal
              cutouts at the 3A ↔ 3B boundary. */}
          <div className="absolute inset-0" style={{
          background: `linear-gradient(to bottom, ${BRAND_GREEN} 0%, ${BRAND_GREEN} 11%, #f3f4f6 14%, #f3f4f6 52%, #ffffff 56%, #ffffff 78%, #E8854A 82%, #E8854A 100%)`
        }} aria-hidden="true" />




          {/* ============================================================
              2. BRAND STATEMENT — Green (solid)
                 Uses BRAND_GREEN (#4E8A25) — same as CTA section
                 Top: FLAT (0% on both sides) — connects flush with hero
                 Bottom: slopes up L→R (100% → 98%)
           ============================================================ */}
          <section ref={section2Ref} className="relative">
            {/* Green solid shape — flat top, angled bottom */}
            <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
              <div className="absolute inset-0" style={{
              backgroundColor: BRAND_GREEN,
              clipPath: 'polygon(0 0%, 100% 0%, 100% 98%, 0 100%)'
            }} />
            </div>


            {/* Content */}
            <div className="relative z-10 py-32 sm:py-40 lg:py-44">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`max-w-3xl transition-all duration-700 ${section2Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  <p className="text-base sm:text-lg md:text-xl text-white/85 leading-relaxed text-left">Met onze slimme groeiplaats voor nu én een plan voor later geven we bomen de kans om te groeien waar het eigenlijk te krap is. En verplaatsen we ze op het juiste moment naar een blijvende plek. Zonder schade. Mét toekomst. Bekijk onze animatie hoe we dit doen.</p>
                  <p className="text-base sm:text-lg md:text-xl text-white/85 leading-relaxed mt-4 sm:mt-6 text-left"></p>
                </div>

                {/* Vimeo video — Apple/Amazon style: thumbnail + play button overlay,
                    plays Vimeo embed on click. 16:9 aspect ratio, rounded corners,
                    soft shadow, no clutter. Does not autoplay; respects sound off. */}
                <div className={`mt-12 sm:mt-16 lg:mt-20 transition-all duration-700 delay-200 ${section2Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-black ring-1 ring-white/10" style={{ aspectRatio: '16 / 9' }}>
                    {!videoPlaying ? (
                      <button
                        type="button"
                        onClick={() => setVideoPlaying(true)}
                        aria-label="Speel video af"
                        className="group absolute inset-0 w-full h-full block focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                      >
                        {/* Thumbnail */}
                        <img
                          src={VIMEO_THUMBNAIL}
                          alt="NursiTree video — Bekijk hoe onze slimme groeiplaats werkt"
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                        {/* Subtle dark overlay for premium feel + contrast on the play button */}
                        <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/15 to-black/40 transition-colors duration-300 group-hover:from-black/5 group-hover:via-black/10 group-hover:to-black/30" />
                        {/* Centered play button */}
                        <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
                          <span className="relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-white/95 shadow-2xl backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-white">
                            <span className="absolute inset-0 rounded-full bg-white/40 animate-ping opacity-60" />
                            <Play className="relative w-7 h-7 sm:w-9 sm:h-9 lg:w-10 lg:h-10 text-[#4E8A25] fill-[#4E8A25] ml-1" />
                          </span>
                        </span>
                      </button>
                    ) : (
                      <iframe
                        src={`https://player.vimeo.com/video/${VIMEO_VIDEO_ID}?h=${VIMEO_VIDEO_HASH}&autoplay=1&title=0&byline=0&portrait=0&playsinline=1`}
                        title="NursiTree video"
                        loading="lazy"
                        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full border-0"
                      />
                    )}

                  </div>
                </div>



              </div>
            </div>
          </section>


          {/* ============================================================
              3. PROBLEM + SOLUTION + INSIGHT — Grey with angled edges
           ============================================================ */}
          <section className="relative">
            {/* Grey angled shape — 
                 Top: slopes UP L→R (2%→0%) to match section 2 bottom
                 Bottom: slopes DOWN L→R (98%→100%) to match section 4 top */}
            <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
              <div className="absolute inset-0 bg-[#f3f4f6]" style={{
              clipPath: 'polygon(0 2%, 100% 0%, 100% 100%, 0 98%)'
            }} />
            </div>

            <div className="relative z-10 py-20 sm:py-28 lg:py-40">

              {/* --- Problem content — editorial layout with tree image ---
                   Desktop: image LEFT (partially cropped, extending to left edge),
                            text RIGHT (within normal content margins)
                   Mobile/Tablet: stacked layout (image above text)
               --- */}

              {/* Mobile / Tablet — stacked layout */}
              <div className="lg:hidden">
                {/* Image — stretched full width on mobile/tablet to match
                     "De oplossing" image behaviour (consistent visual rhythm).
                     Uses the same wrapper structure: max-w container + rounded
                     overflow-hidden card + w-full image with a 4/3 aspect ratio. */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-10 animate-on-scroll">
                  <div className="rounded-2xl overflow-hidden shadow-xl bg-gray-100 w-full">
                    <img
                      src={SECTION3_TREE_IMG}
                      alt="NursiTree groeiplaats illustratie"
                      className="w-full h-auto object-cover aspect-[4/3] block"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Text content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 animate-on-scroll">
                  <span className="text-[#E8854A] text-xs sm:text-sm font-semibold uppercase tracking-wider">De uitdaging</span>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mt-3 sm:mt-5 mb-5 sm:mb-8 leading-tight tracking-tight text-left">
                    Wij maken slim gebruik van de beperkte ruimte
                  </h2>
                  <p className="text-base sm:text-lg text-gray-500 leading-relaxed mb-4 sm:mb-6 text-left">
                    Iedereen wil wel meer bomen in de stad, maar in de praktijk lijkt daar vaak geen ruimte voor. Je moet rekening houden met:
                  </p>

                  <ul className="flex flex-col gap-3 sm:gap-4 mt-6 sm:mt-8 list-none">
                    {['Kabels & leidingen', 'Parkeerplekken', 'De energietransitie', 'Beperkte ruimte'].map(label => <li key={label} className="flex items-center gap-3 sm:gap-4 text-left">
                          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#E8854A] flex-shrink-0" aria-hidden="true" />
                          <span className="text-sm sm:text-base text-gray-700 font-medium">{label}</span>
                        </li>)}
                  </ul>

                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mt-8 sm:mt-10 leading-tight tracking-tight text-left">
                    Dat past toch nooit?
                  </h3>
                </div>
              </div>



              {/* Desktop — editorial side-by-side layout
                   Image on LEFT: partially cropped, extends beyond container to left edge
                   Text on RIGHT: within normal content margins */}
              <div className="hidden lg:grid lg:grid-cols-2 items-center">
                {/* Left — Tree illustration, partially cropped on left for editorial effect */}
                <div className="animate-on-scroll relative overflow-hidden h-[520px] xl:h-[580px] flex items-center justify-end">
                  <img src={SECTION3_TREE_IMG} alt="NursiTree groeiplaats illustratie" className="h-[85%] w-auto object-contain rounded-2xl shadow-xl" style={{
                  marginRight: '10%',
                  marginLeft: '-15%'
                }} />
                </div>



                {/* Right — Text content */}
                <div className="animate-on-scroll animate-on-scroll-delay-2 pl-12 xl:pl-20 pr-8 xl:pr-16">
                  <span className="text-[#E8854A] text-xs sm:text-sm font-semibold uppercase tracking-wider">
                    Het probleem
                  </span>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mt-3 sm:mt-5 mb-5 sm:mb-8 leading-tight tracking-tight text-left">
                    Wij maken slim gebruik van de beperkte ruimte
                  </h2>
                  <p className="text-base sm:text-lg text-gray-500 leading-relaxed mb-4 sm:mb-6 text-left">
                    Iedereen wil wel meer bomen in de stad, maar in de praktijk lijkt daar vaak geen ruimte voor. Je moet rekening houden met:
                  </p>

                  <ul className="flex flex-col gap-3 xl:gap-4 mt-6 xl:mt-8 list-none">
                    {['Kabels & leidingen', 'Parkeerplekken', 'De energietransitie', 'Beperkte ruimte'].map(label => <li key={label} className="flex items-center gap-3 xl:gap-4 text-left">
                          <span className="w-2 h-2 xl:w-2.5 xl:h-2.5 rounded-full bg-[#E8854A] flex-shrink-0" aria-hidden="true" />
                          <span className="text-sm xl:text-base text-gray-700 font-medium">{label}</span>
                        </li>)}
                  </ul>

                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mt-8 xl:mt-10 leading-tight tracking-tight text-left">
                    Dat past toch nooit?
                  </h3>
                </div>
              </div>


              {/* Remaining content stays in max-w-7xl container */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


                {/* --- Solution content --- spacing reduced for tighter visual flow from "Dat past toch nooit?" */}
                <div className="mt-8 sm:mt-10 lg:mt-12">
                  <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-12 sm:mb-20 animate-on-scroll">
                    {/* Text — left on desktop */}
                    <div className="order-1">
                      <span className="text-[#E8854A] text-xs sm:text-sm font-semibold uppercase tracking-wider">
                        De oplossing
                      </span>
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mt-3 sm:mt-5 mb-5 sm:mb-8 leading-tight tracking-tight text-left">Met onze slimme groeiplaats wel</h2>
                      <p className="text-base sm:text-lg text-gray-500 leading-relaxed text-left">
                        Deze is zo ingericht dat we elke boom op het juiste moment kunnen verplaatsen naar een vaste plek. Zonder schade aan de wortelstructuur of kluit, maar mét een mooie toekomst voor zich.
                      </p>
                    </div>

                    {/* Image — right on desktop, below text on mobile/tablet */}
                    <div className="order-2 w-full">
                      <div className="rounded-2xl overflow-hidden shadow-xl bg-gray-100">
                        <img src="https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1776922601793_7ce48cc8.png" alt="Boom wordt zorgvuldig verplaatst met intacte wortelkluit" className="w-full h-auto object-cover aspect-[4/3] block" loading="lazy" />
                      </div>
                    </div>
                  </div>


                  {/* Three solution pillars */}
                  <div className="grid sm:grid-cols-3 gap-5 sm:gap-5 md:gap-8 lg:gap-14">
                    {[{
                    title: 'Flexibel verplaatsbaar',
                    desc: 'Elke boom kan op het juiste moment worden verplaatst naar een vaste plek, zonder stress voor de boom.'
                  }, {
                    title: 'Wortelbescherming',
                    desc: 'Zonder schade aan de wortelstructuur of kluit. Het systeem beschermt wat onder de grond groeit.'
                  }, {
                    title: 'Toekomstbestendig',
                    desc: 'Speel in op veranderingen met flexibele bomen en richt de buitenruimte zo groen en efficiënt mogelijk in.'
                  }].map((item, i) => <div key={item.title} className={`animate-on-scroll animate-on-scroll-delay-${i + 1} group flex flex-col h-full text-left p-6 sm:p-6 md:p-8 lg:p-10 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-300`}>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">{item.title}</h3>
                        <p className="text-sm sm:text-base text-gray-500 leading-relaxed">{item.desc}</p>
                      </div>)}
                  </div>

                  {/* CTA — styled as button, links to Zo werkt het */}
                  <div className="mt-10 sm:mt-16">
                    <Link to="/zo-werkt-het" className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#E8854A] text-white text-sm sm:text-base font-semibold rounded-xl hover:bg-[#D27337] transition-all duration-200 shadow-md hover:shadow-lg">
                      Ik wil meer weten
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </section>


          {/* ============================================================
              3B. INSIGHT TILE — Dedicated white section
                  Splits the former section 3 into two parts so the
                  "misverstand" quote gets its own breathing room.
                  White background creates a clear visual break between
                  the grey problem/solution block (section 3A) and the
                  orange about section (section 4).
                  Diagonal top/bottom keeps the flow consistent.
           ============================================================ */}
          <section className="relative">
            {/* Solid white shape with subtle diagonals for smooth flow */}
            <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
              <div className="absolute inset-0 bg-white" style={{
              clipPath: 'polygon(0 0%, 100% 2%, 100% 98%, 0 100%)'
            }} />
            </div>

            <div className="relative z-10 py-16 sm:py-24 lg:py-32">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="animate-on-scroll">
                  <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 sm:p-12 lg:p-16 border border-gray-100 shadow-lg">
                    <blockquote className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-snug tracking-tight mb-6 sm:mb-10 text-left">
                      Het is een misverstand dat bomen altijd moeten worden aangeplant voor een looptijd van tachtig jaar.
                    </blockquote>

                    <p className="text-base sm:text-lg text-gray-500 leading-relaxed max-w-2xl mb-4 sm:mb-6 text-left">
                      Helemaal niet slim zelfs, omdat gebiedsontwikkelingen, rioolvervangingen en andere factoren ervoor zorgen dat je nooit zeker weet hoe een gebied er over een aantal jaar uitziet.
                    </p>

                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-2xl font-medium text-left">
                      Speel hier dus op in met flexibele bomen en richt de buitenruimte zo groen en efficiënt mogelijk in.
                    </p>

                    {/* "Nieuw perspectief" — with # symbol */}
                    <div className="flex justify-end mt-8 sm:mt-12">
                      <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#E8854A]/10 text-[#E8854A] text-xs sm:text-sm font-medium">
                        <span className="text-sm sm:text-base font-bold">#</span>
                        Nieuw perspectief
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>



          {/* ============================================================
              4. ABOUT SECTION — Orange
                 Proper mirrored diagonal shape — WIDE LEFT, NARROW RIGHT:
                 Top edge: slopes DOWN L→R (0% → 8%)
                   → top-left is higher, top-right is lower
                 Bottom edge: slopes UP L→R (100% → 92%)
                   → bottom-left is lower, bottom-right is higher
                 Left side height: 100% (wide)
                 Right side height: 84% (narrow)
                 clip-path: polygon(0 0%, 100% 8%, 100% 92%, 0 100%)
           ============================================================ */}

          <section className="relative">
            {/* Orange shape — WIDE LEFT, NARROW RIGHT
                Top: 0% → 8% = slopes DOWN L→R
                Bottom: 100% → 92% = slopes UP L→R
                Edges are OPPOSITE directions (not parallel) */}
            <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
              {/* White base — fills the entire section so any area NOT covered
                  by the orange clipPath (top + bottom diagonal cutouts) shows
                  pure white (#ffffff) instead of the wrapper gradient orange.
                  This makes the diagonal divider between Over ons and the
                  Projecten section read as a clean white transition. */}
              <div className="absolute inset-0 bg-white" />
              <div className="absolute inset-0 bg-[#E8854A]" style={{
              clipPath: 'polygon(0 0%, 100% 8%, 100% 92%, 0 100%)'
            }} />
              {/* Subtle depth overlay — same clip-path */}
              <div className="absolute inset-0" style={{
              background: 'linear-gradient(225deg, rgba(0,0,0,0.04) 0%, transparent 40%, rgba(255,255,255,0.06) 100%)',
              clipPath: 'polygon(0 0%, 100% 8%, 100% 92%, 0 100%)'
            }} />
            </div>





            <div className="relative z-10 py-24 sm:py-32 lg:py-44">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-md:landscape:px-8">
                <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-28 items-center">
                  {/* Left — Image (fully visible, no cropping on any device) */}
                  <div className="animate-on-scroll relative max-md:landscape:max-w-[calc(100%-2rem)] max-md:landscape:mx-auto max-md:landscape:w-full">
                    <div className="rounded-2xl shadow-xl bg-white/5 overflow-hidden max-md:landscape:max-w-full">
                      <img src="https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1776911910149_a16141e3.png" alt="NursiTree team aan het werk" className="w-full h-auto max-w-full object-contain block rounded-2xl" loading="lazy" />
                    </div>
                    {/* Accent card */}
                    <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-white rounded-xl p-4 sm:p-6 shadow-xl hidden sm:block max-md:landscape:hidden">
                      <div className="text-2xl sm:text-3xl font-bold text-[#E8854A]">25+</div>
                      <div className="text-xs sm:text-sm text-gray-600 mt-1">Jaar expertise</div>
                    </div>
                  </div>


                  {/* Right — Copy */}
                  <div className="animate-on-scroll animate-on-scroll-delay-2">
                    <span className="text-white/70 text-xs sm:text-sm font-semibold uppercase tracking-wider">
                      Over ons
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-3 sm:mt-5 mb-5 sm:mb-8 leading-tight tracking-tight text-left">
                      Wie zijn wij
                    </h2>
                    <p className="text-base sm:text-lg text-white/80 leading-relaxed mb-4 sm:mb-6 text-left">Van showmodellen tot stedelijke vergroening, bekijk hoe we de Urban Tree Pit in verschillende omgevingen inzetten.</p>
                    <p className="text-base sm:text-lg text-white/80 leading-relaxed mb-6 sm:mb-10 text-left">
                      Met meer dan 25 jaar expertise in stedelijk groen, infrastructuur en boomtechnologie ontwikkelen wij slimme, geïntegreerde oplossingen.
                    </p>

                    {/* Key expertise points */}
                    <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-12">
                      {['Stedelijk groen & boomtechnologie', 'Infrastructuur & gebiedsontwikkeling', 'Waar anderen obstakels zien, zien wij kansen'].map(text => <div key={text} className="flex items-center gap-3 sm:gap-4">
                          <div className="w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" />
                          <span className="text-sm sm:text-base text-white/90 font-medium text-left">{text}</span>
                        </div>)}
                    </div>

                    <Link to="/over-ons" className="inline-flex items-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 bg-white text-[#E8854A] font-semibold rounded-xl hover:bg-white/90 transition-all duration-200 shadow-md hover:shadow-lg text-sm sm:text-base">
                      Leer ons beter kennen
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
        {/* END flowing sections wrapper 1 (2 → 3 → 4) */}


        {/* ============================================================
            4b. PROJECTEN SECTION — White background between wrappers
                Showcases NursiTree projects in practice
         ============================================================ */}
        <section ref={projectenRef} className="relative py-20 sm:py-28 lg:py-36 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Section header */}
            <div className={`max-w-3xl mb-14 sm:mb-20 transition-all duration-700 ${projectenVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <span className="text-[#E8854A] text-sm font-semibold uppercase tracking-[0.2em]">
                Projecten
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6 tracking-tight text-left">
                Onze projecten in de praktijk
              </h2>
              <p className="text-base sm:text-lg text-gray-500 leading-relaxed text-left">Van showmodellen tot stedelijke vergroening, bekijk hoe we de Urban Tree Pit in verschillende omgevingen inzetten.</p>
            </div>

            {/* ============================================================
                Project cards grid — each card below is written as a FULLY
                INDEPENDENT JSX block. There is NO shared data object, NO
                .map(), NO shared image URL, NO reusable sub-component with
                shared state. Every card hardcodes its own image, title,
                tags, location, date and read time. Editing one card can
                therefore NEVER affect another.
             ============================================================ */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-md:landscape:grid-cols-2 max-md:landscape:gap-4 max-md:landscape:max-w-[88%] max-md:landscape:mx-auto items-start">


              {/* ───────────── PROJECT CARD 1 — Apeldoorn (independent) ───────────── */}
              <Link to="/projecten" className={`group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-500 flex flex-col hover:-translate-y-1 cursor-pointer ${projectenVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{
              transitionDelay: projectenVisible ? '0ms' : '0ms'
            }}>
                <div className="relative aspect-[16/10] max-md:landscape:aspect-[16/9] overflow-hidden">
                  <img src="https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1776948014857_81addac0.jpeg" alt="Urban Tree Pits Edisonlaan Apeldoorn" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 sm:p-7 max-md:landscape:p-4 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 max-md:landscape:gap-2 text-xs max-md:landscape:text-[10px] text-gray-500 mb-3 max-md:landscape:mb-2">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 max-md:landscape:w-3 max-md:landscape:h-3" />
                      Apeldoorn
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 max-md:landscape:w-3 max-md:landscape:h-3" />
                      Maart 2026
                    </span>
                    <span className="ml-auto">4 min</span>
                  </div>
                  <h3 className="text-lg sm:text-xl max-md:landscape:text-sm font-bold text-gray-900 leading-snug mb-3 max-md:landscape:mb-2 group-hover:text-[#6BA539] transition-colors">
                    Urban Tree Pits Edisonlaan Apeldoorn
                  </h3>
                  <div className="mt-4 max-md:landscape:mt-2 flex flex-wrap gap-1.5 lg:hidden">
                    <span className="inline-flex items-center rounded-full bg-[#6BA539]/10 text-[#4E8A25] font-medium border border-[#6BA539]/15 whitespace-nowrap px-2.5 py-1 max-md:landscape:px-2 max-md:landscape:py-0.5 text-[11px] sm:text-xs max-md:landscape:text-[10px]">Parkeerdruk</span>
                    <span className="inline-flex items-center rounded-full bg-[#6BA539]/10 text-[#4E8A25] font-medium border border-[#6BA539]/15 whitespace-nowrap px-2.5 py-1 max-md:landscape:px-2 max-md:landscape:py-0.5 text-[11px] sm:text-xs max-md:landscape:text-[10px]">Kabels en leidingen</span>
                    <span className="inline-flex items-center rounded-full bg-[#6BA539]/10 text-[#4E8A25] font-medium border border-[#6BA539]/15 whitespace-nowrap px-2.5 py-1 max-md:landscape:px-2 max-md:landscape:py-0.5 text-[11px] sm:text-xs max-md:landscape:text-[10px]">Hoog grondwater</span>
                  </div>

                  <span className="mt-5 max-md:landscape:mt-3 inline-flex items-center gap-1.5 text-[#6BA539] text-sm max-md:landscape:text-xs font-semibold group-hover:gap-2.5 transition-all self-start">
                    Lees meer
                    <ArrowRight className="w-4 h-4 max-md:landscape:w-3.5 max-md:landscape:h-3.5" />
                  </span>
                </div>
              </Link>


              {/* ───────────── PROJECT CARD 2 — Sportpark DRL Rotterdam (independent) ───────────── */}
              <Link to="/projecten" className={`group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-500 flex flex-col hover:-translate-y-1 cursor-pointer ${projectenVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{
              transitionDelay: projectenVisible ? '150ms' : '0ms'
            }}>
                <div className="relative aspect-[16/10] max-md:landscape:aspect-[16/9] overflow-hidden">
                  <img src="https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1777960991914_9abaedce.jpeg" alt="Urban Tree Pits Sportpark DRL Rotterdam — bloeiende tulpen langs het kunstgrasveld" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />

                </div>
                <div className="p-6 sm:p-7 max-md:landscape:p-4 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 max-md:landscape:gap-2 text-xs max-md:landscape:text-[10px] text-gray-500 mb-3 max-md:landscape:mb-2">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 max-md:landscape:w-3 max-md:landscape:h-3" />
                      Rotterdam
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 max-md:landscape:w-3 max-md:landscape:h-3" />
                      november 2025
                    </span>
                    <span className="ml-auto">5 min</span>
                  </div>
                  <h3 className="text-lg sm:text-xl max-md:landscape:text-sm font-bold text-gray-900 leading-snug mb-3 max-md:landscape:mb-2 group-hover:text-[#6BA539] transition-colors">
                    Urban Tree Pits Sportpark DRL Rotterdam
                  </h3>
                  <div className="mt-4 max-md:landscape:mt-2 flex flex-wrap gap-1.5 lg:hidden">

                    <span className="inline-flex items-center rounded-full bg-[#6BA539]/10 text-[#4E8A25] font-medium border border-[#6BA539]/15 whitespace-nowrap px-2.5 py-1 max-md:landscape:px-2 max-md:landscape:py-0.5 text-[11px] sm:text-xs max-md:landscape:text-[10px]">Sportvelden</span>
                    <span className="inline-flex items-center rounded-full bg-[#6BA539]/10 text-[#4E8A25] font-medium border border-[#6BA539]/15 whitespace-nowrap px-2.5 py-1 max-md:landscape:px-2 max-md:landscape:py-0.5 text-[11px] sm:text-xs max-md:landscape:text-[10px]">Hittestress</span>
                    <span className="inline-flex items-center rounded-full bg-[#6BA539]/10 text-[#4E8A25] font-medium border border-[#6BA539]/15 whitespace-nowrap px-2.5 py-1 max-md:landscape:px-2 max-md:landscape:py-0.5 text-[11px] sm:text-xs max-md:landscape:text-[10px]">Biodiversiteit</span>
                  </div>
                  <span className="mt-5 max-md:landscape:mt-3 inline-flex items-center gap-1.5 text-[#6BA539] text-sm max-md:landscape:text-xs font-semibold group-hover:gap-2.5 transition-all self-start">
                    Lees meer
                    <ArrowRight className="w-4 h-4 max-md:landscape:w-3.5 max-md:landscape:h-3.5" />
                  </span>
                </div>
              </Link>


              {/* ───────────── PROJECT CARD 3 — Rotterdam LMO (independent) ───────────── */}
              <Link to="/projecten" className={`group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-500 flex flex-col hover:-translate-y-1 cursor-pointer ${projectenVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{
              transitionDelay: projectenVisible ? '300ms' : '0ms'
            }}>
                <div className="relative aspect-[16/10] max-md:landscape:aspect-[16/9] overflow-hidden">
                  <img src="https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1777961688315_d7b9019d.jpg" alt="Urban Tree Pits Rotterdam LMO — aangeplante haagbeuk in Urban Tree Pit met voetbalveld op de achtergrond" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" />

                </div>
                <div className="p-6 sm:p-7 max-md:landscape:p-4 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 max-md:landscape:gap-2 text-xs max-md:landscape:text-[10px] text-gray-500 mb-3 max-md:landscape:mb-2">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 max-md:landscape:w-3 max-md:landscape:h-3" />
                      Rotterdam
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 max-md:landscape:w-3 max-md:landscape:h-3" />
                      november 2025
                    </span>
                    <span className="ml-auto">4 min</span>
                  </div>
                  <h3 className="text-lg sm:text-xl max-md:landscape:text-sm font-bold text-gray-900 leading-snug mb-3 max-md:landscape:mb-2 group-hover:text-[#6BA539] transition-colors">
                    Urban Tree Pit Rotterdam LMO
                  </h3>

                  <div className="mt-4 max-md:landscape:mt-2 flex flex-wrap gap-1.5 lg:hidden">
                    <span className="inline-flex items-center rounded-full bg-[#6BA539]/10 text-[#4E8A25] font-medium border border-[#6BA539]/15 whitespace-nowrap px-2.5 py-1 max-md:landscape:px-2 max-md:landscape:py-0.5 text-[11px] sm:text-xs max-md:landscape:text-[10px]">Sportvelden</span>
                    <span className="inline-flex items-center rounded-full bg-[#6BA539]/10 text-[#4E8A25] font-medium border border-[#6BA539]/15 whitespace-nowrap px-2.5 py-1 max-md:landscape:px-2 max-md:landscape:py-0.5 text-[11px] sm:text-xs max-md:landscape:text-[10px]">Hittestress</span>
                  </div>

                  <span className="mt-5 max-md:landscape:mt-3 inline-flex items-center gap-1.5 text-[#6BA539] text-sm max-md:landscape:text-xs font-semibold group-hover:gap-2.5 transition-all self-start">
                    Lees meer
                    <ArrowRight className="w-4 h-4 max-md:landscape:w-3.5 max-md:landscape:h-3.5" />
                  </span>
                </div>
              </Link>


            </div>



            {/* CTA */}
            <div className={`mt-12 sm:mt-16 transition-all duration-700 delay-300 ${projectenVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <Link to="/projecten" className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#E8854A] text-white text-sm sm:text-base font-semibold rounded-xl hover:bg-[#D27337] transition-all duration-200 shadow-md hover:shadow-lg"><ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />Bekijk al onze projecten</Link>

            </div>

          </div>
        </section>


        {/* ============================================================
            FLOWING SECTIONS WRAPPER 2 (5)
            Reviews section → transitions down to white so the
            Contact section (white bg) below flows seamlessly.
         ============================================================ */}
        <div className="relative overflow-hidden">

          {/* Base gradient fill — starts with white (matches Projecten above),
              stays on the cream/neutral tone used by the reviews card, and
              fades back to white at the bottom so the following Contact
              section (bg-white) connects without a seam. */}
          <div className="absolute inset-0" style={{
          background: `linear-gradient(to bottom, #ffffff 0%, #faf9f6 6%, #faf9f6 80%, #ffffff 100%)`
        }} aria-hidden="true" />




          {/* ============================================================
              5. REVIEWS SECTION
                 Reviews from Platform page section 8 with alternating colors
           ============================================================ */}
          <section ref={reviewsRef} className="relative">
            {/* Neutral angled shape — top matches section 4 bottom (8% slope UP L→R) */}
            <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
              <div className="absolute inset-0 bg-[#faf9f6]" style={{
              clipPath: 'polygon(0 8%, 100% 0%, 100% 92%, 0 100%)'
            }} />
            </div>


            <div className="relative z-10 py-20 sm:py-28 lg:py-36">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section header */}
                {/* Section header */}
                <div className={`max-w-3xl mx-auto text-center mb-14 sm:mb-20 max-md:landscape:mb-8 transition-all duration-700 ${reviewsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  <span className="text-[#4E8A25] text-sm font-semibold uppercase tracking-[0.2em]">
                    Ervaringen
                  </span>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6 tracking-tight">
                    Dit zeggen anderen over ons
                  </h2>
                  <p className="text-base sm:text-lg text-gray-500 leading-relaxed">Gemeenten, aannemers en beheerders delen hun ervaring over NursiTree.</p>
                </div>

                {/* Review cards — alternating colors: green / orange / neutral */}
                <div className="grid md:grid-cols-3 gap-6 sm:gap-8 max-md:landscape:gap-4 max-md:landscape:max-w-[88%] max-md:landscape:mx-auto">
                  {reviews.map((review, index) => <div key={review.name} className={`group rounded-2xl p-7 sm:p-8 max-md:landscape:p-5 transition-all duration-500 hover:shadow-xl relative overflow-hidden ${reviewsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{
                  backgroundColor: review.bgColor,
                  transitionDelay: reviewsVisible ? `${index * 150}ms` : '0ms'
                }}>
                      {/* Quote icon */}
                      <div className={`w-10 h-10 max-md:landscape:w-8 max-md:landscape:h-8 rounded-lg flex items-center justify-center mb-6 max-md:landscape:mb-4 ${review.quoteIconBg}`}>
                        <Quote className={`w-5 h-5 max-md:landscape:w-4 max-md:landscape:h-4 ${review.quoteIconColor}`} />
                      </div>

                      {/* Quote text */}
                      <p className={`${review.textColor} text-sm max-md:landscape:text-xs leading-relaxed mb-8 max-md:landscape:mb-5 min-h-[100px] max-md:landscape:min-h-0`}>
                        &ldquo;{review.quote}&rdquo;
                      </p>

                      {/* Author */}
                      <div className={`flex items-center gap-3 max-md:landscape:gap-2 pt-6 max-md:landscape:pt-4 border-t ${review.borderColor}`}>
                        {/* Logo tile — uniform 12x12 white tile, centered, object-contain.
                            All testimonial logos must appear optically equal in size
                            to the Gemeente Apeldoorn logo (the reference). The Apeldoorn
                            PNG has built-in whitespace, so at max-w-full / max-h-full
                            it visually renders at ~72% of the tile. The Sportbedrijf
                            Rotterdam and Gemeente Rotterdam logos are tightly cropped
                            (no built-in whitespace), so we render those at 72% width/
                            height — matching the Apeldoorn optical size. Proportions
                            are preserved (object-contain), centered both axes, never
                            cropped or stretched, and the same rule applies across
                            desktop, tablet, mobile portrait and mobile landscape
                            (including the smaller 9x9 landscape tile variant). */}
                        <div className="w-12 h-12 max-md:landscape:w-9 max-md:landscape:h-9 rounded-lg bg-white flex items-center justify-center p-1.5 max-md:landscape:p-1 shadow-sm flex-shrink-0 overflow-hidden">
                          <img
                            src={review.logo}
                            alt={review.logoAlt}
                            className={TIGHT_CROPPED_LOGOS.has(review.logo) ? 'w-[72%] h-[72%] object-contain' : 'max-w-full max-h-full w-auto h-auto object-contain'}
                            loading="lazy"
                            decoding="async"
                          />
                        </div>



                        <div className="min-w-0">
                          <p className={`text-sm max-md:landscape:text-xs font-bold ${review.textColor} truncate`}>{review.name}</p>
                          <p className={`text-xs max-md:landscape:text-[10px] ${review.subtextColor}`}>
                            {review.role},<br className="lg:hidden" /> {review.org}
                          </p>
                        </div>

                      </div>

                    </div>)}
                </div>


              </div>
            </div>
          </section>

        </div>
        {/* END flowing sections wrapper 2 (5) */}


        {/* ============================================================
            6. CONTACT SECTION — Moved here from Platform page.
               Same component, same design, same text, same form.
               Transitions cleanly from the reviews section above
               (neutral/white) into the dark footer below.
         ============================================================ */}
        <ContactSection />



      </div>
    </PageLayout>;
};
export default AppLayout;