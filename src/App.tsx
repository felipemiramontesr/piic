import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DigitalTransformation from './sections/DigitalTransformation';
import WhatsAppPill from './components/WhatsAppPill';
import CookieBanner from './components/CookieBanner';
import { lazy, Suspense, useState } from 'react';
import Services from './sections/Services';
import Features from './sections/Features';
import Process from './sections/Process';
import Contact from './sections/Contact';
import Header from './sections/Header';
import Footer from './sections/Footer';
import About from './sections/About';
import Hero from './sections/Hero';

// Lazy loaded non-critical pages
const OilSkimmersForm = lazy(() => import('./pages/OilSkimmersForm'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));

// Loading fallback component
export const PageLoader = () => (
  <div
    style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#0F2A44',
      color: '#fff',
    }}
  >
    <div className="loader">Cargando...</div>
  </div>
);

function App() {
  const [showCookieBanner, setShowCookieBanner] = useState(() => {
    const consent = localStorage.getItem('piic_cookie_consent');
    return !consent;
  });

  const handleAcceptCookies = () => {
    localStorage.setItem('piic_cookie_consent', 'true');
    setShowCookieBanner(false);
  };

  return (
    <Router>
      <Routes>
        {/* Main Landing Page */}
        <Route
          path="/"
          element={
            <div className="app-wrapper">
              <Header />
              <main>
                <Hero />
                <About />
                <Services />
                <DigitalTransformation />
                <Features />
                <Process />
                <Contact />
              </main>
              <Footer />
            </div>
          }
        />

        {/* Standalone Technical Form */}
        <Route
          path="/cuestionario-oil-skimmers"
          element={
            <Suspense fallback={<PageLoader />}>
              <OilSkimmersForm />
            </Suspense>
          }
        />

        {/* Privacy Policy */}
        <Route
          path="/politicas"
          element={
            <Suspense fallback={<PageLoader />}>
              <PrivacyPolicy />
            </Suspense>
          }
        />
      </Routes>
      <CookieBanner isVisible={showCookieBanner} onAccept={handleAcceptCookies} />
      <WhatsAppPill isCookieBannerVisible={showCookieBanner} />
    </Router>
  );
}

export default App;
