const express = require('express');
const router = express.Router();
const {
  getQuizByCourse,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  submitQuiz,
} = require('../controllers/quiz.controller');
const { protect, admin } = require('../middleware/auth.middleware');
const { quizValidation } = require('../validations/course.validation');

router.get('/:courseId', getQuizByCourse);
router.post('/', protect, admin, quizValidation, createQuiz);
router.put('/:id', protect, admin, updateQuiz);
router.delete('/:id', protect, admin, deleteQuiz);
router.post('/:quizId/submit', protect, submitQuiz);

module.exports = router;
