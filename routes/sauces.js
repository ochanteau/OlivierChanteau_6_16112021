const express = require('express');
const router = express.Router();
const auth = require ('../middleware/auth')

const saucesCtrl = require('../controllers/sauces');
const multer = require('multer');

router.post('/', auth, multer, saucesCtrl.createSauce);
// router.post('/login', userCtrl.login);

module.exports = router;