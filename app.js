const express = require("express");

const app = express();

const mongoose = require("mongoose");

const userRoutes = require("./routes/user");

const sauceRoutes = require("./routes/sauce");

const path = require("path");

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
  next();
});

app.use("/api/auth", userRoutes); //importe les routes en definissant l'url de base
app.use("/api/sauces", sauceRoutes); //importe les routes en definissant l'url de base
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app; // exporte l'application pour y acceder depuis les autres fichiers
