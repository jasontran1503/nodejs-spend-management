const Expenses = require('../models/expenses.model');
const User = require('../models/user.model');
const Category = require('../models/category.model');
const createError = require('http-errors');
const { convertDate } = require('../helpers/convert-date.helper');

/**
 * Get all expenses by user
 * @route GET api/expenses
 */
const getAllExpenses = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw createError.Unauthorized('Không tìm thấy user');
    }

    const expensesList = await Expenses.find({ user: req.user._id }).populate('category');
    return res.status(200).json({
      success: true,
      message: '',
      data: expensesList
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete expenses
 * @route POST api/expenses/delete
 * @params expensesId
 */
const deleteExpenses = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw createError.Unauthorized('Không tìm thấy user');
    }

    const expenses = await Expenses.findOneAndDelete({
      user: req.user._id,
      _id: req.query.expensesId
    });
    if (!expenses) {
      throw createError.BadRequest('Không tìm thấy khoản chi này');
    }
    return res.status(200).json({
      success: true,
      message: 'Xóa thành công',
      data: expenses
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create expenses
 * @route POST api/expenses/create
 * @body money, category, createdAt
 */
const createExpenses = async (req, res, next) => {
  req.body.user = req.user._id;
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw createError.Unauthorized('Không tìm thấy user');
    }

    const category = await Category.findOne({
      user: req.user._id,
      _id: req.body.category
    });
    if (!category) {
      throw createError.BadRequest('Không tìm thấy danh mục');
    }

    const newExpenses = await Expenses.create({
      ...req.body,
      createdAt: convertDate(req.body.createdAt)
    });
    return res.status(200).json({
      success: true,
      message: 'Thêm thành công',
      data: newExpenses
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update expenses
 * @route POST api/expenses/update
 * @body money, category, createdAt
 * @params expensesId
 */
const updateExpenses = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw createError.Unauthorized('Không tìm thấy user');
    }

    const category = await Category.findOne({
      user: req.user._id,
      _id: req.body.category
    });
    if (!category) {
      throw createError.BadRequest('Không tìm thấy danh mục');
    }

    const expenses = await Expenses.findOneAndUpdate(
      { user: req.user._id, _id: req.query.expensesId },
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    if (!expenses) {
      throw createError.BadRequest('Khoản chi đã bị xóa hoặc không tồn tại');
    }
    return res.status(200).json({
      success: true,
      message: 'Cập nhật thành công',
      data: expenses
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Report daily expenses
 * @route GET api/expenses/daily
 * @params day
 */
const reportDailyExpenses = async (req, res, next) => {
  const day = convertDate(req.query.day);
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw createError.Unauthorized('Không tìm thấy user');
    }

    const dailyExpensesList = await Expenses.find({ user: req.user._id, createdAt: day })
      .populate('category')
      .lean();
    const totalMoney = dailyExpensesList.reduce((a, b) => {
      return a + b.money;
    }, 0);

    return res.status(200).json({
      success: true,
      message: '',
      data: {
        dailyExpensesList,
        totalMoney
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Report daily expenses
 * @route GET api/expenses/monthly
 * @params date
 */
const reportMonthlyExpenses = async (req, res, next) => {
  let fromDate = new Date(req.query.date);
  let toDate = new Date(fromDate.getFullYear(), fromDate.getMonth() + 1, 0);

  fromDate = convertDate(fromDate);
  toDate = convertDate(toDate);

  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw createError.Unauthorized('Không tìm thấy user');
    }

    const monthlyExpensesList = await Expenses.find({
      user: req.user._id,
      createdAt: { $gte: fromDate, $lte: toDate }
    }).populate('category');

    const totalMoney = monthlyExpensesList.reduce((a, b) => {
      return a + b.money;
    }, 0);

    return res.status(200).json({
      success: true,
      message: '',
      data: {
        monthlyExpensesList,
        totalMoney
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllExpenses,
  deleteExpenses,
  createExpenses,
  updateExpenses,
  reportDailyExpenses,
  reportMonthlyExpenses
};
