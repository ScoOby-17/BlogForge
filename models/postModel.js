const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [150, "Title cannot exceed 150 characters"],
    },

    subtitle: {
      type: String,
      trim: true,
      default: "",
    },

    content: {
      type: String,
      required: [true, "Content is required"],
    },

    category: {
      type: String,
      enum: ["Programming", "Food", "Gaming", "Tech", "Other"],
      default: "Other",
    },

    // owner of the post
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // likes count
    likes: {
      type: Number,
      default: 0,
    },

    // users who liked — to prevent double liking
    likedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // comments
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Post", postSchema);
