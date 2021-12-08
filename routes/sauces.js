// import express
const express = require('express');
// configuration router express
const router = express.Router();
// import middleware d'authentification
const auth = require ('../middleware/auth')
// import middleware de comparaison de userId du token et du userId de la sauce en BD
const sauceOwner = require("../middleware/sauceOwner")
// import middleware multer pour gerer les images
const multer = require('../middleware/multer-config');
// import middlewares de controle des données pour la creation ou modification de sauce
const validator = require('../middleware/sauceValidator');
// import sauces controllers
const saucesCtrl = require('../controllers/sauces');

/*
* Sur chaque route le middleware d'authentification est appelé
* Sur les routes de creation et de modification de sauce sont appelés
* les middlewares Multer et  validator 
* Sur la route DELETE et modification de sauce on appelle egalement SauceOwner   
*/

// route creation de sauce
router.post('/', auth, multer,validator, saucesCtrl.createSauce);
//route pour obtenir toutes les sauces
router.get('/', auth, saucesCtrl.getAllSauces);
//route pour obtenir une sauce
router.get('/:id',auth, saucesCtrl.getOneSauce);
// route pour modifier une sauce 
router.put('/:id',auth,sauceOwner,multer,validator,saucesCtrl.modifySauce);
//route pour supprimer une sauce 
router.delete('/:id',auth,sauceOwner,saucesCtrl.deleteSauce);
//route pour liker ou disliker une sauce
router.post("/:id/like",auth,saucesCtrl.likeDislike);

module.exports = router;