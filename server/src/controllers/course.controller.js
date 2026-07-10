const Course = require('../models/Course');
const Lesson = require('../models/Lesson');
const { validationResult } = require('express-validator');

exports.getCourses = async (req, res, next) => {
  try {
    const { search, level, category, page = 1, limit = 10 } = req.query;
    const query = { isPublished: true };

    if (search) {
      query.$text = { $search: search };
    }
    if (level) {
      query.level = level;
    }
    if (category) {
      query.category = category;
    }

    const courses = await Course.find(query)
      .populate('createdBy', 'name')
      .sort('-createdAt')
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Course.countDocuments(query);

    res.json({
      courses,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    next(error);
  }
};

exports.getCourseById = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      'createdBy',
      'name'
    );
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const lessons = await Lesson.find({ course: course._id }).sort('order');

    res.json({ ...course.toObject(), lessons });
  } catch (error) {
    next(error);
  }
};

exports.createCourse = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, thumbnail, duration, level, category } =
      req.body;

    const course = await Course.create({
      title,
      description,
      thumbnail,
      duration,
      level,
      category,
      createdBy: req.user._id,
    });

    res.status(201).json(course);
  } catch (error) {
    next(error);
  }
};

exports.updateCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedCourse);
  } catch (error) {
    next(error);
  }
};

exports.deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    await Lesson.deleteMany({ course: course._id });
    await course.deleteOne();

    res.json({ message: 'Course removed' });
  } catch (error) {
    next(error);
  }
};

exports.getAllCoursesAdmin = async (req, res, next) => {
  try {
    const courses = await Course.find()
      .populate('createdBy', 'name')
      .sort('-createdAt');

    res.json(courses);
  } catch (error) {
    next(error);
  }
};

exports.togglePublish = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    course.isPublished = !course.isPublished;
    await course.save();

    res.json(course);
  } catch (error) {
    next(error);
  }
};
