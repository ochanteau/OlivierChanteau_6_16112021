const express = require('express');
const router = express.Router();
const auth = require ('../middleware/auth')
const sauceOwner = require("../middleware/sauceOwner")
const saucesCtrl = require('../controllers/sauces');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, saucesCtrl.createSauce);
router.get('/', auth, saucesCtrl.getAllSauces);
router.get('/:id',auth, saucesCtrl.getOneSauce);

router.put('/:id',auth,sauceOwner,multer,saucesCtrl.modifySauce);
router.delete('/:id',auth,sauceOwner,saucesCtrl.deleteSauce);

router.post("/:id/like",auth,saucesCtrl.likeDislike);

module.exports = router;