const { Router } = require("express")
const zod = require("zod")
const { userModel } = require("../db")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

const userRouter = Router();

const passwordSchema = zod.object({
    email: zod.string().email(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
})

userRouter.post("/signup", async (req, res) => {
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

        await userModel.create({
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

userRouter.post("/signin", async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    let token = req.headers.token;


    let user = await userModel.findOne({ email: email })
    if (user) {
        let val = bcrypt.compareSync(password, user.password);

        if (val) {
            let token = jwt.sign({ username: user._id }, process.env.JWT_USER_PASSWORD)
            return res.status(200).json(token)
        }
    }
    else {
        res.status(204).json({ message: "invalid credentials" })
    }
})

userRouter.get("/purchases", (req, res) => {
    res.json("All purchased courses")
})

module.exports = { userRouter: userRouter }