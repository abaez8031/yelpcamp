const express = require("express");
const router = express.Router();
const campgrounds = require("../controllers/campgrounds")
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isAuthor, validateCampground } = require("../middleware");
const multer  = require('multer');
const { storage } = require("../cloudinary")
const upload = multer({ storage });

router.route("/")
  .get(wrapAsync(campgrounds.index))
  .post(isLoggedIn, upload.array("image"), validateCampground, wrapAsync(campgrounds.create));

router.get("/new", isLoggedIn, campgrounds.new);

router.route("/:id")
  .get(wrapAsync(campgrounds.show))
  .delete(isLoggedIn, isAuthor, wrapAsync(campgrounds.delete))
  .put(isLoggedIn, validateCampground, isAuthor, wrapAsync(campgrounds.update));

router.get("/:id/edit", isLoggedIn, isAuthor, wrapAsync(campgrounds.edit));

module.exports = router;