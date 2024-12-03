const jwt = require("jsonwebtoken")

let adminMiddleware = (req, res, next) => {
    const token = req.cookies.access_token;
    try {

        let decodedToken = jwt.verify(token, process.env.JWT_ADMIN_PASSWORD)
        if (decodedToken) {
            req.userId = decodedToken.username
            next();
        }
        else {
            return res.status(402).json("Expired token")
        }
    }
    catch (e) {
        return res.status(404).json({ message: "Page not accesible for normal user" })
    }
}

module.exports = {
    adminMiddleware: adminMiddleware
}