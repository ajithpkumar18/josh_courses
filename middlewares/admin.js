const jwt = require("jsonwebtoken")

let adminMiddleware = (req, res, next) => {
    const token = req.headers.token;
    let decodedToken = jwt.verify(token, process.env.JWT_ADMIN_PASSWORD)
    if (decodedToken) {
        req.userId = decodedToken.id
        next();
    }
    else {
        return res.status(402).json("Expired token")
    }
}

module.exports = {
    adminMiddleware: adminMiddleware
}