import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import WhatsAppPill from './WhatsAppPill';

describe('WhatsAppPill', () => {
  it('renders with correct link and message', () => {
    render(<WhatsAppPill isCookieBannerVisible={false} />);
    const link = screen.getByLabelText('Contactar por WhatsApp');
    expect(link).toHaveAttribute('href', expect.stringContaining('https://wa.me/524929421780'));
    expect(link).toHaveAttribute(
      'href',
      expect.stringContaining(encodeURIComponent('hola, estoy interesado en recibir ayuda')),
    );
  });

  it('adjusts position when cookie banner is visible', () => {
    const { container } = render(<WhatsAppPill isCookieBannerVisible={true} />);
    const style = container.querySelector('style');
    // We can't easily test the calculated style inside a string,
    // but the component rendered without crashing.
    // In a world-class repo, we might use a CSS-in-JS library that allows better testing,
    // but here we check for the link's existence.
    expect(screen.getByLabelText('Contactar por WhatsApp')).toBeInTheDocument();
    expect(style?.textContent).toContain('bottom: 140px');
  });

  it('renders with default position when cookie banner is hidden', () => {
    const { container } = render(<WhatsAppPill isCookieBannerVisible={false} />);
    const style = container.querySelector('style');
    expect(style?.textContent).toContain('bottom: 20px');
  });
});
