import React, { useEffect, useRef, useState } from 'react';
import { ShieldCheck, Cable, Minimize2, Zap, HardHat, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
const AERIAL_IMG = 'https://d64gsuwffb70l.cloudfront.net/69cd2e1dc76c2b3ecc191d41_1775071107250_939bcf30.jpg';
const benefits = [{
  icon: ShieldCheck,
  title: 'Minder druk op de groeiplaats',
  desc: 'Het systeem beschermt de wortelzone volledig, waardoor bomen ongestoord groeien, zelfs in drukke stedelijke omgevingen.'
}, {
  icon: Cable,
  title: 'Geen gevecht met kabels en leidingen',
  desc: 'Robuuste scheiding voorkomt dat wortels kabels en leidingen bereiken. Geen onverwachte schade, geen extra kosten.'
}, {
  icon: Minimize2,
  title: 'Minder ruimte nodig',
  desc: 'Compacte standaardafmetingen die naadloos passen in bestaande parkeervakken en straatprofielen.'
}, {
  icon: Zap,
  title: 'Snellere bouw',
  desc: 'Gestandaardiseerd ontwerp betekent snellere installatie, minder coördinatie en een kortere doorlooptijd.'
}, {
  icon: HardHat,
  title: 'Sterke constructie',
  desc: 'Gebouwd om jarenlang mee te gaan onder stedelijke belasting, van voetgangers tot zwaar verkeer.'
}];
const ZwhBenefits: React.FC = () => {
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
  return <section ref={ref} className="py-24 sm:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`max-w-3xl mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-[#6BA539] text-sm font-semibold uppercase tracking-[0.2em]">
            Voordelen
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6 tracking-tight">
            Waarom <span className="text-[#6BA539]">BRENT</span> werkt
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed">Elk voordeel is het directe resultaat van doordacht ontwerp, geen compromissen.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Benefits list */}
          <div className="space-y-4">
            {benefits.map((b, i) => <div key={b.title} className={`group flex gap-5 p-6 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-lg hover:border-[#6BA539]/20 transition-all duration-500 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`} style={{
            transitionDelay: visible ? `${200 + i * 80}ms` : '0ms'
          }}>
                <div className="w-11 h-11 rounded-xl bg-[#6BA539]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#6BA539]/20 transition-colors">
                  <b.icon className="w-5 h-5 text-[#6BA539]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-1">{b.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{b.desc}</p>
                </div>
              </div>)}

            {/* CTA */}
            <div className="pt-6">
              <Link to="/diensten" className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#6BA539] text-white text-sm sm:text-base font-semibold rounded-xl hover:bg-[#5A9130] transition-all duration-200 shadow-lg hover:shadow-xl">
                Bekijk onze diensten
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
            </div>

          </div>

          {/* Image */}
          <div className={`relative transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img src="https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1776926234719_744c35e8.png" alt="Stedelijke vergroening met BRENT" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </div>
    </section>;

};
export default ZwhBenefits;