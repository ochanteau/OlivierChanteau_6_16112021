const express = require('express');
const router = express.Router();
const userValidator = require('../middleware/userValidator');

const userCtrl = require('../controllers/user');

router.post('/signup', userValidator, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;