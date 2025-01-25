import React, { useState, useEffect } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { GameScreen } from './components/GameScreen';
import { ResultScreen } from './components/ResultScreen';
import { Settings } from './components/Settings';
import { History } from './components/History';
import { Help } from './components/Help';
import { About } from './components/About';
import { Portfolio } from './components/Portfolio';
import { Statistics } from './components/Statistics';
import { UserData, GameHistory } from './types';
import { loadUserData, saveUserData, defaultUserData } from './utils/storage';
import { LanguageProvider } from './i18n/LanguageContext';

type GamePhase = 'welcome' | 'playing' | 'result';

function App() {
  const [userData, setUserData] = useState<UserData>(defaultUserData);
  const [gamePhase, setGamePhase] = useState<GamePhase>('welcome');
  const [finalScore, setFinalScore] = useState(0);

  useEffect(() => {
    const savedData = loadUserData();
    setUserData(savedData);
  }, []);

  useEffect(() => {
    if (userData.settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [userData.settings.theme]);

  const handleStart = (newSettings: typeof userData.settings) => {
    if (newSettings.selectedTasks.length > 0 && gamePhase === 'welcome') {
      setUserData(prev => ({
        ...prev,
        settings: newSettings
      }));
      setGamePhase('playing');
    } else {
      setUserData(prev => ({
        ...prev,
        settings: newSettings
      }));
    }
  };

  const handleGameComplete = (score: number) => {
    setFinalScore(score);
    const newHistory: GameHistory = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      score,
      ageGroup: userData.settings.ageGroup,
      taskType: userData.settings.selectedTasks[0],
      totalProblems: 10,
      correctAnswers: Math.floor(score / 10),
    };
    
    const updatedUserData = {
      ...userData,
      history: [newHistory, ...userData.history].slice(0, 50)
    };
    
    setUserData(updatedUserData);
    saveUserData(updatedUserData);
    setGamePhase('result');
  };

  const handlePlayAgain = () => {
    setGamePhase('playing');
  };

  const handleReturnToMenu = () => {
    setGamePhase('welcome');
  };

  const handleUserDataUpdate = (newUserData: UserData) => {
    setUserData(newUserData);
    saveUserData(newUserData);
  };

  const handleSettingsUpdate = (newSettings: typeof userData.settings) => {
    const updatedUserData = {
      ...userData,
      settings: newSettings
    };
    setUserData(updatedUserData);
    saveUserData(updatedUserData);
  };

  return (
    <LanguageProvider 
      language={userData.settings.language}
      setLanguage={(language) => handleSettingsUpdate({ ...userData.settings, language })}
    >
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Settings settings={userData.settings} onSave={handleSettingsUpdate} />
        <History history={userData.history} />
        <Help />
        <About />
        <Portfolio userData={userData} onUpdateUser={handleUserDataUpdate} />
        <Statistics userData={userData} />
        
        {gamePhase === 'welcome' && (
          <WelcomeScreen onStart={handleStart} settings={userData.settings} />
        )}
        {gamePhase === 'playing' && (
          <GameScreen 
            settings={userData.settings}
            onGameComplete={handleGameComplete}
            onReturnToMenu={handleReturnToMenu}
          />
        )}
        {gamePhase === 'result' && (
          <ResultScreen 
            score={finalScore} 
            onPlayAgain={handlePlayAgain}
            onReturnToMenu={handleReturnToMenu}
          />
        )}
      </div>
    </LanguageProvider>
  );
}

export default App;