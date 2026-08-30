import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initMetaPixel } from './lib/metaPixel'

// No-op unless VITE_META_PIXEL_ID is set at build time.
initMetaPixel();

createRoot(document.getElementById("root")!).render(<App />);
