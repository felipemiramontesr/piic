import React from 'react';

const WhatsAppPill: React.FC = () => {
  // Configuración de WhatsApp proporcionada
  const phoneNumber = '524929421780';
  const rawMessage = 'hola, estoy interesado en recibir ayuda acerca de los productos y servicios de PIIC.';
  const message = encodeURIComponent(rawMessage);

  const waLink = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <>
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className="wa-pill"
        aria-label="Contactar por WhatsApp"
      >
        <i className="fa-brands fa-whatsapp wa-icon"></i>
        <span className="wa-text">¿Podemos ayudarte?</span>
      </a>

      <style>{`
        .wa-pill {
          position: fixed;
          bottom: 80px; /* Subido para evitar banner de cookies (aprox 65-70px + 10px gap) */
          right: 30px;
          background-color: var(--color-accent); /* Relleno amarillo corporativo */
          border: none; /* Los botones amarillos del sitio no tienen borde */
          border-radius: 4px; /* Mismo radio que el botón base */
          display: flex;
          align-items: center;
          padding: 16px; /* Compensación del tamaño del borde */
          text-decoration: none;
          z-index: 1000;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          overflow: hidden;
        }

        .wa-icon {
          font-size: 34px;
          color: var(--color-primary); /* Ícono negro/operativo para homologar */
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          transition: transform 0.3s ease, color 0.3s ease;
        }

        .wa-text {
          max-width: 0;
          opacity: 0;
          white-space: nowrap;
          color: var(--color-primary); /* Texto negro/operativo para homologar */
          font-weight: 500;
          font-size: 15px;
          margin-left: 0;
          transition: all 0.4s ease, color 0.4s ease;
        }

        /* Hover Effect: Expande el botón y cambia a estilo corporativo invertido (Amarillo sólido) */
        .wa-pill:hover {
          background-color: var(--color-accent); /* Fondo Amarillo */
          border-color: var(--color-accent);
          padding: 14px 26px 14px 18px;
        }

        .wa-pill:hover .wa-icon {
          transform: scale(1.1);
          color: var(--color-primary); /* Mantiene el icono negro en hover */
        }

        .wa-pill:hover .wa-text {
          max-width: 250px;
          opacity: 1;
          margin-left: 12px;
        }

        /* Ajustes Móvil */
        @media (max-width: 768px) {
          .wa-pill {
            bottom: 110px; /* Más espacio en móvil porque el banner de cookies es más alto */
            right: 20px;
          }
        }
      `}</style>
    </>
  );
};

export default WhatsAppPill;
