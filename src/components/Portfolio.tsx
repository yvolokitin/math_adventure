import React, { useState } from 'react';
import { UserCircle, X, Upload, Trash2, Cake } from 'lucide-react';
import { useTranslation } from '../i18n/useTranslation';
import { UserData } from '../types';

const ICONS = ['👨‍🎓', '👩‍🎓', '🧑‍🎓', '🦸‍♂️', '🦸‍♀️', '🧙‍♂️', '🧙‍♀️', '🦊', '🐼', '🐯'];

interface PortfolioProps {
  userData: UserData;
  onUpdateUser: (newData: UserData) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ userData, onUpdateUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempName, setTempName] = useState(userData.settings.name);
  const [tempIcon, setTempIcon] = useState(userData.settings.icon);
  const [customImage, setCustomImage] = useState<string | null>(userData.settings.customImage || null);
  const [birthDate, setBirthDate] = useState(userData.settings.birthDate || '');
  const { t } = useTranslation();

  // Calculate date range for birth date input
  const today = new Date();
  const minDate = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());
  const maxDate = new Date(today.getFullYear() - 4, today.getMonth(), today.getDate());
  const minDateString = minDate.toISOString().split('T')[0];
  const maxDateString = maxDate.toISOString().split('T')[0];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomImage(reader.result as string);
        setTempIcon('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const newUserData = {
      ...userData,
      settings: {
        ...userData.settings,
        name: tempName,
        icon: tempIcon,
        customImage: customImage,
        birthDate: birthDate
      }
    };
    onUpdateUser(newUserData);
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <div className="group relative">
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-4 right-52 p-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-200"
          aria-label={t('portfolio')}
        >
          <UserCircle className="w-6 h-6" />
        </button>
        <div className="absolute right-0 top-full mt-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
          {t('portfolio')}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <UserCircle className="w-6 h-6" />
            {t('portfolio')}
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-8">
          {/* Profile Section */}
          <section className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
              <UserCircle className="w-5 h-5" />
              {t('profile')}
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('yourName')}
                </label>
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-600 dark:text-white"
                />
              </div>

              <div>
                <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
                  <Cake className="w-5 h-5" />
                  {t('birthDate')}
                </h4>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  min={minDateString}
                  max={maxDateString}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-600 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('chooseIcon')}
                </label>
                <div className="grid grid-cols-5 gap-2 mb-4">
                  {ICONS.map((icon) => (
                    <button
                      key={icon}
                      onClick={() => {
                        setTempIcon(icon);
                        setCustomImage(null);
                      }}
                      className={`text-2xl p-2 rounded-lg ${
                        tempIcon === icon && !customImage
                          ? 'bg-purple-100 dark:bg-purple-900 border-2 border-purple-500'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('profileImage')}
                  </label>
                  <div className="flex items-center gap-4">
                    {customImage ? (
                      <div className="relative">
                        <img
                          src={customImage}
                          alt="Profile"
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <button
                          onClick={() => setCustomImage(null)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ) : null}
                    <div className="flex-1">
                      <label className="block w-full">
                        <span className="sr-only">{t('chooseImage')}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="block w-full text-sm text-gray-500 dark:text-gray-400
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-purple-50 file:text-purple-700
                            hover:file:bg-purple-100
                            dark:file:bg-purple-900 dark:file:text-purple-200"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <button
            onClick={handleSave}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            {t('saveChanges')}
          </button>
        </div>
      </div>
    </div>
  );
};