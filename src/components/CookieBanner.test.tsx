import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import CookieBanner from './CookieBanner';

// Mock useTranslation
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'cookies.text':
          'Utilizamos cookies. Acepta política de uso, tratamiento de información y cookies.',
        'cookies.policy_link_text': 'política de uso, tratamiento de información y cookies',
        'cookies.accept': 'ACEPTAR',
      };
      return translations[key] || key;
    },
  }),
}));

describe('CookieBanner', () => {
  it('does not render when isVisible is false', () => {
    const { container } = render(
      <MemoryRouter>
        <CookieBanner isVisible={false} onAccept={vi.fn()} />
      </MemoryRouter>,
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders correctly on non-policy page', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <CookieBanner isVisible={true} onAccept={vi.fn()} />
      </MemoryRouter>,
    );
    expect(screen.getByText(/Utilizamos cookies/i)).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/politicas');
  });

  it('renders correctly on policy page', () => {
    render(
      <MemoryRouter initialEntries={['/politicas']}>
        <CookieBanner isVisible={true} onAccept={vi.fn()} />
      </MemoryRouter>,
    );
    expect(screen.getByText(/Utilizamos cookies/i)).toBeInTheDocument();
    // In /politicas, the text is a span, not a link
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(screen.getByText('política de uso, tratamiento de información y cookies')).toHaveClass(
      'cookie-copy-text',
    );
  });

  it('calls onAccept when button is clicked', () => {
    const onAccept = vi.fn();
    render(
      <MemoryRouter>
        <CookieBanner isVisible={true} onAccept={onAccept} />
      </MemoryRouter>,
    );
    fireEvent.click(screen.getByText('ACEPTAR'));
    expect(onAccept).toHaveBeenCalledTimes(1);
  });
});
