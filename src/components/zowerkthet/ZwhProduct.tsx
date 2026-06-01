import React, { useEffect, useRef, useState } from 'react';
const PRODUCT_IMG = 'https://d64gsuwffb70l.cloudfront.net/69cd2e1dc76c2b3ecc191d41_1775071062860_6dac8277.png';
const highlights = [{
  label: 'Gepatenteerd ontwerp'
}, {
  label: 'Optimale groeibalans'
}, {
  label: 'Geïntegreerd watersysteem'
}];
const ZwhProduct: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, {
      threshold: 0.15
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <section id="zwh-product" ref={ref} className="py-24 sm:py-32 bg-[#f8faf6]">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className={`relative transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="relative rounded-3xl overflow-hidden bg-white shadow-2xl">
              <img src="https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1776925188719_f785ca37.png" alt="BRENT Urban Tree Pit systeem" className="w-full h-auto" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-4 sm:right-8 bg-[#6BA539] text-white px-6 py-3 rounded-xl shadow-lg">
              <span className="text-sm font-bold">Urban Tree Pit</span>
            </div>
          </div>

          {/* Content */}
          <div className={`transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <span className="text-[#6BA539] text-sm font-semibold uppercase tracking-[0.2em]">
              Het product
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6 tracking-tight">
              Dit is <span className="text-[#6BA539]">BRENT</span>
            </h2>
            <p className="text-lg text-gray-500 leading-relaxed mb-8">
              Het gepatenteerde ontwerp van BRENT is geoptimaliseerd, zodat
              groeiperiode, verplanting en integratie in de buitenruimte in balans
              zijn. Nooit meer gedoe met zoekende wortels die in kabels verstrikt
              raken of bomen die niet tot hun volle potentie groeien omdat er te
              weinig voedingsstoffen zijn.
            </p>

            {/* Highlights — right-aligned calm content blocks */}
            <div className="flex flex-col items-end gap-3">
              {highlights.map(h => <div key={h.label} className="px-5 py-3 rounded-xl bg-[#f8faf6] border border-gray-200/60">
                  <span className="text-sm font-semibold text-gray-700">{h.label}</span>
                </div>)}
            </div>

          </div>
        </div>
      </div>
    </section>;
};
export default ZwhProduct;