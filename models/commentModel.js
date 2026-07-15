const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({

  text: {
    type: String,
    required: [true, "Comment text is required"],
    trim: true,
    maxlength: [500, "Comment cannot exceed 500 characters"],
  },

  // who wrote the comment
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  // which post this comment belongs to
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },

}, { timestamps: true });

module.exports = mongoose.model("Comment", commentSchema);