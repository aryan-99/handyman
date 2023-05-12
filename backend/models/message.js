const mongoose = require("mongoose");

const Message = mongoose.model(
    "Message",
    new mongoose.Schema({
        content: {
            text: {
                type: String,
                required: true,
            },
            media: {
                data: Buffer,
                contentType: String,
            },
        },
        sender: {
            type: String,
            required: true,
        },
        thread: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Thread"
        },
        timestamp: {
            type: Date,
            default: Date.now,
        },
    })
)

exports.Message = Message;