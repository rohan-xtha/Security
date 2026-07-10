import api from '@/lib/axios';
import { Course, Lesson, Progress, Certificate, Quiz, QuizResult } from '@/types';

interface CoursesResponse {
  courses: Course[];
  totalPages: number;
  currentPage: number;
}

export const courseService = {
  getCourses: async (
    page = 1,
    limit = 10,
    search?: string,
    level?: string
  ): Promise<CoursesResponse> => {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    if (search) params.append('search', search);
    if (level) params.append('level', level);

    const response = await api.get(`/courses?${params.toString()}`);
    return response.data;
  },

  getCourseById: async (id: string): Promise<Course & { lessons: Lesson[] }> => {
    const response = await api.get(`/courses/${id}`);
    return response.data;
  },

  createCourse: async (data: Partial<Course>): Promise<Course> => {
    const response = await api.post('/courses', data);
    return response.data;
  },

  updateCourse: async (id: string, data: Partial<Course>): Promise<Course> => {
    const response = await api.put(`/courses/${id}`, data);
    return response.data;
  },

  deleteCourse: async (id: string): Promise<void> => {
    await api.delete(`/courses/${id}`);
  },

  getAllCoursesAdmin: async (): Promise<Course[]> => {
    const response = await api.get('/courses/admin');
    return response.data;
  },

  togglePublish: async (id: string): Promise<Course> => {
    const response = await api.patch(`/courses/${id}/toggle-publish`);
    return response.data;
  },

  createLesson: async (data: Partial<Lesson>): Promise<Lesson> => {
    const response = await api.post('/lessons', data);
    return response.data;
  },

  updateLesson: async (id: string, data: Partial<Lesson>): Promise<Lesson> => {
    const response = await api.put(`/lessons/${id}`, data);
    return response.data;
  },

  deleteLesson: async (id: string): Promise<void> => {
    await api.delete(`/lessons/${id}`);
  },

  getProgress: async (): Promise<Progress[]> => {
    const response = await api.get('/progress');
    return response.data;
  },

  getCourseProgress: async (courseId: string): Promise<Progress> => {
    const response = await api.get(`/progress/course/${courseId}`);
    return response.data;
  },

  updateProgress: async (
    courseId: string,
    lessonId: string
  ): Promise<Progress> => {
    const response = await api.post('/progress', { courseId, lessonId });
    return response.data;
  },

  getQuiz: async (courseId: string): Promise<Quiz> => {
    const response = await api.get(`/quiz/${courseId}`);
    return response.data;
  },

  submitQuiz: async (
    quizId: string,
    answers: number[]
  ): Promise<QuizResult> => {
    const response = await api.post(`/quiz/${quizId}/submit`, { answers });
    return response.data;
  },

  getCertificates: async (): Promise<Certificate[]> => {
    const response = await api.get('/progress/certificates');
    return response.data;
  },

  getCertificateById: async (id: string): Promise<Certificate> => {
    const response = await api.get(`/progress/certificates/${id}`);
    return response.data;
  },
};
