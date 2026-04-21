import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import React from 'react';

interface CookieBannerProps {
  isVisible: boolean;
  onAccept: () => void;
}

const CookieBanner: React.FC<CookieBannerProps> = ({ isVisible, onAccept }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const isPolicyPage = location.pathname === '/politicas';

  if (!isVisible) return null;

  return (
    <div className="cookie-banner">
      <div className="cookie-container">
        <div className="cookie-text-wrapper">
          <div className="cookie-text">
            {t('cookies.text').split(t('cookies.policy_link_text'))[0]}
            {isPolicyPage ? (
              <span className="cookie-copy-text">{t('cookies.policy_link_text')}</span>
            ) : (
              <Link to="/politicas" className="cookie-link">
                {t('cookies.policy_link_text')}
              </Link>
            )}
            {t('cookies.text').split(t('cookies.policy_link_text'))[1]}
          </div>
        </div>
        <div className="cookie-buttons">
          <button className="cookie-button cookie-button-secondary" onClick={onAccept}>
            {t('cookies.reject')}
          </button>
          <button className="cookie-button cookie-button-primary" onClick={onAccept}>
            {t('cookies.accept')}
          </button>
        </div>
      </div>

      <style>{`
        .cookie-banner {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: var(--color-accent);
          border-top: 1px solid var(--color-primary);
          padding: 24px 0;
          z-index: 9999;
          box-shadow: 0 -4px 25px rgba(0, 0, 0, 0.2);
          animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cookie-container {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 40px;
          gap: 60px;
        }

        .cookie-text-wrapper {
          flex: 1;
          display: flex;
          align-items: center;
        }

        .cookie-text {
          color: var(--color-primary);
          font-size: 14px;
          line-height: 1.2;
          font-weight: 500;
          white-space: nowrap;
        }

        .cookie-link {
          color: var(--color-primary);
          text-decoration: underline;
          text-underline-offset: 3px;
          font-weight: 600;
          transition: opacity 0.3s ease;
        }

        .cookie-link:hover {
          opacity: 0.7;
        }
        
        .cookie-copy-text {
          font-weight: 600;
        }

        .cookie-buttons {
          display: flex;
          gap: 16px;
          align-items: center;
        }

        .cookie-button {
          padding: 12px 32px;
          border-radius: 2px;
          font-weight: 900;
          font-size: 14px;
          letter-spacing: 0.8px;
          transition: all 0.3s ease;
          white-space: nowrap;
          text-transform: uppercase;
          cursor: pointer;
        }

        .cookie-button-primary {
          background-color: var(--color-primary);
          color: var(--color-white);
          border: 2px solid var(--color-primary);
        }

        .cookie-button-primary:hover {
          background-color: transparent;
          color: var(--color-primary);
        }

        .cookie-button-secondary {
          background-color: transparent;
          color: var(--color-primary);
          border: 2px solid var(--color-primary);
        }

        .cookie-button-secondary:hover {
          background-color: var(--color-primary);
          color: var(--color-white);
        }

        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }

        @media (max-width: 1200px) {
          .cookie-text {
            white-space: normal;
          }
           .cookie-container {
            gap: 30px;
            padding: 0 24px;
          }
        }

        @media (max-width: 768px) {
          .cookie-banner {
            padding: 20px 0;
          }
          .cookie-container {
            flex-direction: column;
            text-align: center;
            gap: 24px;
          }
          .cookie-text {
            font-size: 14px;
            white-space: normal;
          }
          .cookie-buttons {
            width: 100%;
            flex-direction: column;
            gap: 12px;
          }
          .cookie-button {
            width: 100%;
            padding: 14px 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default CookieBanner;
