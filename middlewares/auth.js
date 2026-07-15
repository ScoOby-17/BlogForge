var jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token missing login in first",
      });
    }

    try {
      const payload = jwt.verify(token, process.env.jwtSecret);
      req.user = payload;
      next();

    } catch (error) {
      console.log("error in Payload Verify");
      res.status(400).json({
        success: false,
        message: "error on paload verify",
      });
    }

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
