const { v2: cloudinary } = require("cloudinary");
const fs =require("fs");
const dotenv=require("dotenv")

cloudinary.config({
      cloud_name: process.env.CLOUD_NAME ,
      api_key:process.env.API_KEY ,
      api_secret:process.env.API_SECRET 
})

const uploadOnCloudinary = async (localFile) => {
    try {
        if (!localFile) return null;

        const response = await cloudinary.uploader.upload(localFile, {
            resource_type: "auto"
        });

        if (fs.existsSync(localFile)) {
            fs.unlinkSync(localFile);
        }

        return response;

    } catch (error) {
        console.log(error);
        if (fs.existsSync(localFile)) {
            fs.unlinkSync(localFile);
        }
        return null;
    }
};

module.exports = uploadOnCloudinary;

module.exports=  uploadOnCloudinary;