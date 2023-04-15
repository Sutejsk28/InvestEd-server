import mongoose from "mongoose";

const contractDetailsSchema = mongoose.Schema({
    "contractId": {
        type: String,
        required: true,
    },
    "investerId": {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Invester'
    },
    "studentId": {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Student'
    },
    "totalInvestment": {
        type: Number,
        required: true,
    },
    "isInsured":{
        type: Boolean,
        default: false,
    },
    "tenure": {
        type: Number,
        required: true,
    },
    "ROI":{
        type: Number,
        required: true,
    },
    "adminApproval": {
        type: Boolean,
        default: false,
    },
    "investerApproval": {
        type: Boolean,
        default: false,
    },
    "studentApproval":{
        type: Boolean,   
        default: false,
    },
    "paid":{
        type: Boolean,
        default: false,
    },

}, {timestamps:true})

const ContractDetails = mongoose.model('ContractDetails', contractDetailsSchema);

export default ContractDetails
