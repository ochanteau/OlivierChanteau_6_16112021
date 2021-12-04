const express = require('express');
const router = express.Router();
const userValidator = require('../middleware/userValidator');
const accountLimiter = require('../middleware/rate-limit-config');
const userCtrl = require('../controllers/user');

router.post('/signup',accountLimiter.createAccountLimiter , userValidator, userCtrl.signup);
router.post('/login', accountLimiter.loginAccountLimiter, userCtrl.login);

module.exports = router;