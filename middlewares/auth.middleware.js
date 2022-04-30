const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

module.exports = {
  guard: async (req, res, next) => {
    const token = req.header('Authorization');
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id);
      req.user = user;

      next();
    } catch (error) {
      next(error);
    }
  }
};
