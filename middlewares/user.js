const jwt = require("jsonwebtoken")

let userMiddleware = (req, res, next) => {
    const token = req.headers.token;
    let decodedToken = jwt.verify(token, process.env.JWT_USER_PASSWORD)
    if (decodedToken) {
        req.id = decodedToken.id
        next();
    }
    else {
        return res.status(402).json("Expired token")
    }

    next();
}

module.exports = {
    userMiddleware: userMiddleware
}