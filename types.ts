
export enum LessonStep {
  WELCOME = 'welcome',
  ANALOGY = 'analogy',
  FILL_BLANKS = 'fill_blanks',
  CALORIES = 'calories',
  BALANCE = 'balance',
  HEALTH = 'health',
  QUIZ = 'quiz'
}

export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  icon: string;
  category: 'breakfast' | 'snack' | 'meal';
}

export interface ActivityItem {
  id: string;
  name: string;
  burnRate: number;
  icon: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}
