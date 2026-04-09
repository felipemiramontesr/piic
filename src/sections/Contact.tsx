import { useTranslation } from 'react-i18next';
import Button from '../components/Button';
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const { t } = useTranslation();
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
        setErrorMessage(result.message || t('contact.form.error_generic'));
      }
    } catch {
      setStatus('error');
      setErrorMessage(t('contact.form.error_connection'));
    }
  };

  return (
    <section id="contacto" className="section">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-info">
            <h2>{t('contact.title')}</h2>
            <p>{t('contact.subtitle')}</p>
            <div className="contact-details">
              <div className="detail-item">
                <div className="detail-header">
                  <i className="fa-solid fa-location-dot contact-icon" aria-hidden="true"></i>
                  <strong>{t('contact.location')}</strong>
                </div>
                <p>Av. Barones, 209, Colonia Las Americas, Guadalupe, Zacatecas.</p>
              </div>
              <div className="detail-item">
                <div className="detail-header">
                  <i className="fa-solid fa-envelope contact-icon" aria-hidden="true"></i>
                  <strong>{t('contact.email')}</strong>
                </div>
                <p>
                  <a href="mailto:contacto@piic.com.mx">contacto@piic.com.mx</a>
                </p>
              </div>
              <div className="detail-item">
                <div className="detail-header">
                  <i className="fa-solid fa-phone contact-icon" aria-hidden="true"></i>
                  <strong>{t('contact.phone')}</strong>
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
                <h3>{t('contact.success_title')}</h3>
                <p>{t('contact.success_text')}</p>
                <Button
                  onClick={() => {
                    setStatus('idle');
                  }}
                >
                  {t('contact.send_another')}
                </Button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">{t('contact.form.name')}</label>
                  <div className="form-input-wrapper">
                    <i className="fa-solid fa-user input-icon" aria-hidden="true"></i>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder={t('contact.form.name_placeholder')}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="company">{t('contact.form.company')}</label>
                  <div className="form-input-wrapper">
                    <i className="fa-solid fa-building input-icon" aria-hidden="true"></i>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      required
                      placeholder={t('contact.form.company_placeholder')}
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
                        placeholder={t('contact.form.email_placeholder')}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">{t('contact.phone')}</label>
                    <div className="form-input-wrapper">
                      <i className="fa-solid fa-phone-flip input-icon" aria-hidden="true"></i>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder={t('contact.form.phone_placeholder')}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="message">{t('contact.form.message')}</label>
                  <div className="form-input-wrapper">
                    <i
                      className="fa-solid fa-pen-nib input-icon textarea-icon"
                      aria-hidden="true"
                    ></i>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder={t('contact.form.message_placeholder')}
                      required
                    ></textarea>
                  </div>
                </div>
                <div className="form-checkbox">
                  <input type="checkbox" id="consent" name="consent" />
                  <label htmlFor="consent">{t('contact.form.consent')}</label>
                </div>
                {status === 'error' && (
                  <p className="error-text" style={{ color: 'red', marginBottom: '15px' }}>
                    {errorMessage}
                  </p>
                )}
                <Button className="submit-btn" variant="primary">
                  {status === 'submitting'
                    ? t('contact.form.submitting')
                    : t('contact.form.submit')}
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
