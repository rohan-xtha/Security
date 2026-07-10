const Progress = require('../models/Progress');
const Lesson = require('../models/Lesson');
const Certificate = require('../models/Certificate');

exports.getProgress = async (req, res, next) => {
  try {
    const progress = await Progress.find({ user: req.user._id })
      .populate('course', 'title thumbnail')
      .populate('completedLessons', 'title')
      .populate('lastViewedLesson', 'title');

    res.json(progress);
  } catch (error) {
    next(error);
  }
};

exports.getCourseProgress = async (req, res, next) => {
  try {
    const progress = await Progress.findOne({
      user: req.user._id,
      course: req.params.courseId,
    })
      .populate('completedLessons', 'title')
      .populate('lastViewedLesson', 'title');

    if (!progress) {
      return res.json({
        percentage: 0,
        completedLessons: [],
        lastViewedLesson: null,
        isCompleted: false,
      });
    }

    res.json(progress);
  } catch (error) {
    next(error);
  }
};

exports.updateProgress = async (req, res, next) => {
  try {
    const { courseId, lessonId } = req.body;

    const totalLessons = await Lesson.countDocuments({ course: courseId });
    if (totalLessons === 0) {
      return res.status(400).json({ message: 'No lessons in this course' });
    }

    let progress = await Progress.findOne({
      user: req.user._id,
      course: courseId,
    });

    if (!progress) {
      progress = await Progress.create({
        user: req.user._id,
        course: courseId,
        completedLessons: [lessonId],
        lastViewedLesson: lessonId,
        percentage: Math.round((1 / totalLessons) * 100),
      });
    } else {
      if (!progress.completedLessons.includes(lessonId)) {
        progress.completedLessons.push(lessonId);
      }
      progress.lastViewedLesson = lessonId;
      progress.percentage = Math.round(
        (progress.completedLessons.length / totalLessons) * 100
      );

      if (progress.percentage === 100) {
        progress.isCompleted = true;
        progress.completedAt = new Date();
      }

      await progress.save();
    }

    res.json(progress);
  } catch (error) {
    next(error);
  }
};

exports.getCertificates = async (req, res, next) => {
  try {
    const certificates = await Certificate.find({ user: req.user._id })
      .populate('course', 'title thumbnail')
      .sort('-issuedAt');

    res.json(certificates);
  } catch (error) {
    next(error);
  }
};

exports.getCertificateById = async (req, res, next) => {
  try {
    const certificate = await Certificate.findById(req.params.id)
      .populate('user', 'name email')
      .populate('course', 'title');

    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    res.json(certificate);
  } catch (error) {
    next(error);
  }
};
