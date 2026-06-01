import React from 'react';
const benefits = [{
  title: 'Verdien je investering terug',
  description: 'Bomen zijn geen wegwerpproduct. Door slim beheer en verplaatsing behoud je de investering in jouw boomkroonvolume.',
  accent: '#6BA539'
}, {
  title: 'Inzicht voor de hele gemeente',
  description: 'Eén centraal overzicht van alle bomen in jouw stadskwekerij binnen jouw gemeente en de rest van Nederland.',
  accent: '#6BA539'
}, {
  title: 'Geen verplantstress voor boom en beheerder',
  description: 'Het platform constateert tijdig het verplantmoment van de boom.',
  accent: '#E8854A'
}, {
  title: 'Communicatietool richting bewoners',
  description: 'Informeer bewoners over de bomen in hun buurt. Transparantie creëert draagvlak en betrokkenheid.',
  accent: '#E8854A'
}, {
  title: 'Nieuwe plek vinden',
  description: 'Het platform matcht beschikbare bomen met geschikte locaties. Efficiënt en doelgericht.',
  accent: '#6BA539'
}, {
  title: 'Bomen verhandelbaar',
  description: 'Via het platform kunnen bomen worden aangeboden, gevonden en overgedragen. Een echte marktplaats.',
  accent: '#6BA539'
}];
const PlatformBenefits: React.FC = () => {
  return <section className="pt-32 sm:pt-40 lg:pt-24 pb-24 sm:pb-32 bg-[#fafbf8] relative overflow-hidden">

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#6BA539]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#E8854A]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <span className="text-[#6BA539] text-sm font-semibold uppercase tracking-[0.2em]">
            Voordelen
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6 tracking-tight">Waarom het NursiTree Platform werkt</h2>


          <p className="text-lg text-gray-500 leading-relaxed">Ontworpen voor gemeenten, projectontwikkelaars en beheerders die slim vooruit willen kijken en die snappen dat hun boom geld waard is</p>
        </div>

        {/* Benefits grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map(b => <div key={b.title} className="group relative bg-white rounded-2xl p-8 border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden">
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
            background: `linear-gradient(90deg, ${b.accent}, ${b.accent}80)`
          }} />

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {b.title}
              </h3>
              <p className="text-base text-gray-500 leading-relaxed">
                {b.description}
              </p>
            </div>)}
        </div>
      </div>
    </section>;
};
export default PlatformBenefits;