import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, TreePine } from "lucide-react";

const LOGO_URL = 'https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1775054327617_3e9d5fc0.png';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f0f7eb] via-white to-[#fef5ef]">
      <div className="text-center p-12 max-w-md">
        <Link to="/" className="inline-block mb-8">
          <img src={LOGO_URL} alt="NursiTree" className="h-10 w-auto mx-auto" />
        </Link>
        <div className="w-20 h-20 rounded-2xl bg-[#6BA539]/10 flex items-center justify-center mx-auto mb-6">
          <TreePine className="w-10 h-10 text-[#6BA539]" />
        </div>
        <h1 className="text-6xl font-bold text-[#6BA539] mb-4">404</h1>
        <p className="text-xl text-gray-700 mb-2 font-semibold">Pagina niet gevonden</p>
        <p className="text-gray-500 mb-8">
          De pagina die u zoekt bestaat niet of is verplaatst.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#6BA539] text-white font-semibold rounded-xl hover:bg-[#5A9030] transition-colors shadow-md"
        >
          <ArrowLeft className="w-5 h-5" />
          Terug naar home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
