import React from 'react';
import { Sprout, Activity, Truck, MapPin } from 'lucide-react';

const steps = [
  {
    icon: Sprout,
    number: '01',
    title: 'Groei in de stad',
    description:
      'Bomen groeien op in speciaal ontworpen NursiTree boomputten in de stedelijke omgeving. Vanaf dag één worden ze gemonitord.',
    color: '#6BA539',
  },
  {
    icon: Activity,
    number: '02',
    title: 'Monitoring via platform',
    description:
      'Het platform volgt groeisnelheid, gezondheid en omgevingsfactoren. Elke boom krijgt een digitaal paspoort met alle data.',
    color: '#4E8A25',
  },
  {
    icon: Truck,
    number: '03',
    title: 'Verplaatsing',
    description:
      'Wanneer het moment daar is, wordt de boom veilig verplaatst. Het platform voorspelt het optimale verplantmoment.',
    color: '#E8854A',
  },
  {
    icon: MapPin,
    number: '04',
    title: 'Nieuwe locatie',
    description:
      'De boom krijgt een nieuwe bestemming, een park, wijk of openbare ruimte. Volledig gedocumenteerd en traceerbaar.',
    color: '#D4743A',
  },
];

const PlatformLifecycle: React.FC = () => {
  return (
    <section id="lifecycle" className="py-24 sm:py-32 bg-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: 'radial-gradient(circle, #6BA539 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="text-[#6BA539] text-sm font-semibold uppercase tracking-[0.2em]">
            Het Systeem
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6 tracking-tight">
            Van groeiplaats tot nieuwe bestemming
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed">
            Nederland wordt steeds groener. Bomen worden geplant, groeien op in de stad en
            krijgen uiteindelijk een permanente plek. Ons platform begeleidt elke stap.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line (desktop) */}
          <div className="hidden lg:block absolute top-24 left-[12.5%] right-[12.5%] h-0.5">
            <div className="w-full h-full bg-gradient-to-r from-[#6BA539] via-[#E8854A] to-[#D4743A] opacity-20 rounded-full" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, i) => (
              <div key={step.number} className="relative group">
                <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-500 h-full">
                  {/* Step number */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundColor: `${step.color}10` }}
                    >
                      <step.icon className="w-7 h-7" style={{ color: step.color }} />
                    </div>
                    <span
                      className="text-5xl font-bold opacity-10 transition-opacity group-hover:opacity-20"
                      style={{ color: step.color }}
                    >
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>

                  {/* Arrow connector for mobile */}
                  {i < steps.length - 1 && (
                    <div className="sm:hidden flex justify-center mt-6">
                      <div className="w-0.5 h-8 bg-gradient-to-b from-gray-200 to-transparent" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformLifecycle;
