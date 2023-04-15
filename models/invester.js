import mongoose from "mongoose";

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
    "Investments": [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contract'
    }],
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
    "connection": [{
        type: [mongoose.Schema.Types.ObjectId],
        default: false
    }]
});

const Investor = mongoose.model('Investor', investorSchema);

export default Investor
