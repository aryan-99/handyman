const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        username: {
            type: String,
            required: true,
            unique: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        street: {
            type: String,
            required: true,
        },
        unit: {
            type: String,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
        },
        zip: {
            type: Number,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        // location: {
        //     type: {
        //         type: String,
        //         enum: ["Point"],
        //         required: true,
        //     },
        //     coordinates: {
        //         type: [Number],
        //         required: true,
        //     }
        // },
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

exports.User = User;