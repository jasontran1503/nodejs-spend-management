const express = require('express');
const router = express.Router();

const { getIcons, addIcons } = require('../controllers/icon.controller');

router.get('/', getIcons);
router.post('/', addIcons);

module.exports = router;