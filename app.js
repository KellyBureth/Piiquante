const express = require("express"); //importe express

const app = express(); //application

const mongoose = require("mongoose"); //importez mongoose dans votre fichier app.js

const userRoutes = require("./routes/user"); //importe le routeur de user.js

const sauceRoutes = require("./routes/sauce"); // importe le routeur de sauce.js

const path = require("path");

//const Thing = require("./models/thing"); //immporte le schema crée pour recevoir les donnée de facon stricte

//user et sauce seront importée dans leur fichier independant
//const User = require("./models/user"); //immporte le schema user crée pour recevoir les donnée de facon stricte
//const Sauce = require("./models/sauce"); //immporte le schema sauce crée pour recevoir les donnée de facon stricte

mongoose
  .connect(
    "mongodb+srv://Kelly:UjDMIs2zYTnCHuuD@cluster0.jj9lqcw.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(express.json()); //intercepte les requetes json pour mettre à disposition le corps des requetes dans rq.body (bodyparser est l'ancienne methode)

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // d'accéder à notre API depuis n'importe quelle origine ( '*' ) donc tout le monde peut acceder à l'api
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  ); //autorisation d'ajouter les headers mentionnés aux requêtes envoyées vers notre API  (Origin , X-Requested-With , etc.) ;
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  ); //autorisation d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).
  next(); //pour faire suivre au middleware suivant, sinon crash
});

app.use("/api/auth", userRoutes); //importe les routes en definissant l'url de base
app.use("/api/sauces", sauceRoutes); //importe les routes en definissant l'url de base
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app; // exporte l'application pour y acceder depuis les autres fichiers

//
//
//
//
//
//-------------------------------------------------

/*app.get("/api/sauces", (req, res, next) => {
  // "/api/stuff" url /api/stuff http://localhost:3000/api/stuff
  const stuff = [
    {
      _id: "oeihfzeoi",
      title: "Mon premier objet",
      description: "Les infos de mon premier objet",
      imageUrl:
        "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
      price: 4900,
      userId: "qsomihvqios",
    },
    {
      _id: "oeihfzeomoihi",
      title: "Mon deuxième objet",
      description: "Les infos de mon deuxième objet",
      imageUrl:
        "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
      price: 2900,
      userId: "qsomihvqios",
    },
  ];
  res.status(200).json(stuff); //demande reussie
});*/

/*
app.use((req, res, next) => {
  //cette ligne est un middleware qui recoit et gere les objet requete et response, et qui passe l'execution a un prochain middleware (prochaine fonction)
  console.log("requête reçue opiw !");
  next(); //pour passer à la requete suivante, sinon : crash !
});

app.use((req, res, next) => {
  //cette ligne est un middleware qui recoit et gere les objet requete et response, et qui passe l'execution a un prochain middleware (prochaine fonction)
  res.json({ message: "votre requête a bien été reçue", reponse: "marci" });
  next();
});

app.use((req, res) => {
  //cette ligne est un middleware qui recoit et gere les objet requete et response, et qui passe l'execution a un prochain middleware (prochaine fonction)
  console.log("requête envoyée ip !");
  //pas de next car c'est la dernière
});
*/

/*app.get("/api/sauces", (req, res, next) => {
  // "/api/stuff" url /api/stuff http://localhost:3000/api/stuff
  const stuff = [
    {
      _id: "oeihfzeoi",
      title: "Mon premier objet",
      description: "Les infos de mon premier objet",
      imageUrl:
        "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
      price: 4900,
      userId: "qsomihvqios",
    },
    {
      _id: "oeihfzeomoihi",
      title: "Mon deuxième objet",
      description: "Les infos de mon deuxième objet",
      imageUrl:
        "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
      price: 2900,
      userId: "qsomihvqios",
    },
  ];
  res.status(200).json(stuff); //demande reussie
});*/

/*
app.post("/api/auth/login", (req, res, next) => {
  console.log(req.body); //donnee recupéré, on pourra apres les mettre dans une base de donnée
  res.status(201).json({
    message: "Objet créé !",
  });
});
app.post("/api/auth/signup", (req, res, next) => {
  console.log(req.body); //donnee recupéré, on pourra apres les mettre dans une base de donnée
  res.status(201).json({
    message: "Objet créé !",
  });
});
*/

/*
//couper coller dans sauce.js 
app.post("/api/auth/login", (req, res, next) => {
  delete req.body._id;
  const user = new User({
    ...req.body, //point de suspension  est un operateur JS "spread" qui copie ts les champs de le corps de la requete
  });
  user
    .save() //save le User dans la base de donnée, envoi une promesse
    .then(() => res.status(201).json({ message: "Utilisateur connecté !" }))
    .catch((error) => res.status(400).json({ error }));
});

app.post("/api/auth/signup", (req, res, next) => {
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


//POST TO ADD A SAUCE
app.post("/api/sauces", (req, res, next) => {
  delete req.body._id;
  const sauce = new Sauce({
    ...req.body,
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Sauce enregistrée !" }))
    .catch((error) => res.status(400).json({ error }));
});

//PUT TO UPDATE A SAUCE
app.put("/api/sauces/:id", (req, res, next) => {
  Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Sauce modifiée !" }))
    .catch((error) => res.status(400).json({ error }));
});

//DELETE TO DELETE A SAUCE
app.delete("/api/sauces/:id", (req, res, next) => {
  Sauce.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Sauce supprimée !" }))
    .catch((error) => res.status(400).json({ error }));
});

//2ND POST TO RETRIEVE A SPECIFIC SAUCE
app.get("/api/sauces/:id", (req, res, next) => {
  // :id pour recuperer l'id ds la route utilisée, dit a express avec les : que cette partie de la route est dynamique
  Sauce.findOne({ _id: req.params.id }) //id identique a id de params
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error })); //404 objet non trouvé
});

//ROUTE GET
app.get("/api/sauces", (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
});
*/
