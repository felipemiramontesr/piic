import React from 'react';

const Features: React.FC = () => {
    const featureList = [
        { title: 'Atención personalizada', text: 'Entendemos los requerimientos específicos de cada cliente.' },
        { title: 'Respuesta rápida', text: 'Sabemos que en la industria cada minuto cuenta.' },
        { title: 'Proveedores confiables', text: 'Solo trabajamos con marcas de calidad comprobada.' },
        { title: 'Calidad y cumplimiento', text: 'Garantizamos que lo que cotizamos es lo que entregamos.' },
        { title: 'Relación a largo plazo', text: 'Buscamos ser socios comerciales, no solo proveedores.' },
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
                            <span className="feature-marker"></span>
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
        .feature-marker {
          flex-shrink: 0;
          width: 24px;
          height: 24px;
          background-color: var(--color-accent);
          border-radius: 4px;
          margin-top: 4px;
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
