const express = require('express');
const router = express.Router();
const {
  getProgress,
  getCourseProgress,
  updateProgress,
  getCertificates,
  getCertificateById,
} = require('../controllers/progress.controller');
const { protect } = require('../middleware/auth.middleware');

router.get('/', protect, getProgress);
router.get('/course/:courseId', protect, getCourseProgress);
router.post('/', protect, updateProgress);
router.get('/certificates', protect, getCertificates);
router.get('/certificates/:id', protect, getCertificateById);

module.exports = router;
