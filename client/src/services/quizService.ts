import api from '@/lib/axios';
import { Quiz, QuizResult } from '@/types';

export const quizService = {
  getQuizByCourse: async (courseId: string): Promise<Quiz> => {
    const response = await api.get(`/quiz/${courseId}`);
    return response.data;
  },

  createQuiz: async (data: Partial<Quiz>): Promise<Quiz> => {
    const response = await api.post('/quiz', data);
    return response.data;
  },

  updateQuiz: async (id: string, data: Partial<Quiz>): Promise<Quiz> => {
    const response = await api.put(`/quiz/${id}`, data);
    return response.data;
  },

  deleteQuiz: async (id: string): Promise<void> => {
    await api.delete(`/quiz/${id}`);
  },

  submitQuiz: async (
    quizId: string,
    answers: number[]
  ): Promise<QuizResult> => {
    const response = await api.post(`/quiz/${quizId}/submit`, { answers });
    return response.data;
  },
};
