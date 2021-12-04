const rateLimit = require("express-rate-limit");

exports.createAccountLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour window
    max: 5, // start blocking after 5 requests
    message:
      "Too many accounts created from this IP, please try again after an hour"
  });

  exports.loginAccountLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // start blocking after 5 requests
    message:
      "Too many login requests from this IP, please try again after fifteen minutes"
  });