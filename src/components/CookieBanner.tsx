import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CookieBanner: React.FC = () => {
    const [isVisible, setIsVisible] = useState(() => {
        const consent = localStorage.getItem('piic_cookie_consent');
        return !consent;
    });

    const handleAccept = () => {
        localStorage.setItem('piic_cookie_consent', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="cookie-banner">
            <div className="cookie-container">
                <div className="cookie-text">
                    Utilizamos cookies propias y de terceros para mejorar su experiencia. Al continuar navegando, acepta nuestra{' '}
                    <Link to="/politicas" className="cookie-link">
                        política de uso, tratamiento de información y cookies
                    </Link>.
                </div>
                <button className="cookie-button" onClick={handleAccept}>
                    ACEPTAR
                </button>
            </div>

            <style>{`
        .cookie-banner {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          background-color: var(--color-accent); /* Amarillo PIIC */
          padding: 16px 24px;
          z-index: 9999;
          box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.1);
          animation: slideUp 0.5s ease-out;
        }

        .cookie-container {
          max-width: var(--container-max-width);
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .cookie-text {
          color: var(--color-primary); /* Azul PIIC */
          font-size: 14px;
          line-height: 1.4;
          font-weight: 500;
        }

        .cookie-link {
          color: var(--color-primary);
          text-decoration: underline;
          font-weight: 700;
        }

        .cookie-link:hover {
          opacity: 0.8;
        }

        .cookie-button {
          background-color: var(--color-primary); /* Azul PIIC */
          color: var(--color-accent); /* Amarillo PIIC */
          border: none;
          padding: 8px 24px;
          border-radius: 4px;
          font-weight: 700;
          font-size: 14px;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .cookie-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .cookie-container {
            flex-direction: column;
            text-align: center;
          }
          .cookie-button {
            width: 100%;
          }
        }
      `}</style>
        </div>
    );
};

export default CookieBanner;
