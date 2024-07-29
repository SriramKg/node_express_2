const express = require("express");
const router = express.Router();

const { getUserNews, readNews, favoriteNews } = require('../controllers/news.controller');
const { validateUser } = require("../middlewares/logincheck.middleware");

router.get("/", validateUser, getUserNews);
router.post("/:id/read", validateUser, readNews);
router.post("/:id/favorite", validateUser, favoriteNews);
// router.get("/read", validateUser, getReadNews);
// router.get("/favorite", validateUser, getFavoriteNews);

module.exports = router;