// import du module jwt
const jwt = require('jsonwebtoken');

// import module Dotenv pour les varibales d'environnement
require("dotenv").config();



/*
* middleware d'authentification, verifie que le token n'a pas été altéré
* Assigne le resultat à req.token ou renvoie une erreur.
*/
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    req.token = jwt.verify(token, `${process.env.USER_TOKEN}`);
    next();
    
  }
  catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};