const jwt = require("jsonwebtoken")

let userMiddleware = (req, res, next) => {
    console.log("here");

    const token = req.cookies.access_token;
    let decodedToken = jwt.verify(token, process.env.JWT_USER_PASSWORD)
    if (decodedToken) {
        req.userId = decodedToken.id
        console.log("next")
        next();
    }
    else {
        return res.status(402).json("Expired token")
    }
}

module.exports = {
    userMiddleware: userMiddleware
}