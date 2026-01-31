import React, { useEffect } from 'react';
import Header from '../sections/Header';
import Footer from '../sections/Footer';

interface PolicyCardProps {
    icon: string;
    title: string;
    children: React.ReactNode;
}

const PolicyCard: React.FC<PolicyCardProps> = ({ icon, title, children }) => (
    <div className="glass-card policy-card">
        <div className="policy-icon-header">
            <div className="policy-icon">
                <i className={icon}></i>
            </div>
            <h2>{title}</h2>
        </div>
        <div className="policy-body">
            {children}
        </div>
    </div>
);

const PrivacyPolicy: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="privacy-page">
            <Header simpleMode={true} />

            <main className="privacy-container">
                <div className="privacy-hero">
                    <h1>Centro de Privacidad y Legal</h1>
                    <p>Transparencia en el uso y protección de sus datos personales bajo la normativa mexicana.</p>
                </div>

                <div className="policy-grid">
                    <PolicyCard icon="fa-solid fa-file-contract" title="1. Términos de Uso">
                        <p>
                            Al acceder a este sitio web de PIIC (Proyectos Integrales de Ingeniería y Control), usted acepta cumplir con estos términos de servicio, todas las leyes y regulaciones aplicables.
                        </p>
                        <p>
                            Los materiales contenidos en este sitio web están protegidos por las leyes de derechos de autor y marcas comerciales aplicables. El uso no autorizado de cualquier material puede violar leyes de propiedad intelectual.
                        </p>
                    </PolicyCard>

                    <PolicyCard icon="fa-solid fa-user-shield" title="2. Aviso de Privacidad">
                        <p>
                            Su privacidad es fundamental para nosotros. Es política de PIIC respetar su privacidad respecto a cualquier información que podamos recopilar en nuestro sitio web.
                        </p>
                        <p>
                            Solo solicitamos información personal cuando realmente la necesitamos para brindarle un servicio. Lo hacemos por medios justos y legales, con su conocimiento y consentimiento previo.
                        </p>
                        <p>
                            No compartimos información de identificación personal públicamente o con terceros, excepto cuando sea estrictamente requerido por la ley o para la prestación de un servicio solicitado explícitamente.
                        </p>
                    </PolicyCard>

                    <PolicyCard icon="fa-solid fa-cookie-bite" title="3. Política de Cookies">
                        <p>
                            Este sitio utiliza cookies para optimizar la navegación técnica. Una cookie es un pequeño archivo almacenado en su dispositivo que nos permite reconocer su sesión.
                        </p>
                        <p>Nuestras cookies se utilizan para:</p>
                        <ul className="policy-list">
                            <li>Recordar sus preferencias de idioma y región.</li>
                            <li>Analizar de forma anónima el rendimiento de nuestro sitio.</li>
                            <li>Asegurar la integridad de las sesiones de navegación.</li>
                        </ul>
                        <p>
                            Usted puede modificar la configuración de su navegador para rechazar las cookies si lo prefiere, aunque esto podría afectar la funcionalidad de algunas secciones.
                        </p>
                    </PolicyCard>

                    <PolicyCard icon="fa-solid fa-scale-balanced" title="4. Derechos ARCO (LFPDPPP)">
                        <p>
                            De acuerdo con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (México), usted cuenta con los derechos **ARCO**:
                        </p>
                        <ul className="policy-list arco-list">
                            <li><strong>Acceso:</strong> Conocer qué datos personales tenemos y para qué los utilizamos.</li>
                            <li><strong>Rectificación:</strong> Solicitar la corrección de su información en caso de que esté desactualizada o sea inexacta.</li>
                            <li><strong>Cancelación:</strong> Solicitar que eliminemos sus datos de nuestros registros cuando considere que no están siendo utilizados adecuadamente.</li>
                            <li><strong>Oposición:</strong> Oponerse al uso de sus datos personales para fines específicos.</li>
                        </ul>
                        <p>
                            Para ejercer cualquiera de estos derechos, envíe una solicitud formal al correo oficial de contacto detallado abajo.
                        </p>
                    </PolicyCard>

                    <PolicyCard icon="fa-solid fa-envelope-open-text" title="5. Contacto Oficial">
                        <p>
                            Para cualquier duda, aclaración o solicitud relacionada con sus datos personales y derechos ARCO, favor de dirigirse a:
                        </p>
                        <div className="contact-highlight">
                            <i className="fa-solid fa-envelope"></i>
                            <a href="mailto:contacto@piic.com.mx">contacto@piic.com.mx</a>
                        </div>
                        <p>
                            Atenderemos su solicitud conforme a los tiempos y procesos establecidos por la ley vigente.
                        </p>
                    </PolicyCard>
                </div>

                <p className="last-update">
                    Última actualización: Enero 2026. PIIC - Zacatecas, México.
                </p>
            </main>

            <Footer />

            <style>{`
        .privacy-page {
          background-color: var(--color-bg);
          min-height: 100vh;
        }

        .privacy-container {
          max-width: var(--container-max-width);
          margin: 0 auto;
          padding: 140px 24px 80px;
        }

        .privacy-hero {
          text-align: center;
          margin-bottom: 60px;
        }

        .privacy-hero h1 {
          font-size: 42px;
          margin-bottom: 20px;
          color: var(--color-primary);
        }

        .privacy-hero p {
          font-size: 18px;
          color: var(--color-text-secondary);
          max-width: 700px;
          margin: 0 auto;
        }

        .policy-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 30px;
        }

        .policy-card {
          padding: 40px;
          display: flex;
          flex-direction: column;
          transition: transform 0.3s ease;
        }

        .policy-card:hover {
          transform: translateY(-5px);
        }

        .policy-icon-header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 25px;
        }

        .policy-icon {
          width: 50px;
          height: 50px;
          background: var(--color-primary);
          color: var(--color-accent);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          font-size: 20px;
        }

        .policy-card h2 {
          font-size: 22px;
          margin: 0;
          color: var(--color-primary);
        }

        .policy-body p {
          color: var(--color-text-secondary);
          line-height: 1.7;
          margin-bottom: 15px;
          font-size: 15px;
        }

        .policy-list {
          list-style: none;
          padding: 0;
          margin-bottom: 20px;
        }

        .policy-list li {
          position: relative;
          padding-left: 20px;
          margin-bottom: 10px;
          font-size: 14px;
          color: var(--color-text-secondary);
        }

        .policy-list li::before {
          content: "•";
          color: var(--color-accent);
          position: absolute;
          left: 0;
          font-weight: bold;
        }

        .arco-list li strong {
          color: var(--color-primary);
        }

        .contact-highlight {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 12px 20px;
          background: rgba(15, 42, 68, 0.05);
          border-radius: 8px;
          margin: 10px 0 20px;
          width: 100%;
        }

        .contact-highlight i {
          color: var(--color-primary);
        }

        .contact-highlight a {
          color: var(--color-primary);
          font-weight: 700;
          text-decoration: none;
        }

        .contact-highlight a:hover {
          text-decoration: underline;
        }

        .last-update {
          text-align: center;
          margin-top: 60px;
          font-size: 14px;
          color: var(--color-text-secondary);
          opacity: 0.7;
        }

        @media (max-width: 768px) {
          .privacy-container {
            padding-top: 100px;
          }
          .privacy-hero h1 {
            font-size: 32px;
          }
          .policy-grid {
            grid-template-columns: 1fr;
          }
          .policy-card {
            padding: 30px 20px;
          }
        }
      `}</style>
        </div>
    );
};

export default PrivacyPolicy;
