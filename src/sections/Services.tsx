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
        padding: 45px 30px; /* Aumentado sustancialmente para mayor tamaño */
      }
      .service-icon {
        font-size: 42px; /* Icono más grande */
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
        font-size: 20px; /* Título más grande */
      }
      .service-card p {
        font-size: 16px; /* Texto más grande */
        color: var(--color-text-secondary);
        margin-bottom: 0;
        line-height: 1.6;
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
    {
      icon: 'fa-solid fa-truck-fast',
      title: 'Suministro Automotriz',
      description: 'Cadena de suministro de refacciones e industria del neumático.',
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
        
        /* Layout de 'Cinta' (Una sola fila deslizable sin romper tamaño) */
        .services-grid {
          display: flex;
          flex-wrap: nowrap;
          gap: 25px;
          overflow-x: auto;
          padding-bottom: 20px; /* Espacio para la barra de scroll */
          
          /* Ocultar scrollbar visualmente en webkit para más elegancia pero permitir scroll táctil/trackpad */
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
          scrollbar-color: var(--color-border) transparent;
        }
        
        .services-grid::-webkit-scrollbar {
          height: 6px;
        }
        .services-grid::-webkit-scrollbar-track {
          background: transparent;
        }
        .services-grid::-webkit-scrollbar-thumb {
          background-color: var(--color-border);
          border-radius: 10px;
        }

        .service-card {
          flex: 0 0 auto; /* Importante para que no se encojan */
          width: 320px; /* Tamaño lo suficientemente ancho */
          text-align: center;
          height: auto;
          padding: 40px 25px; 
          white-space: normal;
        }

        .service-icon {
          font-size: 38px;
          margin-bottom: 25px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 80px;
          height: 80px;
          background-color: var(--color-bg);
          color: var(--color-primary);
          border-radius: 50%;
        }
        .service-card h3 {
          margin-bottom: 15px;
          font-size: 19px;
        }
        .service-card p {
          font-size: 15px;
          color: var(--color-text-secondary);
          margin-bottom: 0;
          line-height: 1.5;
        }

        /* Ajustes menores si la pantalla es muy pequeña */
        @media (max-width: 768px) {
          .service-card {
            width: 280px;
            padding: 30px 20px;
          }
        }
      `}</style>
    </section>
  );
};

export default Services;
