const Quiz = require('../models/Quiz');
const Progress = require('../models/Progress');
const Certificate = require('../models/Certificate');
const { validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');

exports.getQuizByCourse = async (req, res, next) => {
  try {
    const quiz = await Quiz.findOne({ course: req.params.courseId }).populate(
      'course',
      'title'
    );

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    const sanitizedQuiz = quiz.toObject();
    sanitizedQuiz.questions = quiz.questions.map((q) => ({
      ...q,
      correctAnswer: undefined,
    }));

    res.json(sanitizedQuiz);
  } catch (error) {
    next(error);
  }
};

exports.createQuiz = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const existingQuiz = await Quiz.findOne({ course: req.body.course });
    if (existingQuiz) {
      return res
        .status(400)
        .json({ message: 'Quiz already exists for this course' });
    }

    const quiz = await Quiz.create(req.body);
    res.status(201).json(quiz);
  } catch (error) {
    next(error);
  }
};

exports.updateQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    const updatedQuiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json(updatedQuiz);
  } catch (error) {
    next(error);
  }
};

exports.deleteQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    await quiz.deleteOne();
    res.json({ message: 'Quiz removed' });
  } catch (error) {
    next(error);
  }
};

exports.submitQuiz = async (req, res, next) => {
  try {
    const { answers } = req.body;
    const quiz = await Quiz.findById(req.params.quizId);

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    let correctAnswers = 0;
    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });

    const score = Math.round(
      (correctAnswers / quiz.questions.length) * 100
    );
    const passed = score >= quiz.passingScore;

    if (passed) {
      const progress = await Progress.findOne({
        user: req.user._id,
        course: quiz.course,
      });

      if (progress && progress.isCompleted) {
        const existingCert = await Certificate.findOne({
          user: req.user._id,
          course: quiz.course,
        });

        if (!existingCert) {
          await Certificate.create({
            user: req.user._id,
            course: quiz.course,
            certificateId: `CERT-${uuidv4().slice(0, 8).toUpperCase()}`,
          });
        }
      }
    }

    res.json({
      score,
      passed,
      passingScore: quiz.passingScore,
      correctAnswers,
      totalQuestions: quiz.questions.length,
    });
  } catch (error) {
    next(error);
  }
};
