const { Router } = require("express")

const courseRouter = Router()

courseRouter.get("/", (req, res) => {
    res.json("All courses")
})

courseRouter.post("/purchase", (req, res) => {
    res.json("purchase a course")
})

module.exports = {
    courseRouter: courseRouter
}