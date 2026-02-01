import React, { useState } from 'react';
import Button from '../components/Button';

const Contact: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      company: formData.get('company'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      message: formData.get('message'),
      consent: formData.get('consent') === 'on',
    };

    try {
      const response = await fetch('/mail.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.status === 'success') {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage(result.message || 'Error al enviar el mensaje.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Hubo un problema de conexión. Intente nuevamente.');
    }
  };

  return (
    <section id="contacto" className="section">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-info">
            <h2>Hablemos de su próximo proyecto</h2>
            <p>
              Estamos listos para atender las necesidades de su empresa con profesionalismo y
              rapidez.
            </p>
            <div className="contact-details">
              <div className="detail-item">
                <div className="detail-header">
                  <i className="fa-solid fa-location-dot contact-icon" aria-hidden="true"></i>
                  <strong>Ubicación</strong>
                </div>
                <p>Av. Barones, 209, Colonia Las Americas, Guadalupe, Zacatecas.</p>
              </div>
              <div className="detail-item">
                <div className="detail-header">
                  <i className="fa-solid fa-envelope contact-icon" aria-hidden="true"></i>
                  <strong>Email</strong>
                </div>
                <p>
                  <a href="mailto:contacto@piic.com.mx">contacto@piic.com.mx</a>
                </p>
              </div>
              <div className="detail-item">
                <div className="detail-header">
                  <i className="fa-solid fa-phone contact-icon" aria-hidden="true"></i>
                  <strong>Teléfono</strong>
                </div>
                <p>
                  <a href="tel:4929421780">(492) 942 1780</a>
                </p>
              </div>
            </div>
          </div>
          <div className="contact-form-container">
            {status === 'success' ? (
              <div className="success-message">
                <h3>¡Mensaje enviado con éxito!</h3>
                <p>Nos pondremos en contacto con usted a la brevedad posible.</p>
                <Button
                  onClick={() => {
                    setStatus('idle');
                  }}
                >
                  Enviar otro mensaje
                </Button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Nombre</label>
                  <div className="form-input-wrapper">
                    <i className="fa-solid fa-user input-icon" aria-hidden="true"></i>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="Su nombre completo"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="company">Empresa</label>
                  <div className="form-input-wrapper">
                    <i className="fa-solid fa-building input-icon" aria-hidden="true"></i>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      required
                      placeholder="Nombre de su empresa"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <div className="form-input-wrapper">
                      <i className="fa-solid fa-at input-icon" aria-hidden="true"></i>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder="correo@empresa.com"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Teléfono</label>
                    <div className="form-input-wrapper">
                      <i className="fa-solid fa-phone-flip input-icon" aria-hidden="true"></i>
                      <input type="tel" id="phone" name="phone" placeholder="(492) 942 1780" />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Mensaje / Requerimiento</label>
                  <div className="form-input-wrapper">
                    <i className="fa-solid fa-pen-nib input-icon textarea-icon" aria-hidden="true"></i>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Detalle su solicitud aquí..."
                      required
                    ></textarea>
                  </div>
                </div>
                <div className="form-checkbox">
                  <input type="checkbox" id="consent" name="consent" />
                  <label htmlFor="consent">Deseo que me contacten para cotización</label>
                </div>
                {status === 'error' && (
                  <p className="error-text" style={{ color: 'red', marginBottom: '15px' }}>
                    {errorMessage}
                  </p>
                )}
                <Button className="submit-btn" variant="primary">
                  {status === 'submitting' ? 'Enviando...' : 'Enviar solicitud'}
                </Button>
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
        .contact-details a {
          color: inherit;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .contact-details a:hover {
          color: var(--color-accent);
        }
        .detail-item {
          margin-bottom: 20px;
        }
        .detail-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
        }
        .contact-icon {
          color: var(--color-accent);
          font-size: 18px;
        }
        /* Page specific form layout overrides */
        .contact-form-container {
          background-color: var(--color-white);
          padding: 40px;
          border-radius: 8px;
          border: 1px solid var(--color-border);
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .form-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }
        .form-input-wrapper input,
        .form-input-wrapper textarea {
          padding-left: 44px;
        }
        .input-icon {
          position: absolute;
          left: 15px;
          color: var(--color-text-secondary);
          opacity: 0.6;
          transition: all 0.3s ease;
          pointer-events: none;
          z-index: 10;
        }
        .textarea-icon {
          top: 15px;
        }
        input:focus + .input-icon, 
        textarea:focus + .input-icon {
          color: var(--color-primary);
          opacity: 1;
        }
        .submit-btn {
          width: 100%;
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
