const User = require("../models/userModel.js");
const Posts = require("../models/postModel.js");

exports.getUserProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, sex } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name,
        email,
        sex,
      },
      {
        new: true,
        runValidators: true,
      },
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.deleteUserAccount = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.clearCookie("token").status(200).json({
      success: true,
      message: "Account deleted successfully, deleted Account details below",
      deletedUser: deletedUser,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// user posts controlers
exports.getMyPosts = async (req, res) => {
  try {
    const id = req.user.id;
    const posts = await Posts.find({ user: id });

    if (posts.length === 0) {
      return res.status(200).json({
        success: true,
        message: "You have no posts",
      });
    }

    res.status(200).json({
      success: true,
      message: "All posts",
      AllPosts: posts,
    });
  } catch (error) {
    console.log("error in getMyPosts controller");
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.getMyPostById = async (req, res) => {
  try {
    const { postId } = req.params;
    const singlePost = await Posts.findById(postId);

    if (!singlePost) {
      return res.status(404).json({
        success: true,
        message: "Post don't exists",
      });
    }

    return res.status(200).json({
      success: true,
      message: `post of postId : ${postId}`,
      post: singlePost,
    });
  } catch (error) {
    console.log("error in getMyPostByID controller");
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.updateMyPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { title, subtitle, content, category } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and Content are required",
      });
    }

    const postExist = await Posts.findById(postId);

    if (!postExist) {
      return res.status(404).json({
        success: false,
        message: "Post don't exists",
      });
    }

    const updatedPost = await Posts.findByIdAndUpdate(
      postId,
      {
        title,
        subtitle,
        content,
        category,
      },
      { new: true },
    );

    res.status(200).json({
      success: true,
      message: "Post updates SuccessFully",
      oldPost: postExist,
      postAfetrUpdate: updatedPost,
    });
  } catch (error) {
    console.log("error in updateMyPost controller");
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.deleteMyPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const postExist = await Posts.findById(postId);

    if (!postExist) {
      return res.status(404).json({
        success: false,
        message: "Post don't exists",
      });
    }

    const deletedPost = await Posts.findByIdAndDelete(postId);
    res.status(200).json({
      success: true,
      message: "Post deleted SuccessFully",
      deleted_Post: deletedPost,
    });
  } catch (error) {
    console.log("error in deleteMyPost controller");
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
