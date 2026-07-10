export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'employee' | 'admin';
  avatar?: string;
  createdAt?: string;
}

export interface Course {
  _id: string;
  title: string;
  description: string;
  thumbnail?: string;
  duration?: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category?: string;
  isPublished: boolean;
  createdBy: User;
  createdAt: string;
  lessons?: Lesson[];
}

export interface Lesson {
  _id: string;
  title: string;
  content?: string;
  videoUrl?: string;
  type: 'video' | 'article';
  order: number;
  course: string;
  duration?: string;
}

export interface Quiz {
  _id: string;
  title: string;
  course: Course;
  questions: Question[];
  passingScore: number;
  timeLimit: number;
}

export interface Question {
  _id: string;
  question: string;
  options: string[];
  correctAnswer?: number;
}

export interface Progress {
  _id: string;
  user: string;
  course: Course;
  completedLessons: Lesson[];
  percentage: number;
  lastViewedLesson?: Lesson;
  isCompleted: boolean;
  completedAt?: string;
  createdAt: string;
}

export interface Certificate {
  _id: string;
  user: User;
  course: Course;
  certificateId: string;
  issuedAt: string;
}

export interface QuizResult {
  score: number;
  passed: boolean;
  passingScore: number;
  correctAnswers: number;
  totalQuestions: number;
}

export interface DashboardStats {
  totalUsers: number;
  totalAdmins: number;
  totalEmployees: number;
}
