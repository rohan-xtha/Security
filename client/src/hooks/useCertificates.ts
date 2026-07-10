'use client';

import { useQuery } from '@tanstack/react-query';
import { courseService } from '@/services/courseService';

export const useCertificates = () => {
  return useQuery({
    queryKey: ['certificates'],
    queryFn: () => courseService.getCertificates(),
  });
};

export const useCertificate = (id: string) => {
  return useQuery({
    queryKey: ['certificate', id],
    queryFn: () => courseService.getCertificateById(id),
    enabled: !!id,
  });
};
