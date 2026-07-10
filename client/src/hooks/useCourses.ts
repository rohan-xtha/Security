'use client';

import { useQuery } from '@tanstack/react-query';
import { courseService } from '@/services/courseService';

export const useCourses = (
  page = 1,
  limit = 10,
  search?: string,
  level?: string
) => {
  return useQuery({
    queryKey: ['courses', page, limit, search, level],
    queryFn: () => courseService.getCourses(page, limit, search, level),
  });
};

export const useCourse = (id: string) => {
  return useQuery({
    queryKey: ['course', id],
    queryFn: () => courseService.getCourseById(id),
    enabled: !!id,
  });
};

export const useAdminCourses = () => {
  return useQuery({
    queryKey: ['admin-courses'],
    queryFn: () => courseService.getAllCoursesAdmin(),
  });
};
