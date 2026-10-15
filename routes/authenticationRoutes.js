const express= require("express");
const { signupAdmin, signinAdmin } = require("../authentication/adminSystem");
const { signinTeacher } = require("../authentication/teacherSystem");
const { signinStudent } = require("../authentication/studentSystem");
const authRoutes=express.Router();

//signup admin

authRoutes.post("/admin/signup",signupAdmin);

//signin admin

authRoutes.post("/admin/signin",signinAdmin);

//signin teacher

authRoutes.post("/teacher/signin",signinTeacher)

//signin student
authRoutes.post("/student/signin",signinStudent)

module.exports=authRoutes