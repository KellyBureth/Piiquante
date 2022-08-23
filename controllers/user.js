const bcrypt = require("bcrypt"); //importe package brypt pour cripter mdp
const jwt = require("jsonwebtoken"); //importe packagequi crée et verifie des token pour encoder token pr etre sûr que l'user est bien authentifié
const User = require("../models/user"); //immporte le schema user crée pour recevoir les donnée de facon stricte

exports.userSignup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10) //fonction qui cripte le mdp (mdp entré, salt a 10 car nous demandons de « saler » le mot de passe 10 fois. Plus la valeur est élevée, plus l'exécution de la fonction sera longue, et plus le hachage sera sécurisé. 10 est un bon equilibre securité/tps de salage )
    .then((hash) => {
      //fonction asynchrone, reussite. recupere le mdp hashé
      const user = new User({
        //nouvel user selon modele mongoose
        email: req.body.email, //stock adresse entré dans le corps du post
        password: hash, //et stock le mdp cripté
      });
      user
        .save() //enregistre ds base de donnee
        .then(() => res.status(201).json({ message: "Utilisateur créé !" })) //reussite
        .catch((error) => res.status(400).json({ error })); //echec de creation d'user
    })
    .catch((error) => res.status(500).json({ error })); //echec, error 500 : erreur serveur
};

exports.userLogin = (req, res, next) => {
  User.findOne({ email: req.body.email }) //cherche si l'email existe ds la bdd
    .then((user) => {
      if (!user) {
        //user non trouvé
        return res
          .status(401)
          .json({ message: "Paire login/mot de passe incorrecte" }); //important de rester flou, pour ne pas donner d'information si l'user existe ou non
      } //else, si email existe ds bdd
      bcrypt
        .compare(req.body.password, user.password) //on compare les 2 mdp cryptés
        .then((valid) => {
          if (!valid) {
            //si mdp ne correspond pas a l'email
            return res
              .status(401)
              .json({ message: "Paire login/mot de passe incorrecte" }); //important de rester flou, pour ne pas donner d'information si l'user existe ou non
          } //else, si mot de passe corerespond a l'email
          res.status(200).json({
            //ok
            userId: user._id, //donne un user id
            token: jwt.sign(
              //fonction de jsonwebtoken
              { userId: user._id }, //user à encoder
              "RANDOM_TOKEN_SECRET", //clé secrete pour l'encodage, ici simple, mais en situation reel il faut une clé bien plus longue
              { expiresIn: "24h" } //session expire en 24h
            ),
          });
        })
        .catch((error) => res.status(500).json({ error })); //ereur serveur
    })
    .catch((error) => res.status(500).json({ error })); //erreur serveur
};

/*
exports.userSignup = (req, res, next) => {
  delete req.body._id;
  const user = new User({
    ...req.body,
  });
  user
    .save()
    .then(() =>
      res.status(201).json({ message: "Nouvel utilisateur enregistré !" })
    )
    .catch((error) => res.status(400).json({ error }));
};*/
/*
exports.userLogin = (req, res, next) => {
  delete req.body._id;
  const user = new User({
    ...req.body, //point de suspension  est un operateur JS "spread" qui copie ts les champs de le corps de la requete
  });
  user
    .save() //save le User dans la base de donnée, envoi une promesse
    .then(() => res.status(201).json({ message: "Utilisateur connecté !" }))
    .catch((error) => res.status(400).json({ error }));
};*/
