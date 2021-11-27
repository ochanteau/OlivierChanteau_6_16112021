// import express et mise en place
const express = require('express');
const app = express();

// import module Dotenv pour les varibales d'environnement
const dotenv = require("dotenv");
dotenv.config();

// import  mongoose
const mongoose = require('mongoose');

// import du module path 
const path = require('path');

// import des routes
const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauces')

// connection base de donnée
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.jiuzr.mongodb.net/cluster0?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));



// middleware CORS headers
// (vérifier si je laisse PATCH ET OPTIONS)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


// middleware parsing req
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// middleware pour renvoyer les fichiers images
app.use('/images', express.static(path.join(__dirname, 'images')))






// routers
app.use('/api/auth', userRoutes);
app.use('/api/sauces', saucesRoutes);






module.exports = app;



// app.post("/api/sauces/:id/like", (req,res,next)=>{
//   console.log(req.body);
//   Sauce.findOne({ _id: req.params.id })
//     .then(sauce => {
//       console.log(sauce);
//       console.log(req.body.like)
//       if (req.body.like==1) {
       
//           sauce.likes += 1;
//           console.log(sauce.likes);
//           sauce.usersLiked.push(req.body.userId);
//           console.log(sauce);
//           Sauce.updateOne({ _id: req.params.id }, { ...sauce, _id: req.params.id })
//               .then(() => res.status(200).json({ message: 'votre commentaire a bien été pris en compte !'}))
//               .catch(error => res.status(400).json({ error }));
//       }
//       else if(req.body.like==2) {
       
//           sauce.dislikes += 1;
//           sauce.usersDisliked.push(req.body.userId);
//           Sauce.updateOne({ _id: req.params.id }, { ...sauce, _id: req.params.id })
//               .then(() => res.status(200).json({ message: 'votre commentaire a bien été pris en compte !'}))
//               .catch(error => res.status(400).json({ error }));
//                }
//       else {
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

// });