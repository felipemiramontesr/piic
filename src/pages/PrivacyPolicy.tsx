import React, { useEffect } from 'react';
import Header from '../sections/Header';
import Footer from '../sections/Footer';

const PrivacyPolicy: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="privacy-page">
            <Header simpleMode={true} />

            <main className="privacy-content" style={{ padding: '120px 24px 80px', maxWidth: '800px', margin: '0 auto' }}>
                <h1 style={{ marginBottom: '40px' }}>Políticas de Uso y Tratamiento de Información</h1>

                <section style={{ marginBottom: '40px' }}>
                    <h2>1. Términos de Uso</h2>
                    <p>
                        Al acceder a este sitio web de PIIC (Proyectos Integrales de Ingeniería y Control), usted acepta cumplir con estos términos de servicio, todas las leyes y regulaciones aplicables, y acepta que es responsable del cumplimiento de las leyes locales aplicables.
                    </p>
                    <p>
                        Los materiales contenidos en este sitio web están protegidos por las leyes de derechos de autor y marcas comerciales aplicables.
                    </p>
                </section>

                <section style={{ marginBottom: '40px' }}>
                    <h2>2. Aviso de Privacidad</h2>
                    <p>
                        Su privacidad es importante para nosotros. Es política de PIIC respetar su privacidad con respecto a cualquier información que podamos recopilar en nuestro sitio web.
                    </p>
                    <p>
                        Solo solicitamos información personal cuando realmente la necesitamos para brindarle un servicio. Lo hacemos por medios justos y legales, con su conocimiento y consentimiento.
                    </p>
                    <p>
                        No compartimos ninguna información de identificación personal públicamente o con terceros, excepto cuando así lo requiera la ley.
                    </p>
                </section>

                <section style={{ marginBottom: '40px' }}>
                    <h2>3. Política de Cookies</h2>
                    <p>
                        Este sitio utiliza cookies para mejorar su experiencia de navegación. Una cookie es un pequeño archivo que se almacena en su computadora y nos ayuda a analizar el tráfico web o le permite saber cuando visita un sitio en particular.
                    </p>
                    <p>
                        Nuestras cookies se utilizan principalmente para:
                    </p>
                    <ul>
                        <li>• Recordar sus preferencias de navegación.</li>
                        <li>• Analizar de forma anónima el rendimiento de nuestro sitio.</li>
                        <li>• Mantener el estado de sus sesiones si fuera necesario.</li>
                    </ul>
                    <p>
                        Usted puede elegir aceptar o rechazar las cookies. La mayoría de los navegadores web aceptan automáticamente las cookies, pero generalmente puede modificar la configuración de su navegador para rechazar las cookies si lo prefiere.
                    </p>
                </section>

                <section style={{ marginBottom: '40px' }}>
                    <h2>4. Contacto</h2>
                    <p>
                        Si tiene alguna pregunta sobre cómo manejamos los datos de los usuarios y la información personal, no dude en contactarnos a través de los medios oficiales proporcionados en el pie de página de este sitio.
                    </p>
                </section>

                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginTop: '60px' }}>
                    Última actualización: Enero 2026.
                </p>
            </main>

            <Footer />

            <style>{`
        .privacy-page section h2 {
          margin-bottom: 20px;
          color: var(--color-primary);
        }
        .privacy-page section p {
          margin-bottom: 16px;
          color: var(--color-text-secondary);
        }
        .privacy-page ul {
          margin-bottom: 20px;
          padding-left: 0;
        }
        .privacy-page ul li {
          margin-bottom: 8px;
          color: var(--color-text-secondary);
        }
      `}</style>
        </div>
    );
};

export default PrivacyPolicy;
