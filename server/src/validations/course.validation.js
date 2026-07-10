const { body } = require('express-validator');

exports.courseValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('level')
    .optional()
    .isIn(['beginner', 'intermediate', 'advanced'])
    .withMessage('Invalid level'),
];

exports.lessonValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('order').isNumeric().withMessage('Order must be a number'),
  body('course').isMongoId().withMessage('Valid course ID is required'),
];

exports.quizValidation = [
  body('title').trim().notEmpty().withMessage('Quiz title is required'),
  body('course').isMongoId().withMessage('Valid course ID is required'),
  body('questions').isArray({ min: 1 }).withMessage('At least one question is required'),
  body('passingScore')
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage('Passing score must be between 0 and 100'),
];
