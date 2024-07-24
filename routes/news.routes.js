const express = require("express");
const router = express.Router();

const { getUserNews } = require('../controllers/news.controller');
const { validateUser } = require("../middlewares/logincheck.middleware");

router.get("/", validateUser, getUserNews);

module.exports = router;