import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Shield } from 'lucide-react';
const PrivacyverklaringPage: React.FC = () => {
  return <PageLayout>
      {/* Hero / Header */}
      <section className="bg-gradient-to-b from-[#f0f7eb] to-white py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#6BA539]/10 flex items-center justify-center">
              <Shield className="w-6 h-6 text-[#6BA539]" />
            </div>
            <span className="text-[#6BA539] text-sm font-semibold uppercase tracking-[0.15em]">
              Privacy
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
            Privacyverklaring NursiTree
          </h1>
          <p className="mt-4 text-gray-500 text-base sm:text-lg">Opgesteld op 15-07-2025</p>
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
              <p className="text-gray-600 leading-relaxed mb-4">
                NursiTree B.V. en NursiTree Holland B.V., beide vennootschappen statutair gevestigd te Ooltgensplaat, zijn verantwoordelijk voor het verwerken van persoonlijke data zoals weergegeven in deze privacyverklaring (hierna gezamenlijk te noemen "NursiTree").
              </p>
              <p className="text-gray-600 leading-relaxed">
                De heer A. (Tony) Hoekstra is verantwoordelijk voor de gegevensbescherming van NursiTree. Je kunt hem bereiken via{' '}
                <a href="mailto:tony@nursitree.com" className="text-[#6BA539] font-semibold hover:underline">
                  tony@nursitree.com
                </a>
                .
              </p>
            </div>

            {/* Verwerking persoonlijke data */}
            <h2>Verwerking persoonlijke data</h2>
            <p>
              NursiTree verwerkt persoonlijke data zoals door jou gegenereerd op het moment dat je onze producten afneemt, onze diensten gebruikt of zoals door jou verstrekt. NursiTree verwerkt de volgende persoonlijke data:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 my-6">
              <li>voor- en achternamen;</li>
              <li>bedrijfsgegevens;</li>
              <li>adressen;</li>
              <li>e-mailadressen;</li>
              <li>telefoonnummers; en</li>
              <li>overige persoonlijke data die je aan ons verstrekt of die wij hebben gegenereerd uit de correspondentie met jou.</li>
            </ul>

            {/* Doel */}
            <h2>Doel</h2>
            <p>
              NursiTree verwerkt persoonlijke data, zodat zij je nieuwsbrieven en reclamemateriaal kan sturen. Daarnaast gebruikt zij deze informatie voor het verwerken van jouw betalingen en om haar producten bij je af te leveren. Tot slot verwerkt zij deze informatie, zodat zij (telefonisch) contact met je kan opnemen indien dit noodzakelijk is in verband met haar werkzaamheden.
            </p>

            {/* Duur van de opslag */}
            <h2>Duur van de opslag</h2>
            <p>
              NursiTree behoudt de persoonlijke data slechts zo lang dat strikt noodzakelijk is voor de uitvoering van het doel waarmee zij deze persoonlijke data heeft vergaard, maar in ieder geval niet langer dan één (1) jaar nadat zij de persoonlijke data voor de laatste keer heeft gebruikt/geraadpleegd.
            </p>

            {/* Delen met derden */}
            <h2>Delen met derden</h2>
            <p>
              NursiTree deelt de persoonlijke data slechts met derden in geval dit noodzakelijk is voor de uitvoering van haar werkzaamheden zoals die werkzaamheden zijn vastgesteld in een overeenkomst tussen jou en NursiTree.
            </p>

            {/* Persoonlijke data inzien, aanpassen of verwijderen */}
            <h2>Persoonlijke data inzien, aanpassen of verwijderen</h2>
            <p>
              Je hebt te allen tijde het recht om jouw persoonlijke data in te zien, aan te passen of te verwijderen. Ook heb je te allen tijde het recht jouw gegeven toestemming voor de dataverwerking in te trekken of om bezwaar te maken tegen de dataverzameling. Concreet betekent dit dat je NursiTree kunt verzoeken de door NursiTree verzamelde persoonlijke data over jou aan jou toe te sturen. NursiTree zal naar aanleiding van een dergelijke instructie zo snel mogelijk gehoor geven aan jouw verzoek. Dit verzoek kan worden ingediend bij de heer A. Hoekstra. De heer A. Hoekstra zal vervolgens contact met je opnemen, zodat dit verzoek op veilige wijze kan worden afgehandeld.
            </p>
            <p>
              Om er zeker van te zijn dat het verzoek tot inzage door jou is gedaan, vragen wij een kopie van jouw identiteitsbewijs met het verzoek mee te sturen. Maak in deze kopie jouw pasfoto, MRZ (machine readable zone, de strook met nummers onderaan het paspoort), paspoortnummer en Burgerservicenummer (BSN) zwart. Dit ter bescherming van jouw privacy. We reageren zo snel mogelijk, maar in ieder geval binnen vier (4) weken, op jouw verzoek.
            </p>

            {/* Gebruik van cookies */}
            <h2>Gebruik van cookies</h2>
            <p>
              NursiTree gebruikt slechts technische, functionele en analytische cookies die geen inbreuk maken op jouw privacy. Een cookie is een tekstbestand dat op jouw computer, tablet of smartphone wordt geplaatst op het moment dat je de website van NursiTree bezoekt. Deze cookies zijn noodzakelijk voor het functioneren van de website. Het is echter mogelijk bepaalde cookies uit te sluiten via de instellingen van jouw internetbrowser. Het is daarnaast ook mogelijk alle informatie te verwijderen die bij eerdere bezoeken aan de website zijn verzameld.
            </p>

            {/* Bijzondere en/of gevoelige persoonsgegevens */}
            <h2>Bijzondere en/of gevoelige persoonsgegevens</h2>
            <p>
              Het is niet de bedoeling dat onze website en/of overige diensten data verzamelt van websitebezoekers onder de 16 jaar oud, tenzij hiervoor toestemming is gegeven door een ouder of voogd. NursiTree kan echter niet nagaan of een dergelijke bezoeker onder de 16 jaar oud is. NursiTree moedigt daarom ouders aan betrokken te zijn bij de onlineactiviteiten van hun kinderen om te voorkomen dat persoonlijke informatie over hun kinderen wordt verzameld.
            </p>
            <p>
              Mocht je overtuigd zijn dat NursiTree onverhoopt toch persoonlijke data heeft verzameld van iemand onder de 16 jaar oud, zonder dat daarvoor toestemming door de voogd of ouder is verleend, kan je contact opnemen met de heer A. Hoekstra. NursiTree zal de betreffende persoonlijke data vervolgens zo snel mogelijk verwijderen.
            </p>

            {/* Autoriteit Persoonsgegevens */}
            <h2>Autoriteit Persoonsgegevens</h2>
            <p>
              Je hebt te allen tijde het recht om een klacht in te dienen bij de Autoriteit Persoonsgegevens, de toezichthoudende autoriteit op het gebied van privacybescherming.
            </p>

            {/* Beveiliging */}
            <h2>Beveiliging</h2>
            <p>
              NursiTree neemt de bescherming van jouw gegevens serieus en neemt passende maatregelen om misbruik, verlies, onbevoegde toegang, ongewenste openbaarmaking en ongeoorloofde wijziging tegen te gaan. Als je de indruk hebt dat jouw gegevens niet goed beveiligd zijn of er aanwijzingen zijn van misbruik, neem dan contact op via{' '}
              <a href="mailto:tony@nursitree.com" className="text-[#6BA539] font-semibold hover:underline">
                tony@nursitree.com
              </a>
              .
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
          <button onClick={() => window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })} className="text-sm text-[#6BA539] font-semibold hover:underline transition-colors">
            Terug naar boven
          </button>
        </div>
      </section>
    </PageLayout>;
};
export default PrivacyverklaringPage;