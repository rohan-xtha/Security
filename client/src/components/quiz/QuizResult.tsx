'use client';

import { QuizResult as QuizResultType } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';

interface QuizResultProps {
  result: QuizResultType;
  courseId: string;
}

export function QuizResult({ result, courseId }: QuizResultProps) {
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          {result.passed ? (
            <CheckCircle className="h-16 w-16 text-green-500" />
          ) : (
            <XCircle className="h-16 w-16 text-red-500" />
          )}
        </div>
        <CardTitle>
          {result.passed ? 'Congratulations!' : 'Keep Trying!'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <p className="text-4xl font-bold">{result.score}%</p>
          <p className="text-muted-foreground">
            {result.correctAnswers} of {result.totalQuestions} correct
          </p>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          Passing score: {result.passingScore}%
        </div>

        <div className="flex gap-2">
          <Link href={`/courses/${courseId}`} className="flex-1">
            <Button variant="outline" className="w-full">
              Review Course
            </Button>
          </Link>
          {result.passed && (
            <Link href="/certificate" className="flex-1">
              <Button className="w-full">
                View Certificate
              </Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
