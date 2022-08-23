const express = require("express");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const router = express.Router();
const sauceCtrl = require("../controllers/sauce"); //immporte le schema sauce crée pour recevoir les donnée de facon stricte
const ratingCtrl = require("../controllers/rating");

router.post("/", auth, multer, sauceCtrl.createSauce); //multer doit bien etre placé APRES auth !
router.put("/:id", auth, multer, sauceCtrl.updateSauce);
router.delete("/:id", auth, sauceCtrl.deleteSauce);
router.get("/:id", auth, sauceCtrl.readOneSauce);
router.get("/", auth, sauceCtrl.readAllSauces);
router.post("/:id/like", auth, ratingCtrl.likeSauce); //like
router.post("/:id/dislike", auth, ratingCtrl.dislikeSauce); //dislike

module.exports = router;

/*
//avt remplacement url 
//POST TO ADD A SAUCE
router.post("/api/sauces", (req, res, next) => {
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
router.put("/api/sauces/:id", (req, res, next) => {
  Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Sauce modifiée !" }))
    .catch((error) => res.status(400).json({ error }));
});

//DELETE TO DELETE A SAUCE
router.delete("/api/sauces/:id", (req, res, next) => {
  Sauce.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Sauce supprimée !" }))
    .catch((error) => res.status(400).json({ error }));
});

//2ND POST TO RETRIEVE A SPECIFIC SAUCE
router.get("/api/sauces/:id", (req, res, next) => {
  // :id pour recuperer l'id ds la route utilisée, dit a express avec les : que cette partie de la route est dynamique
  Sauce.findOne({ _id: req.params.id }) //id identique a id de params
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error })); //404 objet non trouvé
});

//ROUTE GET
router.get("/api/sauces", (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
});
*/
