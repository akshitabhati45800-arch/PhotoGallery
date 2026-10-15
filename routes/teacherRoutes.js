const express = require('express');
const teacherRoute= express.Router();
const upload = require("../multer");
const { auth, authorize } = require("../authorization/Auth");
const {deleteComment,  deleteStudent, createStudent, getAllStudents, addPhoto, deletePhoto, viewPhotos, createAlbum, deleteAlbum, getAllAlbums, profile, viewComments, viewLike } = require('../controllers/teacherController');


// Create Student
teacherRoute.post("/teacher/createStudent",auth,authorize("teacher"),createStudent);
// Delete Student
teacherRoute.delete("/teacher/deleteStudent/:studentId",auth,authorize("teacher"),deleteStudent);
// View Students
teacherRoute.get("/teacher/viewStudent",auth,authorize("teacher"),getAllStudents);

//add photo
teacherRoute.post("/teacher/album/addPhoto/:albumId",auth,authorize("teacher"),upload.array("photos"),addPhoto);

//delete photo
teacherRoute.delete("/teacher/album/deletePhoto/:photoId",auth,authorize("teacher"),deletePhoto);

//view photo
teacherRoute.get("/teacher/album/viewPhoto/:albumId",auth,authorize("teacher"),viewPhotos);

//create album
teacherRoute.post("/teacher/createAlbum",auth,authorize("teacher"),createAlbum);
//Delete Album
teacherRoute.delete("/teacher/deleteAlbum/:albumId",auth,authorize("teacher"),deleteAlbum);
//View  Album
teacherRoute.get("/teacher/viewAlbum",auth,authorize("teacher"),getAllAlbums)
//delete comment
teacherRoute.delete("/teacher/photo/:photoId/comment/:commentId",auth,authorize("teacher"),deleteComment)
//view teacher profile
teacherRoute.get("/teacher/profile",auth,authorize("teacher"),profile)
//get comments
teacherRoute.get("/teacher/photo/viewComment/:photoId",auth,authorize("teacher"),viewComments)
//get likes
teacherRoute.get("/teacher/photo/viewLike/:photoId",auth ,authorize("teacher"),viewLike)

module.exports =teacherRoute;
