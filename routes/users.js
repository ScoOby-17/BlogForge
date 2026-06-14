const express = require("express");
const router = express.Router();

const { auth } = require("../middlewares/auth.js");
const { isOwner } = require("../middlewares/isOwner.js");

const { getUserProfile, updateUserProfile, deleteUserAccount, } = require("../controler/usersControler.js");

router.get("/:id", auth, isOwner, getUserProfile);
router.put("/:id", auth, isOwner, updateUserProfile);
router.delete("/:id", auth, isOwner, deleteUserAccount);

router.get("/me/posts", auth, getMyPosts);
router.get("/me/posts/:postId", auth, isOwner, getMyPostById);
router.put("/me/posts/:postId", auth, isOwner, updateMyPost);
router.delete("/me/posts/:postId", auth, isOwner, deleteMyPost);

module.exports = router;