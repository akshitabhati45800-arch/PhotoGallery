const student=require('../module/studentModule');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const dotenv=require('dotenv');


//signin function for student
const signinStudent = async (req, res) => {
    try { 
        const{username,password,email}=req.body;
        // Find the student user by email
        const studentUser = await student.findOne({email:email});
        if (!studentUser) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        //comparing the password with hashed password
        const isMatch = await bcrypt.compare(password, studentUser.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        //token generation
        const token = jwt.sign({ id: studentUser._id ,role:studentUser.role}, process.env.JWT_SECRET);
        res.json({ token });
    } catch (error) {
        console.error('Error signing in student:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

  module.exports = {
    signinStudent
   
};