const mongoose = require("mongoose");

const Bid = mongoose.model(
    "Bid",
    new mongoose.Schema({
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company"
        },
        companyUser: {
            type: String,
        },
        companyName: {
            type: String,
        },
        job: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job"
        },
        jobName: {
            type: String,
        },
        quote: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
        },
        accepted: {
            type: Boolean,
            required: true,
            default: false,
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

exports.Bid = Bid;