import { useTranslation } from 'react-i18next';
import React from 'react';

const About: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section id="quienes-somos" className="section section-white">
      <div className="container">
        <div className="about-grid">
          <div className="about-text">
            <h2>{t('about.title')}</h2>
            <p>{t('about.p1')}</p>
            <p>{t('about.p2')}</p>
          </div>
          <div className="about-image">
            <img
              src="/assets/about-img.png"
              alt="Operación Industrial"
              className="industrial-img"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }
        .about-text h2 {
          margin-bottom: 24px;
          position: relative;
          padding-bottom: 12px;
        }
        .about-text h2::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 50px;
          height: 4px;
          background-color: var(--color-accent);
        }
        .about-text p {
          color: var(--color-text-secondary);
          margin-bottom: 20px;
          text-align: justify;
        }
        
        .industrial-img {
          width: 100%;
          height: auto;
          border-radius: 8px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          border: 1px solid var(--color-border);
        }
        @media (max-width: 992px) {
          .about-grid { grid-template-columns: 1fr; gap: 40px; }
        }
      `}</style>
    </section>
  );
};

export default About;
