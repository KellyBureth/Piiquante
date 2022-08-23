const Sauce = require("../models/sauce"); //immporte le schema sauce crée pour recevoir les donnée de facon stricte

exports.likeSauce = (req, res, next) => {
  console.log("sauce liké");
  Sauce.findOne({ _id: req.params.id }) // recup l'id de la sauce dans l'url
    .then((sauce) => {
      //userliked false dc user n'a pas liké la sauce et veut liker
      if (!sauce.usersLiked.includes(req.body.userId) && req.body.like === 1) {
        console.log("sauce liké ds bon if");
        //update in mongoodb
        Sauce.updateOne(
          console.log("sauce liké reussi"),
          { _id: req.params.id },

          {
            $inc: { likes: 1 },
            $push: { usersLiked: req.body.userId },
          },
          console.log("test")
          //met l'id ds le tableau des user qui ont like,
        )
          //.save()
          .then(() => res.status(201).json({ message: "Sauce likée !" }))
          .catch((error) => res.status(400).json({ error })); //bad request
      }

      //si deja liké et reclic sur like supprime like de mongodb et l'userid du array
      if (sauce.usersLiked.includes(req.body.userId) && req.body.like === 0) {
        //update in mongoodb
        console.log("si user a deja liké mettre à 0");
        sauce
          .updateOne(
            { _id: req.params.id },

            { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId } } //supprime l'id ds le tableau des user qui ont like
          )
          .then(() => res.status(201).json({ message: "Sauce likée !" }))
          .catch((error) => res.status(400).json({ error })); //bad request
      }

      res.status(200).json(sauce);
    })
    .catch((error) => res.status(404).json({ error })); //non trouvé

  /*
  const sauceObject = req.file
    // bla ? {
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
    .catch((error) => res.status(400).json({ error }));*/
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

/*
exports.likeSauce = (req, res, next) => {
  const sauceObject = req.file
    ? {
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
