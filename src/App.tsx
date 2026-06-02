
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Index from "./pages/Index";
import DienstenPage from "./pages/DienstenPage";
import VisiePage from "./pages/VisiePage";
import OverOnsPage from "./pages/OverOnsPage";
import PlatformPage from "./pages/PlatformPage";
import ZoWerktHetPage from "./pages/ZoWerktHetPage";
import ProductenPage from "./pages/ProductenPage";
import ProjectenPage from "./pages/ProjectenPage";
import AlgemeneVoorwaardenPage from "./pages/AlgemeneVoorwaardenPage";
import PrivacyverklaringPage from "./pages/PrivacyverklaringPage";
import CookiebeleidPage from "./pages/CookiebeleidPage";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="light">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/diensten" element={<DienstenPage />} />
            <Route path="/onze-visie" element={<VisiePage />} />
            <Route path="/over-ons" element={<OverOnsPage />} />
            <Route path="/platform" element={<PlatformPage />} />
            <Route path="/zo-werkt-het" element={<ZoWerktHetPage />} />
            <Route path="/producten" element={<ProductenPage />} />
            <Route path="/projecten" element={<ProjectenPage />} />
            <Route path="/algemene-voorwaarden" element={<AlgemeneVoorwaardenPage />} />
            <Route path="/privacyverklaring" element={<PrivacyverklaringPage />} />
            <Route path="/cookiebeleid" element={<CookiebeleidPage />} />
            <Route path="*" element={<NotFound />} />


          </Routes>
        </BrowserRouter>
        <Analytics />
        <SpeedInsights />
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;

