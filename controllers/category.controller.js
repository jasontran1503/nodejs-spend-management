const createError = require('http-errors');
const Category = require('../models/category.model');
const User = require('../models/user.model');

/**
 * Get categories by user
 * @route GET api/category
 */
const getCategoriesByUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw createError.Unauthorized('Không tìm thấy user');
    }

    const categories = await Category.find({ user: req.user._id }).populate('user', 'username');
    return res.status(200).json({
      success: true,
      message: '',
      data: categories
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete category
 * @route POST api/category/delete
 * @params categoryId
 */
const deleteCategory = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw createError.Unauthorized('Không tìm thấy user');
    }

    const category = await Category.findOneAndDelete({
      user: req.user._id,
      _id: req.query.categoryId
    });
    if (!category) {
      throw createError.BadRequest('Không tìm thấy danh mục');
    }
    return res.status(200).json({
      success: true,
      message: 'Xóa thành công',
      data: category
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create category
 * @route POST api/category/create
 * @body name, icon, color
 */
const createCategory = async (req, res, next) => {
  req.body.user = req.user._id;

  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw createError.Unauthorized('Không tìm thấy user');
    }

    const newCategory = await Category.create(req.body);
    return res.status(200).json({
      success: true,
      message: 'Thêm thành công',
      data: newCategory
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update category
 * @route POST api/category/update
 * @body name, icon, color
 * @params categoryId
 */
const updateCategory = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw createError.Unauthorized('Không tìm thấy user');
    }

    const category = await Category.findOneAndUpdate(
      { user: req.user._id, _id: req.query.categoryId },
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    if (!category) {
      throw createError.BadRequest('Danh mục đã bị xóa hoặc không tồn tại');
    }
    return res.status(200).json({
      success: true,
      message: 'Cập nhật thành công',
      data: category
    });
  } catch (error) {
    next(error);
  }
};

const createDefaultCategories = async (userId) => {
  const defaultCategories = [
    { name: 'Tiền điện', icon: 'bolt', color: '#ffbf00', user: userId },
    { name: 'Tiền nước', icon: 'tint', color: '#4422ff', user: userId },
    { name: 'Ăn uống', icon: 'cutlery', color: '#de3163', user: userId },
    { name: 'Phí giao lưu', icon: 'beer', color: '#40E0D0', user: userId },
    { name: 'Đi lại', icon: 'car', color: '#fa8072', user: userId },
    { name: 'Tiền nhà', icon: 'home', color: '#3b5998', user: userId },
    { name: 'Phí liên lạc', icon: 'mobile', color: '#65041d', user: userId },
    { name: 'Mua sắm', icon: 'shopping-cart', color: '#FF3333', user: userId }
  ];

  await Category.insertMany(defaultCategories);
};

module.exports = {
  getCategoriesByUser,
  deleteCategory,
  createCategory,
  updateCategory,
  createDefaultCategories
};
