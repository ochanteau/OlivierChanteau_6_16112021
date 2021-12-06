// import du module bcrypt
const bcrypt = require ("bcrypt");
// import module Dotenv pour les varibales d'environnement
require("dotenv").config();
// import du module jwt
const jwt = require('jsonwebtoken');
// import du model user
const User = require("../models/user");






// fonction pour s'inscrire

exports.signup = (req, res, next) => {
  // hash du password
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        // creation d'un nouvelle utilisateur avec le modele User
        const user = new User({
          email: req.body.email,
          password: hash
        });
        // sauvegarde du nouvelle utilisateur dans la base de donnée
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };


  // fonction pour se loguer
  exports.login = (req, res, next) => {
    // recherche de l'utilisateur dans la base de donnée
    User.findOne({ email: req.body.email })
      .then(user => {
        // si non existant :envoie d'une erreur 401
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        // verification password de la requete et password base de donnée
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            // si non concordant :envoie d'une  erreur 401
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            // si valide , envoie d'une reponse 200 avec le token authentification
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                { userId: user._id },
                `${process.env.USER_TOKEN}`,
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };