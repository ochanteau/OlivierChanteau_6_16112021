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
      console.log(sauce);
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

// exports.likeUnlike = (req, res, next) => {
//   console.log(req.body);
//   Sauce.findOne({ _id: req.params.id })
//     .then(sauce => {
//       console.log(sauce);
//       console.log(req.body.like)
      
//       switch (req.body.like) {
//         case 1 :
//           sauce.likes += 1;
//           console.log(sauce.likes);
//           sauce.usersLiked.push(req.body.userId);
//           console.log(sauce);
//           console.log(req.params.id);
//           Sauce.updateOne({ _id: req.params.id }, { ...sauce, _id: req.params.id })
//               .then(() => {
//                 console.log("test");
//                 res.status(200).json({ message: 'votre commentaire a bien été pris en compte !'})
//               } )
//               .catch(error => res.status(400).json({ error }));
//           break;
//         case -1 :
//           sauce.dislikes += 1;
//           sauce.usersDisliked.push(req.body.userId);
//           Sauce.updateOne({ _id: req.params.id }, { ...sauce, _id: req.params.id })
//               .then(() => res.status(200).json({ message: 'votre commentaire a bien été pris en compte !'}))
//               .catch(error => res.status(400).json({ error }));
//           break;
//         case 0 :
//           checkUsersLiked = sauce.usersLiked.findIndex(x=>x == req.body.userId);
//           if (checkUsersLiked >=0) {
//             sauce.likes -= 1;
//             sauce.usersLiked.splice(checkUsersLiked,1);
//             Sauce.updateOne({ _id: req.params.id }, { ...sauce, _id: req.params.id })
//               .then(() => res.status(200).json({ message: 'votre commentaire a bien été pris en compte !'}))
//               .catch(error => res.status(400).json({ error }));
//           }
//           else {
//             checkUsersDisliked = sauce.usersDisliked.findIndex(x=>x == req.body.userId);
//             sauce.dislikes -= 1;
//             sauce.usersDisliked.splice(checkUsersDisliked,1);
//             Sauce.updateOne({ _id: req.params.id }, { ...sauce, _id: req.params.id })
//               .then(() => res.status(200).json({ message: 'votre commentaire a bien été pris en compte !'}))
//               .catch(error => res.status(400).json({ error }));
//           }

          
//       }
//     })
//     .catch(error => res.status(404).json({ error }))
// };



// exports.likeDislike = (req, res, next) => {
  
//       switch (req.body.like) {
//         case 1 :
//           Sauce.updateOne({ _id: req.params.id }, { $inc: {likes: 1 }, $push : {usersLiked:req.params.id}})
//               .then(() => {
//                 res.status(200).json({ message: 'votre commentaire a bien été pris en compte !'})
//               } )
//               .catch(error => res.status(400).json({ error }));
//           break;
//         case -1 :
//           Sauce.updateOne({ _id: req.params.id }, { $inc: {dislikes: 1 }, $push : {usersDisliked:req.params.id}})
//           .then(() => {
//             res.status(200).json({ message: 'votre commentaire a bien été pris en compte !'})
//           } )
//           .catch(error => res.status(400).json({ error }));
//           break;
//         case 0 :
         
//           Sauce.findOne({ _id: req.params.id })
//           .then( sauce=>{
            
//             if (sauce.usersLiked.includes(req.params.id)) {
//             Sauce.updateOne({ _id: req.params.id }, {$inc: {likes: -1 }, $pull : {usersLiked:req.params.id}})
//               .then(() => res.status(200).json({ message: 'votre commentaire a bien été pris en compte !'}))
//               .catch(error => res.status(400).json({ error }));
//             }
//             else {
            
//             Sauce.updateOne({ _id: req.params.id }, {$inc: {dislikes: -1 }, $pull : {usersDisliked:req.params.id}})
//               .then(() => res.status(200).json({ message: 'votre commentaire a bien été pris en compte !'}))
//               .catch(error => res.status(400).json({ error }));
//             }
//           })
//           .catch(error => res.status(500).json({ error }));

          
//       }
  
// };


exports.likeDislike = (req, res, next) => {
  
  switch (req.body.like) {
    case 1 :
      Sauce.findOne({ _id: req.params.id })
      .then(sauce=>{
        if (sauce.usersLiked.includes(req.params.id) || sauce.usersDisliked.includes(req.params.id)  ) {
          res.status(200).json({ message: 'vous avez déja partagé votre avis pour cette sauce !'});
        }
        else {
          Sauce.updateOne({ _id: req.params.id }, { $inc: {likes: 1 }, $push : {usersLiked:req.params.id}})
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
        if (sauce.usersLiked.includes(req.params.id) || sauce.usersDisliked.includes(req.params.id)  ) {
          res.status(200).json({ message: 'vous avez déja partagé votre avis pour cette sauce !'});
        }
        else {
          Sauce.updateOne({ _id: req.params.id }, {$inc: {dislikes: 1 }, $push : {usersDisliked:req.params.id}})
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
        
        if (sauce.usersLiked.includes(req.params.id)) {
        Sauce.updateOne({ _id: req.params.id }, {$inc: {likes: -1 }, $pull : {usersLiked:req.params.id}})
          .then(() => res.status(200).json({ message: 'votre commentaire a bien été pris en compte !'}))
          .catch(error => res.status(400).json({ error }));
        }
        else {
        
        Sauce.updateOne({ _id: req.params.id }, {$inc: {dislikes: -1 }, $pull : {usersDisliked:req.params.id}})
          .then(() => res.status(200).json({ message: 'votre commentaire a bien été pris en compte !'}))
          .catch(error => res.status(400).json({ error }));
        }
      })
      .catch(error => res.status(500).json({ error }));

      
  }

};