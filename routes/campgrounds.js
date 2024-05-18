const express = require("express");
const router = express.Router();
const campgrounds = require("../controllers/campgrounds")
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isAuthor, validateCampground } = require("../middleware");

router.get("/",wrapAsync(campgrounds.index));
router.get("/new", isLoggedIn, campgrounds.new);
router.post("/", isLoggedIn, validateCampground, wrapAsync(campgrounds.create));
router.get("/:id", wrapAsync(campgrounds.show));
router.get("/:id/edit", isLoggedIn, isAuthor, wrapAsync(campgrounds.edit));
router.put("/:id",isLoggedIn, validateCampground, isAuthor, wrapAsync(campgrounds.update));
router.delete("/:id", isLoggedIn, isAuthor, wrapAsync(campgrounds.delete));

module.exports = router;
