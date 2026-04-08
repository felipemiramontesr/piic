import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from './Button';

describe('Button', () => {
  it('renders a button by default', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('btn-primary');
  });

  it('renders an anchor when href is provided', () => {
    render(<Button href="https://example.com">Go to site</Button>);
    const link = screen.getByRole('link', { name: /go to site/i });
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveClass('btn-primary');
  });

  it('applies variant and fullWidth classes', () => {
    const { rerender } = render(
      <Button variant="outline" fullWidth>
        Outline Button
      </Button>,
    );
    let button = screen.getByRole('button', { name: /outline button/i });
    expect(button).toHaveClass('btn-outline');
    expect(button).toHaveClass('btn-full');

    rerender(<Button className="custom-class">Custom Button</Button>);
    button = screen.getByRole('button', { name: /custom button/i });
    expect(button).toHaveClass('custom-class');
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button', { name: /click me/i }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('calls onClick on anchor when clicked', () => {
    const onClick = vi.fn();
    render(
      <Button href="#" onClick={onClick}>
        Link
      </Button>,
    );
    fireEvent.click(screen.getByRole('link', { name: /link/i }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
