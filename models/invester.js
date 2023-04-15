import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
const investorSchema = new mongoose.Schema({
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
    "headline": {
        type: String,
        required: true
    },
    "domain": {
        type: String,
        enum: ["Tech", "Healthcare", "Finance", "Real Estate", "Other"],
        required: true
    },
    "signature": {
        type: String,
        required: true,
        unique: true,
    },
    "Investments": {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Contract'
    },
    "Picture": {
        public_id: String,
        url: String,    
    },
    "isApproved": {
        type: Boolean,
        default: false
    },
    "isBlocked": {
        type: Boolean,
        default: false
    },
    "address": {
        type: String,
        required: true
    },
    "connections": {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Student',
        default: []
    }
});

investorSchema.pre("save", async function (next){
    if (!this.isModified("password")) return next() 
    this.password = await bcrypt.hash( this.password, 10);
  })
  
  investorSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
  }
  
  investorSchema.methods.generateToken = function() {
    return jwt.sign({
        _id: this._id,
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "15d",
    }
    )
  }


const Investor = mongoose.model('Investor', investorSchema);

export default Investor
