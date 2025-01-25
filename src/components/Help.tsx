import React, { useState } from 'react';
import { HelpCircle, X, Star, Trophy, Brain, Calculator } from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation';
import { TaskType } from '../types';

const taskPoints: Record<TaskType, { base: number, description: string }> = {
  addition: { base: 10, description: 'Basic arithmetic operation' },
  subtraction: { base: 10, description: 'Basic arithmetic operation' },
  multiplication: { base: 15, description: 'Intermediate arithmetic operation' },
  division: { base: 15, description: 'Intermediate arithmetic operation' },
  fractions: { base: 20, description: 'Working with parts of whole numbers' },
  decimals: { base: 20, description: 'Numbers with decimal points' },
  percentages: { base: 25, description: 'Converting between fractions and percentages' },
  proportions: { base: 25, description: 'Comparing quantities using ratios' },
  ratios: { base: 25, description: 'Expressing relationships between numbers' },
  expressions: { base: 25, description: 'Mathematical phrases with numbers and operations' },
  equations: { base: 30, description: 'Finding unknown values in equations' },
  inequalities: { base: 30, description: 'Comparing expressions with inequalities' },
  systems: { base: 35, description: 'Solving multiple equations together' },
  polynomials: { base: 35, description: 'Working with algebraic expressions' }
};

export const Help: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <div className="group relative">
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-4 right-28 p-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-200"
          aria-label={t('help')}
        >
          <HelpCircle className="w-6 h-6" />
        </button>
        <div className="absolute right-0 top-full mt-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
          {t('help')}
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <Brain className="w-6 h-6" />
                {t('help')}
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Scoring System */}
              <section>
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  {t('scoringSystem')}
                </h3>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {t('scoringExplanation')}
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <Star className="w-4 h-4 text-yellow-500" />
                      {t('ageGroupBonus')}
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <Star className="w-4 h-4 text-yellow-500" />
                      {t('streakBonus')}
                    </li>
                  </ul>
                </div>
              </section>

              {/* Task Types */}
              <section>
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  {t('taskTypes')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(taskPoints).map(([task, { base, description }]) => (
                    <div
                      key={task}
                      className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
                    >
                      <h4 className="font-medium text-gray-700 dark:text-gray-200 mb-1 capitalize">
                        {task}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {description}
                      </p>
                      <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">
                        {t('basePoints')}: {base}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Features */}
              <section>
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  {t('features')}
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                    <span className="text-2xl">🌍</span>
                    <div>
                      <p className="font-medium">{t('multiLanguageSupport')}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {t('multiLanguageDescription')}
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                    <span className="text-2xl">🎯</span>
                    <div>
                      <p className="font-medium">{t('adaptiveDifficulty')}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {t('adaptiveDifficultyDescription')}
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                    <span className="text-2xl">📊</span>
                    <div>
                      <p className="font-medium">{t('progressTracking')}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {t('progressTrackingDescription')}
                      </p>
                    </div>
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