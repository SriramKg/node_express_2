const express = require("express");
const router = express.Router();

const {getUserPreferences} = require('../controllers/preference.controller');
const { validateUser } = require("../middlewares/logincheck.middleware");
const { loginUser, registerUser } = require('../controllers/users.controller');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get("/preferences", validateUser, getUserPreferences);


module.exports = router;