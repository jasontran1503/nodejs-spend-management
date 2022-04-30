const express = require('express');
const router = express.Router();

const { getColors, addColors } = require('../controllers/color.controller');

router.get('/', getColors);
router.post('/', addColors);

module.exports = router;
