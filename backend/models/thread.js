const mongoose = require("mongoose");

const Thread = mongoose.model(
    "Thread",
    new mongoose.Schema({
        title: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: {
            type: String,
        },
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company"
        },
        companyName: {
            type: String,
        },
        workorder: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "WorkOrder"
        },
        workorderName: {
            type: String,
        },
        job: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job"
        },
        jobName: {
            type: String,
        },
        bid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Bid"
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

exports.Thread = Thread;