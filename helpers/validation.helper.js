const { body, validationResult } = require('express-validator');

const fieldsRequired = (field, nameField) => {
  return body(field)
    .trim()
    .notEmpty()
    .withMessage(nameField + ' không được để trống');
};

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorsMessage = errors.array().map(({ msg }) => msg)[0];
    throw next(new Error(errorsMessage));
  }
  next();
};

const category = [
  fieldsRequired('name', 'Tên danh mục'),
  fieldsRequired('icon', 'Biểu tượng'),
  fieldsRequired('color', 'Màu sắc'),
  handleValidationErrors
];

const expenses = [
  fieldsRequired('money', 'Số tiền').isInt({ min: 1 }).withMessage('Số tiền phải lớn hơn 0'),
  fieldsRequired('createdAt', 'Ngày'),
  body('category').notEmpty().withMessage('Chưa chọn danh mục'),
  handleValidationErrors
];

const register = [
  fieldsRequired('username', 'Tên')
    .matches(/^[a-zA-Z0-9]*$/)
    .withMessage('Tên không đúng định dạng')
    .isLength({ min: 4, max: 20 })
    .withMessage('Tên từ 4 đến 20 kí tự'),
  fieldsRequired('password', 'Mật khẩu')
    .isLength({ min: 4, max: 20 })
    .withMessage('Mật khẩu từ 4 đến 20 kí tự'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Mật khẩu nhập không trùng khớp');
    }
    return true;
  }),
  handleValidationErrors
];

const login = [
  fieldsRequired('username', 'Tên')
    .matches(/^[a-zA-Z0-9]*$/)
    .withMessage('Tên không đúng định dạng')
    .isLength({ min: 4, max: 20 })
    .withMessage('Tên từ 4 đến 20 kí tự'),
  fieldsRequired('password', 'Mật khẩu')
    .isLength({ min: 4, max: 20 })
    .withMessage('Mật khẩu từ 4 đến 20 kí tự'),
  handleValidationErrors
];

module.exports = {
  category,
  expenses,
  register,
  login
};
