const express = require('express');
const routes= express.Router();
const admin =require("../module/adminModule")
const upload = require("../multer");
const { auth, authorize } = require("../authorization/Auth");
const { createTeacher, deleteTeacher, getAllTeachers, deleteStudent, createStudent, getAllStudents, addPhoto, deletePhoto, viewPhotos, createAlbum, deleteAlbum, getAllAlbums, viewComments, viewLike } = require('../controllers/adminController');
//Create Teacher
routes.post("/admin/createTeacher",auth,authorize("admin"),createTeacher);
//Delete Teacher
routes.delete("/admin/deleteTeacher/:teacherId",auth,authorize("admin"),deleteTeacher);
//View Teachers
routes.get("/admin/viewTeacher",auth,authorize("admin"),getAllTeachers)
// Create Student
routes.post("/admin/createStudent",auth,authorize("admin"),createStudent);
// Delete Student
routes.delete("/admin/deleteStudent/:studentId",auth,authorize("admin"),deleteStudent);
// View Students
routes.get("/admin/viewStudent",auth,authorize("admin"),getAllStudents);

//add photo
routes.post("/admin/album/addPhoto/:albumId",auth,authorize("admin"),upload.array("photos"),addPhoto);

//delete photo
routes.delete("/admin/album/deletePhoto/:photoId",auth,authorize("admin"),deletePhoto);

//view photo
routes.get("/admin/album/viewPhoto/:albumId",auth,authorize("admin"),viewPhotos);

//create album
routes.post("/admin/createAlbum",auth,authorize("admin"),createAlbum);
//Delete Album
routes.delete("/admin/deleteAlbum/:albumId",auth,authorize("admin"),deleteAlbum);
//View  Album
routes.get("/admin/viewAlbum",auth,authorize("admin"),getAllAlbums)
routes.get("/photo/viewComment/:photoId", auth,authorize("admin"), viewComments);
routes.get("/photo/viewLike/:photoId", auth,authorize("admin"), viewLike);

module.exports =routes;