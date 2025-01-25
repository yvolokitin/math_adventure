export type UserSettings = {
  ageGroup: AgeGroup;
  selectedTasks: TaskType[];
  theme: 'light' | 'dark';
  name: string;
  icon: string;
  customImage?: string | null;
  birthDate?: string;
  language: Language;
};