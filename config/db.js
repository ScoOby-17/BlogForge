const mongoose = require('mongoose');

module.exports = async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/BlogApp');
  console.log("Connect to BlogApp Database Local")
}