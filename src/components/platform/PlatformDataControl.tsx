import React from 'react';
import { Bell, Eye, Settings, Brain } from 'lucide-react';

const benefits = [
  {
    icon: Bell,
    title: 'Tijdige signalen voor verplaatsing',
    description:
      'Het platform stuurt automatisch meldingen wanneer een boom klaar is voor verplaatsing. Geen verrassingen, alleen duidelijke signalen.',
  },
  {
    icon: Eye,
    title: 'Inzicht voor beheerders',
    description:
      'Beheerders en projectmanagers hebben altijd een actueel overzicht. Van individuele boom tot heel het bestand.',
  },
  {
    icon: Settings,
    title: 'Minder handmatig werk',
    description:
      'Automatische dataverzameling en rapportage vervangt tijdrovende handmatige controles en administratie.',
  },
  {
    icon: Brain,
    title: 'Betere besluitvorming',
    description:
      'Data-gedreven beslissingen over onderhoud, verplaatsing en investering. Minder risico, meer resultaat.',
  },
];

const PlatformDataControl: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="text-[#E8854A] text-sm font-semibold uppercase tracking-[0.2em]">
            Data & Controle
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6 tracking-tight">
            Altijd inzicht.{' '}
            <span className="text-[#E8854A]">Geen verrassingen.</span>
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed">
            Zo weten we precies wanneer een boom klaar is, wat de status is en welke
            actie nodig is. Het platform neemt de complexiteit weg.
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid sm:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {benefits.map((b, i) => (
            <div
              key={b.title}
              className="group relative bg-white rounded-2xl p-8 border border-gray-100 hover:border-transparent hover:shadow-2xl transition-all duration-500"
            >
              {/* Gradient border on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#6BA539]/10 to-[#E8854A]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6BA539]/10 to-[#6BA539]/5 flex items-center justify-center flex-shrink-0 group-hover:from-[#6BA539] group-hover:to-[#4E8A25] transition-all duration-500">
                  <b.icon className="w-6 h-6 text-[#6BA539] group-hover:text-white transition-colors duration-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{b.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{b.description}</p>
                </div>
              </div>

              {/* Number */}
              <div className="absolute top-6 right-8 text-6xl font-bold text-gray-50 group-hover:text-[#6BA539]/5 transition-colors">
                {String(i + 1).padStart(2, '0')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformDataControl;
