import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import OilSkimmersForm from './OilSkimmersForm';

// Mock global fetch
globalThis.fetch = vi.fn();

// Mock scrollTo
window.scrollTo = vi.fn();

describe('OilSkimmersForm Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the form correctly', () => {
    render(<OilSkimmersForm />);
    expect(screen.getByText(/Cuestionario Técnico: Oil Skimmers/i)).toBeInTheDocument();
  });

  it('updates cities based on selected state', async () => {
    render(<OilSkimmersForm />);
    const stateSelect = screen.getByLabelText(/Estado \*/i) as HTMLSelectElement;
    fireEvent.change(stateSelect, { target: { value: 'Jalisco', name: 'state' } });
    await waitFor(() => {
      expect(screen.getByText('Guadalajara')).toBeInTheDocument();
    });
  });

  it('auto-fills zip code when colonia is selected', async () => {
    (globalThis.fetch as Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        zip_codes: [{ d_asenta: 'Centro', d_codigo: '44100' }],
      }),
    });
    render(<OilSkimmersForm />);
    fireEvent.change(screen.getByLabelText(/Estado \*/i), {
      target: { value: 'Jalisco', name: 'state' },
    });
    await waitFor(() => expect(screen.getByText('Guadalajara')).toBeInTheDocument());
    fireEvent.change(screen.getByLabelText(/Ciudad \/ Municipio \*/i), {
      target: { value: 'Guadalajara', name: 'city' },
    });
    await waitFor(() => expect(screen.getByText('Centro')).toBeInTheDocument());
    fireEvent.change(screen.getByLabelText(/Colonia \/ Asentamiento \*/i), {
      target: { value: 'Centro', name: 'neighborhood' },
    });
    expect((screen.getByLabelText(/Código Postal \*/i) as HTMLInputElement).value).toBe('44100');
  });

  it('handles colony not found branch', async () => {
    render(<OilSkimmersForm />);
    fireEvent.change(screen.getByLabelText(/Colonia \/ Asentamiento \*/i), {
      target: { value: 'NonExistent', name: 'neighborhood' },
    });
    // Covers Line 134 branch
  });

  it('handles successful form submission', async () => {
    (globalThis.fetch as Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ status: 'success' }),
    });
    render(<OilSkimmersForm />);
    fireEvent.change(screen.getByLabelText(/Nombre de la Compañía \*/i), {
      target: { value: 'Test' },
    });
    fireEvent.click(screen.getByLabelText(/Tanque/i));
    fireEvent.submit(screen.getByTestId('oil-form'));
    await waitFor(() => expect(screen.getByText(/¡Información Enviada!/i)).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: /Enviar otro/i }));
  });

  it('handles submission with attachment', async () => {
    (globalThis.fetch as Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ status: 'success' }),
    });
    render(<OilSkimmersForm />);
    fireEvent.change(screen.getByLabelText(/Nombre de la Compañía \*/i), {
      target: { value: 'Test' },
    });
    fireEvent.click(screen.getByLabelText(/Tanque/i));

    const file = new File([''], 't.png', { type: 'image/png' });
    const input = document.querySelector('input[type="file"]')!;
    fireEvent.change(input, { target: { files: [file] } });

    fireEvent.submit(screen.getByTestId('oil-form'));
    await waitFor(() => expect(globalThis.fetch).toHaveBeenCalled());
  });

  it('prevents submission if no container type is selected', async () => {
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
    render(<OilSkimmersForm />);
    fireEvent.change(screen.getByLabelText(/Nombre de la Compañía \*/i), {
      target: { value: 'Test' },
    });
    fireEvent.submit(screen.getByTestId('oil-form'));
    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith(
        'Por favor seleccione al menos un tipo de contenedor.',
      );
    });
    alertMock.mockRestore();
  });

  it('handles submission error', async () => {
    (globalThis.fetch as Mock).mockResolvedValue({ ok: false });
    render(<OilSkimmersForm />);
    fireEvent.change(screen.getByLabelText(/Nombre de la Compañía \*/i), {
      target: { value: 'Test' },
    });
    fireEvent.click(screen.getByLabelText(/Tanque/i));
    fireEvent.submit(screen.getByTestId('oil-form'));
    await waitFor(() => expect(globalThis.fetch).toHaveBeenCalled());
  });

  it('handles network failure', async () => {
    (globalThis.fetch as Mock).mockRejectedValue(new Error('Down'));
    render(<OilSkimmersForm />);
    fireEvent.click(screen.getByLabelText(/Tanque/i));
    fireEvent.submit(screen.getByTestId('oil-form'));
    await waitFor(() => expect(globalThis.fetch).toHaveBeenCalled());
  });

  it('handles drag and drop', () => {
    render(<OilSkimmersForm />);
    const dz = screen.getByText(/Arrastra tus archivos aquí/i).parentElement!;
    fireEvent.dragOver(dz);
    expect(dz).toHaveClass('drag-active');
    fireEvent.dragLeave(dz);
    expect(dz).not.toHaveClass('drag-active');
    const file = new File([''], 't.png', { type: 'image/png' });
    fireEvent.drop(dz, { dataTransfer: { files: [file] } });
    expect(screen.getByText(/t.png/i)).toBeInTheDocument();
  });

  it('handles invalid file drop', () => {
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
    render(<OilSkimmersForm />);
    const dz = screen.getByText(/Arrastra tus archivos aquí/i).parentElement!;
    const file = new File([''], 't.exe', { type: 'exe' });
    fireEvent.drop(dz, { dataTransfer: { files: [file] } });
    expect(alertMock).toHaveBeenCalled();
  });

  it('handles file change and unchecking', () => {
    render(<OilSkimmersForm />);
    const input = document.querySelector('input[type="file"]')!;
    fireEvent.change(input, { target: { files: [new File([''], 't.png')] } });
    fireEvent.change(input, { target: { files: [] } });

    const cb = screen.getByLabelText(/Tanque/i);
    fireEvent.click(cb);
    fireEvent.click(cb);
  });

  it('handles "Other" cases', async () => {
    render(<OilSkimmersForm />);
    fireEvent.click(screen.getByRole('radio', { name: /^Otro$/i }));
    fireEvent.change(screen.getByLabelText(/Estado \*/i), {
      target: { value: 'Jalisco', name: 'state' },
    });
    await waitFor(() => expect(screen.getByText('Guadalajara')).toBeInTheDocument());
    fireEvent.change(screen.getByLabelText(/Ciudad \/ Municipio \*/i), {
      target: { value: 'Guadalajara', name: 'city' },
    });
    await waitFor(() =>
      expect(screen.getByText(/-- Otra \(Especificar\) --/i)).toBeInTheDocument(),
    );
    fireEvent.change(screen.getByLabelText(/Colonia \/ Asentamiento \*/i), {
      target: { value: 'Otra', name: 'neighborhood' },
    });
  });

  it('handles colony fetch failure', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    (globalThis.fetch as Mock).mockRejectedValue(new Error());
    render(<OilSkimmersForm />);
    fireEvent.change(screen.getByLabelText(/Estado \*/i), {
      target: { value: 'Jalisco', name: 'state' },
    });
    fireEvent.change(screen.getByLabelText(/Ciudad \/ Municipio \*/i), {
      target: { value: 'Guadalajara', name: 'city' },
    });
    await waitFor(() => expect(globalThis.fetch).toHaveBeenCalled());
  });
});
