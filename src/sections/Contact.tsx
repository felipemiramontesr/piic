import React, { useState } from 'react';
import Button from '../components/Button';

const Contact: React.FC = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <section id="contacto" className="section">
            <div className="container">
                <div className="contact-grid">
                    <div className="contact-info">
                        <h2>Hablemos de su próximo requerimiento</h2>
                        <p>Estamos listos para atender las necesidades de su empresa con profesionalismo y rapidez.</p>
                        <div className="contact-details">
                            <div className="detail-item">
                                <strong>📍 Ubicación</strong>
                                <p>Distrito Industrial, México</p>
                            </div>
                            <div className="detail-item">
                                <strong>📧 Email</strong>
                                <p>contacto@piic.com.mx</p>
                            </div>
                        </div>
                    </div>
                    <div className="contact-form-container">
                        {submitted ? (
                            <div className="success-message">
                                <h3>¡Mensaje enviado con éxito!</h3>
                                <p>Nos pondremos en contacto con usted a la brevedad posible.</p>
                                <Button onClick={() => setSubmitted(false)}>Enviar otro mensaje</Button>
                            </div>
                        ) : (
                            <form className="contact-form" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="name">Nombre</label>
                                    <input type="text" id="name" required placeholder="Su nombre completo" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="company">Empresa</label>
                                    <input type="text" id="company" required placeholder="Nombre de su empresa" />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" id="email" required placeholder="correo@empresa.com" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phone">Teléfono</label>
                                        <input type="tel" id="phone" placeholder="+52 (000) 000-0000" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message">Mensaje / Requerimiento</label>
                                    <textarea id="message" rows={4} placeholder="Detalle su solicitud aquí..."></textarea>
                                </div>
                                <div className="form-checkbox">
                                    <input type="checkbox" id="consent" />
                                    <label htmlFor="consent">Deseo que me contacten para cotización</label>
                                </div>
                                <Button className="submit-btn" variant="primary">Enviar solicitud</Button>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: start;
        }
        .contact-info h2 {
          margin-bottom: 24px;
        }
        .contact-details {
          margin-top: 40px;
        }
        .detail-item {
          margin-bottom: 20px;
        }
        .detail-item strong {
          display: block;
          margin-bottom: 5px;
          color: var(--color-primary);
        }
        .contact-form-container {
          background-color: var(--color-white);
          padding: 40px;
          border-radius: 8px;
          border: 1px solid var(--color-border);
        }
        .form-group {
          margin-bottom: 20px;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        label {
          display: block;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 8px;
          color: var(--color-text-primary);
        }
        input, textarea {
          width: 100%;
          padding: 12px;
          border: 1px solid var(--color-input-border);
          border-radius: 4px;
          font-family: var(--font-main);
          font-size: 15px;
        }
        input:focus, textarea:focus {
          outline: none;
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px rgba(15, 42, 68, 0.1);
        }
        .form-checkbox {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 30px;
        }
        .form-checkbox input {
          width: auto;
        }
        .form-checkbox label {
          margin-bottom: 0;
          font-weight: 400;
        }
        .submit-btn {
          width: 100%;
          background-color: var(--color-primary);
          color: var(--color-white);
        }
        .submit-btn:hover {
          background-color: #1a4570;
          color: var(--color-white);
        }
        .success-message {
          text-align: center;
          padding: 40px 0;
        }
        .success-message h3 {
          margin-bottom: 15px;
        }
        @media (max-width: 992px) {
          .contact-grid { grid-template-columns: 1fr; }
          .form-row { grid-template-columns: 1fr; }
        }
      `}</style>
        </section>
    );
};

export default Contact;
