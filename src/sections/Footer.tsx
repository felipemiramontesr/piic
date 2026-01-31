import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-info">
            <div className="footer-logo-wrapper">
              <svg
                className="footer-logo-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
              >
                <circle cx="50" cy="50" r="45" fill="#0F2A44" stroke="#F2B705" strokeWidth="10" />
                <path d="M50 5 A45 45 0 0 0 50 95 Z" fill="#F2B705" />
              </svg>
              <h2 className="footer-logo">PIIC</h2>
            </div>
            <p className="footer-description">Proveedora de Insumos Industriales y Comerciales</p>
          </div>
          <div className="footer-nav">
            <h3>Navegación</h3>
            <ul className="footer-nav-list">
              <li><a href="#inicio"><i className="fa-solid fa-house"></i> Inicio</a></li>
              <li><a href="#quienes-somos"><i className="fa-solid fa-users-gear"></i> Quiénes Somos</a></li>
              <li><a href="#servicios"><i className="fa-solid fa-gears"></i> Servicios</a></li>
              <li><a href="#por-que-piic"><i className="fa-solid fa-circle-question"></i> Por Qué PIIC</a></li>
              <li><a href="#proceso"><i className="fa-solid fa-diagram-next"></i> Proceso</a></li>
              <li><a href="#contacto"><i className="fa-solid fa-envelope-open-text"></i> Contacto</a></li>
            </ul>
          </div>
          <div className="footer-contact">
            <h3>Contacto</h3>
            <p>
              <a href="mailto:contacto@piic.com.mx">
                <i className="fa-solid fa-envelope"></i> contacto@piic.com.mx
              </a>
            </p>
            <p>
              <a href="tel:4929421780">
                <i className="fa-solid fa-phone"></i> (492) 942 1780
              </a>
            </p>
            <p className="footer-address">Av. Barones, 209, Colonia Las Americas, Guadalupe, Zacatecas.</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} PIIC. Todos los derechos reservados.</p>
          <p style={{ marginTop: '10px' }}>
            <a href="/politicas" className="footer-policy-link">
              Política de Uso, Tratamiento de Información y Cookies
            </a>
          </p>
        </div>
      </div>

      <style>{`
        .footer {
          background-color: var(--color-secondary);
          color: var(--color-white);
          padding: 60px 0 30px;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 80px;
          margin-bottom: 40px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          padding-bottom: 40px;
        }
        .footer-logo-wrapper {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 10px;
        }
        .footer-logo-icon {
          width: 32px;
          height: 32px;
        }
        .footer-logo {
          color: var(--color-white);
          font-size: 28px;
          margin-bottom: 0;
        }
        .footer-description {
          color: var(--color-white);
        }
        .footer h3 {
          color: var(--color-white);
          margin-bottom: 20px;
        }
        .footer-contact p {
          margin-bottom: 10px;
          color: var(--color-white);
        }
        .footer-address {
          color: var(--color-white);
        }
        .footer-nav-list {
          list-style: none;
          padding: 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px 30px;
        }
        .footer-nav-list li {
          margin-bottom: 0;
        }
        .footer-nav-list a {
          color: var(--color-accent);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .footer-nav-list a:hover {
          color: #d4a004;
          transform: scale(1.03);
        }
        .footer-contact a {
          color: var(--color-accent);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .footer-contact a:hover {
          color: #d4a004; /* Darker yellow */
          transform: scale(1.03);
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .footer-bottom {
          text-align: center;
          color: var(--color-white);
          opacity: 0.8;
          font-size: 14px;
        }
        .footer-bottom p { margin: 0; }
        .footer-policy-link {
          color: var(--color-accent);
          text-decoration: none;
          display: inline-block;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .footer-policy-link:hover {
          color: #d4a004;
          transform: scale(1.03);
        }
      `}</style>
    </footer>
  );
};

export default Footer;
