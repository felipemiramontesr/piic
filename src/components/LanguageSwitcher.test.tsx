import { render, screen, fireEvent } from '@testing-library/react';
import LanguageSwitcher from './LanguageSwitcher';
import { describe, it, expect, vi } from 'vitest';

// Mock useTranslation with a way to change language in tests
let currentMockLanguage: string | null = 'es';
const mockChangeLanguage = vi.fn((lang) => {
  currentMockLanguage = lang;
});

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      get language() {
        return currentMockLanguage;
      },
      changeLanguage: mockChangeLanguage,
    },
  }),
}));

describe('LanguageSwitcher', () => {
  it('toggles from ES to EN', () => {
    currentMockLanguage = 'es';
    render(<LanguageSwitcher />);

    const button = screen.getByLabelText('Toggle Language');
    expect(screen.getByText('EN')).toBeInTheDocument();

    fireEvent.click(button);
    expect(mockChangeLanguage).toHaveBeenCalledWith('en');
  });

  it('handles extended language codes like es-MX', () => {
    currentMockLanguage = 'es-MX';
    render(<LanguageSwitcher />);
    expect(screen.getByText('EN')).toBeInTheDocument();
  });

  it('handles null/undefined language and defaults to es behavior', () => {
    currentMockLanguage = null;
    render(<LanguageSwitcher />);
    expect(screen.getByText('EN')).toBeInTheDocument();
  });

  it('toggles from EN to ES', () => {
    currentMockLanguage = 'en';
    render(<LanguageSwitcher />);
    expect(screen.getByText('ES')).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Toggle Language'));
    expect(mockChangeLanguage).toHaveBeenCalledWith('es');
  });
});
