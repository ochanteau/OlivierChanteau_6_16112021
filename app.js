// import express et mise en place
const express = require('express');
const app = express();

// import module Dotenv pour les varibales d'environnement
const dotenv = require("dotenv");
dotenv.config();

// import  mongoose et connection à la base de donnée
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



// middleware CORS
// (vérifier si je laisse PATCH ET OPTIONS)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


// middleware pour obtenir un objet JS
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// middleware pour renvoyer les fichiers images
app.use('/images', express.static(path.join(__dirname, 'images')))

// routers
app.use('/api/auth', userRoutes);
app.use('/api/sauces', saucesRoutes);






module.exports = app;