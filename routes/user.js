const { Router } = require("express")

const userRouter = Router();

userRouter.post("/signup", (req, res) => {
    res.json({
        message: "signup"
    })
})

userRouter.post("/signin", (req, res) => {
    res.json({
        message: "signup"
    })
})

userRouter.get("/purchases", (req, res) => {
    res.json("All purchased courses")
})

module.exports = { userRouter: userRouter }