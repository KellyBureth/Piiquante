const express = require("express");
const router = express.Router();
const password = require("../middleware/password");
const userCtrl = require("../controllers/user");

router.post("/signup", password, userCtrl.userSignup);
router.post("/login", userCtrl.userLogin);

module.exports = router;
