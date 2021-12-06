// import de notre modele de Sauce
const Sauce = require('../models/sauce');

/*
* middleware de comparaison de l'userId du token et 
* de l'userId du propriétaire de la sauce
*/
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
            res.status(403).json({
              error: new Error('Invalid request!')
            });
          }
        })
    .catch(error => res.status(500).json({ error }))
    
  };