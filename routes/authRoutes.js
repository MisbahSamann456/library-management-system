const express = require('express');
const router = express.Router();
const { register, login, refresh } = require('../controllers/authController');
const { registerValidation, loginValidation } = require('../validators/validationRules');

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.post('/refresh', refresh);

module.exports = router;