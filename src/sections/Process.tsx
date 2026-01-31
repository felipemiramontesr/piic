import React from 'react';

const Process: React.FC = () => {
  const steps = [
    {
      number: '01',
      icon: 'fa-file-invoice',
      title: 'Recepción de requerimiento',
      text: 'Analizamos sus necesidades específicas de suministro.',
    },
    {
      number: '02',
      icon: 'fa-magnifying-glass-chart',
      title: 'Búsqueda y cotización',
      text: 'Localizamos los mejores insumos con proveedores certificados.',
    },
    {
      number: '03',
      icon: 'fa-handshake',
      title: 'Presentación de opciones',
      text: 'Entregamos una propuesta competitiva en tiempo record.',
    },
    {
      number: '04',
      icon: 'fa-truck-fast',
      title: 'Suministro y seguimiento',
      text: 'Entregamos el material y aseguramos su satisfacción total.',
    },
  ];

  return (
    <section id="proceso" className="section section-white">
      <div className="container">
        <div className="section-header">
          <h2>Nuestro Proceso</h2>
          <p>Un flujo de trabajo optimizado para garantizar su operación.</p>
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
          margin-bottom: -20px;
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
