import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
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

        // Base (2 layers) + 3 dynamic layers = 5 rects in total inside the SVG
        // Let's check for the specific classes of v5.2
        expect(container.querySelector('.sun-grow-left-v5')).toBeInTheDocument();
        expect(container.querySelector('.luna-full-rl-v5')).toBeInTheDocument();
        expect(container.querySelector('.sol-half-rl-v5')).toBeInTheDocument();
    });

    it('renders simpleMode when prop is passed', () => {
        renderHeader({ simpleMode: true });
        // In simple mode, it should show "Ver nuestro sitio web" or similar (check button text)
        expect(screen.getByText(/Sitio Web/i)).toBeInTheDocument();
    });

    it('toggles mobile menu when trigger is clicked', () => {
        renderHeader();
        const trigger = screen.getByLabelText('Menu');

        // Initial state: menu presumably hidden or not "open"
        const mobileMenu = document.querySelector('.mobile-menu');
        expect(mobileMenu).not.toHaveClass('open');

        // Click trigger
        trigger.click();
        expect(mobileMenu).toHaveClass('open');

        // Click again to close
        trigger.click();
        expect(mobileMenu).not.toHaveClass('open');
    });
});
