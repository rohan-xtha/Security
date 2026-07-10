'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { courseService } from '@/services/courseService';

export const useProgress = () => {
  return useQuery({
    queryKey: ['progress'],
    queryFn: () => courseService.getProgress(),
  });
};

export const useCourseProgress = (courseId: string) => {
  return useQuery({
    queryKey: ['course-progress', courseId],
    queryFn: () => courseService.getCourseProgress(courseId),
    enabled: !!courseId,
  });
};

export const useUpdateProgress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      courseId,
      lessonId,
    }: {
      courseId: string;
      lessonId: string;
    }) => courseService.updateProgress(courseId, lessonId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['progress'] });
    },
  });
};
