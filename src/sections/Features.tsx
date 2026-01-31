import React from 'react';

const Features: React.FC = () => {
  const featureList = [
    {
      icon: 'fa-solid fa-user-tie',
      title: 'Atención personalizada',
      text: 'Entendemos los requerimientos específicos de cada cliente.',
    },
    {
      icon: 'fa-solid fa-clock-rotate-left',
      title: 'Respuesta rápida',
      text: 'Sabemos que en la industria cada minuto cuenta.',
    },
    {
      icon: 'fa-solid fa-building-shield',
      title: 'Proveedores confiables',
      text: 'Solo trabajamos con marcas de calidad comprobada.',
    },
    {
      icon: 'fa-solid fa-clipboard-check',
      title: 'Calidad y cumplimiento',
      text: 'Garantizamos que lo que cotizamos es lo que entregamos.',
    },
    {
      icon: 'fa-solid fa-handshake-angle',
      title: 'Relación a largo plazo',
      text: 'Buscamos ser socios comerciales, no solo proveedores.',
    },
  ];

  return (
    <section id="por-que-piic" className="section section-dark">
      <div className="container">
        <div className="section-header-dark">
          <h2>Por qué elegirnos</h2>
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
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 40px;
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
