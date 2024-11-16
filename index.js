const express = require("express")
const mongoose = require("mongoose")
const { userRouter } = require("./routes/user")
const { courseRouter } = require("./routes/course")
const { Admin } = require("./db")

const app = express()

app.use(express.json())

app.get("/", (req, res) => {
    res.json("Welcome to the website")
})

app.use("/user", userRouter)

app.use("/course", courseRouter);




async function main() {
    try {

        await mongoose.connect("mongodb+srv://admin:admin@bookingapp.6fbssia.mongodb.net/joshi_course");
    }
    catch (e) {
        console.log(e);

    }
}

app.listen(3000, () => {
    main();
    console.log("listening")
})