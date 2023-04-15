import mongoose from "mongoose";

const notificationSchema = mongoose.Schema({
    "id": {
        type: Number,
        required: true,
    },
    "message": {
        type: String,
        required: true,
    }
})

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification