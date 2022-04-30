const Color = require('../models/color.model');

const getColors = async (req, res, next) => {
  try {
    const colors = await Color.find({});
    return res.status(200).json({
      success: true,
      message: '',
      data: colors
    });
  } catch (error) {
    next(error);
  }
};

const addColors = async (req, res, next) => {
  try {
    const colors = await Color.create(req.body);
    return res.status(200).json({
      success: true,
      message: '',
      data: colors
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getColors,
  addColors
};
