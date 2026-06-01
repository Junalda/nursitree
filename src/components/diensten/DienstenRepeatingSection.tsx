import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TreePine, HelpCircle, TrendingUp, Recycle, Award } from 'lucide-react';


interface DienstenRepeatingSectionProps {
  index: number;
}

const DienstenRepeatingSection: React.FC<DienstenRepeatingSectionProps> = ({ index }) => {
  /* Alternate bg colors for visual separation between the 5 copies */
  const bgColors = ['bg-white', 'bg-gray-50', 'bg-white', 'bg-gray-50', 'bg-white'];
  const bg = bgColors[index % bgColors.length];

  return (
    <section className={`${bg}`}>

      {/* ── Sub-section A: Hero / Intro ── */}
      <div className="py-16 sm:py-24 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#E8854A]/10 text-[#E8854A] text-xs sm:text-sm font-medium mb-6 sm:mb-8 border border-[#E8854A]/15">
              <TreePine className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Diensten
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.08] tracking-tight mb-6 sm:mb-8 text-left">
              Wij vinden altijd ruimte voor{' '}
              <span className="text-[#E8854A]">meer groen</span>
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-gray-500 leading-relaxed text-left">
              Meer bomen en verbeterde leefbaarheid voor bewoners, vandaag én in de toekomst. Daar zorgen we voor, samen met projectontwikkelaars, beheerders, projectleiders en iedereen die meer groen in de stad wil. Zonder dat de bomen overlast veroorzaken of dit ten koste gaat van andere faciliteiten die snel groeiende steden nodig hebben.
            </p>
          </div>
        </div>
      </div>

      {/* ── Sub-section B: Hoe houden we steden leefbaar? ── */}
      <div className={`py-16 sm:py-24 lg:py-28 ${bg === 'bg-white' ? 'bg-gray-50' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10 sm:mb-14">
            <span className="text-[#E8854A] text-sm font-semibold uppercase tracking-wider">De uitdaging</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-5 mb-8 leading-tight tracking-tight text-left">
              Hoe houden we steden leefbaar?
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <div className="space-y-6 text-left">
              <p className="text-lg text-gray-500 leading-relaxed">
                De stad groeit! Dat betekent: meer inwoners, meer wensen en hogere eisen. Er zijn zo'n tien ruimteclaims per vierkante meter in de stad, want we zoeken ruimte om te wonen, te parkeren en elkaar te ontmoeten.
              </p>

              <p className="text-lg text-gray-500 leading-relaxed">
                En wat dacht je van alle kabels die we nodig hebben voor snel internet, tv en de energietransitie? Maar de maatschappij vraagt ook om een antwoord op klimaatverandering. Voor een gezonde en veilige toekomst, zijn er bomen nodig met veel boomkroonvolume.
              </p>

              <p className="text-lg text-gray-500 leading-relaxed">
                De ruimtepuzzel wordt zo voor iedereen die zich met inrichting van de openbare ruimte bezighoudt steeds ingewikkelder. Ambitieuze doelstellingen van bovenaf, ingewikkelde regelgeving, verschillende belangen, knopen worden niet doorgehakt, projecten die duurder worden en trager verlopen.
              </p>
            </div>

            <div>
              <div className={`rounded-2xl p-8 sm:p-10 border border-gray-100 shadow-sm ${bg === 'bg-white' ? 'bg-white' : 'bg-gray-50'}`}>
                <p className="text-lg text-gray-600 leading-relaxed mb-6 text-left">
                  Als werkvoorbereider, projectleider, aannemer, projectontwikkelaar of boombeheerder sta je voor een enorme uitdaging.
                </p>

                <div className="border-l-4 border-[#E8854A] pl-6">
                  <p className="text-lg text-gray-700 leading-relaxed font-medium text-left">
                    Bij NursiTree hebben we daar een oplossing voor bedacht. Een die zowel doelstellingen behalen als projecten uitvoeren makkelijker maakt. Zodat je écht iets kunt bijdragen aan de toekomstige generatie.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Sub-section C: De stad als boomkwekerij ── */}
      <div className={`py-16 sm:py-24 lg:py-28 ${bg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto lg:mx-0">
            <span className="text-[#6BA539] text-sm font-semibold uppercase tracking-wider">Onze aanpak</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-5 mb-8 leading-tight tracking-tight text-left">
              De stad als boomkwekerij
            </h2>

            <div className="space-y-6 text-left">
              <p className="text-lg text-gray-500 leading-relaxed">
                De dynamiek van de stad zorgt ervoor dat het inrichten van de openbare ruimte bijna om een glazen bol vraagt, wil je dit zo efficiënt mogelijk doen zonder publiek geld te verspillen aan dingen die een paar decennia later weer tegen de grond gaan.
              </p>

              <p className="text-lg text-gray-600 leading-relaxed font-medium">
                Bij NursiTree maken we dat werk graag makkelijker.
              </p>

              <p className="text-lg text-gray-500 leading-relaxed">
                Door flexibele bomen aan te leveren, die we plaatsen in door ons ontwikkelde en gepatenteerde Urban Tree Pits. Zo bieden de bomen wel alle voordelen, maar nemen ze minder ruimte in, zitten ze andere faciliteiten onder de grond niet in de weg én ben je de investering niet kwijt als de boom na een aantal jaar te groot wordt en moet verplaatsen.
              </p>

              <p className="text-lg text-gray-600 leading-relaxed font-medium">
                Want dat kan dankzij de Urban Tree Pit gewoon.
              </p>

              <p className="text-lg text-gray-500 leading-relaxed">
                We noemen het een kweekvijver in de stad. De bomen groeien gezond op én bewegen letterlijk mee met nieuwe ontwikkelingen als de dynamiek van de stad daarom vraagt.
              </p>
            </div>

            <div className="mt-10">
              <Link to="/#contact-section" className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#E8854A] text-white text-sm sm:text-base font-semibold rounded-xl hover:bg-[#D27337] transition-all duration-200 shadow-lg hover:shadow-xl">
                Plan een kennismaking in
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Sub-section D: Dit is wat we doen ── */}
      <div className={`py-16 sm:py-24 lg:py-28 ${bg === 'bg-white' ? 'bg-gray-50' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10 sm:mb-14">
            <span className="text-[#E8854A] text-sm font-semibold uppercase tracking-wider">Onze diensten</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-5 mb-6 leading-tight tracking-tight text-left">
              Dit is wat we doen
            </h2>
            <p className="text-lg text-gray-500 leading-relaxed text-left">
              Wij zijn dé leverancier van slimme groeiplaatsen voor bomen in de stad. In aanvulling daarop bieden we een aantal ondersteuningsdiensten aan. Welke jullie hiervan precies afnemen, hangt af van de huidige situatie en beschikbare voorzieningen. Dit is dus altijd maatwerk.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10">
            {[
              {
                title: 'Advies & engineering',
                image: 'https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1778226586728_ae9224ba.jpeg',
                objectPosition: 'center',
              },
              {
                title: 'Installatie',
                image: 'https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1778226584278_74ee47e5.jpg',
                objectPosition: 'center',
              },
              {
                title: 'Aanplant & nazorg',
                image: 'https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1778226588093_47de3a6c.jpg',
                objectPosition: 'center',
              },
              {
                title: 'Verplaatsen en verplanten',
                image: 'https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1778226588878_9fbf1d93.jpg',
                objectPosition: 'center',
              },
            ].map((service) => (

              <div
                key={service.title}
                className={`rounded-xl overflow-hidden border border-gray-100 ${bg === 'bg-white' ? 'bg-white' : 'bg-gray-50'} hover:border-[#E8854A]/20 hover:shadow-md transition-all duration-300 flex flex-col`}
              >
                <div className="w-full overflow-hidden bg-gray-100 aspect-[4/3]">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: service.objectPosition }}
                    loading="lazy"
                  />
                </div>

                <div className="p-6">
                  <span className="text-gray-900 font-semibold text-left block">{service.title}</span>
                </div>
              </div>
            ))}
          </div>







          <Link to="/#contact-section" className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#E8854A] text-white text-sm sm:text-base font-semibold rounded-xl hover:bg-[#D27337] transition-all duration-200 shadow-lg hover:shadow-xl">

            Maak een afspraak
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </Link>
        </div>
      </div>

      {/* ── Sub-section E: Waarom kiezen voor de Urban Tree Pits? ── */}
      <div className={`py-16 sm:py-24 lg:py-28 ${bg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-10 sm:mb-14 leading-tight tracking-tight text-left">
            Waarom kiezen voor de Urban Tree Pits?
          </h2>

          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
            {[
              { label: 'Slim en herbruikbaar ontwerp', icon: Recycle },
              { label: 'Eenvoudig te verplanten', icon: TrendingUp },
              { label: 'Circulair concept', icon: Award },
            ].map((item) => (
              <div key={item.label} className={`rounded-2xl p-8 sm:p-10 border border-gray-100 ${bg === 'bg-white' ? 'bg-gray-50' : 'bg-white'} text-left`}>
                <div className="w-12 h-12 rounded-xl bg-[#6BA539]/10 flex items-center justify-center mb-5">
                  <item.icon className="w-6 h-6 text-[#6BA539]" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{item.label}</h3>
              </div>
            ))}
          </div>

          <div className="space-y-12 sm:space-y-16">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 text-left">
                Vijf voordelen van vergroenen met de Urban Tree Pit
              </h3>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 text-left">
                Hoe verdien je de investering terug?
              </h3>
            </div>
          </div>

          <div className="mt-12 sm:mt-16">
            <Link to="/#contact-section" className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#E8854A] text-white text-sm sm:text-base font-semibold rounded-xl hover:bg-[#D27337] transition-all duration-200 shadow-lg hover:shadow-xl">
              Nodig ons vandaag uit
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Sub-section F: NursiTree slogan ── */}
      <div className={`py-16 sm:py-24 lg:py-28 ${bg === 'bg-white' ? 'bg-gray-50' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight text-left">
              NursiTree bedenkt slimme oplossingen voor de buitenruimte van morgen
            </h2>
          </div>
        </div>
      </div>

      {/* ── Sub-section G: Veelgestelde vragen ── */}
      <div className={`py-16 sm:py-24 lg:py-28 ${bg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-[#E8854A]/10 flex items-center justify-center">
              <HelpCircle className="w-6 h-6 text-[#E8854A]" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight tracking-tight text-left">
              Veelgestelde vragen
            </h2>
          </div>
        </div>
      </div>

    </section>
  );
};

export default DienstenRepeatingSection;
