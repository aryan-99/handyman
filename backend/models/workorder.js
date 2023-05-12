const mongoose = require("mongoose");

const WorkOrder = mongoose.model(
    "WorkOrder",
    new mongoose.Schema({
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        userMedia: [{
            data: Buffer,
            contentType: String,
        }],
        companyMedia: [{
            data: Buffer,
            contentType: String,
        }],
        accepted: {
            type: Boolean,
            required: true,
            default: false,
        },
        completed: {
            type: Boolean,
            required: true,
            default: false,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        companyName: {
            type: String,
            required: true,
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

exports.WorkOrder = WorkOrder;