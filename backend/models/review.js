const mongoose = require("mongoose");

const Review = mongoose.model(
    "Review",
    new mongoose.Schema({
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            enum: [1, 2, 3, 4, 5],
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company"
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        }
    })
)

exports.Review = Review;