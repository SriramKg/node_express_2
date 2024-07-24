const express = require("express");
const router = express.Router();

const {getUserPreferences, updateUserPreferences} = require('../controllers/preference.controller');
const { validateUser } = require("../middlewares/logincheck.middleware");
const { loginUser, registerUser } = require('../controllers/users.controller');


router.post('/signup', registerUser);
router.post('/login', loginUser);
router.get("/preferences", validateUser, getUserPreferences);
router.put("/preferences", validateUser, updateUserPreferences);



module.exports = router;