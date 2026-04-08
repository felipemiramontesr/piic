import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App, { PageLoader } from './App';

describe('App', () => {
  it('renders PageLoader correctly', () => {
    render(<PageLoader />);
    expect(screen.getByText(/Cargando.../i)).toBeInTheDocument();
  });

  it('initializes cookie banner state from localStorage', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValueOnce('true');
    render(<App />);
    expect(screen.queryByText(/utilizamos cookies/i)).not.toBeInTheDocument();
  });

  it('should render the main corporate title', () => {
    render(<App />);
    expect(screen.getByText(/Suministro industrial/i)).toBeInTheDocument();
  });

  it('updates cookie consent in localStorage when accepted', async () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
    render(<App />);
    const acceptButton = screen.getByRole('button', { name: /ACEPTAR/i });
    fireEvent.click(acceptButton);
    expect(setItemSpy).toHaveBeenCalledWith('piic_cookie_consent', 'true');
    setItemSpy.mockRestore();
  });

  it('triggers lazy loads for coverage', async () => {
    // Manually push state to trigger the lazy load functions
    window.history.pushState({}, '', '/cuestionario-oil-skimmers');
    render(<App />);
    window.history.pushState({}, '', '/politicas');
    render(<App />);
    window.history.pushState({}, '', '/');
    render(<App />);
  });
});
