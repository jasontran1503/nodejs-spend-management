const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const categoryController = require('../controllers/category.controller');
const validation = require('../helpers/validation.helper');

router.get('/', auth.guard, categoryController.getCategoriesByUser);
router.post('/create', auth.guard, validation.category, categoryController.createCategory);
router.put('/update', auth.guard, validation.category, categoryController.updateCategory);
router.delete('/delete', auth.guard, categoryController.deleteCategory);

module.exports = router;
