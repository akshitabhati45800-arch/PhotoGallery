const mongoose=require("mongoose")
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    standarad: {
        type: Number,
        default:0,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    role:{
        type:String,
        default:'student',
        required:true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true  },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teacher', }
    });
    const student = mongoose.model("student", studentSchema);

module.exports = student;