import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

const studentSchema = new mongoose.Schema({
    "email": {
        type: String,
        required: true,
        unique: true
    },
    "name": {
    type: String,
    required: true
    },
    "password": {
    type: String,
    required: true
    },
    "address": {
        type: String,
        required: true
    },
    "headline": {
        type: String,
        required: true
    },
    "domain": {
        type: String,
        enum: ["Tech", "Healthcare", "Finance", "Real Estate", "Other"],
        required: true
    },
    "linkedInProfile": {
        type: String,
        required: false,
    },
    "GithubProfile": {
        type: String,
        required: false,
    },
    "experience": {
        type: String,
        required: true
    },
    "Goal":{
        type: String,
        required: true,
    },
    "fundsRaised":{
        type: Number,
        required: false,
    },
    "balance":{
        type: Number,
        required: false,
    },
    "signature": {
        type: String,
        required: true,
    },
    "allContracts": [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contract'
    }],
    "Picture": {
        public_id: String,
        url: String,    
    },
    "connections":{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Invester'
    },
    "accountNumber": {
        type: String,
        required: true,
    },
    "isVerified": {
        type: Boolean,
        default: false
    },
    "isBlocked": {
        type: Boolean,
        default: false
    },
    "isConnected": {
        type: Boolean,
        default: false
    }
});


studentSchema.pre("save", async function (next){
    if (!this.isModified("password")) return next() 
    this.password = await bcrypt.hash( this.password, 10);
  })
  
  studentSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
  }
  
  studentSchema.methods.generateToken = function() {
    return jwt.sign({
        _id: this._id,
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "15d",
    }
    )
  }

const Student = mongoose.model('Student', studentSchema);


export default Student

