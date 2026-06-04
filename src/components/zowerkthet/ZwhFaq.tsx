import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
export interface FaqItem {
  question: string;
  answer: string;
}
export const faqs: FaqItem[] = [{
  question: 'Wat zijn de afdekmogelijkheden?',
  answer: 'De bovenzijde van BRENT kan volledig worden afgedekt met diverse materialen: bestrating, tegels, half-verharding of groen. Dit maakt volledige integratie in het bestaande maaiveld mogelijk, ongeacht het straatprofiel. Meerdere combinaties zijn mogelijk, waardoor het systeem flexibel inzetbaar is in elk stedelijk ontwerp.'
}, {
  question: 'Hoe werkt de verplanting en wat is het boomkroonvolume?',
  answer: 'BRENT is ontworpen met verplanting als kernprincipe. Bomen groeien in een gecontroleerde omgeving tot het optimale verplantmoment. Het boomkroonvolume is afhankelijk van de boomsoort, maar door de 7 m³ substraat en het geïntegreerde watersysteem bereiken bomen een aanzienlijk kroonvolume binnen 15 tot 20 jaar. Bij verplanting blijft de wortelkluit intact, wat de overlevingskans sterk vergroot.'
}, {
  question: 'Hoe groot is de bak precies?',
  answer: 'De standaardafmetingen van BRENT zijn 2,50 x 3,30 meter met een hoogte van 1,30 meter. Deze maten zijn bewust gekozen om naadloos te passen binnen de gebruikelijke maatvoering van parkeervakken. De bak bevat 7 m³ substraat en een waterreservoir van 1.200 liter.'
}, {
  question: 'Is BRENT geschikt voor zettingsgevoelig gebied?',
  answer: 'Ja. De constructie van BRENT is zelfdragend en verdeelt het gewicht gelijkmatig. Hierdoor is het systeem ook geschikt voor zettingsgevoelige gebieden. De robuuste betonconstructie voorkomt vervorming en garandeert stabiliteit, zelfs bij wisselende bodemcondities.'
}, {
  question: 'Hoe zit het met de wortelecologie?',
  answer: 'De wortelecologie is een kernonderdeel van het ontwerp. De bomengrond in BRENT heeft een hoog organische stofgehalte, wat zorgt voor een gezond bodemleven en optimale wortelgroei. De wortels worden volledig gescheiden van kabels en leidingen door een robuuste barrière. Dit voorkomt wortelschade aan infrastructuur én beschermt de boom tegen verstoring.'
}, {
  question: 'Hoe wordt de waterbalans geregeld?',
  answer: 'Het geïntegreerde waterreservoir van 1.200 liter is voldoende voor een droogteperiode van circa 20 dagen. De watergift wordt gereguleerd via een extern vlottersysteem. Capillair materiaal geeft vocht geleidelijk af aan de wortelkluit, terwijl overtollig regenwater wordt afgevoerd naar de omliggende bodem of het regenwaterriool. Dit mechanische systeem werkt volledig zonder elektriciteit of digitale aansturing.'
}, {
  question: 'Welk type beton wordt gebruikt?',
  answer: 'BRENT wordt vervaardigd uit hoogwaardig gewapend beton dat voldoet aan de strengste normen voor stedelijke toepassingen. De betonkeuze is geoptimaliseerd voor duurzaamheid, weerbestendigheid en draagkracht. Het beton is bestand tegen vorst, zouten en de belasting van zwaar verkeer, waardoor het systeem decennialang meegaat zonder onderhoud.'
}];
const FaqAccordionItem: React.FC<{
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
  visible: boolean;
}> = ({
  item,
  isOpen,
  onToggle,
  index,
  visible
}) => <div className={`border border-gray-100 rounded-2xl overflow-hidden transition-all duration-500 ${isOpen ? 'bg-white shadow-lg border-[#6BA539]/20' : 'bg-gray-50 hover:bg-white hover:shadow-sm'} ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{
  transitionDelay: visible ? `${150 + index * 60}ms` : '0ms'
}}>
    <button onClick={onToggle} className="w-full flex items-center justify-between p-6 sm:p-7 text-left">
      <span className={`text-base sm:text-lg font-bold pr-4 transition-colors ${isOpen ? 'text-[#6BA539]' : 'text-gray-900'}`}>
        {item.question}
      </span>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isOpen ? 'bg-[#6BA539] rotate-180' : 'bg-gray-100'}`}>
        <ChevronDown className={`w-4 h-4 transition-colors ${isOpen ? 'text-white' : 'text-gray-500'}`} />
      </div>
    </button>
    <div className={`overflow-hidden transition-all duration-400 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
      <div className="px-6 sm:px-7 pb-6 sm:pb-7">
        <div className="w-12 h-0.5 bg-[#6BA539]/30 mb-4" />
        <p className="text-sm sm:text-base text-gray-500 leading-relaxed">{item.answer}</p>
      </div>
    </div>
  </div>;
const ZwhFaq: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, {
      threshold: 0.05
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <section id="zwh-faq" ref={ref} className="relative z-[1] py-28 sm:py-36">
      {/*
        Diagonal background shape — extends far beyond section bounds
        to overlap with the green section above and orange section below.
        The green/orange sections use z-[2] so their shapes paint on top,
        while this grey fills the gaps between them.
         Green bottom edge: polygon bottom = (0,100%) → (100%,82%) = 18% slope
        Orange top edge:   polygon top   = (0,14%)  → (100%,0%)  = 14% slope
        FAQ angles are set to generously cover both transition zones.
       */}
      <div className="absolute left-0 right-0 pointer-events-none" style={{
      top: '-22rem',
      bottom: '-22rem'
    }} aria-hidden="true">
        {/* Main diagonal grey background — steep angles to match neighbors */}
        <div className="absolute inset-0" style={{
        background: '#f8faf6',
        clipPath: 'polygon(0 18%, 100% 0%, 100% 84%, 0 100%)'
      }} />
        {/* Subtle gradient overlay for depth — greenish tint at top, warm tint at bottom */}
        <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, rgba(107,165,57,0.05) 0%, rgba(107,165,57,0.02) 15%, transparent 45%, transparent 55%, rgba(232,133,74,0.02) 85%, rgba(232,133,74,0.05) 100%)',
        clipPath: 'polygon(0 18%, 100% 0%, 100% 84%, 0 100%)'
      }} />
      </div>

      {/* Content — unchanged */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-[#6BA539] text-sm font-semibold uppercase tracking-[0.2em]">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6 tracking-tight">
            Veelgestelde vragen
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto">Alles wat je wilt weten over BRENT, van technische specificaties tot praktische toepassingen.</p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => <FaqAccordionItem key={i} item={faq} index={i} isOpen={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? null : i)} visible={visible} />)}
        </div>
      </div>
    </section>;
};
export default ZwhFaq;