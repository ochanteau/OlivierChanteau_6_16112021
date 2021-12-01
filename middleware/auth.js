// import du module jwt
const jwt = require('jsonwebtoken');

// import module Dotenv pour les varibales d'environnement
const dotenv = require("dotenv");
dotenv.config();



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