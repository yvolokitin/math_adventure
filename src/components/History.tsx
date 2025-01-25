import React, { useState } from 'react';
import { History as HistoryIcon, X, Trophy, Calendar, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { GameHistory } from '../types';
import { useTranslation } from '../i18n/useTranslation';
import { taskTranslations } from '../utils/taskTranslations';

interface HistoryProps {
  history: GameHistory[];
}

type CalendarDay = {
  date: Date;
  sessions: GameHistory[];
};

const generateCalendarDays = (year: number, month: number, history: GameHistory[]): CalendarDay[] => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const days: CalendarDay[] = [];

  // Add padding days from previous month
  const startPadding = firstDay.getDay();
  for (let i = startPadding - 1; i >= 0; i--) {
    const date = new Date(year, month, -i);
    days.push({ date, sessions: [] });
  }

  // Add days of current month
  for (let date = 1; date <= lastDay.getDate(); date++) {
    const currentDate = new Date(year, month, date);
    const sessions = history.filter(session => {
      const sessionDate = new Date(session.date);
      return (
        sessionDate.getFullYear() === currentDate.getFullYear() &&
        sessionDate.getMonth() === currentDate.getMonth() &&
        sessionDate.getDate() === currentDate.getDate()
      );
    });
    days.push({ date: currentDate, sessions });
  }

  // Add padding days for next month to complete the grid
  const endPadding = 42 - days.length; // 6 rows × 7 days = 42
  for (let i = 1; i <= endPadding; i++) {
    const date = new Date(year, month + 1, i);
    days.push({ date, sessions: [] });
  }

  return days;
};

export const History: React.FC<HistoryProps> = ({ history }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const { t, language } = useTranslation();

  const currentTranslations = taskTranslations[language] || taskTranslations['en'];
  const calendarDays = generateCalendarDays(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    history
  );

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handlePreviousYear = () => {
    setCurrentDate(new Date(currentDate.getFullYear() - 1, currentDate.getMonth()));
  };

  const handleNextYear = () => {
    setCurrentDate(new Date(currentDate.getFullYear() + 1, currentDate.getMonth()));
  };

  const getDayClasses = (day: CalendarDay) => {
    const isCurrentMonth = day.date.getMonth() === currentDate.getMonth();
    const isToday = new Date().toDateString() === day.date.toDateString();
    const isSelected = selectedDate?.toDateString() === day.date.toDateString();
    const hasSessions = day.sessions.length > 0;

    return `
      relative h-24 border border-gray-200 dark:border-gray-700 p-2 transition-colors
      ${isCurrentMonth ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-900'}
      ${isToday ? 'ring-2 ring-purple-500' : ''}
      ${isSelected ? 'ring-2 ring-blue-500' : ''}
      ${hasSessions ? 'cursor-pointer hover:bg-purple-50 dark:hover:bg-purple-900' : ''}
    `;
  };

  if (!isOpen) {
    return (
      <div className="group relative">
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-4 right-16 p-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-200"
          aria-label={t('practiceHistory')}
        >
          <HistoryIcon className="w-6 h-6" />
        </button>
        <div className="absolute right-0 top-full mt-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
          {t('practiceHistory')}
        </div>
      </div>
    );
  }

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-5xl w-full max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <Calendar className="w-6 h-6" />
            {t('practiceHistory')}
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {history.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <HistoryIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>{t('noHistory')}</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Calendar Navigation */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePreviousYear}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                  title="Previous Year"
                >
                  <ChevronsLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handlePreviousMonth}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                  title="Previous Month"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {months[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleNextMonth}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                  title="Next Month"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextYear}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                  title="Next Year"
                >
                  <ChevronsRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {weekDays.map(day => (
                <div
                  key={day}
                  className="text-center font-semibold text-gray-600 dark:text-gray-300 py-2"
                >
                  {day}
                </div>
              ))}
              {calendarDays.map((day, index) => (
                <div
                  key={index}
                  className={getDayClasses(day)}
                  onClick={() => day.sessions.length > 0 && setSelectedDate(day.date)}
                >
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {day.date.getDate()}
                  </span>
                  {day.sessions.length > 0 && (
                    <div className="absolute bottom-1 right-1 flex items-center gap-1">
                      <Trophy className="w-4 h-4 text-yellow-500" />
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                        {day.sessions.length}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Selected Day Details */}
            {selectedDate && (
              <div className="mt-6 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  {selectedDate.toLocaleDateString()}
                </h4>
                <div className="space-y-3">
                  {calendarDays
                    .find(day => day.date.toDateString() === selectedDate.toDateString())
                    ?.sessions.map((session, index) => (
                      <div
                        key={index}
                        className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-800 dark:text-white">
                            {currentTranslations.taskNames[session.taskType]}
                          </span>
                          <div className="flex items-center gap-2">
                            <Trophy className="w-4 h-4 text-yellow-500" />
                            <span className="text-purple-600 dark:text-purple-400 font-bold">
                              {session.score} {t('points')}
                            </span>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          <span>{new Date(session.date).toLocaleTimeString()}</span>
                          <span className="mx-2">•</span>
                          <span>
                            {session.correctAnswers}/{session.totalProblems} {t('correct')}
                          </span>
                          <span className="mx-2">•</span>
                          <span>
                            {Math.round((session.correctAnswers / session.totalProblems) * 100)}% {t('accuracy')}
                          </span>
                          <span className="mx-2">•</span>
                          <span>
                            {session.ageGroup} {t('years')}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};