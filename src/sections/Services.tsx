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
        
        /* Estilos del Banner Digital - Look Tecnológico & Corporativo */
        .digital-banner {
          background: linear-gradient(135deg, var(--color-primary), #0a1c2e);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 50px;
          margin-top: 60px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(15, 42, 68, 0.15);
        }
        
        /* Patrón de matriz de puntos (dot matrix) para dar look de tecnología */
        .digital-banner::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background-image: radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
          z-index: 0;
          opacity: 0.6;
        }

        /* Destello muy sutil del color de acento amarillo de la marca */
        .digital-banner::after {
          content: '';
          position: absolute;
          top: -50%; left: -50%;
          width: 200%; height: 200%;
          background: radial-gradient(circle at 50% 50%, rgba(242, 183, 5, 0.05) 0%, transparent 60%);
          z-index: 0;
          pointer-events: none;
        }

        .digital-banner-content {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .digital-banner-text h2 {
          font-size: 36px;
          margin-bottom: 20px;
          color: var(--color-white);
          letter-spacing: -0.5px;
        }

        /* Resaltado del título en color acento para romper la monotonía y enfatizar la tecnología */
        .digital-banner-text h2 span.highlight {
          color: var(--color-accent);
          position: relative;
          display: inline-block;
        }

        .digital-banner-text p {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.7;
        }

        .digital-services {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .digital-service-item {
          display: flex;
          gap: 24px;
          align-items: flex-start;
          background: rgba(255, 255, 255, 0.03); 
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          padding: 24px;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .digital-service-item:hover {
          transform: translateX(10px);
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(242, 183, 5, 0.3); /* Borde acentuado en hover */
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .digital-icon {
          font-size: 24px;
          color: var(--color-accent); /* Iconos amarillos contrastando sobre el primario oscuro */
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(242, 183, 5, 0.1);
          border-radius: 12px;
          flex-shrink: 0;
          transition: transform 0.3s ease;
        }
        
        .digital-service-item:hover .digital-icon {
          transform: scale(1.1);
          background: rgba(242, 183, 5, 0.2);
        }

        .digital-info h4 {
          font-size: 19px;
          margin-bottom: 8px;
          color: var(--color-white);
          font-weight: 600;
        }

        .digital-info p {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.65);
          margin: 0;
          line-height: 1.6;
        }

        @media (max-width: 900px) {
          .digital-banner-content {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .digital-banner {
            padding: 40px 24px;
            margin-top: 40px;
          }
          .digital-service-item:hover {
            transform: translateY(-5px); /* Cambio de animación lateral a vertical en móviles */
          }
        }
      `}</style>
    </section>
  );
};

export default Services;
