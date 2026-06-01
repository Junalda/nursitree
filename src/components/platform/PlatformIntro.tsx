import React from 'react';

const PlatformIntro: React.FC = () => {
  return (
    <section className="relative bg-white py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Text column */}
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 sm:mb-10 leading-tight tracking-tight text-left">
              De plek waar alles samenkomt
            </h2>
            <div className="space-y-6 sm:space-y-8">
              <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed text-left">
                Wij hebben als NursiTree een systeem ontwikkeld, waarmee je midden in de drukke stad een gezonde boom kunt laten opgroeien. Maar na zo'n twintig jaar verplaatsen we de boom, zodat hij ergens anders nóg verder kan groeien. Waar moet de boom dan heen?
              </p>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed text-left">
                Daarvoor hebben we een slim platform gebouwd, zodat er voor de door jou zorgvuldig opgekweekte boom altijd een goede nieuwe plek beschikbaar is en die op het platform terug te vinden is.
              </p>
            </div>
          </div>

          {/* Image column */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <img
              src="https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1777922697707_4036abcc.jpg"
              alt="Boom in envelop wordt verbonden met laptop met platform-overzicht van Nederland en groeigrafiek"
              className="w-full max-w-xl h-auto object-contain"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformIntro;
