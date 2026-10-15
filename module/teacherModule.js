const mongoose=require ("mongoose");

//teacher schema

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },    
    username: {
        type: String,
        required: true
    },    
    email: {
        type: String,
        required: true ,
        unique:true
    },    
    role:{
        type:String,
        default:'teacher',
        required:true
    },    
    password: {
        type: String,
        required: true},
    student: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student'  
    }],
    album:[ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'album',
        
    }]    
});    


const teacher = mongoose.model('teacher', teacherSchema);

module.exports = teacher; 