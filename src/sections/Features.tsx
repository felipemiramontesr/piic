import { useTranslation } from 'react-i18next';
import React from 'react';

const Features: React.FC = () => {
  const { t } = useTranslation();

  const featureList = [
    {
      icon: 'fa-solid fa-user-tie',
      title: t('features.list.attention.title'),
      text: t('features.list.attention.text'),
    },
    {
      icon: 'fa-solid fa-clock-rotate-left',
      title: t('features.list.response.title'),
      text: t('features.list.response.text'),
    },
    {
      icon: 'fa-solid fa-building-shield',
      title: t('features.list.suppliers.title'),
      text: t('features.list.suppliers.text'),
    },
    {
      icon: 'fa-solid fa-clipboard-check',
      title: t('features.list.quality.title'),
      text: t('features.list.quality.text'),
    },
    {
      icon: 'fa-solid fa-handshake-angle',
      title: t('features.list.trust.title'),
      text: t('features.list.trust.text'),
    },
  ];

  return (
    <section id="por-que-piic" className="section section-dark">
      <div className="container">
        <div className="section-header-dark">
          <h2>{t('features.title')}</h2>
        </div>
        <div className="features-grid">
          {featureList.map((feature, index) => (
            <div key={index} className="feature-item">
              <i className={`${feature.icon} feature-icon`}></i>
              <div className="feature-content">
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .section-header-dark {
          text-align: center;
          margin-bottom: 60px;
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 40px;
        }

        @media (min-width: 1200px) {
          .features-grid {
            grid-template-columns: repeat(5, 1fr);
            gap: 20px;
          }
        }

        .feature-item {
          display: flex;
          gap: 20px;
        }
        .feature-icon {
          flex-shrink: 0;
          font-size: 24px;
          color: var(--color-accent);
          margin-top: 2px;
        }
        .feature-item h3 {
          margin-bottom: 10px;
          color: var(--color-white);
        }
        .feature-item p {
          color: rgba(255,255,255,0.7);
          font-size: 15px;
          margin: 0;
        }
      `}</style>
    </section>
  );
};

export default Features;
