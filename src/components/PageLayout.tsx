import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const { pathname, hash } = useLocation();

  const isHomePage = pathname === '/';

  useEffect(() => {
    if (hash) {
      // Small delay to ensure the DOM has rendered the target element
      const timer = setTimeout(() => {
        const el = document.getElementById(hash.replace('#', ''));
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className={`flex-1 flex flex-col ${isHomePage ? '' : 'pt-20'}`}>

        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
