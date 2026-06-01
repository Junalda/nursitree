import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryLink?: string;
  secondaryLabel?: string;
  secondaryLink?: string;
  variant?: 'green' | 'orange' | 'white' | 'dark';
}

const CTASection: React.FC<CTASectionProps> = ({
  title = 'Klaar om jouw project te vergroenen?',
  subtitle = 'Ontdek hoe NursiTree past binnen jouw projectplanning, budget en uitvoering.',
  primaryLabel = 'Neem contact op',
  primaryLink = '/#contact-section',


  secondaryLabel = 'Bekijk diensten',
  secondaryLink = '/diensten',
  variant = 'green',
}) => {
  const bgClass =
    variant === 'green'
      ? 'bg-gradient-to-br from-[#6BA539] to-[#4E8A25]'
      : variant === 'orange'
      ? 'bg-gradient-to-br from-[#E8854A] to-[#D27337]'
      : variant === 'dark'
      ? 'bg-[#182418]'
      : 'bg-gray-50';

  const textClass = variant === 'white' ? 'text-gray-900' : 'text-white';
  const subtextClass = variant === 'white' ? 'text-gray-600' : 'text-white/80';

  const primaryBtnClass =
    variant === 'white'
      ? 'bg-[#E8854A] text-white hover:bg-[#D27337]'
      : variant === 'orange'
      ? 'bg-white text-[#E8854A] hover:bg-gray-50'
      : 'bg-white text-[#6BA539] hover:bg-gray-50';

  return (
    <section className={`${bgClass} relative overflow-hidden`}>
      {/* Diagonal accent */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-1/2 -right-1/4 w-full h-full bg-white/10 rotate-12 transform" />
        <div className="absolute -bottom-1/2 -left-1/4 w-full h-full bg-white/5 -rotate-12 transform" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center relative z-10">
        <h2
          className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${textClass} mb-8 leading-tight tracking-tight`}
        >
          {title}
        </h2>
        <p className={`text-lg ${subtextClass} mb-12 max-w-2xl mx-auto leading-relaxed`}>
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to={primaryLink}
            className={`px-8 py-4 rounded-xl text-base font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 ${primaryBtnClass}`}
          >
            {primaryLabel}
            <ArrowRight className="w-5 h-5" />
          </Link>
          {secondaryLabel && (
            <Link
              to={secondaryLink!}
              className={`px-8 py-4 rounded-xl text-base font-semibold transition-all duration-200 border-2 ${
                variant === 'white'
                  ? 'border-gray-300 text-gray-700 hover:border-[#E8854A] hover:text-[#E8854A]'
                  : 'border-white/30 text-white hover:border-white hover:bg-white/10'
              }`}
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTASection;
