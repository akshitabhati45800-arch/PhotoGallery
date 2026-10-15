const teacher=require('../module/teacherModule');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const dotenv=require('dotenv');


//signin function for teacher
const signinTeacher = async (req, res) => {
    try { 
        const{username,password,email}=req.body;
        // Find the teacher user by email
        const teacherUser = await teacher.findOne({email:email});
        if (!teacherUser) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        //comparing the password with hashed password
        const isMatch = await bcrypt.compare(password, teacherUser.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        //token generation
        const token = jwt.sign({ id: teacherUser._id ,role:teacherUser.role}, process.env.JWT_SECRET);
        res.json({ token });
    } catch (error) {
        console.error('Error signing in teacher:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


  module.exports = {
    signinTeacher
};