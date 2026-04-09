import { useTranslation } from 'react-i18next';
import React from 'react';

const DigitalTransformation: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="transformacion" className="section digital-section">
      <div className="container">
        <div className="section-header tech-header">
          <h2>
            {t('digital.title')} <span className="highlight">{t('digital.highlight')}</span>
          </h2>
          <p>{t('digital.subtitle')}</p>
        </div>

        <div className="digital-cards-grid">
          <div className="digital-card">
            <div className="digital-icon">
              <i className="fa-solid fa-code"></i>
            </div>
            <div className="digital-info">
              <h3>{t('digital.cards.software.title')}</h3>
              <p>{t('digital.cards.software.description')}</p>
            </div>
          </div>

          <div className="digital-card">
            <div className="digital-icon">
              <i className="fa-solid fa-network-wired"></i>
            </div>
            <div className="digital-info">
              <h3>{t('digital.cards.cybersecurity.title')}</h3>
              <p>{t('digital.cards.cybersecurity.description')}</p>
            </div>
          </div>

          <div className="digital-card">
            <div className="digital-icon">
              <i className="fa-solid fa-server"></i>
            </div>
            <div className="digital-info">
              <h3>{t('digital.cards.infrastructure.title')}</h3>
              <p>{t('digital.cards.infrastructure.description')}</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .digital-section {
          background: linear-gradient(135deg, var(--color-primary), #0a1c2e);
          position: relative;
          overflow: hidden;
          padding: 100px 0;
          color: var(--color-white);
        }
        
        .digital-section::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background-image: radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
          z-index: 0;
          opacity: 0.6;
        }

        .digital-section::after {
          content: '';
          position: absolute;
          top: -30%; left: 0;
          width: 100%; height: 160%;
          background: radial-gradient(circle at 50% 50%, rgba(242, 183, 5, 0.05) 0%, transparent 50%);
          z-index: 0;
          pointer-events: none;
        }

        .digital-section .container {
          position: relative;
          z-index: 1;
        }

        .tech-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .tech-header h2 {
          color: var(--color-white);
          font-size: 40px;
          letter-spacing: -0.5px;
        }

        .tech-header h2 .highlight {
          color: var(--color-accent);
        }

        .tech-header p {
          color: rgba(255, 255, 255, 0.8);
          max-width: 650px;
          margin: 0 auto;
          font-size: 18px;
        }

        .digital-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 25px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .digital-card {
           background: rgba(255, 255, 255, 0.03); 
           backdrop-filter: blur(10px);
           -webkit-backdrop-filter: blur(10px);
           padding: 30px 25px;
           border-radius: 16px;
           border: 1px solid rgba(255, 255, 255, 0.08);
           transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
           text-align: center;
           display: flex;
           flex-direction: column;
           align-items: center;
        }

        .digital-card:hover {
          transform: translateY(-10px);
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(242, 183, 5, 0.3);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
        }

        .digital-icon {
          font-size: 32px;
          color: var(--color-accent);
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(242, 183, 5, 0.1);
          border-radius: 20px;
          margin-bottom: 25px;
          transition: transform 0.4s ease;
        }

        .digital-card:hover .digital-icon {
          transform: scale(1.1) rotate(5deg);
          background: rgba(242, 183, 5, 0.2);
        }

        .digital-info h3 {
          font-size: 20px;
          color: var(--color-white);
          margin-bottom: 15px;
          line-height: 1.3;
        }

        .digital-info p {
          color: rgba(255, 255, 255, 0.65);
          line-height: 1.6;
          font-size: 15px;
          margin: 0;
        }

        @media (max-width: 768px) {
          .digital-section {
            padding: 70px 0;
          }
          .tech-header h2 {
            font-size: 32px;
          }
          .digital-cards-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }
        }
      `}</style>
    </section>
  );
};

export default DigitalTransformation;
