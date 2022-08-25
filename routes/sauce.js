const express = require("express");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const router = express.Router();
const sauceCtrl = require("../controllers/sauce");
const ratingCtrl = require("../controllers/rating");

router.post("/", auth, multer, sauceCtrl.createSauce);
router.put("/:id", auth, multer, sauceCtrl.updateSauce);
router.delete("/:id", auth, sauceCtrl.deleteSauce);
router.get("/:id", auth, sauceCtrl.readOneSauce);
router.get("/", auth, sauceCtrl.readAllSauces);
router.post("/:id/like", auth, ratingCtrl.likeSauce);

module.exports = router;
