import { describe, test, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useTranslation } from '../useTranslation';
import { LanguageProvider } from '../LanguageContext';
import { translations } from '../translations';
import React from 'react';

describe('useTranslation', () => {
  test('returns translation for existing key', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <LanguageProvider language="en" setLanguage={() => {}}>
        {children}
      </LanguageProvider>
    );

    const { result } = renderHook(() => useTranslation(), { wrapper });
    expect(result.current.t('welcome')).toBe(translations.en.welcome);
  });

  test('falls back to English for missing translations', () => {
    const mockConsoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <LanguageProvider language="invalid" setLanguage={() => {}}>
        {children}
      </LanguageProvider>
    );

    const { result } = renderHook(() => useTranslation(), { wrapper });
    expect(result.current.t('welcome')).toBe(translations.en.welcome);
    
    mockConsoleWarn.mockRestore();
  });

  test('returns current language', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <LanguageProvider language="de" setLanguage={() => {}}>
        {children}
      </LanguageProvider>
    );

    const { result } = renderHook(() => useTranslation(), { wrapper });
    expect(result.current.language).toBe('de');
  });
});