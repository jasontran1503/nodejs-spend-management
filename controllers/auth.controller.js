const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const User = require('../models/user.model');
const { createDefaultCategories } = require('./category.controller');

/**
 * Register
 * @route POST api/auth/register
 * @body username, password, confirmPassword
 */
const register = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const found = await User.findOne({ username });

    if (found) {
      throw new Error('Tên đã tồn tại');
    }
    const user = await User.create({ username, password });
    createDefaultCategories(user._id);

    return res.status(200).json({
      success: true,
      message: 'Đăng kí thành công',
      data: user
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Login
 * @route POST api/auth/login
 * @body username, password
 */
const login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw createError.Unauthorized('Không tìm thấy user');
    }
    const isMatch = await user.matchPassword(password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
      });

      return res.status(200).json({
        success: true,
        message: 'Đăng nhập thành công',
        data: token
      });
    } else {
      throw new Error('Đăng nhập thất bại');
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Get current user
 * @route GET api/auth/user
 */
const getCurrentUser = async (req, res, next) => {
  const user = req.user;

  try {
    if (!user) {
      throw createError.Unauthorized('Không tìm thấy user');
    }
    return res.status(200).json({
      success: true,
      message: 'Thành công',
      data: user
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getCurrentUser
  // updateProfile
};
