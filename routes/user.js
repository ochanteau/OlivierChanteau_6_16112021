// import express
const express = require('express');
// configuration router express
const router = express.Router();
// import middleware de controle Mail et mot de passe
const userValidator = require('../middleware/userValidator');
// import middleware pour limiter le nombre de requete avec la meme IP
const accountLimiter = require('../middleware/rate-limit-config');
// import users controllers 
const userCtrl = require('../controllers/user');



/*
* route "/signup", appel des middlewares pour limiter le nombre de creation de compte avec la meme IP,
* pour verifier mail et MDP, et du controllers "signup"
*/
router.post('/signup',accountLimiter.createAccountLimiter , userValidator, userCtrl.signup);

/*
* route "/login", appel des middlewares pour limiter le nombre de login  avec la meme IP,
* et du controllers "login"
*/
router.post('/login', accountLimiter.loginAccountLimiter, userCtrl.login);

module.exports = router;