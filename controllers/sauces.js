const Sauce = require('../models/sauce');
const fs = require('fs');






exports.getAllSauces = (req, res, next)=> {
  Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));}

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
}
     
     

exports.createSauce = (req, res, next) => {
      const sauceObject = JSON.parse(req.body.sauce);
      const sauce = new Sauce({
        ...sauceObject,
        likes: 0 ,
        dislikes: 0 ,
        usersLiked: [] ,
        usersDisliked: [] ,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
       
      });
      
      sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
        .catch(error => res.status(400).json({ error }));
      
     
    }




    exports.deleteSauce = (req, res, next) => {
      Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
          const filename = sauce.imageUrl.split('/images/')[1];
          fs.unlink(`images/${filename}`, () => {
            Sauce.deleteOne({ _id: req.params.id })
              .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
              .catch(error => res.status(400).json({ error }));
          });
        })
        .catch(error => res.status(500).json({ error }));
    };



  
    exports.modifySauce = (req, res, next) => {
      console.log(req.file);
      if (req.file) {
        const sauceObject = {...JSON.parse(req.body.sauce),imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`}
        Sauce.findOne({ _id: req.params.id })
          .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
              Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
              .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
              .catch(error => res.status(400).json({ error }));
          });
        })
          .catch(error => res.status(500).json({ error }))
      }
      else {Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
      .catch(error => res.status(400).json({ error }))}
    };





exports.likeDislike = (req, res, next) => {
  
    if (req.body.userId && req.body.userId === req.token.userId) {
      switch (req.body.like) {
        case 1 :
          Sauce.findOne({ _id: req.params.id })
          .then(sauce=>{
            if (sauce.usersLiked.includes(req.body.userId) || sauce.usersDisliked.includes(req.body.userId)  ) {
              res.status(400).json({ message: 'vous avez déja partagé votre avis pour cette sauce !'});
              
            }
            else {
              Sauce.updateOne({ _id: req.params.id }, { $inc: {likes: 1 }, $push : {usersLiked:req.body.userId}})
              .then(() => {
                res.status(200).json({ message: 'votre commentaire a bien été pris en compte !'})
              })
              .catch(error => res.status(400).json({ error }));
            }

          })
          .catch(error => res.status(500).json({ error }));
          break;
        case -1 :
          Sauce.findOne({ _id: req.params.id })
          .then(sauce=>{
            if (sauce.usersLiked.includes(req.body.userId) || sauce.usersDisliked.includes(req.body.userId)  ) {
              res.status(400).json({ message: 'vous avez déja partagé votre avis pour cette sauce !'});
            }
            else {
              Sauce.updateOne({ _id: req.params.id }, {$inc: {dislikes: 1 }, $push : {usersDisliked:req.body.userId}})
              .then(() => {
                res.status(200).json({ message: 'votre commentaire a bien été pris en compte !'})
              })
              .catch(error => res.status(400).json({ error }));
            }

          })
          .catch(error => res.status(500).json({ error }));
          break;

        case 0 :
        
          Sauce.findOne({ _id: req.params.id })
          .then( sauce=>{
            
            if (sauce.usersLiked.includes(req.body.userId)) {
            Sauce.updateOne({ _id: req.params.id }, {$inc: {likes: -1 }, $pull : {usersLiked:req.body.userId}})
              .then(() => res.status(200).json({ message: 'votre commentaire a bien été pris en compte !'}))
              .catch(error => res.status(400).json({ error }));
            }
            else {
            
            Sauce.updateOne({ _id: req.params.id }, {$inc: {dislikes: -1 }, $pull : {usersDisliked:req.body.userId}})
              .then(() => res.status(200).json({ message: 'votre commentaire a bien été pris en compte !'}))
              .catch(error => res.status(400).json({ error }));
            }
          })
          .catch(error => res.status(500).json({ error }));
          break;
        
        default:
          res.status(400).json({ message: 'Invalid request!'});
          
      }
    }

    else {res.status(401).json({
      error: new Error('Invalid request!')
    });}


};






