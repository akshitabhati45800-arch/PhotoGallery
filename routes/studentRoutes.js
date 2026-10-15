const express = require('express');
const studentRoute= express.Router();
const upload = require("../multer");
const { auth, authorize } = require("../authorization/Auth");
const {  listTeacher, viewPhoto, addComment, likeAdd, getAllAlbums, viewStudentProfile, viewComments} = require('../controllers/studentController');

//View Teachers
studentRoute.get("/student/viewTeacher",auth,authorize("student"),listTeacher);

//view album
studentRoute.get("/student/viewAlbum", auth, authorize("student"), getAllAlbums);

//viewPhotosByStudent
studentRoute.get("/student/album/viewPhotos/:albumId",auth,authorize("student"),viewPhoto)

//  addComment
studentRoute.post("/student/album/photo/addComment/:photoId",auth,authorize("student"),addComment)

//like add
studentRoute.post("/student/photo/likeAdd/:photoId",auth,authorize("student"), likeAdd)
//view profile
studentRoute.get("/student/profile",auth,authorize("student"),viewStudentProfile);
//view comment
studentRoute.get("/student/photo/viewComment/:photoId",auth,authorize("student"),viewComments)

module.exports = studentRoute;