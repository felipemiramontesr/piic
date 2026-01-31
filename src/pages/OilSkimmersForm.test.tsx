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
    expect(screen.getByLabelText(/Nombre de la Compañía/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Estado/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Ciudad \/ Municipio/i)).toBeInTheDocument();
  });

  it('updates cities based on selected state', async () => {
    render(<OilSkimmersForm />);
    const stateSelect = screen.getByLabelText(/Estado \*/i) as HTMLSelectElement;

    // Select Jalisco
    fireEvent.change(stateSelect, { target: { value: 'Jalisco' } });

    const citySelect = screen.getByLabelText(/Ciudad \/ Municipio \*/i) as HTMLSelectElement;
    expect(citySelect).not.toBeDisabled();

    // Wait for update (due to internal useEffect)
    await waitFor(() => {
      expect(screen.getByText('Guadalajara')).toBeInTheDocument();
    });
  });

  it('auto-fills zip code when colonia is selected', async () => {
    // Mock API response for colonias
    (globalThis.fetch as Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        zip_codes: [{ d_asenta: 'Centro', d_codigo: '44100' }],
      }),
    });

    render(<OilSkimmersForm />);

    // Set state and city
    fireEvent.change(screen.getByLabelText(/Estado \*/i), { target: { value: 'Jalisco' } });

    // Wait for city list to be available
    await waitFor(() => {
      expect(screen.getByText('Guadalajara')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText(/Ciudad \/ Municipio \*/i), {
      target: { value: 'Guadalajara' },
    });

    await waitFor(() => {
      expect((screen.getByLabelText(/Ciudad \/ Municipio \*/i) as HTMLSelectElement).value).toBe(
        'Guadalajara',
      );
    });

    // Wait for colonia list
    await waitFor(() => {
      expect(screen.getByText('Centro')).toBeInTheDocument();
    });

    // Select colonia
    fireEvent.change(screen.getByLabelText(/Colonia \/ Asentamiento \*/i), {
      target: { value: 'Centro' },
    });

    // Verify zip code field
    const zipField = screen.getByLabelText(/Código Postal \*/i) as HTMLInputElement;
    expect(zipField.value).toBe('44100');
    expect(zipField).toHaveAttribute('readonly');
  });

  it('prevents submission if no container type is selected', async () => {
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
    render(<OilSkimmersForm />);

    // Fill basic required fields
    fireEvent.change(screen.getByLabelText(/Nombre de la Compañía \*/i), {
      target: { value: 'Test Co' },
    });
    fireEvent.change(screen.getByLabelText(/Dirección \(Calle y número\) \*/i), {
      target: { value: 'Street 123' },
    });
    fireEvent.change(screen.getByLabelText(/Estado \*/i), { target: { value: 'Aguascalientes' } });

    await waitFor(() => {
      expect(screen.getByText('Calvillo')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText(/Ciudad \/ Municipio \*/i), {
      target: { value: 'Calvillo' },
    });

    // Submit without checking any container
    fireEvent.click(screen.getByRole('button', { name: /ENVIAR INFORMACIÓN/i }));

    expect(alertMock).toHaveBeenCalledWith('Por favor seleccione al menos un tipo de contenedor.');
    expect(globalThis.fetch).not.toHaveBeenCalled();
    alertMock.mockRestore();
  });

  it('handles successful form submission', async () => {
    (globalThis.fetch as Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ status: 'success' }),
    });

    render(<OilSkimmersForm />);

    // Fill minimum required
    fireEvent.change(screen.getByLabelText(/Nombre de la Compañía \*/i), {
      target: { value: 'Full Test Co' },
    });
    fireEvent.change(screen.getByLabelText(/Dirección \(Calle y número\) \*/i), {
      target: { value: 'Street High' },
    });
    fireEvent.change(screen.getByLabelText(/Estado \*/i), {
      target: { value: 'Ciudad de Mexico' },
    });

    await waitFor(() => {
      expect(screen.getByText('Coyoacan')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText(/Ciudad \/ Municipio \*/i), {
      target: { value: 'Coyoacan' },
    });

    await waitFor(() => {
      expect((screen.getByLabelText(/Ciudad \/ Municipio \*/i) as HTMLSelectElement).value).toBe(
        'Coyoacan',
      );
    });

    // Mock the colonias fetch that happens on city change
    (globalThis.fetch as Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ zip_codes: [{ d_asenta: 'Coyoacán Centro', d_codigo: '04000' }] }),
    });

    await waitFor(() => {
      expect(screen.getByText('Coyoacán Centro')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText(/Colonia \/ Asentamiento \*/i), {
      target: { value: 'Coyoacán Centro' },
    });

    fireEvent.change(screen.getByLabelText(/Nombre del Contacto \*/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText(/Email \*/i), { target: { value: 'john@doe.com' } });
    fireEvent.change(screen.getByLabelText(/Teléfono Móvil \*/i), {
      target: { value: '1234567890' },
    });

    // Radios
    fireEvent.click(screen.getByLabelText(/Sí/i)); // Oil floats
    fireEvent.click(screen.getByLabelText(/Ligero/i)); // Viscosity
    fireEvent.change(screen.getByLabelText(/Cantidad estimada.* \*/i), { target: { value: '10' } });
    fireEvent.click(screen.getByLabelText(/120 V/i));
    fireEvent.click(screen.getByLabelText(/Interior/i));

    // Checkbox - Find Tanque by traversing or using getByText since it's nested
    const checkbox = screen.getByLabelText(/Tanque/i);
    fireEvent.click(checkbox);

    // Prep the submission mock
    (globalThis.fetch as Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ status: 'success' }),
    });

    // Submit
    fireEvent.click(screen.getByRole('button', { name: /ENVIAR INFORMACIÓN/i }));

    await waitFor(
      () => {
        expect(screen.getByText(/¡Información Enviada!/i)).toBeInTheDocument();
      },
      { timeout: 3000 },
    );
  });
});
