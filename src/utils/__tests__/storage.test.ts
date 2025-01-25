import { describe, test, expect, beforeEach, vi } from 'vitest';
import { loadUserData, saveUserData, defaultUserData } from '../storage';

describe('Storage Utils', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('loadUserData', () => {
    test('returns default data when localStorage is empty', () => {
      const data = loadUserData();
      expect(data).toEqual(defaultUserData);
    });

    test('returns parsed data from localStorage', () => {
      const testData = {
        ...defaultUserData,
        settings: { ...defaultUserData.settings, name: 'Test User' }
      };
      localStorage.setItem('math_adventure_data', JSON.stringify(testData));
      const data = loadUserData();
      expect(data.settings.name).toBe('Test User');
    });

    test('handles invalid JSON gracefully', () => {
      localStorage.setItem('math_adventure_data', 'invalid json');
      const data = loadUserData();
      expect(data).toEqual(defaultUserData);
    });

    test('ensures language is set', () => {
      const testData = {
        ...defaultUserData,
        settings: { ...defaultUserData.settings, language: undefined }
      };
      localStorage.setItem('math_adventure_data', JSON.stringify(testData));
      const data = loadUserData();
      expect(data.settings.language).toBe('en');
    });
  });

  describe('saveUserData', () => {
    test('saves data to localStorage', () => {
      const testData = {
        ...defaultUserData,
        settings: { ...defaultUserData.settings, name: 'Test User' }
      };
      saveUserData(testData);
      const savedData = JSON.parse(localStorage.getItem('math_adventure_data') || '');
      expect(savedData.settings.name).toBe('Test User');
    });

    test('handles storage errors gracefully', () => {
      // Mock localStorage.setItem to throw error
      const mockConsoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
      const mockSetItem = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new Error('Storage full');
      });

      saveUserData(defaultUserData);
      expect(mockConsoleError).toHaveBeenCalled();

      mockConsoleError.mockRestore();
      mockSetItem.mockRestore();
    });
  });
});