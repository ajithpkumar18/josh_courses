const { Router } = require("express")
const { userMiddleware } = require("../middlewares/user")
const { purchaseModel, courseModel } = require("../db")

const courseRouter = Router()

courseRouter.get("/", userMiddleware, async (req, res) => {
    let allcourses = await courseModel.find();
    res.json({ "All courses": allcourses }).send()
})

courseRouter.post("/purchase", userMiddleware, async (req, res) => {
    let userId = req.userId
    let courseId = req.body.id

    let purchase = await purchaseModel.create({
        userId: userId,
        courseId: courseId
    })
    res.json("purchased a course")
})

module.exports = {
    courseRouter: courseRouter
}