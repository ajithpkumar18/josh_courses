const express = require("express")
const { userRouter } = require("./routes/user")
const { courseRouter } = require("./routes/course")

const app = express()

app.use(express.json())

app.get("/", (req, res) => {
    res.json("Welcome to the website")
})

app.use("/user", userRouter)

app.use("/course", courseRouter);

app.listen(3000, () => {
    console.log("listening")
})