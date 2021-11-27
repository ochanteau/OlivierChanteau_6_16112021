const Sauce = require('../models/sauce');


module.exports = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then(sauce=>{
        try {
            if (req.token.userId !== sauce.userId) {
              throw 'Invalid user ID';
            }
            else {next();}
        }
        catch {
            res.status(401).json({
              error: new Error('Invalid request!')
            });
          }
        })
    .catch(error => res.status(500).json({ error }))
    
  };