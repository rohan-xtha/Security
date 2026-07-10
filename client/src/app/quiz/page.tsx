'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/navbar/Navbar';
import { QuizPlayer } from '@/components/quiz/QuizPlayer';
import { QuizResult } from '@/components/quiz/QuizResult';
import { useQuiz, useSubmitQuiz } from '@/hooks/useQuiz';
import { QuizResult as QuizResultType } from '@/types';

function QuizContent() {
  const searchParams = useSearchParams();
  const courseId = searchParams.get('courseId');
  const [result, setResult] = useState<QuizResultType | null>(null);

  const { data: quiz, isLoading } = useQuiz(courseId || '');
  const submitQuiz = useSubmitQuiz();

  if (!courseId) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <p>No course specified</p>
        </main>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <p>Loading quiz...</p>
        </main>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <p>Quiz not found for this course</p>
        </main>
      </div>
    );
  }

  if (result) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-6">
          <QuizResult result={result} courseId={courseId} />
        </main>
      </div>
    );
  }

  const handleSubmit = (answers: number[]) => {
    submitQuiz.mutate(
      { quizId: quiz._id, answers },
      {
        onSuccess: (data) => {
          setResult(data);
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{quiz.title}</h1>
            <p className="text-muted-foreground">
              {quiz.questions.length} questions • Passing score: {quiz.passingScore}%
            </p>
          </div>

          <QuizPlayer
            quiz={quiz}
            onSubmit={handleSubmit}
            isLoading={submitQuiz.isPending}
          />
        </div>
      </main>
    </div>
  );
}

export default function QuizPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <QuizContent />
    </Suspense>
  );
}
