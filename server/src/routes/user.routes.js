const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getDashboardStats,
} = require('../controllers/user.controller');
const { protect, admin } = require('../middleware/auth.middleware');

router.get('/', protect, admin, getUsers);
router.get('/stats', protect, admin, getDashboardStats);
router.get('/:id', protect, admin, getUserById);
router.put('/:id', protect, admin, updateUser);
router.delete('/:id', protect, admin, deleteUser);

module.exports = router;
