const { Schema, default: mongoose } = require("mongoose")

let userSchema = new Schema({
    email: String,
    password: String,
    firstName: String,
    lastName: String
})

module.exports = { User: mongoose.model("user", userSchema) };

let courseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: Schema.ObjectId
})

module.exports = { Course: mongoose.model("course", courseSchema) }

let adminSchema = new Schema({
    email: String,
    password: String,
    firstName: String,
    lastName: String
})

module.exports = { Admin: mongoose.model("admin", adminSchema) }

let purchaseSchema = new Schema({
    courseId: Schema.ObjectId,
    userId: Schema.ObjectId
})

module.exports = { Purchase: mongoose.model("purchases", purchaseSchema) }