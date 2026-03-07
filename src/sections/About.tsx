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
            {/* Imagen 1: Proveeduría Industrial */}
            <div className="image-card industrial-card">
              <img
                src="/assets/about-img.png"
                alt="Operación Industrial"
                className="img-fluid"
                loading="lazy"
              />
            </div>

            {/* Imagen 2: Transformación Digital (Superpuesta) */}
            <div className="image-card digital-card">
              <img
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Tecnología de la Información"
                className="img-fluid"
                loading="lazy"
              />
              <div className="digital-overlay">
                <i className="fa-solid fa-shield-halved"></i>
                <span>Ciberseguridad Activa</span>
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
        
        /* Contenedor Visual: Dos imágenes entrelazadas */
        .about-visuals {
          position: relative;
          width: 100%;
          min-height: 480px; /* Base temporal para absolutos */
          perspective: 1000px;
          display: flex; /* Añadido para estabilizar alturas */
        }
        
        .image-card {
          position: absolute;
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        }
        
        .img-fluid {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s ease;
        }

        /* Primera imagen (Industrial - Arriba a la derecha) */
        .industrial-card {
          top: 0;
          right: 0;
          width: 80%;
          height: 380px;
          z-index: 1;
          border: 8px solid var(--color-white); /* Marco Claro */
        }

        /* Segunda imagen (Digital - Abajo a la izquierda superpuesta) */
        .digital-card {
          bottom: 0;
          left: 0;
          width: 65%;
          height: 280px;
          z-index: 2;
          /* Cristal oscuro esmerilado que evidencie la parte digital */
          background: rgba(15, 42, 68, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          padding: 10px; /* Padding para crear un 'marco' interno sobre la img */
          box-shadow: 0 25px 45px rgba(15, 42, 68, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .digital-card .img-fluid {
          border-radius: 8px; /* Redondear dentro del marco oscuro */
        }
        
        /* Efectos Hover Entrelazados */
        .about-visuals:hover .industrial-card {
          transform: translateY(-10px) translateX(15px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
        }
        .about-visuals:hover .industrial-card .img-fluid {
          transform: scale(1.05); /* Zoom in util */
        }

        .about-visuals:hover .digital-card {
          transform: translateY(10px) translateX(-15px) scale(1.02);
          box-shadow: 0 30px 60px rgba(15, 42, 68, 0.5);
          border-color: rgba(242, 183, 5, 0.4);
          z-index: 3;
        }

        /* Etiqueta Flotante sobre la Tarjeta Digital */
        .digital-overlay {
          position: absolute;
          bottom: 25px;
          right: -20px; /* Sale 'volando' del borde */
          background: rgba(10, 28, 46, 0.95); /* Azul muy oscuro casi negro */
          backdrop-filter: blur(8px);
          border: 1px solid rgba(242, 183, 5, 0.6);
          padding: 12px 18px;
          border-radius: 50px;
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--color-white);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
          transform: translateY(0);
          transition: transform 0.3s ease;
          z-index: 10;
        }
        
        .about-visuals:hover .digital-overlay {
          transform: translateY(-8px); /* Flota más cuando se asoma */
        }

        .digital-overlay i {
          color: var(--color-accent); /* Verde/Amarillo que combine */
          font-size: 18px;
        }

        .digital-overlay span {
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.5px;
        }

        /* Ajustes Mobile */
        @media (max-width: 992px) {
          .about-visuals {
            height: 400px;
            margin-top: 20px;
            min-height: unset;
          }
          .industrial-card {
            width: 85%;
            height: 300px;
          }
          .digital-card {
            width: 75%;
            height: 220px;
          }
          .digital-overlay {
            right: 0;
            bottom: -15px;
          }
        }
        
        @media (max-width: 480px) {
          .about-visuals {
            height: 340px;
          }
          .industrial-card {
            width: 85%;
            height: 260px;
          }
          .digital-card {
            width: 75%;
            height: 180px;
          }
          .digital-overlay {
            padding: 8px 14px;
          }
          .digital-overlay i {
            font-size: 14px;
          }
          .digital-overlay span {
            font-size: 12px;
          }
        }
      `}</style>
    </section>
  );
};

export default About;
