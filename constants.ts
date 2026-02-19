
import { FoodItem, ActivityItem } from './types';

export const BREAKFAST_FOODS: FoodItem[] = [
  { id: '1', name: 'Oatmeal', calories: 150, icon: '🥣', category: 'breakfast' },
  { id: '2', name: 'Egg', calories: 70, icon: '🥚', category: 'breakfast' },
  { id: '3', name: 'Banana', calories: 100, icon: '🍌', category: 'breakfast' },
  { id: '4', name: 'Toast', calories: 80, icon: '🍞', category: 'breakfast' },
  { id: '5', name: 'Yogurt', calories: 120, icon: '🍦', category: 'breakfast' },
  { id: '6', name: 'Waffle', calories: 200, icon: '🧇', category: 'breakfast' },
];

export const ACTIVITIES: ActivityItem[] = [
  { id: 'a1', name: 'Sitting/Studying', burnRate: 20, icon: '📚' },
  { id: 'a2', name: 'Walking', burnRate: 50, icon: '🚶' },
  { id: 'a3', name: 'Running', burnRate: 150, icon: '🏃' },
  { id: 'a4', name: 'Swimming', burnRate: 200, icon: '🏊' },
];

export const LESSON_TEXT = "Breakfast gives energy to your brain and body. Like a car needs gas, your body needs food. Food gives calories, this is energy. You need more or less calories depending on your body and activities. Extra calories become fat. A little fat is good, but too much is not healthy.";
