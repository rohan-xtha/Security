'use client';

import { useQuery, useMutation } from '@tanstack/react-query';
import { quizService } from '@/services/quizService';

export const useQuiz = (courseId: string) => {
  return useQuery({
    queryKey: ['quiz', courseId],
    queryFn: () => quizService.getQuizByCourse(courseId),
    enabled: !!courseId,
  });
};

export const useSubmitQuiz = () => {
  return useMutation({
    mutationFn: ({
      quizId,
      answers,
    }: {
      quizId: string;
      answers: number[];
    }) => quizService.submitQuiz(quizId, answers),
  });
};
