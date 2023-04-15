import User from '../models/user.js'
import { asyncError } from "../middlewares/error.js";
import Invester from '../models/invester.js'
import ErrorHandler from "../utils/ErrorHandler.js";
import cloudinary from 'cloudinary'
import { sendToken } from '../utils/features.js';
import Student from '../models/student.js';

export const register = asyncError(async (req,res,next) => {

    const {name,email,password, panNumber,address,signature, accountNumber,domain,headline,experience,linkedInUrl, GithubUrl} = req.body;

    let invester = Invester.findOne({email})

    if(!invester) return next(new ErrorHandler("User Already Exists", 404))

    invester = await Invester.create({name,email,password, panNumber,address,signature, accountNumber,domain,headline})
    sendToken(invester, res, "Registered Successfully", 201)
} 
)

export const login = asyncError(async (req,res,next) => {

    const {email, password} = req.body;

    const invester = await Invester.findOne({email}).select("+password")

    if(!invester)
        return next(new ErrorHandler("Incorrect Email or password", 404))

    const isMatched = await invester.comparePassword(password)

    if(!isMatched) 
        return next(new ErrorHandler("Incorrect Email or Password", 400))
    
    sendToken(invester, res, `Welcome Back ${invester.name}`, 200)
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
 

export const getMyProfile =asyncError(async (req,res,next) => {
    const invester = req.invester;
        res.status(200).json({
            "success": true,
            "invester": invester,
        })
     
})

export const getContract = asyncError(async (req,res,next) => {
    const id=req.params.id
    const contract= Contract.findOne(id)
    res.status(200).json({
        "success": true,
        contract
    })
})

export const requestConnection = asyncError(
    async () => {
        //sendNotification()
    }
)

export const acceptConnection = asyncError(
    async () => {
        const {studentId} = req.body;
        const invester = req.invester;
    
        const student = await Student.findById(studentId);
        student.connections.push(invester._id)
        invester.connections.push(student._id)

        res.status(200).json({
            "success": true,
            "message": "Connection accepted",
        })
    }
)

// export const requestVerification =asyncError(async (req,res,next) => {
//     //sendNotification()
// })



export const getAllInvester = asyncError(async (req,res,next) => {
    const investers = Invester.find({})

    res.status(200).jsin({
        "success": true,
        investers,
    })
})

