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
          <a href={simpleMode ? 'https://piic.com.mx/' : '#inicio'}>
            <svg className="logo-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="#0F2A44" stroke="#F2B705" strokeWidth="10" />
              <path d="M50 5 A45 45 0 0 0 50 95 Z" fill="#F2B705" />
            </svg>
            <span className="logo-text">PIIC</span>
          </a>
        </div>

        {simpleMode ? (
          <div className="nav-simple">
            <Button href="https://piic.com.mx/" variant="primary">
              <i className="fa-solid fa-arrow-left animated-arrow"></i>
              Ver nuestro sitio web
            </Button>
          </div>
        ) : (
          <>
            <nav className="nav">
              <ul className="nav-list">
                <li>
                  <a href="#inicio">Inicio</a>
                </li>
                <li>
                  <a href="#quienes-somos">Quiénes Somos</a>
                </li>
                <li>
                  <a href="#servicios">Servicios</a>
                </li>
                <li>
                  <a href="#por-que-piic">Por Qué PIIC</a>
                </li>
                <li>
                  <a href="#proceso">Proceso</a>
                </li>
                <li>
                  <a href="#contacto">Contacto</a>
                </li>
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
          background-color: var(--color-primary); /* Match form header color */
          color: var(--color-white);
          display: flex;
          align-items: center;
          z-index: 1000;
          transition: all 0.3s ease;
        }
        .header-scrolled {
          height: 80px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          background-color: #12304d;
        }
        .header-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
        }
        .logo {
            position: relative;
            /* width: 200px;  Removed fixed width to fit text naturally */
            height: 100%;
            display: flex;
            align-items: center;
        }
        .logo a {
            display: flex;
            align-items: center;
            text-decoration: none;
        }
        .logo-text {
            font-size: 32px;
            font-weight: 800;
            color: var(--color-white);
            letter-spacing: 2px;
            text-transform: uppercase;
            font-family: var(--font-main);
            margin-left: 12px;
        }
        .logo-icon {
            width: 36px;
            height: 36px;
        }
        @media (max-width: 768px) {
            .logo-icon {
                width: 28px;
                height: 28px;
            }
            .logo-text {
                font-size: 24px;
                margin-left: 8px;
            }
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
        .nav-simple {
            display: flex;
            align-items: center;
        }
        .animated-arrow {
            display: inline-block;
            margin-right: 10px;
            font-size: 14px;
            animation: arrowSlideCycle 30s infinite linear;
        }
        @keyframes arrowSlideCycle {
            0% { transform: translateX(0); }
            6.66% { transform: translateX(-10px); } /* 2s linear move to left */
            6.67% { transform: translateX(0); } /* Reset instantly and wait */
            100% { transform: translateX(0); } /* 28s pause */
        }
        @media (max-width: 992px) {
          .nav, .nav-cta { display: none; }
        }
      `}</style>
    </header>
  );
};

export default Header;
