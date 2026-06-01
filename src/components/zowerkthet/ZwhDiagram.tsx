import React, { useEffect, useRef, useState } from 'react';
const DIAGRAM_IMG = 'https://d64gsuwffb70l.cloudfront.net/69cd2e1dc76c2b3ecc191d41_1775071083538_ed1a86d1.jpg';
const callouts = [{
  text: 'Geschikt voor alle boomsoorten'
}, {
  text: 'Volledige integratie in (bestaand) maaiveld. Meerdere combinaties mogelijk'
}, {
  text: 'Bomengrond met hoog organische stofgehalte'
}, {
  text: 'Geen bestratingsopdruk door boomwortels'
}, {
  text: 'Robuuste scheiding tussen kabels & leidingen en wortels'
}, {
  text: 'Geïntegreerd waterreservoir'
}, {
  text: 'Mechanische vochtregulatie'
}, {
  text: 'Lopen, fietsen, rijden en parkeren'
}];
const PlusIcon: React.FC<{
  className?: string;
}> = ({
  className
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>;
const ZwhDiagram: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, {
      threshold: 0.1
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <section ref={ref} className="py-24 sm:py-32 bg-[#f8faf6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`max-w-3xl mx-auto text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-[#6BA539] text-sm font-semibold uppercase tracking-[0.2em]">
            Technisch overzicht
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6 tracking-tight">
            Alles in <span className="text-[#6BA539]">één systeem</span>
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed">Elk onderdeel van BRENT is ontworpen om samen te werken  van maaiveld tot waterreservoir.</p>
        </div>

        {/* Diagram layout */}
        <div className="grid lg:grid-cols-3 gap-8 items-center">
          {/* Left callouts */}
          <div className={`order-2 lg:order-1 space-y-5 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            {callouts.slice(0, 4).map((c, i) => <div key={i} className="group flex items-start gap-4 p-4 rounded-xl bg-white border border-gray-100 hover:border-[#6BA539]/30 hover:shadow-md transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-[#6BA539]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#6BA539]/20 transition-colors">
                  <PlusIcon className="w-5 h-5 text-[#6BA539]" />
                </div>
                <p className="text-sm text-gray-700 leading-relaxed font-medium pt-1.5">
                  {c.text}
                </p>
              </div>)}
          </div>

          {/* Center image */}
          <div className={`order-1 lg:order-2 mb-8 lg:mb-0 relative transition-all duration-700 delay-300 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white">
              <img src="https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1776925304598_cddc1de1.png" alt="Technisch diagram BRENT Urban Tree Pit" className="w-full h-auto" />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            </div>
            {/* Floating label */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#6BA539] text-white px-5 py-2 rounded-lg shadow-lg text-sm font-bold whitespace-nowrap">
              BRENT, Schematische weergave
            </div>
          </div>

          {/* Right callouts */}
          <div className={`order-3 lg:order-3 space-y-5 transition-all duration-700 delay-400 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            {callouts.slice(4).map((c, i) => <div key={i} className="group flex items-start gap-4 p-4 rounded-xl bg-white border border-gray-100 hover:border-[#6BA539]/30 hover:shadow-md transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-[#6BA539]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#6BA539]/20 transition-colors">
                  <PlusIcon className="w-5 h-5 text-[#6BA539]" />
                </div>
                <p className="text-sm text-gray-700 leading-relaxed font-medium pt-1.5">
                  {c.text}
                </p>
              </div>)}
          </div>
        </div>

      </div>
    </section>;
};
export default ZwhDiagram;