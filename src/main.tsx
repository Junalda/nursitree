
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// The production build is prerendered to static HTML (see scripts/prerender.mjs)
// so crawlers and the initial paint get full page content. On the client we do a
// normal createRoot render: React replaces the prerendered markup with an
// identical client render. We intentionally do NOT hydrate — a browser DOM
// snapshot lacks React's text-node hydration markers, which would otherwise
// cause harmless-but-noisy hydration mismatches. Result: clean console, same UI.
createRoot(document.getElementById("root")!).render(<App />);
