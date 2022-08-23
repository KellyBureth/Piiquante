const mongoose = require("mongoose");

//SAUCE MODEL
const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, required: false, default: 0 },
  dislikes: { type: Number, required: false, default: 0 },
  usersLiked: { type: [String], required: true, default: [] },
  usersDisliked: { type: [String], required: true, default: [] },
  //usersLiked: { type: [String] },
  //usersDisliked: { type: [String] },
  //usersLiked: { type: [String], req: true, default: 0 },
  //usersDisliked: { type: [String], req: true, default: 0 },
  //usersLiked: { type: String, required: false },
  //usersDisliked: { type: String, required: false },
});

module.exports = mongoose.model("sauce", sauceSchema);
