import React from 'react';
import { ExternalLink, ArrowUpRight } from 'lucide-react';

const PLATFORM_URL = 'https://platform.nursitree.com/';

const PlatformAccess: React.FC = () => {
  return <section id="platform-preview" className="py-24 sm:py-32 bg-[#0a1a0a] relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#6BA539]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#E8854A]/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-[#6BA539] text-sm font-semibold uppercase tracking-[0.2em]">
            Live Platform
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-4 mb-6 tracking-tight">
            Bekijk het platform zelf
          </h2>
          <p className="text-lg text-white/60 leading-relaxed">Wij zijn trots op alle opdrachtgevers die met ons een samenwerking aangaan en vinden het leuk om te laten zien waar onze gepatenteerde Urban Tree Pits staan. Dus iedereen heeft toegang tot het platform. Neem een kijkje en zie meteen waar in Nederland je ze al kan tegenkomen.


Misschien spot je er wel eentje bij jou in de buurt. Kan je meteen even langsrijden om de constructie en boom in het echt te bekijken.
        </p>
        </div>

        {/* Clickable browser-style preview card */}
        <div className="max-w-5xl mx-auto">
          <a
            href={PLATFORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Bekijk live platform in een nieuw tabblad"
            className="group block relative rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-[#6BA539] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a1a0a]"
          >
            <div className="bg-[#1a2e1a] rounded-2xl shadow-2xl border border-white/10 overflow-hidden transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_30px_80px_-20px_rgba(107,165,57,0.35)] group-hover:border-white/20">
              {/* Browser bar */}
              <div className="bg-[#0f1f0f] px-4 sm:px-6 py-3.5 flex items-center gap-3 border-b border-white/10">
                <div className="flex items-center gap-2 shrink-0">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <div className="flex-1 mx-2 sm:mx-4 min-w-0">
                  <div className="bg-white/5 rounded-lg px-3 sm:px-4 py-2 text-xs sm:text-sm text-white/50 max-w-md mx-auto flex items-center gap-2 truncate">
                    <svg className="w-3.5 h-3.5 text-[#6BA539] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span className="truncate">platform.nursitree.com</span>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-white/40 text-xs shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#28c840] animate-pulse" />
                  Live
                </div>
              </div>

              {/* Live iframe preview */}
              <div className="relative bg-white" style={{ aspectRatio: '16 / 10' }}>
                <iframe
                  src={PLATFORM_URL}
                  title="NursiTree Live Platform Preview"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  sandbox="allow-scripts allow-same-origin"
                  className="absolute inset-0 w-full h-full border-0 pointer-events-none select-none"
                />
                {/* Click-shield overlay so the entire card behaves as a single link */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a0a]/30 via-transparent to-transparent transition-opacity duration-500 group-hover:from-[#0a1a0a]/10" />

                {/* Subtle CTA badge */}
                <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6">
                  <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md text-[#0a1a0a] px-4 py-2.5 rounded-full text-sm font-semibold shadow-lg transition-all duration-300 group-hover:bg-[#6BA539] group-hover:text-white group-hover:pr-5">
                    <ExternalLink className="w-4 h-4" />
                    <span>Bekijk live platform</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </div>
            </div>
          </a>
          {/* Glow under browser */}
          <div className="h-32 bg-gradient-to-b from-[#6BA539]/10 to-transparent blur-2xl -mt-16 mx-16 rounded-full pointer-events-none" />
        </div>
      </div>
    </section>;

};
export default PlatformAccess;
