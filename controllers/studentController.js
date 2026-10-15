const photo = require("../module/photoModule");
const student = require("../module/studentModule");
const album = require("../module/albumModule");
const teacher = require("../module/teacherModule");


const listTeacher= async(req,res)=>{
    try{
         //list of teacher
         const allTeacher = await teacher.find().select("-password")
         .sort({
      createdAt:-1
       });
         res.status(200).json(allTeacher);
      }
      catch(error){
        console.error("error found", error)
        res.status(404).json({message:"something went wrong"})
      }
   }
  
//album view
    const getAllAlbums = async (req, res) => {
  try {
    const albums = await album.find()
      .populate("createdBy", "name")   
      .sort({ createdAt: -1 });

    res.status(200).json(albums);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
     
    //photos view of that album
     const viewPhoto = async (req, res) => {
    try {
        const { albumId } = req.params;

        const foundAlbum = await album.findById(albumId);
        if (!foundAlbum) {
            return res.status(404).json({
                message: "Album not found"
            });
        }

        const getPhoto = await photo.find({ album: albumId })
            .populate("comments.student", "name")
            .populate("likes.student", "name");

        res.status(200).json(getPhoto);

    } catch (error) {
        console.error("Error fetching photos:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};
//add comment
   const addComment = async (req, res) => {
    try {
        const { photoId } = req.params;
        const { message } = req.body;

        const getPhoto= await photo.findById(photoId);

        if (!getPhoto) {
            return res.status(404).json({
                message: "Photo not found"
            });
        }

        getPhoto.comments.push({
           student:req.user.id,
           message
      });

        await getPhoto.save();
       
        await getPhoto.populate("comments.student","name");

        res.status(200).json({
       message: "Comment added successfully",
        photo:getPhoto
});
        
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};
//view comments
const viewComments = async (req, res) => {
  try {
    const { photoId } = req.params;

    const photoData = await photo
      .findById(photoId)
      .populate("comments.student", "name");

    if (!photoData) {
      return res.status(404).json({
        message: "Photo not found",
      });
    }

    res.status(200).json({
      comments: photoData.comments,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
//toogle like
const likeAdd = async (req, res) => {
    try {
        const { photoId } = req.params;

        const getPhoto = await photo.findById(photoId);
        if (!getPhoto) {
            return res.status(404).json({ message: "Photo not found" });
        }

        const alreadyLiked = getPhoto.likes.find(
            like => like.student.toString() === req.user.id
        );

        if (!alreadyLiked) {
            getPhoto.likes.push({ student: req.user.id });   
        } else {
            getPhoto.likes = getPhoto.likes.filter(
                like => like.student.toString() !== req.user.id
            );
        }

        await getPhoto.save();
        await getPhoto.populate("likes.student", "name");

        res.status(200).json({
            message: alreadyLiked ? "Photo unliked successfully" : "Photo liked successfully",
            totalLikes: getPhoto.likes.length,   
            likes: getPhoto.likes
        });
    } catch (error) {
        console.error("error found", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
//view student profile
const viewStudentProfile = async (req, res) => {
    try {

        const studentProfile = await student.findById(req.user.id)
            .select("-password")
             .populate("teacher","username email")

        if (!studentProfile) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json(studentProfile);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

module.exports={
    listTeacher,
    viewPhoto,
    addComment,
    likeAdd ,
    getAllAlbums,
    viewStudentProfile,
    viewComments
}