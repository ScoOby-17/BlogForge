const express = require("express");
const router = express.Router();

const {postCreate ,getPosts ,getPostById} = require("../controler/postsControler.js")
const {auth} = require("../middlewares/auth.js")

router.get("/" , auth , getPosts)
router.post("/" , auth , postCreate)
router.get("/:id", auth , getPostById)

module.exports = router