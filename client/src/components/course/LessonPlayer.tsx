'use client';

import { Lesson } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Play, FileText } from 'lucide-react';

interface LessonPlayerProps {
  lesson: Lesson;
  isCompleted: boolean;
  onComplete: () => void;
}

export function LessonPlayer({ lesson, isCompleted, onComplete }: LessonPlayerProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{lesson.title}</CardTitle>
          {isCompleted && (
            <CheckCircle className="h-5 w-5 text-green-500" />
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {lesson.type === 'video' && lesson.videoUrl ? (
          <div className="aspect-video">
            <iframe
              src={lesson.videoUrl}
              className="h-full w-full rounded-lg"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="prose max-w-none dark:prose-invert">
            {lesson.content && (
              <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
            )}
          </div>
        )}

        {!isCompleted && (
          <Button onClick={onComplete} className="w-full">
            Mark as Complete
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
