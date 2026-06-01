import React from 'react';
import PageLayout from '@/components/PageLayout';
import { FileText } from 'lucide-react';

const AlgemeneVoorwaardenPage: React.FC = () => {
  return (
    <PageLayout>
      {/* Hero / Header */}
      <section className="bg-gradient-to-b from-[#f0f7eb] to-white py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#6BA539]/10 flex items-center justify-center">
              <FileText className="w-6 h-6 text-[#6BA539]" />
            </div>
            <span className="text-[#6BA539] text-sm font-semibold uppercase tracking-[0.15em]">
              Juridisch
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
            Algemene Voorwaarden NursiTree, Afnemers
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
            {/* Artikel 1 */}
            <h2>Artikel 1: Definities</h2>
            <p>
              In deze Algemene Voorwaarden worden de volgende begrippen als volgt gedefinieerd:
            </p>
            <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-100 my-8">
              <dl className="space-y-4 text-base">
                <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-1 sm:gap-4">
                  <dt className="font-semibold text-gray-900">Algemene Voorwaarden</dt>
                  <dd className="text-gray-600">deze algemene voorwaarden zoals door NursiTree vastgesteld;</dd>
                </div>
                <div className="border-t border-gray-200 pt-4 grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-1 sm:gap-4">
                  <dt className="font-semibold text-gray-900">Diensten</dt>
                  <dd className="text-gray-600">de door NursiTree te verlenen/verleende diensten;</dd>
                </div>
                <div className="border-t border-gray-200 pt-4 grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-1 sm:gap-4">
                  <dt className="font-semibold text-gray-900">NursiTree</dt>
                  <dd className="text-gray-600">NursiTree Holding en/of NursiTree Holland;</dd>
                </div>
                <div className="border-t border-gray-200 pt-4 grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-1 sm:gap-4">
                  <dt className="font-semibold text-gray-900">NursiTree Holding</dt>
                  <dd className="text-gray-600">NursiTree B.V., statutair gevestigd te Ooltgensplaat met het KvK-nummer: 94598770;</dd>
                </div>
                <div className="border-t border-gray-200 pt-4 grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-1 sm:gap-4">
                  <dt className="font-semibold text-gray-900">NursiTree Holland</dt>
                  <dd className="text-gray-600">NursiTree Holland B.V., statutair gevestigd te Ooltgensplaat met het KvK-nummer: 94602859;</dd>
                </div>
                <div className="border-t border-gray-200 pt-4 grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-1 sm:gap-4">
                  <dt className="font-semibold text-gray-900">Offerte</dt>
                  <dd className="text-gray-600">de offerte met daarin het aanbod tot het leveren van Producten en/of het verrichten van Diensten door NursiTree zoals door NursiTree is verstrekt aan de Wederpartij voordat deze door de Wederpartij is geaccepteerd;</dd>
                </div>
                <div className="border-t border-gray-200 pt-4 grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-1 sm:gap-4">
                  <dt className="font-semibold text-gray-900">Overeenkomst</dt>
                  <dd className="text-gray-600">een schriftelijke overeenkomst die tot stand is gekomen tussen NursiTree en de Wederpartij, nadat de Wederpartij de Offerte heeft geaccepteerd;</dd>
                </div>
                <div className="border-t border-gray-200 pt-4 grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-1 sm:gap-4">
                  <dt className="font-semibold text-gray-900">Partijen</dt>
                  <dd className="text-gray-600">NursiTree en de Wederpartij gezamenlijk;</dd>
                </div>
                <div className="border-t border-gray-200 pt-4 grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-1 sm:gap-4">
                  <dt className="font-semibold text-gray-900">Producten</dt>
                  <dd className="text-gray-600">de door NursiTree ontwikkelde producten en te leveren/geleverde producten;</dd>
                </div>
                <div className="border-t border-gray-200 pt-4 grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-1 sm:gap-4">
                  <dt className="font-semibold text-gray-900">Wederpartij</dt>
                  <dd className="text-gray-600">de wederpartij bij een Overeenkomst die optreedt als koper/opdrachtgever.</dd>
                </div>
              </dl>
            </div>
            <p>
              Deze begrippen hebben dezelfde betekenis wanneer deze in het meervoud worden gebruikt.
            </p>

            {/* Artikel 2 */}
            <h2>Artikel 2: Algemeen</h2>
            <ol className="list-decimal pl-6 space-y-3 text-gray-600">
              <li>
                Deze Algemene Voorwaarden zijn van toepassing op alle Overeenkomsten alsmede op de uitvoering daarvan, waarbij NursiTree, optreedt als verkoper/opdrachtnemer/aannemer en de Wederpartij optreedt als koper/opdrachtgever.
              </li>
              <li>
                Deze Algemene Voorwaarden sluiten eventuele door de Wederpartij gehanteerde algemene voorwaarden en/of condities uit, tenzij schriftelijk tussen Partijen anders is overeengekomen.
              </li>
              <li>
                Afwijkingen van en/of aanvullingen op deze Algemene Voorwaarden kunnen slechts worden ingeroepen voor zover deze schriftelijk tussen Partijen zijn overeengekomen.
              </li>
              <li>
                Indien van de onderhavige Algemene Voorwaarden wordt afgeweken, kunnen daaraan door de Wederpartij geen gevolgen worden verbonden, tenzij tussen Partijen schriftelijk anders is overeengekomen.
              </li>
            </ol>

            {/* Artikel 3 */}
            <h2>Artikel 3: Offertes en Overeenkomsten</h2>
            <ol className="list-decimal pl-6 space-y-3 text-gray-600">
              <li>
                Alle Offertes zijn vrijblijvend, tenzij schriftelijk anders is aangegeven.
              </li>
              <li>
                Een Overeenkomst komt tot stand op het moment dat zowel NursiTree als de Wederpartij de Overeenkomst hebben ondertekend waarin NursiTree een opdracht tot het leveren van Producten ontvangt van, dan wel een opdracht ontvangt tot het verlenen van (een) Dienst(en) aan, de Wederpartij.
              </li>
              <li>
                Afspraken en/of overeenkomsten met ondergeschikt personeel van NursiTree zijn slechts bindend voor zover NursiTree deze schriftelijk heeft bevestigd, dan wel indien NursiTree daaraan uitvoering geeft.
              </li>
              <li>
                Eventuele of beweerde onjuistheden in een schriftelijke bevestiging van NursiTree dienen op straffe van verval binnen drie (3) werkdagen na de datum van de bevestiging door de Wederpartij schriftelijk aan NursiTree te worden meegedeeld.
              </li>
            </ol>

            {/* Artikel 4 */}
            <h2>Artikel 4: Eigendomsvoorbehoud</h2>
            <ol className="list-decimal pl-6 space-y-3 text-gray-600">
              <li>
                De door NursiTree geleverde Producten blijven het volledig eigendom van NursiTree, totdat de Wederpartij al hetgeen hij uit de betreffende Overeenkomst of andere Overeenkomsten, (inclusief eventuele rente, boete en kosten) aan NursiTree is verschuldigd, heeft voldaan.
              </li>
              <li>
                De geleverde Producten kunnen, zolang geen volledige betaling heeft plaatsgevonden, te allen tijde door NursiTree worden teruggenomen. De Wederpartij is in dat geval verplicht de Producten terstond, op eerste aanmaning, voor eigen rekening en risico aan NursiTree te retourneren.
              </li>
              <li>
                De Wederpartij is niet gerechtigd op welke wijze dan ook over de Producten te beschikken op een wijze waardoor het hiervoor gemaakte eigendomsvoorbehoud van NursiTree zou worden aangetast.
              </li>
              <li>
                Wederpartij dient de Producten waarop een eigendomsvoorbehoud rust afgescheiden van de overige goederen op te slaan.
              </li>
            </ol>

            {/* Artikel 5 */}
            <h2>Artikel 5: Prijzen</h2>
            <ol className="list-decimal pl-6 space-y-3 text-gray-600">
              <li>
                Indien na het uitbrengen van de Offerte en/of na het tot stand komen van de betreffende Overeenkomst kostprijsbepalende factoren wijzigen, is NursiTree gerechtigd de prijs dienovereenkomstig te wijzigen.
              </li>
              <li>
                Bij levering op een Waddeneiland of buiten Nederland worden aanvullende kosten in rekening gebracht.
              </li>
            </ol>

            {/* Artikel 6 */}
            <h2>Artikel 6: Levering</h2>
            <ol className="list-decimal pl-6 space-y-3 text-gray-600">
              <li>
                Leverdata zijn indicatief en niet bindend.
              </li>
              <li>
                Indien levering uitblijft, dient de Wederpartij NursiTree schriftelijk in gebreke te stellen.
              </li>
              <li>
                NursiTree is nooit schadevergoeding verschuldigd bij vertraging.
              </li>
            </ol>

            {/* Artikel 7 */}
            <h2>Artikel 7: Keuring</h2>
            <p>
              De Wederpartij dient binnen vijf (5) werkdagen na levering de Producten te keuren. Indien de Wederpartij niet binnen deze termijn reclameert, worden de Producten geacht te zijn goedgekeurd.
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

export default AlgemeneVoorwaardenPage;
