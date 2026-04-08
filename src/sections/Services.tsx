import React from 'react';
import { useTranslation } from 'react-i18next';

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description }) => (
  <div className="glass-card service-card">
    <div className="service-icon">
      <i className={icon}></i>
    </div>
    <h3>{title}</h3>
    <p>{description}</p>
    <style>{`
      .service-card {
        text-align: center;
        height: 100%;
        padding: 45px 30px;
      }
      .service-icon {
        font-size: 42px;
        margin-bottom: 25px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 90px;
        height: 90px;
        background-color: var(--color-bg);
        color: var(--color-primary);
        border-radius: 50%;
      }
      .service-card h3 {
        margin-bottom: 18px;
        font-size: 20px;
      }
      .service-card p {
        font-size: 16px;
        color: var(--color-text-secondary);
        margin-bottom: 0;
        line-height: 1.6;
      }
    `}</style>
  </div>
);

const Services: React.FC = () => {
  const { t } = useTranslation();

  const serviceList = [
    {
      icon: 'fa-solid fa-shield-halved',
      title: t('services.list.industrial_safety.title'),
      description: t('services.list.industrial_safety.description'),
    },
    {
      icon: 'fa-solid fa-broom',
      title: t('services.list.cleaning.title'),
      description: t('services.list.cleaning.description'),
    },
    {
      icon: 'fa-solid fa-folder-open',
      title: t('services.list.stationery.title'),
      description: t('services.list.stationery.description'),
    },
    {
      icon: 'fa-solid fa-briefcase',
      title: t('services.list.commercial.title'),
      description: t('services.list.commercial.description'),
    },
    {
      icon: 'fa-solid fa-screwdriver-wrench',
      title: t('services.list.operation.title'),
      description: t('services.list.operation.description'),
    },
    {
      icon: 'fa-solid fa-truck-fast',
      title: t('services.list.automotive.title'),
      description: t('services.list.automotive.description'),
    },
  ];

  return (
    <section id="servicios" className="section">
      <div className="container">
        <div className="section-header">
          <h2>{t('services.title')}</h2>
          <p>{t('services.subtitle')}</p>
        </div>
        <div className="services-grid">
          {serviceList.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>

      <style>{`
        .section-header {
          text-align: center;
          margin-bottom: 50px;
        }
        .section-header h2 {
          margin-bottom: 15px;
        }
        .section-header p {
          color: var(--color-text-secondary);
        }
        
        .services-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 15px;
        }

        .service-card {
          text-align: center;
          height: 100%;
          padding: 35px 15px;
          transition: transform 0.3s ease;
        }

        .service-icon {
          font-size: 32px;
          margin-bottom: 20px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 70px;
          height: 70px;
          background-color: var(--color-bg);
          color: var(--color-primary);
          border-radius: 50%;
        }

        .service-card h3 {
          margin-bottom: 12px;
          font-size: 16px;
        }

        .service-card p {
          font-size: 13px;
          color: var(--color-text-secondary);
          margin-bottom: 0;
          line-height: 1.4;
        }

        @media (max-width: 1200px) {
          .services-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
          }
        }
        
        @media (max-width: 768px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
          }
        }

        @media (max-width: 480px) {
          .services-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default Services;
