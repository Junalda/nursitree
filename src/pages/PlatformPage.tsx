import React from 'react';
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import PlatformHero from '@/components/platform/PlatformHero';
import PlatformIntro from '@/components/platform/PlatformIntro';
import PlatformPassport from '@/components/platform/PlatformPassport';
import PlatformBenefits from '@/components/platform/PlatformBenefits';
import PlatformAccess from '@/components/platform/PlatformAccess';
import PlatformSocialProof from '@/components/platform/PlatformSocialProof';
import PlatformFinalCta from '@/components/platform/PlatformFinalCta';

const PlatformPage: React.FC = () => {
  return (
    <PageLayout>
      <SEO
        title="Platform | Digitaal boompaspoort & monitoring | NursiTree"
        description="Het NursiTree-platform geeft gemeenten, aannemers en beheerders één digitaal overzicht: boompaspoort, monitoring en marktplaats voor herplaatsbare stadsbomen."
        keywords="NursiTree platform, digitaal boompaspoort, boommonitoring, marktplaats bomen, slimme openbare ruimte, beheer stadsbomen, klimaatadaptatie, biodiversiteit stad"
        breadcrumbs={[
          { name: 'Home', url: 'https://www.nursitree.com/' },
          { name: 'Platform', url: 'https://www.nursitree.com/platform' },
        ]}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'NursiTree Platform',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web',
          url: 'https://platform.nursitree.com/',
          description: 'Digitaal platform voor het beheer en de monitoring van Urban Tree Pits met digitaal boompaspoort, levenscyclusgegevens en marktplaats voor herplaatsbare bomen.',
          provider: { '@type': 'Organization', name: 'NursiTree B.V.', url: 'https://www.nursitree.com/' },
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' }
        }}
      />


      <PlatformHero />

      {/* 2. Intro (moved from hero) */}
      <PlatformIntro />

      {/* 3. Tree Passport (Core Feature) */}
      <PlatformPassport />


      {/* 3. Benefits */}
      <PlatformBenefits />

      {/* 4. Platform Access / Preview */}
      <PlatformAccess />

      {/* 5. Social Proof */}
      <PlatformSocialProof />

      {/* 6. Final CTA — matches "Zo werkt het" diagonal design
           for a seamless premium transition into the footer.
           Wrapper uses footer color (#182418) and `flex-1` so any
           leftover vertical space inside <main> (when the page is
           shorter than the viewport) is filled with the footer color
           instead of the parent layout's white background — this
           eliminates the white stripe above the footer on all
           screen sizes (mobile, tablet, desktop, ultra-wide). */}
      <div className="relative overflow-hidden bg-[#182418] flex-1 flex flex-col w-full">
        <PlatformFinalCta />
      </div>


    </PageLayout>
  );
};

export default PlatformPage;
