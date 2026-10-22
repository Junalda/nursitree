import React from 'react';
import { Link } from 'react-router-dom';
import { Download } from 'lucide-react';

interface BesteksDownloadCtaProps {
  /** Extra classes on the wrapping section (e.g. vertical padding). */
  className?: string;
}

/**
 * Compact call-to-action band that points to the besteksposten download
 * (the lead-capture form on the Producten page). Reused on the Zo werkt het
 * and Blog pages so every page has a clear route to the download.
 */
const BesteksDownloadCta: React.FC<BesteksDownloadCtaProps> = ({ className = '' }) => (
  <section className={`bg-white ${className}`}>
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center gap-5 rounded-2xl border border-gray-100 bg-[#f8faf6] px-6 py-8 text-center shadow-sm sm:flex-row sm:justify-between sm:gap-6 sm:text-left">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Besteksposten nodig voor je bestek?</h3>
          <p className="mt-1 text-sm text-gray-500">
            Download de RAW-besteksposten (PDF + RSX) voor het leveren en aanbrengen van de Urban Tree Pit.
          </p>
        </div>
        <Link
          to="/producten#besteksposten"
          className="inline-flex flex-shrink-0 items-center gap-2 rounded-xl bg-[#6BA539] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#5A9030]"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          Download de besteksposten
        </Link>
      </div>
    </div>
  </section>
);

export default BesteksDownloadCta;
