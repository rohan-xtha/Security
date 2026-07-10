'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/navbar/Navbar';
import { LessonPlayer } from '@/components/course/LessonPlayer';
import { useCourse } from '@/hooks/useCourses';
import { useCourseProgress, useUpdateProgress } from '@/hooks/useProgress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;

  const { data: course, isLoading } = useCourse(courseId);
  const { data: progress } = useCourseProgress(courseId);
  const updateProgress = useUpdateProgress();

  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);

  const handleLessonComplete = (lessonId: string) => {
    updateProgress.mutate(
      { courseId, lessonId },
      {
        onSuccess: () => {
          router.refresh();
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <p>Loading...</p>
        </main>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <p>Course not found</p>
        </main>
      </div>
    );
  }

  const currentLesson = course.lessons?.find((l) => l._id === selectedLesson);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {currentLesson ? (
              <LessonPlayer
                lesson={currentLesson}
                isCompleted={progress?.completedLessons?.some(
                  (l) => l._id === currentLesson._id
                ) || false}
                onComplete={() => handleLessonComplete(currentLesson._id)}
              />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>{course.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    {course.duration && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {course.duration}
                      </div>
                    )}
                    {course.category && (
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        {course.category}
                      </div>
                    )}
                  </div>
                  <p>{course.description}</p>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Course Content</CardTitle>
                {progress && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{progress.percentage}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${progress.percentage}%` }}
                      />
                    </div>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {course.lessons?.map((lesson) => {
                    const isCompleted = progress?.completedLessons?.some(
                      (l) => l._id === lesson._id
                    );
                    return (
                      <button
                        key={lesson._id}
                        onClick={() => setSelectedLesson(lesson._id)}
                        className={`w-full text-left p-3 rounded-lg flex items-center gap-3 transition-colors ${
                          selectedLesson === lesson._id
                            ? 'bg-accent'
                            : 'hover:bg-accent/50'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                        ) : (
                          <span className="h-4 w-4 shrink-0" />
                        )}
                        <span className="text-sm">{lesson.title}</span>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Link href={`/quiz?courseId=${courseId}`}>
              <Button className="w-full">Take Quiz</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
