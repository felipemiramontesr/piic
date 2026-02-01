import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './sections/Header';
import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/Services';
import Features from './sections/Features';
import Process from './sections/Process';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import CookieBanner from './components/CookieBanner';

// Lazy loaded non-critical pages
const OilSkimmersForm = lazy(() => import('./pages/OilSkimmersForm'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));

// Loading fallback component
const PageLoader = () => (
  <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0F2A44', color: '#fff' }}>
    <div className="loader">Cargando...</div>
  </div>
);

function App() {
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
                <Features />
                <Process />
                <Contact />
              </main>
              <Footer />
            </div>
          }
        />

        {/* Standalone Technical Form */}
        <Route path="/cuestionario-oil-skimmers" element={
          <Suspense fallback={<PageLoader />}>
            <OilSkimmersForm />
          </Suspense>
        } />

        {/* Privacy Policy */}
        <Route path="/politicas" element={
          <Suspense fallback={<PageLoader />}>
            <PrivacyPolicy />
          </Suspense>
        } />
      </Routes>
      <CookieBanner />
    </Router>
  );
}

export default App;
