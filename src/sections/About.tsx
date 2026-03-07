import React from 'react';

const About: React.FC = () => {
  return (
    <section id="quienes-somos" className="section section-white">
      <div className="container">
        <div className="about-grid">
          <div className="about-text">
            <h2>Quiénes Somos</h2>
            <p>
              PIIC es un socio integral corporativo enfocado en ofrecer soluciones confiables,
              eficientes y oportunas. Proveemos desde insumos industriales estratégicos hasta
              vanguardia en tecnología de la información para empresas del sector industrial y minero.
            </p>
            <p>
              Nuestra misión es ser el aliado definitivo que sus operaciones necesitan, garantizando
              no solo que el flujo físico de suministros nunca se detenga, sino que su infraestructura
              digital funcione de manera segura y eficiente, permitiendo a su empresa enfocarse en lo
              que mejor sabe hacer.
            </p>
          </div>
          <div className="about-visuals">
            <div className="main-image-container">
              <img
                src="/assets/about-img.png"
                alt="Operación Industrial"
                className="industrial-img"
                loading="lazy"
              />
              <div className="image-overlay-accent"></div>
            </div>

            {/* Tarjeta Flotante Digital */}
            <div className="floating-tech-card">
              <div className="tech-card-header">
                <i className="fa-solid fa-microchip tech-icon"></i>
                <span className="tech-status">Infraestructura Digital</span>
              </div>
              <div className="tech-card-body">
                <div className="tech-bar-group">
                  <div className="tech-bar-label">
                    <span>Protección Cibernética</span>
                    <span>100%</span>
                  </div>
                  <div className="tech-progress-bar"><div className="tech-progress-fill" style={{ width: '100%' }}></div></div>
                </div>
                <div className="tech-bar-group">
                  <div className="tech-bar-label">
                    <span>Sistemas Activos</span>
                    <span className="pulsing-dot"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }
        .about-text h2 {
          margin-bottom: 24px;
          position: relative;
          padding-bottom: 12px;
        }
        .about-text h2::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 50px;
          height: 4px;
          background-color: var(--color-accent);
        }
        .about-text p {
          color: var(--color-text-secondary);
          margin-bottom: 20px;
          text-align: justify;
        }
        
        /* Contenedor Visual (Propuesta 3) */
        .about-visuals {
          position: relative;
          padding-right: 20px;
          padding-bottom: 30px;
          perspective: 1000px;
        }
        .main-image-container {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          border: 1px solid var(--color-border);
        }
        .industrial-img {
          width: 100%;
          height: auto;
          display: block;
          transition: transform 0.6s ease;
        }
        .about-visuals:hover .industrial-img {
          transform: scale(1.04);
        }
        .image-overlay-accent {
          position: absolute;
          inset: 0;
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.2);
          pointer-events: none;
        }
        
        /* Floating Tech Card */
        .floating-tech-card {
          position: absolute;
          bottom: -10px;
          right: -10px;
          width: 280px;
          background: rgba(10, 28, 46, 0.85); /* Dark corporate blue, translucent */
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 15px 35px rgba(15, 42, 68, 0.3);
          color: var(--color-white);
          transform: translateY(0);
          transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          z-index: 2;
        }
        
        .about-visuals:hover .floating-tech-card {
          transform: translateY(-20px) scale(1.02);
          box-shadow: 0 25px 50px rgba(15, 42, 68, 0.4);
          border-color: rgba(242, 183, 5, 0.4);
        }
        
        .tech-card-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .tech-icon {
          color: var(--color-accent);
          font-size: 20px;
          background: rgba(242, 183, 5, 0.1);
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
        }
        .tech-status {
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.5px;
        }
        .tech-bar-group {
          margin-bottom: 15px;
        }
        .tech-bar-group:last-child {
          margin-bottom: 0;
        }
        .tech-bar-label {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: rgba(255,255,255,0.7);
          margin-bottom: 6px;
        }
        .tech-progress-bar {
          height: 6px;
          background: rgba(255,255,255,0.1);
          border-radius: 3px;
          overflow: hidden;
        }
        .tech-progress-fill {
          height: 100%;
          background: var(--color-accent);
          border-radius: 3px;
        }
        .pulsing-dot {
          width: 8px;
          height: 8px;
          background-color: #22c55e;
          border-radius: 50%;
          display: inline-block;
          animation: pulseGreen 2s infinite;
        }
        @keyframes pulseGreen {
          0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4); }
          70% { box-shadow: 0 0 0 6px rgba(34, 197, 94, 0); }
          100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
        }

        @media (max-width: 992px) {
          .about-grid { grid-template-columns: 1fr; gap: 40px; }
          .floating-tech-card {
            width: 250px;
            right: 0;
            bottom: -20px;
          }
        }
        
        @media (max-width: 480px) {
          .about-visuals {
            padding-bottom: 50px;
            padding-right: 0;
          }
          .floating-tech-card {
            width: 90%;
            left: 50%;
            transform: translateX(-50%);
            bottom: -40px;
          }
          .about-visuals:hover .floating-tech-card {
            transform: translateX(-50%) translateY(-10px);
          }
        }
      `}</style>
    </section>
  );
};

export default About;
