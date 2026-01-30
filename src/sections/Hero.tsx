import React from 'react';
import Button from '../components/Button';

const Hero: React.FC = () => {
    return (
        <section id="inicio" className="hero-section">
            <div className="container hero-container">
                <div className="hero-content">
                    <h1>Suministro industrial y comercial para operaciones que no pueden detenerse</h1>
                    <p className="hero-subtitle">Respuesta rápida y suministro confiable para el sector minero e industrial.</p>
                    <div className="hero-actions">
                        <Button href="#contacto" className="hero-btn">Solicitar cotización</Button>
                        <Button href="#servicios" variant="outline" className="hero-btn">Ver servicios</Button>
                    </div>
                </div>
            </div>

            <style>{`
        .hero-section {
          background-color: var(--color-primary);
          color: var(--color-white);
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding-top: 80px;
          text-align: left;
        }
        .hero-container {
          display: flex;
          align-items: center;
        }
        .hero-content {
          max-width: 800px;
        }
        .hero-content h1 {
          color: var(--color-white);
          margin-bottom: 24px;
        }
        .hero-subtitle {
          font-size: 20px;
          color: #E5E7EB;
          margin-bottom: 40px;
          font-weight: 400;
        }
        .hero-actions {
          display: flex;
          gap: 20px;
        }
        .hero-btn {
          min-width: 200px;
        }
        @media (max-width: 768px) {
          .hero-actions {
            flex-direction: column;
          }
        }
      `}</style>
        </section>
    );
};

export default Hero;
