import React, { useState, useEffect } from 'react';
import Button from '../components/Button';

interface HeaderProps {
  showCta?: boolean;
  simpleMode?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showCta = true, simpleMode = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="container header-container">
        <div className="logo">
          <a href={simpleMode ? "https://piic.com.mx/" : "#inicio"}>
            <img src="/logo.svg" alt="PIIC" className="logo-image" />
          </a>
        </div>

        {simpleMode ? (
          <div className="nav-simple">
            <a href="https://piic.com.mx/" className="simple-link">
              <svg xmlns="http://www.w3.org/2000/svg" className="icon-globe" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
              Ver nuestro sitio web
            </a>
          </div>
        ) : (
          <>
            <nav className="nav">
              <ul className="nav-list">
                <li><a href="#inicio">Inicio</a></li>
                <li><a href="#quienes-somos">Quiénes Somos</a></li>
                <li><a href="#servicios">Servicios</a></li>
                <li><a href="#por-que-piic">Por Qué PIIC</a></li>
                <li><a href="#proceso">Proceso</a></li>
                <li><a href="#contacto">Contacto</a></li>
              </ul>
            </nav>
            {showCta && (
              <div className="nav-cta">
                <Button href="#contacto">Solicitar cotización</Button>
              </div>
            )}
          </>
        )}
      </div>

      <style>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100px;
          background-color: var(--color-primary);
          color: var(--color-white);
          display: flex;
          align-items: center;
          z-index: 1000;
          transition: all 0.3s ease;
        }
        .header-scrolled {
          height: 80px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        .header-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative; /* Context for logo absolute potentially, but flow is better */
        }
        .logo {
            position: relative;
            width: 200px; /* Reserve space to prevent collapse */
            height: 100%;
            display: flex;
            align-items: center; /* Center content vertically in the 100px bar */
        }
        .logo a {
            display: flex;
            align-items: center;
        }
        .logo-image {
            position: absolute;
            height: 180px;
            width: auto;
            top: 0;
            left: 0;
            z-index: 2000;
            transition: all 0.3s ease;
            filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.4));
        }
        .header-scrolled .logo-image {
            height: 120px;
            top: 0;
        }
        .nav-list {
          display: flex;
          gap: 32px;
        }
        .nav-list a {
          font-size: 15px;
          font-weight: 500;
          color: var(--color-white);
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .nav-list a:hover {
          color: var(--color-accent);
        }
        .simple-link {
            display: flex;
            align-items: center;
            gap: 8px; /* Space between icon and text */
            color: var(--color-white);
            font-weight: 600;
            font-size: 15px;
            text-decoration: none; /* No underline */
            transition: all 0.3s ease;
        }
        .simple-link:hover {
            color: var(--color-accent);
        }
        .icon-globe {
            width: 20px;
            height: 20px;
        }
        @media (max-width: 992px) {
          .nav, .nav-cta { display: none; }
        }
      `}</style>
    </header>
  );
};

export default Header;
