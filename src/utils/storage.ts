import { UserData, Language } from '../types';

export const STORAGE_KEY = 'math_adventure_data';

export const defaultUserData: UserData = {
  settings: {
    ageGroup: '4-6',
    selectedTasks: ['addition'],
    theme: 'light',
    name: 'Learner',
    icon: '👨‍🎓',
    language: 'en',
  },
  history: [],
};

export const loadUserData = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsedData = JSON.parse(data);
      // Ensure we have valid settings with a language
      return {
        ...defaultUserData,
        ...parsedData,
        settings: {
          ...defaultUserData.settings,
          ...parsedData.settings,
          language: (parsedData.settings?.language || 'en') as Language
        }
      };
    }
    return defaultUserData;
  } catch {
    return defaultUserData;
  }
};

export const saveUserData = (data: UserData) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save user data:', error);
  }
};