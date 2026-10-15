const dotenv =require("dotenv")
const bcrypt = require("bcrypt");
const uploadOnCloudinary = require("../utility/cloudinarySetup");
const teacher =require("../module/teacherModule")
const student =require("../module/studentModule")
const photo =require("../module/photoModule")
const album =require("../module/albumModule")

// Create Teacher
const createTeacher = async (req, res) => {
    try {

        const { name,username, password, email } = req.body;

        const existingTeacher = await teacher.findOne({ email });

        if (existingTeacher) {
            return res.status(400).json({
                message: "Teacher already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newTeacher = await teacher.create({
            name,
            username,
            password: hashedPassword,
            email,
            
        });

        res.status(201).json({
            message: "Teacher created successfully",
            teacher: newTeacher
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
};
// View all teacher

const getAllTeachers = async (req, res) => {

    try {
        const teachers = await teacher.find().select("-password");
        res.status(200).json(teachers);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};
// Delete teacher
const deleteTeacher = async (req, res) => {

    try {

        const { teacherId } = req.params;

        const deletedTeacher = await teacher.findByIdAndDelete(teacherId);

        if (!deletedTeacher) {

            return res.status(404).json({
                message: "Teacher not found"
            });
        }

        res.status(200).json({
            message: "Teacher deleted successfully"
        });

    }

    catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Internal server error"
        });

    }

};

// Create student
const createStudent = async (req, res) => {

    try {

        const { name, username, password, email, standarad } = req.body;

        const existingStudent = await student.findOne({ email });

        if (existingStudent) {

            return res.status(400).json({
                message: "Student already exists"
            });

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newStudent = await student.create({

            name,
            username,
            password: hashedPassword,
            email,
             standarad

        });

        res.status(201).json({

            message: "Student created successfully",

            student: newStudent

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Internal server error"
        });

    }

};


// View all student
const getAllStudents = async (req, res) => {

    try {

        const students = await student.find().select("-password");

        res.status(200).json(students);

    }

    catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Internal server error"
        });

    }

};
// Delete student

const deleteStudent = async (req, res) => {

    try {
        const { studentId } = req.params;
        const deletedStudent = await student.findByIdAndDelete(studentId);
        if (!deletedStudent) {
            return res.status(404).json({
                message: "Student not found"
            });

        }
        res.status(200).json({
            message: "Student deleted successfully"
        });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        });

    }

};

// Create Album

const createAlbum = async (req, res) => {

    try {
        const { title } = req.body;
         const createdBy = req.user._id;
        const newAlbum = await album.create({
            title,
           createdBy
        });
        res.status(201).json({
            message: "Album created successfully",
            album: newAlbum
        });

    }

    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        });

    }

};

// View all album

const getAllAlbums = async (req, res) => {

    try {
        const albums = await album.find()
            .populate("createdBy", "username email")
            
        res.status(200).json(albums);

    }

    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        });

    }

};

// Delete album

const deleteAlbum = async (req, res) => {

    try {

        const { albumId } = req.params;

        await photo.deleteMany({
            album: albumId
        });

        const deletedAlbum = await album.findByIdAndDelete(albumId);

        if (!deletedAlbum) {

            return res.status(404).json({

                message: "Album not found"

            });

        }

        res.status(200).json({

            message: "Album deleted successfully"

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Internal server error"

        });

    }

};
// Add Photo

const addPhoto = async (req, res) => {

    try {

        const { albumId } = req.params;
        
        if (!req.files || req.files.length === 0) {

            return res.status(400).json({
                message: "No photos uploaded"
            });
        }

        const existingAlbum = await album.findById(albumId);
        if (!existingAlbum) {
            return res.status(404).json({
                message: "Album not found"
            });

        }

        const uploadedPhotos = [];

        for (const file of req.files) {
            const response = await uploadOnCloudinary(file.path);
            if (!response) continue;
            const newPhoto = await photo.create({
                
                url: response.secure_url,
                album: albumId
            });

            uploadedPhotos.push(newPhoto);


            if (!existingAlbum.coverImage) {

                existingAlbum.coverImage = newPhoto.url;
            }
        }
        await existingAlbum.save();
        res.status(201).json({
            message: "Photos uploaded successfully",
            photos: uploadedPhotos
        });

    }

    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"

        });

    }

};
// Delete Photo
const deletePhoto = async (req, res) => {

    try {
        const { photoId } = req.params;
        const deletedPhoto = await photo.findByIdAndDelete(photoId);
        if (!deletedPhoto) {
            return res.status(404).json({ message: "Photo not found" });
        }
        res.status(200).json({ message: "Photo deleted successfully" });
    }
    
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"

        });

    }
};
// View all photo
const viewPhotos = async (req, res) => {

    try {
        const { albumId } = req.params;
        const photos = await photo.find({
            album: albumId
        });
        res.status(200).json(photos);

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Internal server error"

        });

    }

}


// View comments on a photo
const viewComments = async (req, res) => {
    try {
        const { photoId } = req.params;
        const photoData = await photo.findById(photoId).populate("comments.student", "name");
        if (!photoData) {
            return res.status(404).json({ message: "Photo not found" });
        }
        res.status(200).json({ comments: photoData.comments });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// View likes on a photo
const viewLike = async (req, res) => {
    try {
        const { photoId } = req.params;
        const getPhoto = await photo.findById(photoId).select("likes").populate("likes.student", "name standard");
        if (!getPhoto) {
            return res.status(404).json({ message: "Photo not found" });
        }
        res.status(200).json(getPhoto);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
module.exports = {
    createTeacher,
    getAllTeachers,
    deleteTeacher,
    createStudent,
    getAllStudents,
    deleteStudent,
    createAlbum,
    deleteAlbum,
    getAllAlbums,
    addPhoto,
    deletePhoto,
    viewPhotos,

     viewLike,
    viewComments,

};