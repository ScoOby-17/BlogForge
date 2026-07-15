const express = require("express");
const router = express.Router();

const { auth } = require("../middlewares/auth.js");
const { isOwner } = require("../middlewares/isOwner.js");
const { isPostOwner } = require("../middlewares/isPostOwner.js")

const { getUserProfile, 
  updateUserProfile, 
  deleteUserAccount, 
  getMyPosts, 
  getMyPostById,
  updateMyPost,
  deleteMyPost} = require("../controler/usersControler.js");

router.get("/me/posts", auth, getMyPosts);
router.get("/me/posts/:postId", auth, isPostOwner, getMyPostById);
router.put("/me/posts/:postId", auth, isPostOwner, updateMyPost);
router.delete("/me/posts/:postId", auth, isPostOwner, deleteMyPost);

router.get("/:id", auth, isOwner, getUserProfile);
router.put("/:id", auth, isOwner, updateUserProfile);
router.delete("/:id", auth, isOwner, deleteUserAccount);

module.exports = router;