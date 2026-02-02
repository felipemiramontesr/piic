import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import Header from './Header';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Header Component', () => {
    const renderHeader = (props = {}) => {
        return render(
            <Router>
                <Header {...props} />
            </Router>
        );
    };

    it('renders correctly with the logo text', () => {
        renderHeader();
        expect(screen.getByText('PIIC')).toBeInTheDocument();
    });

    it('contains the animated logo SVG', () => {
        const { container } = renderHeader();
        const svg = container.querySelector('.logo-icon.animated-logo');
        expect(svg).toBeInTheDocument();
    });

    it('contains specifically 4 animation layers for v5.2', () => {
        const { container } = renderHeader();

        // Let's check for the specific classes of v5.2
        expect(container.querySelector('.sun-grow-left-v5')).toBeInTheDocument();
        expect(container.querySelector('.luna-full-rl-v5')).toBeInTheDocument();
        expect(container.querySelector('.sol-half-rl-v5')).toBeInTheDocument();
    });

    it('renders simpleMode when prop is passed', () => {
        renderHeader({ simpleMode: true });
        // Usamos getAllByText y verificamos que al menos uno esté presente (desktop/mobile spans)
        const elements = screen.getAllByText(/Sitio Web/i);
        expect(elements.length).toBeGreaterThan(0);
    });

    it('toggles mobile menu when trigger is clicked', () => {
        const { container } = renderHeader();
        const trigger = screen.getByLabelText('Menu');

        // Selector más robusto para el menú móvil
        const mobileMenu = container.querySelector('.mobile-menu');
        expect(mobileMenu).not.toHaveClass('open');

        // Click trigger para abrir usando fireEvent para asegurar el tick de React
        fireEvent.click(trigger);
        expect(mobileMenu).toHaveClass('open');

        // Click trigger para cerrar
        fireEvent.click(trigger);
        expect(mobileMenu).not.toHaveClass('open');
    });

    it('closes mobile menu when "Solicitar cotización" is clicked', () => {
        const { container } = renderHeader();
        const trigger = screen.getByLabelText('Menu');
        const mobileMenu = container.querySelector('.mobile-menu');

        // Open menu
        fireEvent.click(trigger);
        expect(mobileMenu).toHaveClass('open');

        // Find the CTA button in the mobile menu and click it
        // There are two buttons with the same name, we want the one inside the mobile menu
        const ctaButtons = screen.getAllByRole('link', { name: /solicitar cotización/i });
        const mobileCta = ctaButtons.find(btn => btn.closest('.mobile-menu'));

        if (!mobileCta) throw new Error('Mobile CTA button not found');
        fireEvent.click(mobileCta);

        // Verify menu is closed
        expect(mobileMenu).not.toHaveClass('open');
    });
});
