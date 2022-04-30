const Icon = require('../models/icon.model');

const getIcons = async (req, res, next) => {
  try {
    const icons = await Icon.find({});
    return res.status(200).json({
      success: true,
      message: '',
      data: icons
    });
  } catch (error) {
    next(error);
  }
};

const addIcons = async (req, res, next) => {
  try {
    const icon = await Icon.create(req.body);
    return res.status(200).json({
      success: true,
      message: '',
      data: icon
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getIcons,
  addIcons
};
