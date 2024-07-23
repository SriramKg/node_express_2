const bcrypt = require('bcrypt');
const fs = require('fs').promises;
const jwt = require('jsonwebtoken');

async function registerNewUser(body) {
    try {
        const {name, email, password, preferences} = body;

        const hash = await bcrypt.hash(password, 10);

        const newUser = {
            name,
            email,
            password: hash,
            preferences
        }
        return {
            status: 201,
            message: "User registered successfully",
            user: newUser
        }
    }
    catch (error) {
        throw new Error("USER NOT CREATED !!!" + error);
    }
}

async function loginMyUser(body) {
    try {
        const {email, password} = body;
        const secret = process.env.SECRET_JWT;
        const data = await fs.readFile('static.json', 'utf-8');
        const response = JSON.parse(data);
        const user = response.users.find(user => user.email === email);
        if (!user) {
            return {
                status: 404,
                message: "User not found",
            };
        }
        console.log(user.password,"before encrypt password");
        const validatePassword = await bcrypt.compare(password, user.password);
        if(validatePassword) {
            const payload = {
                user: user.email,
                name: user.name,
            };
            const authToken = jwt.sign(payload, secret, {expiresIn: '2h'});
            return {
                status: 200,
                message: "User authenticated successfully",
                token: authToken,
            };
        }
        else {
            return {
                status: 401,
                message: "Invalid password",
            };
        }
    }
    catch (error) {
        throw new Error("USER NOT AUTHENTICATED !!!" + error);
    }
}

module.exports ={registerNewUser, loginMyUser};