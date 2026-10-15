const admin=require('../module/adminModule');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const dotenv=require('dotenv');


//signin function for admin
const signinAdmin = async (req, res) => {
    try { 
        const{password,email}=req.body;
        // Find the admin user by email
        const adminUser = await admin.findOne({email:email});
        if (!adminUser) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        //comparing the password with hashed password
        const isMatch = await bcrypt.compare(password, adminUser.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        //token generation
        const token = jwt.sign({ id: adminUser._id ,role:adminUser.role}, process.env.JWT_SECRET);
        res.json({ token });
    } catch (error) {
        console.error('Error signing in admin:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

//signup function for admin
const signupAdmin = async (req, res) => {
    try {
        const { username, password ,email} = req.body;
        const existingAdmin = await admin.findOne({ email: email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }   
        //hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);
        //creating new admin
        const newAdmin = await admin.create({
            username:username,
            password: hashedPassword,
            email:email
        
        })
        const token = jwt.sign(
           { id: newAdmin._id, role: newAdmin.role },
          process.env.JWT_SECRET);

res.status(201).json({
  message: "Admin created successfully",
  token,
});
    } catch (error) {
        console.error('Error signing up admin:', error);

        res.status(500).json({ message: 'Internal server error' });
    }
};
  module.exports = {
    signinAdmin,
    signupAdmin
};