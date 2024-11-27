const { Router } = require("express");
const { adminModel, courseModel } = require("../db");
const zod = require("zod")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const { adminMiddleware } = require("../middlewares/admin");

let adminRouter = Router()

const passwordSchema = zod.object({
    email: zod.string().email(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
})

adminRouter.post("/signup", async (req, res) => {
    try {
        passwordSchema.parse({ email: req.body.email, password: req.body.password, firstName: req.body.firstName, lastName: req.body.lastName })
    }
    catch (err) {
        return res.send(err);
    }

    let email = req.body.email
    let password = req.body.password
    let firstName = req.body.firstName
    let lastName = req.body.lastName
    try {

        await adminModel.create({
            email: email,
            password: bcrypt.hashSync(password, 2),
            firstName: firstName,
            lastName: lastName
        })
    }
    catch (e) {
        console.log(e);
        return res.send("errror")
    }

    res.json({
        message: "signup"
    })
})

adminRouter.post("/signin", async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    let token = req.headers.token;


    let admin = await adminModel.findOne({ email: email })
    if (admin) {
        let val = bcrypt.compareSync(password, admin.password);

        if (val) {
            let token = jwt.sign({ username: admin._id }, process.env.JWT_ADMIN_PASSWORD)
            return res.status(200).json(token)
        }
    }
    else {
        res.status(204).json({ message: "invalid credentials" })
    }
})

adminRouter.post("/course", adminMiddleware, async (req, res) => {

    let adminId = req.userId;
    let { title, description, imageUrl, price } = req.body

    const course = await courseModel.create({
        title: title,
        description: description,
        price: price,
        imageUrl: imageUrl,
        creatorId: adminId
    })

    res.json({ message: "course created", courseId: course._id })
})

adminRouter.put("/course", adminMiddleware, (req, res) => {
    res.send("update course")
})

adminRouter.get("/course/bulk", adminMiddleware, (req, res) => {
    res.send("bulk")
})

module.exports = {
    adminRouter: adminRouter
}