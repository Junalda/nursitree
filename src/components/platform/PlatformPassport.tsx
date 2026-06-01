import React from 'react';
import { TreePine } from 'lucide-react';
const PASSPORT_IMG = 'https://d64gsuwffb70l.cloudfront.net/69cd2e1dc76c2b3ecc191d41_1775068679383_0d3cdb10.png';
const bullets = ['Soorteigenschappen en prognose voor de kweekperiode', 'Relevante basisgegevens van Urban Tree Pits en Levelingunits, voor de volgende eigenaar', 'Plantdatum en belangrijke omgevingsfactoren die de groeisnelheid kunnen beïnvloeden'];
const PlatformPassport: React.FC = () => {
  return <section id="tree-passport" className="pt-40 sm:pt-32 pb-32 sm:pb-40 lg:pb-32 bg-gray-50 relative overflow-hidden">



      {/* Decorative diagonal */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-white">
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gray-50" style={{
        clipPath: 'polygon(0 100%, 100% 0, 100% 100%)'
      }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left: Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img src="https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1776937144825_1f427330.png" alt="Digitaal boompaspoort" className="w-full h-auto" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-6 -right-4 sm:right-8 bg-white rounded-2xl shadow-xl p-5 border border-gray-100 max-w-[220px]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#6BA539]/10 flex items-center justify-center">
                  <TreePine className="w-5 h-5 text-[#6BA539]" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Boom ID</p>
                  <p className="text-sm font-bold text-gray-900">#NT-2847</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Groei</span>
                  <span className="text-[#6BA539] font-semibold">+12cm/jaar</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#6BA539] to-[#4E8A25] rounded-full" style={{
                  width: '72%'
                }} />
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Status</span>
                  <span className="text-[#6BA539] font-semibold">Gezond</span>
                </div>
              </div>
            </div>

            {/* Glow */}
            <div className="absolute -inset-8 bg-[#6BA539]/5 rounded-[3rem] blur-3xl -z-10" />
          </div>

          {/* Right: Content */}
          <div className="order-1 lg:order-2">
            <span className="text-[#6BA539] text-sm font-semibold uppercase tracking-[0.2em]">
              Kernfunctie
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6 tracking-tight">Eén landelijk overzicht</h2>
            <div className="mb-12 space-y-6">
              <p className="text-lg text-gray-500 leading-relaxed">
                Bij NursiTree vinden we het belangrijk dat onze opdrachtgevers zo min mogelijk gedoe ervaren. Ze hebben het al druk genoeg.
              </p>
              <p className="text-lg text-gray-500 leading-relaxed">
                Daarom registreren we op ons platform alles wat we moeten weten om de gezondheid en groei van elke boom scherp in de gaten te houden. Van plantdatum, tot boomsoort en van groeisnelheid tot omgevingsfactoren.
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-10 mb-2 tracking-tight">
                Een soort bomenpaspoort dus.
              </h3>
              <p className="text-lg text-gray-500 leading-relaxed">
                Zo weten we precies wanneer de boom verplaatst moet worden en geven we de eigenaar ruim op tijd een seintje wanneer de verplantdatum eraan zit te komen.
              </p>
              <p className="text-lg text-gray-500 leading-relaxed">
                Samen zoeken we naar een geschikte nieuwe plek. Dat kan binnen de eigen gemeente zijn, maar je kan de boom via ons platform ook verkopen aan een andere locatie. Om de boom goed in de gaten te kunnen houden en toe te werken naar een succesvolle verplanting leggen we deze gegevens vast:
              </p>
            </div>
            {/* Bullet list */}

            <ul className="space-y-4 sm:space-y-5">
              {bullets.map(text => <li key={text} className="flex gap-4">
                  <span aria-hidden="true" className="mt-2.5 w-2 h-2 rounded-full bg-[#6BA539] flex-shrink-0" />
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">{text}</p>
                </li>)}
            </ul>


          </div>
        </div>
      </div>
    </section>;
};
export default PlatformPassport;