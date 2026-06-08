const express = require("express");
const router = express.Router();

const {posts} = require("../controler/posts.js")
const {auth} = require("../middlewares/auth.js")

router.get("/" , auth , posts)

module.exports = router