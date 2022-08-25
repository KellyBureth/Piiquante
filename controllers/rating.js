const Sauce = require("../models/sauce");

exports.likeSauce = (req, res, next) => {
  console.log("sauce notée");
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      //--------------------------LIKE---------------------------
      //user n'a pas liké la sauce et veut liker
      if (!sauce.usersLiked.includes(req.body.userId) && req.body.like === 1) {
        console.log("sauce liké");
        Sauce.updateOne(
          { _id: req.params.id },

          {
            $inc: { likes: 1 },
            $push: { usersLiked: req.body.userId },
          }
          //ajoute 1 like dans BDD et met l'id ds le tableau des user qui ont liké,
        )
          .then(() => res.status(201).json({ message: "Sauce likée !" }))
          .catch((error) => res.status(400).json({ error })); //bad request
      }

      //user retire son like
      if (sauce.usersLiked.includes(req.body.userId) && req.body.like === 0) {
        console.log("like retiré");
        sauce
          .updateOne(
            {
              $inc: { likes: -1 },
              $pull: { usersLiked: req.body.userId },
            } //supprime le like et l'id du tableau des user qui ont liké,
          )
          .then(() => res.status(201).json({ message: "Like retiré !" }))
          .catch((error) => res.status(400).json({ error }));
      }

      //--------------------------DISLIKE---------------------------

      //user dislike la sauce
      if (
        !sauce.usersDisliked.includes(req.body.userId) &&
        req.body.like === -1
      ) {
        console.log("sauce disliké");
        sauce
          .updateOne(
            {
              $inc: { dislikes: 1 },
              $push: { usersDisliked: req.body.userId },
            }
            //ajoute 1 dislike et ajoute l'id ds le tableau des user qui ont disliké,
          )
          .then(() => res.status(201).json({ message: "Sauce dislikée !" }))
          .catch((error) => res.status(400).json({ error }));
      }

      //user supprime son dislike
      if (
        sauce.usersDisliked.includes(req.body.userId) &&
        req.body.like === 0
      ) {
        console.log("dislike retiré");
        sauce
          .updateOne(
            {
              $inc: { dislikes: -1 },
              $pull: { usersDisliked: req.body.userId },
            } //supprime le dislike et l'id du tableau des user qui ont like
          )
          .then(() => res.status(201).json({ message: "Dislike retiré !" }))
          .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch((error) => res.status(404).json({ error })); //non trouvé
};
