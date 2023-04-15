import { asyncError } from "../middlewares/error";
import Notification from "../models/notification";

export const sendNotification = asyncError(
    async (req,res,next) => {
        const {id, message} = req.body;
        const notification = await Notification.create({id,message})
    
        res.status(201).json({
            "success": true,
            "message": "notification sent",
        })
    }
)

export const getNotification = asyncError(
    async (req,res,next) => {
        const {id} = req.body;
        const notification = await Notification.find({id})
    
        res.status(200).jsoon({
            "success": true,
            notification,
        })
    }
)