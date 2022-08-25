const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.userSignup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" })) //reussite
        .catch((error) => res.status(400).json({ error })); //echec de creation d'user
    })
    .catch((error) => res.status(500).json({ error })); //erreur serveur
};

exports.userLogin = (req, res, next) => {
  User.findOne({ email: req.body.email }) //cherche si l'email existe ds la bdd
    .then((user) => {
      if (!user) {
        //user non trouvé
        return res
          .status(401)
          .json({ message: "Paire login/mot de passe incorrecte" });
      }
      //si email existe ds bdd
      bcrypt
        .compare(req.body.password, user.password) //on compare les 2 passwords cryptés
        .then((valid) => {
          if (!valid) {
            //si le password ne correspondent pas à l'email
            return res
              .status(401)
              .json({ message: "Paire login/mot de passe incorrecte" });
          }
          //else, si mot de passe corerespond a l'email
          res.status(200).json({
            //ok
            userId: user._id, //donne un user id
            token: jwt.sign(
              //fonction de jsonwebtoken pour le token
              { userId: user._id }, //user à encoder
              "0XSsGAT4srFHmRv5ntrCqQDfw3yxAj", //clé secrete pour l'encodage
              { expiresIn: "24h" } //session expire en 24h
            ),
          });
        })
        .catch((error) => res.status(500).json({ error })); //ereur serveur
    })
    .catch((error) => res.status(500).json({ error })); //erreur serveur
};
