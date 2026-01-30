import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Contact from './Contact';

// Mock global fetch
global.fetch = vi.fn();

describe('Contact Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders all form fields correctly', () => {
        render(<Contact />);

        expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Empresa/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Teléfono/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Mensaje/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Deseo que me contacten/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Enviar solicitud/i })).toBeInTheDocument();
    });

    it('handles successful form submission', async () => {
        // Mock successful API response
        (global.fetch as any).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ status: 'success', message: 'Mensaje enviado' }),
        });

        render(<Contact />);

        // Fill out form
        fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: 'Juan Perez' } });
        fireEvent.change(screen.getByLabelText(/Empresa/i), { target: { value: 'Industrias ACME' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'juan@acme.com' } });
        fireEvent.change(screen.getByLabelText(/Mensaje/i), { target: { value: 'Solicito cotización de EPP.' } });

        // Submit form
        fireEvent.click(screen.getByRole('button', { name: /Enviar solicitud/i }));

        // Check for loading state
        expect(screen.getByText(/Enviando.../i)).toBeInTheDocument();

        // Check for success message
        await waitFor(() => {
            expect(screen.getByText(/¡Mensaje enviado con éxito!/i)).toBeInTheDocument();
        });

        // Verify API call payload
        expect(global.fetch).toHaveBeenCalledWith('/mail.php', expect.objectContaining({
            method: 'POST',
            body: expect.stringContaining('"name":"Juan Perez"'),
        }));
    });

    it('handles API errors correctly', async () => {
        // Mock error API response
        (global.fetch as any).mockResolvedValueOnce({
            ok: false,
            json: async () => ({ status: 'error', message: 'Error interno del servidor' }),
        });

        render(<Contact />);

        // Fill required fields
        fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: 'Test User' } });
        fireEvent.change(screen.getByLabelText(/Empresa/i), { target: { value: 'Test Corp' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@corp.com' } });
        fireEvent.change(screen.getByLabelText(/Mensaje/i), { target: { value: 'Testing error handling' } });

        // Submit
        fireEvent.click(screen.getByRole('button', { name: /Enviar solicitud/i }));

        // Check for error message
        await waitFor(() => {
            expect(screen.getByText(/Error interno del servidor/i)).toBeInTheDocument();
        });
    });

    it('handles network failures correctly', async () => {
        // Mock network error
        (global.fetch as any).mockRejectedValueOnce(new Error('Network error'));

        render(<Contact />);

        fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: 'Net User' } });
        fireEvent.change(screen.getByLabelText(/Empresa/i), { target: { value: 'Net Corp' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'net@corp.com' } });
        fireEvent.change(screen.getByLabelText(/Mensaje/i), { target: { value: 'Network test' } });

        fireEvent.click(screen.getByRole('button', { name: /Enviar solicitud/i }));

        await waitFor(() => {
            expect(screen.getByText(/Hubo un problema de conexión/i)).toBeInTheDocument();
        });
    });
});
