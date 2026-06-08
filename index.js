const express = require("express");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const path = require("path");

require("dotenv").config();

const connectDb = require("./config/db.js");

const app = express();

connectDb();

// ── Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// ── View engine 
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ── Routes
app.use("/auth",    require("./routes/auth.js"));
app.use("/posts",    require("./routes/posts.js"));
app.use("/users",    require("./routes/users.js"));

// ── 404 handler
app.use((req, res) => {
  res.status(404).json({
    success:false,
    message:"Error 404 occour no Route for this"
  });
});

// ── Global error handler 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("error", { message: err.message });
});

// ── Start server 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});