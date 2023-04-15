import { asyncError } from "../middlewares/error.js"
import ContractDetails from "../models/contract.js"

export const createContract = asyncError(
    async (req,res,next)=>{
        const investerId = req.invester
        const {studentId, isInsured, totalAmount, tenure} = req.body
    
        const contract = await ContractDetails.create({investerId,studentId, isInsured, totalAmount, tenure})

        res.status(201).json({
            "success": true,
            "message": "Contract created successfully",
            contract,
        })
    
    }
)