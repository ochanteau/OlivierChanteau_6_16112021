// import express et mise en place
const express = require('express');
const app = express();
// import module Dotenv pour les varibales d'environnement
require("dotenv").config();
// import  mongoose
const mongoose = require('mongoose');
// import du module path 
const path = require('path');
// import et config express-mongo -sanitize
const mongoSanitize = require('express-mongo-sanitize');
// import  express-rate-limit
const rateLimit = require("express-rate-limit");
// import helmet 
const helmet = require('helmet');
//  import Morgan
const morgan = require('morgan');

// import des routes
const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauces')

// connection base de donnée MDB
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.jiuzr.mongodb.net/cluster0?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


// middleware Morgan pour console.log les requetes et reponses serveurs
app.use(morgan('dev'));


/*
* Middleware helmet 
* configuration des en tetes HTPP liés à la sécurité
*/
app.use(helmet());


/*
* middleware express-rate-limit
* limitation des requetes provenant d'une même adresse IP 
*/
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
}));


// middleware CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


// middleware parsing req
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


/*
*middleware mongoSanitize
*This module searches for any keys in objects that begin with a $ sign or contain a ., 
*from req.body, req.query or req.params
*/
app.use(mongoSanitize());

// middleware pour renvoyer les fichiers images
app.use('/images', express.static(path.join(__dirname, 'images')))


// middleware de routing
app.use('/api/auth', userRoutes);
app.use('/api/sauces', saucesRoutes);



module.exports = app;



