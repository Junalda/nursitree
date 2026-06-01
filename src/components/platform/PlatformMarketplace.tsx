import React from 'react';
import { ArrowRight, RefreshCw, Handshake, BarChart3 } from 'lucide-react';

const TRANSPORT_IMG = 'https://d64gsuwffb70l.cloudfront.net/69cd2e1dc76c2b3ecc191d41_1775068656446_96558746.jpg';

const valuePoints = [
  {
    icon: RefreshCw,
    title: 'Verplaatsbaar',
    description: 'Bomen kunnen veilig worden verplaatst naar een nieuwe locatie wanneer het project dat vraagt.',
  },
  {
    icon: Handshake,
    title: 'Overdraagbaar',
    description: 'Bomen kunnen worden overgedragen of verkocht aan andere partijen via het platform.',
  },
  {
    icon: BarChart3,
    title: 'Vraag & aanbod',
    description: 'Het platform verbindt aanbieders met afnemers. Een echte marktplaats voor stedelijk groen.',
  },
];

const PlatformMarketplace: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-white relative overflow-hidden">
      {/* Decorative diagonal top */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-[#fafbf8]">
        <div
          className="absolute bottom-0 left-0 right-0 h-24 bg-white"
          style={{ clipPath: 'polygon(0 0, 100% 100%, 100% 100%, 0 100%)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left: Content */}
          <div>
            <span className="text-[#E8854A] text-sm font-semibold uppercase tracking-[0.2em]">
              Waardecreatie
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6 tracking-tight">
              Een boom is geen kostenpost,{' '}
              <span className="text-[#E8854A]">maar een waarde</span>
            </h2>
            <p className="text-lg text-gray-500 leading-relaxed mb-10">
              Traditioneel worden bomen gezien als kostenpost. NursiTree verandert dat
              perspectief. Bomen zijn waardevolle assets die kunnen worden verplaatst,
              overgedragen en zelfs verhandeld.
            </p>

            <div className="space-y-6 mb-10">
              {valuePoints.map((point) => (
                <div
                  key={point.title}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#E8854A]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#E8854A] transition-colors duration-300">
                    <point.icon className="w-5 h-5 text-[#E8854A] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-gray-900 mb-1">{point.title}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">{point.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                const el = document.getElementById('platform-preview');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group inline-flex items-center gap-2 px-7 py-3.5 bg-[#E8854A] text-white text-sm font-semibold rounded-xl hover:bg-[#D4743A] transition-all duration-300 shadow-lg shadow-[#E8854A]/20"
            >
              Ontdek de marktplaats
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right: Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={TRANSPORT_IMG}
                alt="Boom wordt verplaatst naar nieuwe locatie"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* Floating stat card */}
            <div className="absolute -bottom-6 -left-4 sm:left-8 bg-white rounded-2xl shadow-xl p-5 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#6BA539]/10 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-[#6BA539]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">+340%</p>
                  <p className="text-xs text-gray-400 font-medium">Waardebehoud na verplaatsing</p>
                </div>
              </div>
            </div>

            {/* Glow */}
            <div className="absolute -inset-8 bg-[#E8854A]/5 rounded-[3rem] blur-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformMarketplace;
