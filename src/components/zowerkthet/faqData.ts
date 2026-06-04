export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * FAQ content shown on /zo-werkt-het (ZwhFaq) and used to emit FAQPage
 * structured data on that page (see src/pages/ZoWerktHetPage.tsx).
 * Single source of truth — keep these in sync with the on-page copy.
 */
export const faqs: FaqItem[] = [{
  question: 'Wat zijn de afdekmogelijkheden?',
  answer: 'De bovenzijde van BRENT kan volledig worden afgedekt met diverse materialen: bestrating, tegels, half-verharding of groen. Dit maakt volledige integratie in het bestaande maaiveld mogelijk, ongeacht het straatprofiel. Meerdere combinaties zijn mogelijk, waardoor het systeem flexibel inzetbaar is in elk stedelijk ontwerp.'
}, {
  question: 'Hoe werkt de verplanting en wat is het boomkroonvolume?',
  answer: 'BRENT is ontworpen met verplanting als kernprincipe. Bomen groeien in een gecontroleerde omgeving tot het optimale verplantmoment. Het boomkroonvolume is afhankelijk van de boomsoort, maar door de 7 m³ substraat en het geïntegreerde watersysteem bereiken bomen een aanzienlijk kroonvolume binnen 15 tot 20 jaar. Bij verplanting blijft de wortelkluit intact, wat de overlevingskans sterk vergroot.'
}, {
  question: 'Hoe groot is de bak precies?',
  answer: 'De standaardafmetingen van BRENT zijn 2,50 x 3,30 meter met een hoogte van 1,30 meter. Deze maten zijn bewust gekozen om naadloos te passen binnen de gebruikelijke maatvoering van parkeervakken. De bak bevat 7 m³ substraat en een waterreservoir van 1.200 liter.'
}, {
  question: 'Is BRENT geschikt voor zettingsgevoelig gebied?',
  answer: 'Ja. De constructie van BRENT is zelfdragend en verdeelt het gewicht gelijkmatig. Hierdoor is het systeem ook geschikt voor zettingsgevoelige gebieden. De robuuste betonconstructie voorkomt vervorming en garandeert stabiliteit, zelfs bij wisselende bodemcondities.'
}, {
  question: 'Hoe zit het met de wortelecologie?',
  answer: 'De wortelecologie is een kernonderdeel van het ontwerp. De bomengrond in BRENT heeft een hoog organische stofgehalte, wat zorgt voor een gezond bodemleven en optimale wortelgroei. De wortels worden volledig gescheiden van kabels en leidingen door een robuuste barrière. Dit voorkomt wortelschade aan infrastructuur én beschermt de boom tegen verstoring.'
}, {
  question: 'Hoe wordt de waterbalans geregeld?',
  answer: 'Het geïntegreerde waterreservoir van 1.200 liter is voldoende voor een droogteperiode van circa 20 dagen. De watergift wordt gereguleerd via een extern vlottersysteem. Capillair materiaal geeft vocht geleidelijk af aan de wortelkluit, terwijl overtollig regenwater wordt afgevoerd naar de omliggende bodem of het regenwaterriool. Dit mechanische systeem werkt volledig zonder elektriciteit of digitale aansturing.'
}, {
  question: 'Welk type beton wordt gebruikt?',
  answer: 'BRENT wordt vervaardigd uit hoogwaardig gewapend beton dat voldoet aan de strengste normen voor stedelijke toepassingen. De betonkeuze is geoptimaliseerd voor duurzaamheid, weerbestendigheid en draagkracht. Het beton is bestand tegen vorst, zouten en de belasting van zwaar verkeer, waardoor het systeem decennialang meegaat zonder onderhoud.'
}];
