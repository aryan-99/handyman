const mongoose = require("mongoose");

const Company = mongoose.model(
    "Company",
    new mongoose.Schema({
        username: {
            type: String,
            required: true,
            unique: true,
        },
        companyName: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        about: {
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
        createdAt: {
            type: Date,
            default: Date.now,
        },
        bids: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Bid"
        }],
        updatedAt: {
            type: Date,
            default: Date.now,
        }
    })
)

exports.Company = Company;