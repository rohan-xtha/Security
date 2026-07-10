'use client';

import { useState } from 'react';
import { Quiz, Question } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface QuizPlayerProps {
  quiz: Quiz;
  onSubmit: (answers: number[]) => void;
  isLoading?: boolean;
}

export function QuizPlayer({ quiz, onSubmit, isLoading }: QuizPlayerProps) {
  const [answers, setAnswers] = useState<number[]>(new Array(quiz.questions.length).fill(-1));

  const handleAnswerChange = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    onSubmit(answers);
  };

  const allAnswered = answers.every((a) => a !== -1);

  return (
    <div className="space-y-6">
      {quiz.questions.map((question, qIndex) => (
        <Card key={question._id}>
          <CardHeader>
            <CardTitle className="text-lg">
              Question {qIndex + 1} of {quiz.questions.length}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="font-medium">{question.question}</p>
            <RadioGroup
              value={answers[qIndex].toString()}
              onValueChange={(value) => handleAnswerChange(qIndex, parseInt(value))}
            >
              {question.options.map((option, oIndex) => (
                <div key={oIndex} className="flex items-center space-x-2">
                  <RadioGroupItem value={oIndex.toString()} id={`q${qIndex}-o${oIndex}`} />
                  <Label htmlFor={`q${qIndex}-o${oIndex}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
      ))}

      <Button
        onClick={handleSubmit}
        disabled={!allAnswered || isLoading}
        className="w-full"
      >
        {isLoading ? 'Submitting...' : 'Submit Quiz'}
      </Button>
    </div>
  );
}
