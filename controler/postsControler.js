const Post = require("../models/postModel.js");

// for create post
exports.postCreate = async (req, res) => {
    try {
        const { title, subtitle, content, category } = req.body;
        const { id } = req.user;

        if (!title || !content) {
            return res.status(400).json({
                success: false,
                message: "Title and Content are required"
            });
        }

        const newPost = await Post.create({
            title,
            subtitle,
            content,
            category,
            user: id
        });

        res.status(201).json({
            success: true,
            message: "Post created successfully",
            post: newPost
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// Get all posts or posts by category
exports.getPosts = async (req, res) => {
    try {
        const { category } = req.query;

        let filter = {};

        if (category) {
            filter.category = category;
        }

        const posts = await Post.find(filter)
            .populate("user", "name email");

        res.status(200).json({
            success: true,
            count: posts.length,
            posts
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

//One single Post get
exports.getPostById = async (req,res)=>{
    try{
        const {id} = req.params
        
        const singlePost = await Post.findById(id);

        if(!singlePost){
            return res.status(400).json({
                success:false,
                message:"Post don't exists"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Post here",
            post:singlePost
        })
    }catch(error){
        console.log("Error in getPostById controler")
        res.status(400).json({
            success:false,
            message:"internal server error"
        })
    }
}