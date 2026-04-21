import { useTranslation } from 'react-i18next';
import React from 'react';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const currentLang = (i18n.language || 'es').split('-')[0];

  const toggleLanguage = () => {
    const newLang = currentLang === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang);
  };

  return (
    <button className="lang-switcher" onClick={toggleLanguage} aria-label="Toggle Language">
      <i className="fa-solid fa-globe"></i>
      <span className="lang-text">{currentLang === 'es' ? 'EN' : 'ES'}</span>

      <style>{`
        .lang-switcher {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: var(--color-white);
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.3s ease;
          backdrop-filter: blur(5px);
        }
        .lang-switcher:hover {
          background: var(--color-accent);
          color: var(--color-primary);
          border-color: var(--color-accent);
        }
        .lang-switcher i {
          font-size: 16px;
        }
        .lang-text {
          min-width: 20px;
          text-align: center;
        }
        @media (max-width: 768px) {
          .lang-switcher {
            padding: 6px 10px;
            font-size: 12px;
          }
          .lang-text {
            display: block;
          }
        }
      `}</style>
    </button>
  );
};

export default LanguageSwitcher;
