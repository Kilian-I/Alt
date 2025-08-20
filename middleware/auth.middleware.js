const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');

module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                res.cookies('jwt', '', { maxAge: 1 }); // Clear the cookie
                console.log(err.message);
                next();
            } else {
                
                res.locals.user = decodedToken.id;
                console.log(decodedToken);
                console.log(res.locals.user);
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
}

module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.status(401).json({ error: "Unauthorized" });
            } else {
                next();
            }
        });
    } else {
         res.status(401).json({ error: "Unauthorized" });
    }
}