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
        <button className="cookie-button" onClick={onAccept}>
          {t('cookies.accept')}
        </button>
      </div>

      <style>{`
        .cookie-banner {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: var(--color-accent);
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
          color: var(--color-primary);
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
        
        .cookie-copy-text {
          font-weight: 700;
        }

        .cookie-button {
          background-color: var(--color-primary);
          color: var(--color-accent);
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
          .cookie-banner {
            padding: 12px 16px;
          }
          .cookie-container {
            flex-direction: column;
            text-align: center;
            gap: 10px;
          }
          .cookie-text {
            font-size: 13px;
          }
          .cookie-button {
            width: 100%;
            padding: 6px 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default CookieBanner;
