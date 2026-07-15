const User = require("../models/userModel.js");

exports.isOwner = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Account does not exist"
            });
        }

        if (user._id.toString() !== req.user.id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not the owner of this account"
            });
        }

        next();

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};