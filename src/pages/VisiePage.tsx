import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Recycle, Sprout, Layers, Sun, Plug, Users, Box } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';

/* ─── Images ─── */
const AERIAL_IMG = 'https://d64gsuwffb70l.cloudfront.net/69cd2e1dc76c2b3ecc191d41_1775054505111_4d21e005.png';
const PARK_IMG = 'https://d64gsuwffb70l.cloudfront.net/69cd2e1dc76c2b3ecc191d41_1775054558732_872d6481.png';
const PROJECT_IMG = 'https://d64gsuwffb70l.cloudfront.net/69cd2e1dc76c2b3ecc191d41_1775054560301_48af53a0.jpg';
const TREE_ICON = 'https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1775054330492_117a17e8.png';

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

/* ─── Urban Challenges Data ─── */
const challenges = [{
  title: 'Biodiversiteit',
  text: 'De toepassing van een gemengd sortiment zorgt voor veel meer verschillende leeftijden en soorten vogels, insecten en begroeiing in een straat.',
  accent: '#6BA539',
  // 3A-biodivers.jpg
  image: 'https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1777926098749_fc4ac3ce.jpg',
  imageAlt: 'Eekhoorn en vogelnest in een boom — illustratie van biodiversiteit'
}, {
  title: 'Waterbeheer',
  text: 'Met het geïntegreerde waterresservoir worden bomen een onderdeel van het watersysteem waarbij water lokaal wordt vastgehouden en gebruikt om de straat lokaal te koelen.',
  accent: '#E8854A',
  // 3B-waterbeheer.png
  image: 'https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1777926097559_579c45c4.jpg',
  imageAlt: 'Mensen in gesprek bij een stadsboom — illustratie van waterbeheer in de stad'
}, {
  title: 'Klimaat',
  text: 'Omdat we de groeipotentie van bomen zowel in krappere straten als op blijvende groeiplaatsen volledig benutten, dragen we bij aan vermindering van hittestress en verbetering van de leefomgeving.',
  accent: '#E8854A',
  // 3C Klimaat.jpg
  image: 'https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1777926377849_3ee9482e.jpg',
  imageAlt: 'Urban Tree Pit doorsnede met boom, waterreservoir en straat — illustratie van klimaatadaptatie en hittestress'
}];



/* ─── Values Data ─── */
const values = [{
  icon: Recycle,
  title: 'Circulair',
  text: 'We kijken kritisch naar de levensduur en de duurzaamheid van de gebruikte materialen. Onze oren en ogen houden we altijd open voor nieuwe ideeën om onze oplossing zo circulair en duurzaam mogelijk te houden. En na de verplanting letten we goed op dat de kluit geen restmaterialen uit het systeem bevat.'
}, {
  icon: Sprout,
  title: 'Natuurlijke principes',
  text: 'We willen dat er geen externe energiebronnen nodig zijn om de bomen te laten groeien. Het systeem is daarom gebaseerd op natuurlijke principes. Vrij verval en capillaire werking van de bodem zorgen ervoor dat de bomen altijd voldoende (en nooit te veel) water ter beschikking hebben.'
}, {
  icon: Layers,
  title: 'Integraal',
  text: 'Door de samenwerking met (partners in) verschillende vakgebieden gaan we voor een optimaal mogelijke inrichting van de buitenruimte, zowel boven- als ondergronds. Conflicten met kabels en leidingen zijn hiermee verleden tijd. Goed groeiende bomen en parkeren gaan door de sterke constructie wél samen.'
}, {
  icon: Sun,
  title: 'Klimaat',
  text: 'Door de optimale groeiplaats wordt de volledige groeikracht van bomen benut. Hierdoor zijn de kweekplekken eerder en beter voorzien van voldoende boomkronen. Na de kweekperiode gaan deze bomen verder op hun nieuwe plek buiten het systeem om nog veel meer ecosysteemdiensten te leveren.'
}, {
  icon: Plug,
  title: 'Plug & Play',
  text: 'Bij de engineering van de buitenruimte zijn de Urban Tree Pits eenvoudig in te passen. Door de standaardisatie is het altijd meteen duidelijk hoeveel ruimte bomen nodig hebben. Zo weet iedereen waar hij aan toe is én is het gemakkelijk om het systeem te installeren.'
}, {
  icon: Users,
  title: 'Maatschappelijk betrokken',
  text: 'Onze Urban Tree Pit wordt meestal geplaatst op plekken waar veel mensen wonen. We vinden het belangrijk om bewoners in een vroeg stadium te betrekken en te informeren over de plannen.'
}, {
  icon: Box,
  title: 'Standaard',
  text: 'Omdat we werken met gestandaardiseerde producten, zijn de verschillende onderdelen makkelijk uitwisselbaar. Een boombak kan hierdoor eenvoudig worden ingezet als extra waterbergingscapaciteit. De standaardisatie zorgt ervoor dat het product schaalbaar is en dat de productie (kosten)efficiënt is.'
}];

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
const VisiePage: React.FC = () => {
  const pageRef = useScrollReveal();
  const heroRef = useRef<HTMLDivElement>(null);

  /* Section-level visibility for animated sections */
  const section2 = useSectionVisible(0.12);
  const section4 = useSectionVisible(0.1);
  const section7 = useSectionVisible(0.1);
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
      <SEO
        title="Onze visie | Stedelijke vergroening & klimaatadaptatie | NursiTree"
        description="De NursiTree-visie: van de stad een boomkwekerij maken voor klimaatadaptatie, biodiversiteit en een leefbare openbare ruimte met de gepatenteerde Urban Tree Pit."
        keywords="visie NursiTree, stedelijke vergroening, klimaatadaptatie, biodiversiteit stad, slimme openbare ruimte, hittestress, waterbeheer stad, boomkwekerij in de stad"
        breadcrumbs={[
          { name: 'Home', url: 'https://www.nursitree.com/' },
          { name: 'Onze visie', url: 'https://www.nursitree.com/onze-visie' },
        ]}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Onze visie',
          url: 'https://www.nursitree.com/onze-visie',
          description: 'NursiTree werkt op het snijvlak van bouwkunde, techniek, industrieel ontwerp, landschapsinrichting en duurzaamheid om bij te dragen aan klimaatadaptatie, biodiversiteit en een leefbare stad.',
          inLanguage: 'nl-NL',
          isPartOf: { '@type': 'WebSite', name: 'NursiTree', url: 'https://www.nursitree.com/' }
        }}
      />
      <div ref={pageRef}>

        {/* ═══════════════════════════════════════════════════════════════
            1. HERO — Matching ZwhHero layout (split: text left, image right)
            ═══════════════════════════════════════════════════════════════ */}
        <section className="relative min-h-[85vh] sm:min-h-[92vh] flex items-center overflow-hidden bg-white">
          {/* Subtle background accents — matching ZwhHero */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-[#E8854A]/[0.04] to-transparent" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#6BA539]/[0.03] rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

          <div ref={heroRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-0 w-full relative z-10">
            <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 lg:gap-24 items-center">
              {/* Left — Copy */}
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#E8854A]/10 text-[#E8854A] text-xs sm:text-sm font-medium mb-6 sm:mb-10 border border-[#E8854A]/15 lg:hidden">
                  Visie op de stad
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-gray-900 leading-[1.08] tracking-tight mb-5 sm:mb-8">

                  Met de stad als kwekerij maken we een{' '}
                  <span className="text-[#E8854A]">positieve impact</span>
                  {' '}op onze leefomgeving
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-gray-500 leading-relaxed mb-8 sm:mb-12 max-w-lg text-left">
                  Wij geloven in een toekomst waarin bomen niet worden beperkt door de stedelijke omgeving, maar hier juist in floreren.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Link to="/diensten" className="px-6 sm:px-8 py-3.5 sm:py-4 bg-[#E8854A] text-white text-sm sm:text-base font-semibold rounded-xl hover:bg-[#D27337] transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                    Ontdek onze aanpak
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Link>
                  {/* "Neem contact op" — visible on mobile/tablet, hidden on desktop */}
                  <Link to="/#contact-section" className="px-6 sm:px-8 py-3.5 sm:py-4 border-2 border-gray-200 text-gray-700 text-sm sm:text-base font-semibold rounded-xl hover:border-[#E8854A] hover:text-[#E8854A] transition-all duration-200 flex items-center justify-center gap-2 lg:hidden">

                    Neem contact op
                  </Link>
                </div>
              </div>

              {/* Right — Hero image */}
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img src="https://d64gsuwffb70l.cloudfront.net/69cd2e1dc76c2b3ecc191d41_1775066809875_3048d8c5.jpg" alt="NursiTree team en stedelijke vergroening" className="w-full h-[280px] sm:h-[350px] md:h-[400px] lg:h-[520px] object-cover" />


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

                {/* Floating card — top right (matches "25+ Jaar expertise" pattern) */}
                <div className="absolute -top-4 -right-4 bg-[#E8854A] rounded-xl shadow-xl p-4 border border-[#E8854A] hidden md:block animate-float-slow">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="text-xl sm:text-2xl font-bold text-white leading-tight">Visie</div>
                      <div className="text-xs sm:text-sm text-white/80">op de stad</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>


        {/* ═══════════════════════════════════════════════════════════════
            2. INTRODUCTION — Orange diagonal design matching ZwhIntro
            ═══════════════════════════════════════════════════════════════ */}
        <section ref={section2.ref} className="relative overflow-hidden" style={{
        marginTop: '-1px'
      }}>
          {/* Gradient fill behind the angled shape: white at top → light at bottom */}
          <div className="absolute inset-0" style={{
          background: 'linear-gradient(to bottom, #ffffff 0%, #f9fafb 100%)'
        }} aria-hidden="true" />

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
              <div className="grid lg:grid-cols-2 gap-20 lg:gap-28 items-center">
                <div className={`transition-all duration-700 ${section2.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  <span className="text-white/80 text-sm font-semibold uppercase tracking-[0.2em]">Onze missie</span>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-4 mb-8 leading-tight tracking-tight text-left"></h2>
                  <p className="text-white/85 mb-6 text-left text-3xl">Bomen zijn essentieel in de strijd tegen klimaatverandering.</p>
                  <p className="text-lg text-white/85 leading-relaxed text-left">
                    Daarom werken we op het snijvlak van bouwkunde, techniek, industrieel ontwerp, landschapsinrichting en duurzaamheid aan slimme oplossingen voor de buitenruimte van morgen.
                  </p>

                  <div className="flex flex-wrap gap-3 mt-12">
                    {['Bouwkunde', 'Techniek', 'Industrieel ontwerp', 'Landschapsinrichting', 'Duurzaamheid'].map(tag => <span key={tag} className="px-4 py-2 rounded-full bg-white/15 text-white text-sm font-medium border border-white/20">
                        {tag}
                      </span>)}
                  </div>
                </div>

                <div className={`relative transition-all duration-700 delay-200 ${section2.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  <div className="rounded-2xl overflow-hidden shadow-2xl">
                    <img src="https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1776932188666_a753b811.jpg" alt="Stedelijke vergroening vanuit de lucht" className="w-full h-[400px] lg:h-[500px] object-cover" />

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTIONS 3–4–5 SEAMLESS DIAGONAL FLOW
            
            Architecture:
            - The outer wrapper has NO background so the body white shows through
            - Section 3 has its own bg-gray-50 with a diagonal bottom clip
            - Section 4 has its green diagonal (z-[2])
            - Section 5 has its own bg-gray-50 with a diagonal top clip
            - Generous overlap via negative margins ensures no gaps
            - The diagonal angles all match (same vw-based slope)
            ═══════════════════════════════════════════════════════════════ */}
        <div className="relative overflow-hidden">

          {/* ─── 3. URBAN CHALLENGES — with diagonal bottom edge ─── */}
          <section className="relative z-[1]" style={{
          backgroundColor: '#f9fafb',
          clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 calc(100% - 5.5vw))',
          paddingBottom: 'calc(5rem + 5.5vw)'
        }}>
            <div className="pt-28 sm:pt-36">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mb-20 animate-on-scroll">
                  <span className="text-[#6BA539] text-sm font-semibold uppercase tracking-wider">Stedelijke uitdagingen</span>
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-5 mb-8 leading-tight tracking-tight text-left">
                    Een oplossing voor stedelijke uitdagingen
                  </h2>
                  <p className="text-lg text-gray-500 leading-relaxed text-left mb-6">
                    We willen graag bijdragen aan een gezond en leefbaar (stads)klimaat. Want als we doorgaan op de huidige manier, dan worden de uitdagingen steeds groter.
                  </p>
                  <p className="text-lg text-gray-500 leading-relaxed text-left">
                    Alleen door samen te werken en de krachten te bundelen bereiken we voor iedereen een fijnere leefomgeving.
                  </p>
                </div>

                <p className="text-base font-semibold text-gray-900 mb-14 text-left">
                  Samen met onze opdrachtgevers draagt NursiTree bij aan:
                </p>

                <div className="grid md:grid-cols-3 gap-10 lg:gap-12">
                  {challenges.map((item, i) => <div key={item.title} className={`animate-on-scroll animate-on-scroll-delay-${i + 1} bg-white rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 group overflow-hidden flex flex-col`}>
                      <div className="aspect-[3/2] w-full overflow-hidden bg-gray-100">
                        <img src={item.image} alt={item.imageAlt} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" loading="lazy" />
                      </div>
                      <div className="p-10 lg:p-12 flex-1 flex flex-col">
                        <h3 className="text-xl font-bold text-gray-900 mb-5 text-left">{item.title}</h3>
                        <p className="text-gray-500 leading-relaxed text-[15px] text-left">{item.text}</p>
                      </div>
                    </div>)}
                </div>

              </div>
            </div>
          </section>

        </div>{/* end section 3 wrapper */}


        {/* ═══════════════════════════════════════════════════════════════
            3b. DE STAD ALS BOOMKWEKERIJ — moved from the Diensten page.
            Preserved exactly: content, layout, images, CTA and styling.
            Placed directly below section 3 (Urban Challenges).
            ═══════════════════════════════════════════════════════════════ */}
        <section id="stad-als-boomkwekerij" className="py-16 sm:py-24 lg:py-36 bg-white scroll-mt-24">

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-on-scroll">
              <span className="text-[#6BA539] text-sm font-semibold uppercase tracking-wider">Onze aanpak</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-5 mb-8 leading-tight tracking-tight text-left">
                De stad als boomkwekerij
              </h2>

              <div className="space-y-6 text-left">
                <p className="text-lg text-gray-500 leading-relaxed">
                  De dynamiek van de stad zorgt ervoor dat het inrichten van de openbare ruimte bijna om een glazen bol vraagt, wil je dit zo efficiënt mogelijk doen zonder publiek geld te verspillen aan dingen die een paar decennia later weer tegen de grond gaan.
                </p>

                <p className="text-lg text-gray-600 leading-relaxed font-medium">
                  Bij NursiTree maken we dat werk graag makkelijker.
                </p>

                <p className="text-lg text-gray-500 leading-relaxed">
                  Door flexibele bomen aan te leveren, die we plaatsen in door ons ontwikkelde en gepatenteerde Urban Tree Pits. Zo bieden de bomen wel alle voordelen, maar nemen ze minder ruimte in, zitten ze andere faciliteiten onder de grond niet in de weg én ben je de investering niet kwijt als de boom na een aantal jaar te groot wordt en moet verplaatsen.
                </p>

                <p className="text-lg text-gray-600 leading-relaxed font-medium">
                  Want dat kan dankzij de Urban Tree Pit gewoon.
                </p>

                <p className="text-lg text-gray-500 leading-relaxed">We noemen het een kwekerij in de stad. De bomen groeien gezond op én bewegen letterlijk mee met nieuwe ontwikkelingen als de dynamiek van de stad daarom vraagt.</p>
              </div>

              <div className="mt-10">
                <Link to="/platform#contact-section" className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#E8854A] text-white text-sm sm:text-base font-semibold rounded-xl hover:bg-[#D27337] transition-all duration-200 shadow-lg hover:shadow-xl">
                  Plan een kennismaking in
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>



        {/* ═══════════════════════════════════════════════════════════════
            SECTIONS 4–5 SEAMLESS DIAGONAL FLOW (continues after 3b)
            ═══════════════════════════════════════════════════════════════ */}
        <div className="relative overflow-hidden">

          {/* ─── 4. BRIDGE — Green diagonal (z-[2] paints on top) ─── */}
          <section ref={section4.ref} className="relative z-[2]" style={{
          marginBottom: '-5.5vw',
          paddingTop: '4rem',
          paddingBottom: '4rem'
        }}>

            <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
              <div className="absolute inset-0" style={{
              background: 'linear-gradient(135deg, #4E8A25 0%, #6BA539 100%)',
              clipPath: 'polygon(0 0%, 100% 18%, 100% 82%, 0 100%)'
            }} />
              {/* Subtle overlay for depth */}
              <div className="absolute inset-0" style={{
              background: 'linear-gradient(255deg, rgba(0,0,0,0.06) 0%, transparent 40%, rgba(255,255,255,0.08) 100%)',
              clipPath: 'polygon(0 0%, 100% 18%, 100% 82%, 0 100%)'
            }} />
            </div>

            {/* Content */}
            <div className={`relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center transition-all duration-700 ${section4.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight tracking-tight">
                Wat kunnen we voor je doen?
              </h2>
              <p className="text-lg text-white/85 mb-12 max-w-2xl mx-auto leading-relaxed">
                Ontdek waar wij voor staan en hoe onze principes bijdragen aan een duurzamere leefomgeving.
              </p>
            </div>
          </section>

          {/* ─── 5. VALUES — with diagonal top edge ─── */}
          <section className="relative z-[1]" style={{
          backgroundColor: '#f9fafb',
          clipPath: 'polygon(0 5.5vw, 100% 0%, 100% 100%, 0 100%)',
          paddingTop: 'calc(5rem + 5.5vw)'
        }}>
            <div className="pb-28 sm:pb-36">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mb-20 animate-on-scroll">
                  <span className="text-[#E8854A] text-sm font-semibold uppercase tracking-wider">Onze waarden</span>
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-5 mb-8 leading-tight tracking-tight text-left">
                    Waar staan wij voor
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {values.map(value => <ValueCard key={value.title} value={value} />)}
                </div>
              </div>
            </div>
          </section>

        </div>{/* end sections 3-4-5 wrapper */}


        {/* ═══════════════════════════════════════════════════════════════
            6. VISUAL BREAK — Button updated to match design system
            ═══════════════════════════════════════════════════════════════ */}
        <section className="py-28 sm:py-36 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-on-scroll rounded-2xl overflow-hidden shadow-xl">
                <img src="https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1776932681769_aa9a7dbb.jpg" alt="NursiTree project" className="w-full h-[350px] lg:h-[420px] object-cover" />
              </div>
              <div className="animate-on-scroll animate-on-scroll-delay-2 flex flex-col justify-center lg:pl-8">
                <span className="text-[#E8854A] text-sm font-semibold uppercase tracking-wider">In de praktijk</span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-5 mb-8 leading-tight tracking-tight text-left">
                  Van visie naar realisatie
                </h2>
                <p className="text-lg text-gray-500 leading-relaxed mb-10 text-left">
                  Onze principes zijn niet alleen woorden. Ze worden zichtbaar in elk project dat we realiseren, van ontwerp tot verplanting.
                </p>
                <Link to="/producten" className="px-6 sm:px-8 py-3.5 sm:py-4 bg-[#E8854A] text-white text-sm sm:text-base font-semibold rounded-xl hover:bg-[#D27337] transition-all duration-200 shadow-lg hover:shadow-xl inline-flex items-center gap-2 self-start"><ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />Bekijk onze producten</Link>

              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            7. FINAL CTA — Matching ZwhFinalCta design with dark footer
            transition zone for seamless flow into the footer.

            Mobile portrait fix:
            - Larger top padding pushes content down into the centre of the
              orange band so it never overlaps the diagonal.
            - Larger bottom padding stretches the section so the dark
              transition zone has ample room below the buttons.
            - A safe gap (mb) below the buttons guarantees the diagonal
              starts well after the CTA content ends.
            ═══════════════════════════════════════════════════════════════ */}
        <section
          ref={section7.ref}
          className="relative z-[2] bg-white pt-28 pb-56 sm:pt-12 sm:pb-40"
          style={{
            marginBottom: '-2px',
          }}
        >


          {/* Layer 0: Solid full-width dark backstop — guarantees no white sliver
              on ultra-wide screens even if the clip-path polygons render with
              sub-pixel rounding. Sits at the very bottom of the section. */}
          <div
            className="absolute left-0 right-0 bottom-0 h-10 bg-[#182418]"
            aria-hidden="true"
          />

          {/* Layer 1: Dark footer-color transition zone at the bottom */}
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute inset-0 bg-[#182418]" style={{
            clipPath: 'polygon(0 62%, 100% 76%, 100% 100%, 0 100%)'
          }} />
          </div>

          {/* Layer 2: The orange expanding rectangle shape — positioned above the dark zone */}
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute inset-0 bg-[#E8854A]" style={{
            clipPath: 'polygon(0 14%, 100% 0%, 100% 76%, 0 62%)'
          }} />
            {/* Subtle lighter overlay for depth on right side */}
            <div className="absolute inset-0" style={{
            background: 'linear-gradient(105deg, rgba(0,0,0,0.06) 0%, transparent 40%, rgba(255,255,255,0.08) 100%)',
            clipPath: 'polygon(0 14%, 100% 0%, 100% 76%, 0 62%)'
          }} />
          </div>

          {/* Content — sits within the orange area.
              On mobile portrait we add extra bottom margin (mb-16) so the
              stacked buttons stay clear of the diagonal divider below. */}
          <div className={`relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-20 mb-16 sm:mb-0 text-center transition-all duration-700 ${section7.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 sm:mb-8 leading-tight tracking-tight">
              Neem contact met ons op
            </h2>

            <p className="text-base sm:text-lg text-white/85 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
              Benieuwd hoe NursiTree kan bijdragen aan jouw project? We denken graag met je mee.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link to="/#contact-section" className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 bg-white text-[#E8854A] hover:bg-gray-50">
                Neem contact op
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/diensten" className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-semibold transition-all duration-200 border-2 border-white/30 text-white hover:border-white hover:bg-white/10 text-center">
                Bekijk onze diensten
              </Link>
            </div>

          </div>
        </section>

      </div>
    </PageLayout>;
};

/* ─── Value Card Component ─── */
const ValueCard: React.FC<{
  value: {
    icon: React.ElementType;
    title: string;
    text: string;
  };
}> = ({
  value
}) => {
  const [expanded, setExpanded] = React.useState(false);
  const isLong = value.text.length > 160;
  const displayText = !expanded && isLong ? value.text.slice(0, 155) + '…' : value.text;
  return <div className="animate-on-scroll bg-white rounded-2xl p-10 border border-gray-100 hover:border-[#E8854A]/15 hover:shadow-lg transition-all duration-300 group flex flex-col h-full">
      <h3 className="text-lg font-bold text-gray-900 mb-4 text-left">{value.title}</h3>
      <p className="text-gray-500 leading-relaxed text-[15px] text-left flex-1">{displayText}</p>
      {isLong && <button onClick={() => setExpanded(!expanded)} className="mt-4 text-[#E8854A] text-sm font-semibold hover:underline transition-all self-start">
          {expanded ? 'Minder lezen' : 'Meer lezen'}
        </button>}
    </div>;
};
export default VisiePage;