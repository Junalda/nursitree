import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';
const LOGO_URL = 'https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1776912593295_25043f45.png';
const TREE_ICON_URL = 'https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1777965423038_d3ef2ca7.png';
const TONY_IMG = 'https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1778242890851_4ebbc743.JPG';
const GERBRAND_IMG = 'https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1778242888607_6ad0a291.JPG';
const Footer: React.FC = () => {

  return <footer className="bg-[#182418] text-white -mt-px border-t-0">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-x-8 lg:gap-y-12 items-start">

          {/* Brand + Profiles — spans 4/12 on desktop, leaving 8/12 evenly split across the four link columns (each col-span-2) */}
          <div className="min-w-0 sm:col-span-2 lg:col-span-4 max-md:landscape:flex max-md:landscape:flex-row max-md:landscape:items-start max-md:landscape:justify-between max-md:landscape:gap-4">

            {/* Left sub-block: logo + description */}
            <div className="max-md:landscape:flex-1 max-md:landscape:min-w-0">
              <img src="https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1778245620967_d568e05e.png" alt="NursiTree" className="h-10 w-auto object-contain mb-8 max-md:landscape:h-8 max-md:landscape:mb-3" />

              <p className="text-white/70 text-sm leading-relaxed max-w-xs max-md:landscape:text-xs max-md:landscape:max-w-none">
                De schaalbare oplossing voor stedelijke vergroening. Ontworpen voor projectmanagers die resultaat willen zonder complexiteit.
              </p>
            </div>


            {/* Profile Elements — entire block clickable, links to LinkedIn */}
            <div className="mt-8 flex items-start gap-6 max-md:landscape:mt-0 max-md:landscape:gap-3 max-md:landscape:flex-shrink-0">
              {/* NursiTree Company */}
              <a
                href="https://www.linkedin.com/company/nursitree/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Bekijk NursiTree op LinkedIn"
                title="Bekijk op LinkedIn"
                className="group flex flex-col items-center gap-2 cursor-pointer transition-all duration-200 hover:opacity-90 hover:scale-[1.03] max-md:landscape:gap-1"
              >
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center overflow-hidden ring-2 ring-white/10 group-hover:ring-[#0A66C2]/60 transition-colors max-md:landscape:w-9 max-md:landscape:h-9">
                  <img src={TREE_ICON_URL} alt="NursiTree" className="w-7 h-7 object-contain max-md:landscape:w-5 max-md:landscape:h-5" />
                </div>
                <span className="text-white/80 text-xs font-medium leading-none max-md:landscape:text-[10px]">NursiTree</span>
                <Linkedin
                  className="w-5 h-5 text-white/70 group-hover:text-[#0A66C2] transition-colors max-md:landscape:w-4 max-md:landscape:h-4"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </a>

              {/* Tony Hoekstra */}
              <a
                href="https://www.linkedin.com/in/tonyhoekstra/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Bekijk Tony Hoekstra op LinkedIn"
                title="Bekijk op LinkedIn"
                className="group flex flex-col items-center gap-2 cursor-pointer transition-all duration-200 hover:opacity-90 hover:scale-[1.03] max-md:landscape:gap-1"
              >
                <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-white/10 group-hover:ring-[#0A66C2]/60 transition-colors max-md:landscape:w-9 max-md:landscape:h-9">
                  <img src={TONY_IMG} alt="Tony Hoekstra" className="w-full h-full object-cover" />
                </div>
                <span className="text-white/80 text-xs font-medium leading-none max-md:landscape:text-[10px]">Tony</span>
                <Linkedin
                  className="w-5 h-5 text-white/70 group-hover:text-[#0A66C2] transition-colors max-md:landscape:w-4 max-md:landscape:h-4"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </a>

              {/* Gerbrand van de Weerd */}
              <a
                href="https://www.linkedin.com/in/gerbrand-van-de-weerd/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Bekijk Gerbrand van de Weerd op LinkedIn"
                title="Bekijk op LinkedIn"
                className="group flex flex-col items-center gap-2 cursor-pointer transition-all duration-200 hover:opacity-90 hover:scale-[1.03] max-md:landscape:gap-1"
              >
                <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-white/10 group-hover:ring-[#0A66C2]/60 transition-colors max-md:landscape:w-9 max-md:landscape:h-9">
                  <img src={GERBRAND_IMG} alt="Gerbrand van de Weerd" className="w-full h-full object-cover" />
                </div>
                <span className="text-white/80 text-xs font-medium leading-none max-md:landscape:text-[10px]">Gerbrand</span>
                <Linkedin
                  className="w-5 h-5 text-white/70 group-hover:text-[#0A66C2] transition-colors max-md:landscape:w-4 max-md:landscape:h-4"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </a>
            </div>

          </div>



          {/* Column 1: Navigatie — mirrors header main nav */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#E8854A] mb-8">
              Navigatie
            </h4>
            <ul className="space-y-4">
              {[{
              label: 'Zo werkt het',
              path: '/zo-werkt-het'
            }, {
              label: 'Platform',
              path: '/platform'
            }, {
              label: 'Projecten',
              path: '/projecten'
            }, {
              label: 'Over ons',
              path: '/over-ons'
            }].map(link => <li key={link.path}>
                  <Link to={link.path} className="text-white/60 hover:text-[#E8854A] text-sm transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>)}
            </ul>
          </div>

          {/* Column 2: Oplossingen */}
          <div className="lg:col-span-2">

            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#E8854A] mb-8">
              Oplossingen
            </h4>
            <ul className="space-y-4">
              {[{
              label: 'Producten',
              path: '/producten'
            }, {
              label: 'Diensten',
              path: '/diensten'
            }, {
              label: 'Stad als kwekerij',
              path: '/onze-visie#stad-als-boomkwekerij'
            }, {
              label: 'Landelijk platform',
              path: '/platform'
            }].map(item => <li key={item.label}>

                  <Link to={item.path} className="text-white/60 hover:text-[#E8854A] text-sm transition-colors duration-200">
                    {item.label}
                  </Link>
                </li>)}
            </ul>
          </div>

          {/* Column 3: Bedrijf */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#E8854A] mb-8">
              Bedrijf
            </h4>
            <ul className="space-y-4">
              {[{
              label: 'Onze visie',
              path: '/onze-visie'
            }, {
              label: 'Projecten',
              path: '/projecten'
            }, {
              label: 'Contact',
              path: '/#contact-section'
            }].map(item => <li key={item.label}>
                  <Link to={item.path} className="text-white/60 hover:text-[#E8854A] text-sm transition-colors duration-200">
                    {item.label}
                  </Link>
                </li>)}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#E8854A] mb-8">
              Contact
            </h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#E8854A] mt-0.5 flex-shrink-0" />
                <a href="mailto:info@nursitree.com" className="text-white/70 hover:text-white text-sm transition-colors duration-200 break-all">
                  info@nursitree.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#E8854A] mt-0.5 flex-shrink-0" />
                <a href="tel:+31851124060" className="text-white/70 hover:text-white text-sm transition-colors duration-200">+31 (0)85 11 24 060</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#E8854A] mt-0.5 flex-shrink-0" />
                <a href="https://www.google.com/maps/search/?api=1&query=Noordzijdsedreef+10+3257+LL+Ooltgensplaat" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white hover:underline text-sm transition-colors duration-200">
                  Noordzijdsedreef 10<br />
                  <span className="whitespace-nowrap">3257&nbsp;LL&nbsp;Ooltgensplaat</span>
                </a>

              </li>

            </ul>
          </div>
        </div>
      </div>



      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-xs text-center sm:text-left">
              &copy; {new Date().getFullYear()} NursiTree. Alle rechten voorbehouden.
            </p>
            <div className="flex flex-wrap justify-center gap-x-4 sm:gap-x-6 gap-y-1">
              <Link to="/privacyverklaring" className="text-white/40 hover:text-white/70 text-xs transition-colors">
                Privacyverklaring
              </Link>
              <Link to="/algemene-voorwaarden" className="text-white/40 hover:text-white/70 text-xs transition-colors">
                Algemene Voorwaarden
              </Link>
              <Link to="/cookiebeleid" className="text-white/40 hover:text-white/70 text-xs transition-colors">
                Cookiebeleid
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;