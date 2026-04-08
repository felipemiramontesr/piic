import React from 'react';
import Button from '../components/Button';
import { useTranslation } from 'react-i18next';

const Hero: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section id="inicio" className="hero-section">
      <div className="container hero-container">
        <div className="hero-content">
          <h1>{t('hero.title')}</h1>
          <p className="hero-subtitle">
            {t('hero.subtitle')}
          </p>
          <div className="hero-actions">
            <Button href="#contacto" className="hero-btn">
              {t('hero.cta_quote')}
            </Button>
            <Button href="#servicios" variant="outline" className="hero-btn">
              {t('hero.cta_services')}
            </Button>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          position: relative;
          background-image: linear-gradient(rgba(15, 42, 68, 0.9), rgba(15, 42, 68, 0.75)), url('/assets/hero-bg.png');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          color: var(--color-white);
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding-top: 80px;
          text-align: left;
        }
        .hero-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 20% 50%, rgba(242, 183, 5, 0.05), transparent 40%);
          pointer-events: none;
        }
        .hero-container {
          display: flex;
          align-items: center;
        }
        .hero-content {
          max-width: 800px;
        }
        .hero-content h1 {
          color: var(--color-white);
          margin-bottom: 24px;
        }
        .hero-subtitle {
          font-size: 20px;
          color: #E5E7EB;
          margin-bottom: 40px;
          font-weight: 400;
        }
        .hero-actions {
          display: flex;
          gap: 20px;
        }
        .hero-btn {
          min-width: 200px;
        }
        @media (max-width: 768px) {
          .hero-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
