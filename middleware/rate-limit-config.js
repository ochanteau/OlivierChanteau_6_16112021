// import module express-rate-limit pour limiter le nombre de requetes/IP
const rateLimit = require("express-rate-limit");


/*
* middleware pour la route de creation de compte
* limitation du nb de req/IP à 5 par heure. 
*/
exports.createAccountLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour window
    max: 5, // start blocking after 5 requests
    message:
      "Too many accounts created from this IP, please try again after an hour"
  });


  /*
* middleware pour la route de login de compte
* limitation du nb de req/IP à 10 par 15mn. 
*/
  exports.loginAccountLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // start blocking after 5 requests
    message:
      "Too many login requests from this IP, please try again after fifteen minutes"
  });