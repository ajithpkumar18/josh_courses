const express = require("express")

const app = express()

app.use(express.json())

app.get("/", (req, res) => {
    res.json("Welcome to the website")
})

app.post("/user/signup", (req, res) => {
    res.json({
        message: "signup"
    })
})

app.post("/user/signin", (req, res) => {
    res.json({
        message: "signup"
    })
})

app.get("/courses", (req, res) => {
    res.json("All courses")
})

app.get("/user/purchases", (req, res) => {
    res.json("All purchased courses")
})

app.post("/course/purchase", (req, res) => {
    res.json("Course purchase")
})

