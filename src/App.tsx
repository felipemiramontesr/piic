import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './sections/Header';
import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/Services';
import Features from './sections/Features';
import Process from './sections/Process';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import OilSkimmersForm from './pages/OilSkimmersForm';
import './App.css';

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
        <Route path="/cuestionario-oil-skimmers" element={<OilSkimmersForm />} />
      </Routes>
    </Router>
  );
}

export default App;
