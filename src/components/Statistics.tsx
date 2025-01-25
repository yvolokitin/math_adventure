import React, { useState } from 'react';
import { Medal, X, Trophy, Target, Calendar } from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation';
import { UserData } from '../types';

interface StatisticsProps {
  userData: UserData;
}

export const Statistics: React.FC<StatisticsProps> = ({ userData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  // Calculate statistics
  const totalScore = userData.history.reduce((sum, game) => sum + game.score, 0);
  const totalTasks = userData.history.length;
  const firstGame = userData.history[userData.history.length - 1];
  const firstGameDate = firstGame 
    ? new Date(firstGame.date).toLocaleDateString()
    : t('noGamesYet');
  const averageAccuracy = userData.history.length > 0
    ? Math.round(
        (userData.history.reduce((sum, game) => sum + (game.correctAnswers / game.totalProblems), 0) / 
        userData.history.length) * 100
      )
    : 0;

  if (!isOpen) {
    return (
      <div className="group relative">
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-4 right-64 p-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-200"
          aria-label={t('statistics')}
        >
          <Medal className="w-6 h-6" />
        </button>
        <div className="absolute right-0 top-full mt-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
          {t('statistics')}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-2xl w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <Medal className="w-6 h-6" />
            {t('statistics')}
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 flex items-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-500" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t('totalScore')}</p>
              <p className="text-xl font-bold text-gray-800 dark:text-white">{totalScore}</p>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 flex items-center gap-3">
            <Target className="w-8 h-8 text-green-500" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t('tasksCompleted')}</p>
              <p className="text-xl font-bold text-gray-800 dark:text-white">{totalTasks}</p>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 flex items-center gap-3">
            <Calendar className="w-8 h-8 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t('firstGame')}</p>
              <p className="text-xl font-bold text-gray-800 dark:text-white">{firstGameDate}</p>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 flex items-center gap-3">
            <Target className="w-8 h-8 text-purple-500" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t('averageAccuracy')}</p>
              <p className="text-xl font-bold text-gray-800 dark:text-white">{averageAccuracy}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};