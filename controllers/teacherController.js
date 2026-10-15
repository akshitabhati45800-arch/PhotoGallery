const teacher = require("../module/teacherModule");
const student = require("../module/studentModule");
const photo = require("../module/photoModule");
const album = require("../module/albumModule");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const uploadOnCloudinary = require("../utility/cloudinarySetup");

const createStudent = async (req, res) => {
  try {
    const { name, username, password, email, standarad } = req.body;
    const userId = req.user.id || req.user._id;
    const existingStudent = await student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'student already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newStudent = await student.create({
      name,
      username,
      email,
      password: hashedPassword,
      standarad,
      teacher: userId,
    });
    res.status(201).json({ message: 'student created successfully', student: newStudent });
  } catch (error) {
    console.error('Error creating student:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getAllStudents = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const viewStud = await student.find({ teacher: userId }).lean();
    res.json(viewStud);
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const userId = (req.user.id || req.user._id).toString();
    const deletedStudent = await student.findById(studentId);
    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    if (deletedStudent.teacher.toString() !== userId) {
      return res.status(403).json({ message: "You can delete only your own students" });
    }
    await student.findByIdAndDelete(studentId);
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createAlbum = async (req, res) => {
  try {
    const { title } = req.body;
    const createdBy = req.user.id || req.user._id;
    const newAlbum = await album.create({
      title,
      createdBy
    });
    res.status(201).json({
      message: "Album created successfully",
      album: newAlbum
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllAlbums = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const albums = await album.find({ createdBy: userId }).populate("createdBy", "username email").lean();
    res.status(200).json(albums);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteAlbum = async (req, res) => {
  try {
    const { albumId } = req.params;
    const userId = (req.user.id || req.user._id).toString();

    const foundAlbum = await album.findById(albumId);
    if (!foundAlbum) {
      return res.status(404).json({ message: "Album not found" });
    }

    if (foundAlbum.createdBy.toString() !== userId) {
      return res.status(403).json({ message: "You can delete only your own albums" });
    }

    await photo.deleteMany({ album: albumId });
    await album.findByIdAndDelete(albumId);

    res.status(200).json({ message: "Album deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const addPhoto = async (req, res) => {
  try {
    const { albumId } = req.params;
    const userId = (req.user.id || req.user._id).toString();

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No photos uploaded" });
    }

    const existingAlbum = await album.findById(albumId);
    if (!existingAlbum) {
      return res.status(404).json({ message: "Album not found" });
    }

    if (existingAlbum.createdBy.toString() !== userId) {
      return res.status(403).json({ message: "You can add photos only to your own albums" });
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
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deletePhoto = async (req, res) => {
  try {
    const { photoId } = req.params;
    const userId = (req.user.id || req.user._id).toString();

    const getPhoto = await photo.findById(photoId);
    if (!getPhoto) {
      return res.status(404).json({ message: "Photo not found" });
    }

    const foundAlbum = await album.findById(getPhoto.album);
    if (!foundAlbum) {
      return res.status(404).json({ message: "Album not found" });
    }

    if (foundAlbum.createdBy.toString() !== userId) {
      return res.status(403).json({ message: "You can delete only your own album's photos" });
    }

    await photo.findByIdAndDelete(photoId);
    res.status(200).json({ message: "Photo deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const viewPhotos = async (req, res) => {
  try {
    const { albumId } = req.params;
    const userId = (req.user.id || req.user._id).toString();

    const foundAlbum = await album.findById(albumId);
    if (!foundAlbum) {
      return res.status(404).json({ message: "Album not found" });
    }

    if (foundAlbum.createdBy.toString() !== userId) {
      return res.status(403).json({ message: "You can view only your own album's photos" });
    }

    const photos = await photo.find({ album: albumId }).lean();
    res.status(200).json(photos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { photoId, commentId } = req.params;
    const userId = (req.user.id || req.user._id).toString();

    const getPhoto = await photo.findById(photoId);
    if (!getPhoto) {
      return res.status(404).json({ message: "Photo not found" });
    }

    const foundAlbum = await album.findById(getPhoto.album);
    if (!foundAlbum) {
      return res.status(404).json({ message: "Album not found" });
    }

    if (foundAlbum.createdBy.toString() !== userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    getPhoto.comments.pull(commentId);
    await getPhoto.save();
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const profile = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const teacherProfile = await teacher.findById(userId).select("-password").lean();
    const albums = await album.find({ createdBy: userId }).lean();
    res.json({
      teacher: teacherProfile,
      totalAlbums: albums.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const viewComments = async (req, res) => {
  try {
    const { photoId } = req.params;
    const userId = (req.user.id || req.user._id).toString();

    const photoData = await photo.findById(photoId).populate("comments.student", "name").lean();
    if (!photoData) {
      return res.status(404).json({ message: "Photo not found" });
    }

    const foundAlbum = await album.findById(photoData.album).lean();
    if (!foundAlbum) {
      return res.status(404).json({ message: "Album not found" });
    }

    if (foundAlbum.createdBy.toString() !== userId) {
      return res.status(403).json({ message: "You can view comments only on your own album's photos" });
    }

    res.status(200).json({ comments: photoData.comments });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const viewLike = async (req, res) => {
  try {
    const { photoId } = req.params;
    const userId = (req.user.id || req.user._id).toString();

    const getPhoto = await photo.findById(photoId).select("likes album").populate("likes.student", "name standard").lean();
    if (!getPhoto) {
      return res.status(404).json({ message: "Photo not found" });
    }

    const foundAlbum = await album.findById(getPhoto.album).lean();
    if (!foundAlbum) {
      return res.status(404).json({ message: "Album not found" });
    }

    if (foundAlbum.createdBy.toString() !== userId) {
      return res.status(403).json({ message: "You can view likes only on your own album's photos" });
    }

    res.status(200).json(getPhoto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createStudent,
  getAllStudents,
  deleteStudent,
  createAlbum,
  deleteAlbum,
  getAllAlbums,
  addPhoto,
  deletePhoto,
  viewPhotos,
  deleteComment,
  profile,
  viewComments,
  viewLike
};