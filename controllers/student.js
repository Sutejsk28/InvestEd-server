import User from '../models/user.js'
import { asyncError } from "../middlewares/error.js";
import Student from '../models/student.js'
import ErrorHandler from "../utils/ErrorHandler.js";
import cloudinary from 'cloudinary'
import { sendToken } from '../utils/features.js';

export const register = asyncError(async (req,res,next) => {

    const {name,email,password, panNumber,address,signature, accountNumber,goal,domain,headline,experience,linkedInUrl, GithubUrl} = req.body;
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
        name,email,password,panNumber,address,signature, accountNumber,goal,domain,headline,experience,linkedInUrl, GithubUrl
    })
    
    sendToken(student, res, "Registered Successfully", 201)
} 
)

export const login = asyncError(async (req,res,next) => {

    const {email, password} = req.body;

    const student = await Student.findOne({email}).select("+password")

    if(!student)
        return next(new ErrorHandler("Incorrect Email or password", 404))

    const isMatched = await student.comparePassword(password)

    if(!isMatched) 
        return next(new ErrorHandler("Incorrect Email or Password", 400))
    
    sendToken(student, res, `Welcome Back ${student.name}`, 200)
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

export const withdrawFunds = asyncError(
    async (req,res,next)=>{
        const {amount} = req.body
        const student = req.student

        if(amount<student.balance) balance -= amount;

        res.status(200).json({
            "success": true,
            student,
        })

    }
)

export const acceptContract = asyncError(async ()=>{
    const student = req.student;
})

export const getGoal = asyncError(async (req,res)=>{
    const student = req.student;
    const {goal} = student

    res.status(200).json({
        "success": true,
        goal
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

// export const updateGoals = asyncError(async ()=>{
    
// })

export const getFunds = asyncError(async ()=>{
    const student = req.student;
    const {fundsRaised} = student

    res.status(200).json({
        "success": true,
        fundsRaised
    })
})

export const getAllStudents =asyncError(async (req,res,next) => {
    const students= await Student.find({});

    res.status(200).json({
        "success": true,
        students
    })
})