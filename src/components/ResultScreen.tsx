import React from 'react';
import { Trophy, Star, ArrowRight, Home } from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation';

interface ResultScreenProps {
  score: number;
  onPlayAgain: () => void;
  onReturnToMenu: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ 
  score, 
  onPlayAgain,
  onReturnToMenu 
}) => {
  const { t } = useTranslation();

  const getAchievementMessage = (score: number) => {
    if (score >= 150) return "Outstanding! You're a Math Genius! 🌟";
    if (score >= 100) return "Great job! You're Getting Better! 🎉";
    if (score >= 50) return "Good effort! Keep practicing! 💪";
    return "Nice try! Practice makes perfect! 📚";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-purple-50 dark:from-gray-900 dark:to-purple-900 flex items-center justify-center p-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <Trophy className="w-16 h-16 text-yellow-500" />
        </div>

        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">{t('gameComplete')}</h2>
        
        <div className="mb-6">
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">
            {t('score')}: {score}
          </p>
          <div className="flex justify-center gap-1 mb-4">
            {Array.from({ length: Math.min(Math.floor(score / 30), 5) }).map((_, i) => (
              <Star key={i} className="text-yellow-400 fill-current" />
            ))}
          </div>
          <p className="text-gray-600 dark:text-gray-300">{getAchievementMessage(score)}</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={onPlayAgain}
            className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 w-full"
          >
            {t('playAgain')} <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onReturnToMenu}
            className="bg-gray-600 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 w-full"
          >
            {t('returnToMenu')} <Home className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};