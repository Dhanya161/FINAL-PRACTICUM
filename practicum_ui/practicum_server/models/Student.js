import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    programme: {
        type: String,
        required: true
    },
    indexNumber: {
        type: String,
        required: true
    },  
    referenceNumber: {
        type: String,
        required: true
    },
    year: {
        type: String,
        enum: ['100', '200', '300', '400', '500', '600', '700']
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    letters: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Letter'
    }] 
},
{
timestamps: true
});

const Student = mongoose.model("Student", StudentSchema);

export default Student;