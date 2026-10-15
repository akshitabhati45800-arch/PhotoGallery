const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true
    },
    comments: [{
      student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "student"
      },
      message: String,
      createdAt: {
        type: Date,
        default: Date.now
      }
    }],
    likes: [{
      student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "student"
      }
    }],
    album: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "album",
      required: true
    }
  },
  { timestamps: true }
);

const photo = mongoose.model("photo", photoSchema);

module.exports = photo;