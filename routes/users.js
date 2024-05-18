const express = require("express");
const router = express.Router();
const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync");
const { storeReturnTo } = require('../middleware');
const users = require("../controllers/users")

router.get("/register", users.new);
router.post("/register", wrapAsync(users.create));
router.get("/login", users.renderLogin);
router.post("/login", storeReturnTo, passport.authenticate("local", { failureFlash: true, failureRedirect: "/login"}), users.login);
router.get("/logout", users.logout);

module.exports = router;
