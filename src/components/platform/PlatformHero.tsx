import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
const HERO_IMG = 'https://d64gsuwffb70l.cloudfront.net/69cd2e1dc76c2b3ecc191d41_1775068613780_2ce167ee.jpg';
const PlatformHero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    requestAnimationFrame(() => {
      el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  }, []);
  const scrollToPassport = () => {
    const el = document.getElementById('tree-passport');
    el?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  const scrollToAccess = () => {
    const el = document.getElementById('platform-preview');
    el?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return <section className="relative min-h-[85vh] sm:min-h-[92vh] flex items-center overflow-hidden bg-white">
      {/* Subtle background accents — matching ZwhHero */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-[#E8854A]/[0.04] to-transparent" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#6BA539]/[0.03] rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

      <div ref={heroRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-0 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 lg:gap-24 items-center">
          {/* Left — Copy */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#E8854A]/10 text-[#E8854A] text-xs sm:text-sm font-medium mb-6 sm:mb-10 border border-[#E8854A]/15 lg:hidden">
              NursiTree Platform
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-gray-900 leading-[1.08] tracking-tight mb-5 sm:mb-8">
              Met NursiTree wordt Nederland steeds{' '}
              <span className="text-[#6BAF3A]">groener.</span>
            </h1>


            <p className="text-base sm:text-lg md:text-xl text-gray-500 leading-relaxed mb-8 sm:mb-12 max-w-lg text-left">
              Voor een succesvolle verplanting is overzicht en inzicht in de status en kwaliteit van de bomen essentieel. Met ons platform creëren we één landelijk kwekerijmanagementsysteem
            </p>


            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button onClick={scrollToAccess} className="px-6 sm:px-8 py-3.5 sm:py-4 bg-[#E8854A] text-white text-sm sm:text-base font-semibold rounded-xl hover:bg-[#D27337] transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                Bekijk het platform
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button onClick={scrollToPassport} className="px-6 sm:px-8 py-3.5 sm:py-4 border-2 border-gray-200 text-gray-700 text-sm sm:text-base font-semibold rounded-xl hover:border-[#E8854A] hover:text-[#E8854A] transition-all duration-200 flex items-center justify-center gap-2">
                Ontdek hoe het werkt
              </button>
            </div>
          </div>

          {/* Right — Hero image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img src={HERO_IMG} alt="Groene stad vanuit de lucht" className="w-full h-[280px] sm:h-[350px] md:h-[400px] lg:h-[520px] object-cover" loading="eager" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Floating card — bottom left */}
            <div className="absolute -bottom-4 sm:-bottom-6 left-2 sm:-left-6 bg-[#6BA539] rounded-xl shadow-xl p-3 sm:p-5 border border-[#6BA539] animate-float hidden sm:block">
              <div className="flex items-center gap-2 sm:gap-3">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white">100%</div>
                  <div className="text-xs sm:text-sm text-white/80">Verplaatsbaar</div>
                </div>
              </div>
            </div>

            {/* Floating card — top right */}
            <div className="absolute -top-4 -right-4 bg-[#E8854A] rounded-xl shadow-xl p-4 border border-[#E8854A] hidden md:block animate-float-slow">
              <div className="flex items-center gap-3">
                <div>
                  <div className="text-xl font-bold text-white">NursiTree</div>
                  <div className="text-xs text-white/80">Slim vergroenen</div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default PlatformHero;