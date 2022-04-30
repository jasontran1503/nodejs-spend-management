const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const authController = require('../controllers/auth.controller');
const validation = require('../helpers/validation.helper');

router.post('/register', validation.register, authController.register);
router.post('/login', validation.login, authController.login);
router.get('/user', auth.guard, authController.getCurrentUser);
// router.put('/update-profile', auth.guard, validation.updateProfile, authController.updateProfile);

module.exports = router;
