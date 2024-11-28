const express = require("express")
const mongoose = require("mongoose")
const { userRouter } = require("./routes/user")
const { courseRouter } = require("./routes/course")
const { Admin } = require("./db")
const { adminRouter } = require("./routes/admin")
const cookieParser = require('cookie-parser')
require('dotenv').config();

const app = express()

app.use(cookieParser())
app.use(express.json())

app.get("/", (req, res) => {
    res.json("Welcome to the website")
})

app.use("/user", userRouter)
app.use("/admin", adminRouter)

app.use("/course", courseRouter);




async function main() {
    try {

        await mongoose.connect(process.env.Mongo);
    }
    catch (e) {
        console.log(e);

    }
}

app.listen(3000, () => {
    main();
    console.log("listening")
})