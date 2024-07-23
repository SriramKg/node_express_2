const fs = require("fs");
const { registerNewUser } = require("../services/user.service");
const { loginMyUser } = require("../services/user.service");
async function loginUser(req, res) {
  try {
    const { message, status, token } = await loginMyUser(req.body);
    res.status(status).json({
      message,
      token,
    });
  } catch (error) {
    console.log(error);
  }
}

async function registerUser(req, res) {
  try {
    const { message, status, user } = await registerNewUser(req.body);

    fs.readFile("static.json", "utf-8", (err, data) => {
      if (err) {
        res.status(500);
        res.write("Error in reading file");
        res.end();
      } else {
        const response = JSON.parse(data);
        if (response.users.find((user) => user.email === req.body.email)) {
          res.status(400);
          res.json({
            message: "User already exists",
          });
        } else {
          response.users.push(user);
          fs.writeFile("static.json", JSON.stringify(response), (err) => {
            if (err) {
              res.status(400);
              res.write("Error in writing file");
              res.end();
            } else {
              res.status(status).json({
                message,
              });
            }
          });
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = { loginUser, registerUser };
