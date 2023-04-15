import User from '../models/user.js'
import { asyncError } from "../middlewares/error.js";
import Invester from '../models/invester.js'
import ErrorHandler from "../utils/ErrorHandler.js";
import cloudinary from 'cloudinary'

export const register = asyncError(async (req,res,next) => {

    const { name, email, password, address, city, country, pinCode ,panNumber,accountNumber,domain,headline} = req.body;

    let user = User.findOne({email})

    if(!user) return next(new ErrorHandler("User Already Exists", 404))

    let avatar = undefined

    if (req.file) {
        const file = getDataUri(req.file);
        const cloudResponse = await cloudinary.v2.uploader.upload(file.content)
        avatar = {
            public_id: cloudResponse.public_id,
            url: cloudResponse.secure_url,
        }
    }

    user = await User.create({
        avatar, name, email, password, address, city, country, pinCode,panNumber,accountNumber,domain,headline
    })
    
    sendToken(user, res, "Registered Successfully", 201)
} 
)
 

export const getMyProfile =asyncError(async (req,res,next) => {
    const user = req.user;
        res.status(200).json({
            "success": true,
            user
        })
     
})

export const getContract =asyncError(async (req,res,next) => {
    const id=req.params.id
    const contract= Contract.findOne(id)
    res.status(200).json({
        "success": true,
        contract
    })
})


export const createContract =asyncError(async (req,res,next) => {
    
})

export const requestVerification =asyncError(async (req,res,next) => {
    
})

export const sendConnection =asyncError(async (req,res,next) => {
    
})

export const getAllInvester =asyncError(async (req,res,next) => {
    
})

export const invest =asyncError(async (req,res,next) => {
    
})
