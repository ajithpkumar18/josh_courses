const jwt = require("jsonwebtoken")

let userMiddleware = (req, res, next) => {
    console.log("here");

    const token = req.cookies.access_token;
    try {

        let decodedToken = jwt.verify(token, process.env.JWT_USER_PASSWORD)
        console.log(decodedToken);

        if (decodedToken) {
            req.userId = decodedToken.username
            console.log(decodedToken.username)
            next();
        }
        else {
            return res.status(402).json("Expired token")
        }
    } catch (e) {
        res.status(404).json({ message: "You are not logged in" })
    }
}

module.exports = {
    userMiddleware: userMiddleware
}