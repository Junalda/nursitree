# NursiTree blog — auteursgids (BLOG_GUIDE)

Deze gids beschrijft hoe je een blogartikel toevoegt aan de NursiTree-website.
Je hoeft **geen** applicatiecode aan te passen: een nieuw artikel = één nieuw
Markdown-bestand in deze map. Routing, layout, SEO, sitemap en prerendering
gebeuren automatisch.

> Bedoeld voor mensen én AI-assistenten (Claude, ChatGPT, Gemini). Op basis van
> alleen dit document kun je zelfstandig een correct, publiceerbaar artikel maken.

---

## 1. Waar staan de artikelen?

```
src/content/blog/
  BLOG_GUIDE.md                       ← deze gids (géén artikel)
  wees-zuinig-op-je-boomkroonvolume.md  ← gepubliceerd artikel
  voorbeeld-blogartikel.md            ← voorbeeld/template (staat op draft)
```

Elk artikel is één `.md`-bestand in `src/content/blog/`. Alles wat je nodig
hebt staat in dat ene bestand: de metadata (frontmatter) én de tekst.

## 2. Een nieuw artikel toevoegen (stap voor stap)

1. Kopieer `voorbeeld-blogartikel.md` naar een nieuw bestand in dezelfde map.
2. Geef het bestand een naam volgens de **naming convention** (zie §4).
3. Vul de **frontmatter** in (zie §3) — let op de verplichte velden.
4. Schrijf de artikeltekst in Markdown onder de frontmatter (zie §6).
5. Zet `draft: false` zodra het klaar is om te publiceren.
6. Klaar. Bij de volgende build verschijnt het artikel automatisch op
   `/blog` en op `/blog/<slug>`, en wordt het opgenomen in de sitemap.

Je hoeft dus niets te wijzigen in `src/App.tsx`, in de componenten of in de
sitemap. Dat gaat allemaal automatisch op basis van dit bestand.

## 3. Frontmatter (metadata)

De frontmatter staat bovenaan het bestand, tussen twee regels met `---`.

```yaml
---
title: "Titel van het artikel"
slug: titel-van-het-artikel
excerpt: "Korte samenvatting van 1–2 zinnen voor de overzichtspagina en meta description."
publishedAt: 2026-09-16
updatedAt: 2026-09-20        # optioneel
author: NursiTree
category: Boomwaarde
featuredImage: https://.../afbeelding.jpg   # optioneel maar aanbevolen
featuredImageAlt: "Beschrijvende alt-tekst van de afbeelding"
seoTitle: "Optionele SEO-titel (anders wordt 'title' gebruikt)"
seoDescription: "Optionele meta description (anders wordt 'excerpt' gebruikt)"
keywords: [boomkroonvolume, stadsbomen, Urban Tree Pit]
draft: false
---
```

### Verplichte velden

| Veld          | Uitleg |
|---------------|--------|
| `title`       | De titel (wordt de H1 en de `<title>`). |
| `excerpt`     | Korte samenvatting (overzichtskaart + fallback meta description). |
| `publishedAt` | Publicatiedatum als `JJJJ-MM-DD`. |
| `category`    | Eén categorie, bv. `Boomwaarde`, `Stedelijke vergroening`, `Techniek`. |

### Optionele velden

| Veld               | Uitleg |
|--------------------|--------|
| `slug`             | URL-slug. Weglaten = bestandsnaam wordt de slug (zie §5). |
| `updatedAt`        | Datum laatste update (`JJJJ-MM-DD`). Toont "Bijgewerkt op …". |
| `author`           | Standaard `NursiTree` als je het weglaat. |
| `featuredImage`    | URL van de uitgelichte afbeelding. Weglaten = nette gradient-fallback. |
| `featuredImageAlt` | Alt-tekst voor de featured image (zie §7). |
| `seoTitle`         | Aparte titel voor zoekmachines. |
| `seoDescription`   | Aparte meta description. |
| `keywords`         | Lijst van trefwoorden: `[woord1, woord2]`. |
| `draft`            | `true` = niet publiceren (zie §8). Standaard `false`. |

**Belangrijk:** verzin geen persoonsgegevens. Laat `author` op `NursiTree`
staan, tenzij er een echte, bekende auteur is.

## 4. Naming convention voor bestanden

- Alleen kleine letters, cijfers en koppeltekens: `mijn-artikel-titel.md`.
- Geen spaties, hoofdletters, accenten of speciale tekens in de bestandsnaam.
- Gebruik `.md` als extensie.
- De bestandsnaam (zonder `.md`) is standaard ook de slug (zie §5).

## 5. Slug-regels

- De slug bepaalt de URL: `/blog/<slug>`.
- Standaard = de bestandsnaam zonder `.md`.
- Wil je een afwijkende slug? Zet dan `slug:` in de frontmatter.
- Gebruik korte, beschrijvende slugs met koppeltekens, bv.
  `wees-zuinig-op-je-boomkroonvolume`.
- Houd slugs uniek — twee artikelen met dezelfde slug is niet toegestaan.

## 6. Koppen en tekst (Markdown)

- Gebruik **geen** `#` (H1) in de tekst: de `title` uit de frontmatter is al de H1.
- Begin secties met `##` (H2), en gebruik `###` (H3) voor subsecties.
- Houd de hiërarchie logisch: H2 → H3, sla geen niveaus over.
- Alinea's: gewone tekst met een lege regel ertussen.
- Nadruk: `**vet**` en `*cursief*`.
- Opsommingen: regels die beginnen met `- `.
- Citaten: regels die beginnen met `> `.

De artikeltekst wordt automatisch getypeset met de huisstijl (typografie,
kleuren, spacing). Je hoeft geen HTML of CSS-klassen toe te voegen.

## 7. Afbeeldingen en alt-tekst

- **Featured image:** zet de URL in `featuredImage`. Gebruik een bestaande
  NursiTree-afbeelding (CDN-URL) of een nieuwe geoptimaliseerde afbeelding.
  Ontbreekt de afbeelding, dan toont de site een nette gemerkte fallback.
- **Afbeeldingen in de tekst:** `![alt-tekst](https://.../afbeelding.jpg)`.
- **Alt-tekstregels:** beschrijf wat er te zien is, kort en feitelijk
  (bv. "Jonge haagbeuk in een Urban Tree Pit langs een sportveld"). Geen
  "afbeelding van …". Laat alt niet leeg bij inhoudelijke afbeeldingen.
- Gebruik bij voorkeur liggende afbeeldingen (16:9 of 16:10) voor de featured image.

## 8. Draft vs. gepubliceerd

- `draft: true` → het artikel is **niet** zichtbaar op `/blog`, is **niet**
  publiek bereikbaar (een directe URL toont "niet gevonden" met `noindex`),
  en staat **niet** in de sitemap.
- `draft: false` (of veld weglaten) → het artikel wordt gepubliceerd.
- Tijdens lokaal ontwikkelen (`npm run dev`) zijn drafts wél zichtbaar zodat je
  ze kunt previewen. In de productie-build worden ze weggelaten.

## 9. Interne links

- Schrijf interne links **root-relatief**: `[Zo werkt het](/zo-werkt-het)`,
  `[Producten](/producten)`, `[Projecten](/projecten)`.
- Link waar logisch naar relevante pagina's — goed voor de lezer én voor SEO.
- Externe links (`https://…`) openen automatisch in een nieuw tabblad met de
  juiste `rel`-attributen.

## 10. Wat gebeurt er automatisch?

Als je een gepubliceerd artikel toevoegt, regelt het systeem zelf:

- de route `/blog/<slug>` (client-side routing);
- prerendering van de pagina voor SEO en crawlers (build-time);
- een unieke `<title>`, meta description, canonical URL en Open Graph tags;
- `BlogPosting` structured data (Schema.org) met datum, afbeelding en publisher;
- opname in `sitemap.xml`;
- weergave op het overzicht `/blog` (nieuwste bovenaan) en bij "Gerelateerde
  artikelen" van posts in dezelfde categorie.

## 11. Volledig voorbeeld

Zie `voorbeeld-blogartikel.md` in deze map voor een compleet, ingevuld
voorbeeld dat je kunt kopiëren. Een minimaal geldig artikel ziet er zo uit:

```markdown
---
title: "Waarom bomen de stad koeler maken"
slug: waarom-bomen-de-stad-koeler-maken
excerpt: "Bomen verlagen de gevoelstemperatuur in de stad fors. Zo werkt dat."
publishedAt: 2026-09-16
category: Stedelijke vergroening
featuredImage: https://d64gsuwffb70l.cloudfront.net/....jpg
featuredImageAlt: "Straat met volgroeide bomen die schaduw geven"
keywords: [hittestress, verkoeling, stadsbomen]
draft: false
---

In de zomer loopt de temperatuur in versteende steden flink op. Bomen bieden
een natuurlijke oplossing.

## Hoe bomen verkoelen

Door verdamping en schaduw verlagen bomen de gevoelstemperatuur...

## Wat dat oplevert

- Minder hittestress en lagere gezondheidskosten.
- Een prettigere, beter beloopbare openbare ruimte.

Lees meer over onze aanpak op [Zo werkt het](/zo-werkt-het).
```
