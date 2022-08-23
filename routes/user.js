const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user"); //immporte le schema user crée pour recevoir les donnée de facon stricte

router.post("/signup", userCtrl.userSignup);
router.post("/login", userCtrl.userLogin);

module.exports = router;

/* 
//avt remplaceent url
router.post("/api/auth/login", (req, res, next) => {
  delete req.body._id;
  const user = new User({
    ...req.body, //point de suspension  est un operateur JS "spread" qui copie ts les champs de le corps de la requete
  });
  user
    .save() //save le User dans la base de donnée, envoi une promesse
    .then(() => res.status(201).json({ message: "Utilisateur connecté !" }))
    .catch((error) => res.status(400).json({ error }));
});

router.post("/api/auth/signup", (req, res, next) => {
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
});
*/
