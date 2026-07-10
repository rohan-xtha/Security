const express = require('express');
const router = express.Router();
const {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  getAllCoursesAdmin,
  togglePublish,
} = require('../controllers/course.controller');
const { protect, admin } = require('../middleware/auth.middleware');
const { courseValidation } = require('../validations/course.validation');

router.get('/', getCourses);
router.get('/admin', protect, admin, getAllCoursesAdmin);
router.get('/:id', getCourseById);
router.post('/', protect, admin, courseValidation, createCourse);
router.put('/:id', protect, admin, updateCourse);
router.delete('/:id', protect, admin, deleteCourse);
router.patch('/:id/toggle-publish', protect, admin, togglePublish);

module.exports = router;
