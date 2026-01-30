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
            <a href="https://piic.com.mx/" className="simple-link">Ver nuestro sitio web &rarr;</a>
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
          height: 80px;
          background-color: var(--color-primary);
          color: var(--color-white);
          display: flex;
          align-items: center;
          z-index: 1000;
          transition: all 0.3s ease;
        }
        .header-scrolled {
          height: 70px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        .header-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo a {
          display: flex;
          align-items: center;
        }
        .logo-image {
            height: 45px;
            width: auto;
            transition: height 0.3s ease;
        }
        .header-scrolled .logo-image {
            height: 40px;
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
            color: var(--color-white);
            font-weight: 600;
            font-size: 15px;
            text-decoration: none;
            border-bottom: 2px solid var(--color-accent);
            padding-bottom: 2px;
            transition: all 0.3s ease;
        }
        .simple-link:hover {
            color: var(--color-accent);
        }
        @media (max-width: 992px) {
          .nav, .nav-cta { display: none; }
        }
      `}</style>
    </header>
  );
};

export default Header;
