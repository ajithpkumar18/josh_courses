const { Router } = require("express")
const { userMiddleware } = require("../middlewares/user")
const { purchaseModel, courseModel, userModel } = require("../db")

const courseRouter = Router()

courseRouter.get("/", userMiddleware, async (req, res) => {
    let userId = req.userId;
    let user = await userModel.findOne({ _id: userId })
    let allcourses = await courseModel.find({ _id: { $in: user.purchasedCourse } });
    res.json({ "All courses": allcourses }).send()
})

courseRouter.get("/all", async (req, res) => {
    let courses = await courseModel.find();
    res.json({ "List all courses": courses }).send()
})

courseRouter.post("/purchase/:id", userMiddleware, async (req, res) => {
    let userId = req.userId
    console.log(userId);

    let courseId = req.params.id

    let user = await userModel.findOneAndUpdate({ _id: userId }, {
        $push: {
            purchasedCourse: courseId
        }
    })

    res.json("purchased a course")
})

module.exports = {
    courseRouter: courseRouter
}