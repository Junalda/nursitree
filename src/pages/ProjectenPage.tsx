import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, ChevronDown, ChevronLeft, ChevronRight, ListFilter, MapPin, Quote } from 'lucide-react';

import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';

/* ─── Canonical tag set — used across Homepage & Projecten page ─── */
/* Tags are sorted alphabetically (Dutch locale) for a clean, scannable filter list. */
const ALL_TAGS = ['Archeologie', 'Bedrijventerreinen', 'Biodiversiteit', 'Hittestress', 'Hoog grondwater', 'Kabels en leidingen', 'Parkeerdruk', 'Smalle woonstraten', 'Sportvelden', 'Wateroverlast'] as const;
const filterOptions = ['Alle', ...ALL_TAGS];


/* ─── Curated visual storytelling gallery for the Apeldoorn featured project ───
   IMPORTANT: This array is FULLY INDEPENDENT — declared as its own const,
   never spread, never shared with other galleries, never used as a fallback.
   The HERO/MAIN result image is intentionally OMITTED from the carousel:
   it already appears as the card thumbnail above, so we never repeat it
   inside the carousel/gallery (no duplicate "main image" across projects).

   Storytelling order (4 unique additional images, NOT the hero):
     1) CONTEXT     — parking pressure / cables & leidingen / hoog grondwater
     2) SOLUTION    — Urban Tree Pit being installed (crane lowering reservoir)
     3) DETAIL      — close-up of the Urban Tree Pit cover & technical detail
     4) ENVIRONMENT — wider urban context (shopping centre, neighbourhood)
   SEO: each image has descriptive alt text reinforcing the keywords
   "Urban Tree Pit", "Apeldoorn", "parkeerdruk", "stedelijke vergroening".
   Performance: <img loading="lazy" decoding="async"> so images only load
   when the dropdown opens / they enter the viewport.
*/
const APELDOORN_GALLERY: { src: string; alt: string; caption: string }[] = [
  // NOTE: hero image (1777959595010_9e4867ec.jpeg — eindresultaat met geplante
  // boom in het parkeerterrein) is intentionally omitted here. It already
  // appears prominently on the card / above-the-fold area, so we don't repeat
  // it inside the carousel.
  {
    src: 'https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1777959600604_854c41c1.JPG',
    alt: 'Uitdagende ondergrond bij Edisonlaan Apeldoorn met kabels, leidingen en hoog grondwater — context voor de Urban Tree Pit oplossing',
    caption: 'Context — kabels, leidingen en hoog grondwater maakten een traditionele groeiplaats onmogelijk',
  },
  {
    src: 'https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1777959601439_0ec91b64.JPG',
    alt: 'BRENT Urban Tree Pit reservoir wordt met een kraan in de bouwput geplaatst aan de Edisonlaan in Apeldoorn',
    caption: 'Oplossing — het BRENT Urban Tree Pit reservoir wordt op zijn plek gehesen',
  },
  {
    src: 'https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1777959601907_da3b5914.JPG',
    alt: 'Detail van de Urban Tree Pit met afdekking Full en aansluitingen voor watertoevoer in Apeldoorn',
    caption: 'Detail — afdekking ‘Full’ en aansluitingen voor het watermanagement',
  },
  {
    src: 'https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1777959602463_d0d6f48d.jpeg',
    alt: 'Urban Tree Pit toegepast in parkeergebied Edisonlaan Apeldoorn met hoge parkeerdruk bij winkelcentrum Nettorama',
    caption: 'Omgeving — stedelijke context bij het winkelcentrum, met hoge parkeerdruk',
  },
];


/* ─── Lightweight, modern image carousel for the Apeldoorn dropdown ───
   • Renders only when the dropdown is open (lazy mounting)
   • Images use loading="lazy" + decoding="async" for fast loads
   • Keyboard, dot and arrow navigation
   • Premium feel: rounded, soft shadow, smooth transitions
*/
const ApeldoornGallery: React.FC = () => {
  const [index, setIndex] = useState(0);
  const total = APELDOORN_GALLERY.length;
  const go = (i: number) => setIndex((i + total) % total);

  return (
    <figure className="not-prose mb-2">
      <div className="relative w-full overflow-hidden rounded-2xl bg-gray-100 shadow-sm border border-gray-100">
        {/* Slides */}
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {APELDOORN_GALLERY.map((img) => (
            <div key={img.src} className="relative w-full flex-shrink-0 aspect-[16/10] sm:aspect-[16/9]">
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          ))}
        </div>


        {/* Counter */}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/55 text-white text-xs font-medium backdrop-blur-sm">
          {index + 1} / {total}
        </div>

        {/* Arrows */}
        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Vorige afbeelding"
          className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/85 hover:bg-white text-gray-800 shadow-md backdrop-blur transition"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Volgende afbeelding"
          className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/85 hover:bg-white text-gray-800 shadow-md backdrop-blur transition"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Dots — clean modern pagination dots
            Mobile portrait shows perfectly circular 8×8 dots (active = 18×8)
            with consistent gap, fixing any stretched/pill distortion.
            CRITICAL FIX: index.css applies a global `min-height: 44px` to all
            buttons under 640px (for tap-target accessibility on real buttons).
            That rule was stretching these pagination dots into 8×44 vertical
            pill bars on mobile portrait. We override it ONLY here with
            `!min-h-0` so the dots stay perfectly circular (8×8) without
            affecting the accessibility rule on any other button. */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
          {APELDOORN_GALLERY.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`Ga naar afbeelding ${i + 1}`}
              className={`flex-shrink-0 !min-h-0 h-2 p-0 rounded-full transition-all duration-300 ${
                i === index ? 'w-[18px] bg-white' : 'w-2 bg-white/60 hover:bg-white/90'
              }`}
            />
          ))}
        </div>


      </div>
      <figcaption className="mt-3 text-sm text-gray-500 text-center italic">
        {APELDOORN_GALLERY[index].caption}
      </figcaption>
    </figure>
  );
};


/* ─── Curated visual storytelling gallery for the Ooltgensplaat pilot ───
   IMPORTANT: This array is FULLY INDEPENDENT — declared as its own const,
   never spread, never shared with other galleries, never used as a fallback.
   The HERO/MAIN result image is intentionally OMITTED from the carousel:
   it already appears as the card thumbnail above, so we never repeat it
   inside the carousel/gallery (no duplicate "main image" across projects).

   Storytelling order (4 unique additional images, NOT the hero):
     1) CONTEXT    — locatie / proefopstelling situatie
     2) SOLUTION   — Urban Tree Pit installatie (kraan plaatst betonnen bak)
     3) TECHNICAL  — sensor / watermanagement / systeemdetail
     4) VARIATION  — verschillende hoogtes / integratie / plantvakken
   SEO: descriptive Dutch alt text reinforcing the keywords
        "Urban Tree Pit", "Ooltgensplaat", "proefopstelling",
        "waterhuishouding", "groeimetingen".
   Performance: <img loading="lazy" decoding="async">; the gallery is
   only mounted when the dropdown opens, so nothing is fetched before.
*/
const OOLTGENSPLAAT_GALLERY: { src: string; alt: string; caption: string }[] = [
  // NOTE: hero image (1777960246168_7b9765be.jpeg — overzicht pilotopstelling
  // bij zonsondergang) is intentionally omitted here. It already appears as
  // the main thumbnail on the Ooltgensplaat project card, so we don't repeat
  // it inside the carousel.
  {
    src: 'https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1777960247379_53c751d9.JPG',
    alt: 'Proeflocatie Urban Tree Pit Ooltgensplaat met uitgegraven bouwput en mobiele kraan op het eigen terrein van NursiTree',
    caption: 'Context — eigen proeflocatie in Ooltgensplaat, klaar voor installatie',
  },
  {
    src: 'https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1777960243247_f186b480.jpeg',
    alt: 'Installatie van de Urban Tree Pit in Ooltgensplaat: betonnen waterreservoir wordt met een kraan in de bouwput geplaatst',
    caption: 'Oplossing — de Urban Tree Pit wordt op zijn plek gehesen',
  },
  {
    src: 'https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1777960245743_dcb7b4b1.jpeg',
    alt: 'Technisch detail van de Urban Tree Pit in Ooltgensplaat met aansluitingen voor waterhuishouding, overstort en sensor voor groeimetingen',
    caption: 'Techniek — aansluitingen voor watermanagement en sensor voor groeimetingen',
  },
  {
    src: 'https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1777960247964_2e878a47.jpeg',
    alt: 'Variatie in de pilotopstelling Ooltgensplaat: Urban Tree Pits in verschillende hoogtes en integraties met plantvakken en onderbeplanting',
    caption: 'Variatie — verschillende hoogtes en integraties met plantvakken en onderbeplanting',
  },
];


/* ─── Lightweight, modern image carousel for the Ooltgensplaat dropdown ─── */
const OoltgensplaatGallery: React.FC = () => {
  const [index, setIndex] = useState(0);
  const total = OOLTGENSPLAAT_GALLERY.length;
  const go = (i: number) => setIndex((i + total) % total);

  return (
    <figure className="not-prose mb-2">
      <div className="relative w-full overflow-hidden rounded-2xl bg-gray-100 shadow-sm border border-gray-100">
        {/* Slides */}
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {OOLTGENSPLAAT_GALLERY.map((img) => (
            <div key={img.src} className="relative w-full flex-shrink-0 aspect-[16/10] sm:aspect-[16/9]">
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Counter */}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/55 text-white text-xs font-medium backdrop-blur-sm">
          {index + 1} / {total}
        </div>

        {/* Arrows */}
        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Vorige afbeelding"
          className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/85 hover:bg-white text-gray-800 shadow-md backdrop-blur transition"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Volgende afbeelding"
          className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/85 hover:bg-white text-gray-800 shadow-md backdrop-blur transition"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Dots — clean modern pagination dots (8×8, active = 18×8).
            !min-h-0 overrides the global mobile `min-height: 44px` rule
            in index.css that was stretching dots into vertical pill bars
            on mobile portrait. */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
          {OOLTGENSPLAAT_GALLERY.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`Ga naar afbeelding ${i + 1}`}
              className={`flex-shrink-0 !min-h-0 h-2 p-0 rounded-full transition-all duration-300 ${
                i === index ? 'w-[18px] bg-white' : 'w-2 bg-white/60 hover:bg-white/90'
              }`}
            />
          ))}
        </div>


      </div>
      <figcaption className="mt-3 text-sm text-gray-500 text-center italic">
        {OOLTGENSPLAAT_GALLERY[index].caption}
      </figcaption>
    </figure>
  );
};


/* ─── Curated visual storytelling gallery for the Rosmalen / Achter de Driesprong project ───
   IMPORTANT: This array is FULLY INDEPENDENT — declared as its own const,
   never spread, never shared with other galleries, never used as a fallback.
   The HERO/MAIN result image is intentionally OMITTED from the carousel:
   it already appears as the card thumbnail above, so we never repeat it
   inside the carousel/gallery (no duplicate "main image" across projects).

   Storytelling order (4 unique additional images, NOT the hero):
     1) CONTEXT     — beperkte plantvak / bestrating / marktlocatie context
     2) SOLUTION    — Urban Tree Pit wordt geplaatst (kraan + betonbak)
     3) TECHNICAL   — detail van kabels en leidingen + waterreservoir / aansluiting
     4) INTEGRATION — boom geplant in Urban Tree Pit binnen winkelgebied + bestrating
   SEO: descriptive Dutch alt text reinforcing the keywords
        "Urban Tree Pit", "Rosmalen", "kabels en leidingen",
        "wateroverlast", "stedelijke vergroening".
   Performance: <img loading="lazy" decoding="async">; the gallery is
   only mounted when the dropdown opens, so nothing is fetched before.
*/
const ROSMALEN_GALLERY: { src: string; alt: string; caption: string }[] = [
  // NOTE: hero image (1777960636618_e1a1421d.JPG — eindresultaat met geplante
  // boom in het winkelgebied) is intentionally omitted here. It already
  // appears as the main thumbnail on the Rosmalen project card, so we don't
  // repeat it inside the carousel.
  {
    src: 'https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1777960635362_bbe882bf.JPG',
    alt: 'Beperkt bestaand plantvak in de bestrating van het winkelgebied Rosmalen, met markeringen voor kabels en leidingen — context voor de Urban Tree Pit oplossing',
    caption: 'Context — beperkte plantruimte in de bestrating van het winkelgebied en marktterrein',
  },
  {
    src: 'https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1777960638632_5c01fb05.JPG',
    alt: 'BRENT Urban Tree Pit waterreservoir wordt met een kraan in de bouwput geplaatst in het winkelgebied Achter de Driesprong in Rosmalen',
    caption: 'Oplossing — het BRENT Urban Tree Pit reservoir wordt op zijn plek gehesen',
  },
  {
    src: 'https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1777960637699_30c20aa8.JPG',
    alt: 'Technisch detail in Rosmalen: betonnen wand van de Urban Tree Pit naast de uitgegraven bouwput met kabels en leidingen en aansluiting voor watermanagement',
    caption: 'Techniek — passend tussen kabels en leidingen, met geïntegreerd watermanagement',
  },
  {
    src: 'https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1777960639478_d224b3fe.jpg',
    alt: 'Boom geplant in de BRENT Urban Tree Pit in winkelgebied Rosmalen, met integratie tussen marktterrein en bestrating en herplaatsing van de straatklinkers',
    caption: 'Integratie — boom, marktterrein en bestrating komen naadloos samen',
  },
];


/* ─── Lightweight, modern image carousel for the Rosmalen dropdown ─── */
const RosmalenGallery: React.FC = () => {
  const [index, setIndex] = useState(0);
  const total = ROSMALEN_GALLERY.length;
  const go = (i: number) => setIndex((i + total) % total);

  return (
    <figure className="not-prose mb-2">
      <div className="relative w-full overflow-hidden rounded-2xl bg-gray-100 shadow-sm border border-gray-100">
        {/* Slides */}
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {ROSMALEN_GALLERY.map((img) => (
            <div key={img.src} className="relative w-full flex-shrink-0 aspect-[16/10] sm:aspect-[16/9]">
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Counter */}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/55 text-white text-xs font-medium backdrop-blur-sm">
          {index + 1} / {total}
        </div>

        {/* Arrows */}
        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Vorige afbeelding"
          className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/85 hover:bg-white text-gray-800 shadow-md backdrop-blur transition"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Volgende afbeelding"
          className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/85 hover:bg-white text-gray-800 shadow-md backdrop-blur transition"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Dots — clean modern pagination dots (8×8, active = 18×8).
            !min-h-0 overrides the global mobile `min-height: 44px` rule
            in index.css that was stretching dots into vertical pill bars
            on mobile portrait. */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
          {ROSMALEN_GALLERY.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`Ga naar afbeelding ${i + 1}`}
              className={`flex-shrink-0 !min-h-0 h-2 p-0 rounded-full transition-all duration-300 ${
                i === index ? 'w-[18px] bg-white' : 'w-2 bg-white/60 hover:bg-white/90'
              }`}
            />
          ))}
        </div>


      </div>
      <figcaption className="mt-3 text-sm text-gray-500 text-center italic">
        {ROSMALEN_GALLERY[index].caption}
      </figcaption>
    </figure>
  );
};


/* ─── Curated visual storytelling gallery for the Sportpark DRL Rotterdam project ───
   Max 5 images, strict storytelling order:
     1) HERO        — eindresultaat: bloeiende tulpen + bomen in Urban Tree Pits langs het sportveld
     2) CONTEXT     — sportpark met kraan, installatie-omgeving
     3) SOLUTION    — Urban Tree Pit (BETCA prefab beton) wordt gehesen in de sleuf
     4) TECHNICAL   — werkers plaatsen Urban Tree Pits naast het kunstgrasveld
     5) INTEGRATION — geplaatste Urban Tree Pits met bomen, klaar voor bloei
   SEO: Dutch alt text reinforcing the keywords
        "Urban Tree Pit", "Sportpark DRL Rotterdam", "kunstgras",
        "hittestress", "biodiversiteit", "herplantplicht".
   Performance: <img loading="lazy" decoding="async">; the gallery is
   only mounted when the dropdown opens, so nothing is fetched before.
   IMPORTANT: This gallery uses ONLY the images provided for the DRL
   Rotterdam project — fully independent from any other project.
*/
const SPORTPARK_DRL_GALLERY: { src: string; alt: string; caption: string }[] = [
  // NOTE: The hero image (1777960991914_9abaedce.jpeg — bloeiende tulpen langs
  // het kunstgrasveld) is intentionally omitted here. It already appears as the
  // main thumbnail on the Sportpark DRL project card, so we don't repeat it in
  // the carousel/gallery to avoid showing the same image twice.
  {
    src: 'https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1777960994594_a441cf4f.JPG',
    alt: 'Installatie van Urban Tree Pits op Sportpark DRL Rotterdam: gele mobiele kraan op het kunstgrasveld tijdens de plaatsing',
    caption: 'Context — kraan op het sportpark voor de installatie van de Urban Tree Pits',
  },
  {
    src: 'https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1777960995415_9f6e6fd0.JPG',
    alt: 'BRENT Urban Tree Pit (BETCA prefab beton) wordt met een kraan in de uitgegraven sleuf gehesen op Sportpark DRL Rotterdam',
    caption: 'Oplossing — de prefab betonnen Urban Tree Pit wordt op zijn plek gehesen',
  },
  {
    src: 'https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1777960996024_ba5ceb7c.JPG',
    alt: 'Werkers in oranje veiligheidskleding plaatsen Urban Tree Pits op het tussenpad naast het kunstgrasveld van Sportpark DRL Rotterdam',
    caption: 'Techniek — werkers plaatsen de Urban Tree Pits op het tussenpad',
  },
  {
    src: 'https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1777960993068_e91be624.jpg',
    alt: 'Geplaatste Urban Tree Pits met aangeplante bomen langs het kunstgrasveld op Sportpark DRL Rotterdam, klaar voor de eerste bloei in het voorjaar',
    caption: 'Integratie — Urban Tree Pits met bomen langs het sportveld, klaar voor het voorjaar',
  },
];



/* ─── Lightweight, modern image carousel for the Sportpark DRL Rotterdam dropdown ─── */
const SportparkDRLGallery: React.FC = () => {
  const [index, setIndex] = useState(0);
  const total = SPORTPARK_DRL_GALLERY.length;
  const go = (i: number) => setIndex((i + total) % total);

  return (
    <figure className="not-prose mb-2">
      <div className="relative w-full overflow-hidden rounded-2xl bg-gray-100 shadow-sm border border-gray-100">
        {/* Slides */}
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {SPORTPARK_DRL_GALLERY.map((img) => (
            <div key={img.src} className="relative w-full flex-shrink-0 aspect-[16/10] sm:aspect-[16/9]">
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Counter */}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/55 text-white text-xs font-medium backdrop-blur-sm">
          {index + 1} / {total}
        </div>

        {/* Arrows */}
        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Vorige afbeelding"
          className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/85 hover:bg-white text-gray-800 shadow-md backdrop-blur transition"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Volgende afbeelding"
          className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/85 hover:bg-white text-gray-800 shadow-md backdrop-blur transition"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Dots — clean modern pagination dots (8×8, active = 18×8).
            !min-h-0 overrides the global mobile `min-height: 44px` rule
            in index.css that was stretching dots into vertical pill bars
            on mobile portrait. */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
          {SPORTPARK_DRL_GALLERY.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`Ga naar afbeelding ${i + 1}`}
              className={`flex-shrink-0 !min-h-0 h-2 p-0 rounded-full transition-all duration-300 ${
                i === index ? 'w-[18px] bg-white' : 'w-2 bg-white/60 hover:bg-white/90'
              }`}
            />
          ))}
        </div>


      </div>
      <figcaption className="mt-3 text-sm text-gray-500 text-center italic">
        {SPORTPARK_DRL_GALLERY[index].caption}
      </figcaption>
    </figure>
  );
};



/* ─── Curated visual storytelling gallery for the Rotterdam LMO project ───
   Uses ONLY the images provided for this project — fully independent
   from any other project gallery (Apeldoorn / Ooltgensplaat / Rosmalen /
   Sportpark DRL). Max 5 images, strict storytelling order:
     1) HERO        — eindresultaat: aangeplante haagbeuk met voetbalveld op de achtergrond
     2) CONTEXT     — betonnen Urban Tree Pit hangt aan de kraan, klaar voor plaatsing
     3) SOLUTION    — boom met wortelkluit wordt door de kraan naar de voorbereide bak gehesen
     4) TECHNICAL   — onderbeplanting wordt aangebracht in de geplaatste Urban Tree Pit
     5) INTEGRATION — boom geïntegreerd in de openbare ruimte, met bestrating en straatmeubilair
   SEO: descriptive Dutch alt text reinforcing the keywords
        "Urban Tree Pit", "Rotterdam LMO", "voetbalvereniging",
        "haagbeuk", "wortelontwikkeling", "pilot Rotterdam".
   Performance: <img loading="lazy" decoding="async">; the gallery is
   only mounted when the dropdown opens, so nothing is fetched before.
*/
const ROTTERDAM_LMO_GALLERY: { src: string; alt: string; caption: string }[] = [
  // NOTE: The hero image (1777961688315_d7b9019d.jpg — aangeplante haagbeuk met
  // voetbalveld op de achtergrond) is intentionally omitted here. It already
  // appears as the main thumbnail on the Rotterdam LMO project card, so we
  // don't repeat it inside the carousel/gallery.
  {
    src: 'https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1777961686544_9f64fa9d.jpg',
    alt: 'BRENT Urban Tree Pit van prefab beton hangt aan de kraan van een rode vrachtwagen boven de uitgegraven bouwput bij voetbalvereniging LMO Rotterdam',
    caption: 'Context — de prefab betonnen Urban Tree Pit wordt aangevoerd en boven de bouwput gepositioneerd',
  },
  {
    src: 'https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1777961687575_b01bb449.jpg',
    alt: 'Boom met wortelkluit wordt door een graafmachine met kraan naar de voorbereide Urban Tree Pit gehesen op het terrein van LMO in Rotterdam',
    caption: 'Oplossing — de boom met intacte wortelkluit wordt naar de voorbereide Urban Tree Pit gehesen',
  },
  {
    src: 'https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1777961684476_b66cea0f.jpg',
    alt: 'Onderbeplanting wordt aangebracht in de geplaatste Urban Tree Pit bij LMO Rotterdam, waarbij medewerkers de jonge planten in de teelaarde zetten',
    caption: 'Techniek — onderbeplanting wordt zorgvuldig aangebracht in de Urban Tree Pit',
  },
  {
    src: 'https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1777961689154_c20f9f24.jpg',
    alt: 'Geplante boom in de Urban Tree Pit bij LMO Rotterdam, geïntegreerd in de openbare ruimte met bestrating, lantaarnpaal en bestaande beplanting in herfstkleuren',
    caption: 'Integratie — de boom is geïntegreerd in de openbare ruimte, klaar voor monitoring binnen de pilot Rotterdam',
  },
];


/* ─── Lightweight, modern image carousel for the Rotterdam LMO dropdown ───
   Same visual language as the Apeldoorn / Ooltgensplaat / Rosmalen / DRL
   carousels (rounded frame, 16:10 / 16:9 aspect, prev/next, dots, counter,
   captions). Uses ONLY ROTTERDAM_LMO_GALLERY — never reuses other sources.
*/
const RotterdamLMOGallery: React.FC = () => {
  const [index, setIndex] = useState(0);
  const total = ROTTERDAM_LMO_GALLERY.length;
  const go = (i: number) => setIndex((i + total) % total);

  return (
    <figure className="not-prose mb-2">
      <div className="relative w-full overflow-hidden rounded-2xl bg-gray-100 shadow-sm border border-gray-100">
        {/* Slides */}
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {ROTTERDAM_LMO_GALLERY.map((img) => (
            <div key={img.src} className="relative w-full flex-shrink-0 aspect-[16/10] sm:aspect-[16/9]">
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Counter */}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/55 text-white text-xs font-medium backdrop-blur-sm">
          {index + 1} / {total}
        </div>

        {/* Arrows */}
        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Vorige afbeelding"
          className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/85 hover:bg-white text-gray-800 shadow-md backdrop-blur transition"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Volgende afbeelding"
          className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/85 hover:bg-white text-gray-800 shadow-md backdrop-blur transition"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Dots — clean modern pagination dots (8×8, active = 18×8).
            !min-h-0 overrides the global mobile `min-height: 44px` rule
            in index.css that was stretching dots into vertical pill bars
            on mobile portrait. */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
          {ROTTERDAM_LMO_GALLERY.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`Ga naar afbeelding ${i + 1}`}
              className={`flex-shrink-0 !min-h-0 h-2 p-0 rounded-full transition-all duration-300 ${
                i === index ? 'w-[18px] bg-white' : 'w-2 bg-white/60 hover:bg-white/90'
              }`}
            />
          ))}
        </div>


      </div>
      <figcaption className="mt-3 text-sm text-gray-500 text-center italic">
        {ROTTERDAM_LMO_GALLERY[index].caption}
      </figcaption>
    </figure>
  );
};






const ApeldoornStory: React.FC = () => <>
    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
      De uitdaging
    </h3>
    <p>
      De gemeente Apeldoorn is bezig om hittestress in de stad te verminderen.
      Daarom wordt druk gezocht naar plekken om groen toe te voegen. De twee
      parkeerplaatsen aan de Edisonlaan in Apeldoorn zijn in de zomer ontzettend
      warm. Door de hoge parkeerdruk is het onwenselijk hier parkeervakken op te
      heffen. Verder moet de plek bereikbaar blijven voor de bevoorrading van
      het winkelcentrum en de auto die de geldautomaat komt vullen.
    </p>
    <p>
      Ook ondergronds zijn de nodige beperkingen, zoals kabels en leidingen en
      een hoge grondwaterstand in de winterperiode. Beide beperkt dit de
      ondergrondse ruimte voor een goede groeiplaats voor een boom.
    </p>
    <p>
      De gemeente heeft als beleidsregel dat bomen alleen worden aangeplant
      wanneer deze ten minste 60 jaar kunnen blijven staan. De afgelopen jaren
      was nog geen passende oplossing voor deze locatie gevonden.
    </p>

    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight pt-4">
      Onze oplossing
    </h3>
    <p>
      Met de BRENT – Urban Tree Pit voldoet de gemeente aan de eigen
      beleidsregel. De boom blijft ten minste 60 jaar behouden, al gaat deze wel
      een keer verhuizen. Voor deze verhuizing zorgen de bomen al voor de nodige
      schaduw en verkoeling op de huidige plaats. De BRENT ’s kunnen ten minste
      100 jaar op deze locaties worden ingezet, waardoor deze locatie is
      getransformeerd naar een kweekplek in de stad, voor de stad.
    </p>
    <p>
      De gemeente was direct enthousiast over de compactheid van de groeiplaats
      en de standaardisatie, waardoor de uitdagingen met kabels en leidingen en
      het hoge grondwater verholpen zijn en ook geen wortelopdruk optreedt.
    </p>
    <p>
      Bij dit project is voor het eerst de afdekking ‘Full’ toegepast. Door deze
      afdekking kan het hele parkeerterrein nog op dezelfde manier worden
      gebruikt en waren aanpassingen niet nodig. In het beplantingsvak van 1
      meter bij 1 meter is gekozen om Spirea’s te zetten, zodat een natuurlijke
      bescherming van de boom ontstaat. Voor de korte termijn zijn hier
      boompalen geplaatst.
    </p>
    <p>
      Eén van de bomen is samen met de wethouder van gemeente Apeldoorn
      geplant. Mooi om te zien dat zoveel aandacht van de gemeente uitgaat naar
      vergroenen en dat ze openstaan voor innovaties:
    </p>
    <p className="break-words">
      Zie ook de LinkedIn post:{' '}
      <a href="https://www.linkedin.com/posts/dannyhuizer_i-activity-7447940751164030976-yFfo?utm_source=share&utm_medium=member_desktop&rcm=ACoAABDI5qoBRmT5izXs1iLNlMrYlvpfhoOHmTY" target="_blank" rel="noopener noreferrer" className="text-[#6BA539] font-medium underline underline-offset-2 hover:text-[#4E8A25] break-all">
        https://www.linkedin.com/posts/dannyhuizer_i-activity-7447940751164030976-yFfo
      </a>
    </p>

    {/* Testimonial */}
    <figure className="mt-10 relative rounded-2xl bg-gray-50 border border-gray-100 border-l-4 border-l-[#6BA539] p-6 sm:p-8 lg:p-10">
      <Quote className="absolute top-5 right-5 sm:top-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 text-[#6BA539]/15" aria-hidden="true" />
      <blockquote className="relative">
        <p className="text-base sm:text-lg italic text-gray-700 leading-relaxed">
          “Wij zijn blij verast met de Urban Tree Pit. Een mooie constructie die
          ons de mogelijkheid biedt bomen toe te passen op locaties waar dit
          eerst niet mogelijk leek. De communicatie en samenwerking met Nursi
          Tree was prettig, het actief meedenken van de kant van Nursi Tree
          hebben we als zeer prettig ervaren. Ook in de uitvoering was de
          samenwerking en de planning goed. Al met al een geslaagd project in de
          gemeente Apeldoorn. Wij zijn benieuwd hoe de bomen zich ontwikkelen de
          komende 20 jaar.”
        </p>
      </blockquote>
      <figcaption className="mt-6 pt-5 border-t border-gray-200 text-sm text-gray-500 leading-relaxed not-italic">
        <div>
          <span className="font-semibold text-gray-700">Eddie Rijckenberg</span>
          {' – projectleider Gemeente Apeldoorn'}
        </div>
        <div>
          <span className="font-semibold text-gray-700">Tonnie Berends</span>
          {' – Directievoerder Gemeente Apeldoorn'}
        </div>
      </figcaption>
    </figure>
  </>;

/* ─── Expandable story for the Ooltgensplaat project ─── */
const OoltgensplaatStory: React.FC = () => <>
    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
      De uitdaging
    </h3>
    <p>
      Na lang uitdenken en op kleine schaal testen werd het tijd voor een
      praktijktest van de Urban Tree Pit op werkelijke grootte. Dit moest
      uitwijzen of de installatie en werking het resultaat geeft zoals we hadden
      bedacht, zodat de mal voor BRENT kan worden geproduceerd. Daarnaast zijn
      deze Urban Tree Pits nodig om onderzoeken uit te voeren, zodat de groei en
      ontwikkeling eenvoudig kan worden bijgehouden. Daarom is gekozen om deze
      praktijkopstelling op eigen terrein te plaatsen.
    </p>

    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight pt-4">
      Onze oplossing
    </h3>
    <p>
      Op eigen terrein zijn 3 van de eerste versie van de Urban Tree Pit
      toegepast. Deze Urban Tree Pits zijn met een eenmalige mal geproduceerd,
      zodat eventuele aanpassingen nog in de definitieve mal verwerkt konden
      worden.
    </p>
    <p>
      Er is gekozen voor 2 verschillende hoogtes en het nabootsen van 2
      situaties: geïntegreerd in de bestaande verharding en deels verhoogd in
      een plantvak. In alle bakken is één van onze vaste plantenmengsels
      toegevoegd en later is per bak ons bloembollenmengsel aangebracht.
    </p>
    <p>
      Een belangrijk aspect voor de werking van het systeem is de
      waterhuishouding. Om te onderzoeken hoeveel een boom daadwerkelijk drinkt
      is een sensor aangebracht die de hoogte van het waterpeil bijhoudt.
      Daarnaast wordt bijgehouden hoeveel water via de overstort het systeem
      verlaat.
    </p>
    <p>
      Er zijn 3 verschillende boomsoorten toegepast met verschillende
      groeisnelheden, zodat een wisselend verplantmoment ontstaat. De
      Amerikaanse tulpenboom zal de eerste zijn die kan worden verplant.
      Jaarlijks wordt de ontwikkeling van de bomen bijgehouden, wat we
      vastleggen op het NursiTree-platform.
    </p>
    <p>Via LinkedIn zullen we de bevindingen van dit project met jullie delen!</p>
    <p>
      Dit is gelijk onze showlocatie, waar je van harte welkom bent en de bakken
      kunt bewonderen onder het genot van een echte Flakkeese bolus.
    </p>

    <div className="mt-4 pt-6 border-t border-gray-200 space-y-1 text-gray-700">
      <p>
        <span className="font-semibold">Aantal : 3 BRENT Urban Tree Pit</span>
      </p>
      <p>
        <span className="font-semibold">Jaar : augustus 2025</span>
      </p>
      <p>
        <span className="font-semibold">Provincie : Ooltgensplaat</span>
      </p>
    </div>
  </>;

/* ─── Expandable story for the Rosmalen / Achter de Driesprong project ─── */
const DeEikStory: React.FC = () => <>
    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
      Urban Tree Pit Achter de Driesprong, Rosmalen
    </h3>


    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight pt-4">
      De uitdaging
    </h3>
    <p>
      Gemeente ’s Hertogenbosch heeft de ambitie om meer bomen en groen toe te
      voegen in het winkelcentrum van Rosmalen. Dit draagt bij aan een
      aantrekkelijke openbare ruimte en helpt om hittestress te verminderen.
    </p>
    <p>
      Tegelijkertijd spelen verschillende praktische beperkingen. Bewoners en
      ondernemers geven aan geen grote boom direct voor hun gevel te willen.
      Daarnaast is de beschikbare ondergrondse ruimte sterk beperkt door de
      aanwezigheid van kabels en leidingen. Ook wordt de locatie wekelijks
      gebruikt als marktterrein, wat extra eisen stelt aan de inrichting en
      belastbaarheid van de ondergrond.
    </p>
    <p>
      Daar komt bij dat bij hevige regenval sprake is van wateroverlast, wat
      vraagt om een oplossing die slim omgaat met wateropvang en -beheer. Deze
      combinatie van bovengrondse en ondergrondse uitdagingen maakte het lastig
      om een toekomstbestendige groeiplaats voor bomen te realiseren.
    </p>

    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight pt-4">
      Onze oplossing
    </h3>
    <p>
      Met de inzet van de BRENT – Urban Tree Pit is een passende en
      toekomstgerichte oplossing gerealiseerd. Dankzij het compacte ontwerp kan
      de groeiplaats eenvoudig worden ingepast tussen bestaande kabels en
      leidingen, zonder ingrijpende aanpassingen aan de ondergrondse
      infrastructuur.
    </p>
    <p>
      De gekozen oplossing biedt daarnaast flexibiliteit: de boom kan na circa
      20 jaar eenvoudig worden verplaatst. Hierdoor blijft het mogelijk om in
      te spelen op veranderende wensen in de openbare ruimte, zonder dat de
      investering verloren gaat.
    </p>
    <p>
      Een belangrijk voordeel is het geïntegreerde watermanagement. De Urban
      Tree Pit maakt gebruik van regenwater uit de directe omgeving, dat wordt
      opgevangen en opgeslagen in het waterreservoir. Dit helpt niet alleen om
      wateroverlast te verminderen, maar zorgt er ook voor dat de boom in droge
      periodes over voldoende water beschikt.
    </p>
    <p>
      Door de betonnen constructie is een harde scheiding gecreëerd tussen
      plantvak en marktterrein. De groeiplaats blijft volledig functioneel en
      beschermd, zonder dat er iets aan de wekelijkse markt moest veranderen.
    </p>
    <p>
      Met deze oplossing wordt vergroening mogelijk gemaakt op een plek waar
      dat voorheen niet haalbaar leek. Wanneer de ruimte beperkt is, moet groen
      slimmer worden.
    </p>

    <div className="mt-4 pt-6 border-t border-gray-200 space-y-1 text-gray-700">
      <p>
        <span className="font-semibold">Aantal : 1 BRENT Urban Tree Pit</span>
      </p>
    </div>
  </>;

/* ─── Expandable story for the Sportpark DRL Rotterdam project ─── */
const SportparkDRLStory: React.FC = () => <>
    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
      Urban Tree Pits Sportpark DRL Rotterdam
    </h3>

    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight pt-4">
      De uitdaging
    </h3>
    <p>
      Bij sportpark DRL kon gemeente Rotterdam in combinatie met Sportbedrijf
      Rotterdam niet meer aan de herplantplicht voldoen. Grote populieren aan de
      rand van het terrein waren gekapt, maar door de komst van het kunstgras
      was het terugplaatsen van bomen geen optie meer. De voormalige bomen
      hadden al voor de nodige schade aan de velden gezorgd, wat nu voorkomen
      moest worden.
    </p>
    <p>
      De hittestress op het sportpark nam echter alleen maar toe, waardoor op
      deze locatie wel iets moest gebeuren.
    </p>

    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight pt-4">
      Onze oplossing
    </h3>
    <p>
      Gemeente Rotterdam en Sportbedrijf Rotterdam waren direct enthousiast toen
      duidelijk werd dat de boomwortels binnen het systeem blijven en geen
      schade meer veroorzaken. Door de toepassing van de Urban Tree Pits konden
      de bomen zelfs op het tussenpad gezet worden, zodat de bomen ook een
      koelend effect op het veld hebben.
    </p>
    <p>
      Bomen en kunstgrasvelden blijft door de afvallende bladeren wel een
      uitdaging. Daarom is in dit geval gekozen voor bomen met niet te klein
      blad. Daarnaast is geaccepteerd dat in het najaar wat meer blad geruimd
      moet gaan worden.
    </p>
    <p>
      Op deze locatie zijn 2 verschillende toepassingen gedaan. 3 Urban Tree
      Pits zijn in een plantvak, nabij de kantine en het hoofdveld gezet, met
      daarbij:
    </p>
    <ul className="list-disc pl-6 space-y-2">
      <li>Grondwater zorgt voor de voeding van het waterreservoir.</li>
      <li>Eén plantenmengsel voor het hele plantvak is gebruikt.</li>
      <li>Ons eigen biodiverse bloembollenmengsel is aangebracht.</li>
    </ul>
    <p>
      Én 5 Urban Tree Pits zijn verhoogd geplaatst op het tussenpad, waarbij:
    </p>
    <ul className="list-disc pl-6 space-y-2">
      <li>
        Afstromend hemelwater wordt verzameld en het waterreservoir vult.
      </li>
      <li>
        Onze 5 verschillende vaste plantenmengsels gebruikt zijn, zodat we
        verschillen kunnen testen.
      </li>
      <li>
        Zitranden zijn aangebracht zodat ze ook gebruikt kunnen worden als
        tribune.
      </li>
      <li>
        Een bollenmengsel speciaal in de clubkleuren van DRL zorgt voor een
        kleurrijk begin van het voorjaar.
      </li>
    </ul>
    <p>
      Door het toepassen van de Urban Tree Pits is de kwaliteit van het hele
      terrein verbeterd. De vereniging is erg enthousiast en houdt elkaar
      scherp op zorg hiervoor.
    </p>
    <p>
      Deze locatie dient nu ook als pilotlocatie voor de rest van gemeente
      Rotterdam. Onderzocht gaat worden hoe de bomen zich binnen het systeem
      ontwikkelen en welke mogelijkheden er verder binnen Rotterdam zijn. Door
      gebruik te maken van bomen met verschillende groeisnelheden gaat hier een
      gevarieerd beeld ontstaan en zullen de bomen in verschillende jaren
      geoogst kunnen worden.
    </p>

    <div className="mt-4 pt-6 border-t border-gray-200 space-y-1 text-gray-700">
      <p>
        <span className="font-semibold">Aantal : 8 BRENT Urban Tree Pit</span>
      </p>
    </div>
  </>;

/* ─── Expandable story for the Rotterdam LMO project ─── */
const RotterdamLMOStory: React.FC = () => <>
    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
      Urban Tree Pit Rotterdam LMO
    </h3>


    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight pt-4">
      De uitdaging
    </h3>
    <p>
      Na diverse gesprekken met gemeente Rotterdam werd duidelijk dat de
      gemeente graag een Urban Tree Pit als proef zou willen plaatsen. De
      gemeente wilde graag in de praktijk antwoorden krijgen op vragen zoals:
      hoe ontwikkelt de boom in de Tree Pit en hoe verloopt de
      wortelontwikkeling
    </p>
    <p>
      Omdat vanuit de gemeente veel kansen op sportterreinen worden gezien,
      werd bij voetbalvereniging LMO een geschikte locatie voor deze
      praktijproef gevonden.
    </p>

    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight pt-4">
      Onze oplossing
    </h3>
    <p>
      De Urban Tree Pit is geplaatst op een plek zonder kabels en leidingen,
      maar wel dicht genoeg bij de bestaande put, zodat deze het reservoir kan
      voeden.
    </p>
    <p>
      In de bak is een laagbeveerde haagbeuk geplant, welke de komende jaren
      zal worden gemonitord. Belangrijk binnen deze pilot van Rotterdam is de
      (wortel)ontwikkeling binnen het systeem. Alle gegevens zullen worden
      vastgelegd op het NursiTree-platform. Jaarlijks zal hier ook een
      updatefoto worden geplaatst, houd dit vooral in de gaten!
    </p>

    <div className="mt-4 pt-6 border-t border-gray-200 space-y-1 text-gray-700">
      <p>
        <span className="font-semibold">Aantal : 1 BRENT Urban Tree Pit</span>
      </p>
    </div>
  </>;
const ProjectenPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('Alle');

  /* Each card has its own independent open/close state flag so
     opening one story CANNOT possibly affect another card.
     NOTE: All cards (including the featured Apeldoorn project) start
     COLLAPSED so visitors immediately see the filter section without
     needing to scroll. */
  const [p1Open, setP1Open] = useState(false);
  const [p2Open, setP2Open] = useState(false);
  const [p3Open, setP3Open] = useState(false);
  const [p4Open, setP4Open] = useState(false);
  const [p5Open, setP5Open] = useState(false);


  /* Helper for filter visibility — each card calls this with its OWN
     hardcoded tag list below. There is no shared data object. */
  const showWithFilter = (tags: string[]) => activeFilter === 'Alle' || tags.includes(activeFilter);
  return <PageLayout>
      <SEO
        title="Projecten | Urban Tree Pit in de praktijk | NursiTree"
        description="Bekijk NursiTree-projecten met de Urban Tree Pit: case studies en realisaties van stedelijke vergroening, klimaatadaptatie en biodiversiteit in steden door heel Nederland."
        keywords="NursiTree projecten, Urban Tree Pit projecten, case studies stedelijke vergroening, boomverplanting, biodiversiteit stad, klimaatadaptatie, stadsbomen Nederland"
        breadcrumbs={[
          { name: 'Home', url: 'https://www.nursitree.com/' },
          { name: 'Projecten', url: 'https://www.nursitree.com/projecten' },
        ]}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'NursiTree projecten',
          description: 'Een overzicht van gerealiseerde NursiTree Urban Tree Pit projecten in de Nederlandse openbare ruimte.',
          url: 'https://www.nursitree.com/projecten',
          isPartOf: { '@type': 'WebSite', name: 'NursiTree', url: 'https://www.nursitree.com/' }
        }}
      />



      {/* HERO — compact so the filter section is visible above the fold */}
      <section className="relative py-8 sm:py-10 lg:py-14 bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-[#6BA539]/[0.05] to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="lg:hidden inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6BA539]/10 text-[#6BA539] text-xs font-medium mb-3 border border-[#6BA539]/15">
              Projecten
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-3 sm:mb-4">
              Verhalen uit de{' '}
              <span className="text-[#6BA539]">groene praktijk</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-500 leading-relaxed max-w-2xl">
              Case studies, inspiratie en achtergrondverhalen over projecten waarin we samen
              met partners meer groen naar de stad brengen.
            </p>
          </div>
        </div>
      </section>


      {/* ============================================================
          FEATURED PROJECT — Apeldoorn (compact, above the filter)
          Sits between the hero and the sticky filter so visitors
          immediately see both the featured project AND the filter
          on page load. Starts COLLAPSED — clicking "Lees meer"
          expands the full story inline.
       ============================================================ */}
      <section className="bg-white pt-2 pb-6 sm:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <article
            role="button"
            tabIndex={0}
            aria-expanded={p1Open}
            onClick={() => setP1Open(o => !o)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setP1Open(o => !o);
              }
            }}
            className={`group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl hover:scale-[1.01] transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#6BA539]/40 focus:ring-offset-2 ${p1Open ? 'shadow-xl' : ''}`}
          >
            {/* Compact header row — always visible */}
            <div className="flex flex-col sm:flex-row sm:items-stretch">
              {/* Thumbnail — kept small so collapsed height stays compact */}
              <div className="relative sm:w-56 md:w-64 lg:w-72 flex-shrink-0 aspect-[16/10] sm:aspect-auto overflow-hidden">
                <img
                  src="https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1776947293443_d8d867de.JPG"
                  alt="Urban Tree Pits Edisonlaan Apeldoorn"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#6BA539] text-white text-[11px] font-semibold uppercase tracking-wide shadow">
                  Uitgelicht
                </span>
              </div>

              {/* Title + meta + CTA */}
              <div className="flex-1 p-5 sm:p-6 flex flex-col justify-center">
                <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500 mb-2">
                  <span className="inline-flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />Apeldoorn</span>
                  <span className="inline-flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />Maart 2026</span>
                  <span className="hidden sm:inline">4 min</span>
                </div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 leading-snug mb-3">
                  Urban Tree Pits Edisonlaan Apeldoorn
                </h2>

                <div className="flex items-center justify-between gap-4">
                  <div className="hidden md:flex flex-wrap gap-1.5">
                    <span className="inline-flex items-center rounded-full bg-[#6BA539]/10 text-[#4E8A25] font-medium border border-[#6BA539]/15 whitespace-nowrap px-2.5 py-1 text-xs">Parkeerdruk</span>
                    <span className="inline-flex items-center rounded-full bg-[#6BA539]/10 text-[#4E8A25] font-medium border border-[#6BA539]/15 whitespace-nowrap px-2.5 py-1 text-xs">Kabels en leidingen</span>
                    <span className="inline-flex items-center rounded-full bg-[#6BA539]/10 text-[#4E8A25] font-medium border border-[#6BA539]/15 whitespace-nowrap px-2.5 py-1 text-xs">Hoog grondwater</span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setP1Open(o => !o); }}
                    aria-expanded={p1Open}
                    className="ml-auto inline-flex items-center gap-1.5 text-[#6BA539] text-sm font-semibold hover:gap-2.5 transition-all"
                  >
                    {p1Open ? 'Lees minder' : 'Lees meer'}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${p1Open ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>
            </div>

            {/* Expandable full story — only rendered when open.
                The image gallery is mounted lazily here (only on open),
                so its <img loading="lazy" decoding="async"> tags only
                start fetching once the user clicks "Lees meer". */}
            {p1Open && (
              <div className="px-5 sm:px-6 pb-8 sm:pb-10 pt-2 cursor-default" onClick={(e) => e.stopPropagation()}>
                <div className="pt-8 border-t border-gray-100">
                  <div className="max-w-3xl mx-auto space-y-6 text-gray-700 leading-relaxed text-base sm:text-lg">
                    <ApeldoornGallery />
                    <ApeldoornStory />
                  </div>
                </div>
              </div>
            )}

          </article>
        </div>
      </section>



      {/* TAG FILTER — clean, structured & scrollable (alphabetical) */}
      <section className="bg-white border-y border-gray-100 sticky top-20 z-30 backdrop-blur-md bg-white/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          {/* Header row: label + active filter indicator + reset */}
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2 text-gray-700">
              <ListFilter className="w-4 h-4 text-[#6BA539]" aria-hidden="true" />
              <span className="text-sm font-semibold">Filter op thema</span>
              <span className="hidden sm:inline text-xs text-gray-400">
                ({ALL_TAGS.length} thema's)
              </span>
            </div>
            {activeFilter !== 'Alle' && (
              <button
                type="button"
                onClick={() => setActiveFilter('Alle')}
                className="text-xs font-medium text-gray-500 hover:text-[#6BA539] transition-colors underline-offset-2 hover:underline"
              >
                Reset
              </button>
            )}
          </div>

          {/*
            Mobile (<md): single-row horizontal scroll — compact & tap-friendly
            Desktop (md+): multi-row flex-wrap panel with max-height and vertical
            scroll, giving a clean, structured, scannable filter list
          */}
          <div
            role="listbox"
            aria-label="Projecten filteren op thema"
            className="
              flex md:flex-wrap gap-2
              overflow-x-auto md:overflow-x-visible
              md:overflow-y-auto md:max-h-[8.5rem]
              scrollbar-hide md:scrollbar-thin
              -mx-1 px-1 py-1 md:py-2
              scroll-smooth
              md:rounded-xl md:border md:border-gray-100 md:bg-gray-50/60 md:px-3
            "
          >
            {filterOptions.map(tag => {
              const isActive = activeFilter === tag;
              return (
                <button
                  key={tag}
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 border ${
                    isActive
                      ? 'bg-[#6BA539] text-white shadow-sm border-[#6BA539]'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-[#6BA539]/40 hover:bg-[#6BA539]/5 hover:text-[#4E8A25]'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      </section>


      {/* ============================================================
          PROJECT CARDS GRID
          Each card below is a FULLY INDEPENDENT JSX block:
            • Its own hardcoded image URL
            • Its own hardcoded title, location, date, read time
            • Its own hardcoded tag list
            • Its own open/close state (p1Open..p5Open)
            • Its own dedicated story component
          There is NO shared data object, NO .map() over cards, NO
          reusable card sub-component with shared state. Editing one
          card's image / text / tags / story CANNOT affect any other
          card.
       ============================================================ */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">

            {/* Apeldoorn project moved to the dedicated FEATURED section above the filter */}


            {/* ───────────── PROJECT CARD 2 — Ooltgensplaat (independent) ───────────── */}
            {showWithFilter([]) && <article
              role="button"
              tabIndex={0}
              aria-expanded={p2Open}
              onClick={() => setP2Open(o => !o)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setP2Open(o => !o);
                }
              }}
              className={`group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#6BA539]/40 focus:ring-offset-2 ${p2Open ? 'md:col-span-2 lg:col-span-3 shadow-xl' : 'hover:-translate-y-1 hover:scale-[1.01]'}`}
            >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src="https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1776947387339_4d9ce797.jpeg" alt="Urban Tree Pits Ooltgensplaat" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 sm:p-7 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <span className="inline-flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />Ooltgensplaat</span>
                    <span className="inline-flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />Augustus 2025</span>
                    <span className="ml-auto">6 min</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug mb-3 group-hover:text-[#6BA539] transition-colors">
                    Urban Tree Pits Ooltgensplaat
                  </h3>
                  <button type="button" onClick={(e) => { e.stopPropagation(); setP2Open(o => !o); }} aria-expanded={p2Open} className="mt-5 ml-auto inline-flex items-center gap-1.5 text-[#6BA539] text-sm font-semibold group-hover:gap-2.5 transition-all">
                    {p2Open ? 'Lees minder' : 'Lees meer'}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${p2Open ? 'rotate-180' : ''}`} />
                  </button>
                  {p2Open && <div className="mt-8 pt-8 border-t border-gray-100 cursor-default" onClick={(e) => e.stopPropagation()}>
                      <div className="max-w-3xl mx-auto space-y-6 text-gray-700 leading-relaxed text-base sm:text-lg">
                        <OoltgensplaatGallery />
                        <OoltgensplaatStory />
                      </div>
                    </div>}

                </div>
              </article>}


            {/* ───────────── PROJECT CARD 3 — Rosmalen (independent) ───────────── */}
            {showWithFilter(['Wateroverlast', 'Kabels en leidingen', 'Hittestress']) && <article
              role="button"
              tabIndex={0}
              aria-expanded={p3Open}
              onClick={() => setP3Open(o => !o)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setP3Open(o => !o);
                }
              }}
              className={`group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#6BA539]/40 focus:ring-offset-2 ${p3Open ? 'md:col-span-2 lg:col-span-3 shadow-xl' : 'hover:-translate-y-1 hover:scale-[1.01]'}`}
            >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src="https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1776947477181_b65f5c57.jpg" alt="Urban Tree Pit Achter de Driesprong, Rosmalen" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 sm:p-7 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <span className="inline-flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />Rosmalen</span>
                    <span className="inline-flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />November 2025</span>
                    <span className="ml-auto">3 min</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug mb-3 group-hover:text-[#6BA539] transition-colors">
                    Urban Tree Pit Achter de Driesprong, Rosmalen
                  </h3>

                  <div className="mt-4 flex flex-wrap gap-1.5 lg:hidden">
                    <span className="inline-flex items-center rounded-full bg-[#6BA539]/10 text-[#4E8A25] font-medium border border-[#6BA539]/15 whitespace-nowrap px-2.5 py-1 text-[11px] sm:text-xs">Wateroverlast</span>
                    <span className="inline-flex items-center rounded-full bg-[#6BA539]/10 text-[#4E8A25] font-medium border border-[#6BA539]/15 whitespace-nowrap px-2.5 py-1 text-[11px] sm:text-xs">Kabels en leidingen</span>
                    <span className="inline-flex items-center rounded-full bg-[#6BA539]/10 text-[#4E8A25] font-medium border border-[#6BA539]/15 whitespace-nowrap px-2.5 py-1 text-[11px] sm:text-xs">Hittestress</span>
                  </div>

                  <button type="button" onClick={(e) => { e.stopPropagation(); setP3Open(o => !o); }} aria-expanded={p3Open} className="mt-5 ml-auto inline-flex items-center gap-1.5 text-[#6BA539] text-sm font-semibold group-hover:gap-2.5 transition-all">
                    {p3Open ? 'Lees minder' : 'Lees meer'}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${p3Open ? 'rotate-180' : ''}`} />
                  </button>
                  {p3Open && <div className="mt-8 pt-8 border-t border-gray-100 cursor-default" onClick={(e) => e.stopPropagation()}>
                      <div className="max-w-3xl mx-auto space-y-6 text-gray-700 leading-relaxed text-base sm:text-lg">
                        <RosmalenGallery />
                        <DeEikStory />
                      </div>
                    </div>}

                </div>
              </article>}


            {/* ───────────── PROJECT CARD 4 — Sportpark DRL Rotterdam (independent) ───────────── */}
            {showWithFilter(['Sportvelden', 'Hittestress', 'Biodiversiteit']) && <article
              role="button"
              tabIndex={0}
              aria-expanded={p4Open}
              onClick={() => setP4Open(o => !o)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setP4Open(o => !o);
                }
              }}
              className={`group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#6BA539]/40 focus:ring-offset-2 ${p4Open ? 'md:col-span-2 lg:col-span-3 shadow-xl' : 'hover:-translate-y-1 hover:scale-[1.01]'}`}
            >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src="https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1777960991914_9abaedce.jpeg" alt="Urban Tree Pits Sportpark DRL Rotterdam — bloeiende tulpen langs het kunstgrasveld" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 sm:p-7 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <span className="inline-flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />Rotterdam</span>
                    <span className="inline-flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />November 2025</span>

                    <span className="ml-auto">5 min</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug mb-3 group-hover:text-[#6BA539] transition-colors">
                    Urban Tree Pits Sportpark DRL Rotterdam
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-1.5 lg:hidden">
                    <span className="inline-flex items-center rounded-full bg-[#6BA539]/10 text-[#4E8A25] font-medium border border-[#6BA539]/15 whitespace-nowrap px-2.5 py-1 text-[11px] sm:text-xs">Sportvelden</span>
                    <span className="inline-flex items-center rounded-full bg-[#6BA539]/10 text-[#4E8A25] font-medium border border-[#6BA539]/15 whitespace-nowrap px-2.5 py-1 text-[11px] sm:text-xs">Hittestress</span>
                    <span className="inline-flex items-center rounded-full bg-[#6BA539]/10 text-[#4E8A25] font-medium border border-[#6BA539]/15 whitespace-nowrap px-2.5 py-1 text-[11px] sm:text-xs">Biodiversiteit</span>
                  </div>
                  <button type="button" onClick={(e) => { e.stopPropagation(); setP4Open(o => !o); }} aria-expanded={p4Open} className="mt-5 ml-auto inline-flex items-center gap-1.5 text-[#6BA539] text-sm font-semibold group-hover:gap-2.5 transition-all">
                    {p4Open ? 'Lees minder' : 'Lees meer'}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${p4Open ? 'rotate-180' : ''}`} />
                  </button>
                  {p4Open && <div className="mt-8 pt-8 border-t border-gray-100 cursor-default" onClick={(e) => e.stopPropagation()}>
                      <div className="max-w-3xl mx-auto space-y-6 text-gray-700 leading-relaxed text-base sm:text-lg">
                        <SportparkDRLGallery />
                        <SportparkDRLStory />
                      </div>
                    </div>}
                </div>
              </article>}


            {/* ───────────── PROJECT CARD 5 — Rotterdam LMO (independent) ───────────── */}
            {showWithFilter(['Sportvelden', 'Hittestress']) && <article
              role="button"
              tabIndex={0}
              aria-expanded={p5Open}
              onClick={() => setP5Open(o => !o)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setP5Open(o => !o);
                }
              }}
              className={`group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#6BA539]/40 focus:ring-offset-2 ${p5Open ? 'md:col-span-2 lg:col-span-3 shadow-xl' : 'hover:-translate-y-1 hover:scale-[1.01]'}`}
            >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src="https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1777961688315_d7b9019d.jpg" alt="Urban Tree Pits Rotterdam LMO — aangeplante haagbeuk in Urban Tree Pit met voetbalveld op de achtergrond" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" />
                </div>
                <div className="p-6 sm:p-7 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <span className="inline-flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />Rotterdam</span>
                    <span className="inline-flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />November 2025</span>

                    <span className="ml-auto">4 min</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug mb-3 group-hover:text-[#6BA539] transition-colors">
                    Urban Tree Pit Rotterdam LMO
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-1.5 lg:hidden">
                    <span className="inline-flex items-center rounded-full bg-[#6BA539]/10 text-[#4E8A25] font-medium border border-[#6BA539]/15 whitespace-nowrap px-2.5 py-1 text-[11px] sm:text-xs">Sportvelden</span>
                    <span className="inline-flex items-center rounded-full bg-[#6BA539]/10 text-[#4E8A25] font-medium border border-[#6BA539]/15 whitespace-nowrap px-2.5 py-1 text-[11px] sm:text-xs">Hittestress</span>
                  </div>

                  <button type="button" onClick={(e) => { e.stopPropagation(); setP5Open(o => !o); }} aria-expanded={p5Open} className="mt-5 ml-auto inline-flex items-center gap-1.5 text-[#6BA539] text-sm font-semibold group-hover:gap-2.5 transition-all">
                    {p5Open ? 'Lees minder' : 'Lees meer'}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${p5Open ? 'rotate-180' : ''}`} />
                  </button>
                  {p5Open && <div className="mt-8 pt-8 border-t border-gray-100 cursor-default" onClick={(e) => e.stopPropagation()}>
                      <div className="max-w-3xl mx-auto space-y-6 text-gray-700 leading-relaxed text-base sm:text-lg">
                        <RotterdamLMOGallery />
                        <RotterdamLMOStory />
                      </div>
                    </div>}
                </div>
              </article>}



          </div>

          {/* Empty state — shown only when the current filter matches no card */}
          {activeFilter !== 'Alle' && !['Parkeerdruk', 'Kabels en leidingen', 'Hoog grondwater'].includes(activeFilter) && !['Wateroverlast', 'Kabels en leidingen', 'Hittestress'].includes(activeFilter) && !['Sportvelden', 'Hittestress', 'Biodiversiteit'].includes(activeFilter) && !['Sportvelden', 'Hittestress'].includes(activeFilter) && <div className="text-center py-20">
                <p className="text-gray-500">Geen projecten gevonden met deze tag.</p>
              </div>}
        </div>
      </section>

      {/* PRE-FOOTER CTA */}
      <section className="relative z-[2] bg-gray-50" style={{
      paddingTop: '3rem',
      paddingBottom: '10rem',
      marginBottom: '-2px'
    }}>


        {/* Layer 0: Solid full-width dark backstop — guarantees no white sliver
            on ultra-wide screens regardless of clip-path sub-pixel rendering. */}
        <div
          className="absolute left-0 right-0 bottom-0 h-10 bg-[#182418]"
          aria-hidden="true"
        />

        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute inset-0 bg-[#182418]" style={{
          clipPath: 'polygon(0 62%, 100% 76%, 100% 100%, 0 100%)'
        }} />
        </div>
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute inset-0 bg-[#E8854A]" style={{
          clipPath: 'polygon(0 14%, 100% 0%, 100% 76%, 0 62%)'
        }} />
        </div>


        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight tracking-tight">
            Zelf een project starten?
          </h2>
          <div className="flex items-center justify-center">
            <Link to="/#contact-section" className="px-8 py-4 rounded-xl text-base font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 bg-white text-[#E8854A] hover:bg-gray-50">
              Neem contact op
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>;
};
export default ProjectenPage;