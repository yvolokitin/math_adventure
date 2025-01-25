import React, { useState, useEffect } from 'react';
import { Problem, GameState, UserSettings } from '../types';
import { generateProblems } from '../utils/problemGenerator';
import { Star, Trophy, Sparkles, ArrowLeft } from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation';

interface GameScreenProps {
  settings: UserSettings;
  onGameComplete: (score: number) => void;
  onReturnToMenu: () => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({ settings, onGameComplete, onReturnToMenu }) => {
  const { t } = useTranslation();
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    streak: 0,
    level: 1,
    problems: [],
    currentProblemIndex: 0,
  });
  const [animation, setAnimation] = useState<'correct' | 'incorrect' | null>(null);
  const [isAnswerDisabled, setIsAnswerDisabled] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  useEffect(() => {
    const problems = generateProblems(settings.ageGroup, settings.selectedTasks);
    setGameState(prev => ({ ...prev, problems }));
  }, [settings]);

  const handleAnswer = (answer: string) => {
    if (isAnswerDisabled) return;
    
    const currentProblem = gameState.problems[gameState.currentProblemIndex];
    const isCorrect = answer === currentProblem.correctAnswer;
    
    setIsAnswerDisabled(true);
    setAnimation(isCorrect ? 'correct' : 'incorrect');
    setSelectedAnswer(answer);

    setTimeout(() => {
      setGameState(prev => ({
        ...prev,
        score: isCorrect ? prev.score + currentProblem.points : prev.score,
        streak: isCorrect ? prev.streak + 1 : 0,
        currentProblemIndex: prev.currentProblemIndex + 1,
      }));
      
      setAnimation(null);
      setIsAnswerDisabled(false);
      setSelectedAnswer(null);

      if (gameState.currentProblemIndex === gameState.problems.length - 1) {
        onGameComplete(isCorrect ? gameState.score + currentProblem.points : gameState.score);
      }
    }, 1000);
  };

  if (gameState.problems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-300 text-xl">Loading...</div>
      </div>
    );
  }

  const currentProblem = gameState.problems[gameState.currentProblemIndex];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-purple-50 dark:from-gray-900 dark:to-purple-900 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onReturnToMenu}
            className="flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            {t('backToMenu')}
          </button>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Trophy className="text-yellow-500" />
              <span className="text-xl font-bold text-gray-800 dark:text-gray-200">{t('score')}: {gameState.score}</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="text-purple-500" />
              <span className="text-xl font-bold text-gray-800 dark:text-gray-200">{t('streak')}: {gameState.streak}</span>
            </div>
          </div>
        </div>

        <div 
          className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8 transform transition-all duration-300
            ${animation === 'correct' ? 'scale-105 ring-4 ring-green-400' : ''}
            ${animation === 'incorrect' ? 'scale-95 ring-4 ring-red-400' : ''}
          `}
        >
          <div className="text-center mb-8 relative">
            {animation === 'correct' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-[ping_1s_ease-in-out] absolute w-full h-full bg-green-400 opacity-20 rounded-xl"></div>
                <span className="animate-[bounce_0.5s_ease-in-out] absolute text-4xl">✨</span>
              </div>
            )}
            {animation === 'incorrect' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-[shake_0.5s_ease-in-out] absolute w-full h-full bg-red-400 opacity-20 rounded-xl"></div>
                <span className="animate-[bounce_0.5s_ease-in-out] absolute text-4xl">❌</span>
              </div>
            )}
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">{t('problem')} {gameState.currentProblemIndex + 1}</h2>
            <p className="text-4xl font-bold text-purple-600 dark:text-purple-400">{currentProblem.question}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {currentProblem.options.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = option === currentProblem.correctAnswer;
              const showCorrect = animation === 'incorrect' && isCorrect;
              
              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  disabled={isAnswerDisabled}
                  className={`
                    text-white text-xl font-bold py-4 px-6 rounded-lg 
                    transition-all duration-200 transform hover:scale-105 active:scale-95
                    disabled:cursor-not-allowed disabled:transform-none
                    ${showCorrect 
                      ? 'bg-green-500 dark:bg-green-600' 
                      : isSelected && animation === 'incorrect'
                      ? 'bg-red-500 dark:bg-red-600'
                      : isSelected && animation === 'correct'
                      ? 'bg-green-500 dark:bg-green-600'
                      : 'bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700'
                    }
                    ${isAnswerDisabled && !isSelected && !showCorrect ? 'opacity-50' : ''}
                  `}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center">
          {Array.from({ length: Math.min(gameState.streak, 5) }).map((_, i) => (
            <Star key={i} className="text-yellow-400 fill-current animate-[bounce_0.5s_ease-in-out]" />
          ))}
        </div>
      </div>
    </div>
  );
};