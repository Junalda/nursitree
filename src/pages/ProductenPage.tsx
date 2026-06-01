import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Info } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';

/* ==================================================================
 * FULLY INDEPENDENT IMAGE ARCHITECTURE
 * ==================================================================
 * Each product/add-on block is its own separate, independent block
 * rendered inline. Each image source is a unique const used in
 * EXACTLY ONE place in the JSX.
 * ================================================================== */

// LEVELINGUNIT image — local-first with safe runtime fallback.
const IMG_LEVELINGUNIT_LOCAL = '/images/products/levelingunit-watersysteem.png';
const IMG_LEVELINGUNIT_FALLBACK = 'https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1778234207671_9abc306e.png';

// --- Tiny presentation-only helpers (NO image logic inside) ---
type SpecItem = string | {
  text: string;
  sub?: string[];
};
const SpecList: React.FC<{
  items: SpecItem[];
}> = ({
  items
}) => <ul className="space-y-3">
    {items.map((item, i) => {
    const text = typeof item === 'string' ? item : item.text;
    const sub = typeof item === 'string' ? undefined : item.sub;
    return <li key={i} className="text-[15px] sm:text-base text-gray-700 leading-relaxed">
          <div className="flex items-start gap-3">
            <span className="mt-2 block w-1.5 h-1.5 rounded-full bg-[#E8854A] flex-shrink-0" />
            <span>{text}</span>
          </div>
          {sub && <ul className="mt-2 ml-6 space-y-1.5">
              {sub.map((s, j) => <li key={j} className="flex items-start gap-3 text-gray-600 text-[14px] sm:text-[15px]">
                  <span className="mt-2 block w-1 h-1 rounded-full bg-gray-400 flex-shrink-0" />
                  <span>{s}</span>
                </li>)}
            </ul>}
        </li>;
  })}
  </ul>;
const primaryBtn = 'inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-[15px] font-semibold bg-[#E8854A] text-white hover:bg-[#d9763d] shadow-sm hover:shadow-md transition-all duration-200 w-full sm:w-auto sm:min-w-[180px]';
const secondaryBtn = 'inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-[15px] font-semibold bg-white text-gray-900 border border-gray-200 hover:border-[#E8854A] hover:text-[#E8854A] shadow-sm hover:shadow-md transition-all duration-200 w-full sm:w-auto sm:min-w-[180px]';

const ProductenPage: React.FC = () => {
  // -------- Specs --------
  const brentSpecs: SpecItem[] = ['3,30 m x 2,5 m x 1,30 m (l x b x h)', '7 m³ groeiruimte', '1.200 liter waterreservoir (genoeg voor gemiddelde droge periode van 21 dagen).', 'Levensduur ten minste 100 jaar', '15-20 jaar omlooptijd boom in het systeem', 'Geschikt voor verkeersklasse C250', 'Leeggewicht 8.500 kg', 'In- en uitlaat 125 mm'];
  const levelingSpecs: SpecItem[] = ['Aan te sluiten op meerdere Urban Tree Pits', 'Bezinkput + vlotterunit', 'Diameter buizen 315 mm', 'Afdekking met putdeksels naar keuze', 'Jaarlijks inspectie op verontreiniging en werking vlottersysteem', 'Aansluitingen 125 mm', 'Afmetingen bodemplaat: 120 cm x 80 cm x 18 cm (l x b x h)'];
  const beplantingText = `Een extra bijdrage aan de biodiversiteit lever je door de Urban Tree Pit niet af te dekken en volledig in te planten. We hebben hiervoor plantenmengsels samengesteld die bestaan uit soorten die interessant zijn voor de biodiversiteit en een zo lang mogelijke bloei geven. Uiteraard is het ook mogelijk om zelf soorten te kiezen.

De levensduur van de beplanting is vergelijkbaar met de omlooptijd van de boom in de Urban Tree Pit. Een deel van de beplanting zal met de verplanting van de boom meeverhuizen naar de nieuwe plek. Hier zorgt het ook voor een impuls aan de biodiversiteit.`;
  const beplantingSpecs: SpecItem[] = [{
    text: '5 vaste plantenmengsels:',
    sub: ['Felle kleuren', 'Oranjepaars', 'Paarsblauw', 'Roze', 'Witgeel']
  }, 'Bloeiperiode april t/m oktober, afhankelijk van mengsel', 'Maatwerk plantenmengsel toepassen mogelijk'];
  const bollenText = `De beplanting in de Urban Tree Pits is ook te combineren met bloembollen, wat ervoor zorgt dat je bijna jaarrond bloeiende planten hebt. In de winter gaan de eerste soorten al bloeien, wat doorloopt tot ver in het voorjaar. Eén soort bloeit zelfs volledig in de zomer. De bloembollen en vaste planten wisselen elkaar op een natuurlijke manier af.

De natuurlijke verspreiding zorgt ervoor dat de bollen zich in de kweekperiode gaan vermeerderen. Bij het verplanten van de boom worden alle bollen meegenomen, wat op de nieuwe locatie ook voor een biodiversiteitstoevoeging zorgt.`;
  const bollenSpecs: SpecItem[] = ['Vast bloembollenmengsel met 12 soorten', 'Bloeiperiode januari t/m juli', 'Maatwerk bloembollenmengsels toepassen is mogelijk'];
  const fullText = `Wanneer de parkeerdruk hoog is, is inplanten geen optie. Voor de erg krappe ruimtes is topcover ‘Full’ ontwikkeld. Bij deze afdekking wordt de Urban Tree Pit bijna volledig afdekt met 2 afdekplaten, met een boomspiegel van 1 m x 1 m. Bij voorkeur wordt dit ingeplant. We hebben een standaardafwerking van de plaat, maar maatwerk is ook mogelijk. Op deze manier sluit het geheel naadloos aan bij de omgeving.`;
  const fullSpecs: SpecItem[] = ['1,65 m x 2,5 m x 0,20 m (l x b x h)', 'Opening van 1 m x 1 m (l x b)', 'Levensduur ten minste 100 jaar', 'Geschikt voor diverse verkeersklassen', 'Gewicht 2.300 kg', 'Standaard afgewerkt met antislipprofiel', 'Maatwerkafwerking mogelijk'];
  const partlyText = `Topcover ‘Partly’ is geschikt voor locaties met bovengronds meer ruimte dan bij ‘Full’. In deze situaties is de boomspiegel groter en wordt meer onderbeplanting toegepast. Ook bij deze plaat hebben we een standaardafwerking en is maatwerk mogelijk.`;
  const partlySpecs: SpecItem[] = ['1,65 m x 2,5 m x 0,20 m (l x b x h)', 'Opening van 1,90 m x 1,30 m (l x b)', 'Levensduur ten minste 100 jaar', 'Geschikt voor diverse verkeersklassen', 'Gewicht 2.100 kg', 'Standaard afgewerkt met antislipprofiel', 'Maatwerkafwerking mogelijk'];
  const zitrandText = `Bij het (gedeeltelijk) boven het maaiveld plaatsen van de Urban Tree Pit bestaat de mogelijkheid om de combinatie met zitmeubilair te maken. Het kijken naar een sportwedstrijd of het wachten op de bus wordt hiermee een stuk aangenamer. Zitmeubilair is volledig maatwerk, dus elk ontwerp is mogelijk.`;
  const zitrandSpecs: SpecItem[] = [{
    text: 'Volledig maatwerk, ook afhankelijk van plaatsingshoogte Urban Tree Pit:',
    sub: ['Zitrand op de rand van de Urban Tree Pit', 'Zitgedeelte tegen de wand van de Urban Tree Pit']
  }, 'Alle soorten materialen zijn mogelijk'];

  return <PageLayout>
      <SEO
        title="Producten | BRENT Urban Tree Pit & Levelingunit | NursiTree"
        description="Ontdek BRENT, de Levelingunit en alle add-ons: gepatenteerde, modulaire boomgroeiplaatsen voor stedelijke vergroening, klimaatadaptatie en biodiversiteit in de stad."
        keywords="BRENT Urban Tree Pit, Levelingunit, boomgroeiplaats, NursiTree producten, modulaire groeiplaats, stedelijke vergroening, klimaatadaptatie, biodiversiteit stad"
        breadcrumbs={[
          { name: 'Home', url: 'https://www.nursitree.com/' },
          { name: 'Producten', url: 'https://www.nursitree.com/producten' },
        ]}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: 'BRENT — Urban Tree Pit',
          brand: { '@type': 'Brand', name: 'NursiTree' },
          manufacturer: { '@type': 'Organization', name: 'NursiTree B.V.', url: 'https://www.nursitree.com/' },
          category: 'Stedelijke vergroening / Boomgroeiplaats',
          description: 'BRENT is de gepatenteerde, modulaire Urban Tree Pit van NursiTree: een gestandaardiseerde groeiplaats voor gezonde stadsbomen, geschikt voor klimaatadaptatie, biodiversiteit en slimme inrichting van de openbare ruimte.',
          image: 'https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1775062143729_5e0f84cb.png',
          url: 'https://www.nursitree.com/producten',
        }}
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-[#E8854A]/[0.04] to-transparent" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#6BA539]/[0.04] rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 text-left">
          <div className="lg:hidden inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#E8854A]/10 text-[#E8854A] text-xs sm:text-sm font-medium mb-6 sm:mb-8 border border-[#E8854A]/15">
            Producten
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] font-bold text-gray-900 leading-[1.1] tracking-tight mb-6 sm:mb-8 text-left">
            Met onze producten sluiten we naadloos aan op de{' '}
            <span className="text-[#E8854A]">inrichting van de openbare ruimte</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-500 leading-relaxed max-w-3xl text-left">
            Met de gestandaardiseerde Urban Tree Pits creëren we de basis voor een gezonde groei
            van de bomen. De afdekkingsmogelijkheden zijn oneindig en maken het volledig
            integreerbaar in je gebied. Voor de veelvoorkomende situaties zijn standaardafdekkingen
            beschikbaar.
          </p>
        </div>
      </section>

      {/* BLOCK 1 — BRENT */}
      <section className="bg-white py-16 sm:py-24 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-20 lg:items-center">
            {/* Text wrapper: behaves as `contents` on mobile (so its children participate in
                the grid order) and as a normal block on desktop (so layout is unchanged). */}
            <div className="contents lg:block lg:order-2">
              {/* Title block — appears FIRST on mobile/tablet */}
              <div className="order-1 lg:order-none">
                <span className="text-[#E8854A] text-sm font-semibold uppercase tracking-wider">Hoofdproduct</span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-0 lg:mb-6 leading-tight tracking-tight">
                  BRENT
                </h2>
              </div>
              {/* Rest of content — appears AFTER the image on mobile/tablet */}
              <div className="order-3 lg:order-none">
                <p className="text-base sm:text-lg text-gray-500 leading-relaxed mb-8">
                  Het gepatenteerde ontwerp van BRENT is geoptimaliseerd, zodat groeiperiode,
                  verplanting en integratie in de buitenruimte in balans zijn. Nooit meer gedoe met
                  zoekende wortels die in kabels verstrikt raken of bomen die niet tot hun volle
                  potentie groeien omdat er te weinig voedingsstoffen zijn.
                </p>
                <div className="border-t border-gray-200 pt-8">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 mb-5">Specificaties</h3>
                  <SpecList items={brentSpecs} />
                </div>
                <div className="mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                  <Link to="/zo-werkt-het" className={primaryBtn}>Zo werkt het</Link>
                  <Link to="/#contact-section" className={secondaryBtn}>
                    <Info className="w-4 h-4" />
                    Vraag productinformatie op
                  </Link>
                </div>
              </div>
            </div>
            {/* Image — appears BETWEEN title and rest on mobile/tablet, on the LEFT on desktop */}
            <div className="relative order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img src="https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1776943080499_582dbbb0.png" alt="BRENT Urban Tree Pit" className="w-full h-[300px] sm:h-[420px] lg:h-[520px] object-cover" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* BLOCK 2 — LEVELINGUNIT */}
      <section className="bg-gray-50 py-16 sm:py-24 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-20 lg:items-center">
            <div className="contents lg:block lg:order-2">
              {/* Title block — appears FIRST on mobile/tablet */}
              <div className="order-1 lg:order-none">
                <span className="text-[#E8854A] text-sm font-semibold uppercase tracking-wider">Watersysteem</span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-0 lg:mb-6 leading-tight tracking-tight">
                  Levelingunit
                </h2>
              </div>
              {/* Rest of content — appears AFTER the image on mobile/tablet */}
              <div className="order-3 lg:order-none">
                <p className="text-base sm:text-lg text-gray-500 leading-relaxed mb-8">
                  Voor een gezonde groei is de waterhuishouding erg belangrijk. Het systeem is te
                  voeden op grond- en hemelwater. De Levelingunit zorgt ervoor dat nooit te veel
                  water in de Urban Tree Pit terecht komt. Wanneer het waterreservoir vol is, sluit
                  de klep. De bomen in de Urban Tree Pits wortelen in sommige situaties daardoor
                  dieper dan het omliggende grondwater.
                </p>
                <div className="border-t border-gray-200 pt-8">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 mb-5">Specificaties</h3>
                  <SpecList items={levelingSpecs} />
                </div>
                <div className="mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                  <Link to="/#contact-section" className={primaryBtn}>
                    <Info className="w-4 h-4" />
                    Vraag productinformatie op
                  </Link>
                </div>
              </div>
            </div>
            {/* Image — between title and rest on mobile/tablet, on the LEFT on desktop */}
            <div className="relative order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={IMG_LEVELINGUNIT_LOCAL}
                  alt="Levelingunit watersysteem"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (img.dataset.fallbackApplied === 'true') return;
                    img.dataset.fallbackApplied = 'true';
                    img.src = IMG_LEVELINGUNIT_FALLBACK;
                  }}
                  className="w-full h-[300px] sm:h-[420px] lg:h-[520px] object-cover block"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ADD-ONS header */}
      <section className="pt-16 sm:pt-24 lg:pt-28 pb-4 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[#E8854A] text-sm font-semibold uppercase tracking-wider">Uitbreidingen</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6 leading-tight tracking-tight">
            Add-ons
          </h2>
          <p className="text-base sm:text-lg text-gray-500 leading-relaxed max-w-3xl mx-auto">
            Maak elke Urban Tree Pit compleet met passende beplanting, afdekkingen en op maat
            gemaakte straatmeubilair.
          </p>
        </div>
      </section>

      {/* BLOCK 3 — TOPCOVER 'FULL' */}
      <section className="bg-white py-14 sm:py-20 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 lg:items-center">
            <div className="contents lg:block lg:order-1">
              <div className="order-1 lg:order-none">
                <span className="text-[#E8854A] text-xs font-semibold uppercase tracking-wider">Add-on</span>
                <h3 className="text-2xl sm:text-3xl lg:text-[2.25rem] font-bold text-gray-900 mt-3 mb-0 lg:mb-5 leading-tight tracking-tight">
                  Topcover ‘Full’
                </h3>
              </div>
              <div className="order-3 lg:order-none">
                <p className="text-[15px] sm:text-base text-gray-500 leading-relaxed mb-7 whitespace-pre-line">{fullText}</p>
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-900 mb-4">Specificaties</h4>
                  <SpecList items={fullSpecs} />
                </div>
                <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                  <Link to="/#contact-section" className={primaryBtn}>
                    <Info className="w-4 h-4" />
                    Vraag productinformatie op
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative order-2 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden shadow-lg max-w-md lg:max-w-none mx-auto">
                <img src="https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1776945833677_f1dcde41.png" alt="Topcover Full afdekking" className="w-full h-[200px] sm:h-[280px] lg:h-[340px] object-cover" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* BLOCK 4 — TOPCOVER 'PARTLY' */}
      <section className="bg-gray-50 py-14 sm:py-20 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 lg:items-center">
            <div className="contents lg:block lg:order-1">
              <div className="order-1 lg:order-none">
                <span className="text-[#E8854A] text-xs font-semibold uppercase tracking-wider">Add-on</span>
                <h3 className="text-2xl sm:text-3xl lg:text-[2.25rem] font-bold text-gray-900 mt-3 mb-0 lg:mb-5 leading-tight tracking-tight">
                  Topcover ‘Partly’
                </h3>
              </div>
              <div className="order-3 lg:order-none">
                <p className="text-[15px] sm:text-base text-gray-500 leading-relaxed mb-7 whitespace-pre-line">{partlyText}</p>
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-900 mb-4">Specificaties</h4>
                  <SpecList items={partlySpecs} />
                </div>
                <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                  <Link to="/#contact-section" className={primaryBtn}>
                    <Info className="w-4 h-4" />
                    Vraag productinformatie op
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative order-2 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden shadow-lg max-w-md lg:max-w-none mx-auto">
                <img src="https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1776945913457_55ab89cf.png" alt="Topcover Partly afdekking" className="w-full h-[200px] sm:h-[280px] lg:h-[340px] object-cover" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* BLOCK 5 — BEPLANTING */}
      <section className="bg-white py-14 sm:py-20 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 lg:items-center">
            <div className="contents lg:block lg:order-1">
              <div className="order-1 lg:order-none">
                <span className="text-[#E8854A] text-xs font-semibold uppercase tracking-wider">Add-on</span>
                <h3 className="text-2xl sm:text-3xl lg:text-[2.25rem] font-bold text-gray-900 mt-3 mb-0 lg:mb-5 leading-tight tracking-tight">
                  Beplanting
                </h3>
              </div>
              <div className="order-3 lg:order-none">
                <p className="text-[15px] sm:text-base text-gray-500 leading-relaxed mb-7 whitespace-pre-line">{beplantingText}</p>
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-900 mb-4">Specificaties</h4>
                  <SpecList items={beplantingSpecs} />
                </div>
                <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                  <Link to="/#contact-section" className={primaryBtn}>
                    <Info className="w-4 h-4" />
                    Vraag productinformatie op
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative order-2 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden shadow-lg max-w-md lg:max-w-none mx-auto">
                <img src="https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1776946063113_5b030bd4.png" alt="Beplanting voor Urban Tree Pit" className="w-full h-[200px] sm:h-[280px] lg:h-[340px] object-cover" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* BLOCK 6 — BLOEMBOLLENMIX */}
      <section className="bg-gray-50 py-14 sm:py-20 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 lg:items-center">
            <div className="contents lg:block lg:order-1">
              <div className="order-1 lg:order-none">
                <span className="text-[#E8854A] text-xs font-semibold uppercase tracking-wider">Add-on</span>
                <h3 className="text-2xl sm:text-3xl lg:text-[2.25rem] font-bold text-gray-900 mt-3 mb-0 lg:mb-5 leading-tight tracking-tight">
                  Bloembollenmix
                </h3>
              </div>
              <div className="order-3 lg:order-none">
                <p className="text-[15px] sm:text-base text-gray-500 leading-relaxed mb-7 whitespace-pre-line">{bollenText}</p>
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-900 mb-4">Specificaties</h4>
                  <SpecList items={bollenSpecs} />
                </div>
                <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                  <Link to="/#contact-section" className={primaryBtn}>
                    <Info className="w-4 h-4" />
                    Vraag productinformatie op
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative order-2 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden shadow-lg max-w-md lg:max-w-none mx-auto">
                <img src="https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1776946215378_a52c4ffe.jpeg" alt="Bloembollenmix" className="w-full h-[200px] sm:h-[280px] lg:h-[340px] object-cover" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* BLOCK 7 — ZITRAND */}
      <section className="bg-white py-14 sm:py-20 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 lg:items-center">
            <div className="contents lg:block lg:order-1">
              <div className="order-1 lg:order-none">
                <span className="text-[#E8854A] text-xs font-semibold uppercase tracking-wider">Add-on</span>
                <h3 className="text-2xl sm:text-3xl lg:text-[2.25rem] font-bold text-gray-900 mt-3 mb-0 lg:mb-5 leading-tight tracking-tight">
                  Zitrand
                </h3>
              </div>
              <div className="order-3 lg:order-none">
                <p className="text-[15px] sm:text-base text-gray-500 leading-relaxed mb-7 whitespace-pre-line">{zitrandText}</p>
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-900 mb-4">Specificaties</h4>
                  <SpecList items={zitrandSpecs} />
                </div>
                <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                  <Link to="/#contact-section" className={primaryBtn}>
                    <Info className="w-4 h-4" />
                    Vraag productinformatie op
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative order-2 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden shadow-lg max-w-md lg:max-w-none mx-auto">
                <img src="https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1776946384209_56c9f434.jpg" alt="Zitrand maatwerk" className="w-full h-[200px] sm:h-[280px] lg:h-[340px] object-cover" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* BLOCK 8 — MAATWERK */}
      <section className="bg-gray-50 py-14 sm:py-20 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 lg:items-center">
            <div className="contents lg:block lg:order-1">
              <div className="order-1 lg:order-none">
                <span className="text-[#E8854A] text-xs font-semibold uppercase tracking-wider">Add-on</span>
                <h3 className="text-2xl sm:text-3xl lg:text-[2.25rem] font-bold text-gray-900 mt-3 mb-0 lg:mb-5 leading-tight tracking-tight">
                  Maatwerk
                </h3>
              </div>
              <div className="order-3 lg:order-none">
                <p className="text-[15px] sm:text-base text-gray-500 leading-relaxed mb-7 whitespace-pre-line">
                  Wij begrijpen dat elke locatie uniek is en vraagt om een specifieke aanpak. Daarom
                  bieden wij maatwerkoplossingen die aansluiten op de situatie, omgeving en wensen van
                  het project.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                  <Link to="/#contact-section" className={primaryBtn}>
                    Vraag maatwerk aan
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative order-2 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden shadow-lg max-w-md lg:max-w-none mx-auto">
                <img src="https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1777917006143_e3d9833a.jpg" alt="Maatwerk ontwerp Urban Tree Pit" className="w-full h-[200px] sm:h-[280px] lg:h-[340px] object-cover" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="relative z-[2] bg-gray-50" style={{
      paddingTop: '3rem',
      paddingBottom: '10rem',
      marginBottom: '-2px'
    }}>
        <div
          className="absolute left-0 right-0 bottom-0 h-10 bg-[#182418]"
          aria-hidden="true"
        />
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute inset-0 bg-[#182418]" style={{
          clipPath: 'polygon(0 62%, 100% 76%, 100% 100%, 0 100%)'
        }} />
        </div>
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute inset-0 bg-[#E8854A]" style={{
          clipPath: 'polygon(0 14%, 100% 0%, 100% 76%, 0 62%)'
        }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight tracking-tight">
            Benieuwd naar de mogelijkheden?
          </h2>
          <div className="flex items-center justify-center">
            <Link to="/#contact-section" className="px-8 py-4 rounded-xl text-base font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 bg-white text-[#E8854A] hover:bg-gray-50">
              Neem contact op
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>;
};
export default ProductenPage;
