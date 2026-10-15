//album schema
const mongoose = require ("mongoose")
const albumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
        default: ""
    },
    createdBy: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "teacher"
}
},{timestamps: true});

const album = mongoose.model('album', albumSchema);
module.exports = album;