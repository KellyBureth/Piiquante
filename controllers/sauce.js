const Sauce = require("../models/sauce"); //immporte le schema sauce crée pour recevoir les donnée de facon stricte
const fs = require("fs"); //package fs (pour file system) Il nous donne accès aux fonctions qui nous permettent de modifier le système de fichiers, y compris aux fonctions permettant de supprimer les fichiers

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  delete sauceObject._userId;
  const sauce = new Sauce({
    ...sauceObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      //pour l'image en local
      req.file.filename
    }`,
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Sauce enregistrée !" }))
    .catch((error) => res.status(400).json({ error }));
};

/*exports.createSauce = (req, res, next) => {
  delete req.body._id;
  const sauce = new Sauce({
    ...req.body,
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Sauce enregistrée !" }))
    .catch((error) => res.status(400).json({ error }));
};*/

exports.updateSauce = (req, res, next) => {
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  delete sauceObject._userId;
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (sauce.userId != req.auth.userId) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        Sauce.updateOne(
          { _id: req.params.id },
          { ...sauceObject, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "Sauce modifiée !" }))
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};
/*
exports.likeSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }) // recup l'id de la sauce dans l'url
    .then((sauce) => {
      console.log(req.body);
      // récupère le like dans la requête
      const like = Number(req.body.like);
      console.log("like = " + like);

      Sauce.updateOne({
        $inc: { likes: like },
        $push: { usersLiked: req.body.userId },
      })
        .then(() => {
          res.status(200).json({ message: "sauce liked !" });
        })
        .catch((error) => {
          res.status(400).json({ error: error });
        });
    })
    .catch((error) => res.status(400).json({ error }));
};*/

//deplacé ds rating.js
/*
exports.likeSauce = (req, res, next) => {
  const sauceObject = req.file
    //bl? {
        ...JSON.parse(req.body.sauce),
      }
    : { ...req.body };
  // récupère le like dans la requête
  const like = Number(req.body.like);
  console.log("like = " + like);

  const sauce = new Sauce({
    ...sauceObject,
    $inc: { likes: like },
    $push: { usersLiked: req.body.userId }, //met l'id ds le tableau des user qui ont like
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Sauce enregistrée !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.dislikeSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }) // recup l'id de la sauce dans l'url
    .then((sauce) => {
      console.log(req.body);
      // récupère le like dans la requête
      const dislike = Number(req.body.dislike);
      console.log("like = " + dislike);

      Sauce.updateOne({
        $inc: { dislikes: dislike },
        $push: { usersDisliked: req.body.userId },
      })
        .then(() => {
          res.status(200).json({ message: "sauce disliked !" });
        })
        .catch((error) => {
          res.status(400).json({ error: error });
        });
    })
    .catch((error) => res.status(400).json({ error }));
};
*/
/*
exports.updateSauce = (req, res, next) => {
  Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Sauce modifiée !" }))
    .catch((error) => res.status(400).json({ error }));
};*/

/*
exports.deleteSauce = (req, res, next) => {
  Sauce.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Sauce supprimée !" }))
    .catch((error) => res.status(400).json({ error }));
};
*/

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (sauce.userId != req.auth.userId) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        const filename = sauce.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(200).json({ message: "Sauce supprimée !" });
            })
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.readAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};

exports.readOneSauce = (req, res, next) => {
  // :id pour recuperer l'id ds la route utilisée, dit a express avec les : que cette partie de la route est dynamique
  Sauce.findOne({ _id: req.params.id }) //id identique a id de params
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error })); //404 objet non trouvé
};

/*
exports.likeSauce = (req, res, next) => {
    {$inc: {likes: like}, $push: {usersLiked:userId}})
    .then(
       () =>{ res.status(200).json({message: "sauce liked or disliked  !"})}
    )
    .catch(error =>{ res.status(400).json({error: error})});
};
*/

/*
exports.likeSauce = (req, res, next) => {
  ({ $inc: { likes: like }, $push: { usersLiked: userId } }
    .then(() => {
      res.status(200).json({ message: "sauce liked or disliked  !" });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    }));
};*/

/*
Sauce.updateOne(
    {$inc: {likes: like}, $push: {usersLiked:userId}}).then(
       () =>{ res.status(200).json({message: "sauce liked or disliked  !"})}
    ).catch(error =>{ res.status(400).json({error: error});})*/
