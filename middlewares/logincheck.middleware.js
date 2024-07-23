const jwt = require('jsonwebtoken');

function validateUser(req, res, next) {
    const jwtSecret = process.env.SECRET_JWT;
    const token = req.headers.authorization.split(' ')[1];
    console.log(token,"Auth Token");
    if(!token) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }
    else{
        jwt.verify(token, jwtSecret, (err, decodedString) => {
            if(err) {
                return res.status(401).json({
                    message: "Unauthorized",
                });
            }
            else {
                req.email = decodedString.user;
                console.log(req.email,"request Email");
                next();
            }
        })
    }
}

module.exports = {
    validateUser,
};