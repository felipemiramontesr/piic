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
                <circle cx="50" cy="50" r="45" fill="#0F2A44" stroke="#F2B705" stroke-width="10" />
                <path d="M50 5 A45 45 0 0 0 50 95 Z" fill="#F2B705" />
              </svg>
              <h2 className="footer-logo">PIIC</h2>
            </div>
            <p>Proveedora de Insumos Industriales y Comerciales</p>
          </div>
          <div className="footer-contact">
            <h3>Contacto</h3>
            <p>
              Email: <a href="mailto:contacto@piic.com.mx">contacto@piic.com.mx</a>
            </p>
            <p>
              Tel: <a href="tel:4929421780">(492) 942 1780</a>
            </p>
            <p>Av. Barones, 209, Colonia Las Americas, Guadalupe Zacatecas</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} PIIC. Todos los derechos reservados.</p>
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
          gap: 40px;
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
        .footer h3 {
          color: var(--color-white);
          margin-bottom: 20px;
        }
        .footer-contact p {
          color: rgba(255,255,255,0.7);
          margin-bottom: 10px;
        }
        .footer-contact a {
          color: inherit;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .footer-contact a:hover {
          color: var(--color-accent);
        }
        .footer-bottom {
          text-align: center;
          color: rgba(255,255,255,0.5);
          font-size: 14px;
        }
        .footer-bottom p { margin: 0; }
      `}</style>
    </footer>
  );
};

export default Footer;
