import React, { useState } from 'react';
import { Info, X, Brain, Target, Puzzle, Sparkles, Mail, User } from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation';

export const About: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <div className="group relative">
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-4 right-40 p-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-200"
          aria-label={t('about')}
        >
          <Info className="w-6 h-6" />
        </button>
        <div className="absolute right-0 top-full mt-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
          {t('about')}
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <Brain className="w-6 h-6" />
                {t('about')}
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Author and Developer Section */}
              <section>
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Author & Developer
                </h3>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-2">
                    <span className="font-medium">Yury Volokitin</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <Mail className="w-4 h-4" />
                    <a 
                      href="mailto:yuri.volokitin@gmail.com"
                      className="text-purple-600 dark:text-purple-400 hover:underline"
                    >
                      yuri.volokitin@gmail.com
                    </a>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  {t('purpose')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('purposeDescription')}
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                  <Puzzle className="w-5 h-5" />
                  {t('solution')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('solutionDescription')}
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  {t('benefits')}
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                    <span>•</span>
                    {t('benefit1')}
                  </li>
                  <li className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                    <span>•</span>
                    {t('benefit2')}
                  </li>
                  <li className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                    <span>•</span>
                    {t('benefit3')}
                  </li>
                  <li className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                    <span>•</span>
                    {t('benefit4')}
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
};