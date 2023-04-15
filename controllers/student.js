import User from '../models/user.js'
import { asyncError } from "../middlewares/error.js";
import Student from '../models/student.js'
import ErrorHandler from "../utils/ErrorHandler.js";
import cloudinary from 'cloudinary'
import { sendStudentToken } from '../utils/features.js';

export const register = asyncError(async (req,res,next) => {

    const {name,email,password, panNumber,address,signature, accountNumber,goals,domain,headline,experience,linkedInUrl, GithubUrl} = req.body;
    // console.log("user: "+user);
    // let newUser = User.create(user)
    // console.log(newUser._id);
    
    let student = Student.findOne({email})

    if(!student) return next(new ErrorHandler("User Already Exists", 404))

    // if (req.file) {
    //     const file = getDataUri(req.file);
    //     const cloudResponse = await cloudinary.v2.uploader.upload(file.content)
    //     avatar = {
    //         public_id: cloudResponse.public_id,
    //         url: cloudResponse.secure_url,
    //     }
    // }

    student = await Student.create({
        name,email,password,panNumber,address,signature, accountNumber,goals,domain,headline,experience,linkedInUrl, GithubUrl
    })
    
    sendStudentToken(student, res, "Registered Successfully", 201)
} 
)

export const getMyProfile = asyncError(async (req,res,next) => {
    const student = req.student;

    res.status(200).json({
        "success": true,
        student
    })
})

export const getStudentContract = asyncError(async (req,res)=>{
    const student = req.student;
    res.status(200).json({
        "success": true,
        "contracts": student.allContracts,
    })
})

export const acceptContract = asyncError(async ()=>{
    
})

export const getGoal = asyncError(async ()=>{
    
})

export const addGoals = asyncError(async ()=>{
    
})

export const getFunds = asyncError(async ()=>{
    
})

export const getAllStudents =asyncError(async (req,res,next) => {
    const students= Student.find({});
    res.status(200).json({
         students
    })
})