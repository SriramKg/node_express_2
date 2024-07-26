const { registerNewUser } = require("../services/user.service");
const { loginMyUser } = require("../services/user.service");

async function registerUser(req, res) {
  try {
    const { message, status, user } = await registerNewUser(req.body);
    res.status(status).json({
      message,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
    console.log(error);
  }
}


async function loginUser(req, res) {
  try {
    const { message, status, token } = await loginMyUser(req.body);
    res.status(status).json({
      message,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
    console.log(error);
  }
}

module.exports = { loginUser, registerUser };
