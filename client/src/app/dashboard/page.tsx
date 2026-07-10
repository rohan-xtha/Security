'use client';

import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { ProgressCard } from '@/components/dashboard/ProgressCard';
import { CertificateCard } from '@/components/certificate/CertificateCard';
import { useProgress } from '@/hooks/useProgress';
import { useCertificates } from '@/hooks/useCertificates';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Award, Trophy } from 'lucide-react';

export default function DashboardPage() {
  const { data: progress, isLoading: progressLoading } = useProgress();
  const { data: certificates, isLoading: certsLoading } = useCertificates();

  const completedCourses = progress?.filter((p) => p.isCompleted) || [];
  const inProgressCourses = progress?.filter((p) => !p.isCompleted) || [];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Courses In Progress
              </CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inProgressCourses.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Completed Courses
              </CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedCourses.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Certificates Earned
              </CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{certificates?.length || 0}</div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Your Progress</h2>
          {progressLoading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : progress && progress.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {progress.map((p) => (
                <ProgressCard key={p._id} progress={p} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No courses started yet. Browse courses to get started!
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Certificates</h2>
          {certsLoading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : certificates && certificates.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {certificates.map((cert) => (
                <CertificateCard key={cert._id} certificate={cert} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No certificates earned yet. Complete courses to earn certificates!
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
