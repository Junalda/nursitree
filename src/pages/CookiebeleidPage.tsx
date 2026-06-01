import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Cookie } from 'lucide-react';

const CookiebeleidPage: React.FC = () => {
  return (
    <PageLayout>
      {/* Hero / Header */}
      <section className="bg-gradient-to-b from-[#f0f7eb] to-white py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#6BA539]/10 flex items-center justify-center">
              <Cookie className="w-6 h-6 text-[#6BA539]" />
            </div>
            <span className="text-[#6BA539] text-sm font-semibold uppercase tracking-[0.15em]">
              Cookies
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
            Cookiebeleid NursiTree
          </h1>
          <p className="mt-4 text-gray-500 text-base sm:text-lg">
            Laatst bijgewerkt: april 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-gray prose-lg max-w-none
            prose-headings:text-gray-900 prose-headings:tracking-tight
            prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:font-bold prose-h2:mt-16 prose-h2:mb-6 prose-h2:pb-4 prose-h2:border-b prose-h2:border-gray-100
            prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-4
            prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-4
            prose-strong:text-gray-900 prose-strong:font-semibold
          ">
            {/* Intro */}
            <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-100 mb-12">
              <p className="text-gray-600 leading-relaxed">
                Dit cookiebeleid is van toepassing op het gebruik van cookies op de website van NursiTree B.V. en NursiTree Holland B.V. (hierna gezamenlijk: "NursiTree").
              </p>
            </div>

            {/* Wat zijn cookies? */}
            <h2>Wat zijn cookies?</h2>
            <p>
              Cookies zijn kleine tekstbestanden die bij het bezoeken van een website op jouw computer, tablet of smartphone worden opgeslagen. Deze cookies zorgen ervoor dat de website goed functioneert en kunnen daarnaast inzicht geven in het gebruik van de website.
            </p>

            {/* Welke cookies gebruikt NursiTree? */}
            <h2>Welke cookies gebruikt NursiTree?</h2>
            <p>
              NursiTree maakt gebruik van de volgende soorten cookies:
            </p>

            {/* 1. Functionele cookies */}
            <h3>1. Functionele cookies</h3>
            <p>
              Deze cookies zijn noodzakelijk voor het correct functioneren van de website. Zonder deze cookies kunnen bepaalde onderdelen van de website niet goed werken.
            </p>

            {/* 2. Analytische cookies */}
            <h3>2. Analytische cookies</h3>
            <p>
              Deze cookies helpen ons inzicht te krijgen in hoe bezoekers de website gebruiken, zodat wij de website kunnen verbeteren.
              Deze gegevens worden geanonimiseerd en niet gebruikt om individuele bezoekers te identificeren.
            </p>

            {/* Geen tracking cookies */}
            <h2>Geen tracking cookies</h2>
            <p>
              NursiTree maakt op dit moment geen gebruik van tracking cookies of cookies voor marketingdoeleinden.
            </p>

            {/* Cookies beheren of verwijderen */}
            <h2>Cookies beheren of verwijderen</h2>
            <p>
              Je kunt cookies zelf beheren of verwijderen via de instellingen van jouw browser.
              Daarnaast kan je jouw browser zo instellen dat deze geen cookies meer opslaat.
            </p>
            <p>
              Houd er rekening mee dat het uitschakelen van cookies invloed kan hebben op de werking van de website.
            </p>

            {/* Wijzigingen */}
            <h2>Wijzigingen</h2>
            <p>
              NursiTree behoudt zich het recht voor dit cookiebeleid te wijzigen.
              Wij adviseren je om deze pagina regelmatig te raadplegen.
            </p>

            {/* Contact */}
            <h2>Contact</h2>
            <p>
              Heb je vragen over dit cookiebeleid? Neem dan contact op via:{' '}
              <a href="mailto:tony@nursitree.com" className="text-[#6BA539] font-semibold hover:underline">
                tony@nursitree.com
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Back to top / navigation */}
      <section className="py-12 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} NursiTree. Alle rechten voorbehouden.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-sm text-[#6BA539] font-semibold hover:underline transition-colors"
          >
            Terug naar boven
          </button>
        </div>
      </section>
    </PageLayout>
  );
};

export default CookiebeleidPage;
