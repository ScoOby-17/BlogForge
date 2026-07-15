// middlewares/isPostOwner.js
const Posts = require("../models/postModel.js");

exports.isPostOwner = async (req, res, next) => {
  try {
    const { postId } = req.params; // reads postId not id

    const post = await Posts.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (post.user.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Access denied. You are not the owner of this post",
      });
    }

    req.post = post; // pass post to controller
    next();

  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};