import { asyncError } from "../middlewares/error.js"
import ContractDetails from "../models/contract.js"
import Investor from "../models/invester.js"
import Notification from "../models/notification.js"
import Student from "../models/student.js"

export const getAllData = asyncError(
    async (req,res,next) => {
        const allInvestersData = await Investor.find({})
        const allStudentsData = await Student.find({})
    
        const contracts = await ContractDetails.find({})
        let totalInvestment = 0;
        contracts.forEach((ele)=>{
            totalInvestment += ele.totalInvestment
        })
        console.log(totalInvestment);

        const totalContracts = contracts.length;
        console.log(totalContracts);

        const totalUser = allInvestersData.length + allStudentsData.length;

        res.status(200).json({
            allInvestersData,
            allStudentsData,
            totalUser,
            totalInvestment,
        })


    }
)

export const verifyUser = asyncError(
    async (req,res,next)=>{
        const {studentId} = req.body;
        const student = await Student.findById(studentId) 

        student.isVerified = true;

        await student.save();

        res.status(200).json({
            "success": true,
            student,
        })
    }
)

export const getAllNotification = asyncError(
    async (req,res,next) => {
        const notifications = Notification.find({});

        res.status(200).json({
            "success": true,
            notifications,
        })
    }
)


