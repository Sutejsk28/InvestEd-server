import { asyncError } from "../middlewares/error.js";
import User from "../models/user.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { cookieOptions, getDataUri, sendEmail, sendToken } from "../utils/features.js";
import cloudinary from 'cloudinary'

export const login = asyncError(async (req,res,next) => {

    const {email, password} = req.body;

    const user = await User.findOne({email}).select("+password")

    if(!user)
        return next(new ErrorHandler("Incorrect Email or password", 404))

    const isMatched = await user.comparePassword(password)

    if(!isMatched) 
        return next(new ErrorHandler("Incorrect Email or Password", 400))
    
    sendToken(user, res, `Welcome Back ${user.name}`, 200)
}
)

export const logout = asyncError(
    async (req,res,next)=>{

        res
            .status(200)
            .cookie("token", "", {
                ...cookieOptions,
                expires: new Date(Date.now())
            })
            .json({
                success: true,
                message: "Logged Out Successfully",
            })

    }
)