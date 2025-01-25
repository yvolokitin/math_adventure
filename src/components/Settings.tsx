import React, { useState } from 'react';
import { Settings as SettingsIcon, X } from 'lucide-react';
import { UserSettings, Language } from '../types';
import { useTranslation } from '../i18n/useTranslation';

const LANGUAGES: { code: Language; name: string }[] = [
  // Western European
  { code: 'en', name: 'English' },
  { code: 'de', name: 'Deutsch' },
  { code: 'fr', name: 'Français' },
  { code: 'es', name: 'Español' },
  { code: 'it', name: 'Italiano' },
  { code: 'pt', name: 'Português' },
  { code: 'nl', name: 'Nederlands' },
  
  // Central European
  { code: 'pl', name: 'Polski' },
  { code: 'cs', name: 'Čeština' },
  { code: 'sk', name: 'Slovenčina' },
  { code: 'hu', name: 'Magyar' },
  
  // Eastern/Southern European
  { code: 'ru', name: 'Русский' },
  { code: 'ro', name: 'Română' },
  { code: 'bg', name: 'Български' },
  { code: 'el', name: 'Ελληνικά' },
  
  // Nordic
  { code: 'da', name: 'Dansk' },
  { code: 'sv', name: 'Svenska' },
  { code: 'fi', name: 'Suomi' },
  
  // Baltic
  { code: 'et', name: 'Eesti' },
  { code: 'lv', name: 'Latviešu' },
  { code: 'lt', name: 'Lietuvių' },
  
  // Chinese
  { code: 'zh', name: '中文' }
];

interface SettingsProps {
  settings: UserSettings;
  onSave: (settings: UserSettings) => void;
}

export const Settings: React.FC<SettingsProps> = ({ settings, onSave }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localSettings, setLocalSettings] = useState(settings);
  const { t } = useTranslation();

  // Update local settings when props change
  React.useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleThemeChange = (theme: 'light' | 'dark') => {
    const newSettings = { ...localSettings, theme };
    setLocalSettings(newSettings);
    onSave(newSettings);
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const language = event.target.value as Language;
    const newSettings = { ...localSettings, language };
    setLocalSettings(newSettings);
    onSave(newSettings);
  };

  if (!isOpen) {
    return (
      <div className="group relative">
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-4 right-4 p-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-200"
          aria-label={t('settings')}
        >
          <SettingsIcon className="w-6 h-6" />
        </button>
        <div className="absolute right-0 top-full mt-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
          {t('settings')}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{t('settings')}</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('theme')}
            </label>
            <div className="flex gap-4">
              <button
                onClick={() => handleThemeChange('light')}
                className={`flex-1 p-3 rounded-lg border ${
                  localSettings.theme === 'light'
                    ? 'bg-purple-100 dark:bg-purple-900 border-purple-500'
                    : 'border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {t('light')}
              </button>
              <button
                onClick={() => handleThemeChange('dark')}
                className={`flex-1 p-3 rounded-lg border ${
                  localSettings.theme === 'dark'
                    ? 'bg-purple-100 dark:bg-purple-900 border-purple-500'
                    : 'border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {t('dark')}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('language')}
            </label>
            <select
              value={localSettings.language}
              onChange={handleLanguageChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white appearance-none bg-white dark:bg-gray-700"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => {
              onSave(localSettings);
              setIsOpen(false);
            }}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            {t('saveSettings')}
          </button>
        </div>
      </div>
    </div>
  );
};