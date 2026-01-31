import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('PIIC Landing Page', () => {
  it('should render the main corporate title', () => {
    render(<App />);
    const titleElement = screen.getByText(
      /Suministro industrial y comercial para operaciones que no pueden detenerse/i,
    );
    expect(titleElement).toBeInTheDocument();
  });

  it('should render the company name in the header', () => {
    render(<App />);
    const logoElements = screen.getAllByText(/PIIC/i);
    expect(logoElements.length).toBeGreaterThan(0);
  });

  it('should render the "Solicitar cotización" button', () => {
    render(<App />);
    const ctaButtons = screen.getAllByText(/Solicitar cotización/i);
    expect(ctaButtons.length).toBeGreaterThan(0);
  });
});
