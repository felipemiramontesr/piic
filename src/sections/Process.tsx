import React from 'react';
import { useTranslation } from 'react-i18next';

const Process: React.FC = () => {
  const { t } = useTranslation();

  const steps = [
    {
      number: '01',
      icon: 'fa-file-invoice',
      title: t('process.steps.step1.title'),
      text: t('process.steps.step1.text'),
    },
    {
      number: '02',
      icon: 'fa-magnifying-glass-chart',
      title: t('process.steps.step2.title'),
      text: t('process.steps.step2.text'),
    },
    {
      number: '03',
      icon: 'fa-handshake',
      title: t('process.steps.step3.title'),
      text: t('process.steps.step3.text'),
    },
    {
      number: '04',
      icon: 'fa-truck-fast',
      title: t('process.steps.step4.title'),
      text: t('process.steps.step4.text'),
    },
  ];

  return (
    <section id="proceso" className="section section-white">
      <div className="container">
        <div className="section-header">
          <h2>{t('process.title')}</h2>
          <p>{t('process.subtitle')}</p>
        </div>
        <div className="process-grid">
          {steps.map((step, index) => (
            <div key={index} className="process-step">
              <div className="step-number">
                {step.number}
                <i className={`fa-solid ${step.icon} step-icon`}></i>
              </div>
              <div className="step-content">
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .process-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 40px;
          position: relative;
        }
        .process-step {
          position: relative;
          z-index: 1;
        }
        .step-number {
          font-size: 64px;
          font-weight: 800;
          color: var(--color-bg);
          line-height: 1;
          margin-bottom: 15px;
          display: flex;
          align-items: center;
          gap: 15px;
          transition: all 0.3s ease;
        }
        .step-icon {
          font-size: 32px;
          color: var(--color-accent);
          opacity: 0.5;
          transition: all 0.3s ease;
        }
        .process-step:hover .step-number {
          color: var(--color-accent);
          opacity: 0.3;
        }
        .process-step:hover .step-icon {
          opacity: 1;
          transform: scale(1.1);
        }
        .step-content h3 {
          margin-bottom: 12px;
          position: relative;
          z-index: 2;
        }
        .step-content p {
          color: var(--color-text-secondary);
          font-size: 15px;
        }
      `}</style>
    </section>
  );
};

export default Process;
