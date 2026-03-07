import React, { useState, useEffect } from 'react';
import Button from '../components/Button';

interface HeaderProps {
  showCta?: boolean;
  simpleMode?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showCta = true, simpleMode = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="container header-container">
        <div className="logo">
          <a href={simpleMode ? 'https://piic.com.mx/' : '#inicio'}>
            <svg className="logo-icon animated-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
              <defs>
                <clipPath id="logoMask">
                  <circle cx="50" cy="50" r="45" />
                </clipPath>
              </defs>
              {/* Capa 1: Base (Logo Original) */}
              <rect x="0" y="0" width="100" height="100" fill="#F2B705" clipPath="url(#logoMask)" />
              <rect x="0" y="0" width="50" height="100" fill="#0F2A44" clipPath="url(#logoMask)" />

              {/* Capa 2: Fase 2 - Sol crece desde el centro hacia la izquierda */}
              <rect className="sun-grow-left-v5" x="50" y="0" width="0" height="100" fill="#F2B705" clipPath="url(#logoMask)" />

              {/* Capa 3: Fase 3 - Luna Llena entra desde la derecha */}
              <rect className="luna-full-rl-v5" x="100" y="0" width="100" height="100" fill="#0F2A44" clipPath="url(#logoMask)" />

              {/* Capa 4: Fase 4 - Sol Restauración entra desde la derecha */}
              <rect className="sol-half-rl-v5" x="100" y="0" width="50" height="100" fill="#F2B705" clipPath="url(#logoMask)" />

              {/* Borde Amarillo (Estatico) */}
              <circle cx="50" cy="50" r="45" fill="none" stroke="#F2B705" strokeWidth="10" />
            </svg>
            <span className="logo-text">PIIC</span>
          </a>
        </div>

        {simpleMode ? (
          <div className="nav-simple">
            <Button href="https://piic.com.mx/" variant="primary">
              <i className="fa-solid fa-arrow-left animated-arrow"></i>
              <span className="desktop-text">Ver nuestro sitio web</span>
              <span className="mobile-text">Ver Sitio Web</span>
            </Button>
          </div>
        ) : (
          <>
            <nav className="nav">
              <ul className="nav-list">
                <li><a href="#inicio"><i className="fa-solid fa-house"></i> Inicio</a></li>
                <li><a href="#quienes-somos"><i className="fa-solid fa-users-gear"></i> Quiénes Somos</a></li>
                <li className="dropdown">
                  <a href="#servicios"><i className="fa-solid fa-gears"></i> Servicios <i className="fa-solid fa-chevron-down" style={{ fontSize: '10px', marginLeft: '5px' }}></i></a>
                  <ul className="dropdown-menu">
                    <li><a href="#servicios">Servicios Industriales</a></li>
                    <li><a href="#transformacion">Transformación Digital</a></li>
                  </ul>
                </li>
                <li><a href="#por-que-piic"><i className="fa-solid fa-circle-question"></i> Por Qué PIIC</a></li>
                <li><a href="#proceso"><i className="fa-solid fa-diagram-next"></i> Proceso</a></li>
                <li><a href="#contacto"><i className="fa-solid fa-envelope-open-text"></i> Contacto</a></li>
              </ul>
            </nav>

            <div className="header-actions">
              {showCta && (
                <div className="nav-cta">
                  <Button href="#contacto">Solicitar cotización</Button>
                </div>
              )}

              {/* Hamburger Trigger */}
              <button
                className={`menu-trigger ${isMenuOpen ? 'active' : ''}`}
                onClick={toggleMenu}
                aria-label="Menu"
              >
                <i className={`fa-solid ${isMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
              </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
              <div className="mobile-menu-content">
                <nav className="mobile-nav">
                  <ul className="mobile-nav-list">
                    <li><a href="#inicio" onClick={closeMenu}><i className="fa-solid fa-house"></i> Inicio</a></li>
                    <li><a href="#quienes-somos" onClick={closeMenu}><i className="fa-solid fa-users-gear"></i> Quiénes Somos</a></li>
                    <li className="mobile-dropdown">
                      <div className="mobile-dropdown-header" onClick={() => setIsServicesOpen(!isServicesOpen)}>
                        <span><i className="fa-solid fa-gears"></i> Servicios</span>
                        <i className={`fa-solid fa-chevron-down toggle-icon ${isServicesOpen ? 'open' : ''}`}></i>
                      </div>
                      <ul className={`mobile-dropdown-menu ${isServicesOpen ? 'open' : ''}`}>
                        <li><a href="#servicios" onClick={closeMenu}><i className="fa-solid fa-industry"></i> Industriales</a></li>
                        <li><a href="#transformacion" onClick={closeMenu}><i className="fa-solid fa-microchip"></i> Digital</a></li>
                      </ul>
                    </li>
                    <li><a href="#por-que-piic" onClick={closeMenu}><i className="fa-solid fa-circle-question"></i> Por Qué PIIC</a></li>
                    <li><a href="#proceso" onClick={closeMenu}><i className="fa-solid fa-diagram-next"></i> Proceso</a></li>
                    <li><a href="#contacto" onClick={closeMenu}><i className="fa-solid fa-envelope-open-text"></i> Contacto</a></li>
                  </ul>
                </nav>
                {showCta && (
                  <div className="mobile-cta">
                    <Button href="#contacto" onClick={closeMenu} fullWidth>
                      Solicitar cotización
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      <style>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
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
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .nav-list a:hover {
          color: var(--color-accent);
        }
        
        /* Desktop Dropdown Styles */
        .dropdown {
          position: relative;
        }
        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          background-color: var(--color-white);
          min-width: 250px;
          border-radius: 8px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          padding: 10px 0;
          opacity: 0;
          visibility: hidden;
          transform: translateY(10px);
          transition: all 0.3s ease;
          list-style: none;
        }
        .dropdown:hover .dropdown-menu {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
        .dropdown-menu li {
          margin: 0;
        }
        .dropdown-menu a {
          color: var(--color-primary) !important;
          padding: 12px 20px;
          display: block;
          font-weight: 500;
        }
        .dropdown-menu a:hover {
          background-color: rgba(242, 183, 5, 0.1);
          color: var(--color-primary) !important;
        }
        .header-actions {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .menu-trigger {
          display: none;
          background: none;
          border: none;
          color: var(--color-white);
          font-size: 24px;
          cursor: pointer;
          z-index: 1001;
          transition: all 0.3s ease;
          padding: 5px;
        }
        .menu-trigger.active {
          color: var(--color-accent);
          transform: rotate(90deg);
        }
        .mobile-menu {
          position: fixed;
          top: 0;
          right: 0;
          width: 100%;
          height: 100vh;
          background-color: rgba(15, 42, 68, 0.98);
          backdrop-filter: blur(10px);
          z-index: 999;
          transform: translateX(100%);
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          justify-content: flex-end;
          visibility: hidden;
        }
        .mobile-menu.open {
          transform: translateX(0);
          visibility: visible;
        }
        .mobile-menu-content {
          width: 80%;
          height: 100%;
          background: var(--color-primary);
          padding: 120px 40px;
          box-shadow: -10px 0 30px rgba(0,0,0,0.3);
          display: flex;
          flex-direction: column;
        }
        .mobile-nav-list {
          list-style: none;
          padding: 0;
          margin-bottom: 40px;
        }
        .mobile-nav-list li {
          margin-bottom: 25px;
          opacity: 0;
          transform: translateX(20px);
          transition: all 0.3s ease;
        }
        .mobile-menu.open .mobile-nav-list li {
          opacity: 1;
          transform: translateX(0);
        }
        /* Delay each menu item for stagger effect */
        .mobile-nav-list li:nth-child(1) { transition-delay: 0.1s; }
        .mobile-nav-list li:nth-child(2) { transition-delay: 0.15s; }
        .mobile-nav-list li:nth-child(3) { transition-delay: 0.2s; }
        .mobile-nav-list li:nth-child(4) { transition-delay: 0.25s; }
        .mobile-nav-list li:nth-child(5) { transition-delay: 0.3s; }
        .mobile-nav-list li:nth-child(6) { transition-delay: 0.35s; }

        .mobile-nav-list a {
          color: var(--color-white);
          text-decoration: none;
          font-size: 20px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 15px;
          transition: color 0.3s ease;
        }
        .mobile-nav-list a i {
          color: var(--color-accent);
          width: 25px;
          text-align: center;
        }
        .mobile-nav-list a:hover {
          color: var(--color-accent);
        }
        
        /* Mobile Dropdown Styles */
        .mobile-dropdown-header {
          color: var(--color-white);
          font-size: 20px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-right: 20px;
          cursor: pointer;
          transition: color 0.3s ease;
        }
        .mobile-dropdown-header span {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .mobile-dropdown-header span i {
          color: var(--color-accent);
          width: 25px;
          text-align: center;
        }
        .mobile-dropdown-header:hover {
          color: var(--color-accent);
        }
        .toggle-icon {
          font-size: 16px !important;
          transition: transform 0.3s ease;
          color: var(--color-white);
        }
        .toggle-icon.open {
          transform: rotate(180deg);
        }
        .mobile-dropdown-menu {
          list-style: none;
          padding: 0;
          padding-left: 40px;
          margin-top: 15px;
          display: none;
        }
        .mobile-dropdown-menu.open {
          display: block;
        }
        .mobile-dropdown-menu li {
          margin-bottom: 20px !important;
          opacity: 1 !important;
          transform: none !important;
        }
        .mobile-dropdown-menu a {
          font-size: 17px !important;
          font-weight: 400 !important;
        }
        .mobile-dropdown-menu a i {
          width: 20px !important;
        }
        .mobile-cta {
          margin-top: auto;
          opacity: 0;
          transition: all 0.3s ease 0.4s;
        }
        .mobile-menu.open .mobile-cta {
          opacity: 1;
        }
        .nav-simple {
            display: flex;
            align-items: center;
        }
        .animated-arrow {
            display: inline-block;
            margin-right: 10px;
            font-size: 14px;
            animation: arrowSlideCycle 7s infinite linear;
        }
        @keyframes arrowSlideCycle {
            0% { transform: translateX(0); }
            28.57% { transform: translateX(-10px); }
            28.58% { transform: translateX(0); }
            100% { transform: translateX(0); }
        }
        .logo-icon.animated-logo {
            overflow: visible;
        }
        .sun-grow-left-v5 {
            animation: sunGrowLeftV5 30s infinite linear;
        }
        .luna-full-rl-v5 {
            animation: lunaFullRLV5 30s infinite linear;
        }
        .sol-half-rl-v5 {
            animation: solHalfRLV5 30s infinite linear;
        }

        @keyframes sunGrowLeftV5 {
            /* 0-3s: Reposo, invisible */
            0%, 10% { x: 50px; width: 0; }
            /* 3-4.5s: Crece a la izquierda */
            15% { x: 0px; width: 50px; }
            /* Se mantiene para cubrir la base */
            15.01%, 100% { x: 0px; width: 50px; }
        }

        @keyframes lunaFullRLV5 {
            /* 0-4.5s: Fuera */
            0%, 15% { x: 100px; }
            /* 4.5-7.5s: Cubre todo */
            25% { x: 0px; }
            /* Se mantiene */
            25.01%, 100% { x: 0px; }
        }

        @keyframes solHalfRLV5 {
            /* 0-7.5s: Fuera */
            0%, 25% { x: 100px; }
            /* 7.5-9s: Entra a la mitad */
            30% { x: 50px; }
            /* Reposo largo */
            30.01%, 100% { x: 50px; }
        }

        @media (max-width: 1024px) {
          .nav, .nav-cta { display: none; }
          .menu-trigger { display: block; }
          .desktop-text { display: none; }
          .mobile-text { display: inline; }
        }
        @media (min-width: 1025px) {
          .mobile-text { display: none; }
        }
        @media (max-width: 480px) {
          .mobile-menu-content {
            width: 100%;
            padding: 100px 30px;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
