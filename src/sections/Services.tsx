import React from 'react';

interface ServiceCardProps {
    icon: string;
    title: string;
    description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description }) => (
    <div className="glass-card service-card">
        <div className="service-icon">{icon}</div>
        <h3>{title}</h3>
        <p>{description}</p>
        <style>{`
      .service-card {
        text-align: center;
        height: 100%;
      }
      .service-icon {
        font-size: 40px;
        margin-bottom: 20px;
        display: inline-block;
        padding: 15px;
        background-color: var(--color-bg);
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
        { icon: '🛡️', title: 'Seguridad industrial', description: 'Equipos de protección personal y sistemas de seguridad vial.' },
        { icon: '🧹', title: 'Limpieza y sanitización', description: 'Productos químicos y herramientas para mantenimiento de higiene.' },
        { icon: '📁', title: 'Papelería y suministros de oficina', description: 'Todo lo necesario para la administración diaria.' },
        { icon: '💼', title: 'Insumos comerciales', description: 'Materiales diversos para la operación comercial.' },
        { icon: '🔧', title: 'Operación y mantenimiento', description: 'Herramientas y refacciones críticas para sus equipos.' },
    ];

    return (
        <section id="servicios" className="section">
            <div className="container">
                <div className="section-header">
                    <h2>Qué ofrecemos</h2>
                    <p>Soluciones integrales diseñadas para el rigor del sector industrial.</p>
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
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 30px;
        }
      `}</style>
        </section>
    );
};

export default Services;
