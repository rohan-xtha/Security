'use client';

import { Progress as ProgressType } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

interface ProgressCardProps {
  progress: ProgressType;
}

export function ProgressCard({ progress }: ProgressCardProps) {
  return (
    <Link href={`/courses/${progress.course._id}`}>
      <Card className="transition-colors hover:bg-accent/50">
        <CardHeader>
          <CardTitle className="text-lg">{progress.course.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{progress.percentage}%</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-primary"
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
          {progress.isCompleted && (
            <p className="text-sm text-green-500">Completed</p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
