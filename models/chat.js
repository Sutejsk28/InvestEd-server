import mongoose from "mongoose";

const chatSchema = mongoose.Schema({
    "sender": {
        type: String,
        required: true,
    },
    "recipient": {
        type: String,
        required: true,
    },
    "message": {
        type: String,
        required: true,
    },
})