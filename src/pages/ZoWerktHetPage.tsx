import React from 'react';

import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import ZwhHero from '@/components/zowerkthet/ZwhHero';
import ZwhIntro from '@/components/zowerkthet/ZwhIntro';
import ZwhProduct from '@/components/zowerkthet/ZwhProduct';
import ZwhHowItWorks from '@/components/zowerkthet/ZwhHowItWorks';
import ZwhDiagram from '@/components/zowerkthet/ZwhDiagram';
import ZwhBenefits from '@/components/zowerkthet/ZwhBenefits';
import ZwhFaq from '@/components/zowerkthet/ZwhFaq';
import ZwhFinalCta from '@/components/zowerkthet/ZwhFinalCta';
import ZwhGreenCta from '@/components/zowerkthet/ZwhGreenCta';

const ZoWerktHetPage: React.FC = () => {
  return (
    <PageLayout>
      <SEO
        title="Zo werkt het | Urban Tree Pit BRENT in detail | NursiTree"
        description="Zo werkt de gepatenteerde Urban Tree Pit BRENT van NursiTree: van waterhuishouding en wortelbescherming tot verplaatsbaarheid voor gezonde stadsbomen en klimaatadaptatie."
        keywords="hoe werkt Urban Tree Pit, BRENT, boomgroeiplaats techniek, waterhuishouding bomen, wortelbescherming, boomverplanting, klimaatadaptatie, slimme openbare ruimte"
        breadcrumbs={[
          { name: 'Home', url: 'https://www.nursitree.com/' },
          { name: 'Zo werkt het', url: 'https://www.nursitree.com/zo-werkt-het' },
        ]}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'TechArticle',
          headline: 'Zo werkt de Urban Tree Pit BRENT',
          about: 'De gepatenteerde, modulaire boomgroeiplaats BRENT van NursiTree, met geïntegreerd watermanagement, wortelbescherming en mogelijkheid tot herplaatsing.',
          author: { '@type': 'Organization', name: 'NursiTree B.V.' },
          publisher: { '@type': 'Organization', name: 'NursiTree B.V.', url: 'https://www.nursitree.com/' },
          inLanguage: 'nl-NL',
          url: 'https://www.nursitree.com/zo-werkt-het'
        }}
      />


      <ZwhHero />

      {/* 2. Intro / Context */}
      <ZwhIntro />

      {/* 3. Product Intro – "Dit is BRENT" */}
      <ZwhProduct />

      {/* 4. How It Works (Core Tech) */}
      <ZwhHowItWorks />

      {/* 5. Technical Diagram */}
      <ZwhDiagram />

      {/* 6. Benefits */}
      <ZwhBenefits />

      {/* 7–9. Final flowing sections: Green CTA → FAQ → Orange CTA
           Wrapped in a single container to eliminate white gaps and create
           one continuous diagonal visual flow into the footer. */}
      <div className="relative overflow-hidden">
        <ZwhGreenCta />
        <ZwhFaq />
        <ZwhFinalCta />
      </div>
    </PageLayout>
  );
};

export default ZoWerktHetPage;
