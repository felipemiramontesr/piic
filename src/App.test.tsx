import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App Component', () => {
    it('should render the NEO-GENESIS title', () => {
        render(<App />)
        const titleElement = screen.getByText(/NEO-GENESIS/i)
        expect(titleElement).toBeInTheDocument()
    })

    it('should render the subtitle', () => {
        render(<App />)
        const subtitleElement = screen.getByText(/La Próxima Evolución en Diseño Web/i)
        expect(subtitleElement).toBeInTheDocument()
    })
})
