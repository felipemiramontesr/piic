import React from 'react';

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
        margin-bottom: 15px;
        font-size: 18px;
      }
      .service-card p {
        font-size: 14px;
        color: var(--color-text-secondary);
        margin-bottom: 0;
      }
    `}</style>
  </div>
);

const Services: React.FC = () => {
  const serviceList = [
    {
      icon: 'fa-solid fa-shield-halved',
      title: 'Seguridad industrial',
      description: 'Equipos de protección personal y sistemas de seguridad vial.',
    },
    {
      icon: 'fa-solid fa-broom',
      title: 'Limpieza y sanitización',
      description: 'Productos químicos y herramientas para mantenimiento de higiene.',
    },
    {
      icon: 'fa-solid fa-folder-open',
      title: 'Papelería y suministros de oficina',
      description: 'Todo lo necesario para la administración diaria.',
    },
    {
      icon: 'fa-solid fa-briefcase',
      title: 'Insumos comerciales',
      description: 'Materiales diversos para la operación comercial.',
    },
    {
      icon: 'fa-solid fa-screwdriver-wrench',
      title: 'Operación y mantenimiento',
      description: 'Herramientas y refacciones críticas para sus equipos.',
    },
  ];

  return (
    <section id="servicios" className="section">
      <div className="container">
        <div className="section-header">
          <h2>Servicios Industriales</h2>
          <p>Soluciones integrales diseñadas para el rigor y operación de su empresa.</p>
        </div>
        <div className="services-grid">
          {serviceList.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>

        {/* Sección de Transformación Digital (Propuesta 2) */}
        <div className="digital-banner">
          <div className="digital-banner-content">
            <div className="digital-banner-text">
              <h2>Transformación Digital</h2>
              <p>Modernizamos y protegemos la infraestructura tecnológica de su organización, llevándola al siguiente nivel de eficiencia y seguridad operativa.</p>
            </div>
            <div className="digital-services">
              <div className="digital-service-item">
                <div className="digital-icon">
                  <i className="fa-solid fa-code"></i>
                </div>
                <div className="digital-info">
                  <h4>Desarrollo de Software a la Medida</h4>
                  <p>Creación de plataformas web corporativas y aplicaciones móviles operativas para optimizar procesos.</p>
                </div>
              </div>
              <div className="digital-service-item">
                <div className="digital-icon">
                  <i className="fa-solid fa-network-wired"></i>
                </div>
                <div className="digital-info">
                  <h4>Ciberseguridad y Análisis Forense</h4>
                  <p>Auditorías, prevención, contención de amenazas y capacitación especializada en seguridad de la información.</p>
                </div>
              </div>
            </div>
          </div>
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
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 30px;
          margin-bottom: 60px; /* Reduje esto en contexto al nuevo banner */
        }
        
        /* Estilos del Banner Digital */
        .digital-banner {
          background: linear-gradient(135deg, rgba(var(--color-primary-rgb), 0.1), rgba(var(--color-primary-rgb), 0.02));
          border: 1px solid rgba(var(--color-primary-rgb), 0.2);
          border-radius: 20px;
          padding: 50px;
          margin-top: 60px;
          position: relative;
          overflow: hidden;
        }
        
        .digital-banner::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: url('data:image/svg+xml;utf8,<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h40v40H0V0zm20 20h20v20H20V20zM0 20h20v20H0V20z" fill="rgba(88, 166, 255, 0.03)" fill-rule="evenodd"/></svg>') repeat;
          z-index: 0;
          opacity: 0.5;
        }

        .digital-banner-content {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 50px;
          align-items: center;
        }

        .digital-banner-text h2 {
          font-size: 32px;
          margin-bottom: 20px;
          color: var(--color-primary);
        }

        .digital-banner-text p {
          font-size: 16px;
          color: var(--color-text-secondary);
          line-height: 1.6;
        }

        .digital-services {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .digital-service-item {
          display: flex;
          gap: 20px;
          align-items: flex-start;
          background: rgba(255, 255, 255, 0.03); /* Ligeramente translúcido para dark mode */
          padding: 20px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255, 0.1);
          transition: transform 0.3s ease;
        }
        
        .digital-service-item:hover {
          transform: translateY(-5px);
          background: rgba(var(--color-primary-rgb), 0.05);
          border-color: rgba(var(--color-primary-rgb), 0.3);
        }

        .digital-icon {
          font-size: 24px;
          color: var(--color-primary);
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(var(--color-primary-rgb), 0.1);
          border-radius: 10px;
          flex-shrink: 0;
        }

        .digital-info h4 {
          font-size: 18px;
          margin-bottom: 8px;
          color: var(--color-text);
        }

        .digital-info p {
          font-size: 14px;
          color: var(--color-text-secondary);
          margin: 0;
          line-height: 1.5;
        }

        @media (max-width: 900px) {
          .digital-banner-content {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .digital-banner {
            padding: 30px 20px;
          }
        }
      `}</style>
    </section>
  );
};

export default Services;
