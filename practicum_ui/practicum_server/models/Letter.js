import mongoose from "mongoose";

const LetterSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    companyName: {
        type: String, 
        required: true
    },
    poBox: {
        type: String,
        required: true
    },
   
    companyAddress: {
        type: String,
        required: true,
        min: 2,
    },
    durationOfStay: {
        type: String,
        default: "6 weeks"
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
    },
    letterContent: {
        type: String,
    } ,
    signature: {
        type: String
    },
    rejectReason: {
        type: String,
    },
},
{
    timestamps: true
});

const Letter = mongoose.model("Letter", LetterSchema);

export default Letter;
