const Sauce = require('../models/sauce');


exports.createSauce = (req, res, next) => {
      const sauceObject = JSON.parse(req.body.sauce);
      console.log(sauceObject)
    
      const sauce = new Sauce({
        ...sauceObject,
        likes: 0 ,
        dislikes: 0 ,
        usersLiked: [] ,
        usersDisliked: [] ,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
       
      });
      console.log(sauce);
      sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
        .catch(error => res.status(400).json({ error }));
    }