import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';

/* ─── Images ─── */
const HERO_IMG = 'https://d64gsuwffb70l.cloudfront.net/69cd2e1dc76c2b3ecc191d41_1775054558732_872d6481.png';
const PROJECT_IMG_1 = 'https://d64gsuwffb70l.cloudfront.net/69cd2e1dc76c2b3ecc191d41_1775054560301_48af53a0.jpg';

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

/* ─── Services Data (with provided NursiTree photos) ─── */
const services = [{
  image: 'https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1778226586728_ae9224ba.jpeg',
  title: 'Advies & engineering',
  desc: 'Voor een optimaal resultaat zitten we het liefst zo vroeg mogelijk bij jullie aan tafel. Maar we gaan niet óp jullie stoel zitten. Het is jullie project, waarin jullie engineers de leiding hebben. Wij nemen wel graag een adviserende rol op onze expertise. En om het werk voor jullie zo eenvoudig mogelijk te maken, hebben we een handige toolkit gemaakt met standaardtekeningen, beschrijvingen en installatieprincipes. Ook denken we graag mee bij de inpassing van onze groeiplaats in het maaiveld.'
}, {
  image: 'https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1778226584278_74ee47e5.jpg',
  title: 'Installatie',
  desc: 'Het installeren van het systeem doen we samen met jullie vaste aannemer. Door het gestandaardiseerde ontwerp kan hij met zijn team de installatie in korte tijd uitvoeren. Wij instrueren de aannemer vooraf en checken de installatie tijdens de uitvoering.'
}, {
  image: 'https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1778226588093_47de3a6c.jpg',
  title: 'Aanplant & nazorg',
  desc: 'Na de aanplanting kunnen we tijdens de kweekperiode ook de begeleidingssnoei verzorgen. Als jullie hiervoor zelf de faciliteiten en teams in huis hebben, dan delen we natuurlijk alle kennis en instructies die nodig zijn om de boom binnen ons systeem zo goed mogelijk te laten groeien. We werken natuurlijk met levend materiaal waarbij je niet alles exact kunt voorspellen. Maar we zorgen altijd voor een goede overdracht, waarbij we alle randvoorwaarden voor een succesvolle verplanting hebben geoptimaliseerd.'
}, {
  image: 'https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1778348822605_69d4f9cf.PNG',
  title: 'Platform & Monitoring',
  desc: 'Als de boom is aangeplant, registreren we deze op ons eigen digitale platform. Daar leggen we alle belangrijke gegevens per boom vast en houden we alle bomen die we aanplanten goed in de gaten. Als eigenaar krijg je van ons ruim op tijd een seintje wanneer het tijd wordt om de boom te verplanten, zodat we samen een geschikte plek kunnen vinden.'
}, {

  image: 'https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1778226588878_9fbf1d93.jpg',
  title: 'Verplaatsen en verplanten',
  desc: 'De verplantvoorbereiding start bij aanplant van de boom. Doordat de boom in de bak zit, ontwikkelt hij een kluit die in zijn geheel te transporteren is. Hierdoor vindt geen wortelschade plaats en kan de boom op de nieuwe standplaats gelijk nieuwe wortels ontwikkelen. Met een speciaal ontwikkeld hijsframe, kunnen we het verplaatsen en verplanten van een boom eenvoudig uitvoeren wanneer dat nodig is.'
}];



/* ─── FAQ Data ─── */
type FaqItem = {
  question: string;
  answer: string;
  answerNode?: React.ReactNode;
};
const dienstenFaqs: FaqItem[] = [{
  question: 'Kan het ook in combinatie met meubilair?',
  answer: 'Ja, dat is in veel situaties goed mogelijk. Dit bespreken we graag samen tijdens een eerste verkenningsgesprek'
}, {
  question: 'Wordt de bak bovengronds of ondergronds geplaatst?',
  answer: 'Dit is beide mogelijk. We kunnen de bak ook een stukje bovengronds en gedeeltelijk ín de grond plaatsen. Of wat dacht je van een bovengrondse bak die we combineren met straatmeubilair?'
}, {
  question: 'Kunnen we ergens een model bekijken?',
  answer: 'Zeker! Op ons platform kan je altijd zien waar in Nederland op dit moment Urban Tree Pits zijn geplaatst. Maar we hebben ook een aantal showmodellen op een eigen terrein in Ooltgensplaat geplaatst, met verschillende soorten bomen en onderbeplanting. Je bent altijd van harte welkom om een keer langs te komen. Stuur ons dan een mail om vrijblijvend een afspraak te maken, we leiden je graag een keer rond!',
  answerNode: <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
        Zeker! Op ons platform kan je altijd zien waar in Nederland op dit moment Urban Tree Pits zijn geplaatst. Maar we hebben ook een aantal showmodellen op een eigen terrein in Ooltgensplaat geplaatst, met verschillende soorten bomen en onderbeplanting. Je bent altijd van harte welkom om een keer langs te komen. Stuur ons dan een{' '}
        <Link to="/platform#contact-section" className="text-[#6BA539] font-semibold hover:underline">
          mail
        </Link>{' '}
        om vrijblijvend een afspraak te maken, we leiden je graag een keer rond!
      </p>
}, {
  question: 'Wat doe je met de boom als ie te groot wordt?',
  answer: 'Dan komen we hem ophalen om te verplaatsen. Omdat ons systeem hiervoor gebouwd is, gaat dit heel snel en eenvoudig. We hoeven niet de hele straat open te halen, want de wortels zitten binnen de bak. En dankzij ons digitale platform, hebben we samen al ruim op tijd een mooie nieuwe plek voor de boom gevonden.'
}, {
  question: 'Is zo\'n bak niet veel te klein om een grote, gezonde boom in te kweken?',
  answer: 'Onze gepatenteerde Urban Tree Pit is geen \'grote bloembak\'. Het is een behoorlijk grote bak van 2,5 bij ruim 3 meter, bij voorkeur in de grond (maar hij kan ook boven de grond of gedeeltelijk bovengronds worden geplaatst).\n\nDaarnaast zijn onze bakken zelfvoorzienend en volledig gevuld met hoogwaardige voedingsstoffen, dus je hoeft ze geen water of mest te geven. Onze bak bestaat uit een betonnen constructie die zo is ontworpen dat ie alles wat je erbovenop plaatst (wegdek, auto\'s, enzovoort) draagt.\n\nHet is dus een stevig skelet, wat de inhoud van de bak beschermt.'
}];

/* ─── Main Page ─── */
const DienstenPage: React.FC = () => {
  const pageRef = useScrollReveal();
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(0);
  return <PageLayout>
      <SEO
        title="Diensten | Engineering, Installatie & Boomverplanting | NursiTree"
        description="NursiTree-diensten voor stedelijke vergroening: engineering, installatie, aanplant, monitoring en boomverplanting. Wij vinden altijd ruimte voor meer groen in de stad."
        keywords="NursiTree diensten, boomverplanting, installatie Urban Tree Pit, engineering stedelijk groen, monitoring bomen, aanplant stadsbomen, klimaatadaptatie, slimme openbare ruimte"
        breadcrumbs={[
          { name: 'Home', url: 'https://www.nursitree.com/' },
          { name: 'Diensten', url: 'https://www.nursitree.com/diensten' },
        ]}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          serviceType: 'Stedelijke vergroening — engineering, installatie, aanplant, monitoring en boomverplanting',
          provider: {
            '@type': 'Organization',
            name: 'NursiTree B.V.',
            url: 'https://www.nursitree.com/'
          },
          areaServed: { '@type': 'Country', name: 'Nederland' },
          description: 'NursiTree begeleidt projecten van engineering en installatie tot aanplant, monitoring en boomverplanting met de gepatenteerde Urban Tree Pit voor klimaatadaptatie en biodiversiteit.',
          url: 'https://www.nursitree.com/diensten'
        }}
      />

      <div ref={pageRef}>

        {/* ═══ SECTION 1: HERO ═══ */}
        <section className="relative py-16 sm:py-24 lg:pt-20 lg:pb-36 xl:pt-24 xl:pb-44 overflow-hidden bg-white">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-[#E8854A]/[0.04] to-transparent" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#6BA539]/[0.03] rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 lg:gap-24 items-center">
              <div className="max-w-xl">
                <div className="lg:hidden inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#E8854A]/10 text-[#E8854A] text-xs sm:text-sm font-medium mb-6 sm:mb-10 border border-[#E8854A]/15">
                  Diensten
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] font-bold text-gray-900 leading-[1.08] tracking-tight mb-5 sm:mb-8 text-left">
                  Wij vinden altijd ruimte voor{' '}
                  <span className="text-[#6BAF3A]">meer groen</span>
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-gray-500 leading-relaxed mb-8 sm:mb-12 max-w-lg text-left">
                  Meer bomen en verbeterde leefbaarheid voor bewoners, vandaag én in de toekomst. Daar zorgen we voor, samen met projectontwikkelaars, beheerders, projectleiders en iedereen die meer groen in de stad wil. Zonder dat de bomen overlast veroorzaken of dit ten koste gaat van andere faciliteiten die snel groeiende steden nodig hebben.
                </p>

                <div className="lg:hidden flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Link to="/#contact-section" className="px-6 sm:px-8 py-3.5 sm:py-4 bg-[#E8854A] text-white text-sm sm:text-base font-semibold rounded-xl hover:bg-[#D27337] transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">

                    Neem contact op
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Link>
                </div>

              </div>

              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img src="https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1776936339540_b2329ee3.jpg" alt="NursiTree Urban Tree Pit systeem" className="w-full h-[280px] sm:h-[350px] lg:h-[480px] object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ═══ SECTION 2: DIT IS WAT WE DOEN ═══ */}
        <section className="py-16 sm:py-24 lg:py-36 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-16 sm:mb-20 animate-on-scroll">
              <span className="text-[#E8854A] text-sm font-semibold uppercase tracking-wider">Onze diensten</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-5 mb-8 leading-tight tracking-tight text-left">
                Dit is wat we doen
              </h2>
              <p className="text-lg text-gray-500 leading-relaxed text-left">
                Wij zijn dé leverancier van slimme groeiplaatsen voor bomen in de stad. In aanvulling daarop bieden we een aantal ondersteuningsdiensten aan. Welke jullie hiervan precies afnemen, hangt af van de huidige situatie en beschikbare voorzieningen. Dit is dus altijd maatwerk.
              </p>
            </div>

            <div className="space-y-6 sm:space-y-8">
              {services.map((service, i) => <div key={service.title} className={`animate-on-scroll animate-on-scroll-delay-${i % 4 + 1} bg-white rounded-2xl p-8 sm:p-10 lg:p-12 border border-gray-100 hover:border-[#E8854A]/20 hover:shadow-lg transition-all duration-300 group`}>
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-10">
                    <div className="w-full sm:w-48 lg:w-56 flex-shrink-0 overflow-hidden rounded-2xl bg-gray-100 aspect-[4/3]">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="block w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-4 text-left">{service.title}</h3>
                      <p className="text-gray-500 leading-relaxed text-[15px] sm:text-base text-left">{service.desc}</p>
                    </div>
                  </div>
                </div>)}
            </div>


            {/* CTA */}
            <div className="mt-12 sm:mt-16 animate-on-scroll">
              <Link to="/#contact-section" className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#E8854A] text-white text-sm sm:text-base font-semibold rounded-xl hover:bg-[#D27337] transition-all duration-200 shadow-lg hover:shadow-xl">
                Neem contact op
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
            </div>

          </div>
        </section>



        {/* ═══ SECTION 3: HOE HOUDEN WE STEDEN LEEFBAAR? ═══ */}
        {/*
          Responsive diagonal strategy:
          - The section background is neutral gray-50 on ALL breakpoints.
          - The orange diagonal shape is rendered as an absolutely-positioned
            clip-path layer with TWO breakpoint variants:
              • mobile/tablet (<lg): gentle ~4% slope so the diagonal stays
                close to the top/bottom edges and the orange band always
                fully wraps the (taller, stacked) content.
              • desktop (lg+): original 14%/82–92% aggressive angles for the
                premium two-column visual identity.
          - Generous responsive padding (py-28 sm:py-32 lg:py-32) keeps all
            content inside the safe zone of the diagonal on every viewport.
          - overflow-hidden on the section guarantees nothing visually
            escapes the orange shape.
        */}
        <section className="relative bg-gray-50 py-28 sm:py-32 lg:pt-32 lg:pb-32 overflow-hidden">
          {/* Mobile/tablet diagonal: gentle ~4% slope, orange band fills almost the whole section */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none lg:hidden" aria-hidden="true">
            {/* White fill below the diagonal so no gray strip appears between orange and the next white section */}
            <div className="absolute inset-0 bg-white" style={{
              clipPath: 'polygon(0 100%, 100% 96%, 100% 100%)'
            }} />
            <div className="absolute inset-0 bg-[#E8854A]" style={{
              clipPath: 'polygon(0 4%, 100% 0%, 100% 96%, 0 100%)'
            }} />
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(105deg, rgba(0,0,0,0.06) 0%, transparent 40%, rgba(255,255,255,0.08) 100%)',
              clipPath: 'polygon(0 4%, 100% 0%, 100% 96%, 0 100%)'
            }} />
          </div>


          {/* Desktop diagonal: original aggressive 14%/82-92% angles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block" aria-hidden="true">
            {/* White fill below the diagonal (for the angled bottom edge) */}
            <div className="absolute inset-0 bg-white" style={{
              clipPath: 'polygon(0 82%, 100% 92%, 100% 100%, 0 100%)'
            }} />
            <div className="absolute inset-0 bg-[#E8854A]" style={{
              clipPath: 'polygon(0 14%, 100% 0%, 100% 92%, 0 82%)'
            }} />
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(105deg, rgba(0,0,0,0.06) 0%, transparent 40%, rgba(255,255,255,0.08) 100%)',
              clipPath: 'polygon(0 14%, 100% 0%, 100% 92%, 0 82%)'
            }} />
          </div>


          {/* Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:py-16">
            <div className="grid lg:grid-cols-2 gap-12 sm:gap-14 lg:gap-24 items-start">
              <div className="animate-on-scroll">
                <span className="text-white/70 text-sm font-semibold uppercase tracking-wider">De puzzel</span>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mt-5 mb-8 leading-tight tracking-tight text-left">
                  Hoe houden we steden leefbaar?
                </h2>

                <div className="space-y-6 text-left">
                  <p className="text-lg text-white/85 leading-relaxed">
                    De stad groeit! Dat betekent: meer inwoners, meer wensen en hogere eisen. Er zijn zo'n tien ruimteclaims per vierkante meter in de stad, want we zoeken ruimte om te wonen, te parkeren en elkaar te ontmoeten.
                  </p>

                  <p className="text-lg text-white/85 leading-relaxed">
                    En wat dacht je van alle kabels die we nodig hebben voor snel internet, tv en de energietransitie? Maar de maatschappij vraagt ook om een antwoord op klimaatverandering. Voor een gezonde en veilige toekomst, zijn er bomen nodig met veel boomkroonvolume.
                  </p>

                  <p className="text-lg text-white/85 leading-relaxed">
                    De ruimtepuzzel wordt zo voor iedereen die zich met inrichting van de openbare ruimte bezighoudt steeds ingewikkelder. Ambitieuze doelstellingen van bovenaf, ingewikkelde regelgeving, verschillende belangen, knopen worden niet doorgehakt, projecten die duurder worden en trager verlopen.
                  </p>
                </div>
              </div>

              <div className="animate-on-scroll animate-on-scroll-delay-2 w-full">
                <div className="bg-white rounded-2xl p-6 sm:p-8 lg:p-12 shadow-xl">
                  <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6 sm:mb-8 text-left">
                    Als werkvoorbereider, projectleider, aannemer, projectontwikkelaar of boombeheerder sta je voor een enorme uitdaging.
                  </p>

                  <div className="border-l-4 border-[#E8854A] pl-4 sm:pl-6 mb-6 sm:mb-8">
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-medium text-left">
                      Bij NursiTree hebben we daar een oplossing voor bedacht. Een die zowel doelstellingen behalen als projecten uitvoeren makkelijker maakt. Zodat je écht iets kunt bijdragen aan de toekomstige generatie.
                    </p>
                  </div>

                  <div className="rounded-2xl overflow-hidden bg-gray-50">
                    <img src="https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1776936416073_b1511dee.png" alt="Stedelijke vergroening" className="w-full h-auto max-w-full object-contain rounded-2xl block" loading="lazy" />
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>






        {/* ═══ NEW SECTION: DE STAD ALS BOOMKWEKERIJ ═══ */}
        <section className="relative bg-white">
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
            <div className="animate-on-scroll">
              <span className="text-[#E8854A] text-sm font-semibold uppercase tracking-wider">
                De aanpak
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-5 mb-8 leading-tight tracking-tight text-left">
                De stad als boomkwekerij
              </h2>
            </div>

            <div className="space-y-6 text-left animate-on-scroll animate-on-scroll-delay-1">
              <p className="text-lg text-gray-500 leading-relaxed">
                Wij beschouwen de stad als kwekerij. Dat betekent dat elke locatie wat anders nodig heeft en mogelijk zelfs vraagt om flexibiliteit. Op plekken met weinig onder- en bovengrondse ruimte is onze Urban Tree Pit dé oplossing. De standaard componenten zijn eenvoudig te installeren en de basis voor gezonde groei.
              </p>

              <p className="text-lg text-gray-500 leading-relaxed">
                Daarbij zijn onze gepatenteerde Urban Tree Pits zó ingericht dat de boom altijd weer eenvoudig verplantbaar is. De opbouw van de bak zorgt voor een optimale groei en bereidt de boom gedurende zijn looptijd voor op de verplanting naar de nieuwe plek.
              </p>

              <p className="text-lg text-gray-500 leading-relaxed">
                Zo levert de boom al ecosysteemdiensten in de kweekperiode én gaat hij op zijn nieuwe standplaats het boomkroonvolume exponentieel uitbreiden.
              </p>
            </div>

            {/* Vimeo video — premium, minimal, responsive 16:9 embed */}
            <div className="mt-10 sm:mt-14 animate-on-scroll animate-on-scroll-delay-2">
              <div
                className="relative w-full overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/5 bg-gray-900"
                style={{ paddingBottom: '56.25%' }}
              >
                <iframe
                  src="https://player.vimeo.com/video/1145956390?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479"
                  title="NursiTree video"
                  className="absolute inset-0 w-full h-full"
                  frameBorder={0}
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                  allowFullScreen
                />

              </div>
            </div>

          </div>
        </section>



        {/* ═══ SECTION 4: WAAROM KIEZEN VOOR DE URBAN TREE PITS? ═══ */}
        <section className="py-16 sm:py-24 lg:py-36 bg-gray-50">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-10 sm:mb-14 leading-tight tracking-tight text-left animate-on-scroll">
              Waarom kiezen voor de Urban Tree Pits?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">

              {/* TILE 1 — Green (matching homepage section 5 tile 1) */}
              <div className="animate-on-scroll rounded-2xl p-8 sm:p-10 transition-all duration-300 cursor-default hover:-translate-y-1.5 hover:shadow-2xl hover:scale-[1.02]" style={{
              backgroundColor: '#4E8A25'
            }}>
                <h3 className="text-xl font-bold text-white mb-6 text-left">Slim en herbruikbaar ontwerp</h3>
                <ul className="space-y-4 text-left">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-white/60 flex-shrink-0" />
                    <span className="text-base text-white/85 leading-relaxed">
                      Meestal ondergronds geplaatst, wortels blijven binnen de bak
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-white/60 flex-shrink-0" />
                    <span className="text-base text-white/85 leading-relaxed">
                      Bomen worden aangeplant op een manier die in de toekomst geen problemen veroorzaakt. Zoals wortels die de straat opdrukken.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-white/60 flex-shrink-0" />
                    <span className="text-base text-white/85 leading-relaxed">
                      Parkeren op het systeem mogelijk
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-white/60 flex-shrink-0" />
                    <span className="text-base text-white/85 leading-relaxed">
                      Gedeeltelijk bovengrondse plaatsing mogelijk
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-white/60 flex-shrink-0" />
                    <span className="text-base text-white/85 leading-relaxed">
                      Creatieve combinaties met zitranden of ander straatmeubilair mogelijk
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-white/60 flex-shrink-0" />
                    <span className="text-base text-white/85 leading-relaxed">
                      Grond- en regenwater voeden het reservoir
                    </span>
                  </li>
                </ul>
              </div>

              {/* TILE 2 — Orange (matching homepage section 5 tile 2) */}
              <div className="animate-on-scroll animate-on-scroll-delay-1 rounded-2xl p-8 sm:p-10 transition-all duration-300 cursor-default hover:-translate-y-1.5 hover:shadow-2xl hover:scale-[1.02]" style={{
              backgroundColor: '#E8854A'
            }}>
                <h3 className="text-xl font-bold text-white mb-6 text-left">Eenvoudig te verplanten</h3>
                <ul className="space-y-4 text-left">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-white/60 flex-shrink-0" />
                    <span className="text-base text-white/85 leading-relaxed">
                      Geïntegreerd verplantframe
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-white/60 flex-shrink-0" />
                    <span className="text-base text-white/85 leading-relaxed">
                      Eenvoudig en zonder wortelschade uit de bak te hijsen met speciaal ontwikkeld hijsframe
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-white/60 flex-shrink-0" />
                    <span className="text-base text-white/85 leading-relaxed">
                      De afmetingen van de kluit en de grootte van de boom zorgen ervoor dat dit transport met een doorlopende vergunning kan plaatsvinden
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-white/60 flex-shrink-0" />
                    <span className="text-base text-white/85 leading-relaxed">
                      Dit maakt verplanting betaalbaar en efficiënt
                    </span>
                  </li>
                </ul>
              </div>

              {/* TILE 3 — Neutral/Cream (matching homepage section 5 tile 3) */}
              <div className="animate-on-scroll animate-on-scroll-delay-2 rounded-2xl p-8 sm:p-10 border border-gray-200 transition-all duration-300 cursor-default hover:-translate-y-1.5 hover:shadow-2xl hover:scale-[1.02]" style={{
              backgroundColor: '#f5f5f0'
            }}>
                <h3 className="text-xl font-bold text-gray-900 mb-6 text-left">Circulair concept</h3>
                <ul className="space-y-4 text-left">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#4E8A25] flex-shrink-0" />
                    <span className="text-base text-gray-500 leading-relaxed">
                      Elke boom in een Urban Tree Pit plaatsen we op ons online platform
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#4E8A25] flex-shrink-0" />
                    <span className="text-base text-gray-500 leading-relaxed">
                      De beheerder ontvangt ruim op tijd een seintje om een nieuwe groeiplaats te zoeken
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#4E8A25] flex-shrink-0" />
                    <span className="text-base text-gray-500 leading-relaxed">
                      Hulp bij de zoektocht, voor de beste match en volledige potentie
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#4E8A25] flex-shrink-0" />
                    <span className="text-base text-gray-500 leading-relaxed">
                      Maximale ontwikkeling van het boomkroonvolume
                    </span>
                  </li>
                </ul>
              </div>

            </div>

            {/* CTA — Producten */}
            <div className="mt-12 sm:mt-16 animate-on-scroll">
              <Link to="/producten" className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#E8854A] text-white text-sm sm:text-base font-semibold rounded-xl hover:bg-[#D27337] transition-all duration-200 shadow-lg hover:shadow-xl"><ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />Bekijk onze producten</Link>

            </div>
          </div>
        </section>





        {/* ═══ SECTION 6 (was Section 7): VIJF VOORDELEN ═══ */}
        <section className="py-16 sm:py-24 lg:py-36 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-10 sm:mb-14 leading-tight tracking-tight text-left animate-on-scroll">
              Vijf voordelen van vergroenen met de Urban Tree Pit
            </h2>

            <ol className="space-y-6 sm:space-y-8">
              <li className="animate-on-scroll flex gap-5 sm:gap-6 items-start">
                <span className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#E8854A]/10 text-[#E8854A] font-bold text-lg sm:text-xl flex items-center justify-center">
                  1
                </span>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed pt-1.5 sm:pt-2 text-left">Dankzij betere groeiomstandigheden en de mogelijkheid om groter wordende soorten toe te passen, krijg je sneller boomkroonbedekking in de straat</p>
              </li>

              <li className="animate-on-scroll animate-on-scroll-delay-1 flex gap-5 sm:gap-6 items-start">
                <span className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#E8854A]/10 text-[#E8854A] font-bold text-lg sm:text-xl flex items-center justify-center">
                  2
                </span>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed pt-1.5 sm:pt-2 text-left">
                  Goede bescherming voor de jonge bomen in de stad
                </p>
              </li>

              <li className="animate-on-scroll animate-on-scroll-delay-2 flex gap-5 sm:gap-6 items-start">
                <span className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#E8854A]/10 text-[#E8854A] font-bold text-lg sm:text-xl flex items-center justify-center">
                  3
                </span>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed pt-1.5 sm:pt-2 text-left">
                  Aanpasbare oplossing waardoor je de boom behoudt bij ingrijpende ontwikkelingen in de stad
                </p>
              </li>

              <li className="animate-on-scroll animate-on-scroll-delay-3 flex gap-5 sm:gap-6 items-start">
                <span className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#E8854A]/10 text-[#E8854A] font-bold text-lg sm:text-xl flex items-center justify-center">
                  4
                </span>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed pt-1.5 sm:pt-2 text-left">
                  Meer biodiversiteit door keuze voor verschillende soorten
                </p>
              </li>

              <li className="animate-on-scroll animate-on-scroll-delay-4 flex gap-5 sm:gap-6 items-start">
                <span className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#E8854A]/10 text-[#E8854A] font-bold text-lg sm:text-xl flex items-center justify-center">
                  5
                </span>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed pt-1.5 sm:pt-2 text-left">
                  Investering die per geïnvesteerde euro 10x meer boomkroonvolume oplevert
                </p>
              </li>
            </ol>

            {/* CTA — Zo werkt het */}
            <div className="mt-12 sm:mt-16 animate-on-scroll">
              <Link to="/zo-werkt-het" className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#E8854A] text-white text-sm sm:text-base font-semibold rounded-xl hover:bg-[#D27337] transition-all duration-200 shadow-lg hover:shadow-xl">
                Zo werkt het
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
            </div>
          </div>
        </section>




        {/* ═══ SECTION 7 (moved up): NURSITREE SLOGAN (CLEAN GREEN DIAGONAL BAND) ═══ */}
        {/*
          A single, clean diagonal band — rendered as ONE simple parallelogram
          clip-path with parallel top and bottom edges. No overlapping shapes,
          no pseudo-elements, no transforms, no border-radius — so the band
          has consistent body/mass across the full width (no pinching, no
          warping, no curves).
           clip-path vertices:
            top-left     (0   0%)
            top-right    (100 12%)   ← top edge slopes DOWN-to-the-right
            bottom-right (100 88%)   ← bottom edge slopes DOWN-to-the-right
            bottom-left  (0 100%)
          Top and bottom edges are parallel (both drop 12%), giving a clean
          diagonal band of uniform thickness — matches the reference image.
         */}
        <section className="relative z-[2] overflow-hidden bg-gray-50" style={{
        paddingTop: '7rem',
        paddingBottom: '7rem'
      }}>
          {/* White fill for the bottom-right area below the green band (matches next white section) */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{
          background: '#ffffff',
          clipPath: 'polygon(0 100%, 100% 88%, 100% 100%)'
        }} />

          {/* Single clean diagonal band — the only green shape in this section */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{
          background: 'linear-gradient(135deg, #4E8A25 0%, #6BA539 100%)',
          clipPath: 'polygon(0 0%, 100% 12%, 100% 88%, 0 100%)'
        }} />

          {/* Content */}
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center animate-on-scroll">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
              NursiTree bedenkt slimme oplossingen voor de buitenruimte van morgen
            </h2>
          </div>
        </section>





        {/* ═══ SECTION 8 (moved down): HOE VERDIEN JE DE INVESTERING TERUG? ═══ */}
        {/*
          Plain white section — no diagonal overlays here. The diagonal edges
          belong exclusively to the green band above, which is rendered
          as a single clean parallelogram. Keeping this section neutral prevents
          any overlapping green shapes that could make the green band above
          look pinched, warped or irregular.
         */}
        <section className="relative bg-white">
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28 max-md:portrait:pt-16 max-md:portrait:pb-40">

            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-10 sm:mb-14 leading-tight tracking-tight text-left animate-on-scroll">
              Hoe verdien je de investering terug?
            </h2>

            <div className="space-y-6 text-left animate-on-scroll animate-on-scroll-delay-1">
              <p className="text-lg text-gray-500 leading-relaxed">Onze oplossing voor vergroening in de stad vraagt om een iets hogere investering bij aanvang dan je bijvoorbeeld voor het plaatsen van een jonge boom in de open grond moet doen. Of voor andere maatwerkoplossingen. Maar de opbrengsten zijn vele malen hoger, wat de investering op de lange termijn een stuk interessanter maakt.</p>

              <p className="text-lg text-gray-500 leading-relaxed">
                Veel gemeenten en projectontwikkelaars investeren in bomen met het idee dat die tachtig jaar lang resultaat opbrengen. Maar in de praktijk worden deze door veranderende omstandigheden veel eerder gekapt.
              </p>

              <p className="text-lg text-gray-500 leading-relaxed">
                Met de Urban Tree Pit hoef je de boom niet te kappen, je verplaatst hem gewoon naar een plek waar hij zijn diensten voor het ecosysteem blijft leveren.
              </p>
            </div>

            <div className="mt-10 sm:mt-12 animate-on-scroll animate-on-scroll-delay-2">
              <p className="text-xl sm:text-2xl font-bold text-[#E8854A] mb-6 text-left">
                Meerekenen en partijen verbinden
              </p>

              <div className="space-y-6 text-left">
                <p className="text-lg text-gray-500 leading-relaxed">
                  We vragen ook welke uitgaven jullie nu doen voor vergroening en wat daarbij komt als je echt gaat voor een slimme kwekerij in de stad?
                </p>

                <p className="text-lg text-gray-500 leading-relaxed">
                  Vervolgens onderzoeken we hoe we dat gat kunnen overbruggen en op welke manier je die kosten terugverdient. Bijvoorbeeld door partijen met dezelfde ambities bij elkaar te brengen en slim budgetten te combineren.
                </p>

                <p className="text-lg text-gray-500 leading-relaxed">
                  Als we vooraan in het proces aan tafel komen, is er altijd meer mogelijk dan je denkt.
                </p>
              </div>
            </div>

            <div className="mt-10 sm:mt-12 animate-on-scroll animate-on-scroll-delay-3">
              <Link to="/platform#contact-section" className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#E8854A] text-white text-sm sm:text-base font-semibold rounded-xl hover:bg-[#D27337] transition-all duration-200 shadow-lg hover:shadow-xl">
                Nodig ons vandaag uit
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
            </div>
          </div>
        </section>





        {/* ═══ SECTION 9: VEELGESTELDE VRAGEN (FAQ) ═══ */}
        <section className="relative z-[1] py-28 sm:py-36">
          {/* Diagonal background shape — matching ZwhFaq design */}
          <div
            className="absolute left-0 right-0 pointer-events-none top-[-12rem] bottom-[-22rem] max-md:portrait:top-[-3rem] max-md:portrait:bottom-[-22rem]"
            aria-hidden="true"
          >

            <div className="absolute inset-0" style={{
            background: '#f8faf6',
            clipPath: 'polygon(0 14%, 100% 0%, 100% 84%, 0 100%)'
          }} />
            <div className="absolute inset-0" style={{
            background: 'linear-gradient(180deg, rgba(107,165,57,0.05) 0%, rgba(107,165,57,0.02) 15%, transparent 45%, transparent 55%, rgba(232,133,74,0.02) 85%, rgba(232,133,74,0.05) 100%)',
            clipPath: 'polygon(0 14%, 100% 0%, 100% 84%, 0 100%)'
          }} />
          </div>


          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-16 animate-on-scroll">
              <span className="text-[#6BA539] text-sm font-semibold uppercase tracking-[0.2em]">
                FAQ
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6 tracking-tight">
                Veelgestelde vragen
              </h2>
            </div>

            {/* Accordion */}
            <div className="space-y-3 animate-on-scroll">
              {dienstenFaqs.map((faq, i) => {
              const isOpen = faqOpenIndex === i;
              return <div key={i} className={`border rounded-2xl transition-shadow transition-colors duration-300 ${isOpen ? 'bg-white shadow-lg border-[#6BA539]/20' : 'bg-gray-50 border-gray-100 hover:bg-white hover:shadow-sm'}`}>
                    <button onClick={() => setFaqOpenIndex(isOpen ? null : i)} className="w-full flex items-center justify-between p-6 sm:p-7 text-left">
                      <span className={`text-base sm:text-lg font-bold pr-4 transition-colors duration-300 ${isOpen ? 'text-[#6BA539]' : 'text-gray-900'}`}>
                        {faq.question}
                      </span>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isOpen ? 'bg-[#6BA539] rotate-180' : 'bg-gray-100'}`}>
                        <ChevronDown className={`w-4 h-4 transition-colors duration-300 ${isOpen ? 'text-white' : 'text-gray-500'}`} />
                      </div>
                    </button>
                    {isOpen && <div className="px-6 sm:px-7 pb-6 sm:pb-7">
                        <div className="w-12 h-0.5 bg-[#6BA539]/30 mb-4" />
                        {faq.answerNode ? faq.answerNode : faq.answer.split('\n\n').map((paragraph, pIdx) => <p key={pIdx} className={`text-sm sm:text-base text-gray-600 leading-relaxed ${pIdx > 0 ? 'mt-4' : ''}`}>
                                {paragraph}
                              </p>)}
                      </div>}

                  </div>;
            })}
            </div>

          </div>
        </section>


        {/* ═══ SECTION 10: PRE-FOOTER CTA ═══ */}
        <section className="relative z-[2]" style={{
        paddingTop: '3rem',
        paddingBottom: '10rem',
        marginBottom: '-2px',
        backgroundColor: '#f8faf6'
      }}>


          {/* Layer 0: Solid full-width dark backstop — guarantees no white sliver
              on ultra-wide screens regardless of clip-path sub-pixel rendering. */}
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

          {/* Layer 2: Orange expanding rectangle shape */}
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute inset-0 bg-[#E8854A]" style={{
            clipPath: 'polygon(0 14%, 100% 0%, 100% 76%, 0 62%)'
          }} />
            {/* Subtle lighter overlay for depth */}
            <div className="absolute inset-0" style={{
            background: 'linear-gradient(105deg, rgba(0,0,0,0.06) 0%, transparent 40%, rgba(255,255,255,0.08) 100%)',
            clipPath: 'polygon(0 14%, 100% 0%, 100% 76%, 0 62%)'
          }} />
          </div>


          {/* Content */}
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 text-center animate-on-scroll">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight tracking-tight">
              Heb je een andere vraag?
            </h2>
            <div className="flex items-center justify-center">
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
export default DienstenPage;