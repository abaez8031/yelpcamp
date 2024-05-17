const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const User = require("../models/user");

router.get("/register", (req, res) => {
  res.render("users/register");
});

router.post("/register", wrapAsync(async (req, res) => {
  try {
    const { username, email, password } = req.params;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.flash("success", "Welcome to Yelp Camp!");
    res.redirect("/campgrounds")
  } catch(e) {
    req.flash("error", e.message);
    res.redirect("register")
  }
}));

module.exports = router;
