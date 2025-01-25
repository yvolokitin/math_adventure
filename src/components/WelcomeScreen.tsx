import React from 'react';
import { AgeGroup, TaskType, UserSettings } from '../types';
import { Brain, Plus, Minus, X, Divide, Hash, Binary, Percent, Box, FunctionSquare as Functions, Equal, Sigma, Braces } from 'lucide-react';
import { getAvailableTasks } from '../utils/problemGenerator';
import { useTranslation } from '../i18n/useTranslation';
import { taskTranslations } from '../utils/taskTranslations';

interface WelcomeScreenProps {
  onStart: (settings: UserSettings) => void;
  settings: UserSettings;
}

const ageGroupIcons = {
  '4-6': '🌟',
  '7-9': '🚀',
  '10-12': '🎓'
};

const taskIcons: Record<TaskType, React.ReactNode> = {
  addition: <Plus className="w-5 h-5" />,
  subtraction: <Minus className="w-5 h-5" />,
  multiplication: <X className="w-5 h-5" />,
  division: <Divide className="w-5 h-5" />,
  fractions: <Hash className="w-5 h-5" />,
  decimals: <Binary className="w-5 h-5" />,
  percentages: <Percent className="w-5 h-5" />,
  proportions: <Box className="w-5 h-5" />,
  ratios: <Functions className="w-5 h-5" />,
  expressions: <Braces className="w-5 h-5" />,
  equations: <Equal className="w-5 h-5" />,
  inequalities: <Sigma className="w-5 h-5" />,
  systems: <Box className="w-5 h-5" />,
  polynomials: <Functions className="w-5 h-5" />
};

// All possible tasks in the order we want to display them
const allTasks: TaskType[] = [
  'addition',
  'subtraction',
  'multiplication',
  'division',
  'fractions',
  'decimals',
  'percentages',
  'expressions',
  'equations',
  'inequalities',
  'systems',
  'polynomials',
  'proportions',
  'ratios'
];

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart, settings }) => {
  const { t, language } = useTranslation();
  
  const handleAgeGroupSelect = (ageGroup: AgeGroup) => {
    onStart({
      ...settings,
      ageGroup,
      selectedTasks: [] // Clear selected tasks when changing age group
    });
  };

  const handleTaskSelect = (task: TaskType) => {
    onStart({
      ...settings,
      selectedTasks: [task]
    });
  };

  const handleStartPractice = () => {
    if (settings.selectedTasks.length === 0) {
      const availableTasks = getAvailableTasks(settings.ageGroup);
      onStart({
        ...settings,
        selectedTasks: [availableTasks[0]]
      });
    }
    // This is where we actually start the practice
    onStart(settings);
  };

  const availableTasks = getAvailableTasks(settings.ageGroup);
  const currentTranslations = taskTranslations[language] || taskTranslations['en'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 dark:from-gray-900 dark:to-purple-900 flex items-center justify-center p-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-md w-full">
        <div className="flex justify-center mb-6">
          <Brain className="w-16 h-16 text-purple-600 dark:text-purple-400" />
        </div>
        
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">{settings.icon}</span>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            {t('welcome')}, {settings.name}!
          </h1>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
              {t('chooseAgeGroup')}
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {(['4-6', '7-9', '10-12'] as AgeGroup[]).map((age) => (
                <button
                  key={age}
                  onClick={() => handleAgeGroupSelect(age)}
                  className={`
                    flex flex-col items-center p-4 rounded-lg transition-all duration-200
                    ${settings.ageGroup === age
                      ? 'bg-purple-100 dark:bg-purple-900 border-2 border-purple-500'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700 border-2 border-transparent'
                    }
                  `}
                >
                  <span className="text-4xl mb-2">{ageGroupIcons[age]}</span>
                  <span className="font-medium text-gray-700 dark:text-gray-300">{age} {t('years')}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
              {t('selectMathTask')}
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {allTasks.map((task) => {
                const isAvailable = availableTasks.includes(task);
                return (
                  <button
                    key={task}
                    onClick={() => isAvailable && handleTaskSelect(task)}
                    disabled={!isAvailable}
                    className={`
                      flex items-center p-3 rounded-lg transition-all duration-200
                      ${!isAvailable ? 'opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-700' : 
                        settings.selectedTasks[0] === task
                          ? 'bg-purple-100 dark:bg-purple-900 border-2 border-purple-500'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-700 border-2 border-transparent'
                      }
                    `}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`
                        ${settings.selectedTasks[0] === task ? 'text-purple-600 dark:text-purple-400' : 'text-gray-500 dark:text-gray-400'}
                        ${!isAvailable ? 'opacity-50' : ''}
                      `}>
                        {taskIcons[task]}
                      </div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {currentTranslations.taskNames[task]}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={handleStartPractice}
            disabled={settings.selectedTasks.length === 0}
            className={`w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 
              ${settings.selectedTasks.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {t('startPracticing')}
          </button>
        </div>
      </div>
    </div>
  );
};